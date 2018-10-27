/* @flow */
/* eslint-disable no-param-reassign */

import type { BlinkTradeLevel, MsgTypes } from '../types';

const zipColumns = (arr: Array<any>, columns: Array<string>) => (
  arr.reduce((prev, val, i) => {
    prev[columns[i]] = val;
    return prev;
  }, {})
);

export const msgToAction = (messages: MsgTypes) => {
  return Object.entries(messages).reduce((prev, val) => {
    // $FlowFixMe Fixed entries mixed type
    prev[val[1][0]] = val[0];
    return prev;
  }, {});
};

export const formatColumns = (field: string, level: BlinkTradeLevel) => (data: Object) => {
  if (level === 2) {
    const list = data[field].map(row => zipColumns(row, data.Columns));
    return Promise.resolve({ ...data, [field]: list });
  }

  return Promise.resolve(data);
};

export const formatBrokerList = (level: BlinkTradeLevel) => (data: Object) => {
  if (level === 2) {
    const BrokerListGrp = data.BrokerListGrp
      .map(row => zipColumns(row, data.Columns))
      .reduce((prev, val) => {
        prev[val.BrokerID] = val;
        return prev;
      }, {});

    return Promise.resolve({ ...data, BrokerListGrp });
  }

  return Promise.resolve(data);
};

export const formatTradeHistory = (level: BlinkTradeLevel) => (data: Object) => {
  if (level === 2) {
    const TradeHistoryGrp = data.TradeHistoryGrp
      .map(row => zipColumns(row, data.Columns))
      .reduce((prev, val) => {
        (prev[val.Market] = prev[val.Market] || []).push(val);
        return prev;
      }, {});

    return Promise.resolve({ ...data, TradeHistoryGrp });
  }

  return Promise.resolve(data);
};

export const formatOrderBook = (data: Object, level: BlinkTradeLevel) => {
  if (level === 2) {
    const { bids, asks } = data.MDFullGrp
      .filter(order => order.MDEntryType === '0' || order.MDEntryType === '1')
      .reduce((prev, order) => {
        const side = order.MDEntryType === '0' ? 'bids' : 'asks';
        (prev[side] || (prev[side] = [])).push(order);
        return prev;
      }, []);

    return {
      ...data,
      MDFullGrp: {
        [data.Symbol]: {
          bids: bids || [],
          asks: asks || [],
        },
      },
    };
  }

  return data;
};
