var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  console.log('WebSocket Connceted');
  return blinktrade.heartbeat();
}).then(function(heartbeat) {

  return blinktrade.login({ username: 'rodrigo', password: 'abc12345' });
}).then(function(login) {
  console.log('Logged', login);
  return blinktrade.profile();
}).then(function(profile) {
  console.log('My Profile', profile);

  return blinktrade.subscribeTicker(['BLINK:BTCUSD'])
  .on('BLINK:BTCUSD', function(data) {
    console.log('Ticker Updated', data);
  });
}).then(function(ticker) {

  console.log('Ticker', ticker);
  return blinktrade.subscribeOrderbook(['BTCUSD'])
  .on('OB_NEW_ORDER', (data) => {
    console.log('OB_NEW_ORDER', data);
  }).on('OB_UPDATE_ORDER', (data) => {
    console.log('OB_UPDATE_ORDER', data);
  }).on('OB_DELETE_ORDER', (data) => {
    console.log('OB_DELETE_ORDER', data);
  }).on('OB_DELETE_ORDERS_THRU', (data) => {
    console.log('OB_DELETE_ORDERS_THRU', data);
  }).on('OB_TRADE_NEW', (data) => {
    console.log('OB_TRADE_NEW', data);
  });

}).then(function(marketData) {
  console.log('OrderBook FULL REFRESH');
  console.log(marketData.MDFullGrp.BTCUSD);
  return blinktrade.balance()
  .on('BALANCE', (data) => {
    console.log('Balance Updated', data);
  });
}).then(function(balance) {
  blinktrade.executionReport()
  .on('EXECUTION_REPORT_NEW', (data) => {
    console.log('EXECUTION_REPORT_NEW', data);
  }).on('EXECUTION_REPORT_PARTIAL', (data) => {
    console.log('EXECUTION_REPORT_PARTIAL', data);
  }).on('EXECUTION_REPORT_EXECUTION', (data) => {
    console.log('EXECUTION_REPORT_EXECUTION', data);
  }).on('EXECUTION_REPORT_CANCELED', (data) => {
    console.log('EXECUTION_REPORT_CANCELED', data);
  }).on('EXECUTION_REPORT_REJECTED', (data) => {
    console.log('EXECUTION_REPORT_REJECTED', data);
  });

  return blinktrade.sendOrder({
    side: '1',
    price: parseInt(550 * 1e8, 10),
    amount: parseInt(0.05 * 1e8, 10),
    symbol: 'BTCUSD',
  });
}).then(function(order) {
  console.log('Cancelling order');
  return blinktrade.cancelOrder({ orderId: order.OrderID, clientId: order.ClOrdID });
}).then(function(order) {
  return blinktrade.myOrders();
}).then(function(myOrders) {
  console.log('My Orders', myOrders);
  return blinktrade.tradeHistory();
}).then(function(trades) {
  console.log('Trade History', trades);
  return blinktrade.logout();
}).then(function(logout) {
  console.log('Logout');
}).catch(function(err) {
  console.log('Error', err);
});

