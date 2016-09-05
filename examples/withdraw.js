var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  return blinktrade.requestWithdraw({
    amount: parseInt(200 * 1e8),
    currency: 'USD',
    method: 'PayPal',
    data: {
      Email: 'user@blinktrade.com'
    }
  });
}).then(function(withdraw) {
  console.log('\nFIAT Withdraw: \n', withdraw);
  return blinktrade.requestWithdraw({
    amount: parseInt(0.5 * 1e8),
    currency: 'BTC',
    method: 'bitcoin',
    data: {
      Wallet: '1KdEQfoxxgfgV1GkGb9JBX1F9fiaCqZdgV'
    }
  });
}).then(function(withdraw) {
  console.log('\nBitcoin Withdraw: \n', withdraw);
}).catch(function(err) {
  console.log(err);
});
