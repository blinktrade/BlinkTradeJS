/**
 * BlinkTradeJS SDK
 * (c) 2016-present BlinkTrade, Inc.
 *
 * This file is part of BlinkTradeJS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable new-cap */

import { BlinkTradeWS } from '../src';
import { ActionMsgRes } from '../src/constants/messages';

jest.mock('../src/transports/websocket');

let blinktrade;

const incremental = {
  MDReqID: 354590,
  MDBkTyp: '3',
  MsgType: 'X',
  MDIncGrp: [
    {
      OrderID: 1459030505702,
      MDEntryPx: 1637400000000,
      MDUpdateAction: '0',
      MDEntryTime: '22:34:12',
      Symbol: 'BTCBRL',
      UserID: 90800078,
      Broker: 'foxbit',
      MDEntryType: '0',
      MDEntryPositionNo: 2,
      MDEntrySize: 100000000,
      MDEntryID: 1459030505702,
      MDEntryDate: '2018-07-17',
    },
  ],
};

const incrementalTrade = {
  MDReqID: 354590,
  MDBkTyp: '3',
  MsgType: 'X',
  MDIncGrp: [{
    OrderID: 1459030505939,
    MDEntryPx: 27000000000000,
    TradeID: 20617,
    MDEntryBuyerID: 90800078,
    MDUpdateAction: '0',
    MDEntryTime: '00:01:01',
    Symbol: 'BTCBRL',
    SecondaryOrderID: 1459030449305,
    MDEntrySize: 100000,
    MDEntryType: '2',
    MDEntrySellerID: 90800027,
    MDEntryDate: '2018-07-18',
    Side: '1',
    type: 'OB:TRADE_NEW',
  }],
};

const newOrder = {
  side: '1',
  price: parseInt(16374 * 1e8, 10),
  amount: parseInt(0.05 * 1e8, 10),
  symbol: 'BTCBRL',
};

