module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BlinkTradeRest = exports.BlinkTradeWS = exports.Brokers = undefined;
	
	var _brokers = __webpack_require__(1);
	
	var _brokers2 = _interopRequireDefault(_brokers);
	
	var _ws = __webpack_require__(2);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _rest = __webpack_require__(25);
	
	var _rest2 = _interopRequireDefault(_rest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Brokers = _brokers2.default;
	exports.BlinkTradeWS = _ws2.default;
	exports.BlinkTradeRest = _rest2.default; /**
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
	                                          * 
	                                          */

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  SURBITCOIN: 1,
	  VBTC: 3,
	  FOXBIT: 4,
	  TESTNET: 5,
	  URDUBIT: 8,
	  CHILEBIT: 9
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _nodeify = __webpack_require__(3);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _eventemitter = __webpack_require__(4);
	
	var _listener = __webpack_require__(5);
	
	var _events = __webpack_require__(10);
	
	var _messages = __webpack_require__(6);
	
	var _utils = __webpack_require__(11);
	
	var _trade = __webpack_require__(12);
	
	var _trade2 = _interopRequireDefault(_trade);
	
	var _websocket = __webpack_require__(13);
	
	var _websocket2 = _interopRequireDefault(_websocket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var BlinkTradeWS = function (_TradeBase) {
	  _inherits(BlinkTradeWS, _TradeBase);
	
	  /**
	   * Session to store login information
	   */
	  function BlinkTradeWS(params) {
	    _classCallCheck(this, BlinkTradeWS);
	
	    var _this = _possibleConstructorReturn(this, (BlinkTradeWS.__proto__ || Object.getPrototypeOf(BlinkTradeWS)).call(this, params));
	
	    _this.transport = params.transport || new _websocket2.default(params);
	    _this.session = {};
	    return _this;
	  }
	
	  _createClass(BlinkTradeWS, [{
	    key: 'connect',
	    value: function connect(callback) {
	      return this.transport.connect(callback);
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect() {
	      return this.transport.disconnect();
	    }
	  }, {
	    key: 'send',
	    value: function send(msg) {
	      return this.transport.sendMessageAsPromise(msg);
	    }
	  }, {
	    key: 'heartbeat',
	    value: function heartbeat(callback) {
	      var _this2 = this;
	
	      var d = new Date();
	      var msg = {
	        MsgType: _messages.ActionMsgReq.HEARTBEAT,
	        TestReqID: d.getTime(),
	        SendTime: d.getTime()
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this2.send(msg).then(function (data) {
	          return resolve(_extends({}, data, {
	            Latency: new Date(Date.now()) - data.SendTime
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'login',
	    value: function login(_ref, callback) {
	      var _this3 = this;
	
	      var username = _ref.username,
	          password = _ref.password,
	          secondFactor = _ref.secondFactor,
	          brokerId = _ref.brokerId;
	
	      var userAgent = void 0;
	      if (!this.isNode) {
	        userAgent = {
	          UserAgent: window.navigator.userAgent,
	          UserAgentLanguage: window.navigator.language,
	          UserAgentPlatform: window.navigator.platform,
	          UserAgentTimezoneOffset: new Date().getTimezoneOffset()
	        };
	      } else {
	        var os = __webpack_require__(24);
	        userAgent = {
	          UserAgent: os.type() + ' ' + os.release(),
	          UserAgentLanguage: 'en_US',
	          UserAgentPlatform: os.platform() + ' (' + os.arch() + ')',
	          UserAgentTimezoneOffset: new Date().getTimezoneOffset()
	        };
	      }
	
	      var msg = _extends({
	        MsgType: _messages.ActionMsgReq.LOGIN,
	        UserReqID: (0, _listener.generateRequestId)(),
	        BrokerID: brokerId || this.brokerId,
	        Username: username,
	        Password: password,
	        UserReqTyp: '1'
	      }, userAgent);
	
	      if (secondFactor) {
	        msg.SecondFactor = secondFactor;
	      }
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this3.send(msg).then(function (data) {
	          if (data.UserStatus === 1) {
	            _this3.session = data;
	            return resolve(data);
	          }
	
	          return reject(data);
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'logout',
	    value: function logout(callback) {
	      var msg = {
	        MsgType: _messages.ActionMsgReq.LOGOUT,
	        BrokerID: this.brokerId,
	        UserReqID: (0, _listener.generateRequestId)(),
	        Username: this.session.Username,
	        UserReqTyp: '2'
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'profile',
	    value: function profile(callback) {
	      var _session$Profile = this.session.Profile,
	          VerificationData = _session$Profile.VerificationData,
	          profile = _objectWithoutProperties(_session$Profile, ['VerificationData']);
	
	      return _nodeify2.default.extend(Promise.resolve(profile)).nodeify(callback);
	    }
	  }, {
	    key: 'balance',
	    value: function balance(callback) {
	      var _this4 = this;
	
	      return this.transport.emitterPromise(new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'balance', _this4).call(_this4, callback).then(function (data) {
	          (0, _listener.registerListener)(_messages.ActionMsgReq.BALANCE, function (balance) {
	            callback && callback(null, balance);
	            return _this4.transport.eventEmitter.emit(_events.BALANCE, balance);
	          });
	          return resolve(data);
	        }).catch(reject);
	      }));
	    }
	  }, {
	    key: 'subscribeTicker',
	    value: function subscribeTicker(symbols, callback) {
	      var _this5 = this;
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.SECURITY_STATUS_SUBSCRIBE,
	        SecurityStatusReqID: (0, _listener.generateRequestId)(),
	        SubscriptionRequestType: '1',
	        Instruments: symbols
	      };
	
	      var formatTicker = function formatTicker(data) {
	        return _extends({}, data, {
	          SellVolume: data.SellVolume / 1e8,
	          LowPx: data.LowPx / 1e8,
	          LastPx: data.LastPx / 1e8,
	          BestAsk: data.BestAsk / 1e8,
	          HighPx: data.HighPx / 1e8,
	          BuyVolume: data.BuyVolume / 1e8,
	          BestBid: data.BestBid / 1e8
	        });
	      };
	
	      return this.transport.emitterPromise(new Promise(function (resolve, reject) {
	        return _this5.send(msg).then(function (data) {
	          resolve(formatTicker(data));
	          (0, _listener.registerEventEmitter)('SecurityStatusReqID', data.SecurityStatusReqID, function (ticker) {
	            callback && callback(null, formatTicker(ticker));
	            return _this5.transport.eventEmitter.emit(ticker.Market + ':' + ticker.Symbol, formatTicker(ticker));
	          });
	        }).catch(reject);
	      }), callback);
	    }
	  }, {
	    key: 'unSubscribeTicker',
	    value: function unSubscribeTicker(SecurityStatusReqID) {
	      var msg = {
	        MsgType: _messages.ActionMsgReq.SECURITY_STATUS_SUBSCRIBE,
	        SecurityStatusReqID: SecurityStatusReqID,
	        SubscriptionRequestType: '2'
	      };
	
	      this.transport.sendMessage(msg);
	      return SecurityStatusReqID;
	    }
	  }, {
	    key: 'subscribeOrderbook',
	    value: function subscribeOrderbook(symbols, callback) {
	      var _this6 = this;
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.MD_FULL_REFRESH,
	        MDReqID: (0, _listener.generateRequestId)(),
	        SubscriptionRequestType: '1',
	        MarketDepth: 0,
	        MDUpdateType: '1', // Incremental refresh
	        MDEntryTypes: ['0', '1', '2'],
	        Instruments: symbols
	      };
	
	      var subscribeEvent = function subscribeEvent(data) {
	        if (data.MDBkTyp === '3') {
	          data.MDIncGrp.map(function (order) {
	            var dataOrder = {
	              index: order.MDEntryPositionNo,
	              price: order.MDEntryPx / 1e8,
	              size: order.MDEntrySize / 1e8,
	              side: order.MDEntryType === '0' ? 'buy' : 'sell',
	              userId: order.UserID,
	              orderId: order.OrderID,
	              symbol: order.Symbol,
	              time: new Date(order.MDEntryDate + ' ' + order.MDEntryTime).toString()
	            };
	
	            switch (order.MDEntryType) {
	              case '0':
	              case '1':
	                var orderbookEvent = 'OB:' + _events.EVENTS.ORDERBOOK[order.MDUpdateAction];
	                var bidOfferData = _extends({}, dataOrder, { type: orderbookEvent });
	
	                callback && callback(null, bidOfferData);
	                return _this6.transport.eventEmitter.emit(orderbookEvent, bidOfferData);
	              case '2':
	                var tradeEvent = 'OB:' + _events.EVENTS.TRADES[order.MDUpdateAction];
	                var tradeData = _extends({}, dataOrder, { type: tradeEvent });
	
	                callback && callback(null, tradeData);
	                return _this6.transport.eventEmitter.emit(tradeEvent, tradeData);
	              case '4':
	                break;
	              default:
	                return null;
	            }
	            return null;
	          });
	        }
	      };
	
	      return this.transport.emitterPromise(new Promise(function (resolve, reject) {
	        return _this6.send(msg).then(function (data) {
	          (0, _listener.registerEventEmitter)('MDReqID', data.MDReqID, subscribeEvent);
	          return resolve((0, _utils.formatOrderBook)(data, _this6.level));
	        }).catch(function (err) {
	          return reject(err);
	        });
	      }), callback);
	    }
	  }, {
	    key: 'unSubscribeOrderbook',
	    value: function unSubscribeOrderbook(MDReqID) {
	      var msg = {
	        MsgType: _messages.ActionMsgReq.MD_FULL_REFRESH,
	        MDReqID: MDReqID,
	        MarketDepth: 0,
	        SubscriptionRequestType: '2'
	      };
	
	      this.transport.sendMessage(msg);
	      return MDReqID;
	    }
	  }, {
	    key: 'executionReport',
	    value: function executionReport(callback) {
	      var _this7 = this;
	
	      (0, _listener.registerListener)('8', function (data) {
	        callback && callback(data);
	        var event = _events.EVENTS.EXECUTION_REPORT[data.ExecType];
	        return _this7.transport.eventEmitter.emit(_events.EXECUTION_REPORT + ':' + event, data);
	      });
	
	      return this.transport.eventEmitter;
	    }
	  }, {
	    key: 'tradeHistory',
	    value: function tradeHistory() {
	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          since = _ref2.since,
	          filter = _ref2.filter,
	          _ref2$page = _ref2.page,
	          Page = _ref2$page === undefined ? 0 : _ref2$page,
	          _ref2$pageSize = _ref2.pageSize,
	          PageSize = _ref2$pageSize === undefined ? 80 : _ref2$pageSize;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.TRADE_HISTORY,
	        TradeHistoryReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize
	      };
	
	      if (filter && filter.length > 0) {
	        msg.Filter = filter;
	      }
	
	      if (since && typeof since === 'number') {
	        msg.Since = since;
	      }
	
	      var format = (0, _utils.formatTradeHistory)(this.level);
	
	      return _nodeify2.default.extend(this.send(msg).then(format)).nodeify(callback);
	    }
	  }, {
	    key: 'requestDeposit',
	    value: function requestDeposit() {
	      var _this8 = this;
	
	      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref3$currency = _ref3.currency,
	          currency = _ref3$currency === undefined ? 'BTC' : _ref3$currency,
	          value = _ref3.value,
	          depositMethodId = _ref3.depositMethodId;
	
	      var callback = arguments[1];
	
	      var subscribeEvent = function subscribeEvent(deposit) {
	        callback && callback(null, deposit);
	        return _this8.transport.eventEmitter.emit(_events.DEPOSIT_REFRESH, deposit);
	      };
	
	      return this.transport.emitterPromise(new Promise(function (resolve, reject) {
	        return _this8.requestDeposit({ currency: currency, value: value, depositMethodId: depositMethodId }).then(function (deposit) {
	          (0, _listener.registerEventEmitter)('ClOrdID', deposit.ClOrdID, subscribeEvent);
	          return resolve(deposit);
	        }).catch(reject);
	      }), callback);
	    }
	  }, {
	    key: 'onDepositRefresh',
	    value: function onDepositRefresh(callback) {
	      return new Promise(function (resolve) {
	        (0, _listener.registerListener)('U23', function (deposit) {
	          callback && callback(deposit);
	          return resolve(deposit);
	        });
	      });
	    }
	  }, {
	    key: 'requestWithdraw',
	    value: function requestWithdraw(_ref4, callback) {
	      var _this9 = this;
	
	      var amount = _ref4.amount,
	          data = _ref4.data,
	          _ref4$currency = _ref4.currency,
	          currency = _ref4$currency === undefined ? 'BTC' : _ref4$currency,
	          _ref4$method = _ref4.method,
	          method = _ref4$method === undefined ? 'bitcoin' : _ref4$method;
	
	      var subscribeEvent = function subscribeEvent(withdraw) {
	        callback && callback(null, withdraw);
	        return _this9.transport.eventEmitter.emit(_events.WITHDRAW_REFRESH, withdraw);
	      };
	
	      return this.transport.emitterPromise(new Promise(function (resolve, reject) {
	        return _this9.requestWithdraw({ amount: amount, data: data, currency: currency, method: method }).then(function (withdraw) {
	          (0, _listener.registerEventEmitter)('ClOrdID', withdraw.ClOrdID, subscribeEvent);
	          return resolve(withdraw);
	        }).catch(reject);
	      }), callback);
	    }
	  }, {
	    key: 'onWithdrawRefresh',
	    value: function onWithdrawRefresh(callback) {
	      return new Promise(function (resolve) {
	        (0, _listener.registerListener)('U9', function (withdraw) {
	          callback && callback(withdraw);
	          return resolve(withdraw);
	        });
	      });
	    }
	  }]);
	
	  return BlinkTradeWS;
	}(_trade2.default);
	
	exports.default = BlinkTradeWS;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("nodeify");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("eventemitter2");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getListeners = getListeners;
	exports.generateRequestId = generateRequestId;
	exports.getListener = getListener;
	exports.getRequest = getRequest;
	exports.setRequest = setRequest;
	exports.deleteRequest = deleteRequest;
	exports.getEventEmitter = getEventEmitter;
	exports.registerEventEmitter = registerEventEmitter;
	exports.registerListener = registerListener;
	
	var _messages = __webpack_require__(6);
	
	var store = new Map(); /**
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
	                        * 
	                        */
	
	var emitters = new Map();
	var listeners = new Map();
	
	function getListeners() {
	  return listeners;
	}
	
	function generateRequestId() {
	  return parseInt(String(1e7 * Math.random()), 10);
	}
	
	function getListener(msgType) {
	  return listeners[msgType];
	}
	
	function getKey(messages, msg) {
	  var key = messages[msg.MsgType][1];
	  var value = msg[key];
	  return key + ':' + value;
	}
	
	function getRequest(msg) {
	  return store.get(getKey(_messages.MsgActionRes, msg));
	}
	
	function setRequest(msg, promise) {
	  store.set(getKey(_messages.MsgActionReq, msg), promise);
	}
	
	function deleteRequest(msg) {
	  store.delete(getKey(_messages.MsgActionRes, msg));
	}
	
	function getEventEmitter(msg) {
	  return emitters.get(getKey(_messages.MsgActionRes, msg));
	}
	
	function registerEventEmitter(key, value, callback) {
	  emitters.set(key + ':' + value, callback);
	}
	
	function registerListener(msgType, callback) {
	  listeners.set(msgType, callback);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ActionMsgRes = exports.ActionMsgReq = exports.MsgActionRes = exports.MsgActionReq = undefined;
	
	var _ramda = __webpack_require__(7);
	
	var _requestTypes = __webpack_require__(8);
	
	var reqs = _interopRequireWildcard(_requestTypes);
	
	var _actionTypes = __webpack_require__(9);
	
	var actions = _interopRequireWildcard(_actionTypes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var msgToAction = (0, _ramda.compose)(_ramda.invertObj, (0, _ramda.map)(_ramda.head));
	
	var MsgActionReq = exports.MsgActionReq = {
	  1: [actions.HEARTBEAT, reqs.TestReqID],
	  BE: [actions.LOGIN, reqs.UserReqID],
	  V: [actions.MD_FULL_REFRESH, reqs.MDReqID],
	  x: [actions.SECURITY_LIST, reqs.SecurityReqID],
	  e: [actions.SECURITY_STATUS_SUBSCRIBE, reqs.SecurityStatusReqID],
	  D: [actions.ORDER_SEND, reqs.ClOrdID],
	  F: [actions.ORDER_CANCEL, reqs.ClOrdID],
	  U0: [actions.SIGNUP, reqs.UserReqID],
	  U2: [actions.BALANCE, reqs.BalanceReqID],
	  U6: [actions.WITHDRAW_REQUEST, reqs.WithdrawReqID],
	  U4: [actions.ORDER_HISTORY, reqs.OrdersReqID],
	  U18: [actions.DEPOSIT_REQUEST, reqs.DepositReqID],
	  U20: [actions.DEPOSIT_METHODS, reqs.DepositMethodReqID],
	  U24: [actions.WITHDRAW_CONFIRM, reqs.WithdrawReqID],
	  U26: [actions.WITHDRAW_LIST, reqs.WithdrawListReqID],
	  U28: [actions.BROKER_LIST, reqs.BrokerListReqID],
	  U30: [actions.DEPOSIT_LIST, reqs.DepositListReqID],
	  U32: [actions.TRADE_HISTORY, reqs.TradeHistoryReqID],
	  U34: [actions.LEDGER_LIST, reqs.LedgerListReqID],
	  U38: [actions.PROFILE_UPDATE, reqs.UpdateReqID],
	  U50: [actions.API_KEY_LIST, reqs.APIKeyListReqID],
	  U52: [actions.API_KEY_CREATE, reqs.APIKeyCreateReqID],
	  U54: [actions.API_KEY_REVOKE, reqs.APIKeyRevokeReqID],
	  U70: [actions.WITHDRAW_CANCEL, reqs.WithdrawCancelReqID],
	  U78: [actions.WITHDRAW_COMMENT, reqs.WithdrawReqID],
	  B0: [actions.DEPOSIT_PROCESS, reqs.ProcessDepositReqID],
	  B2: [actions.CUSTOMER_LIST, reqs.CustomerListReqID],
	  B4: [actions.KYC_REQUEST, reqs.CustomerReqID],
	  B6: [actions.WITHDRAW_PROCESS, reqs.ProcessWithdrawReqID],
	  B8: [actions.KYC_VERIFY, reqs.VerifyCustomerReqID]
	};
	
	var MsgActionRes = exports.MsgActionRes = {
	  0: [actions.HEARTBEAT, reqs.TestReqID],
	  BF: [actions.LOGIN, reqs.UserReqID],
	  W: [actions.MD_FULL_REFRESH, reqs.MDReqID],
	  X: [actions.MD_INCREMENT, reqs.MDReqID],
	  8: [actions.EXECUTION_REPORT, reqs.ClOrdID],
	  y: [actions.SECURITY_LIST, reqs.SecurityReqID],
	  f: [actions.SECURITY_STATUS_SUBSCRIBE, reqs.SecurityStatusReqID],
	  U3: [actions.BALANCE, reqs.BalanceReqID],
	  U7: [actions.WITHDRAW_REQUEST, reqs.WithdrawReqID],
	  U5: [actions.ORDER_HISTORY, reqs.OrdersReqID],
	  U9: [actions.WITHDRAW_REFRESH, reqs.WithdrawReqID],
	  U19: [actions.DEPOSIT_REQUEST, reqs.DepositReqID],
	  U21: [actions.DEPOSIT_METHODS, reqs.DepositMethodReqID],
	  U23: [actions.DEPOSIT_REFRESH, reqs.DepositReqID],
	  U25: [actions.WITHDRAW_CONFIRM, reqs.WithdrawReqID],
	  U27: [actions.WITHDRAW_LIST, reqs.WithdrawListReqID],
	  U29: [actions.BROKER_LIST, reqs.BrokerListReqID],
	  U31: [actions.DEPOSIT_LIST, reqs.DepositListReqID],
	  U33: [actions.TRADE_HISTORY, reqs.TradeHistoryReqID],
	  U35: [actions.LEDGER_LIST, reqs.LedgerListReqID],
	  U39: [actions.PROFILE_UPDATE, reqs.UpdateReqID],
	  U51: [actions.API_KEY_LIST, reqs.APIKeyListReqID],
	  U53: [actions.API_KEY_CREATE, reqs.APIKeyCreateReqID],
	  U55: [actions.API_KEY_REVOKE, reqs.APIKeyRevokeReqID],
	  U71: [actions.WITHDRAW_CANCEL, reqs.WithdrawCancelReqID],
	  U79: [actions.WITHDRAW_COMMENT, reqs.WithdrawCancelReqID],
	  B1: [actions.DEPOSIT_PROCESS, reqs.ProcessDepositReqID],
	  B3: [actions.CUSTOMER_LIST, reqs.CustomerListReqID],
	  B5: [actions.KYC_REQUEST, reqs.CustomerReqID],
	  B9: [actions.KYC_VERIFY, reqs.VerifyCustomerReqID],
	  B7: [actions.WITHDRAW_PROCESS, reqs.ProcessWithdrawReqID],
	  B11: [actions.CUSTOMER_REFRESH]
	};
	
	var ActionMsgReq = exports.ActionMsgReq = msgToAction(MsgActionReq);
	var ActionMsgRes = exports.ActionMsgRes = msgToAction(MsgActionRes);

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ReqID = exports.ReqID = 'ReqID';
	var TestReqID = exports.TestReqID = 'TestReqID';
	var UserReqID = exports.UserReqID = 'UserReqID';
	var SecurityReqID = exports.SecurityReqID = 'SecurityReqID';
	var ResetPasswordReqID = exports.ResetPasswordReqID = 'ResetPasswordReqID';
	var DepositReqID = exports.DepositReqID = 'DepositReqID';
	var WithdrawReqID = exports.WithdrawReqID = 'WithdrawReqID';
	var BalanceReqID = exports.BalanceReqID = 'BalanceReqID';
	var OrdersReqID = exports.OrdersReqID = 'OrdersReqID';
	var EnableTwoFactorReqID = exports.EnableTwoFactorReqID = 'EnableTwoFactorReqID';
	var DepositMethodReqID = exports.DepositMethodReqID = 'DepositMethodReqID';
	var WithdrawListReqID = exports.WithdrawListReqID = 'WithdrawListReqID';
	var WithdrawCancelReqID = exports.WithdrawCancelReqID = 'WithdrawCancelReqID';
	var BrokerListReqID = exports.BrokerListReqID = 'BrokerListReqID';
	var DepositListReqID = exports.DepositListReqID = 'DepositListReqID';
	var TradeHistoryReqID = exports.TradeHistoryReqID = 'TradeHistoryReqID';
	var LedgerListReqID = exports.LedgerListReqID = 'LedgerListReqID';
	var TradersRankReqID = exports.TradersRankReqID = 'TradersRankReqID';
	var UpdateReqID = exports.UpdateReqID = 'UpdateReqID';
	var PositionReqID = exports.PositionReqID = 'PositionReqID';
	var SecurityStatusReqID = exports.SecurityStatusReqID = 'SecurityStatusReqID';
	var APIKeyListReqID = exports.APIKeyListReqID = 'APIKeyListReqID';
	var APIKeyCreateReqID = exports.APIKeyCreateReqID = 'APIKeyCreateReqID';
	var APIKeyRevokeReqID = exports.APIKeyRevokeReqID = 'APIKeyRevokeReqID';
	var ProcessDepositReqID = exports.ProcessDepositReqID = 'ProcessDepositReqID';
	var CustomerListReqID = exports.CustomerListReqID = 'CustomerListReqID';
	var CustomerReqID = exports.CustomerReqID = 'CustomerReqID';
	var ProcessWithdrawReqID = exports.ProcessWithdrawReqID = 'ProcessWithdrawReqID';
	var VerifyCustomerReqID = exports.VerifyCustomerReqID = 'VerifyCustomerReqID';
	var MDReqID = exports.MDReqID = 'MDReqID';
	var ClOrdID = exports.ClOrdID = 'ClOrdID';

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var HEARTBEAT = exports.HEARTBEAT = 'HEARTBEAT';
	
	var BROKER_LIST = exports.BROKER_LIST = 'BROKER_LIST';
	
	var SECURITY_LIST = exports.SECURITY_LIST = 'SECURITY_LIST';
	var SECURITY_STATUS_UPDATE = exports.SECURITY_STATUS_UPDATE = 'SECURITY_STATUS_UPDATE';
	var SECURITY_STATUS_SUBSCRIBE = exports.SECURITY_STATUS_SUBSCRIBE = 'SECURITY_STATUS_SUBSCRIBE';
	var SECURITY_STATUS_UNSUBSCRIBE = exports.SECURITY_STATUS_UNSUBSCRIBE = 'SECURITY_STATUS_UNSUBSCRIBE';
	
	var MD_TRADES = exports.MD_TRADES = 'MD_TRADES';
	var MD_TRADES_UNSUBSCRIBE = exports.MD_TRADES_UNSUBSCRIBE = 'MD_TRADES_UNSUBSCRIBE';
	var MD_INCREMENT = exports.MD_INCREMENT = 'MD_INCREMENT';
	var MD_FULL_REFRESH = exports.MD_FULL_REFRESH = 'MD_FULL_REFRESH';
	var MD_UNSUBSCRIBE = exports.MD_UNSUBSCRIBE = 'MD_UNSUBSCRIBE';
	var MD_OPENING = exports.MD_OPENING = 'MD_OPENING';
	
	var OB_NEW_ORDER = exports.OB_NEW_ORDER = 'OB_NEW_ORDER';
	var OB_UPDATE_ORDER = exports.OB_UPDATE_ORDER = 'OB_UPDATE_ORDER';
	var OB_DELETE_ORDER = exports.OB_DELETE_ORDER = 'OB_DELETE_ORDER';
	var OB_DELETE_ORDERS_THRU = exports.OB_DELETE_ORDERS_THRU = 'OB_DELETE_ORDERS_THRU';
	
	var EXECUTION_REPORT = exports.EXECUTION_REPORT = 'EXECUTION_REPORT';
	var EXECUTION_REPORT_NEW = exports.EXECUTION_REPORT_NEW = 'EXECUTION_REPORT_NEW';
	var EXECUTION_REPORT_PARTIAL = exports.EXECUTION_REPORT_PARTIAL = 'EXECUTION_REPORT_PARTIAL';
	var EXECUTION_REPORT_EXECUTION = exports.EXECUTION_REPORT_EXECUTION = 'EXECUTION_REPORT_EXECUTION';
	var EXECUTION_REPORT_CANCELED = exports.EXECUTION_REPORT_CANCELED = 'EXECUTION_REPORT_CANCELED';
	var EXECUTION_REPORT_REJECTED = exports.EXECUTION_REPORT_REJECTED = 'EXECUTION_REPORT_REJECTED';
	
	var ORDER_HISTORY = exports.ORDER_HISTORY = 'ORDER_HISTORY';
	
	var ORDER_SEND = exports.ORDER_SEND = 'ORDER_SEND';
	var ORDER_CANCEL = exports.ORDER_CANCEL = 'ORDER_CANCEL';
	
	var TRADE_NEW = exports.TRADE_NEW = 'TRADE_NEW';
	var TRADE_HISTORY = exports.TRADE_HISTORY = 'TRADE_HISTORY';
	
	var TRADES = exports.TRADES = 'TRADES';
	
	var SIGNUP = exports.SIGNUP = 'SIGNUP';
	
	var LOGIN = exports.LOGIN = 'LOGIN';
	var LOGOUT = exports.LOGOUT = 'LOGOUT';
	var LOGIN_REQUIRED = exports.LOGIN_REQUIRED = 'LOGIN_REQUIRED';
	var LOGIN_CLOSE = exports.LOGIN_CLOSE = 'LOGIN_CLOSE';
	
	var CHANGE_PASSWORD = exports.CHANGE_PASSWORD = 'CHANGE_PASSWORD';
	
	var BALANCE = exports.BALANCE = 'BALANCE';
	
	var PROFILE_UPDATE = exports.PROFILE_UPDATE = 'PROFILE_UPDATE';
	
	var WITHDRAW_LIST = exports.WITHDRAW_LIST = 'WITHDRAW_LIST';
	var WITHDRAW_CANCEL = exports.WITHDRAW_CANCEL = 'WITHDRAW_CANCEL';
	var WITHDRAW_FILTER = exports.WITHDRAW_FILTER = 'WITHDRAW_FILTER';
	var WITHDRAW_REFRESH = exports.WITHDRAW_REFRESH = 'WITHDRAW_REFRESH';
	var WITHDRAW_PROCESS = exports.WITHDRAW_PROCESS = 'WITHDRAW_PROCESS';
	var WITHDRAW_CONFIRM = exports.WITHDRAW_CONFIRM = 'WITHDRAW_CONFIRM';
	var WITHDRAW_COMMENT = exports.WITHDRAW_COMMENT = 'WITHDRAW_COMMENT';
	var WITHDRAW_REQUEST = exports.WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
	var WITHDRAW_SET_NEW_VISIBLE = exports.WITHDRAW_SET_NEW_VISIBLE = 'WITHDRAW_SET_NEW_VISIBLE';
	
	var DEPOSIT_LIST = exports.DEPOSIT_LIST = 'DEPOSIT_LIST';
	var DEPOSIT_FILTER = exports.DEPOSIT_FILTER = 'DEPOSIT_FILTER';
	var DEPOSIT_REFRESH = exports.DEPOSIT_REFRESH = 'DEPOSIT_REFRESH';
	var DEPOSIT_PROCESS = exports.DEPOSIT_PROCESS = 'DEPOSIT_PROCESS';
	var DEPOSIT_REQUEST = exports.DEPOSIT_REQUEST = 'DEPOSIT_REQUEST';
	var DEPOSIT_METHODS = exports.DEPOSIT_METHODS = 'DEPOSIT_METHODS';
	var DEPOSIT_SET_NEW_VISIBLE = exports.DEPOSIT_SET_NEW_VISIBLE = 'DEPOSIT_SET_NEW_VISIBLE';
	
	var LEDGER_LIST = exports.LEDGER_LIST = 'LEDGER_LIST';
	var LEDGER_FILTER = exports.LEDGER_FILTER = 'LEDGER_FILTER';

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ORDER_BOOK_TRADE_NEW = exports.ORDER_BOOK_TRADE_NEW = 'TRADE_NEW';
	var ORDER_BOOK_NEW_ORDER = exports.ORDER_BOOK_NEW_ORDER = 'NEW_ORDER';
	var ORDER_BOOK_UPDATE_ORDER = exports.ORDER_BOOK_UPDATE_ORDER = 'UPDATE_ORDER';
	var ORDER_BOOK_DELETE_ORDER = exports.ORDER_BOOK_DELETE_ORDER = 'DELETE_ORDER';
	var ORDER_BOOK_DELETE_ORDERS_THRU = exports.ORDER_BOOK_DELETE_ORDERS_THRU = 'DELETE_ORDERS_THRU';
	
	var EXECUTION_REPORT = exports.EXECUTION_REPORT = 'EXECUTION_REPORT';
	var EXECUTION_REPORT_NEW = exports.EXECUTION_REPORT_NEW = 'NEW';
	var EXECUTION_REPORT_PARTIAL = exports.EXECUTION_REPORT_PARTIAL = 'PARTIAL';
	var EXECUTION_REPORT_EXECUTION = exports.EXECUTION_REPORT_EXECUTION = 'EXECUTION';
	var EXECUTION_REPORT_CANCELED = exports.EXECUTION_REPORT_CANCELED = 'CANCELED';
	var EXECUTION_REPORT_REJECTED = exports.EXECUTION_REPORT_REJECTED = 'REJECTED';
	
	/* eslint-disable quote-props */
	var EVENTS = exports.EVENTS = {
	  ORDERBOOK: {
	    '0': ORDER_BOOK_NEW_ORDER,
	    '1': ORDER_BOOK_UPDATE_ORDER,
	    '2': ORDER_BOOK_DELETE_ORDER,
	    '3': ORDER_BOOK_DELETE_ORDERS_THRU
	  },
	  TRADES: {
	    '0': ORDER_BOOK_TRADE_NEW
	  },
	  EXECUTION_REPORT: {
	    '0': EXECUTION_REPORT_NEW,
	    '1': EXECUTION_REPORT_PARTIAL,
	    '2': EXECUTION_REPORT_EXECUTION,
	    '4': EXECUTION_REPORT_CANCELED,
	    '8': EXECUTION_REPORT_REJECTED
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.formatOrderBook = exports.formatTradeHistory = exports.formatColumns = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _ramda = __webpack_require__(7);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var formatColumns = exports.formatColumns = function formatColumns(field, level) {
	  return function (data) {
	    if (level === 2) {
	      var list = (0, _ramda.map)((0, _ramda.zipObj)(data.Columns), data[field]);
	      return Promise.resolve(_extends({}, data, _defineProperty({}, field, list)));
	    }
	
	    return Promise.resolve(data);
	  };
	};
	
	var formatTradeHistory = exports.formatTradeHistory = function formatTradeHistory(level) {
	  return function (data) {
	    if (level === 2) {
	      var TradeHistoryGrp = (0, _ramda.compose)((0, _ramda.groupBy)((0, _ramda.prop)('Market')), (0, _ramda.map)((0, _ramda.zipObj)(data.Columns)))(data.TradeHistoryGrp);
	
	      return Promise.resolve(_extends({}, data, { TradeHistoryGrp: TradeHistoryGrp }));
	    }
	
	    return Promise.resolve(data);
	  };
	};
	
	var formatOrderBook = exports.formatOrderBook = function formatOrderBook(data, level) {
	  if (level === 2) {
	    var _data$MDFullGrp$filte = data.MDFullGrp.filter(function (order) {
	      return order.MDEntryType === '0' || order.MDEntryType === '1';
	    }).reduce(function (prev, order) {
	      var side = order.MDEntryType === '0' ? 'bids' : 'asks';
	      (prev[side] || (prev[side] = [])).push([order.MDEntryPx / 1e8, order.MDEntrySize / 1e8, order.UserID, order.OrderID]);
	      return prev;
	    }, []),
	        bids = _data$MDFullGrp$filte.bids,
	        asks = _data$MDFullGrp$filte.asks;
	
	    return _extends({}, data, {
	      MDFullGrp: _defineProperty({}, data.Symbol, {
	        bids: bids,
	        asks: asks
	      })
	    });
	  }
	
	  return data;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _nodeify = __webpack_require__(3);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _messages = __webpack_require__(6);
	
	var _utils = __webpack_require__(11);
	
	var _listener = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TradeBase = function () {
	  function TradeBase(params) {
	    _classCallCheck(this, TradeBase);
	
	    this.level = params.level;
	    this.brokerId = params.brokerId;
	  }
	
	  _createClass(TradeBase, [{
	    key: 'changeBrokerId',
	    value: function changeBrokerId(brokerId) {
	      this.brokerId = brokerId;
	    }
	  }, {
	    key: 'balance',
	    value: function balance(clientId, callback) {
	      var msg = {
	        MsgType: _messages.ActionMsgReq.BALANCE,
	        BalanceReqID: (0, _listener.generateRequestId)()
	      };
	
	      if (clientId) {
	        msg.ClientID = clientId;
	      }
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'myOrders',
	    value: function myOrders() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$page = _ref.page,
	          Page = _ref$page === undefined ? 0 : _ref$page,
	          _ref$pageSize = _ref.pageSize,
	          PageSize = _ref$pageSize === undefined ? 40 : _ref$pageSize,
	          filter = _ref.filter;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.ORDER_HISTORY,
	        OrdersReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize
	      };
	
	      if (filter) {
	        msg.Filter = filter;
	      }
	
	      var format = (0, _utils.formatColumns)('OrdListGrp', this.level);
	
	      return _nodeify2.default.extend(this.send(msg).then(format)).nodeify(callback);
	    }
	  }, {
	    key: 'sendOrder',
	    value: function sendOrder(_ref2, callback) {
	      var side = _ref2.side,
	          amount = _ref2.amount,
	          price = _ref2.price,
	          symbol = _ref2.symbol;
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.ORDER_SEND,
	        ClOrdID: (0, _listener.generateRequestId)(),
	        Symbol: symbol,
	        Side: side,
	        OrdType: '2',
	        Price: price,
	        OrderQty: amount,
	        BrokerID: this.brokerId
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'cancelOrder',
	    value: function cancelOrder() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var callback = arguments[1];
	
	      var orderId = param.orderId ? param.orderId : param;
	      var msg = {
	        MsgType: _messages.ActionMsgReq.ORDER_CANCEL
	      };
	
	      if (param.clientId) {
	        msg.ClOrdID = param.clientId;
	      }
	
	      if (param.orderId) {
	        msg.OrderID = orderId;
	      }
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	
	    /**
	     * status: 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled
	     */
	
	  }, {
	    key: 'requestWithdrawList',
	    value: function requestWithdrawList() {
	      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref3$page = _ref3.page,
	          Page = _ref3$page === undefined ? 0 : _ref3$page,
	          _ref3$pageSize = _ref3.pageSize,
	          PageSize = _ref3$pageSize === undefined ? 20 : _ref3$pageSize,
	          _ref3$status = _ref3.status,
	          StatusList = _ref3$status === undefined ? ['1', '2', '4', '8'] : _ref3$status,
	          filter = _ref3.filter,
	          clientId = _ref3.clientId;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.WITHDRAW_LIST,
	        WithdrawListReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize,
	        StatusList: StatusList
	      };
	
	      if (filter && filter.length) {
	        msg.Filter = filter;
	      }
	
	      if (clientId) {
	        msg.ClientID = clientId;
	      }
	
	      var format = (0, _utils.formatColumns)('WithdrawListGrp', this.level);
	
	      return _nodeify2.default.extend(this.send(msg).then(format)).nodeify(callback);
	    }
	  }, {
	    key: 'requestWithdraw',
	    value: function requestWithdraw(_ref4, callback) {
	      var amount = _ref4.amount,
	          data = _ref4.data,
	          _ref4$currency = _ref4.currency,
	          currency = _ref4$currency === undefined ? 'BTC' : _ref4$currency,
	          _ref4$method = _ref4.method,
	          method = _ref4$method === undefined ? 'bitcoin' : _ref4$method;
	
	      var reqId = (0, _listener.generateRequestId)();
	      var msg = {
	        MsgType: _messages.ActionMsgReq.WITHDRAW_REQUEST,
	        WithdrawReqID: reqId,
	        ClOrdID: reqId,
	        Method: method,
	        Amount: amount,
	        Currency: currency,
	        Data: data
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'confirmWithdraw',
	    value: function confirmWithdraw(_ref5, callback) {
	      var WithdrawID = _ref5.withdrawId,
	          confirmationToken = _ref5.confirmationToken,
	          secondFactor = _ref5.secondFactor;
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.CONFIRM_WITHDRAW,
	        WithdrawReqID: (0, _listener.generateRequestId)(),
	        WithdrawID: WithdrawID
	      };
	
	      if (confirmationToken) {
	        msg.ConfirmationToken = confirmationToken;
	      }
	
	      if (secondFactor) {
	        msg.SecondFactor = secondFactor;
	      }
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'cancelWithdraw',
	    value: function cancelWithdraw(withdrawId, callback) {
	      var reqId = (0, _listener.generateRequestId)();
	      var msg = {
	        MsgType: _messages.ActionMsgReq.CANCEL_WITHDRAW,
	        WithdrawCancelReqID: reqId,
	        ClOrdID: reqId,
	        WithdrawID: withdrawId
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'requestDepositList',
	    value: function requestDepositList() {
	      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref6$page = _ref6.page,
	          Page = _ref6$page === undefined ? 0 : _ref6$page,
	          _ref6$pageSize = _ref6.pageSize,
	          PageSize = _ref6$pageSize === undefined ? 20 : _ref6$pageSize,
	          _ref6$status = _ref6.status,
	          StatusList = _ref6$status === undefined ? ['1', '2', '4', '8'] : _ref6$status,
	          filter = _ref6.filter,
	          clientId = _ref6.clientId;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.DEPOSIT_LIST,
	        DepositListReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize,
	        StatusList: StatusList
	      };
	
	      if (filter && filter.length) {
	        msg.Filter = filter;
	      }
	
	      if (clientId) {
	        msg.ClientID = clientId;
	      }
	
	      var format = (0, _utils.formatColumns)('DepositListGrp', this.level);
	
	      return _nodeify2.default.extend(this.send(msg).then(format)).nodeify(callback);
	    }
	  }, {
	    key: 'requestDeposit',
	    value: function requestDeposit() {
	      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref7$currency = _ref7.currency,
	          currency = _ref7$currency === undefined ? 'BTC' : _ref7$currency,
	          value = _ref7.value,
	          depositMethodId = _ref7.depositMethodId;
	
	      var callback = arguments[1];
	
	      var reqId = (0, _listener.generateRequestId)();
	      var msg = {
	        MsgType: _messages.ActionMsgReq.DEPOSIT_REQUEST,
	        DepositReqID: reqId,
	        ClOrdID: reqId,
	        Currency: currency,
	        BrokerID: this.brokerId
	      };
	
	      if (currency !== 'BTC') {
	        msg.DepositMethodID = depositMethodId;
	        msg.Value = value;
	      }
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'requestDepositMethods',
	    value: function requestDepositMethods(callback) {
	      var msg = {
	        MsgType: _messages.ActionMsgReq.DEPOSIT_METHODS,
	        DepositMethodReqID: (0, _listener.generateRequestId)(),
	        BrokerID: this.brokerId
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'requestLedger',
	    value: function requestLedger() {
	      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref8$page = _ref8.page,
	          Page = _ref8$page === undefined ? 0 : _ref8$page,
	          _ref8$pageSize = _ref8.pageSize,
	          PageSize = _ref8$pageSize === undefined ? 20 : _ref8$pageSize,
	          brokerId = _ref8.brokerId,
	          clientId = _ref8.clientId,
	          currency = _ref8.currency;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _messages.ActionMsgReq.LEDGER_LIST,
	        LedgerListReqID: (0, _listener.generateRequestId)(),
	        BrokerID: this.brokerId,
	        Page: Page,
	        PageSize: PageSize
	      };
	
	      if (brokerId) {
	        msg.BrokerID = brokerId;
	      }
	      if (currency) {
	        msg.Currency = currency;
	      }
	      if (clientId) {
	        msg.ClientID = clientId;
	      }
	
	      var format = (0, _utils.formatColumns)('LedgerListGrp', this.level);
	
	      return _nodeify2.default.extend(this.send(msg).then(format)).nodeify(callback);
	    }
	  }]);
	
	  return TradeBase;
	}();
	
	exports.default = TradeBase;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _nodeify = __webpack_require__(3);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _fingerprintjs = __webpack_require__(14);
	
	var _fingerprintjs2 = _interopRequireDefault(_fingerprintjs);
	
	var _eventemitter = __webpack_require__(4);
	
	var _transport = __webpack_require__(15);
	
	var _transport2 = _interopRequireDefault(_transport);
	
	var _listener = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var WebSocketTransport = function (_Transport) {
	  _inherits(WebSocketTransport, _Transport);
	
	  /*
	   * Event emitter to dispatch websocket updates
	   */
	
	
	  /*
	   * Stun object
	   */
	
	  /*
	   * WebSocket Instance
	   */
	  function WebSocketTransport() {
	    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, WebSocketTransport);
	
	    var _this = _possibleConstructorReturn(this, (WebSocketTransport.__proto__ || Object.getPrototypeOf(WebSocketTransport)).call(this, params, 'ws'));
	
	    _this.stun = { local: null, public: [] };
	
	    _this.getStun();
	    _this.getFingerPrint(params.fingerPrint);
	    _this.headers = params.headers;
	
	    _this.eventEmitter = new _eventemitter.EventEmitter2({ wildcard: true, delimiter: ':' });
	    return _this;
	  }
	
	  /*
	   * Transport Promise
	   */
	
	
	  /*
	   * FingerPrint
	   */
	
	
	  _createClass(WebSocketTransport, [{
	    key: 'connect',
	    value: function connect(callback) {
	      var _this2 = this;
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        _this2.request = { resolve: resolve, reject: reject };
	
	        var WebSocket = _this2.isNode ? __webpack_require__(17) : window.WebSocket;
	
	        _this2.socket = new WebSocket(_this2.endpoint, null, _this2.headers);
	        _this2.socket.onopen = _this2.onOpen.bind(_this2);
	        _this2.socket.onclose = _this2.onClose.bind(_this2);
	        _this2.socket.onerror = _this2.onError.bind(_this2);
	        _this2.socket.onmessage = _this2.onMessage.bind(_this2);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect() {
	      this.socket.close();
	    }
	  }, {
	    key: 'onOpen',
	    value: function onOpen() {
	      this.request.resolve({ connected: true });
	    }
	  }, {
	    key: 'onClose',
	    value: function onClose() {}
	  }, {
	    key: 'onError',
	    value: function onError(error) {
	      this.request.reject(error);
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(msg) {
	      if (this.socket.readyState === 1) {
	        var data = msg;
	
	        data.STUNTIP = this.stun;
	        data.FingerPrint = this.fingerPrint;
	
	        this.socket.send(JSON.stringify(data));
	      }
	    }
	  }, {
	    key: 'sendMessageAsPromise',
	    value: function sendMessageAsPromise(msg) {
	      var _this3 = this;
	
	      return new Promise(function (resolve, reject) {
	        var promise = { resolve: resolve, reject: reject };
	        (0, _listener.setRequest)(msg, { resolve: resolve, reject: reject });
	        // We are passing the promise as a parameter to spy it in our tests
	        _this3.sendMessage(msg, promise);
	      });
	    }
	  }, {
	    key: 'onMessage',
	    value: function onMessage(msg) {
	      var data = JSON.parse(msg.data);
	      if (data.MsgType === 'ERROR') {
	        throw new Error('Error: ' + data.Detail + ' ' + data.Description);
	      }
	
	      var request = (0, _listener.getRequest)(data);
	      var emitter = (0, _listener.getEventEmitter)(data);
	      var listener = (0, _listener.getListener)(data.MsgType);
	
	      this.dispatchPromise(request, data);
	      this.dispatchEventEmitters(emitter, data);
	      this.dispatchListeners(listener, data);
	    }
	  }, {
	    key: 'dispatchPromise',
	    value: function dispatchPromise(request, data) {
	      if (request && request.resolve) {
	        (0, _listener.deleteRequest)(data);
	        return request.resolve(data);
	      }
	    }
	  }, {
	    key: 'dispatchEventEmitters',
	    value: function dispatchEventEmitters(emitter, data) {
	      if (emitter) {
	        return emitter(data);
	      }
	    }
	  }, {
	    key: 'dispatchListeners',
	    value: function dispatchListeners(listener, data) {
	      return listener && listener(data);
	    }
	  }, {
	    key: 'getFingerPrint',
	    value: function getFingerPrint(customFingerprint) {
	      var _this4 = this;
	
	      if (this.isNode) {
	        return __webpack_require__(18).getMac(function (macAddress) {
	          _this4.fingerPrint = macAddress;
	        });
	      } else if (this.isBrowser) {
	        return new _fingerprintjs2.default().get(function (fingerPrint) {
	          _this4.fingerPrint = Math.abs(__webpack_require__(20).encodeByteArray(fingerPrint)).toString();
	        });
	      } else if (customFingerprint) {
	        this.fingerPrint = customFingerprint;
	      } else {
	        throw new Error('FingerPrint not provided');
	      }
	    }
	  }, {
	    key: 'getStun',
	    value: function getStun() {
	      var _this5 = this;
	
	      if (this.isNode) {
	        __webpack_require__(21).getStun(function (data) {
	          _this5.stun = data;
	        });
	      }
	    }
	
	    /* eslint-disable no-param-reassign */
	
	  }, {
	    key: 'emitterPromise',
	    value: function emitterPromise(promise, callback) {
	      var _this6 = this;
	
	      promise.on = function (event, listener) {
	        _this6.eventEmitter.on(event, listener);
	        return promise;
	      };
	      promise.onAny = function (listener) {
	        _this6.eventEmitter.onAny(listener);
	        return promise;
	      };
	      promise.offAny = function (listener) {
	        _this6.eventEmitter.offAny(listener);
	        return promise;
	      };
	      promise.once = function (event, listener) {
	        _this6.eventEmitter.once(event, listener);
	        return promise;
	      };
	      promise.many = function (event, times, listener) {
	        _this6.eventEmitter.many(event, times, listener);
	        return promise;
	      };
	      promise.removeListener = function (event, listener) {
	        _this6.eventEmitter.removeListener(event, listener);
	        return promise;
	      };
	      promise.removeAllListeners = function (events) {
	        _this6.eventEmitter.removeAllListeners(events);
	        return promise;
	      };
	
	      return _nodeify2.default.extend(promise).nodeify(callback);
	    }
	    /* eslint-enable no-param-reassign */
	
	  }]);
	
	  return WebSocketTransport;
	}(_transport2.default);
	
	exports.default = WebSocketTransport;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("fingerprintjs2");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(16);
	
	var _common2 = _interopRequireDefault(_common);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
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
	                                                                                                                                                           * 
	                                                                                                                                                           */
	
	var Transport =
	
	/*
	 * Is browser environment.
	 */
	
	/*
	 * url endpoint.
	 */
	function Transport() {
	  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var env = arguments[1];
	
	  _classCallCheck(this, Transport);
	
	  /* eslint-disable indent */
	  var endpoint = params.url ? params.url : params.prod ? _common2.default.prod[env] : _common2.default.testnet[env];
	  /* eslint-enable indent */
	
	  this.endpoint = endpoint;
	  this.level = params.level || '2';
	
	  this.isNode = typeof window === 'undefined';
	  this.isBrowser = typeof document !== 'undefined';
	}
	
	/*
	 * Is node.js environment.
	 */
	;
	
	exports.default = Transport;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  prod: {
	    ws: 'wss://ws.blinktrade.com/trade/',
	    rest: 'https://api.blinktrade.com/'
	  },
	  testnet: {
	    ws: 'wss://api_testnet.blinktrade.com/trade/',
	    rest: 'https://api_testnet.blinktrade.com/'
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("ws");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMac = getMac;
	
	var _macaddress = __webpack_require__(19);
	
	var _macaddress2 = _interopRequireDefault(_macaddress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getMac(callback) {
	  _macaddress2.default.all(function (err, all) {
	    var hashCode = function hashCode(str) {
	      var hash = 0;
	      if (str.length === 0) return hash;
	      for (var i = 0; i < str.length; i++) {
	        hash = (hash << 5) - hash + str.charCodeAt(i);
	        hash = hash & hash; // Convert to 32bit integer
	      }
	      return hash;
	    };
	
	    var macAddresses = '';
	    Object.keys(all).forEach(function (iface) {
	      macAddresses += all[iface].mac;
	    });
	
	    var fingerPrint = hashCode(macAddresses);
	    if (fingerPrint < 0) {
	      fingerPrint *= -1;
	    }
	
	    callback(fingerPrint);
	  });
	} /**
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
	   * 
	   */
	
	/* eslint-disable operator-assignment */
	/* eslint-disable no-plusplus */
	/* eslint-disable import/prefer-default-export */

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("macaddress");

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	/* eslint-disable no-var */
	/* eslint-disable no-bitwise */
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-fallthrough */
	/* eslint-disable no-underscore-dangle */
	/* eslint-disable default-case */
	/* eslint-disable prefer-destructuring */
	/*
	 * ByteArray enconding from google-closure-library
	 */
	
	var SEED32 = 314159265;
	var CONSTANT32 = -1640531527;
	
	/**
	 * Performs an inplace mix of an object with the integer properties (a, b, c)
	 * and returns the final value of c.
	 * @param {Object} mix Object with properties, a, b, and c.
	 * @return {number} The end c-value for the mixing.
	 * @private
	 */
	var mix32_ = function mix32_(mix) {
	  var a = mix.a;
	  var b = mix.b;
	  var c = mix.c;
	  a -= b;
	  a -= c;
	  a ^= c >>> 13;
	  b -= c;
	  b -= a;
	  b ^= a << 8;
	  c -= a;
	  c -= b;
	  c ^= b >>> 13;
	  a -= b;
	  a -= c;
	  a ^= c >>> 12;
	  b -= c;
	  b -= a;
	  b ^= a << 16;
	  c -= a;
	  c -= b;
	  c ^= b >>> 5;
	  a -= b;
	  a -= c;
	  a ^= c >>> 3;
	  b -= c;
	  b -= a;
	  b ^= a << 10;
	  c -= a;
	  c -= b;
	  c ^= b >>> 15;
	  mix.a = a;
	  mix.b = b;
	  mix.c = c;
	  return c;
	};
	
	/**
	 * Converts an unsigned "byte" to signed, that is, convert a value in the range
	 * (0, 2^8-1) to (-2^7, 2^7-1) in order to be compatible with Java's byte type.
	 * @param {number} n Unsigned "byte" value.
	 * @return {number} Signed "byte" value.
	 * @private
	 */
	var toSigned_ = function toSigned_(n) {
	  return n > 127 ? n - 256 : n;
	};
	
	var wordAt_ = function wordAt_(bytes, offset) {
	  var a = toSigned_(bytes[offset + 0]);
	  var b = toSigned_(bytes[offset + 1]);
	  var c = toSigned_(bytes[offset + 2]);
	  var d = toSigned_(bytes[offset + 3]);
	  return a + (b << 8) + (c << 16) + (d << 24);
	};
	
	/**
	 * Hashes a "byte" array to a 32-bit value using the supplied seed.
	 */
	module.exports.encodeByteArray = function encodeByteArray(bytes) {
	  var offset = 0;
	  var length = bytes.length;
	  var seed = SEED32;
	
	  var mix = {
	    a: CONSTANT32,
	    b: CONSTANT32,
	    c: seed
	  };
	
	  var keylen;
	  for (keylen = length; keylen >= 12; keylen -= 12, offset += 12) {
	    mix.a += wordAt_(bytes, offset);
	    mix.b += wordAt_(bytes, offset + 4);
	    mix.c += wordAt_(bytes, offset + 8);
	    mix32_(mix);
	  }
	  // Hash any remaining bytes
	  mix.c += length;
	  switch (keylen) {// deal with rest.  Some cases fall through
	    case 11:
	      mix.c += bytes[offset + 10] << 24;
	    case 10:
	      mix.c += (bytes[offset + 9] & 0xff) << 16;
	    case 9:
	      mix.c += (bytes[offset + 8] & 0xff) << 8;
	    // the first byte of c is reserved for the length
	    case 8:
	      mix.b += wordAt_(bytes, offset + 4);
	      mix.a += wordAt_(bytes, offset);
	      break;
	    case 7:
	      mix.b += (bytes[offset + 6] & 0xff) << 16;
	    case 6:
	      mix.b += (bytes[offset + 5] & 0xff) << 8;
	    case 5:
	      mix.b += bytes[offset + 4] & 0xff;
	    case 4:
	      mix.a += wordAt_(bytes, offset);
	      break;
	    case 3:
	      mix.a += (bytes[offset + 2] & 0xff) << 16;
	    case 2:
	      mix.a += (bytes[offset + 1] & 0xff) << 8;
	    case 1:
	      mix.a += bytes[offset + 0] & 0xff;
	    // case 0 : nothing left to add
	  }
	  return mix32_(mix);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
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
	
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-plusplus */
	/* eslint-disable import/prefer-default-export */
	/* eslint-disable no-restricted-properties */
	/* eslint-disable no-buffer-constructor */
	
	exports.getStun = getStun;
	
	var _ip = __webpack_require__(22);
	
	var _ip2 = _interopRequireDefault(_ip);
	
	var _dgram = __webpack_require__(23);
	
	var _dgram2 = _interopRequireDefault(_dgram);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var stunIp = { local: null, public: [] };
	
	function addIPAddress(ipAddress) {
	  if (ipAddress.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
	    stunIp.local = ipAddress;
	  } else if (stunIp.public.indexOf(ipAddress) === -1) {
	    stunIp.public.push(ipAddress);
	  }
	}
	
	function getStun(callback) {
	  var socket = _dgram2.default.createSocket('udp4');
	
	  var STUN_HEADER_LENGTH = 20;
	  var stunRequest = new Buffer(STUN_HEADER_LENGTH);
	
	  var STUN_METHOD_REQUEST = 0x000;
	  var STUN_BINDING_CLASS = 0x0001;
	  var STUN_MAGIC_COOKIE = 0x2112A442;
	  var STUN_TID_MAX = Math.pow(2, 32);
	
	  var STUN_ATTR_MAPPED_ADDRESS = 0x0001;
	  var STUN_ATTR_XOR_MAPPED_ADDRESS = 0x8020;
	  var STUN_ATTR_XOR_MAPPED_ADDRESS_ALT = 0x0020;
	
	  var stunTxId = Math.random() * STUN_TID_MAX;
	
	  var stunServers = [[3478, 'stun.services.mozilla.com'], [19302, 'stun.l.google.com'], [3478, 'stun.stunprotocol.org'], [3478, 'stun.softjoys.com'], [3478, 'stun.samsungsmartcam.com'], [3478, 'stun.sonetel.com'], [3478, 'stun.tagan.ru'], [3478, 'stun.voipgain.com'], [3478, 'stunserver.org'], [3478, 'stun.advfn.com'], [3478, 'stun.annatel.net'], [3478, 'stun.freevoipdeal.com']];
	
	  stunRequest.writeUInt16BE((STUN_BINDING_CLASS | STUN_METHOD_REQUEST) & 0x3fff, 0);
	  stunRequest.writeUInt16BE(0, 2);
	  stunRequest.writeUInt32BE(STUN_MAGIC_COOKIE, 4);
	  stunRequest.writeUInt32BE(0, 8);
	  stunRequest.writeUInt32BE(0, 12);
	  stunRequest.writeUInt32BE(stunTxId, 16);
	
	  socket.on('message', function (msg) {
	    var xor = function xor(a, b) {
	      var data = [];
	      if (b.length > a.length) {
	        var tmp = a;
	        a = b;
	        b = tmp;
	      }
	      for (var i = 0, len = a.length; i < len; i++) {
	        data.push(a[i] ^ b[i]);
	      }
	
	      return new Buffer(data);
	    };
	
	    var block = msg.readUInt8(0);
	    var bit1 = block & 0x80;
	    var bit2 = block & 0x40;
	
	    if (!(bit1 === 0 && bit2 === 0)) {
	      return;
	    }
	
	    var msgHeader = msg.slice(0, STUN_HEADER_LENGTH);
	    var msgAttrs = msg.slice(STUN_HEADER_LENGTH, msg.length);
	
	    var offset = 0;
	
	    while (offset < msgAttrs.length) {
	      var attrType = msgAttrs.readUInt16BE(offset);
	      offset += 2;
	
	      var attrBuffLength = msgAttrs.readUInt16BE(offset);
	      var blockOut = attrBuffLength % 4;
	      if (blockOut > 0) {
	        attrBuffLength += 4 - blockOut;
	      }
	      offset += 2;
	
	      var value = msgAttrs.slice(offset, offset + attrBuffLength);
	      offset += attrBuffLength;
	
	      var family = void 0;
	      var address = void 0;
	      switch (attrType) {
	        case STUN_ATTR_MAPPED_ADDRESS:
	          family = value.readUInt16BE(0) === 0x02 ? 6 : 4;
	          address = _ip2.default.toString(value, 4, family);
	          addIPAddress(address);
	          break;
	
	        case STUN_ATTR_XOR_MAPPED_ADDRESS:
	        case STUN_ATTR_XOR_MAPPED_ADDRESS_ALT:
	          family = value.readUInt16BE(0) === 0x02 ? 6 : 4;
	          var magic = msgHeader.slice(4, 8);
	          var tid = msgHeader.slice(8, 20);
	          var xaddr = value.slice(4, family === 4 ? 8 : 20);
	          var addr = xor(xaddr, family === 4 ? magic : value.concat([magic, tid]));
	          address = _ip2.default.toString(addr, 0, family);
	          addIPAddress(address);
	          break;
	        default:
	      }
	    }
	
	    callback(stunIp);
	  });
	
	  stunServers.map(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        port = _ref2[0],
	        host = _ref2[1];
	
	    return socket.send(stunRequest, 0, stunRequest.length, port, host, function () {});
	  });
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("ip");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("dgram");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _nodeify = __webpack_require__(3);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _rest = __webpack_require__(26);
	
	var _rest2 = _interopRequireDefault(_rest);
	
	var _trade = __webpack_require__(12);
	
	var _trade2 = _interopRequireDefault(_trade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var BlinkTradeRest = function (_TradeBase) {
	  _inherits(BlinkTradeRest, _TradeBase);
	
	  function BlinkTradeRest(params) {
	    _classCallCheck(this, BlinkTradeRest);
	
	    var _this = _possibleConstructorReturn(this, (BlinkTradeRest.__proto__ || Object.getPrototypeOf(BlinkTradeRest)).call(this, params));
	
	    _this.transport = params.transport || new _rest2.default(params);
	    return _this;
	  }
	
	  _createClass(BlinkTradeRest, [{
	    key: 'send',
	    value: function send(path) {
	      return this.transport.fetchTrade(path);
	    }
	  }, {
	    key: 'fetchPublic',
	    value: function fetchPublic(path) {
	      return this.transport.fetchPublic(path);
	    }
	  }, {
	    key: 'ticker',
	    value: function ticker(callback) {
	      return _nodeify2.default.extend(this.fetchPublic('ticker')).nodeify(callback);
	    }
	  }, {
	    key: 'trades',
	    value: function trades() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$limit = _ref.limit,
	          limit = _ref$limit === undefined ? 100 : _ref$limit,
	          _ref$since = _ref.since,
	          since = _ref$since === undefined ? 0 : _ref$since;
	
	      var callback = arguments[1];
	
	      return _nodeify2.default.extend(this.fetchPublic('trades?limit=' + limit + '&since=' + since)).nodeify(callback);
	    }
	  }, {
	    key: 'orderbook',
	    value: function orderbook(callback) {
	      return _nodeify2.default.extend(this.fetchPublic('orderbook')).nodeify(callback);
	    }
	  }]);
	
	  return BlinkTradeRest;
	}(_trade2.default);
	
	exports.default = BlinkTradeRest;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _url = __webpack_require__(27);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _sjcl = __webpack_require__(28);
	
	var _sjcl2 = _interopRequireDefault(_sjcl);
	
	var _fetchPonyfill2 = __webpack_require__(29);
	
	var _fetchPonyfill3 = _interopRequireDefault(_fetchPonyfill2);
	
	var _transport = __webpack_require__(15);
	
	var _transport2 = _interopRequireDefault(_transport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var _fetchPonyfill = (0, _fetchPonyfill3.default)(Promise),
	    _fetch = _fetchPonyfill.fetch;
	
	var RestTransport = function (_Transport) {
	  _inherits(RestTransport, _Transport);
	
	  /**
	   * APISecret
	   */
	  function RestTransport(params) {
	    _classCallCheck(this, RestTransport);
	
	    var _this = _possibleConstructorReturn(this, (RestTransport.__proto__ || Object.getPrototypeOf(RestTransport)).call(this, params, 'rest'));
	
	    _this.key = params.key;
	    _this.secret = params.secret;
	    _this.currency = params.currency || 'USD';
	    return _this;
	  }
	
	  /**
	   * Exchanges currencies available.
	   */
	
	  /**
	   * APIKey
	   */
	
	
	  _createClass(RestTransport, [{
	    key: 'headers',
	    value: function headers(method, body) {
	      var timeStamp = Date.now().toString();
	      var hexKey = _sjcl2.default.codec.utf8String.toBits(this.secret);
	      var hmac = new _sjcl2.default.misc.hmac(hexKey, _sjcl2.default.hash.sha256);
	      var Signature = _sjcl2.default.codec.hex.fromBits(hmac.encrypt(timeStamp));
	      return {
	        method: method,
	        headers: {
	          'Content-Type': 'application/json',
	          Nonce: timeStamp,
	          APIKey: this.key,
	          Signature: Signature
	        },
	        body: JSON.stringify(body)
	      };
	    }
	  }, {
	    key: 'fetch',
	    value: function fetch(msg, api) {
	      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	      return _fetch(_url2.default.resolve(this.endpoint, api), headers).then(function (response) {
	        return response.json();
	      });
	    }
	  }, {
	    key: 'fetchPublic',
	    value: function fetchPublic(api) {
	      return this.fetch({}, 'api/v1/' + this.currency + '/' + api);
	    }
	  }, {
	    key: 'fetchTrade',
	    value: function fetchTrade(msg) {
	      var headers = this.headers('POST', msg);
	      return this.fetch(msg, 'tapi/v1/message', headers).then(function (response) {
	        return response.Status === 500 ? Promise.reject(response) : response.Responses;
	      }).then(function (response) {
	        return response.length === 1 ? response[0] : response;
	      });
	    }
	  }]);
	
	  return RestTransport;
	}(_transport2.default);
	
	exports.default = RestTransport;

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("sjcl");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("fetch-ponyfill");

/***/ }
/******/ ]);
//# sourceMappingURL=blinktrade.js.map