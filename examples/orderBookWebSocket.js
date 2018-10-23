var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.subscribeMarketData(['BTCBRL'])
}).then(function(orderbook) {
  console.log(orderbook);
}).catch(function(err) {
  console.log(err);
});
