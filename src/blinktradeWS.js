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

import MsgTypes from './constants/requests';
import * as RequestTypes from './constants/requestTypes';

import WebSocketTransport from './transports/WebSocketTransport';
import { EventEmitter } from 'events';
import {
  deleteRequest,
  registerListener,
  generateRequestId,
  registerEventEmitter,
} from './listener';

import {
  BALANCE,
  TRADE_NEW,
  ORDER_BOOK_NEW_ORDER,
  ORDER_BOOK_UPDATE_ORDER,
  ORDER_BOOK_DELETE_ORDER,
  ORDER_BOOK_DELETE_ORDERS_THRU,

  EXECUTION_REPORT_NEW,
  EXECUTION_REPORT_PARTIAL,
  EXECUTION_REPORT_EXECUTION,
  EXECUTION_REPORT_CANCELED,
  EXECUTION_REPORT_REJECTED,
} from './constants/actionTypes';


type Order = {
  side: '1' | '2';
  price: number;
  amount: number;
  symbol: string;
};

class BlinkTradeWS extends WebSocketTransport {

  constructor(params) {
    super(params);

    this.eventEmitter = new EventEmitter();
  }

  heartbeat(): Promise {
    const d = new Date();
    const msg: any = {
      MsgType: MsgTypes.HEARTBEAT,
      TestReqID: d.getTime(),
      SendTime: d.getTime(),
    };

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then((data) => {
        return resolve({
          ...data,
          Latency: new Date(Date.now()) - data.SendTime,
        });
      }).catch(reject);
    });
  }

  login(username: string, password: string, secondFactor?: string): Promise {
    let userAgent;
    if (!this.isNode) {
      userAgent = {
        UserAgent: window.navigator.userAgent,
        UserAgentLanguage: window.navigator.language,
        UserAgentPlatform: window.navigator.platform,
        UserAgentTimezoneOffset: new Date().getTimezoneOffset(),
      };
    }

    const msg: any = {
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
      return super.sendMessageAsPromise(msg).then(data => {
        if (data.UserStatus === 1) {
          this.session = data;
          return resolve(data);
        }

        return reject(data);
      });
    });
  }

  logout(): Promise {
    const msg = {
      MsgType: MsgTypes.LOGOUT,
      BrokerID: this.brokerId,
      UserReqID: generateRequestId(),
      Username: this.session.Username,
      UserReqTyp: '2',
    };

    return super.sendMessageAsPromise(msg);
  }

  profile(): Promise {
    const { VerificationData, ...profile } = this.session.Profile;
    return Promise.resolve(profile);
  }

  changePassword(username: string, password: string, newPassword: string): Promise {
    const msg = {
      MsgType: MsgTypes.CHANGE_PASSWORD,
      UserReqID: generateRequestId(),
      UserReqTyp: '3',
      BrokerID: this.brokerId,
      Username: username,
      Password: password,
      NewPassword: newPassword,
    };

    return super.sendMessageAsPromise(msg);
  }

  balance(): Promise {
    const msg = {
      MsgType: MsgTypes.BALANCE,
      BalanceReqID: generateRequestId(),
    };

    registerListener('U3', (balance) => {
      return this.eventEmitter.emit(BALANCE, balance);
    });

    const promise = new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        const Available = {};
        const balances = data[this.brokerId];
        Object.keys(balances).map(currency => {
          if (!currency.includes('locked')) {
            Available[currency] = balances[currency] - balances[`${currency}_locked`];
          }
        });

        return resolve({ ...data, Available });
      }).catch(reject);
    });

    promise.on = (...args) => {
      this.eventEmitter.on(...args);
      return promise;
    };

    return promise;
  }

  subscribeTicker(symbols: Array<string>): Promise {
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

    const promise = new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        resolve(formatTicker(data));
        registerEventEmitter({ SecurityStatusReqID: data.SecurityStatusReqID }, (ticker) => {
          return this.eventEmitter.emit(`BLINK:${data.Symbol}`, formatTicker(ticker));
        });
      }).catch(reject);
    });

    promise.on = (...args) => {
      this.eventEmitter.on(...args);
      return promise;
    };

    return promise;
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

  subscribeOrderbook(symbols: Array<string>): Promise {
    const msg = {
      MsgType: MsgTypes.MARKET_DATA_FULL_REFRESH,
      MDReqID: generateRequestId(),
      SubscriptionRequestType: '1',
      MarketDepth: 0,
      MDUpdateType: '1', // Incremental refresh
      MDEntryTypes: ['0', '1', '2'],
      Instruments: symbols,
    };

    const promise = new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        if (data.MsgType === 'W') {
          const buy = data.MDFullGrp.filter(order => order.MDEntryType === '0');
          const sell = data.MDFullGrp.filter(order => order.MDEntryType === '1');
          registerEventEmitter({ MDReqID: data.MDReqID }, subscribeEvent);
          return resolve({
            ...data,
            MDFullGrp: {
              0: buy,
              1: sell,
            },
          });
        }
      }).catch(err => reject(err));
    });

    promise.on = (...args) => {
      // return promise on EventEmitter
      this.eventEmitter.on(...args);
      return promise;
    };

    const subscribeEvent = (data) => {
      if (data.MDBkTyp === '3') {
        data.MDIncGrp.map(order => {
          switch (order.MDEntryType) {
            case '0':
            case '1':
              return order.MDUpdateAction === '0' ? this.eventEmitter.emit(ORDER_BOOK_NEW_ORDER, data)
                   : order.MDUpdateAction === '1' ? this.eventEmitter.emit(ORDER_BOOK_UPDATE_ORDER, data)
                   : order.MDUpdateAction === '2' ? this.eventEmitter.emit(ORDER_BOOK_DELETE_ORDER, data)
                   : order.MDUpdateAction === '3' ? this.eventEmitter.emit(ORDER_BOOK_DELETE_ORDERS_THRU, data)
                   : null;
            case '2':
              return this.eventEmitter.emit(TRADE_NEW, data);
            case '4':
              break;
            default:
              return null;
          }
          return null;
        });
      }
    };

    return promise;
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

  sendOrder({ side, amount, price, symbol }: Order): Promise {
    const msg = {
      MsgType: MsgTypes.ORDER_SEND,
      ClOrdID: generateRequestId(),
      Symbol: symbol,
      Side: side,
      OrdType: '2',
      Price: price,
      OrderQty: amount,
      BrokerID: this.brokerId,
    };

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        deleteRequest(RequestTypes.CLIENT_ORDER_ID);
        resolve(data);
      }).catch(reject);
    });
  }

  cancelOrder(orderId: number, clientId: number): Promise {
    const msg = {
      MsgType: MsgTypes.ORDER_CANCEL,
      OrderID: orderId,
    };

    if (clientId) {
      msg.ClOrdID = clientId;
    }

    return super.sendMessageAsPromise(msg);
  }

  myOrders(page: number, pageSize: number): Promise {
    const msg = {
      MsgType: MsgTypes.ORDER_LIST,
      OrdersReqID: generateRequestId(),
      Page: page || 0,
      PageSize: pageSize || 40,
    };

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        const { Columns, ...orders } = data;
        const OrdListGrp = [];
        data.OrdListGrp.map(order => {
          return OrdListGrp.push({
            ClOrdID: order[0],
            OrderID: order[1],
            CumQty: order[2],
            OrdStatus: order[3],
            LeavesQty: order[4],
            CxlQty: order[5],
            AvgPx: order[6],
            Symbol: order[7],
            Side: order[8],
            OrdType: order[9],
            OrderQty: order[10],
            Price: order[11],
            OrderDate: order[12],
            Volume: order[13],
            TimeInForce: order[14],
          });
        });
        return resolve({
          ...orders,
          OrdListGrp,
        });
      }).catch(reject);
    });
  }

  executionReport(): Promise {

    registerListener('8', (data) => {
      return data.ExecType === '0' ? this.eventEmitter.emit(EXECUTION_REPORT_NEW, data)
           : data.ExecType === '1' ? this.eventEmitter.emit(EXECUTION_REPORT_PARTIAL, data)
           : data.ExecType === '2' ? this.eventEmitter.emit(EXECUTION_REPORT_EXECUTION, data)
           : data.ExecType === '4' ? this.eventEmitter.emit(EXECUTION_REPORT_CANCELED, data)
           : data.ExecType === '8' ? this.eventEmitter.emit(EXECUTION_REPORT_REJECTED, data)
           : null;
    });

    return this.eventEmitter;
  }

  tradeHistory(page: number, pageSize: number): Promise {
    const msg = {
      MsgType: MsgTypes.TRADE_HISTORY,
      TradeHistoryReqID: generateRequestId(),
      Page: page || 0,
      PageSize: pageSize || 80,
    };

    return new Promise((resolve, reject) => {
      return super.sendMessageAsPromise(msg).then(data => {
        let last = 0;
        let IsPump = false;
        const { Columns, ...trades } = data;
        const TradeHistory = {};

        data.TradeHistoryGrp.reverse().map(trade => {
          IsPump = last === trade[3] ? IsPump : last <= trade[3];

          last = trade[3];
          TradeHistory[trade[1]] = TradeHistory[trade[1]] || [];
          return TradeHistory[trade[1]].unshift({
            TradeID: trade[0],
            Market: trade[1],
            Side: trade[2],
            Price: trade[3],
            Size: trade[4],
            Buyer: trade[5],
            Seller: trade[6],
            Created: trade[7],
            IsPump,
          });
        });

        return resolve({
          ...trades,
          TradeHistoryGrp: TradeHistory,
        });
      }).catch(reject);
    });
  }
}

export default BlinkTradeWS;
