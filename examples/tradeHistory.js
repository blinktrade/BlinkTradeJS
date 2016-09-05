var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.tradeHistory();
}).then(function(trades) {
  console.log(trades);
}).catch(function(err) {
  console.log(err);
});
