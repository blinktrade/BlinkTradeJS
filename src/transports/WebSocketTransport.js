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

import Base from '../base';
import Fingerprint2 from 'fingerprintjs2';
import nodeify from 'nodeify';

import {
  getRequest,
  getListener,
  registerRequest,
} from '../listener';

class WebSocketTransport extends Base {

  /*
   * WebSocket Instance
   */
  socket: WebSocket;

  /*
   * FingerPrint
   */
  fingerPrint: string;

  /*
   * Transport Promise
   */
  request: Request;

  constructor(params: BlinkTradeBase) {
    super(params, 'ws');

    this.getFingerPrint();
  }

  connect(callback: Function): Promise<Object> {
    return nodeify.extend(new Promise((resolve, reject) => {
      this.request = { resolve, reject };

      const WebSocket = this.isNode ? require('ws') : window.WebSocket;

      this.socket = new WebSocket(this.endpoint);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
    })).nodeify(callback);
  }

  disconnect(): void {
    this.socket.close();
  }

  onOpen(): void {
    this.request.resolve({ connected: true });
  }

  onClose(): void {
  }

  onError(): void {
    this.request.reject();
  }

  sendMessage(msg: Object): void {
    if (this.socket.readyState === 1) {
      const data = msg;
      data.FingerPrint = this.fingerPrint;

      this.socket.send(JSON.stringify(data));
    }
  }

  sendMessageAsPromise(msg: Object, callback?: Function): Promise<Object> {
    return nodeify.extend(new Promise((resolve, reject) => {
      const promise = { resolve, reject };

      if (!msg) {
        return reject('Missing Message');
      }

      registerRequest(msg, promise);

      // Send promise to sendMessage to we can mock it.
      this.sendMessage(msg, promise);
    })).nodeify(callback);
  }

  onMessage(msg: Object): void {
    const data = JSON.parse(msg.data);
    if (data.MsgType === 'ERROR') {
      this.request.reject('ERROR');
    }

    const request = getRequest(data);
    const listener = getListener(data.MsgType);
    this.dispatchPromise(request, data);
    this.dispatchListeners(listener, data);
  }

  dispatchPromise(request: ?Request, data: Object): void {
    return request && request.resolve  ? request.resolve(data)
         : request && request.callback ? request.callback(data)
         : this.request.reject('ERROR');
  }

  dispatchListeners(listener: Function, data: Object): void {
    return listener && listener(data);
  }

  getFingerPrint(): string {
    if (this.isNode) {
      return require('getMac').getMac((err, macAddress) => {
        this.fingerPrint = macAddress;
        return macAddress;
      });
    }

    return new Fingerprint2().get(fingerPrint => {
      this.fingerPrint = fingerPrint;
      return fingerPrint;
    });
  }
}

export default WebSocketTransport;
