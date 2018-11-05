/* @flow */
import type { OrderType } from '../src/types';

export const promptMenu = (logged: boolean) => [{
  type: 'list',
  name: 'action',
  pageSize: 20,
  message: 'Choose an action',
  choices: !logged ? ['login'] : [
    'heartbeat',
    'balance',
    'requestDeposit',
    'requestDepositList',
    'requestWithdraw',
    'requestWithdrawList',
    'confirmWithdraw',
    'cancelWithdraw',
    'myOrders',
    'requestLedger',
    'sendOrder',
    'cancelOrder',
    'logout',
  ],
}];

export const promptLogin = [{
  type: 'input',
  name: 'username',
  message: 'API Key',
}, {
  type: 'password',
  name: 'password',
  message: 'API Password',
}];

export const promptRest = [{
  type: 'input',
  name: 'key',
  message: 'API Key',
}, {
  type: 'password',
  name: 'secret',
  message: 'API Secret',
}];

export const promptStatus = [{
  type: 'list',
  name: 'status',
  message: 'Choose an status',
  choices: [
    'All',
    'Unconfirmed',
    'Pending',
    'InProgress',
    'Completed',
    'Cancelled',
  ],
}];

export const promptCurrency = [{
  type: 'input',
  name: 'currency',
  message: 'Currency (BRL, BTC)',
}];

export const promptMethod = [{
  type: 'input',
  name: 'method',
  message: 'Method',
}];

export const promptDepositRequest = [{
  type: 'input',
  name: 'amount',
  message: 'Amount Value',
}, {
  type: 'input',
  name: 'method',
  message: 'Method ID',
}];

export const promptWithdrawRequest = [{
  type: 'input',
  name: 'amount',
  message: 'Amount Value',
}, {
  type: 'input',
  name: 'data',
  message: 'Data Fields',
}, {
  type: 'input',
  name: 'memo',
  message: 'Memo',
}];

export const promptOrderHistory = [{
  type: 'list',
  name: 'filter',
  message: 'Choose an status',
  choices: [
    'all',
    'open',
    'filled',
    'cancelled',
  ],
}];

export const promptOrderType = [{
  type: 'list',
  name: 'type',
  message: 'Order type',
  choices: [
    'MARKET',
    'LIMIT',
    'STOP',
    'STOP_LIMIT',
  ],
}];

export const promptSendOrder = (type: OrderType) => {
  const data = [{
    type: 'list',
    name: 'side',
    message: 'Buy or Sell',
    choices: ['BUY', 'SELL'],
  }, {
    type: 'input',
    name: 'amount',
    message: 'Amount',
  }];

  if (type === 'STOP' || type === 'STOP_LIMIT') {
    data.push({
      type: 'input',
      name: 'stopPrice',
      message: 'Stop Price',
    });
  }

  if (type !== 'MARKET' && type !== 'STOP') {
    data.push({
      type: 'input',
      name: 'price',
      message: 'Price',
    });
  }

  data.push({
    type: 'input',
    name: 'symbol',
    message: 'Symbol',
  });

  if (type === 'LIMIT') {
    data.push({
      type: 'confirm',
      name: 'postOnly',
      message: 'Post Only?',
      default: false,
    });
  }

  return data;
};

export const promptCancelOrder = [{
  type: 'input',
  name: 'orderId',
  message: 'Order ID',
}, {
  type: 'input',
  name: 'clientId',
  message: 'Client ID',
}];
