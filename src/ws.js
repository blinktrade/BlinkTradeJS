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

import os from 'os';
import nodeify from 'nodeify';
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { generateRequestId } from './listener';

import type {
  Message,
  PromiseEmitter,
  BlinkTradeWSParams,
  BlinkTradeWSTransport,
} from './types';

import { EVENTS } from './constants/utils';
import {
  BALANCE,
  DEPOSIT_REFRESH,
  WITHDRAW_REFRESH,
  EXECUTION_REPORT,
} from './constants/actionTypes';

import { ActionMsgReq, ActionMsgRes } from './constants/messages';
import { formatOrderBook, formatIncremental, formatTradeHistory } from './util/utils';

import TradeBase from './trade';
import WebSocketTransport from './transports/websocket';
import { IS_NODE } from './transports/transport';

class BlinkTradeWS extends TradeBase {
  /**
   * Session to store login information
   */
  session: Object;

  transport: BlinkTradeWSTransport;

  constructor(params?: BlinkTradeWSParams = {}) {
    super(params);

    this.transport = params.transport || new WebSocketTransport(params);
    this.session = {};
  }

  connect(callback?: Function) {
    return this.emitterPromise(this.transport.connect(callback));
  }

  disconnect() {
    return this.transport.disconnect();
  }

  send(msg: Message): Promise<Object> {
    return this.transport.sendMessageAsPromise(msg);
  }

  on(event: string, callback: ?Function) {
    if (this.transport.eventEmitter) {
      return this.transport.eventEmitter.on(event, callback);
    }
  }

  emit(event: string, data: Object) {
    if (this.transport.eventEmitter) {
      return this.transport.eventEmitter.emit(event, data);
    }
  }

  emitterPromise(promise: Promise<Object> & Object, callback?: Function) {
    return this.transport.emitterPromise
      ? this.transport.emitterPromise(promise, callback)
      : promise;
  }

