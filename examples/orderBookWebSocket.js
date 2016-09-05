var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.subscribeOrderbook(['BTCUSD'])
}).then(function(orderbook) {
  console.log(orderbook);
}).catch(function(err) {
  console.log(err);
});
