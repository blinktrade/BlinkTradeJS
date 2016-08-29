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

let promises: Object = {};
const listeners: Object = {};

export function getListeners() {
  return promises;
}

export function generateRequestId(): number {
  return parseInt(String(1e7 * Math.random()), 10);
}

export function getListener(msgType: string): Function {
  return listeners[msgType];
}

export function getRequest(message: Object): ?Object {
  let result;
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      result = lodash.find(promises[key], { ReqId: message[key].toString() });
    }
  });

  return result;
}

export function registerRequest(message: Object, promise): Object {
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      promises[key] = promises[key] || [];
      promises[key].push({ ReqId: message[key].toString(), ...promise });
    }
  });

  return promises;
}

export function registerEventEmitter(message: Object, callback: Function): Object {
  lodash.mapKeys(RequestTypes, (key) => {
    if (lodash.has(message, key)) {
      if (promises[key] !== []) {
        const index = lodash.findIndex(promises[key], { ReqId: message[key].toString() });
        promises[key][index] = {
          ...promises[key][index],
          resolve: null,
          reject: null,
          callback,
        };
      }
    }
  });

  return promises;
}

export function registerListener(msgType: string, callback: Function): void {
  listeners[msgType] = listeners[msgType] || [];
  listeners[msgType] = callback;
}

export function deleteRequest(key: string): Object {
  promises = lodash.omit(promises, [key]);
  return promises;
}
