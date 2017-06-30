/**
 * BlinkTradeJS SDK
 * (c) 2016-present BlinkTrade, Inc.
 *
 * This file is part of BlinkTradeJS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @flow
 */

import _ from 'lodash';
import nodeify from 'nodeify';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import {
  registerListener,
  generateRequestId,
  registerEventEmitter,
} from './listener';

import {
  EVENTS,
  BALANCE,
  ORDER_BOOK,
  DEPOSIT_REFRESH,
  WITHDRAW_REFRESH,
  EXECUTION_REPORT,
} from './constants/actionTypes';

import MsgTypes from './constants/requests';
import WebSocketTransport from './wsTransport';

class BlinkTradeWS extends WebSocketTransport {

  /**
   * Session to store login information
   */
  session: Object;

  constructor(params?: BlinkTradeBase) {
    super(params);

    this.session = {};
  }

  heartbeat(callback?: Function): Promise<Object> {
    const d = new Date();
    const msg: Object = {
      MsgType: MsgTypes.HEARTBEAT,
      TestReqID: d.getTime(),
      SendTime: d.getTime(),
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        return resolve({
          ...data,
          Latency: new Date(Date.now()) - data.SendTime,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  login({ username, password, secondFactor, brokerId }: {
    username: string,
    password: string,
    secondFactor?: string,
    brokerId?: number,
  }, callback?: Function): Promise<Object> {
    let userAgent;
    if (!this.isNode) {
      userAgent = {
        UserAgent: window.navigator.userAgent,
        UserAgentLanguage: window.navigator.language,
        UserAgentPlatform: window.navigator.platform,
        UserAgentTimezoneOffset: new Date().getTimezoneOffset(),
      };
    } else {
      const os = require('os');
      userAgent = {
        UserAgent: `${os.type()} ${os.release()}`,
        UserAgentLanguage: 'en_US',
        UserAgentPlatform: `${os.platform()} (${os.arch()})`,
        UserAgentTimezoneOffset: new Date().getTimezoneOffset(),
      };
    }

    const msg: Object = {
      MsgType: MsgTypes.LOGIN,
      UserReqID: generateRequestId(),
      BrokerID: brokerId || this.brokerId,
      Username: username,
      Password: password,
      UserReqTyp: '1',
      ...userAgent,
    };

    if (secondFactor) {
      msg.SecondFactor = secondFactor;
    }

    return nodeify.extend(new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        if (data.UserStatus === 1) {
          this.session = data;
          return resolve(data);
        }

        return reject(data);
      }).catch(reject);
    })).nodeify(callback);
  }

  logout(callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.LOGOUT,
      BrokerID: this.brokerId,
      UserReqID: generateRequestId(),
      Username: this.session.Username,
      UserReqTyp: '2',
    };

