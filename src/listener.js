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

import { MsgActionReq, MsgActionRes } from './constants/messages';

const store = new Map();
const emitters = new Map();
const listeners = new Map();

export function getListeners() {
  return listeners;
}

export function generateRequestId(): number {
  return parseInt(String(1e7 * Math.random()), 10);
}

export function getListener(msgType: string): Function {
  return listeners[msgType];
}

function getKey(messages: MsgTypes, msg: Object): string {
  const key = messages[msg.MsgType][1];
  const value = msg[key];
  return key + ':' + value;
}

export function getRequest(msg: Message): ?ResolveReject {
  return store.get(getKey(MsgActionRes, msg));
}

export function setRequest(msg: Message, promise: ResolveReject): void {
  store.set(getKey(MsgActionReq, msg), promise);
}

export function deleteRequest(msg: Message): void {
  store.delete(getKey(MsgActionRes, msg));
}

export function getEventEmitter(msg: Message): ?Function {
  return emitters.get(getKey(MsgActionRes, msg));
}

export function registerEventEmitter(key: string, value: number, callback: Function): Object {
  emitters.set(key + ':' + value, callback);
}

export function registerListener(msgType: string, callback: Function): void {
  listeners.set(msgType, callback);
}
