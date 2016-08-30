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
 *
 * @flow
 */

import { stub } from 'sinon';
import { expect } from 'chai';
import { BlinkTradeWS } from '../src';
import * as listener from '../src/listener';

let BlinkTrade;

const MOCK_FULL_REFRESH = {
  MsgType: 'W',
  MDReqID: 1062858,
  Symbol: 'BTCUSD',
  MDFullGrp: [{}],
};

const MOCK_NEW_ORDER = {
  side: '1',
  price: parseInt(550 * 1e8, 10),
  amount: parseInt(0.05 * 1e8, 10),
  symbol: 'BTCUSD',
};

describe('WebSocket', () => {
  afterEach(() => {
    // Close WebSocket connection on each unit test.
    BlinkTrade.disconnect();
  });

  it('Should connect on websocket and resolve a promise', (done) => {
    BlinkTrade = new BlinkTradeWS({ prod: false });
    BlinkTrade.connect().then(() => done()).catch(err => done({ ...err }));
  });

  it('Should connect on websocket and callback', (done) => {
    BlinkTrade = new BlinkTradeWS({ prod: false });
    BlinkTrade.connect(() => done());
  });

  it('Should connect on a wrong websocket url and reject promise', (done) => {
    BlinkTrade = new BlinkTradeWS({ url: 'wss://api.wrong.url' });
    BlinkTrade.connect().catch(() => done());
  });

  it('Should connect on a wrong websocket url and callback with error', (done) => {
    BlinkTrade = new BlinkTradeWS({ url: 'wss://api.wrong.url' });
    BlinkTrade.connect((err, data) => {
      expect(data).to.be.undefined;
      done();
    });
  });

  it('Should send heartBeat message and mock ws response', (done) => {
    const mock = {
      SendTime: 1455409766521,
      ServerTimestamp: 1455410567,
      TestReqID: 1455409766521,
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.heartbeat();
    }).then((data) => {
      expect(data.SendTime).to.be.equal(mock.SendTime);
      expect(data.TestReqID).to.be.equal(mock.TestReqID);
      expect(data.ServerTimestamp).to.be.equal(mock.ServerTimestamp);
      expect(data).to.have.property('Latency');
      done();
    }).catch(done);
  });

  it('Should authenticate successfully ', (done) => {
    const mock = {
      UserID: 90800003,
      UserStatus: 1,
      BrokerID: 5,
      Username: 'user',
      Broker: {},
      Profile: {},
    };

    const login = { username: 'user', password: 'abc12345' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login.username, login.password);
    }).then(data => {
      expect(data.UserStatus).to.be.equal(1);
      expect(data.Username).to.be.equal(login.username);
      done();
    }).catch(err => done(err));
  });

  it('Should reject authentication', (done) => {
    const mock = {
      UserID: 90800003,
      UserStatus: 3,
      BrokerID: 5,
      Username: 'user',
      Broker: {},
      Profile: {},
    };

    const login = { username: 'user', password: 'wrongpassword' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login.username, login.password);
    }).catch(data => {
      expect(data.UserStatus).to.be.equal(3);
      done();
    });
  });

  it('Should login and logout successfully', (done) => {
    const mock = {
      login: {
        UserID: 90800003,
        UserStatus: 1,
        BrokerID: 5,
        Username: 'user',
      },
      logout: {
        Username: 'rodrigo',
        UserID: 90800003,
        MsgType: 'BF',
        UserReqID: 8767404,
        UserStatus: 2,
      },
    };

    const login = { username: 'user', password: 'abc12345' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(msg.UserReqTyp === '1' ? mock.login : mock.logout);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login.username, login.password);
    }).then(data => {
      expect(data.UserStatus).to.be.equal(1);
      return BlinkTrade.logout();
    }).then(data => {
      expect(data.UserStatus).to.be.equal(2);
      done();
    }).catch(err => done(err));
  });

  it('Should request balance and match available balance', (done) => {
    const mock = {
      5: {
        BTC_locked: 0,
        USD: 178116788294761,
        BTC: 1467995872214,
        USD_locked: 5500000000,
      },
      MsgType: 'U3',
      ClientID: 90800003,
      BalanceReqID: 8525058,
    };

    const Available = { USD: 178111288294761, BTC: 1467995872214 };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.balance();
    }).then(balance => {
      expect(balance).to.be.eql({
        ...mock,
        Available,
      });
      done();
    }).catch(done);
  });

  it('Should subscribe on ticker', (done) => {
    const mock = {
      SellVolume: 487859418,
      LowPx: 189189000000,
      LastPx: 189189000000,
      MsgType: 'f',
      BestAsk: 191000000000,
      HighPx: 190000000000,
      BuyVolume: 925019572651,
      BestBid: 189189000000,
      Symbol: 'BTCBRL',
      SecurityStatusReqID: 4329626,
      Market: 'BLINK',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeTicker(['BLINK:BTCBRL']);
    }).then(data => {
      expect(data).to.be.eql({
        BestAsk: 1910,
        BestBid: 1891.89,
        BuyVolume: 9250.19572651,
        HighPx: 1900,
        LastPx: 1891.89,
        LowPx: 1891.89,
        Market: 'BLINK',
        MsgType: 'f',
        SecurityStatusReqID: 4329626,
        SellVolume: 4.87859418,
        Symbol: 'BTCBRL',
      });
      done();
    }).catch(err => done(err));
  });

  it('Should get full orderbook', (done) => {
    const mock = {
      MDReqID: 1062858,
      Symbol: 'BTCUSD',
      MsgType: 'W',
      MDFullGrp: [{
        MDEntryPositionNo: 1,
        MDEntrySize: 2863231429,
        MDEntryPx: 57800000000,
        MDEntryID: 1459028829948,
        MDEntryTime: '03:51:26',
        MDEntryDate: '2016-08-24',
        UserID: 90800535,
        OrderID: 1459028829948,
        MDEntryType: '0',
        Broker: 'exchange',
      }, {
        MDEntryPositionNo: 2,
        MDEntrySize: 568000000,
        MDEntryPx: 57779000000,
        MDEntryID: 1459028830259,
        MDEntryTime: '05:10:35',
        MDEntryDate: '2016-08-24',
        UserID: 90800535,
        OrderID: 1459028830259,
        MDEntryType: '0',
        Broker: 'exchange',
      }, {
        MDEntryPositionNo: 1,
        MDEntrySize: 10000000,
        MDEntryPx: 57871000000,
        MDEntryID: 1459028830271,
        MDEntryTime: '22:01:19',
        MDEntryDate: '2016-08-26',
        UserID: 90800292,
        OrderID: 1459028830271,
        MDEntryType: '1',
        Broker: 'exchange',
      }, {
        MDEntryPositionNo: 2,
        MDEntrySize: 887239144,
        MDEntryPx: 57872000000,
        MDEntryID: 1459028829944,
        MDEntryTime: '03:50:48',
        MDEntryDate: '2016-08-24',
        UserID: 90800535,
        OrderID: 1459028829944,
        MDEntryType: '1',
        Broker: 'exchange',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeOrderbook(['BTCUSD']);
    }).then(data => {
      expect(data).to.be.eql({
        ...mock,
        MDFullGrp: {
          0: [mock.MDFullGrp[0], mock.MDFullGrp[1]],
          1: [mock.MDFullGrp[2], mock.MDFullGrp[3]],
        },
      });
      done();
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB_NEW_ORDER', (done) => {
    const mock = {
      MDReqID: 1062858,
      MDBkTyp: '3',
      MsgType: 'X',
      MDIncGrp: [{
        MDUpdateAction: '0',
        Symbol: 'BTCUSD',
        MDEntryType: '0',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB_NEW_ORDER', (data) => {
        expect(data.MDReqID).to.be.equal(MOCK_FULL_REFRESH.MDReqID);
        expect(data.MDIncGrp[0].MDUpdateAction).to.be.equal('0');
        expect(data.MDIncGrp[0].Symbol).to.be.equal(MOCK_FULL_REFRESH.Symbol);
        sinon.restore();
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB_UPDATE_ORDER', (done) => {
    const mock = {
      MDReqID: 1062858,
      MDBkTyp: '3',
      MsgType: 'X',
      MDIncGrp: [{
        MDUpdateAction: '1',
        Symbol: 'BTCUSD',
        MDEntryType: '0',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB_UPDATE_ORDER', (data) => {
        expect(data.MDReqID).to.be.equal(MOCK_FULL_REFRESH.MDReqID);
        expect(data.MDIncGrp[0].MDUpdateAction).to.be.equal('1');
        expect(data.MDIncGrp[0].Symbol).to.be.equal(MOCK_FULL_REFRESH.Symbol);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB_DELETE_ORDER', (done) => {
    const mock = {
      MDReqID: 1062858,
      MDBkTyp: '3',
      MsgType: 'X',
      MDIncGrp: [{
        MDUpdateAction: '2',
        Symbol: 'BTCUSD',
        MDEntryType: '0',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB_DELETE_ORDER', (data) => {
        expect(data.MDReqID).to.be.equal(MOCK_FULL_REFRESH.MDReqID);
        expect(data.MDIncGrp[0].MDUpdateAction).to.be.equal('2');
        expect(data.MDIncGrp[0].Symbol).to.be.equal(MOCK_FULL_REFRESH.Symbol);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB_DELETE_ORDERS_THRU', (done) => {
    const mock = {
      MDReqID: 1062858,
      MDBkTyp: '3',
      MsgType: 'X',
      MDIncGrp: [{
        MDUpdateAction: '3',
        Symbol: 'BTCUSD',
        MDEntryType: '0',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB_DELETE_ORDERS_THRU', (data) => {
        expect(data.MDReqID).to.be.equal(MOCK_FULL_REFRESH.MDReqID);
        expect(data.MDIncGrp[0].MDUpdateAction).to.be.equal('3');
        expect(data.MDIncGrp[0].Symbol).to.be.equal(MOCK_FULL_REFRESH.Symbol);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB_TRADE_NEW', (done) => {
    const mock = {
      MDReqID: 1062858,
      MDBkTyp: '3',
      MsgType: 'X',
      MDIncGrp: [{
        Symbol: 'BTCUSD',
        MDEntryType: '2',
      }],
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB_TRADE_NEW', (data) => {
        expect(data.MDIncGrp[0].MDEntryType).to.be.equal('2');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should send order and resolve promise', (done) => {
    const mock = {
      MsgType: '8',
      ExecType: '0',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    const sinon = stub(listener, 'registerListener', (message, callback) => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(order => {
      expect(order.ExecType).to.be.equal('0');
      sinon.restore();
      done();
    }).catch(err => done(err));
  });

  it('Should send order and emit EXECUTION_REPORT_NEW', (done) => {
    const mock = {
      MsgType: '8',
      ExecType: '0',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    const sinon = stub(listener, 'registerListener', (message, callback) => {
      setTimeout(() => {
        // Simulate server latency
        callback(mock);
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(() => {
      BlinkTrade.executionReport().on('EXECUTION_REPORT_NEW', (data) => {
        expect(data.ExecType).to.be.equal('0');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should send order and emit BALANCE updates', (done) => {
    const mock = {
      5: { USD_locked: 8250000000 },
      MsgType: 'U3',
      ClientID: 90800003,
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg, promise) => {
      return promise.resolve(mock);
    });

    stub(listener, 'registerListener', (message, callback) => {
      setTimeout(() => {
        // Simulate server latency
        callback(mock);
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then((data) => {
      BlinkTrade.balance().on('BALANCE', (data) => {
        expect(data).to.be.equal(mock);
        done();
      });
    }).catch(err => done(err));
  });
});
