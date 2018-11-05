/* @flow */
import invariant from 'invariant';

import { BlinkTradeWS, BlinkTradeRest } from '../lib/blinktrade';

import type { OrderSide, OrderType, OrderFilter } from '../src/types';
import type { Commands } from './program';

type Undefined = typeof undefined;

type Transports = BlinkTradeRest | BlinkTradeWS;

const parseNumber = (value: ?string): number | Undefined => (value ? parseInt(value) : undefined);

const STATUS = {
  all: [],
  unconfirmed: ['0'],
  pending: ['1'],
  inprogress: ['2'],
  completed: ['4'],
  cancelled: ['8'],
};

export class BaseCLI {
  $key: Commands;
  $value: void;

  +blinktrade: Transports;

  constructor(blinktrade: Transports) {
    this.blinktrade = blinktrade;
  }

  async balance() {
    return this.blinktrade.balance();
  }

  async requestDeposit(options: {
    value?: string,
    method?: string,
    currency?: string,
  }) {
    if (options.currency !== 'BTC') {
      invariant(options.value, 'Error: --value is required');
      invariant(options.method, 'Error: --data option is required');
    }
    return this.blinktrade.requestDeposit({
      value: options.value ? parseFloat(options.value) * 1e8 : undefined,
      depositMethodId: parseNumber(options.method),
      currency: options.currency,
    });
  }

  async requestDepositList(options: {
    status?: string,
    page?: string,
    pageSize?: string,
  }) {
    return this.blinktrade.requestDepositList({
      status: options.status ? STATUS[options.status] : [],
      page: parseNumber(options.page),
      pageSize: parseNumber(options.pageSize),
    });
  }

  async requestWithdraw(options: {
    data: string,
    amount: string,
    method?: string,
    currency?: string,
  }) {
    invariant(options.amount, 'Error: --amount is required');
    invariant(options.data, 'Error: --data option is required');
    return this.blinktrade.requestWithdraw({
      amount: parseFloat(options.amount) * 1e8,
      data: JSON.parse(options.data),
      method: options.method,
      currency: options.currency,
    });
  }

  async requestWithdrawList(options: {
    status?: string,
    page?: string,
    pageSize?: string,
  }) {
    return this.blinktrade.requestWithdrawList({
      status: options.status ? STATUS[options.status] : [],
      page: parseNumber(options.page),
      pageSize: parseNumber(options.pageSize),
    });
  }

  async requestLedger(options: {
    page?: string,
    pageSize?: string,
  }) {
    return this.blinktrade.requestLedger({
      page: parseNumber(options.page),
      pageSize: parseNumber(options.pageSize),
    });
  }

  async requestBrokerList() {
    return this.blinktrade.requestBrokerList();
  }

  async myOrders(options: {
    filter?: OrderFilter,
    page?: string,
    pageSize?: string,
  }) {
    return this.blinktrade.myOrders({
      filter: options.filter,
      page: parseNumber(options.page),
      pageSize: parseNumber(options.pageSize),
    });
  }

  async sendOrder(options: {
    side: OrderSide,
    type: OrderType,
    price?: string,
    amount?: string,
    symbol?: string,
    clientId?: string,
    postOnly?: boolean,
    stopPrice?: string,
  }) {
    invariant(options.price
      || options.type === 'MARKET'
      || options.type === 'STOP', 'Error: --price is required');
    invariant(options.amount, 'Error: --amount is required');
    invariant(options.symbol, 'Error: --symbol is required');
    return this.blinktrade.sendOrder({
      type: options.type,
      side: options.side,
      symbol: options.symbol,
      clientId: options.clientId,
      postOnly: options.postOnly,
      price: parseFloat(options.price) * 1e8,
      amount: parseFloat(options.amount) * 1e8,
      stopPrice: options.stopPrice ? parseInt(options.stopPrice) * 1e8 : undefined,
    });
  }

  async cancelOrder(options: {
    orderId: string,
    clientId?: string,
  }) {
    invariant(options.orderId, 'Error: --orderId is required');
    return this.blinktrade.cancelOrder({
      orderId: parseInt(options.orderId),
      clientId: options.clientId,
    });
  }
}

export class RestCLI extends BaseCLI {
  blinktrade: BlinkTradeRest;

  async ticker() {
    return this.blinktrade.ticker();
  }

  async orderbook() {
    return this.blinktrade.orderbook();
  }

  async trades(options: {
    limit?: string,
    since?: string,
  }) {
    return this.blinktrade.trades({
      limit: parseNumber(options.limit),
      since: parseNumber(options.since),
    });
  }
}
