/* eslint-disable no-param-reassign */

const zipColumns = (arr, columns) => (
  arr.reduce((prev, val, i) => {
    prev[columns[i]] = val;
    return prev;
  }, {})
);

export const msgToAction = (messages) => {
  return Object.entries(messages).reduce((prev, val) => {
    prev[val[1][0]] = val[0];
    return prev;
  }, {});
};

export const formatColumns = (field, level) => (data) => {
  if (level === 2) {
    const list = data[field].map(row => zipColumns(row, data.Columns));
    return Promise.resolve({ ...data, [field]: list });
  }

  return Promise.resolve(data);
};

export const formatTradeHistory = (level) => (data) => {
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

export const formatOrderBook = (data, level) => {
  if (level === 2) {
    const { bids, asks } = data.MDFullGrp
      .filter(order => order.MDEntryType === '0' || order.MDEntryType === '1')
      .reduce((prev, order) => {
        const side = order.MDEntryType === '0' ? 'bids' : 'asks';
        (prev[side] || (prev[side] = [])).push([
          order.MDEntryPx / 1e8,
          order.MDEntrySize / 1e8,
          order.UserID,
          order.OrderID,
        ]);
        return prev;
      }, []);

    return {
      ...data,
      MDFullGrp: {
        [data.Symbol]: {
          bids,
          asks,
        },
      },
    };
  }

  return data;
};
