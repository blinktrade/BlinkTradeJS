import nock from 'nock';
import common from '../../src/constants/common';
import { BlinkTradeRest } from '../../src';

const endpoint = common.testnet.rest;

const ticker = {
  high: 24091.21,
  vol: 65.30060763,
  buy: 24063.75,
  last: 24058.01,
  low: 23865.91,
  pair: 'BTCBRL',
  sell: 24091.21,
  vol_brl: 1566217.37416423,
};

const tickerUSD = {
  high: 24000.0,
  vol: 0.00622652,
  buy: 24000.0,
  last: 24000.0,
  low: 24000.0,
  pair: 'BTCUSD',
  vol_usd: 149.43648,
  sell: 0,
};

const balance = {
  Status: 200,
  Description: 'OK',
  Responses: [{
    '4': {
      BTC_locked: 6051325,
      BRL: 25675952357074,
      BTC: 60136060,
      BRL_locked: 16307010000,
    },
    MsgType: 'U3',
    ClientID: 90800078,
    BalanceReqID: 4904378,
  }],
};

const errorResponse = {
  Status: 500,
  Description: 'Error',
};

const sentOrder = {
  Status: 200,
  Description: 'OK',
  Responses: [
    {
      OrderID: 999,
      ExecID: 0,
      ExecType: '0',
      OrdStatus: '0',
      LeavesQty: 10000000,
      Symbol: 'BTCBRL',
      OrderQty: 10000000,
      LastShares: 0,
      LastPx: 0,
      CxlQty: 0,
      TimeInForce: '1',
      CumQty: 0,
      MsgType: '8',
      ClOrdID: '999',
      OrdType: '2',
      Side: '1',
      Price: 500000000,
      ExecSide: '1',
      AvgPx: 0,
    },
    {
      '4': {
        BTC_locked: 0,
        BRL: 10,
        BTC: 1,
        BRL_locked: 5,
      },
      MsgType: 'U3',
      ClientID: 90800078,
      BalanceReqID: 4904378,
    },
  ],
};

const mockResponse = (uri, requestBody) => {
  const type = requestBody.MsgType;
  return type === 'U2' ? balance
       : type === 'D'  ? sentOrder : errorResponse;
};

const blinktrade = new BlinkTradeRest({
  prod: false,
  key: '<KEY>',
  secret: '<SECRET>',
  currency: 'BRL',
});

describe('Rest', () => {
  test('GET /api/v1/BRL/ticker', async () => {
    nock(endpoint).get('/api/v1/BRL/ticker').reply(200, ticker);
    const data = await blinktrade.ticker();
    expect(data).toEqual(ticker);
  });

  test('GET /api/v1/USD/ticker', async () => {
    nock(endpoint).get('/api/v1/USD/ticker').reply(200, tickerUSD);
    const blinktrade = new BlinkTradeRest({ prod: false, currency: 'USD' });
    const data = await blinktrade.ticker();
    expect(data).toEqual(tickerUSD);
  });

  test('POST /tapi/v1/message with balance request and matching signature headers', async () => {
    // Mock now to match the nonce signature
    Date.now = () => 1540356221059;
    nock(endpoint)
      .post('/tapi/v1/message')
      .matchHeader('content-type', 'application/json')
      .matchHeader('nonce', '1540356221059')
      .matchHeader('apikey', '<KEY>')
      .matchHeader('signature', '0762599d1c3e25f9dd93f4c63669fc48db66b3816cb7f437edb4ecf2691a48bc')
      .reply(200, mockResponse);

    const data = await blinktrade.balance();
    expect(data).toEqual(balance.Responses[0]);
  });

  test('POST /tapi/v1/message and matching an array response', async () => {
    nock(endpoint).post('/tapi/v1/message').reply(200, mockResponse);
    const data = await blinktrade.sendOrder({});
    expect(data).toEqual(sentOrder.Responses);
  });

  test('POST /tapi/v1/message and replying with 500 stauts reponse and rejecting the promise', async () => {
    nock(endpoint).post('/tapi/v1/message').reply(200, mockResponse);
    try {
      await blinktrade.cancelOrder({});
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });
});
