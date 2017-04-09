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

import RestTransport from './restTransport';

class BlinkTradeRest extends RestTransport {
  ticker(callback?: Function): Promise<Object> {
    return super.fetchPublic('ticker', callback);
  }

  trades({ limit = 1000, since = '0' }: {
    limit: number,
    since: string,
  } = {}, callback?: Function): Promise<Object> {
    return super.fetchPublic(`trades?limit=${limit}&since=${since}`, callback);
  }

  orderbook(callback?: Function): Promise<Object> {
    return super.fetchPublic('orderbook', callback);
  }
}

export default BlinkTradeRest;
