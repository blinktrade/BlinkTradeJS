/* eslint-disable */

var moment = require('moment');
var BlinkTradeRest = require('blinktrade').BlinkTradeRest;

var BlinkTrade = new BlinkTradeRest({
  prod: true,
  brokerId: 4,
  currency: 'BRL',
});

var since = moment()
  .subtract(2, 'days')
  .toDate()
  .getTime()
  .toString()
  .slice(0, 10);

BlinkTrade.ticker().then(function(data) {
  console.log('Ticker', data);
});
BlinkTrade.orderbook().then(function(data) {
  console.log('OrderBook', data.pair, 'Bids:', data.bids.length, 'Asks:', data.asks.length);
});
BlinkTrade.trades({ limit: 1000, since: since }).then(function(data) {
  console.log('Trades', data.length);
});
