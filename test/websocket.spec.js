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

/* eslint-disable new-cap */

import nodeify from 'nodeify';
import { spy, stub } from 'sinon';
import { expect } from 'chai';
import { BlinkTradeWS } from '../src';
import * as listener from '../src/listener';

let BlinkTrade;

const MOCK_FULL_REFRESH: Object = {
  MsgType: 'W',
  Symbol: 'BTCUSD',
  MDFullGrp: [{}],
};

const MOCK_INCREMENT = (action, type) => {
  return {
    MDReqID: 1062858,
    MDBkTyp: '3',
    MsgType: 'X',
    MDIncGrp: [{
      MDUpdateAction: action || 0,
      MDEntryType: type || '0',
      MDEntryPositionNo: 1,
      MDEntryTime: '03:50:48',
      MDEntryDate: '2016-08-24',
      MDEntryPx: 58000000000,
      MDEntrySize: 100000000,
      UserID: 90800535,
      OrderID: 1459028829944,
      Symbol: 'BTCUSD',
    }],
  };
};

const MOCK_NEW_ORDER: Object = {
  side: '1',
  price: parseInt(550 * 1e8, 10),
  amount: parseInt(0.05 * 1e8, 10),
  symbol: 'BTCUSD',
};

describe('WebSocket', () => {
  beforeEach(() => {
    const stubConnect = stub(BlinkTradeWS.prototype, 'connect', (callback) => {
      stubConnect.restore();
      return nodeify.extend(Promise.resolve({ connected: true })).nodeify(callback);
    });
  });

  it('Should connect on websocket and resolve a promise', (done) => {
    BlinkTrade = new BlinkTradeWS({ prod: false });
    BlinkTrade.connect().then(() => done()).catch(err => done({ ...err }));
  });

  it('Should connect on websocket and callback', (done) => {
    BlinkTrade = new BlinkTradeWS({ prod: false });
    BlinkTrade.connect((err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('Should send heartBeat message and mock ws response', (done) => {
    const mock: Object = {
      SendTime: 1455409766521,
      ServerTimestamp: 1455410567,
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.TestReqID = msg.TestReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
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

  it('Should send heartBeat message with callback', (done) => {
    const mock: Object = {
      SendTime: 1455409766521,
      ServerTimestamp: 1455410567,
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.TestReqID = msg.TestReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.heartbeat((err, data) => {
        expect(data.SendTime).to.be.equal(mock.SendTime);
        expect(data.TestReqID).to.be.equal(mock.TestReqID);
        expect(data.ServerTimestamp).to.be.equal(mock.ServerTimestamp);
        expect(data).to.have.property('Latency');
        done();
      });
    }).catch(done);
  });

  it('Should authenticate successfully ', (done) => {
    const mock: Object = {
      UserID: 90800003,
      UserStatus: 1,
      BrokerID: 5,
      Username: 'user',
      Broker: {},
      Profile: {},
    };

    const login = { username: 'user', password: 'abc12345' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.UserReqID = msg.UserReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login);
    }).then(data => {
      expect(data.Username).to.be.equal(login.username);
      expect(data.UserStatus).to.be.equal(1);
      done();
    }).catch(err => done(err));
  });

  it('Should reject authentication', (done) => {
    const mock: Object = {
      UserID: 90800003,
      UserStatus: 3,
      BrokerID: 5,
      Username: 'user',
      Broker: {},
      Profile: {},
    };

    const login = { username: 'user', password: 'wrongpassword' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.UserReqID = msg.UserReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login);
    }).catch(data => {
      expect(data.UserStatus).to.be.equal(3);
      done();
    });
  });

  it('Should login and logout successfully', (done) => {
    const mock: Object = {
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
        UserStatus: 2,
      },
    };

    const login = { username: 'user', password: 'abc12345' };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      const response = msg.UserReqTyp === '1' ? mock.login : mock.logout;
      response.UserReqID = msg.UserReqID;
      const request = listener.getRequest(response);
      return request && request.resolve(response);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.login(login);
    }).then(data => {
      expect(data.Username).to.be.equal(login.username);
      expect(data.UserStatus).to.be.equal(1);
      return BlinkTrade.logout();
    }).then(data => {
      expect(data.UserStatus).to.be.equal(2);
      done();
    }).catch(err => done(err));
  });

  it('Should request balance and match available balance', (done) => {
    const mock: Object = {
      // $FlowFixMe
      5: {
        BTC_locked: 0,
        USD: 178116788294761,
        BTC: 1467995872214,
        USD_locked: 5500000000,
      },
      MsgType: 'U3',
      ClientID: 90800003,
    };

    const Available = { USD: 178111288294761, BTC: 1467995872214 };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.BalanceReqID = msg.BalanceReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
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
    const mock: Object = {
      SellVolume: 487859418,
      LowPx: 189189000000,
      LastPx: 189189000000,
      MsgType: 'f',
      BestAsk: 191000000000,
      HighPx: 190000000000,
      BuyVolume: 925019572651,
      BestBid: 189189000000,
      Symbol: 'BTCBRL',
      Market: 'BLINK',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.SecurityStatusReqID = msg.SecurityStatusReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeTicker(['BLINK:BTCBRL']);
    }).then(data => {
      expect(data).to.be.eql({
        ...mock,
        BestAsk: 1910,
        BestBid: 1891.89,
        BuyVolume: 9250.19572651,
        HighPx: 1900,
        LastPx: 1891.89,
        LowPx: 1891.89,
        Market: 'BLINK',
        MsgType: 'f',
        SellVolume: 4.87859418,
        Symbol: 'BTCBRL',
      });
      done();
    }).catch(err => done(err));
  });

  it('Should subscribe on ticker with callback', (done) => {
    const mock: Object = {
      SellVolume: 487859418,
      LowPx: 189189000000,
      LastPx: 189189000000,
      MsgType: 'f',
      BestAsk: 191000000000,
      HighPx: 190000000000,
      BuyVolume: 925019572651,
      BestBid: 189189000000,
      Symbol: 'BTCBRL',
      Market: 'BLINK',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.SecurityStatusReqID = msg.SecurityStatusReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeTicker(['BLINK:BTCBRL'], (err, data) => {
        expect(data).to.be.eql({
          ...mock,
          BestAsk: 1910,
          BestBid: 1891.89,
          BuyVolume: 9250.19572651,
          HighPx: 1900,
          LastPx: 1891.89,
          LowPx: 1891.89,
          Market: 'BLINK',
          MsgType: 'f',
          SellVolume: 4.87859418,
          Symbol: 'BTCBRL',
        });
        done();
      });
    });
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

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.MDReqID = msg.MDReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeOrderbook(['BTCUSD']);
    }).then(data => {
      expect(data).to.be.eql({
        ...mock,
        MDFullGrp: {
          BTCUSD: {
            bids: [[578, 28.63231429, 90800535], [577.79, 5.68, 90800535]],
            asks: [[578.71, 0.1, 90800292], [578.72, 8.87239144, 90800535]],
          },
        },
      });
      done();
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB:NEW_ORDER', (done) => {
    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_FULL_REFRESH.MDReqID = msg.MDReqID;
      const request = listener.getRequest(MOCK_FULL_REFRESH);
      return request && request.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(MOCK_INCREMENT('0'));
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB:NEW_ORDER', (data) => {
        expect(data.index).to.be.equal(1);
        expect(data.size).to.be.equal(1);
        expect(data.price).to.be.equal(580);
        expect(data.side).to.be.equal('buy');
        expect(data.type).to.be.equal('OB:NEW_ORDER');
        sinon.restore();
        done();
      }).catch(err => done(err));
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB:UPDATE_ORDER', (done) => {
    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_FULL_REFRESH.MDReqID = msg.MDReqID;
      const request = listener.getRequest(MOCK_FULL_REFRESH);
      return request && request.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(MOCK_INCREMENT('1'));
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB:UPDATE_ORDER', (data) => {
        expect(data.type).to.be.equal('OB:UPDATE_ORDER');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB:DELETE_ORDER', (done) => {
    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_FULL_REFRESH.MDReqID = msg.MDReqID;
      const request = listener.getRequest(MOCK_FULL_REFRESH);
      return request && request.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(MOCK_INCREMENT('2'));
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB:DELETE_ORDER', (data) => {
        expect(data.type).to.be.equal('OB:DELETE_ORDER');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB:DELETE_ORDERS_THRU', (done) => {
    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_FULL_REFRESH.MDReqID = msg.MDReqID;
      const request = listener.getRequest(MOCK_FULL_REFRESH);
      return request && request.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(MOCK_INCREMENT('3'));
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB:DELETE_ORDERS_THRU', (data) => {
        expect(data.type).to.be.equal('OB:DELETE_ORDERS_THRU');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should get incremental orderbook updates and emit OB:TRADE_NEW', (done) => {
    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_FULL_REFRESH.MDReqID = msg.MDReqID;
      const request = listener.getRequest(MOCK_FULL_REFRESH);
      return request && request.resolve(MOCK_FULL_REFRESH);
    });

    // Mock eventEmitter callback
    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      callback(MOCK_INCREMENT('0', '2'));
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.subscribeOrderbook(['BTCUSD'])
      .on('OB:TRADE_NEW', (data) => {
        expect(data.type).to.be.equal('OB:TRADE_NEW');
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

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_NEW_ORDER.ClOrdID = msg.ClOrdID;
      const request = listener.getRequest(MOCK_NEW_ORDER);
      return request && request.resolve(mock);
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

  it('Should send order and emit EXECUTION_REPORT:NEW', (done) => {
    const mock = {
      MsgType: '8',
      ExecType: '0',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_NEW_ORDER.ClOrdID = msg.ClOrdID;
      const request = listener.getRequest(MOCK_NEW_ORDER);
      return request && request.resolve(mock);
    });

    const sinon = stub(listener, 'registerListener', (message, callback) => {
      // Simulate server latency
      setTimeout(() => {
        callback(mock);
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(() => {
      BlinkTrade.executionReport().on('EXECUTION_REPORT:NEW', (data) => {
        expect(data.ExecType).to.be.equal('0');
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should send order and callback execution report ', (done) => {
    const mock = {
      MsgType: '8',
      ExecType: '0',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      MOCK_NEW_ORDER.ClOrdID = msg.ClOrdID;
      const request = listener.getRequest(MOCK_NEW_ORDER);
      return request && request.resolve(mock);
    });

    const callback = spy();

    const sinon = stub(listener, 'registerListener', () => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.executionReport(callback);
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(() => {
      expect(callback.called).to.be.true;
      sinon.restore();
      done();
    }).catch(err => done(err));
  });

  it('Should send order and emit BALANCE updates', (done) => {
    let mock: Object;
    const balance = {
      // $FlowFixMe
      5: { USD_locked: 8250000000 },
      MsgType: 'U3',
      ClientID: 90800003,
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      if (msg.ClOrdID) {
        mock = { ClOrdID: msg.ClOrdID };
      } else {
        mock = {
          ...balance,
          BalanceReqID: msg.BalanceReqID,
        };
      }

      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    const sinon = stub(listener, 'registerListener', (message, callback) => {
      // Simulate server latency
      setTimeout(() => {
        callback(mock);
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(() => {
      BlinkTrade.balance().on('BALANCE', (data) => {
        expect(data.BalanceReqID).to.be.equal(mock.BalanceReqID);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should send order and callback balance updates', (done) => {
    let mock: Object;
    const balance = {
      // $FlowFixMe
      5: { USD_locked: 8250000000 },
      MsgType: 'U3',
      ClientID: 90800003,
    };

    BlinkTrade = new BlinkTradeWS();

    const callback = spy();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      if (msg.ClOrdID) {
        mock = { ClOrdID: msg.ClOrdID };
      } else {
        mock = {
          ...balance,
          BalanceReqID: msg.BalanceReqID,
        };
      }

      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    const sinon = stub(listener, 'registerListener', () => {
      callback(mock);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.balance(callback);
      return BlinkTrade.sendOrder(MOCK_NEW_ORDER);
    }).then(() => {
      expect(callback.called).to.be.true;
      sinon.restore();
      done();
    }).catch(err => done(err));
  });

  it('Should request a deposit and emit DEPOSIT_REFRESH event', (done) => {
    const mock = {
      DepositMethodName: 'deposit_btc',
      State: 'UNCONFIRMED',
      DepositID: '2a6b5e322fd24574a4d9f988681a542f',
      Data: {
        InputAddress: 'mjjVMr8WcYQwVGzYc8HpaRyAZc89ngTdKV',
        Destination: 'n19ZAH1WGoUkQhubQw71fH11BenifxpBxf',
      },
      ClOrdID: '7302188',
      Status: '0',
      Value: 0,
      BrokerID: 5,
      PaidValue: 0,
      Currency: 'BTC',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.ClOrdID = msg.ClOrdID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      // Simulate server latency
      setTimeout(() => {
        callback({
          State: 'PROGRESS',
          DepositID: '2a6b5e322fd24574a4d9f988681a542f',
        });
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.requestDeposit().on('DEPOSIT_REFRESH', (data) => {
        expect(data.State).to.be.equal('PROGRESS');
        expect(data.DepositID).to.be.equal(data.DepositID);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should request a withdraw and emit WITHDRAW_REFRESH event', (done) => {
    const withdraw = {
      amount: 200 * 1e8,
      currency: 'USD',
      method: 'PayPal',
      data: {
        Email: 'user@blinktrade.com',
      },
    };

    const mock = {
      Status: '1',
      ClOrdID: '3332623',
      WithdrawID: 523,
      WithdrawReqID: 3332623,
      Data: {
        Email: 'user@blinktrade.com',
      },
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.ClOrdID = msg.ClOrdID;
      mock.WithdrawReqID = msg.WithdrawReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    const sinon = stub(listener, 'registerEventEmitter', (message, callback) => {
      // Simulate server latency
      setTimeout(() => {
        // Withdraw cancelled
        callback({
          ...mock,
          Status: '8',
        });
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      return BlinkTrade.requestWithdraw(withdraw)
      .on('WITHDRAW_REFRESH', (data) => {
        expect(data.Status).to.be.equal('8');
        expect(data.DepositID).to.be.equal(data.DepositID);
        expect(data.Data).to.be.eql(withdraw.data);
        sinon.restore();
        done();
      });
    }).catch(err => done(err));
  });

  it('Should request a withdraw and emit WITHDRAW_REFRESH together with onWithdrawRefresh', (done) => {
    const withdraw = {
      amount: 200 * 1e8,
      currency: 'USD',
      method: 'PayPal',
      data: {
        Email: 'user@blinktrade.com',
      },
    };

    const mock = {
      Status: '1',
      ClOrdID: '3332623',
      WithdrawID: 523,
      WithdrawReqID: 3332623,
      Data: {
        Email: 'user@blinktrade.com',
      },
    };

    const mockResponse = {
      ...mock,
      Status: '8',
    };

    BlinkTrade = new BlinkTradeWS();

    stub(BlinkTrade, 'sendMessage', (msg) => {
      mock.ClOrdID = msg.ClOrdID;
      mock.WithdrawReqID = msg.WithdrawReqID;
      const request = listener.getRequest(mock);
      return request && request.resolve(mock);
    });

    const onWithdrawRefresh = spy();

    const sinonListener = stub(listener, 'registerListener', (message, callback) => {
      setTimeout(() => {
        callback(mockResponse);
      }, 500);
    });

    const sinonEventEmitter = stub(listener, 'registerEventEmitter', (message, callback) => {
      // Simulate server latency
      setTimeout(() => {
        // Withdraw cancelled
        callback(mockResponse);
      }, 500);
    });

    BlinkTrade.connect().then(() => {
      BlinkTrade.onWithdrawRefresh(onWithdrawRefresh);
      return BlinkTrade.requestWithdraw(withdraw)
      .on('WITHDRAW_REFRESH', (data) => {
        expect(data.Status).to.be.equal('8');
        expect(data.DepositID).to.be.equal(data.DepositID);
        expect(data.Data).to.be.eql(withdraw.data);
        expect(onWithdrawRefresh.called).to.be.true;
        sinonListener.restore();
        sinonEventEmitter.restore();
        done();
      });
    }).catch(err => done(err));
  });
});
