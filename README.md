# BlinkTradeJS SDK

BlinkTradeJS WebSocket and Rest official JavasScript client for node.js and browser.

# Getting Started

BlinkTrade provides a simple and robust WebSocket API to integrate our platform, we strongly recommend you to use it over the Rest-ful API.

## Install

> Not Publish yet.

`$ npm install blinktrade`

# Modules

* BlinkTradeWS
* BlinkTradeRest

# Examples

More examples can be found in the examples [directory.](./examples)

# Usage

All SDK supports either promises and callbacks, if a callback is provided as the last argument, it will be called as `callback(error, result)`,
otherwise it will just return the original promise, we also provide event emitters that you can use in order to get realtime updates through our websocket api,
you can check the [Event Emitters section.](#event-emitters)


## Public Rest API

The most simple way to get the ticker, orderbook and trades, is through our public rest-ful api, which doesn't require authentication.

### Ticker

```js

var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({ currency: "BRL" });

BlinkTrade.ticker().then(function(ticker) {
  console.log(ticker);
});

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

var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({ currency: "BRL" });

BlinkTrade.orderbook().then(function(orderbook) {
  console.log(orderbook);
});

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

var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({ currency: "BRL" });

BlinkTrade.trades().then(function(trades) {
  console.log(trades);
});

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

## Trade Rest API

On our Rest-ful API, we provide a trade endpoint that you're allowed to send and cancel orders, request deposits and withdraws,
you need to generate a API Key through our platform and set their respective permission to generate the API Key.

> note that when generate the API Key and the API Secret, it will be only shown once, you should save it securely, the API Password is only used in the WebSocket api.

```js
var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({
  prod: false,
  key: "YOUR_API_KEY_GENERATED_IN_API_MODULE",
  secret: "YOUR_SECRET_KEY_GENERATED_IN_API_MODULE",
  currency: "BRL",
});

BlinkTrade.sendOrder({
  side: "1",
  price: parseInt(1800 * 1e8),
  amount: parseInt(0.5 * 1e8),
  symbol: "BTCBRL",
}).then(function(order) {
	console.log(order);
});

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

Make sure that you're connected in order to send messages through websocket, most of the message also require that you're authenticated.

```js

var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
var BlinkTrade = new BlinkTradeWS({ prod: true });

BlinkTrade.connect().then(function(){
  // Connected
  return BlinkTrade.login({ username: "", password: "" });
}).then(function() {
});

```

### Requesting Balance

```js

BlinkTrade.balance().then(function(balance) {
  console.log(balance);
});

```

You can pass a callback in order to receive balance updates.

```js

BlinkTrade.balance(function(err, balance) {
  console.log(balance);
});

```

### Subscribe to OrderBook

```js

BlinkTrade.subscribeOrderbook(["BTCUSD"]).then(function(orderbook) {
  console.log(orderbook);
});

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

In order to unsubscribe on orderbook, you should pass the `MDReqID` on `unSubscribeOrderbook()`.

```js

BlinkTrade.subscribeOrderbook(["BTCUSD"]).then(function(orderbook) {
  BlinkTrade.unSubscribeOrderbook(orderbook.MDReqID);
});

```

> Note that there's not return when unsubscribe from orderbook.


### Subscribe to ticker

You can subscribe on one or more market symbols

```js

BlinkTrade.subscribeTicker(["BLINK:BTCUSD"]).then(function(ticker) {
  console.log(ticker);
});

```

To unsubscribe ticker, you do the same as `unSubscribeOrderbook`, but passing `SecurityStatusReqID` to `unSubscribeTicker()`.

```js

BlinkTrade.subscribeTicker(["BLINK:BTCUSD"]).then(function(ticker) {
  BlinkTrade.unSubscribeTicker(ticker.SecurityStatusReqID);
});

```

### Send and cancelling orders


#####[Floats are Evil!](http://floating-point-gui.de/basic/)

Converting Floats to Integers can be dangerous, different programming languages can get weird rounding errors and imprecisions,
so all API returns prices and bitcoin values as Integers and in "satoshis" format, we also expect Integers as input,
make sure that you're formatting the values properly to avoid precision issues.

e.g.:

```
// Wrong
0.57 * 1e8 => 56999999.99999999

// Correct
parseInt((0.57 * 1e8).toFixed(0)) => 57000000

```

```js

BlinkTrade.sendOrder({
  "side": "1", // Buy
  "price": parseInt((550 * 1e8).toFixed(0)),
  "amount": parseInt((0.05 * 1e8).toFixed(0)),
  "symbol": "BTCUSD",
}).then(function(order) {
  // Sent
});

```

> Response

The response is the same as the [Execution Report](#executionreport-websocket), if you're using it with Rest transport, it will response as an array together with a balance response.

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

To cancel orders, you need to pass the OrderID, you'll also need to pass the ClOrdId as `clientId` in order to get a response.

```js

BlinkTrade.cancelOrder({ orderID: order.OrderID, clientId: order.ClOrdID }).then(function(order) {
  console.log("Order Cancelled");
});

```

> The response will be the same as the sendOrder with `ExecType: "4"`



### Last Trades

A list of the last trades executed on an exchange since a chosen date.

```js

BlinkTrade.trades({ limit: 1000, since: "1472347212" }).then(function(data) {
  console.log("Trades", data);
});

```

### Requesting Deposits

You can generate both bitcoin and FIAT deposits, if any arguments was provied, it will generate a bitcoin deposit along with the address.

#### Generate bitcoin address to deposit

```js

blinktrade.requestDeposit().then(function(deposit) {
  console.log(deposit);
});

```

#### Fiat deposit

To generate a FIAT deposit, you need to pass the `depositMethodId` which correspond the method of deposit of your broker, you can get these informations calling [`requestDepositMethods()`](requestDepositMethods)

```js

blinktrade.requestDeposit({
  value: parseInt(200 * 1e8),
  currency: "BRL",
  depositMethodId: 502,
}).then(function(deposit) {
  console.log(deposit);
});

```

> Response

Both response for bitcoin and fiat deposits are very similar.

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


### Requesting Withdraws

To request withdraws, you need to pass a "data" information, whichs represents the information to your withdraw,
it's related to bank accounts, numbers, or a bitcoin address, these informations are dynamically and is diferrent from brokers by brokers,
can check the [withdraws methods required]() fields on API section...

```js

BlinkTrade.requestWithdraw({
  "amount": parseInt(400 * 1e8),
  "currency": "BRL",
  "method": "bradesco",
  "data": {
    "AccountBranch": "111",
    "AccountNumber": "4444-5",
    "AccountType": "corrente",
    "CPF_CNPJ": "00000000000"
  }
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

Using event emitters is easy and expressive way to keep you updated through our websocket api,
you can listen to individual events in order to match your needs, you can listen new orders, execution reports, tickers and balance changes,
event emitters can also be used as promises to keep it chained, event emitters are implemented with [`EventEmitter2`](https://github.com/asyncly/EventEmitter2),
which gives you more flexibility to match events with multi-level wildcards and extends events such as `.onAny`, `.once`, `.many` and so on.

### Event Ticker

In order to keep ticker update on new events, you can return a event emitter and match with the market.

```js

BlinkTrade.subscribeTicker(["UOL:USDBRT", "BLINK:BTCUSD", "BLINK:BTCBRL"])
  .on("UOL:USDBRT",   function(usdbrt) {
}).on("BLINK:BTCUSD", function(btcusd) {
}).on("BLINK:BTCBRL", function(btcbrl) {
});

```

You can easily match all symbols at the same listener.

```js

BlinkTrade.subscribeTicker(["UOL:USDBRT", "BLINK:BTCUSD", "BLINK:BTCBRL"])
.on("BLINK:*", function(symbol) {
});

```

### Event Market Data

To get realtime updates on order book, you should listen to the following events.

```js

BlinkTrade.subscribeOrderbook(["BTCUSD"])
  .on("OB:NEW_ORDER", function(order) {
}).on("OB:UPDATE_ORDER", function(order) {
}).on("OB:DELETE_ORDER", function(order) {
}).on("OB:DELETE_ORDERS_THRU", function(order) {
}).on("OB:TRADE_NEW", function(order) {
});

```

You can still return a promise when listen events...

```js

BlinkTrade.subscribeOrderbook(["BTCUSD"])
.on("OB:NEW_ORDER", function(order) {
  console.log("New order received");
}).then(function(orderbook) {
  console.log("Full orderbook", orderbook);
});

```

### Event Balance

You listen the `BALANCE` event to receive balance updates

```js

BlinkTrade.balance().on("BALANCE", function(balance) {
  console.log(balance);
});

```

### Execution Reports

In order the get when a order is executed, you can listen the execution report.

```js

  blinktrade.executionReport()
    .on("EXECUTION_REPORT:NEW", function(data) {
  }).on("EXECUTION_REPORT:PARTIAL", function(data) {
  }).on("EXECUTION_REPORT:EXECUTION", function(data) {
  }).on("EXECUTION_REPORT:CANCELED", function(data) {
  }).on("EXECUTION_REPORT:REJECTED", function(data) {
  });

```

# API

## Public Rest API

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
* [listWithdraws](#listwithdraws-websocket-rest)
* [requestWithdraw](#requestwithdraw-websocket-rest)
* [requestDeposit](#requestdeposit-websocket-rest)
* [requestDepositMethods](#requestdeposit-websocket-rest)

## Public Rest

### Constructor [rest]

`new BlinkTradeRest(Object constructor)`

#### Arguments

| Name     | Type    | Description                                                                |
|----------|---------|----------------------------------------------------------------------------|
| prod     | Boolean | Production environment, default to false                                   |
| brokerId | Number  | [see brokers list]()                                                       |
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
| limit | Number | Limit of trades that will be returned. <NUMBER> should be a positive integer. Optional; defaults to 1000 trades  |
| since | Number | Date which executed trades must be fetched from. <TIMESTAMP> is in Unix Time date format. Optional; defaults to the date of the first executed trade |

### orderbook [rest]

`orderbook(Function? callback)` => Promise / callback

## WebSocket

### constructor [websocket]

`new BlinkTradeWS(Object constructor)`

#### Arguments

| Name     | Type    | Description                                                  |
|----------|---------|--------------------------------------------------------------|
| prod     | Boolean | Production environment, default to false                     |
| brokerId | Number  | [see brokers list]()                                         |
| url      | String  | Custom url just in case if you're using a custom backend url |

### connect [websocket]

Connect to our websocket.

`connect(Function? callback)` => Promise / callback

### heartbeat [websocket]

Used as test request to check the latency connection.

`heartbeat(Function? callback)` => Promise / callback

### login [websocket]

`login(Object login, Function? callback)` => Promise / callback

#### Arguments

| Name         | Type   | Description      |
|--------------|--------|------------------|
| username     | String | Account username |
| password     | String | Account password |
| secondFactor | String | Optional secondFactor, if the authentication require second factor, you'll receive an error with `NeedSecondFactor = true` |

### logout [websocket]

`logout(Function? callback)` => Promise / callback

### profile [websocket]

Available only on `websocket`.

`profile(Function? callback)` => Promise / callback


### subscribeTicker [websocket]

`subscribeTicker(Array<string> symbols, Function? callback)` => Promise / callback


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


### subscribeOrderbook [websocket]

`subscribeOrderbook(Array<string> symbol, Function? callback)` => Promise / callback

#### Events

| Event                 |  Description                                                                               |
|-----------------------|--------------------------------------------------------------------------------------------|
| OB:NEW_ORDER          | Callback when receives a new order                                                         |
| OB:UPDATE_ORDER       | Callback when an order have been updated                                                   |
| OB:DELETE_ORDER       | Callback when an order have been deleted                                                   |
| OB:DELETE_ORDERS_THRU | Callback when one or more orders have been executed and consequently deleted from the book |

### executionReport [websocket]

`executionReport(Function? callback)` => Promise / callback

#### Events

An event emitter to get execution reports.

| Event                      |  Description                                         |
|----------------------------|------------------------------------------------------|
| EXECUTION_REPORT:NEW       | Callback when you send a new order                   |
| EXECUTION_REPORT:PARTIAL   | Callback when your order have been partialy executed |
| EXECUTION_REPORT:EXECUTION | Callback when an order have been sussefully executed |
| EXECUTION_REPORT:CANCELED  | Callback when your order have been canceled          |
| EXECUTION_REPORT:REJECTED  | Callback when your order have been rejected          |


### tradeHistory [websocket]

`tradeHistory(Object pagination, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                     |
|----------|--------|-------------------------------------------------|
| page     | Number | Current page to fetch, defaults to 0            |
| pageSize | Number | Number of trades on the same page, limits to 80 |


## Trade Rest / Websocket

These methods bellow are both availabe under Rest and WebSocket API.

### balance [websocket, rest]

`balance(Function? callback)` => Promise / callback

#### Events

`balance().on("BALANCE", Function callback)` => Promise

### sendOrder [websocket, rest]

`sendOrder(Object order, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                    |
|----------|--------|------------------------------------------------|
| side     | String | "1" = Buy, "2" = Sell                          |
| price    | Number | Price in "satoshis". e.g.: 1800 * 1e8          |
| amount   | Number | Amount to be sent in satoshis. e.g.: 0.5 * 1e8 |
| symbol   | String | Currency pair symbol, [check symbols table]()  |


### cancelOrder [websocket, rest]

`cancelOrder(Object order | Number orderId, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                                          |
|----------|--------|----------------------------------------------------------------------|
| orderId  | Number | **Required** Order ID to be canceled                                 |
| clientId | Number | You need to pass the clientId (`ClOrdID`) in order to get a response |


### myOrder [websocket, rest]

`myOrder(Object pagination, Function? callback)` => Promise / callback

#### Arguments

| Name     | Type   | Description                                     |
|----------|--------|-------------------------------------------------|
| page     | Number | Current page to fetch, defaults to 0            |
| pageSize | Number | Number of trades on the same page, limits to 40 |


### listWithdraws [websocket, rest]

`listWithdraws(Object pagination, Array<string> statusList, Function? callback)` => Promise / callback

| Name       | Type   | Description                                        |
|------------|--------|----------------------------------------------------|
| page       | Number | Current page to fetch, defaults to 0               |
| pageSize   | Number | Number of trades on the same page, limits to 20    |
| statusList | Array  | 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled |

### requestWithdraw [websocket, rest]

`requestWithdraw(Object params, Function? callback)` => Promise / callback

| Name     | Type   | Description                                                            |
|----------|--------|------------------------------------------------------------------------|
| data     | Object | Withdraw required fields                                               |
| amount   | Number | Amount of the withdraw                                                 |
| method   | Array  | Method name of withdraw, check with your broker, defaults to `bitcoin` |
| currency | String | Currency pair symbol to withdraw, defaults to `BTC`                    |

**FOXBIT**

| Methods               | Required Data fields                                                      |
|-----------------------|---------------------------------------------------------------------------|
| bradesco              | AccountBranch, AccountNumber, AccountType, CPF_CNPJ                       |
| bb                    | AccountBranch, AccountNumber, AccountType, CPF_CNPJ                       |
| Caixa                 | AccountBranch, AccountNumber, AccountType, CPF_CNPJ                       |
| ted                   | BankName, BankNumber, AccountBranch, AccountNumber, AccountType, CPF_CNPJ |

**VBTC**

| Methods                | Required Data fields                                                                                             |
|------------------------|------------------------------------------------------------------------------------------------------------------|
| banktransfer           | BankName, AccountBranch, BankCity, AccountName, AccountNumber, BankSwift                                         |
| VPBankinternaltransfer | VPbankbranch, BankCity, AccountName, AccountNumber, BankSwift                                                    |
| cashtoID               | BankName, BankBranch, BankCity, Clientname, ClientIDNr, Issue Date ID, Place of Issue, Phone Number of Recipient |


### requestDeposit [websocket, rest]

`requestDeposit(Object params, Function? callback)` => Promise / callback

| Name            | Type   | Description                                             |
|-----------------|--------|---------------------------------------------------------|
| value           | Number | Value amount to deposit                                 |
| currency        | String | Currency pair symbol to withdraw, defaults to `BTC`     |
| depositMethodId | Number | Method ID to deposit, check [`requestDepositMethods`]() |


### requestDepositMethods [websocket, rest]

`requestDepositMethods(Function? callback)` => Promise / callback


# LICENSE

[LICENSE GPLv3](./LICENSE)
