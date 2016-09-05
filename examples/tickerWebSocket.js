var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.subscribeTicker(['BLINK:BTCUSD'])
}).then(function(ticker) {
  console.log(ticker);
}).catch(function(err) {
  console.log(err);
});
