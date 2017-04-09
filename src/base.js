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

import common from './constants/common';

class Base {

  /*
   * url endpoint.
   */
  endpoint: string;

  /*
   * Broker id
   */
  brokerId: number;

  /*
   * Is node.js environment.
   */
  isNode: boolean;

  /*
   * Is browser environment.
   */
  isBrowser: boolean;

  constructor(params: BlinkTradeBase = {}, env: BlinkTradeEnv) {
    const endpoint =
        params.url  ? params.url
      : params.prod ? common.prod[env]
      :               common.testnet[env];

    this.brokerId = params.brokerId || 5;

    this.endpoint = endpoint;

    this.isNode    = typeof window === 'undefined';
    this.isBrowser = typeof document !== 'undefined';
  }
}

export default Base;
