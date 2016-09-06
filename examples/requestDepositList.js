var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  return blinktrade.requestDepositList()
}).then(function(deposits) {
  console.log('Deposits', deposits);
}).catch(function(err) {
  console.log(err);
});

