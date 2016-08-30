# BlinkTradeJS SDK

BlinkTradeJS websocket and rest client for node.js and browser

# Getting Started

BlinkTrade provides a simple and robust WebSocket API to integrate our platform, we strongly recommend you to use it over the Rest API, all API supports promises and event emitters in order to keep you updated in realtime...

## Install

> Not Publish yet.

`$ npm install blinktrade`


# Modules

* BlinkTradeWS
* BlinkTradeRest 

# Usage



```js

var BlinkTradeWS = require('blinktrade').BlinkTradeWS;
var BlinkTradeRest = require('blinktrade').BlinkTradeRest;

// WebSocket
var BlinkTrade = new BlinkTradeWS({ prod: true });

// Rest
var BlinkTrade = new BlinkTradeRest({ prod: true, key: "", secret: "" });


```


## WebSocket

```js

var BlinkTradeWS = require('blinktrade').BlinkTradeWS;

var BlinkTrade = new BlinkTradeWS({
  prod: true,
  brokerId: 5, // Defaults to 5,
  url: ''      // Custom url just in case if you're using a custom backend url.
});

```


### Connect

```js

BlinkTrade.connect().then(function(){
	// Conncted
});

```


### Login

```js

BlinkTrade.login('user', 'abc12345').then(function(user) {
  console.log(user);
});

```


### Profile

```js

BlinkTrade.profile().then(function(profile) {
  console.log(profile);
});

```

### Balance

Can return either a promise and a eventEmitter to keep you updated.

```js

BlinkTrade.balance().then(function(balance) {
  console.log(balance);
});

```

In order to keep balance update when sending orders, you can return a event emitter.

```js

BlinkTrade.balance().on('BALANCE', function(balance) {
  console.log(balance);
});

```

### Ticker

You can subscribe on one or more market symbols

Symbols Available:

| Name         | Description                  |
|--------------|------------------------------|
| BLINK:BTCUSD | BTC <-> Testnet (USD)        |
| BLINK:BTCBRL | BTC <-> Brazil Reals (BRL)   |
| BLINK:BTCVEF | BTC <-> Venezuelan Bolivares |
| BLINK:BTCCLP | BTC <-> Chilean Pesos        |
| BLINK:BTCVND | BTC <-> Vietnamise Dongs     |
| UOL:USDBRT   | Dólar Turismo                |
| UOL:USDBRL   | Dólar Comercial              |


```js

BlinkTrade.subscribeTicker(['BLINK:BTCUSD']).then(function(ticker) {
  console.log(ticker);
});

```

In order to keep ticker update on new events, you can return a event emitter and match with the market.

```js

BlinkTrade.subscribeTicker(['UOL:USDBRT', 'BLINK:BTCUSD', 'BLINK:BTCBRL'])
  .on('UOL:USDBRT',   function(usdbrt) {
}).on('BLINK:BTCUSD', function(btcusd) {
}).on('BLINK:BTCBRL', function(btcbrl) {
});

```

In order to unsubscribe on ticker, you should pass the `SecurityStatusReqID` on `unSubscribeTicker`


```js

BlinkTrade.subscribeTicker(['BLINK:BTCUSD']).then(function(ticker) {
  return BlinkTrade.unSubscribeTicker(ticker.SecurityStatusReqID);
}).then(function(){
  // Unsubscribed
});


```

### OrderBook


```js

BlinkTrade.subscribeTicker(['BLINK:BTCUSD']).then(function(orderbook) {
  console.log(orderbook);
});

```

In order to get realtime updates on order book, you should listen to the event emitter on following events.


| Event                 |  Description                                                                               |
|-----------------------|--------------------------------------------------------------------------------------------|
| OB_NEW_ORDER          | Callback when receives a new order                                                         |
| OB_UPDATE_ORDER       | Callback when an order have been updated                                                   |
| OB_DELETE_ORDER       | Callback when an order have been deleted                                                   |
| OB_DELETE_ORDERS_THRU | Callback when one or more orders have been executed and consequently deleted from the book |

```js

  BlinkTrade.subscribeOrderbook(['BTCUSD'])
  .on('OB_NEW_ORDER', function(order) {
  }).on('OB_UPDATE_ORDER', function(order) {
  }).on('OB_DELETE_ORDER', function(order) {
  }).on('OB_DELETE_ORDERS_THRU', function(order) {
  }).on('OB_TRADE_NEW', function(order) {
  });

```

You can still return a promise from the event emitters anyways.


```js

  BlinkTrade.subscribeOrderbook(['BTCUSD'])
  .on('OB_NEW_ORDER', function(order) => {
  }).then(function(orderbook) {
    console.log('Full orderbook', orderbook);
  });

```


### Send Order


```js

  BlinkTrade.sendOrder({
    side: '1',
    price: parseInt(550 * 1e8, 10),
    amount: parseInt(0.05 * 1e8, 10),
    symbol: 'BTCUSD',
  }).then(function(order) {
  });
  
```

### Cancel Order

```js

  BlinkTrade.cancelOrder(order.OrderID, order.ClOrdID).then(function(order) {
  });
  
```

### Execution Report

An event emitter to get execution reports.

| Event                      |  Description                                         |
|----------------------------|------------------------------------------------------|
| EXECUTION_REPORT_NEW       | Callback when you send a new order                   |
| EXECUTION_REPORT_PARTIAL   | Callback when your order have been partialy executed |
| EXECUTION_REPORT_EXECUTION | Callback when an order have been sussefully executed |
| EXECUTION_REPORT_CANCELED  | Callback when your order have been canceled          |
| EXECUTION_REPORT_REJECTED  | Callback when your order have been rejected          |


```js

  blinktrade.executionReport()
    .on('EXECUTION_REPORT_NEW', function(data) {
  }).on('EXECUTION_REPORT_PARTIAL', function(data) {
  }).on('EXECUTION_REPORT_EXECUTION', function(data) {
  }).on('EXECUTION_REPORT_CANCELED', function(data) {
  }).on('EXECUTION_REPORT_REJECTED', function(data) {
  });


```


## Rest


### Trades


```js

var BlinkTradeRest = require('blinktrade').BlinkTradeRest;

var BlinkTrade = new BlinkTradeRest({
  prod: true,
  key: 'Ya8EkJ1kJSLyt5ZX60aWlmA7zPEgBqajt7UmvCZEvaA',
  secret: 'xUS4e9hEl1RGpj4Fmh4KvQYKMWT2yItG9SGlDx4aYfo',
  currency: 'BRL',
});


BlinkTrade.trades(1000, 1472347212).then(function(data) {
  console.log('Trades', data);
});

```


# LICENSE

[LICENSE GPLv3](./LICENSE)
