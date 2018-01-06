/* eslint-disable */

var BlinkTradeRest = require('blinktrade').BlinkTradeRest;

var BlinkTrade = new BlinkTradeRest({
  prod: true,
  brokerId: 4,
  currency: 'BRL',
});

BlinkTrade.ticker().then(function(data) {
  console.log('Ticker', data);
});
BlinkTrade.orderbook().then(function(data) {
  console.log('OrderBook', data.pair, 'Bids:', data.bids.length, 'Asks:', data.asks.length);
});
BlinkTrade.trades({ limit: 100, since: 2487 }).then(function(data) {
  console.log('Trades', data.length);
});
