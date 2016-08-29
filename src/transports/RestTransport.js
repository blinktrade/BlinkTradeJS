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
import sjcl from 'sjcl';

class RestTransport extends Base {

  /**
   * APIKey
   */
  key: string;

  /**
   * APISecret
   */
  secret: string;

  /*
   * Exchanges currencies available.
   */
  currency: 'BRL' | 'VEF' | 'CLP' | 'VND' | 'PKR';

  constructor(params) {
    super(params, 'rest');

    this.key = params.key;
    this.secret = params.secret;
    this.currency = params.currency;

    this.fetch = this.isNode ? require('node-fetch') : require('fetch-jsonp');
  }

  headers(method) {
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
    };
  }

  fetch(msg: Object, api: string): Promise {
    return this.fetch(this.endpoint + api)
    .then(response => response.json());
  }
}

export default RestTransport;