  heartbeat(callback?: Function): Promise<Object> {
    const d = new Date();
    const msg: Message = {
      MsgType: ActionMsgReq.HEARTBEAT,
      TestReqID: d.getTime(),
      SendTime: d.getTime(),
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        return resolve({
          ...data,
          Latency: new Date(Date.now()) - data.SendTime,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  login({ username, password, secondFactor, cancelOnDisconnect, brokerId, ...extraData }: {
    username: string,
    password: string,
    secondFactor?: string,
    brokerId?: number,
    trustedDevice?: boolean,
    cancelOnDisconnect?: boolean,
  }, callback?: Function): Promise<Object> {
    let userAgent;
    if (!IS_NODE) {
      userAgent = {
        UserAgent: window.navigator.userAgent,
        UserAgentLanguage: window.navigator.language,
        UserAgentPlatform: window.navigator.platform,
        UserAgentTimezoneOffset: new Date().getTimezoneOffset(),
      };
    } else {
      userAgent = {
        UserAgent: `${os.type()} ${os.release()}`,
        UserAgentLanguage: 'en_US',
        UserAgentPlatform: `${os.platform()} (${os.arch()})`,
        UserAgentTimezoneOffset: new Date().getTimezoneOffset(),
      };
    }

    const msg: Message = {
      MsgType: ActionMsgReq.LOGIN,
      UserReqID: generateRequestId(),
      BrokerID: brokerId || this.brokerId,
      Username: username,
      Password: password,
      UserReqTyp: '1',
      CancelOnDisconnect: cancelOnDisconnect ? '1' : '0',
      ...userAgent,
      ...extraData,
    };

    if (secondFactor) {
      msg.SecondFactor = secondFactor;
    }

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        if (data.UserStatus === 1) {
          this.session = data;
          return resolve(data);
        }

        return reject(data);
      }).catch(reject);
    })).nodeify(callback);
  }

  logout(callback?: Function): Promise<Object> {
    const msg: Message = {
      MsgType: ActionMsgReq.LOGIN,
      BrokerID: this.brokerId,
      UserReqID: generateRequestId(),
      Username: this.session.Username,
      UserReqTyp: '2',
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  profile(callback?: Function): Promise<Object> {
    const { VerificationData, ...profile } = this.session.Profile;
    return nodeify.extend(Promise.resolve(profile)).nodeify(callback);
  }

  balance(clientId?: string, callback?: Function): PromiseEmitter<Object> {
    return this.emitterPromise(new Promise((resolve, reject) => {
      return super.balance(clientId, callback).then((data) => {
        this.on(ActionMsgRes.BALANCE, (balance) => {
          callback && callback(null, balance);
          return this.emit(BALANCE, balance);
        });
        return resolve(data);
      }).catch(reject);
    }));
  }

  onBalanceUpdate(callback: Function) {
    return this.on(ActionMsgRes.BALANCE, callback);
  }

  subscribeTicker(symbols: Array<string>, callback?: Function): PromiseEmitter<Object> {
    const msg: Message = {
      MsgType: ActionMsgReq.SECURITY_STATUS_SUBSCRIBE,
      SecurityStatusReqID: generateRequestId(),
      SubscriptionRequestType: '1',
      Instruments: symbols,
    };

    const formatTicker = (data) => ({
      ...data,
      SellVolume: data.SellVolume / 1e8,
      LowPx: data.LowPx / 1e8,
      LastPx: data.LastPx / 1e8,
      BestAsk: data.BestAsk / 1e8,
      HighPx: data.HighPx / 1e8,
      BuyVolume: data.BuyVolume / 1e8,
      BestBid: data.BestBid / 1e8,
    });

    return this.emitterPromise(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const event = ActionMsgRes.SECURITY_STATUS_SUBSCRIBE + ':' + data.SecurityStatusReqID;
        this.on(event, (ticker) => {
          const tickerFormatted = formatTicker(ticker);
          callback && callback(null, tickerFormatted);
          return this.emit(`${ticker.Market}:${ticker.Symbol}`, tickerFormatted);
        });
        return resolve(formatTicker(data));
      }).catch(reject);
    }), callback);
  }

  unSubscribeTicker(SecurityStatusReqID: number): number {
    const msg: Message = {
      MsgType: ActionMsgReq.SECURITY_STATUS_SUBSCRIBE,
      SubscriptionRequestType: '2',
      SecurityStatusReqID,
    };

    this.transport.sendMessage(msg);
    return SecurityStatusReqID;
  }

  subscribeOrderbook(symbols: Array<string>, callback?: Function): PromiseEmitter<Object> {
    const msg: Message = {
      MsgType: ActionMsgReq.MD_FULL_REFRESH,
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
          const dataOrder = formatIncremental(order, this.level);
          switch (order.MDEntryType) {
            case '0':
            case '1':
              const orderbookEvent = `OB:${EVENTS.ORDERBOOK[order.MDUpdateAction]}`;
              const bidOfferData = { ...dataOrder, type: orderbookEvent };

              callback && callback(null, bidOfferData);
              return this.emit(orderbookEvent, bidOfferData);
            case '2':
              const tradeEvent = `OB:${EVENTS.TRADES[order.MDUpdateAction]}`;
              const tradeData = { ...dataOrder, type: tradeEvent };

              callback && callback(null, tradeData);
              return this.emit(tradeEvent, tradeData);
            case '4':
              break;
            default:
              return null;
          }
          return null;
        });
      }
    };

    return this.emitterPromise(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        this.on(ActionMsgRes.MD_INCREMENT + ':' + data.MDReqID, subscribeEvent);
        return resolve(formatOrderBook(data, this.level));
      }).catch(err => reject(err));
    }), callback);
  }

  unSubscribeOrderbook(MDReqID: number): number {
    const msg: Message = {
      MsgType: ActionMsgReq.MD_FULL_REFRESH,
      MDReqID,
      MarketDepth: 0,
      SubscriptionRequestType: '2',
    };

    this.transport.sendMessage(msg);
    return MDReqID;
  }

  executionReport(callback?: Function): EventEmitter {
    return this.on(ActionMsgRes.EXECUTION_REPORT, (data) => {
      callback && callback(data);
      const event = EVENTS.EXECUTION_REPORT[data.ExecType];
      return this.emit(`${EXECUTION_REPORT}:${event}`, data);
    });
  }

  tradeHistory({ since, symbols, page: Page = 0, pageSize: PageSize = 100 }: {
    since?: number,
    symbols?: Array<string>,
    page?: number,
    pageSize?: number,
  } = {}, callback?: Function): Promise<Object> {
    const msg: Message = {
      MsgType: ActionMsgReq.TRADE_HISTORY,
      TradeHistoryReqID: generateRequestId(),
      Page,
      PageSize,
    };

    if (symbols && symbols.length > 0) {
      msg.SymbolList = symbols;
    }

    if (since && typeof since === 'number') {
      msg.Since = since;
    }

    const format = formatTradeHistory(this.level);

    return nodeify.extend(this.send(msg).then(format)).nodeify(callback);
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number,
    currency?: string,
    depositMethodId?: number,
  } = {}, callback?: Function): PromiseEmitter<Object> {
    const subscribeEvent = (deposit) => {
      callback && callback(null, deposit);
      return this.emit(DEPOSIT_REFRESH, deposit);
    };

    return this.emitterPromise(new Promise((resolve, reject) => {
      return super.requestDeposit({ currency, value, depositMethodId }).then(deposit => {
        const event = ActionMsgRes.DEPOSIT_REFRESH + ':' + deposit.ClOrdID;
        this.on(event, subscribeEvent);
        return resolve(deposit);
      }).catch(reject);
    }), callback);
  }

  onDepositRefresh(callback?: Function) {
    return this.on(ActionMsgRes.DEPOSIT_REFRESH, callback);
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number,
    method?: string,
    currency?: string,
  }, callback?: Function): PromiseEmitter<Object> {
    const subscribeEvent = (withdraw) => {
      callback && callback(null, withdraw);
      return this.emit(WITHDRAW_REFRESH, withdraw);
    };

    return this.emitterPromise(new Promise((resolve, reject) => {
      return super.requestWithdraw({ amount, data, currency, method }).then(withdraw => {
        this.on(ActionMsgRes.WITHDRAW_REFRESH + ':' + withdraw.ClOrdID, subscribeEvent);
        return resolve(withdraw);
      }).catch(reject);
    }), callback);
  }

  onWithdrawRefresh(callback?: Function) {
    return this.on(ActionMsgRes.WITHDRAW_REFRESH, callback);
  }
}

export default BlinkTradeWS;