    return nodeify.extend(super.sendMessageAsPromise(msg)).nodeify(callback);
  }

  profile(callback?: Function): Promise<Object> {
    const { VerificationData, ...profile } = this.session.Profile;
    return nodeify.extend(Promise.resolve(profile)).nodeify(callback);
  }

  balance(callback?: Function): PromiseEmitter<Object> {
    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.balance(callback).then((data) => {
        registerListener('U3', (balance) => {
          callback && callback(null, balance);
          return this.eventEmitter.emit(BALANCE, balance);
        });
        return resolve(data);
      }).catch(reject);
    }));
  }

  subscribeTicker(symbols: Array<string>, callback?: Function): PromiseEmitter<Object> {
    const msg = {
      MsgType: MsgTypes.SECURITY_STATUS,
      SecurityStatusReqID: generateRequestId(),
      SubscriptionRequestType: '1',
      Instruments: symbols,
    };

    const formatTicker = (data) => {
      return {
        ...data,
        SellVolume: data.SellVolume / 1e8,
        LowPx: data.LowPx / 1e8,
        LastPx: data.LastPx / 1e8,
        BestAsk: data.BestAsk / 1e8,
        HighPx: data.HighPx / 1e8,
        BuyVolume: data.BuyVolume / 1e8,
        BestBid: data.BestBid / 1e8,
      };
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        resolve(formatTicker(data));
        registerEventEmitter({ SecurityStatusReqID: data.SecurityStatusReqID }, (ticker) => {
          callback && callback(null, formatTicker(ticker));
          return this.eventEmitter.emit(`BLINK:${ticker.Symbol}`, formatTicker(ticker));
        });
      }).catch(reject);
    }), callback);
  }

  unSubscribeTicker(SecurityStatusReqID: number): number {
    const msg = {
      MsgType: MsgTypes.SECURITY_STATUS,
      SecurityStatusReqID,
      SubscriptionRequestType: '2',
    };

    super.sendMessage(msg);
    return SecurityStatusReqID;
  }

  subscribeOrderbook(symbols: Array<string>, callback?: Function): PromiseEmitter<Object> {
    const msg = {
      MsgType: MsgTypes.MARKET_DATA_FULL_REFRESH,
      MDReqID: generateRequestId(),
      SubscriptionRequestType: '1',
      MarketDepth: 0,
      MDUpdateType: '1', // Incremental refresh
      MDEntryTypes: ['0', '1', '2'],
      Instruments: symbols,
    };

    const subscribeEvent = (data) => {
      if (data.MDBkTyp === '3') {
        data.MDIncGrp.map(order => {
          const dataOrder = {
            index: order.MDEntryPositionNo,
            price: order.MDEntryPx / 1e8,
            size: order.MDEntrySize / 1e8,
            side: order.MDEntryType === '0' ? 'buy' : 'sell',
            userId: order.UserID,
            orderId: order.OrderID,
            symbol: order.Symbol,
            time: new Date(`${order.MDEntryDate} ${order.MDEntryTime}`).toString(),
          };

          switch (order.MDEntryType) {
            case '0':
            case '1':
              const orderbookEvent = `${ORDER_BOOK}:${EVENTS.ORDERBOOK[order.MDUpdateAction]}`;
              const bidOfferData = { ...dataOrder, type: orderbookEvent };

              callback && callback(null, bidOfferData);
              return this.eventEmitter.emit(orderbookEvent, bidOfferData);
            case '2':
              const tradeEvent = `${ORDER_BOOK}:${EVENTS.TRADES[order.MDUpdateAction]}`;
              const tradeData = { ...dataOrder, type: tradeEvent };

              callback && callback(null, tradeData);
              return this.eventEmitter.emit(tradeEvent, tradeData);
            case '4':
              break;
            default:
              return null;
          }
          return null;
        });
      }
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        if (data.MsgType === 'W') {
          // Split orders in bids and asks
          /* eslint-disable no-param-reassign */
          const { bids, asks } = data.MDFullGrp
          .filter(order => order.MDEntryType === '0' || order.MDEntryType === '1')
          .reduce((prev, order) => {
            const side = order.MDEntryType === '0' ? 'bids' : 'asks';
            (prev[side] || (prev[side] = [])).push([
              order.MDEntryPx / 1e8,
              order.MDEntrySize / 1e8,
              order.UserID,
            ]);
            return prev;
          }, []);
          /* eslint-enable no-param-reassign */

          registerEventEmitter({ MDReqID: data.MDReqID }, subscribeEvent);

          return resolve({
            ...data,
            MDFullGrp: {
              [data.Symbol]: {
                bids,
                asks,
              },
            },
          });
        }
      }).catch(err => reject(err));
    }), callback);
  }

  unSubscribeOrderbook(MDReqID: number): number {
    const msg = {
      MsgType: MsgTypes.MARKET_DATA_UNSUBSCRIBE,
      MDReqID,
      MarketDepth: 0,
      SubscriptionRequestType: '2',
    };

    super.sendMessage(msg);
    return MDReqID;
  }

  executionReport(callback?: Function): EventEmitter {
    registerListener('8', (data) => {
      callback && callback(data);
      const event = EVENTS.EXECUTION_REPORT[data.ExecType];
      return this.eventEmitter.emit(`${EXECUTION_REPORT}:${event}`, data);
    });

    return this.eventEmitter;
  }

  tradeHistory({ since, filter, page: Page = 0, pageSize: PageSize = 80 }: {
    since?: string,
    filter?: Array<string>,
    page?: number,
    pageSize?: number,
  } = {}, callback?: Function): Promise<Object> {
    const msg: Object = {
      MsgType: MsgTypes.TRADE_HISTORY,
      TradeHistoryReqID: generateRequestId(),
      Page,
      PageSize,
    };

    if (filter && filter.length > 0) {
      msg.Filter = filter;
    }

    if (since && typeof since === 'number') {
      msg.Since = since;
    }

    return nodeify.extend(new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        const { Columns, ...trades } = data;
        const TradeHistory = _.groupBy(_.map(data.TradeHistoryGrp, trade => _.zipObject(Columns, trade)), trade => trade.Market);
        return resolve({
          ...trades,
          TradeHistoryGrp: TradeHistory,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number,
    currency?: string,
    depositMethodId?: number,
  } = {}, callback?: Function): PromiseEmitter<Object> {
    const subscribeEvent = (deposit) => {
      callback && callback(null, deposit);
      return this.eventEmitter.emit(DEPOSIT_REFRESH, deposit);
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.requestDeposit({ currency, value, depositMethodId })
      .then(deposit => {
        registerEventEmitter({ ClOrdID: deposit.ClOrdID }, subscribeEvent);
        return resolve(deposit);
      }).catch(reject);
    }), callback);
  }

  onDepositRefresh(callback?: Function): Promise<Object> {
    return new Promise((resolve) => {
      registerListener('U23', (deposit) => {
        callback && callback(deposit);
        return resolve(deposit);
      });
    });
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number,
    method?: string,
    currency?: string,
  }, callback?: Function): PromiseEmitter<Object> {
    const subscribeEvent = (withdraw) => {
      callback && callback(null, withdraw);
      return this.eventEmitter.emit(WITHDRAW_REFRESH, withdraw);
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.requestWithdraw({ amount, data, currency, method })
        .then(withdraw => {
          registerEventEmitter({ ClOrdID: withdraw.ClOrdID }, subscribeEvent);
          return resolve(withdraw);
        }).catch(reject);
    }), callback);
  }

  onWithdrawRefresh(callback?: Function): Promise<Object> {
    return new Promise((resolve) => {
      registerListener('U9', (withdraw) => {
        callback && callback(withdraw);
        return resolve(withdraw);
      });
    });
  }
}

export default BlinkTradeWS;
