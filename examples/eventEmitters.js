var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

function onBalanceUpdate(newBalance) {
  console.log('Balance Updated', newBalance);
}

function onExecutionReportNew(data) {
  console.log('EXECUTION_REPORT:NEW', data);
}
function onExecutionReportPartial(data) {
  console.log('EXECUTION_REPORT:PARTIAL', data);
}
function onExecutionReportExecution(data) {
  console.log('EXECUTION_REPORT:EXECUTION', data);
}
function onExecutionReportCanceled(data) {
  console.log('EXECUTION_REPORT:CANCELED', data);
}
function onExecutionReportRejected(data) {
  console.log('EXECUTION_REPORT:REJECTED', data);
}

function onOrderBookNewOrder(data) {
  console.log('OB:NEW_ORDER', data);
}
function onOrderBookUpdateOrder(data) {
  console.log('OB:UPDATE_ORDER', data);
}
function onOrderBookDeleteOrder(data) {
  console.log('OB:DELETE_ORDER', data);
}
function onOrderBookDeleteThruOrder(data) {
  console.log('OB:DELETE_ORDERS_THRU', data);
}
function onOrderBookTradeNew(data) {
  console.log('OB:TRADE_NEW', data);
}

function onAnyTicker(data) {
  console.log('Any Ticker Updated');
}
function onBTCUSD(data) {
  console.log('BTCUSD', data);
}
function onBTCBRL(data) {
  console.log('BTCBRL', data);
}

blinktrade.connect().then(function() {
  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(logged) {
  return blinktrade.balance().on('BALANCE', onBalanceUpdate);
}).then(function(balance) {
  console.log('Balance', balance);

  blinktrade.executionReport()
  .on('EXECUTION_REPORT:NEW', onExecutionReportNew)
  .on('EXECUTION_REPORT:PARTIAL', onExecutionReportPartial)
  .on('EXECUTION_REPORT:EXECUTION', onExecutionReportExecution)
  .on('EXECUTION_REPORT:CANCELED', onExecutionReportCanceled)
  .on('EXECUTION_REPORT:REJECTED', onExecutionReportRejected);

  return blinktrade.subscribeOrderbook(['BTCUSD'])
  .on('OB:NEW_ORDER', onOrderBookNewOrder)
  .on('OB:UPDATE_ORDER', onOrderBookUpdateOrder)
  .on('OB:DELETE_ORDER', onOrderBookDeleteOrder)
  .on('OB:DELETE_ORDERS_THRU', onOrderBookDeleteThruOrder)
  .on('OB:TRADE_NEW', onOrderBookTradeNew);

}).then(function(orderbook) {

  return blinktrade.subscribeTicker(['BLINK:BTCUSD', 'BLINK:BTCBRL'])
  .on('BLINK:*', onAnyTicker)
  .on('BLINK:BTCUSD', onBTCUSD)
  .many('BLINK:BTCBRL', 2, onBTCBRL);
}).then(function(ticker) {
  return blinktrade.sendOrder({
    side: '1',
    price: parseInt(550 * 1e8, 10),
    amount: parseInt(0.05 * 1e8, 10),
    symbol: 'BTCUSD',
  });
}).then(function(order) {
  return blinktrade.cancelOrder({
    orderId: order.OrderID,
    clientId: order.ClOrdID
  });
}).catch(function(err) {
  console.log(err);
});
