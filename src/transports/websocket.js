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

import WS from 'ws';
import nodeify from 'nodeify';
import Fingerprint2 from 'fingerprintjs2';
import EventEmitter from 'eventemitter2';
import { getMac } from '../util/macaddress';
import { getStun, closeStun } from '../util/stun';
import { encodeByteArray } from '../util/hash32';
import { MsgActionRes } from '../constants/messages';

import BROKERS from '../constants/brokers';

import Transport, { IS_NODE, IS_BROWSER } from './transport';

import {
  getRequest,
  setRequest,
  deleteRequest,
} from '../listener';

const RECONNECT_INTERVAL = 5000;

class WebSocketTransport extends Transport {
  /*
   * WebSocket Instance
   */
  socket: WebSocket;

  /*
   * FingerPrint
   */
  fingerPrint: string;

  /*
   * Stun object
   */
  stuntip: Stun;

  /*
   * Transport Promise
   */
  request: Request;

  /*
   * Event emitter to dispatch websocket updates
   */
  eventEmitter: EventEmitter;

  headers: Object;

  autoReconnect: boolean;

  reconnectInterval: number;

  constructor(params?: BlinkTradeWS = {}) {
    super(params, params.brokerId === BROKERS.BITCAMBIO ? 'wsBitcambio' : 'ws');

    this.stun = { local: null, public: [] };

    this.getFingerPrint(params.fingerPrint);
    this.headers = params.headers;
    this.autoReconnect = params.reconnect;
    this.reconnectInterval = params.reconnectInterval || RECONNECT_INTERVAL;

    this.eventEmitter = new EventEmitter({ wildcard: true, delimiter: ':' });
  }

  connect(callback?: Function): Promise<Object> {
    return nodeify.extend(new Promise((resolve, reject) => {
      this.connection = { resolve, reject };

      const WebSocket = IS_NODE ? WS : window.WebSocket;

      this.getStun();

      this.socket = new WebSocket(this.endpoint, [], this.headers);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
    })).nodeify(callback);
  }

  disconnect(): void {
    this.socket.close();
    this.closeStun();
  }

  onOpen(e): void {
    this.eventEmitter.emit('open', e);
    this.connection.resolve({ connected: true });
  }

  onClose(e): void {
    this.eventEmitter.emit('close', e, this.lastMessageSent);
    this.closeStun();
    this.reconnect();
  }

  onError(error: any): void {
    this.eventEmitter.emit('error', error, this.lastMessageSent);
  }

  reconnect() {
    if (this.autoReconnect) {
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  sendMessage(msg: Object): void {
    if (this.socket.readyState === 1) {
      const data = msg;

      data.STUNTIP = this.stun;
      data.FingerPrint = this.fingerPrint;

      this.lastMessageSent = data;
      this.eventEmitter.emit('send', data);
      this.socket.send(JSON.stringify(data));
    }
  }

  sendMessageAsPromise(msg: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.lastPromise = { resolve, reject };
      setRequest(msg, { resolve, reject });
      this.sendMessage(msg);
    });
  }

  onMessage(msg: Object): void {
    const data = JSON.parse(msg.data);

    this.eventEmitter.emit('receive', data);

    if (!MsgActionRes[data.MsgType]) {
      if (data.MsgType === 'ERROR') {
        this.eventEmitter.emit('error', data, this.lastMessageSent);
      }

      return;
    }

    this.dispatchPromise(data);
    this.dispatchEventEmitters(data);
  }

  dispatchPromise(data: Object): any {
    const request = getRequest(data);
    if (request && request.resolve) {
      deleteRequest(data);
      return request.resolve(data);
    }
  }

  dispatchEventEmitters(data: Object): any {
    const type = data.MsgType;
    const reqId = MsgActionRes[type][1];

    this.eventEmitter.emit(type, data);
    if (data[reqId]) {
      this.eventEmitter.emit(type + ':' + data[reqId], data);
    }
  }

  getFingerPrint(customFingerprint?: string): void {
    if (IS_NODE) {
      return getMac(macAddress => {
        this.fingerPrint = macAddress;
      });
    } else if (IS_BROWSER) {
      return new Fingerprint2().get(fingerPrint => {
        this.fingerPrint = Math.abs(encodeByteArray(fingerPrint)).toString();
      });
    } else if (customFingerprint) {
      this.fingerPrint = customFingerprint;
    } else {
      throw new Error('FingerPrint not provided');
    }
  }

  getStun(): void {
    if (IS_NODE) {
      getStun(data => {
        this.stun = data;
      });
    }
  }

  closeStun(): void {
    if (IS_NODE) {
      closeStun();
    }
  }

  /* eslint-disable no-param-reassign */
  emitterPromise<T>(promise: Object, callback?: Function): PromiseEmitter<T> {
    promise.on = (event: string, listener: Function) => {
      this.eventEmitter.on(event, listener);
      return promise;
    };
    promise.onAny = (listener: Function) => {
      this.eventEmitter.onAny(listener);
      return promise;
    };
    promise.offAny = (listener: Function) => {
      this.eventEmitter.offAny(listener);
      return promise;
    };
    promise.once = (event: string, listener: Function) => {
      this.eventEmitter.once(event, listener);
      return promise;
    };
    promise.many = (event: string, times: number, listener: Function) => {
      this.eventEmitter.many(event, times, listener);
      return promise;
    };
    promise.removeListener = (event: string, listener: Function) => {
      this.eventEmitter.removeListener(event, listener);
      return promise;
    };
    promise.removeAllListeners = (events: Array<string>) => {
      this.eventEmitter.removeAllListeners(events);
      return promise;
    };

    return nodeify.extend(promise).nodeify(callback);
  }
  /* eslint-enable no-param-reassign */
}

export default WebSocketTransport;
