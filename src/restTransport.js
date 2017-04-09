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

import sjcl from 'sjcl';
import nodeify from 'nodeify';
import url from 'url';
import path from 'path';
import BaseTransport from './baseTransport';

class RestTransport extends BaseTransport {

  /**
   * APIKey
   */
  key: string;

  /**
   * APISecret
   */
  secret: string;

  /**
   * Exchanges currencies available.
   */
  currency: 'USD' | 'BRL' | 'VEF' | 'CLP' | 'VND' | 'PKR';

  /**
   * Fetch rest API
   */
  fetchRequest: Function

  constructor(params: BlinkTradeRest) {
    super(params, 'rest');

    this.key = params.key;
    this.secret = params.secret;
    this.currency = params.currency || 'USD';

    this.fetchRequest =
        this.isNode    ? require('isomorphic-fetch')
      : this.isBrowser ? require('fetch-jsonp')
      :                  window.fetch;
  }

  headers(method: string, body: Object): Object {
    const timeStamp = Date.now().toString();
    const hexKey = sjcl.codec.utf8String.toBits(this.secret);
    const hmac = new sjcl.misc.hmac(hexKey, sjcl.hash.sha256);
    const Signature = sjcl.codec.hex.fromBits(hmac.encrypt(timeStamp));
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

  fetch(msg: Object, api: string, headers?: Object = {}): Promise<Object> {
    return this.fetchRequest(url.resolve(this.endpoint, api), headers)
      .then(response => response.json());
  }

  fetchPublic(api: string, callback?: Function): Promise<Object> {
    return nodeify(this.fetch({}, path.join('api/v1', this.currency, api)), callback);
  }

  fetchTrade(msg: Object, callback?: Function): Promise<Object> {
    const headers = this.headers('POST', msg);
    return nodeify.extend(this.fetch(msg, 'tapi/v1/message', headers, callback)
      .then(response => (response.Status === 500 ? Promise.reject(response) : response.Responses))
      .then(response => (response.length === 1 ? response[0] : response))
    );
  }
}

export default RestTransport;
