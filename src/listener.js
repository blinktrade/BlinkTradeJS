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

import lodash from 'lodash';
import * as RequestTypes from './constants/requestTypes';

let requests: Object = {};
const listeners: Object = {};

export function getListeners() {
  return requests;
}

export function generateRequestId(): number {
  return parseInt(String(1e7 * Math.random()), 10);
}

export function getListener(msgType: string): Function {
  return listeners[msgType];
}

export function getRequest(message: Object): ?Request {
  let result;
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      result = lodash.find(requests[key], { ReqId: String(message[key]) });
    }
  });

  return result;
}

export function registerRequest(message: Object, promise: Request): Object {
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      requests[key] = requests[key] || [];
      requests[key].push({ ReqId: String(message[key]), ...promise });
    }
  });

  return requests;
}

export function registerEventEmitter(message: Object, callback: Function): Object {
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      if (requests[key] !== []) {
        const index = lodash.findIndex(requests[key], { ReqId: String(message[key]) });
        requests[key][index] = {
          ...requests[key][index],
          resolve: null,
          reject: null,
          callback,
        };
      }
    }
  });

  return requests;
}

export function registerListener(msgType: string, callback: Function): void {
  listeners[msgType] = listeners[msgType] || [];
  listeners[msgType] = callback;
}

export function deleteRequest(key: string): Object {
  requests = lodash.omit(requests, [key]);
  return requests;
}
