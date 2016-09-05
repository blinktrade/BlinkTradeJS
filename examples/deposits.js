var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  return blinktrade.requestDeposit();
}).then(function(deposit) {
  console.log('\nBitcoin Deposit \n', deposit);
  return blinktrade.requestDeposit({
    value: parseInt(200 * 1e8),
    currency: 'BRL',
    depositMethodId: 502,
  });
}).then(function(deposit) {
  console.log('\nFiat Deposit \n', deposit);
}).catch(function(err) {
  console.log(err);
});