describe('WebSocket', () => {
  test('Should connect on websocket and resolve a promise', (done) => {
    blinktrade = new BlinkTradeWS({ prod: false });
    blinktrade.connect().then(({ connected }) => {
      expect(connected).toBe(true);
      return done();
    });
  });

  test('Should connect on websocket and callback', (done) => {
    blinktrade = new BlinkTradeWS({ prod: false });
    blinktrade.connect((err, { connected }) => {
      expect(connected).toBe(true);
      expect(err).toBe(null);
      done();
    });
  });

  test('Should send heartBeat message and mock ws response', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.heartbeat()).then((res) => {
      const { req } = blinktrade.transport;
      expect(res.Latency).toBe(req.SendTime - res.SendTime);
      done();
    }).catch(done);
  });

  test('Should send heartBeat message with callback', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      blinktrade.heartbeat((err, res) => {
        const { req } = blinktrade.transport;
        expect(res.Latency).toBe(req.SendTime - res.SendTime);
        done();
      });
    }).catch(done);
  });

  test('Should authenticate successfully ', (done) => {
    const data = { username: 'user', password: 'abc12345' };
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.login(data)).then((res) => {
      expect(res.UserStatus).toBe(1);
      expect(res.Username).toBe(data.username);
      done();
    });
  });

  test('Should reject authentication ', (done) => {
    const data = { username: 'user', password: 'wrongpassword' };
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.login(data)).catch((res) => {
      expect(res.UserStatus).toBe(3);
      expect(res.Username).toBe(data.username);
      done();
    });
  });

  test('Should login and logout successfully', (done) => {
    const data = { username: 'user', password: 'abc12345' };
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.login(data)).then((res) => {
      expect(res.Username).toBe(data.username);
      expect(res.UserStatus).toBe(1);
      return blinktrade.logout();
    }).then((res) => {
      expect(res.UserStatus).toBe(2);
      done();
    });
  });

  test('Should request balance and match available balance', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.balance()).then((res) => {
      expect(res).toHaveProperty('4');
      done();
    });
  });

  test('Should subscribe on ticker', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      return blinktrade.subscribeTicker(['BLINK:BTCBRL']);
    }).then((res) => {
      const { req } = blinktrade.transport;
      expect(res).toEqual({
        SellVolume: 6.0693,
        LowPx: 16437,
        LastPx: 16437,
        MsgType: 'f',
        BestAsk: 113700,
        HighPx: 16540,
        BuyVolume: 100333.9509,
        BestBid: 16437,
        Symbol: 'BTCBRL',
        SecurityStatusReqID: req.SecurityStatusReqID,
        Market: 'BLINK',
      });
      done();
    });
  });

  test('Should subscribe on ticker with callback', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      blinktrade.subscribeTicker(['BLINK:BTCBRL'], (err, res) => {
        const { req } = blinktrade.transport;
        expect(res).toEqual({
          SellVolume: 6.0693,
          LowPx: 16437,
          LastPx: 16437,
          MsgType: 'f',
          BestAsk: 113700,
          HighPx: 16540,
          BuyVolume: 100333.9509,
          BestBid: 16437,
          Symbol: 'BTCBRL',
          SecurityStatusReqID: req.SecurityStatusReqID,
          Market: 'BLINK',
        });
        done();
      });
    });
  });

  test('Should get full orderbook with level 0', (done) => {
    blinktrade = new BlinkTradeWS({ level: 0 });
    blinktrade.connect().then(() => blinktrade.subscribeOrderbook(['BTCBRL'])).then((res) => {
      expect(res.MDFullGrp).toHaveLength(4);
      done();
    }).catch(err => done(err));
  });

  test('Should get full orderbook with level 2', (done) => {
    blinktrade = new BlinkTradeWS({ level: 2 });
    blinktrade.connect().then(() => blinktrade.subscribeOrderbook(['BTCBRL'])).then((res) => {
      const { req } = blinktrade.transport;
      expect(res).toEqual({
        MsgType: 'W',
        MDReqID: req.MDReqID,
        MarketDepth: 1000,
        Symbol: 'BTCBRL',
        MDFullGrp: {
          BTCBRL: {
            bids: [[16424, 0.749, 90804823, 1459030499584], [16374, 2, 90804823, 1459030499586]],
            asks: [[28326.42, 0.00068008, 90800025, 1459030505672], [113700, 0.00206, 90800027, 1459030449304]],
          },
        },
      });
      done();
    }).catch(err => done(err));
  });

  test('Should get incremental orderbook updates and emit OB:NEW_ORDER with default level', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      return blinktrade.subscribeOrderbook(['BTCBRL'])
        .on('OB:NEW_ORDER', (res) => {
          expect(res.index).toBe(2);
          expect(res.size).toBe(1);
          expect(res.price).toBe(16374);
          expect(res.side).toBe('buy');
          expect(res.type).toBe('OB:NEW_ORDER');
          done();
        });
    }).then(() => {
      const { req } = blinktrade.transport;
      blinktrade.transport.eventEmitter.emit(`${ActionMsgRes.MD_INCREMENT}:${req.MDReqID}`, incremental);
    });
  });

  test('Should get incremental orderbook updates and emit OB:NEW_ORDER with level 0', (done) => {
    blinktrade = new BlinkTradeWS({ level: 0 });
    blinktrade.connect().then(() => {
      return blinktrade.subscribeOrderbook(['BTCBRL'])
        .on('OB:NEW_ORDER', (res) => {
          expect(res.MDEntryPositionNo).toBe(2);
          expect(res.MDEntrySize).toBe(100000000);
          expect(res.MDEntryPx).toBe(1637400000000);
          expect(res.MDEntryType).toBe('0');
          expect(res.type).toBe('OB:NEW_ORDER');
          done();
        });
    }).then(() => {
      const { req } = blinktrade.transport;
      blinktrade.transport.eventEmitter.emit(`${ActionMsgRes.MD_INCREMENT}:${req.MDReqID}`, incremental);
    });
  });

  it('Should get incremental orderbook updates and emit OB:TRADE_NEW', (done) => {
    blinktrade = new BlinkTradeWS({ level: 0 });
    blinktrade.connect().then(() => {
      return blinktrade.subscribeOrderbook(['BTCBRL'])
        .on('OB:TRADE_NEW', (data) => {
          expect(data).toEqual({
            ...incrementalTrade.MDIncGrp[0],
            type: 'OB:TRADE_NEW',
          });
          done();
        });
    }).then(() => {
      const { req } = blinktrade.transport;
      blinktrade.transport.eventEmitter.emit(`${ActionMsgRes.MD_INCREMENT}:${req.MDReqID}`, incrementalTrade);
    });
  });

  test('Should send order and resolve promise', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => blinktrade.sendOrder(newOrder)).then((res) => {
      const { req } = blinktrade.transport;
      expect(res.ExecType).toBe('0');
      expect(res.Price).toBe(1637400000000);
      expect(res.ClOrdID).toBe(req.ClOrdID);
      done();
    });
  });

  test('Should send order and emit EXECUTION_REPORT:NEW', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.executionReport().on('EXECUTION_REPORT:NEW', (res) => {
      const { req } = blinktrade.transport;
      expect(res.ExecType).toBe('0');
      expect(res.Price).toBe(1637400000000);
      expect(res.ClOrdID).toBe(req.ClOrdID);
      done();
    });
    blinktrade.connect().then(() => blinktrade.sendOrder(newOrder));
  });

  test('Should send order and callback execution report', (done) => {
    blinktrade = new BlinkTradeWS();

    const callback = jest.fn();

    blinktrade.connect().then(() => {
      blinktrade.executionReport(callback);
      return blinktrade.sendOrder(newOrder);
    }).then(() => {
      expect(callback).toHaveBeenCalled();
      done();
    });
  });

  test('Should request a deposit and emit DEPOSIT_REFRESH event', (done) => {
    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      return blinktrade.requestDeposit().on('DEPOSIT_REFRESH', (res) => {
        const { req } = blinktrade.transport;
        expect(res.State).toBe('UNCONFIRMED');
        expect(res.ClOrdID).toBe(req.ClOrdID);
        expect(res.DepositReqID).toBe(req.DepositReqID);
        done();
      });
    }).then((res) => {
      const { req } = blinktrade.transport;
      blinktrade.transport.eventEmitter.emit(`${ActionMsgRes.DEPOSIT_REFRESH}:${req.ClOrdID}`, res);
    });
  });

  test('Should request a withdraw and emit WITHDRAW_REFRESH event', (done) => {
    const data = {
      amount: 200 * 1e8,
      currency: 'BRL',
      method: 'PayPal',
      data: {
        Memo: 'Memo',
        email: 'user@blinktrade.com',
      },
    };

    blinktrade = new BlinkTradeWS();
    blinktrade.connect().then(() => {
      return blinktrade.requestWithdraw(data).on('WITHDRAW_REFRESH', (res) => {
        const { req } = blinktrade.transport;
        expect(res.Status).toBe('1');
        expect(res.ClOrdID).toBe(req.ClOrdID);
        expect(res.WithdrawReqID).toBe(req.WithdrawReqID);
        done();
      });
    }).then((res) => {
      const { req } = blinktrade.transport;
      blinktrade.transport.eventEmitter.emit(`${ActionMsgRes.WITHDRAW_REFRESH}:${req.ClOrdID}`, res);
    });
  });
});
