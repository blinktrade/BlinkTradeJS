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
import Base from './base';
import MsgTypes from './constants/requests';
import * as RequestTypes from './constants/requestTypes';
import {
  deleteRequest,
  generateRequestId,
} from './listener';

type StatusListType = '1' | '2' | '4' | '8';

class BaseTransport extends Base {

  env: BlinkTradeEnv;

  send: (msg: Object) => Promise<Object>;

  +fetchTrade: (msg: Object) => Promise<Object>;

  +sendMessageAsPromise: (msg: Object) => Promise<Object>;

  constructor(params?: BlinkTradeBase, env: BlinkTradeEnv) {
    super(params, env);
    this.send = env === 'ws' ? this.sendMessageAsPromise : this.fetchTrade;
  }

  balance(callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.BALANCE,
      BalanceReqID: generateRequestId(),
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const Available = {};
        const balances = data[this.brokerId];
        Object.keys(balances).map(currency => {
          if (!currency.includes('locked')) {
            Available[currency] = balances[currency] - balances[`${currency}_locked`];
          }
          return Available;
        });

        return resolve({ ...data, Available });
      }).catch(reject);
    })).nodeify(callback);
  }

  myOrders({ page: Page = 0, pageSize: PageSize = 40 }: {
    page?: number,
    pageSize?: number,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.ORDER_LIST,
      OrdersReqID: generateRequestId(),
      Page,
      PageSize,
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const { Columns, ...orders } = data;
        const OrdListGrp = _.map(data.OrdListGrp, order => _.zipObject(Columns, order));
        return resolve({
          ...orders,
          OrdListGrp,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  sendOrder({ side, amount, price, symbol }: {
    side: '1' | '2',
    price: number,
    amount: number,
    symbol: string,
  }, callback?: Function): Promise<Object> {
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

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        deleteRequest(RequestTypes.CLIENT_ORDER_ID);
        resolve(data);
      }).catch(reject);
    })).nodeify(callback);
  }

  cancelOrder(param?: number | {
    orderId?: number,
    clientId?: number,
  } = {}, callback?: Function): Promise<Object> {
    const orderId = param.orderId ? param.orderId : param;
    const msg: Object = {
      MsgType: MsgTypes.ORDER_CANCEL,
    };

    if (param.clientId) {
      msg.ClOrdID = param.clientId;
    }

    if (param.orderId) {
      msg.OrderID = orderId;
    }

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  /**
   * statusList: 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled
   */
  requestWithdrawList({
    page: Page = 0,
    pageSize: PageSize = 20,
    statusList: StatusList = ['1', '2', '4', '8'],
  }: {
    page?: number,
    pageSize?: number,
    statusList?: Array<StatusListType>,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.REQUEST_WITHDRAW_LIST,
      WithdrawListReqID: generateRequestId(),
      Page,
      PageSize,
      StatusList,
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const { Columns, ...withdrawData } = data;
        const WithdrawListGrp = _.map(data.WithdrawListGrp, withdraw => _.zipObject(Columns, withdraw));
        return resolve({
          ...withdrawData,
          WithdrawListGrp,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number,
    method?: string,
    currency?: string,
  }, callback?: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg = {
      MsgType: MsgTypes.REQUEST_WITHDRAW,
      WithdrawReqID: reqId,
      ClOrdID: reqId,
      Method: method,
      Amount: amount,
      Currency: currency,
      Data: data,
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  confirmWithdraw({ withdrawId: WithdrawID, confirmationToken, secondFactor }: {
    withdrawId: string,
    confirmationToken?: string,
    secondFactor?: string,
  }, callback: Function): Promise<Object> {
    const msg: Object = {
      MsgType: MsgTypes.CONFIRM_WITHDRAW,
      WithdrawReqID: generateRequestId(),
      WithdrawID,
    };

    if (confirmationToken) {
      msg.ConfirmationToken = confirmationToken;
    }

    if (secondFactor) {
      msg.SecondFactor = secondFactor;
    }

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        return resolve({
          ...data,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  cancelWithdraw(withdrawId: string, callback: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg = {
      MsgType: MsgTypes.CANCEL_WITHDRAW,
      WithdrawCancelReqID: reqId,
      ClOrdID: reqId,
      WithdrawID: withdrawId,
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        return resolve({
          ...data,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  requestDepositList({
    page: Page = 0,
    pageSize: PageSize = 20,
    status: StatusList = ['1', '2', '4', '8'],
  }: {
    page: number,
    pageSize: number,
    status: Array<StatusListType>,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.REQUEST_DEPOSIT_LIST,
      DepositListReqID: generateRequestId(),
      Page,
      PageSize,
      StatusList,
    };

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const { Columns, ...depositData } = data;
        const DepositListGrp = _.map(data.DepositListGrp, deposit => _.zipObject(Columns, deposit));
        return resolve({
          ...depositData,
          DepositListGrp,
        });
      }).catch(reject);
    })).nodeify(callback);
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number,
    currency?: string,
    depositMethodId?: number,
  } = {}, callback?: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg: Object = {
      MsgType: MsgTypes.REQUEST_DEPOSIT,
      DepositReqID: reqId,
      ClOrdID: reqId,
      Currency: currency,
      BrokerID: this.brokerId,
    };

    if (currency !== 'BTC') {
      msg.DepositMethodID = depositMethodId;
      msg.Value = value;
    }

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  requestDepositMethods(callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.REQUEST_DEPOSIT_METHODS,
      DepositMethodReqID: generateRequestId(),
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  requestLedger({
    page: Page = 0,
    pageSize: PageSize = 20,
    currency,
    filter,
  }: {
    page: number,
    pageSize: number,
    currency: string,
    filter: Array<string>,
  } = {}, callback?: Function) {
    const msg: Object = {
      MsgType: MsgTypes.REQUEST_LEDGER,
      LedgerListReqID: generateRequestId(),
      Page,
      PageSize,
    };

    if (currency) {
      msg.Currency = currency;
    }
    if (filter) {
      msg.Filter = filter;
    }

    return nodeify.extend(new Promise((resolve, reject) => {
      return this.send(msg).then(data => {
        const { Columns, ...ledgerData } = data;
        const LedgerListGrp = _.map(data.LedgerListGrp, ledger => _.zipObject(Columns, ledger));
        resolve({
          ...ledgerData,
          LedgerListGrp,
        });
      }).catch(reject);
    })).nodeify(callback);
  }
}

export default BaseTransport;
