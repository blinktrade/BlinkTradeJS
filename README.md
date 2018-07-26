# BlinkTradeJS SDK

[![travis](https://travis-ci.org/blinktrade/BlinkTradeJS.svg?branch=master)](https://travis-ci.org/blinktrade/BlinkTradeJS)
[![npm version](https://badge.fury.io/js/blinktrade.svg)](https://badge.fury.io/js/blinktrade)
[![Known Vulnerabilities](https://snyk.io/test/github/blinktrade/blinktradejs/badge.svg)](https://snyk.io/test/github/blinktrade/blinktradejs)

BlinkTradeJS WebSocket and REST Official JavasScript client for node.js and browser.

# Getting Started

BlinkTrade provides a simple and robust WebSocket API to integrate our platform, we strongly recommend you to use it over the RESTful API.

## Install

`$ yarn add blinktrade`

using npm.

`$ npm install blinktrade`

# Documentation

You can also check our [Full API Documentation](https://blinktrade.com/docs).

# Examples

More examples can be found in the [examples directory.](./examples)

# Usage

All SDK supports either promises and callbacks, if a callback is provided as the last argument, it will be called as `callback(error, result)`,
otherwise it will just return the original promise, we also provide event emitters that you can use to get realtime updates through our WebSocket API,
you can check the [Event Emitters section.](#event-emitters)

**NOTE** We impose cross origin policy (cors), even though our SDK can work on the browser, it won’t work due our origin policy, so and we recommend you use on server side instead.
Only the public rest is available on the browser, and other environments only works on testnet and you won’t be able use to use production environment on the browser, this might change in the future.

## Public REST API

The most simple way to get the ticker, orderbook and trades, is through our public RESTful API, which doesn't require authentication.

### Ticker

```js

const BlinkTradeRest = require("blinktrade").BlinkTradeRest;
const blinktrade = new BlinkTradeRest({ currency: "BRL" });

blinktrade.ticker().then((ticker) => {
  console.log(ticker)
})

```

> Response

```json

  {
    "high": 1900,
    "vol": 4.87859418,
    "buy": 1891.89,
    "last": 1891.89,
    "low": 1891.89,
    "pair": "BTCBRL",
    "sell": 1910,
    "vol_brl": 9250.19572651
  }

```

### OrderBook


```js

const BlinkTradeRest = require("blinktrade").BlinkTradeRest;
const blinktrade = new BlinkTradeRest({ currency: "BRL" });

blinktrade.orderbook().then((orderbook) => {
  console.log(orderbook)
})

```

> Response

```json

{
  "pair": "BTCBRL",
  "bids": [
    [ 1891.89, 0.16314699, 90800027 ],
    [ 1880, 0.20712, 90800027 ]
  ],
  "asks": [
    [ 1910, 3.28046533, 90800027 ],
    [ 1919.99, 1.95046354, 90800027 ]
  ]
}

```

### Last Trades

```js

const BlinkTradeRest = require("blinktrade").BlinkTradeRest;
const blinktrade = new BlinkTradeRest({ currency: "BRL" });

blinktrade.trades().then((trades) => {
  console.log(trades)
})

```

> Response

```json

 [{
    "tid": 16093,
    "date": 1472278473,
    "price": 1891.89,
    "amount": 0.1,
    "side": "sell"
  }, {
    "tid": 16094,
    "date": 1472278477,
    "price": 1891.89,
    "amount": 0.1,
    "side": "sell"
  }, {
    "tid": 16095,
    "date": 1472278668,
    "price": 1891.89,
    "amount": 0.1,
    "side": "sell"
 }]

```

## Trade REST / WebSocket

On our RESTful API, we provide a trade endpoint that you're allowed to send and cancel orders,
request deposits and withdrawals. You need to [create an API Key](https://blinktrade.com/docs#create-api-key) through our platform and set their respective permission that gives you access to it.

The Trade endpoint is internaly a bridge to our `WebSocket` API, so you can access it both on `REST` and `WebSocket` API.
Be aware that our RESTful trade endpoint can be changed at any time, we strongly recommend using the `WebSocket` API over the `RESTful` API.

> **NOTE** that when generate the API Key and the API Secret, it will be only shown once, you should save it securely. The API Password is only used in the WebSocket API.

```js
const BlinkTradeRest = require("blinktrade").BlinkTradeRest;
const blinktrade = new BlinkTradeRest({
  prod: false,
  key: "YOUR_API_KEY_GENERATED_IN_API_MODULE",
  secret: "YOUR_SECRET_KEY_GENERATED_IN_API_MODULE",
  currency: "BRL",
});

blinktrade.sendOrder({
  side: "BUY",
  price: parseInt(1800 * 1e8).toFixed(0),
  amount: parseInt(0.5 * 1e8).toFixed(0),
  symbol: "BTCBRL",
}).then((order) => {
    console.log(order)
})

```

> Response

```json

{
    "OrderID": 1459028830811,
    "ExecID": 740972,
    "ExecType": "0",
    "OrdStatus": "0",
    "CumQty": 0,
    "Symbol": "BTCUSD",
    "OrderQty": 5000000,
    "LastShares": 0,
    "LastPx": 0,
    "Price": 180000000000,
    "TimeInForce": "1",
    "LeavesQty": 50000000,
    "MsgType": "8",
    "ExecSide": "1",
    "OrdType": "2",
    "CxlQty": 0,
    "Side": "1",
    "ClOrdID": 3251968,
    "AvgPx": 0
}

```


## Usage WebSocket


### Authenticating

Make sure that you're connected to send messages through WebSocket, most of the message also require that you're authenticated.

```js

const BlinkTradeWS = require("blinktrade").BlinkTradeWS;
const blinktrade = new BlinkTradeWS({ prod: true });

blinktrade.connect().then(() => {
  // Connected
  return blinktrade.login({ username: "<API_KEY>", password: "<API_SECRET>" });
}).then((logged) => {});

```

### Requesting Balance

Will request your balance for each broker.

```js

blinktrade.balance().then((balance) => {
  console.log(balance);
});

```

You can pass a callback to receive balance updates.

```js

blinktrade.balance(null, (err, balance) => {
  console.log(balance);
});

```

#### EXAMPLE RESPONSE

```json

{
    "5": {
        "BTC_locked": 0,
        "USD": 177911657052760,
        "BTC": 1468038442214,
        "USD_locked": 96750050000
    },
    "MsgType": "U3",
    "ClientID": 90800003,
    "BalanceReqID": 5019624
}

```

### Subscribe to OrderBook

```js

blinktrade.subscribeOrderbook(["BTCBRL"]).then((orderbook) => {
  console.log(orderbook)
})

```

#### EXAMPLE RESPONSE

```json

{
  "MDReqID": 9894272,
  "Symbol": "BTCUSD",
  "MsgType": "W",
  "MarketDepth": 0,
  "MDFullGrp": {
    "BTCUSD": {
      "bids": [[ 578, 1.59231429, 90800535 ], [ 577.79, 5.68, 90800535 ]],
      "asks": [[ 578.72, 8.32039144, 90800535 ], [ 579.67, 2, 90800535 ]]
    }
  }
}

```

To unsubscribe from orderbook, you should pass the `MDReqID` on `unSubscribeOrderbook()`.

```js

blinktrade.subscribeOrderbook(["BTCBRL"]).then((orderbook) => {
  blinktrade.unSubscribeOrderbook(orderbook.MDReqID);
});

```

> Note that there's no return when unsubscribe from orderbook.


### Subscribe to ticker

You can subscribe on one or more market symbols.

```js

blinktrade.subscribeTicker(["BLINK:BTCBRL"]).then((ticker) => {
  console.log(ticker);
});

```

To unsubscribe from ticker, you do the same as `unSubscribeOrderbook`, but passing `SecurityStatusReqID` to `unSubscribeTicker()`.

```js

blinktrade.subscribeTicker(["BLINK:BTCBRL"]).then((ticker) => {
  blinktrade.unSubscribeTicker(ticker.SecurityStatusReqID);
});

```

### Send and cancelling orders


##### [Floats are Evil!](http://floating-point-gui.de/basic/)

Converting Floats to Integers can be dangerous. Different programming languages can get weird rounding errors and imprecisions,
so all API returns prices and bitcoin values as Integers and in "satoshis" format. We also expect Integers as input,
make sure that you're formatting the values properly to avoid precision issues.

e.g.:

```
// Wrong
0.57 * 1e8 => 56999999.99999999

// Correct
parseInt((0.57 * 1e8).toFixed(0)) => 57000000

```

```js

blinktrade.sendOrder({
  side: "BUY",
  price: parseInt((550 * 1e8).toFixed(0)),
  amount: parseInt((0.05 * 1e8).toFixed(0)),
  symbol: "BTCUSD",
}).then((order) => {
  // Sent
});

```

### Advanced Orders (MARKET, LIMIT, STOP)

### Market

Market orders automatically execute your order at the current price.

```js
blinktrade.sendOrder({
  side: 'BUY',
  type: 'MARKET',
  symbol: 'BTCBRL',
  amount: parseInt(0.01 * 1e8),
})
```

**NOTE** Market orders will execute indenpendently of the price of the other side, so be careful on low liquidity scenarios.

### Limit

Limit order allows you specified your own price.

```js
blinktrade.sendOrder({
  side: 'SELL',
  type: 'LIMIT',
  symbol: 'BTCBRL',
  price: parseInt(16000 * 1e8),
  amount: parseInt(0.01 * 1e8),
})
```

#### Post Only

Post Only ensures that your order will be added to the order book and not match with a existing order.

```js
blinktrade.sendOrder({
  side: 'BUY',
  type: 'LIMIT',
  symbol: 'BTCBRL',
  price: parseInt(16000 * 1e8),
  amount: parseInt(0.01 * 1e8),
  postOnly: true,
})
```

### Stop

Stop order allow you place an order only when the price reaches the stop price,
your order won't be visible on the book until it triggered.

```js
blinktrade.sendOrder({
  side: 'SELL',
  type: 'STOP',
  symbol: 'BTCBRL',
  stopPrice: parseInt(16000 * 1e8), // Price bellow the best bid
  amount: parseInt(0.01 * 1e8),
})
```

**NOTE** STOP order will act as a MARKET order, if you want yo specify a limit price use STOP_LIMIT instead.

### Stop Limit

Stop Limit order allow you specified a limit price toghether with the stop price.

```js
blinktrade.sendOrder({
  side: 'SELL',
  type: 'STOP_LIMIT',
  symbol: 'BTCBRL',
  price: parseInt(15900 * 1e8), // Limit price
  stopPrice: parseInt(16000 * 1e8), // Price bellow the best bid
  amount: parseInt(0.01 * 1e8),
})
```

> Response

The response is the same as the [Execution Report](#executionreport-websocket), if you're using it with rest transport, it will response as an array together with the balance response.

```json

{
    "OrderID": 1459028830811,
    "ExecID": 740972,
    "ExecType": "0",
    "OrdStatus": "0",
    "CumQty": 0,
    "Symbol": "BTCUSD",
    "OrderQty": 5000000,
    "LastShares": 0,
    "LastPx": 0,
    "Price": 55000000000,
    "TimeInForce": "1",
    "LeavesQty": 5000000,
    "MsgType": "8",
    "ExecSide": "1",
    "OrdType": "2",
    "CxlQty": 0,
    "Side": "1",
    "ClOrdID": 3251968,
    "AvgPx": 0
}

```

To cancel a order, you need to pass the `orderId`, you'll also need to pass the `clientId` in order to get a response,
if you didn't provide `orderId`, all open orders will be cancelled.


```js

blinktrade.cancelOrder({ orderId: order.OrderID, clientId: order.ClOrdID }).then((order) => {
  console.log("Order Cancelled");
})

```

> The response will be the same as the sendOrder with `ExecType: "4"`



### Last Trades

List the latest trades executed on an exchange since a chosen date.

```js

blinktrade.trades({ limit: 100, since: 2270000 }).then((data) => {
  console.log("Trades", data);
})

```

### Requesting Deposits

You can generate either bitcoin or FIAT deposits, if any arguments was passed, it will generate a bitcoin deposit along with the address.

#### Generate bitcoin address to deposit

```js

blinktrade.requestDeposit().then((deposit) => {
  console.log(deposit)
})

```

#### Fiat deposit

To generate a FIAT deposit, you need to pass the `depositMethodId` which correspond the method of deposit of your broker, you can get these informations calling [`requestDepositMethods()`](requestDepositMethods)

```js

blinktrade.requestDeposit({
  value: parseInt(200 * 1e8),
  currency: "BRL",
  depositMethodId: 502,
}).then((deposit) => {
  console.log(deposit)
})

```

> Response

Both responses for bitcoin and fiat deposits are quite similar.

```json

{
    "DepositMethodName": "deposit_btc",
    "UserID": 90800003,
    "ControlNumber": null,
    "State": "UNCONFIRMED",
    "Type": "CRY",
    "PercentFee": 0,
    "Username": "user",
    "CreditProvided": 0,
    "DepositReqID": 7302188,
    "DepositID": "2a6b5e322fd24574a4d9f988681a542f",
    "Reason": null,
    "AccountID": 90800003,
    "Data": {
        "InputAddress": "mjjVMr8WcYQwVGzYc8HpaRyAZc89ngTdKV",
        "Destination": "n19ZAH1WGoUkQhubQw71fH11BenifxpBxf"
    },
    "ClOrdID": "7302188",
    "Status": "0",
    "Created": "2016-09-03 23:08:26",
    "DepositMethodID": null,
    "Value": 0,
    "BrokerID": 5,
    "PaidValue": 0,
    "Currency": "BTC",
    "ReasonID": null,
    "MsgType": "U23",
    "FixedFee": 0
}

```

**NOTE** The `Data.InputAddress` is the address that you have to deposit. **DO NOT DEPOSIT** on `Data.Destination` address.

### Requesting Withdraws

To request withdraws, you need to pass a "data" information, which represents the information to your withdraw,
it's related to bank accounts, numbers, or a bitcoin address. This information is dynamically and different for every broker.

```js

blinktrade.requestWithdraw({
  amount: parseInt(400 * 1e8),
  currency: "BRL",
  method: "bradesco",
  data: {
    AccountBranch: "111",
    AccountNumber: "4444-5",
    AccountType: "corrente",
    CPF_CNPJ: "00000000000"
  }
})

```

### Confirm Withdraws (two-factor)

After requesting a withdraw, you might get an error asking for two factor authentication,
you should call `confirmWithdraw` passing the `confirmationToken` that was sent to your email,
or `secondFactor` if needed.

```js

blinktrade.confirmWithdraw({
    withdrawId: 523,
    confirmationToken: 'TOKEN'
})

```

> Response

```json

{
    "Username": "user",
    "Status": "1",
    "SecondFactorType": "",
    "Created": "2016-09-03 23:42:06",
    "PaidAmount": 50000000,
    "UserID": 90800003,
    "Reason": null,
    "Currency": "BRL",
    "Amount": 50000000,
    "ReasonID": null,
    "BrokerID": 5,
    "ClOrdID": "3332623",
    "WithdrawID": 523,
    "WithdrawReqID": 3332623,
    "MsgType": "U7",
    "Data": {
        "Instant": "NO",
        "AccountBranch": "111",
        "AccountNumber": "4444-5",
        "AccountType": "corrente", 
        "CPF_CNPJ": "00000000000"
    },
    "Method": "bradesco",
    "FixedFee": 0,
    "PercentFee": 0
}


```

## Event Emitters

Using event emitters is easy and expressive way to keep you updated through our `WebSocket` API,
you can listen to individual events to match your needs, you can listen to new orders, execution reports, tickers and balance changes.
Event emitters can also be used as promises to keep it chained, event emitters are implemented with [`EventEmitter2`](https://github.com/asyncly/EventEmitter2),
which gives you more flexibility to match events with multi-level wildcards and extends events such as `.onAny`, `.once`, `.many` and so on.

### Connection Events

You can listem to `OPEN`, `CLOSE`, and `ERROR` events to get WebSocket events and error handling.

```js

blinktrade.connect()
  .on('OPEN',  (e) => {})
  .on('CLOSE', (e, lastMessageSent) => {})
  .on('ERROR', (error, lastMessageSent) => {})
  .then(() => {
    console.log('Connected')
  })

```

The `OPEN` event is useful to handle reconnections, since the promise is already resolved.

The `ERROR` event is where you can do all the error handling, both from WebSocket errors or an
error raised by the backend due some invalid message, both `CLOSE` and `ERROR` will give you
the last message that you sent as the second argument.

You can also listen them by just `blinktrade.on('OPEN', (e) => {})` that works just fine.

### Event Ticker

To keep ticker update on new events, you can return a event emitter and match with the market.

```js

blinktrade.subscribeTicker(["UOL:USDBRT", "BLINK:BTCUSD", "BLINK:BTCBRL"])
  .on("UOL:USDBRT",   (usdbrt) => {})
  .on("BLINK:BTCUSD", (btcusd) => {})
  .on("BLINK:BTCBRL", (btcbrl) => {})

```

You can easily match all symbols at the same listener.

```js

blinktrade.subscribeTicker(["UOL:USDBRT", "BLINK:BTCUSD", "BLINK:BTCBRL"])
.on("BLINK:*", (ticker) => {})

```

### Event Market Data

To get realtime updates on order book, you should listen to the following events.

```js

blinktrade.subscribeOrderbook(["BTCUSD"])
  .on("OB:NEW_ORDER", (order) => {})
  .on("OB:UPDATE_ORDER", (order) => {})
  .on("OB:DELETE_ORDER", (order) => {})
  .on("OB:DELETE_ORDERS_THRU", (order) => {})
  .on("OB:TRADE_NEW", (order) => {})

```

You can still return a promise when listen events.

```js

blinktrade.subscribeOrderbook(["BTCBRL"])
.on("OB:NEW_ORDER", (order) => {
  console.log("New order received")
}).then((orderbook) => {
  console.log("Full orderbook", orderbook)
})

```

### Event Balance

You listen to the `BALANCE` event to receive balance updates.

```js

blinktrade.balance().on("BALANCE", (balance) => console.log(balance))

```

### Execution Reports

In order the get when a order is executed, you can listen to the execution report.

```js

blinktrade.executionReport()
  .on("EXECUTION_REPORT:NEW", (data) => {})
  .on("EXECUTION_REPORT:PARTIAL", (data) => {})
  .on("EXECUTION_REPORT:EXECUTION", (data) => {})
  .on("EXECUTION_REPORT:CANCELED", (data) => {})
  .on("EXECUTION_REPORT:REJECTED", (data) => {})

```

### Withdraw and Deposit Refresh

To get deposit and withdraw updates, you can listen to `DEPOSIT_REFRESH` and `WITHDRAW_REFRESH` respectively.

```js

blinktrade.requestDeposit().on('DEPOSIT_REFRESH', (deposit) => {
  console.log(deposit)
})

blinktrade.requestWithdraw().on('WITHDRAW_REFRESH', (withdraw) => {
  console.log(withdraw)
})

```

**NOTE** that these events will only be called to the current deposit / withdraw created.
If you want to listen to any deposit / withdraw updates, you should use `onDepositRefresh(callback)` and `onWithdrawRefresh()` instead.

```js

blinktrade.onDepositRefresh((deposit) => {
  console.log(deposit)
})

blinktrade.onWithdrawRefresh((withdraw) => {
  console.log(withdraw)
})

```

## Handling WebSocket Reconnections

A simple connection pool

```js

const blinktrade = new BlinkTradeWS({
  prod: false,
  brokerId: 11,
  reconnect: true,
  reconnectInterval: 3000,
})

blinktrade.connect().on('OPEN', () => {
  console.log('connected');
  blinktrade.login({
    username: '<API_KEY>'
    password: '<API_PASSWORD>'
  }).then(() => {
    // Manually disconnect WebSocket connection
    blinktrade.disconnect()
  })
})

```

# API

## Public REST API

* [Ticker](#ticker-rest)
* [Trades](#trades-rest)
* [Orderbook](#orderbook-rest)

## WebSocket

* [connect](#connect-websocket)
* [heartbeat](#heartbeat-websocket)
* [login](#login-websocket)
* [logout](#logout-websocket)
* [profile](#profile-websocket)
* [subscribeTicker](#ticker-websocket)
* [unSubscribeTicker](#ticker-websocket)
* [subscribeOrderbook](#orderbook-websocket)
* [unSubscribeOrderbook](#orderbook-websocket)
* [executionReport](#executionreport-websocket)
* [tradeHistory](#tradehistory-websocket)

## Trade Rest / Websocket

* [balance](#balance-websocket-rest)
* [sendOrder](#sendorder-websocket-rest)
* [cancelOrder](#cancelorder-websocket-rest)
* [myOrders](#myorders-websocket-rest)
* [requestLedger](#requestledger-websocket-rest)
* [requestWithdrawList](#requestwithdrawlist-websocket-rest)
* [requestWithdraw](#requestwithdraw-websocket-rest)
* [confirmWithdraw](#confirmwithdraw-websocket-rest)
* [cancelWithdraw](#cancelwithdraw-websocket-rest)
* [onWithdrawRefresh](#onwithdrawrefresh-websocket)
* [requestDepositList](#requestdepositList-websocket-rest)
* [requestDeposit](#requestdeposit-websocket-rest)
* [requestDepositMethods](#requestdeposit-websocket-rest)
* [onDepositRefresh](#ondepositrefresh-websocket)

## Public REST

### Constructor [rest]

`new BlinkTradeRest(Object constructor)`

#### Arguments

| Name     | Type    | Description                                                                |
|----------|---------|----------------------------------------------------------------------------|
| prod     | Boolean | Production environment, default to false                                   |
| brokerId | Number  | [see brokers list](https://blinktrade.com/docs/#brokers)                                                       |
| key      | String  | API Key generated on our platform, it only needed on the Trade endpoint    |
| secret   | String  | API Secret generated on our platform, it only needed on the Trade endpoint |
| currency | String  | Currency symbol to fetch public endpoint                                   |

### ticker [rest]

`ticker(Function? callback)` => Promise / callback

### trades [rest]

`trades(Object params, Function? callback)` => Promise / callback

#### Arguments

| Name  | Type   | Description                                                                |
|-------|--------|----------------------------------------------------------------------------|
| limit | Number | Limit of trades that will be returned. <NUMBER> should be a positive integer. Optional; defaults to 100 trades |
| since | Number | tid (TradeID) which executed trades must be fetched from. Optional; defaults to the date of the first executed trade |

### orderbook [rest]

`orderbook(Function? callback)` => Promise / callback

## WebSocket

### constructor [websocket]

`new BlinkTradeWS(Object constructor)`

#### Arguments

| Name              | Type    | Description                              |
|-------------------|---------|------------------------------------------|
| prod              | Boolean | Production environment, default to false |
| brokerId          | Number  | [see brokers list](https://blinktrade.com/docs/#brokers) |
| url               | String  | Custom url in case if you're using a custom backend url |
| headers           | String  | Custom headers to pass to WebSocket constructor if it supported, (useful on react-native) |
| fingerPrint       | String  | Custom fingerprint if you are not using in either a browser or node (useful on react-native) |
| reconnect         | Boolean | Automatically reconnects WebSocket after disconnected, to receive the reconnection event you should listen to the `OPEN` since the promise is already resolved |
| reconnectInterval | Number  | Reconnection Interval in miliseconds |

### connect [websocket]

Connect to our WebSocket.

`connect(Function? callback)` => Promise / callback

### Connection Events

| Event | Description |
|-------|-------------|
| OPEN  | Callback when WebSocket connects, by using this approach instead of a promise, you can benefit of reconnection events |
| CLOSE | Callback when WebSocket closes |
| ERROR | Callback when an error occured on both WebSocket or an error raised by the backend |

### heartbeat [websocket]

Used as test request to check the latency connection.

`heartbeat(Function? callback)` => Promise / callback

### login [websocket]

`login(Object login, Function? callback)` => Promise / callback

#### Arguments

| Name               | Type    | Description      |
|--------------------|---------|------------------|
| username           | String  | Account username or API_Key |
| password           | String  | Account password or API_Password |
| secondFactor       | String  | Optional. If the authentication require second factor, you'll receive an error with `NeedSecondFactor = true`, **NOTE**: Is recommended that you use an API Key / API Password instead, which don't required second factor |
| brokerId           | Number  | Optional. Overwrites the broker id provided by the constructor |
| cancelOnDisconnect | Boolean | Optional. If it's true, all orders sent by the session will be cancelled when the WebSocket disconnects |

### logout [websocket]

`logout(Function? callback)` => Promise / callback

### profile [websocket]

Available only on `WebSocket`.

`profile(Function? callback)` => Promise / callback


### subscribeTicker [websocket]

`subscribeTicker(Array<string> symbols, Function? callback)` => Promise / callback


Symbols Available:

| Name         | Description                  |
|--------------|------------------------------|
| BLINK:BTCUSD | BTC <-> Testnet (USD)        |
| BLINK:BTCBRL | BTC <-> Brazil Reals (BRL)   |
| BLINK:BTCCLP | BTC <-> Chilean Pesos        |
| BLINK:BTCVND | BTC <-> Vietnamise Dongs     |
| UOL:USDBRT   | Dólar Turismo                |
| UOL:USDBRL   | Dólar Comercial              |


### subscribeOrderbook [websocket]

`subscribeOrderbook(Array<string> symbol, Function? callback)` => Promise / callback

#### Events

| Event                 |  Description                                                                 |
|-----------------------|------------------------------------------------------------------------------|
| OB:NEW_ORDER          | Callback when receives a new order                                           |
| OB:UPDATE_ORDER       | Callback when an order has been updated                                      |
| OB:DELETE_ORDER       | Callback when an order has been deleted                                      |
| OB:DELETE_ORDERS_THRU | Callback when one or more orders has been executed and deleted from the book |

### executionReport [websocket]

`executionReport(Function? callback)` => Promise / callback

#### Events

An event emitter to get execution reports.

| Event                      |  Description                                         |
|----------------------------|------------------------------------------------------|
| EXECUTION_REPORT:NEW       | Callback when you send a new order                   |
| EXECUTION_REPORT:PARTIAL   | Callback when your order has been partially executed |
| EXECUTION_REPORT:EXECUTION | Callback when an order has been successfully executed |
| EXECUTION_REPORT:CANCELED  | Callback when your order has been canceled          |
| EXECUTION_REPORT:REJECTED  | Callback when order has been rejected          |


### tradeHistory [websocket]

`tradeHistory(Object params, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                 |
|----------|--------|---------------------------------------------|
| page     | Number | Current page to fetch, defaults to 0        |
| pageSize | Number | Number of trades, limits to 80              |
| since    | Number | TradeID or Date which executed trades must be fetched from. is in Unix Time date format. Optional; defaults to the date of the first executed trade. |
| symbols  | Array  | List of symbols, e.g.: ["BTCVND", "BTCCLP"] |

## Trade REST / Websocket

These methods bellow are both availabe under REST and WebSocket API.

### balance [websocket, rest]

`balance(Function? callback)` => Promise / callback

#### Events

`balance().on("BALANCE", Function callback)` => Promise

### sendOrder [websocket, rest]

`sendOrder(Object order, Function? callback)` => Promise / callback

#### Arguments

| Name      | Type    | Description                                          |
|-----------|---------|------------------------------------------------------|
| type      | String  | "MARKET", "LIMIT", "STOP" or "STOP_LIMIT"            |
| side      | String  | "BUY, "SELL" or "1" = BUY, "2" = SELL                |
| price     | Number  | Price in "satoshis". e.g.: 1800 * 1e8                |
| stopPrice | Number  | Stop price used by order type "STOP" or "STOP_LIMIT" |
| amount    | Number  | Amount to be sent in satoshis. e.g.: 0.5 * 1e8       |
| symbol    | String  | Currency pair symbol, [check symbols table]()        |
| postOnly  | Boolean | If true, ensures that your order will be added to the order book and not match with a existing order |
| clientId  | String  | Optional clientId, if doens't provided, will be used the requestId instead |

### cancelOrder [websocket, rest]

`cancelOrder(Object order | Number orderId, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                                 |
|----------|--------|-------------------------------------------------------------|
| orderId  | Number | **Required** Order ID to be canceled                        |
| clientId | Number | You need to pass the clientId (`ClOrdID`) to get a response |


### myOrders [websocket, rest]

`myOrders(Object params, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                     |
|----------|--------|-------------------------------------------------|
| page     | Number | Current page to fetch, defaults to 0            |
| pageSize | Number | Number of orders, limits to 40 |
| filter   | Array  | Optional; Open: ['has_leaves_qty eq 1'], Filled: ['has_cum_qty eq 1'], Cancelled: ['has_cxl_qty eq 1'] |

### requestLedger [websocket, rest]

`requestLedger(Object params, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description/Value
|----------|--------|------------------
| page     | number | **Optional**; defaults to 0
| pageSize | number | **Optional**; defaults to 20
| brokerID | number | **Optional**; [\<BROKER_ID\>](#brokers)
| currency | string | **Optional**; Currency code. (.e.g: BTC)


### requestWithdrawList [websocket, rest]

`requestWithdrawList(Object pagination, Array<string> statusList, Function? callback)` => Promise / callback

| Name       | Type   | Description                                        |
|------------|--------|----------------------------------------------------|
| page       | Number | Current page to fetch, defaults to 0               |
| pageSize   | Number | Number of withdraws, limits to 20                  |
| statusList | Array  | 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled |

### requestWithdraw [websocket, rest]

`requestWithdraw(Object params, Function? callback)` => Promise / callback

| Name     | Type   | Description                                                            |
|----------|--------|------------------------------------------------------------------------|
| data     | Object | Withdraw required fields                                               |
| amount   | Number | Amount of the withdraw                                                 |
| method   | Array  | Method name of withdraw, check with your broker, defaults to `bitcoin` |
| currency | String | Currency pair symbol to withdraw, defaults to `BTC`                    |

#### Events

| Event            | Description                    |
|------------------|--------------------------------|
| WITHDRAW_REFRESH | Callback when withdraw refresh |

### confirmWithdraw [websocket, rest]

`confirmWithdraw(Object params, Function? callback)` => Promise / callback

| Name              | Type   | Description                                                       |
|-------------------|--------|-------------------------------------------------------------------|
| withdrawId        | String | Withdraw ID to confirm                                            |
| confirmationToken | String | **Optional** Confirmation Token sent by email                     |
| secondFactor      | String | **Optional** Second Factor Authentication code generated by authy |

### cancelWithdraw [websocket, rest]

`cancelWithdraw(Number withdrawId, Function? callback)` => Promise / callback

### onWithdrawRefresh [websocket]

`onWithdrawRefresh(Function callback)` => Promise

### requestDepositList [websocket, rest]

`requestDepositList(Object params, Function? callback)` => Promise / callback

| Name       | Type   | Description                                        |
|------------|--------|----------------------------------------------------|
| page       | Number | Current page to fetch, defaults to 0               |
| pageSize   | Number | Number of deposits, limits to 20                   |
| statusList | Array  | 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled |

### requestDeposit [websocket, rest]

`requestDeposit(Object params, Function? callback)` => Promise / callback

| Name            | Type   | Description                                             |
|-----------------|--------|---------------------------------------------------------|
| value           | Number | Value amount to deposit                                 |
| currency        | String | Currency pair symbol to withdraw, defaults to `BTC`     |
| depositMethodId | Number | Method ID to deposit, check [`requestDepositMethods`]() |

#### Events

| Event           | Description                   |
|-----------------|-------------------------------|
| DEPOSIT_REFRESH | Callback when deposit refresh |

### requestDepositMethods [websocket, rest]

`requestDepositMethods(Function? callback)` => Promise / callback

### onDepositRefresh [websocket]

`onDepositRefresh(Function callback)` => Promise

# LICENSE

[LICENSE GPLv3](./LICENSE)
