var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

function onNew(data) {
  console.log('New Order Received', data);
}
function onPartial(data) {
  console.log('Order Partially Executed', data);
}
function onExecution(data) {
  console.log('Order Executed', data);
}
function onCanceled(data) {
  console.log('Order Canceled', data);
}
function onRejected(data) {
  console.log('Order Rejected', data);
}

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  blinktrade.executionReport()
  .on('EXECUTION_REPORT:NEW', onNew)
  .on('EXECUTION_REPORT:PARTIAL', onPartial)
  .on('EXECUTION_REPORT:EXECUTION', onExecution)
  .on('EXECUTION_REPORT:CANCELED', onCanceled)
  .on('EXECUTION_REPORT:REJECTED', onRejected);

  return blinktrade.sendOrder({
    side: '1',
    price: parseInt(550 * 1e8, 10),
    amount: parseInt(0.05 * 1e8, 10),
    symbol: 'BTCUSD',
  });
}).then(function(order) {
  // Cancel order after 5 seconds
  setTimeout(function() {
    return blinktrade.cancelOrder({ orderId: order.OrderID, clientId: order.ClOrdID });
  }, 5000)
}).catch(function(err) {
  console.log(err);
});
