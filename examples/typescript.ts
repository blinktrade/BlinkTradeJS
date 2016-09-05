import { BlinkTradeRest, BlinkTradeWS } from 'blinktrade';

let blinktrade = new BlinkTradeWS();

blinktrade.connect().then(function() {
  console.log('WebSocket Connected');
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
  .on('OB:NEW_ORDER', (data) => {
    console.log('OB:NEW_ORDER', data);
  }).on('OB:UPDATE_ORDER', (data) => {
    console.log('OB:UPDATE_ORDER', data);
  }).on('OB:DELETE_ORDER', (data) => {
    console.log('OB:DELETE_ORDER', data);
  }).on('OB:DELETE_ORDERS_THRU', (data) => {
    console.log('OB:DELETE_ORDERS_THRU', data);
  }).on('OB:TRADE_NEW', (data) => {
    console.log('OB:TRADE_NEW', data);
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
  .on('EXECUTION_REPORT:NEW', (data) => {
    console.log('EXECUTION_REPORT:NEW', data);
  }).on('EXECUTION_REPORT:PARTIAL', (data) => {
    console.log('EXECUTION_REPORT:PARTIAL', data);
  }).on('EXECUTION_REPORT:EXECUTION', (data) => {
    console.log('EXECUTION_REPORT:EXECUTION', data);
  }).on('EXECUTION_REPORT:CANCELED', (data) => {
    console.log('EXECUTION_REPORT:CANCELED', data);
  }).on('EXECUTION_REPORT:REJECTED', (data) => {
    console.log('EXECUTION_REPORT:REJECTED', data);
  });

  return blinktrade.sendOrder({
    side: '1',
    price: parseInt((550 * 1e8).toFixed(0), 10),
    amount: parseInt((0.05 * 1e8).toFixed(0), 10),
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
