var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  return blinktrade.balance();
}).then(function(balance) {
  console.log('Balance', balance);
}).catch(function(err) {
  console.log(err);
});
