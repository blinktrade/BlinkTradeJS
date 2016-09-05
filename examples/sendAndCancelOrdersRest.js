var BlinkTradeRest = require('blinktrade').BlinkTradeRest;

var blinktrade = new BlinkTradeRest({
  prod: false,
  key: 'Ya8EkJ1kJSLyt5ZX60aWlmA7zPEgBqajt7UmvCZEvaA',
  secret: 'xUS4e9hEl1RGpj4Fmh4KvQYKMWT2yItG9SGlDx4aYfo',
  currency: 'BRL',
});

blinktrade.sendOrder({
  side: '1',
  price: parseInt(550 * 1e8, 10),
  amount: parseInt(0.05 * 1e8, 10),
  symbol: 'BTCUSD',
}).then(function(order) {
  console.log(order);
  console.log('Cancelling order: #' + order[0].OrderID);
  return blinktrade.cancelOrder({ orderId: order[0].OrderID, clientId: order[0].ClOrdID });
}).then(function(order) {
  console.log(order);
  console.log('Order: #' + order[0].OrderID + ' cancelled');
}).catch(function(err) {
  console.log(err);
});

