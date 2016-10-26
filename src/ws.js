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

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg, callback).then((data) => {
        return resolve({
          ...data,
          Latency: new Date(Date.now()) - data.SendTime,
        });
      }).catch(reject);
    });
  }

  login({ username, password, secondFactor }: {
    username: string;
    password: string;
    secondFactor?: string;
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
      BrokerID: this.brokerId,
      Username: username,
      Password: password,
      UserReqTyp: '1',
      ...userAgent,
    };

    if (secondFactor) {
      msg.SecondFactor = secondFactor;
    }

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg, callback).then(data => {
        if (data.UserStatus === 1) {
          this.session = data;
          return resolve(data);
        }

        return reject(data);
      }).catch(reject);
    });
  }

  logout(callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.LOGOUT,
      BrokerID: this.brokerId,
      UserReqID: generateRequestId(),
      Username: this.session.Username,
      UserReqTyp: '2',
    };

    return super.sendMessageAsPromise(msg, callback);
  }

  profile(callback?: Function): Promise<Object> {
    const { VerificationData, ...profile } = this.session.Profile;
    return callback ? callback(profile) : Promise.resolve(profile);
  }

  balance(callback?: Function): Promise<Object> {
    registerListener('U3', (balance) => {
      callback && callback(null, balance);
      return this.eventEmitter.emit(BALANCE, balance);
    });

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.balance(callback).then(resolve).catch(reject);
    }));
  }

  subscribeTicker(symbols: Array<string>, callback?: Function): Promise<Object> {
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
      return super.sendMessageAsPromise(msg, callback).then(data => {
        resolve(formatTicker(data));
        registerEventEmitter({ SecurityStatusReqID: data.SecurityStatusReqID }, (ticker) => {
          callback && callback(null, formatTicker(ticker));
          return this.eventEmitter.emit(`BLINK:${ticker.Symbol}`, formatTicker(ticker));
        });
      }).catch(reject);
    }));
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

  subscribeOrderbook(symbols: Array<string>, callback?: Function): Promise<Object> {
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

          callback && callback(null, dataOrder);

          switch (order.MDEntryType) {
            case '0':
            case '1':
              const orderbookEvent = `${ORDER_BOOK}:${EVENTS.ORDERBOOK[order.MDUpdateAction]}`;
              return this.eventEmitter.emit(orderbookEvent, {
                ...dataOrder,
                type: orderbookEvent,
              });
            case '2':
              const tradeEvent = `${ORDER_BOOK}:${EVENTS.TRADES[order.MDUpdateAction]}`;
              return this.eventEmitter.emit(tradeEvent, {
                ...dataOrder,
                type: tradeEvent,
              });
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
      return super.sendMessageAsPromise(msg, callback).then(data => {
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
    }));
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
    since?: string;
    filter?: Array<string>;
    page?: number;
    pageSize?: number;
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

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg, callback).then(data => {
        const { Columns, ...trades } = data;
        const TradeHistory = _.groupBy(_.map(data.TradeHistoryGrp, trade => _.zipObject(Columns, trade)), trade => trade.Market);
        return resolve({
          ...trades,
          TradeHistoryGrp: TradeHistory,
        });
      }).catch(reject);
    });
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number;
    currency?: string;
    depositMethodId?: number;
  } = {}, callback?: Function): Promise<Object> {
    const subscribeEvent = (depositId) => (deposit) => {
      if (deposit.DepositID === depositId) {
        callback && callback(null, deposit);
        return this.eventEmitter.emit(DEPOSIT_REFRESH, deposit);
      }
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.requestDeposit({ currency, value, depositMethodId }, callback)
      .then(deposit => {
        registerListener('U23', subscribeEvent(deposit.DepositID));
        return resolve(deposit);
      }).catch(reject);
    }));
  }

  onDepositRefresh(callback: Function): Promise<Object> {
    return new Promise((resolve) => {
      registerListener('U23', (deposit) => {
        callback && callback(deposit);
        return resolve(deposit);
      });
    });
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number;
    method?: string;
    currency?: string;
  }, callback: Function): Promise<Object> {
    const subscribeEvent = (withdrawId) => (withdraw) => {
      if (withdraw.WithdrawID === withdrawId) {
        callback && callback(null, withdraw);
        return this.eventEmitter.emit(WITHDRAW_REFRESH, withdraw);
      }
    };

    return super.emitterPromise(new Promise((resolve, reject) => {
      return super.requestWithdraw({ amount, data, currency, method }, callback)
        .then(withdraw => {
          registerListener('U9', subscribeEvent(withdraw.WithdrawID));
          return resolve(withdraw);
        }).catch(reject);
    }));
  }

  onWithdrawRefresh(callback: Function): Promise<Object> {
    return new Promise((resolve) => {
      registerListener('U9', (withdraw) => {
        callback && callback(withdraw);
        return resolve(withdraw);
      });
    });
  }
}

export default BlinkTradeWS;
