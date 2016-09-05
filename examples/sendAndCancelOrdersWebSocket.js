var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function() {
  return blinktrade.sendOrder({
    side: '1',
    price: parseInt(550 * 1e8, 10),
    amount: parseInt(0.05 * 1e8, 10),
    symbol: 'BTCUSD',
  });
}).then(function(order) {
  console.log(order);
  console.log('Cancelling order: #' + order.OrderID);
  return blinktrade.cancelOrder({ orderId: order.OrderID, clientId: order.ClOrdID });
}).then(function(order) {
  console.log('Order: #' + order.OrderID + ' cancelled');
}).catch(function(err) {
  console.log(err);
});
