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

import Base from './base';
import MsgTypes from './constants/requests';
import { generateRequestId } from './listener';

type WithdrawStatus = '1' | '2' | '4' | '8';

class BaseTransport extends Base {

  env: BlinkTradeEnv;

  send: Function;

  fetchTrade: Function;

  sendMessageAsPromise: Function;

  constructor(params: BlinkTradeBase, env: BlinkTradeEnv) {
    super(params, env);

    this.env = env;
    this.send = env === 'ws' ? this.sendMessageAsPromise : this.fetchTrade;
  }

  /**
   * statusList: 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled
   */
  listWithdraws({
    page: Page = 0,
    pageSize: PageSize = 20,
    statusList: StatusList = ['1', '2', '4', '8'],
  }: {
    page?: number;
    pageSize?: number;
    statusList?: Array<WithdrawStatus>;
  } = {}, callback?: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.REQUEST_WITHDRAW_LIST,
      WithdrawListReqID: generateRequestId(),
      Page,
      PageSize,
      StatusList,
    };

    return new Promise((resolve, reject) => {
      return this.send(msg, callback).then(data => {
        const { Columns, ...withdrawData } = data;
        const WithdrawList = [];
        data.WithdrawListGrp.map(withdraw => {
          return WithdrawList.push({
            WithdrawID: withdraw[0],
            Method: withdraw[1],
            Currency: withdraw[2],
            Amount: withdraw[3],
            Data: withdraw[4],
            Created: withdraw[5],
            Status: withdraw[6],
            ReasonID: withdraw[7],
            Reason: withdraw[8],
            PercentFee: withdraw[9],
            FixedFee: withdraw[10],
            PaidAmount: withdraw[11],
            UserID: withdraw[12],
            Username: withdraw[13],
            BrokerID: withdraw[14],
            ClOrdID: withdraw[15],
          });
        });

        return resolve({
          ...withdrawData,
          WithdrawListGrp: WithdrawList,
        });
      }).catch(reject);
    });
  }

  requestWithdraw({ amount, data, currency = 'BTC', method = 'bitcoin' }: {
    data: Object,
    amount: number;
    method?: string;
    currency?: string;
  }, callback: Function): Promise<Object> {
    const msg = {
      MsgType: MsgTypes.REQUEST_WITHDRAW,
      WithdrawReqID: generateRequestId(),
      Method: method,
      Amount: amount,
      Currency: currency,
      Data: data,
    };

    return this.send(msg, callback);
  }

  requestDeposit({ currency = 'BTC', value, depositMethodId }: {
    value?: number;
    currency?: string;
    depositMethodId?: number;
  } = {}, callback?: Function): Promise<Object> {
    const msg: Object = {
      MsgType: MsgTypes.REQUEST_DEPOSIT,
      DepositReqID: generateRequestId(),
      Currency: currency,
      BrokerID: this.brokerId,
    };

    if (currency !== 'BTC') {
      msg.DepositMethodID = depositMethodId;
      msg.Value = value;
    }

    return this.send(msg, callback);
  }
}

export default BaseTransport;
