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

import sha256 from 'js-sha256';
import invariant from 'invariant';
import fetchPonyfill from 'fetch-ponyfill';

import BROKERS from '../constants/brokers';
import Transport from './transport';

import type {
  Message,
  BlinkTradeRestParams,
  BlinkTradeCurrencies,
} from '../types';

const { fetch } = fetchPonyfill({ Promise });

class RestTransport extends Transport {
  /**
   * APIKey
   */
  key: ?string;

  /**
   * APISecret
   */
  secret: ?string;

  /**
   * Exchanges currencies available.
   */
  currency: BlinkTradeCurrencies;

  constructor(params?: BlinkTradeRestParams = {}) {
    super(params, params.brokerId === BROKERS.BITCAMBIO ? 'restBitcambio' : 'rest');

    this.key = params.key;
    this.secret = params.secret;
    this.currency = params.currency || 'BRL';
  }

  headers(method: string, body: Object): Object {
    const timeStamp = Date.now().toString();
    const Signature = sha256.hmac.create(this.secret).update(timeStamp).hex();

    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        Nonce: timeStamp,
        APIKey: this.key,
        Signature,
      },
      body: JSON.stringify(body),
    };
  }

  fetch(api: string, headers?: Object = {}): Promise<Object> {
    return fetch(this.endpoint + api, headers)
      .then(response => response.json());
  }

  fetchPublic(api: string): Promise<Object> {
    return this.fetch(`api/v1/${this.currency}/${api}`);
  }

  fetchTrade(msg: Message): Promise<Object> {
    invariant(this.key && this.secret, 'Key or Secret not provided');
    const headers = this.headers('POST', msg);
    return this.fetch('tapi/v1/message', headers)
      .then(response => (response.Status === 500 ? Promise.reject(response) : response.Responses))
      .then(response => (response.length === 1 ? response[0] : response));
  }
}

export default RestTransport;
