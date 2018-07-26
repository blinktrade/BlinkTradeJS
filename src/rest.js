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

import nodeify from 'nodeify';
import RestTransport from './transports/rest';
import TradeBase from './trade';

import type {
  Message,
  BlinkTradeRestParams,
  BlinkTradeRestTransport,
} from './types';

class BlinkTradeRest extends TradeBase {
  transport: BlinkTradeRestTransport;

  constructor(params?: BlinkTradeRestParams = {}) {
    super(params);
    this.transport = params.transport || new RestTransport(params);
  }

  send(msg: Message): Promise<Object> {
    return this.transport.fetchTrade(msg);
  }

  fetchPublic(path: string): Promise<Object> {
    return this.transport.fetchPublic(path);
  }

  ticker(callback?: Function): Promise<Object> {
    return nodeify.extend(this.fetchPublic('ticker')).nodeify(callback);
  }

  trades({ limit = 100, since = 0 }: {
    limit?: number,
    since?: number,
  } = {}, callback?: Function): Promise<Object> {
    return nodeify.extend(this.fetchPublic(`trades?limit=${limit}&since=${since}`)).nodeify(callback);
  }

  orderbook(callback?: Function): Promise<Object> {
    return nodeify.extend(this.fetchPublic('orderbook')).nodeify(callback);
  }
}

export default BlinkTradeRest;
