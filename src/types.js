/* @flow */
/* eslint-disable no-use-before-define */
import EventEmitter from 'eventemitter2';

export type BlinkTradeEnv =
  | 'ws'
  | 'rest'
  | 'wsBitcambio'
  | 'restBitcambio';

export type BlinkTradeLevel = 0 | 2;
export type BlinkTradeCurrencies = | 'USD' | 'BRL' | 'CLP' | 'VND';

export type BlinkTradeRestTransport = {
  +fetchPublic: (string) => Promise<Object>,
  +fetchTrade: (msg: Message) => Promise<Object>,
};

export type BlinkTradeWSTransport = {
  +connect: (callback?: Function) => Promise<Object>,
  +disconnect: () => void,
  +sendMessage: (msg: Message) => void,
  +sendMessageAsPromise: (msg: Message) => Promise<Object>,
  +emitterPromise?: (promise: any, callback?: Function) => PromiseEmitter<Object>,
  +eventEmitter: EventEmitter,
};

export type BlinkTradeParams = {
  url?: string,
  prod?: boolean,
  brokerId?: number,
  transport?: any,
  level?: BlinkTradeLevel,
};

export type BlinkTradeWSParams = {
  headers?: Object,
  fingerPrint?: string,
  reconnect?: boolean,
  reconnectInterval?: number,
  transport?: BlinkTradeWSTransport,
} & BlinkTradeParams;

export type BlinkTradeRestParams = {
  key?: string,
  secret?: string,
  currency?: BlinkTradeCurrencies,
  transport?: BlinkTradeRestTransport,
} & BlinkTradeParams;

export type Message = {
  MsgType: string,
} & Object;

export type MsgTypes = {
  [key: string]: [string, string]
};

export type Stun = {
  local: ?Array<string>,
  public: ?Array<string>,
};

export type StatusListType = '1' | '2' | '4' | '8';

export type OrderSide = 'BUY' | 'SELL' | '1' | '2';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';

export type ResolveReject = {
  resolve: Function,
  reject: Function,
};

export type PromiseEmitter<T> = Promise<T> & {
  on: (event: string, listener: Function) => PromiseEmitter<T>,
  onAny: (listener: Function) => PromiseEmitter<T>,
  offAny: (listener: Function) => PromiseEmitter<T>,
  once: (event: string, listener: Function) => PromiseEmitter<T>,
  many: (event: string, times: number, listener: Function) => PromiseEmitter<T>,
  removeListener: (event: string, listener: Function) => PromiseEmitter<T>,
  removeAllListeners: (events: Array<string>) => PromiseEmitter<T>,
};
