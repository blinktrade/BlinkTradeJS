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

import nodeify from 'nodeify';
import { ActionMsgReq } from './constants/messages';
import { formatColumns } from './util/utils';
import { generateRequestId } from './listener';

type StatusListType = '1' | '2' | '4' | '8';

class TradeBase {
  env: BlinkTradeEnv;

  level: number;

  brokerId: number;

  send: (msg: Object) => Promise<Object>;

  +fetchTrade: (msg: Object) => Promise<Object>;

  +sendMessageAsPromise: (msg: Object) => Promise<Object>;

  constructor(params?: BlinkTradeBase = {}) {
    this.level = params.level === undefined ? 2 : params.level;

    this.brokerId = params.brokerId || 4;
  }

  changeBrokerId(brokerId: number) {
    this.brokerId = brokerId;
  }

  balance(clientId, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: ActionMsgReq.BALANCE,
      BalanceReqID: generateRequestId(),
    };

    if (clientId) {
      msg.ClientID = clientId;
    }

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  myOrders({
    page: Page = 0,
    pageSize: PageSize = 40,
    filter,
  }: {
    page?: number,
    pageSize?: number,
    filter: Array<string>,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: ActionMsgReq.ORDER_HISTORY,
      OrdersReqID: generateRequestId(),
      Page,
      PageSize,
    };

    if (filter) {
      msg.Filter = filter;
    }

    const format = formatColumns('OrdListGrp', this.level);

    return nodeify.extend(this.send(msg).then(format)).nodeify(callback);
  }

  sendOrder({ side, amount, price, symbol, clientId }: {
    side: '1' | '2',
    price: number,
    amount: number,
    symbol: string,
    clientId?: string,
  }, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: ActionMsgReq.ORDER_SEND,
      ClOrdID: clientId || generateRequestId().toString(),
      Symbol: symbol,
      Side: side,
      OrdType: '2',
      Price: price,
      OrderQty: amount,
      BrokerID: this.brokerId,
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  cancelOrder(param?: number | {
    orderId?: number,
    clientId?: string,
  } = {}, callback?: Function): Promise<Object> {
    const orderId = param.orderId ? param.orderId : param;
    const msg: Object = {
      MsgType: ActionMsgReq.ORDER_CANCEL,
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
   * status: 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled
   */
  requestWithdrawList({
    page: Page = 0,
    pageSize: PageSize = 20,
    status: StatusList = ['1', '2', '4', '8'],
    filter,
    clientId,
  }: {
    page?: number,
    pageSize?: number,
    clientId: string,
    filter?: Array<string>,
    status?: Array<StatusListType>,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: ActionMsgReq.WITHDRAW_LIST,
      WithdrawListReqID: generateRequestId(),
      Page,
      PageSize,
      StatusList,
    };

    if (filter && filter.length) {
      msg.Filter = filter;
    }

    if (clientId) {
      msg.ClientID = clientId;
    }

    const format = formatColumns('WithdrawListGrp', this.level);

    return nodeify.extend(this.send(msg).then(format)).nodeify(callback);
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number,
    method?: string,
    currency?: string,
  }, callback?: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg = {
      MsgType: ActionMsgReq.WITHDRAW_REQUEST,
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
      MsgType: ActionMsgReq.WITHDRAW_CONFIRM,
      WithdrawReqID: generateRequestId(),
      WithdrawID,
    };

    if (confirmationToken) {
      msg.ConfirmationToken = confirmationToken;
    }

    if (secondFactor) {
      msg.SecondFactor = secondFactor;
    }

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  cancelWithdraw(withdrawId: string, callback: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg = {
      MsgType: ActionMsgReq.WITHDRAW_CANCEL,
      WithdrawCancelReqID: reqId,
      ClOrdID: reqId,
      WithdrawID: withdrawId,
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  requestDepositList({
    page: Page = 0,
    pageSize: PageSize = 20,
    status: StatusList = ['1', '2', '4', '8'],
    filter,
    clientId,
  }: {
    page: number,
    pageSize: number,
    status: Array<StatusListType>,
    filter?: Array<string>,
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: ActionMsgReq.DEPOSIT_LIST,
      DepositListReqID: generateRequestId(),
      Page,
      PageSize,
      StatusList,
    };

    if (filter && filter.length) {
      msg.Filter = filter;
    }

    if (clientId) {
      msg.ClientID = clientId;
    }

    const format = formatColumns('DepositListGrp', this.level);

    return nodeify.extend(this.send(msg).then(format)).nodeify(callback);
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number,
    currency?: string,
    depositMethodId?: number,
  } = {}, callback?: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg: Object = {
      MsgType: ActionMsgReq.DEPOSIT_REQUEST,
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
      MsgType: ActionMsgReq.DEPOSIT_METHODS,
      DepositMethodReqID: generateRequestId(),
      BrokerID: this.brokerId,
    };

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  requestLedger({
    page: Page = 0,
    pageSize: PageSize = 20,
    brokerId,
    clientId,
    currency,
  }: {
    page: number,
    pageSize: number,
    currency: string,
    brokerId?: number,
    clientId?: string,
  } = {}, callback?: Function) {
    const msg: Object = {
      MsgType: ActionMsgReq.LEDGER_LIST,
      LedgerListReqID: generateRequestId(),
      BrokerID: this.brokerId,
      Page,
      PageSize,
    };

    if (brokerId) {
      msg.BrokerID = brokerId;
    }
    if (currency) {
      msg.Currency = currency;
    }
    if (clientId) {
      msg.ClientID = clientId;
    }

    const format = formatColumns('LedgerListGrp', this.level);

    return nodeify.extend(this.send(msg).then(format)).nodeify(callback);
  }
}

export default TradeBase;
