import { map, compose, groupBy, prop, zipObj } from 'ramda';

export const formatColumns = (field, level) => (data) => {
  if (level === 2) {
    const list = map(zipObj(data.Columns), data[field]);
    return Promise.resolve({ ...data, [field]: list });
  }

  return Promise.resolve(data);
};

export const formatTradeHistory = (level) => (data) => {
  if (level === 2) {
    const TradeHistoryGrp = compose(
      groupBy(prop('Market')),
      map(zipObj(data.Columns)),
    )(data.TradeHistoryGrp);

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
