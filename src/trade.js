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
import { ORDER_TYPE, ORDER_SIDE } from './constants/utils';

import type {
  Message,
  OrderSide,
  OrderType,
  StatusListType,
  BlinkTradeEnv,
  BlinkTradeParams,
  BlinkTradeLevel,
} from './types';

class TradeBase {
  env: BlinkTradeEnv;

  level: BlinkTradeLevel;

  brokerId: number;

  +send: (msg: Message) => Promise<Message>;

  constructor(params?: BlinkTradeParams = {}) {
    this.level = params.level === undefined ? 2 : params.level;

    this.brokerId = params.brokerId || 4;
  }

  changeBrokerId(brokerId: number) {
    this.brokerId = brokerId;
  }

  balance(clientId?: string, callback?: Function): Promise<Object> {
    const msg: Message = {
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
    filter?: Array<string>,
  } = {}, callback?: Function): Promise<Object> {
    const msg: Message = {
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

  sendOrder({ type, side, amount, price, stopPrice, symbol, postOnly, clientId }: {
    side: OrderSide,
    type: OrderType,
    price?: number,
    stopPrice?: number,
    amount: number,
    symbol: string,
    clientId?: string,
    postOnly?: boolean,
  }, callback?: Function): Promise<Object> {
    const msg: Message = {
      MsgType: ActionMsgReq.ORDER_SEND,
      ClOrdID: clientId || generateRequestId().toString(),
      Side: ORDER_SIDE[side] || side,
      OrdType: ORDER_TYPE[type] || ORDER_TYPE.LIMIT,
      Symbol: symbol,
      OrderQty: amount,
      BrokerID: this.brokerId,
    };

    if (price) {
      msg.Price = price;
    }
    if (stopPrice) {
      msg.StopPx = stopPrice;
    }
    if (postOnly) {
      msg.ExecInst = '6';
    }

    return nodeify.extend(this.send(msg)).nodeify(callback);
  }

  cancelOrder(param?: number | {
    orderId?: number,
    clientId?: string,
  } = {}, callback?: Function): Promise<Object> {
    const orderId = param.orderId ? param.orderId : param;
    const msg: Message = {
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
    filter,
    clientId,
    page: Page = 0,
    pageSize: PageSize = 20,
    status: StatusList = ['1', '2', '4', '8'],
  }: {
    page?: number,
    pageSize?: number,
    clientId: string,
    filter?: Array<string>,
    status?: Array<StatusListType>,
  } = {}, callback?: Function): Promise<Object> {
    const msg: Message = {
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
    const msg: Message = {
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
  }, callback?: Function): Promise<Object> {
    const msg: Message = {
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

  cancelWithdraw(withdrawId: string, callback?: Function): Promise<Object> {
    const reqId = generateRequestId();
    const msg: Message = {
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
    page?: number,
    pageSize?: number,
    status?: Array<StatusListType>,
    filter?: Array<string>,
    clientId?: string,
  } = {}, callback?: Function): Promise<Object> {
    const msg: Message = {
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
    const msg: Message = {
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
    const msg: Message = {
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
    page?: number,
    pageSize?: number,
    currency?: string,
    brokerId?: number,
    clientId?: string,
  } = {}, callback?: Function) {
    const msg: Message = {
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
