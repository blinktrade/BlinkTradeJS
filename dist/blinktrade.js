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
	
	var _rest = __webpack_require__(27);
	
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
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _nodeify = __webpack_require__(4);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _eventemitter = __webpack_require__(5);
	
	var _listener = __webpack_require__(6);
	
	var _actionTypes = __webpack_require__(8);
	
	var _requests = __webpack_require__(9);
	
	var _requests2 = _interopRequireDefault(_requests);
	
	var _wsTransport = __webpack_require__(10);
	
	var _wsTransport2 = _interopRequireDefault(_wsTransport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
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
	
	var BlinkTradeWS = function (_WebSocketTransport) {
	  _inherits(BlinkTradeWS, _WebSocketTransport);
	
	  function BlinkTradeWS(params) {
	    _classCallCheck(this, BlinkTradeWS);
	
	    var _this = _possibleConstructorReturn(this, (BlinkTradeWS.__proto__ || Object.getPrototypeOf(BlinkTradeWS)).call(this, params));
	
	    _this.session = {};
	    return _this;
	  }
	
	  /**
	   * Session to store login information
	   */
	
	
	  _createClass(BlinkTradeWS, [{
	    key: 'heartbeat',
	    value: function heartbeat(callback) {
	      var _this2 = this;
	
	      var d = new Date();
	      var msg = {
	        MsgType: _requests2.default.HEARTBEAT,
	        TestReqID: d.getTime(),
	        SendTime: d.getTime()
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', _this2).call(_this2, msg).then(function (data) {
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
	          secondFactor = _ref.secondFactor;
	
	      var userAgent = void 0;
	      if (!this.isNode) {
	        userAgent = {
	          UserAgent: window.navigator.userAgent,
	          UserAgentLanguage: window.navigator.language,
	          UserAgentPlatform: window.navigator.platform,
	          UserAgentTimezoneOffset: new Date().getTimezoneOffset()
	        };
	      } else {
	        var os = __webpack_require__(26);
	        userAgent = {
	          UserAgent: os.type() + ' ' + os.release(),
	          UserAgentLanguage: 'en_US',
	          UserAgentPlatform: os.platform() + ' (' + os.arch() + ')',
	          UserAgentTimezoneOffset: new Date().getTimezoneOffset()
	        };
	      }
	
	      var msg = _extends({
	        MsgType: _requests2.default.LOGIN,
	        UserReqID: (0, _listener.generateRequestId)(),
	        BrokerID: this.brokerId,
	        Username: username,
	        Password: password,
	        UserReqTyp: '1'
	      }, userAgent);
	
	      if (secondFactor) {
	        msg.SecondFactor = secondFactor;
	      }
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', _this3).call(_this3, msg).then(function (data) {
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
	        MsgType: _requests2.default.LOGOUT,
	        BrokerID: this.brokerId,
	        UserReqID: (0, _listener.generateRequestId)(),
	        Username: this.session.Username,
	        UserReqTyp: '2'
	      };
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', this).call(this, msg).nodeify(callback);
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
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'emitterPromise', this).call(this, new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'balance', _this4).call(_this4, callback).then(function (data) {
	          (0, _listener.registerListener)('U3', function (balance) {
	            callback && callback(null, balance);
	            return _this4.eventEmitter.emit(_actionTypes.BALANCE, balance);
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
	        MsgType: _requests2.default.SECURITY_STATUS,
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
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'emitterPromise', this).call(this, new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', _this5).call(_this5, msg).then(function (data) {
	          resolve(formatTicker(data));
	          (0, _listener.registerEventEmitter)({ SecurityStatusReqID: data.SecurityStatusReqID }, function (ticker) {
	            callback && callback(null, formatTicker(ticker));
	            return _this5.eventEmitter.emit('BLINK:' + ticker.Symbol, formatTicker(ticker));
	          });
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'unSubscribeTicker',
	    value: function unSubscribeTicker(SecurityStatusReqID) {
	      var msg = {
	        MsgType: _requests2.default.SECURITY_STATUS,
	        SecurityStatusReqID: SecurityStatusReqID,
	        SubscriptionRequestType: '2'
	      };
	
	      _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessage', this).call(this, msg);
	      return SecurityStatusReqID;
	    }
	  }, {
	    key: 'subscribeOrderbook',
	    value: function subscribeOrderbook(symbols, callback) {
	      var _this6 = this;
	
	      var msg = {
	        MsgType: _requests2.default.MARKET_DATA_FULL_REFRESH,
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
	                var orderbookEvent = _actionTypes.ORDER_BOOK + ':' + _actionTypes.EVENTS.ORDERBOOK[order.MDUpdateAction];
	                var bidOfferData = _extends({}, dataOrder, { type: orderbookEvent });
	
	                callback && callback(null, bidOfferData);
	                return _this6.eventEmitter.emit(orderbookEvent, bidOfferData);
	              case '2':
	                var tradeEvent = _actionTypes.ORDER_BOOK + ':' + _actionTypes.EVENTS.TRADES[order.MDUpdateAction];
	                var tradeData = _extends({}, dataOrder, { type: tradeEvent });
	
	                callback && callback(null, tradeData);
	                return _this6.eventEmitter.emit(tradeEvent, tradeData);
	              case '4':
	                break;
	              default:
	                return null;
	            }
	            return null;
	          });
	        }
	      };
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'emitterPromise', this).call(this, new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', _this6).call(_this6, msg).then(function (data) {
	          if (data.MsgType === 'W') {
	            // Split orders in bids and asks
	            /* eslint-disable no-param-reassign */
	            var _data$MDFullGrp$filte = data.MDFullGrp.filter(function (order) {
	              return order.MDEntryType === '0' || order.MDEntryType === '1';
	            }).reduce(function (prev, order) {
	              var side = order.MDEntryType === '0' ? 'bids' : 'asks';
	              (prev[side] || (prev[side] = [])).push([order.MDEntryPx / 1e8, order.MDEntrySize / 1e8, order.UserID]);
	              return prev;
	            }, []),
	                bids = _data$MDFullGrp$filte.bids,
	                asks = _data$MDFullGrp$filte.asks;
	            /* eslint-enable no-param-reassign */
	
	            (0, _listener.registerEventEmitter)({ MDReqID: data.MDReqID }, subscribeEvent);
	
	            return resolve(_extends({}, data, {
	              MDFullGrp: _defineProperty({}, data.Symbol, {
	                bids: bids,
	                asks: asks
	              })
	            }));
	          }
	        }).catch(function (err) {
	          return reject(err);
	        });
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'unSubscribeOrderbook',
	    value: function unSubscribeOrderbook(MDReqID) {
	      var msg = {
	        MsgType: _requests2.default.MARKET_DATA_UNSUBSCRIBE,
	        MDReqID: MDReqID,
	        MarketDepth: 0,
	        SubscriptionRequestType: '2'
	      };
	
	      _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessage', this).call(this, msg);
	      return MDReqID;
	    }
	  }, {
	    key: 'executionReport',
	    value: function executionReport(callback) {
	      var _this7 = this;
	
	      (0, _listener.registerListener)('8', function (data) {
	        callback && callback(data);
	        var event = _actionTypes.EVENTS.EXECUTION_REPORT[data.ExecType];
	        return _this7.eventEmitter.emit(_actionTypes.EXECUTION_REPORT + ':' + event, data);
	      });
	
	      return this.eventEmitter;
	    }
	  }, {
	    key: 'tradeHistory',
	    value: function tradeHistory() {
	      var _this8 = this;
	
	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          since = _ref2.since,
	          filter = _ref2.filter,
	          _ref2$page = _ref2.page,
	          Page = _ref2$page === undefined ? 0 : _ref2$page,
	          _ref2$pageSize = _ref2.pageSize,
	          PageSize = _ref2$pageSize === undefined ? 80 : _ref2$pageSize;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _requests2.default.TRADE_HISTORY,
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
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', _this8).call(_this8, msg).then(function (data) {
	          var Columns = data.Columns,
	              trades = _objectWithoutProperties(data, ['Columns']);
	
	          var TradeHistory = _lodash2.default.groupBy(_lodash2.default.map(data.TradeHistoryGrp, function (trade) {
	            return _lodash2.default.zipObject(Columns, trade);
	          }), function (trade) {
	            return trade.Market;
	          });
	          return resolve(_extends({}, trades, {
	            TradeHistoryGrp: TradeHistory
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'requestDeposit',
	    value: function requestDeposit() {
	      var _this9 = this;
	
	      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref3$currency = _ref3.currency,
	          currency = _ref3$currency === undefined ? 'BTC' : _ref3$currency,
	          value = _ref3.value,
	          depositMethodId = _ref3.depositMethodId;
	
	      var callback = arguments[1];
	
	      var subscribeEvent = function subscribeEvent(deposit) {
	        callback && callback(null, deposit);
	        return _this9.eventEmitter.emit(_actionTypes.DEPOSIT_REFRESH, deposit);
	      };
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'emitterPromise', this).call(this, new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'requestDeposit', _this9).call(_this9, { currency: currency, value: value, depositMethodId: depositMethodId }).then(function (deposit) {
	          (0, _listener.registerEventEmitter)({ ClOrdID: deposit.ClOrdID }, subscribeEvent);
	          return resolve(deposit);
	        }).catch(reject);
	      })).nodeify(callback);
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
	      var _this10 = this;
	
	      var amount = _ref4.amount,
	          data = _ref4.data,
	          _ref4$currency = _ref4.currency,
	          currency = _ref4$currency === undefined ? 'BTC' : _ref4$currency,
	          _ref4$method = _ref4.method,
	          method = _ref4$method === undefined ? 'bitcoin' : _ref4$method;
	
	      var subscribeEvent = function subscribeEvent(withdraw) {
	        callback && callback(null, withdraw);
	        return _this10.eventEmitter.emit(_actionTypes.WITHDRAW_REFRESH, withdraw);
	      };
	
	      return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'emitterPromise', this).call(this, new Promise(function (resolve, reject) {
	        return _get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'requestWithdraw', _this10).call(_this10, { amount: amount, data: data, currency: currency, method: method }).then(function (withdraw) {
	          (0, _listener.registerEventEmitter)({ ClOrdID: withdraw.ClOrdID }, subscribeEvent);
	          return resolve(withdraw);
	        }).catch(reject);
	      })).nodeify(callback);
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
	}(_wsTransport2.default);
	
	exports.default = BlinkTradeWS;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("nodeify");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("eventemitter2");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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
	
	exports.getListeners = getListeners;
	exports.generateRequestId = generateRequestId;
	exports.getListener = getListener;
	exports.getRequest = getRequest;
	exports.registerRequest = registerRequest;
	exports.registerEventEmitter = registerEventEmitter;
	exports.registerListener = registerListener;
	exports.deleteRequest = deleteRequest;
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _requestTypes = __webpack_require__(7);
	
	var RequestTypes = _interopRequireWildcard(_requestTypes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var requests = {};
	var listeners = {};
	
	function getListeners() {
	  return requests;
	}
	
	function generateRequestId() {
	  return parseInt(String(1e7 * Math.random()), 10);
	}
	
	function getListener(msgType) {
	  return listeners[msgType];
	}
	
	function getRequest(message) {
	  var result = void 0;
	  _lodash2.default.mapKeys(RequestTypes, function (key) {
	    if (_lodash2.default.has(message, key)) {
	      result = _lodash2.default.find(requests[key], { ReqId: String(message[key]) });
	    }
	  });
	
	  return result;
	}
	
	function registerRequest(message, promise) {
	  _lodash2.default.mapKeys(RequestTypes, function (key) {
	    if (_lodash2.default.has(message, key)) {
	      requests[key] = requests[key] || [];
	      requests[key].push(_extends({ ReqId: String(message[key]) }, promise));
	    }
	  });
	
	  return requests;
	}
	
	function registerEventEmitter(message, callback) {
	  _lodash2.default.mapKeys(RequestTypes, function (key) {
	    if (_lodash2.default.has(message, key)) {
	      if (requests[key] !== []) {
	        var index = _lodash2.default.findIndex(requests[key], { ReqId: String(message[key]) });
	        requests[key][index] = _extends({}, requests[key][index], {
	          resolve: null,
	          reject: null,
	          callback: callback
	        });
	      }
	    }
	  });
	
	  return requests;
	}
	
	function registerListener(msgType, callback) {
	  listeners[msgType] = listeners[msgType] || [];
	  listeners[msgType] = callback;
	}
	
	function deleteRequest(key) {
	  requests = _lodash2.default.omit(requests, [key]);
	  return requests;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SOCKET_ID = exports.SOCKET_ID = 'SocketID';
	var REQUEST_ID = exports.REQUEST_ID = 'ReqID';
	var TEST_REQUEST_ID = exports.TEST_REQUEST_ID = 'TestReqID';
	var USER_REQUEST_ID = exports.USER_REQUEST_ID = 'UserReqID';
	var SECURITY_REQUEST_ID = exports.SECURITY_REQUEST_ID = 'SecurityReqID';
	var RESET_PASSWORD_REQUEST_ID = exports.RESET_PASSWORD_REQUEST_ID = 'ResetPasswordReqID';
	var DEPOSIT_REQUEST_ID = exports.DEPOSIT_REQUEST_ID = 'DepositReqID';
	var WITHDRAW_REQUEST_ID = exports.WITHDRAW_REQUEST_ID = 'WithdrawReqID';
	var BALANCE_REQUEST_ID = exports.BALANCE_REQUEST_ID = 'BalanceReqID';
	var ORDERS_REQUEST_ID = exports.ORDERS_REQUEST_ID = 'OrdersReqID';
	var ENABLE_TWO_FACTOR_REQUEST_ID = exports.ENABLE_TWO_FACTOR_REQUEST_ID = 'EnableTwoFactorReqID';
	var DEPOSIT_METHOD_REQUEST_ID = exports.DEPOSIT_METHOD_REQUEST_ID = 'DepositMethodReqID';
	var WITHDRAW_LIST_REQUEST_ID = exports.WITHDRAW_LIST_REQUEST_ID = 'WithdrawListReqID';
	var BROKER_LIST_REQUEST_ID = exports.BROKER_LIST_REQUEST_ID = 'BrokerListReqID';
	var DEPOSIT_LIST_REQUEST_ID = exports.DEPOSIT_LIST_REQUEST_ID = 'DepositListReqID';
	var TRADE_HISTORY_REQUEST_ID = exports.TRADE_HISTORY_REQUEST_ID = 'TradeHistoryReqID';
	var LEDGER_LIST_REQUEST_ID = exports.LEDGER_LIST_REQUEST_ID = 'LedgerListReqID';
	var TRADERS_RANK_REQUEST_ID = exports.TRADERS_RANK_REQUEST_ID = 'TradersRankReqID';
	var UPDATE_REQUEST_ID = exports.UPDATE_REQUEST_ID = 'UpdateReqID';
	var POSITION_REQUEST_ID = exports.POSITION_REQUEST_ID = 'PositionReqID';
	var SECURITY_STATUS_REQUEST_ID = exports.SECURITY_STATUS_REQUEST_ID = 'SecurityStatusReqID';
	var API_KEY_LIST_REQUEST_ID = exports.API_KEY_LIST_REQUEST_ID = 'APIKeyListReqID';
	var API_KEY_CREATE_REQUEST_ID = exports.API_KEY_CREATE_REQUEST_ID = 'APIKeyCreateReqID';
	var API_KEY_REVOKE_REQUEST_ID = exports.API_KEY_REVOKE_REQUEST_ID = 'APIKeyRevokeReqID';
	var PROCESS_DEPOSIT_REQUEST_ID = exports.PROCESS_DEPOSIT_REQUEST_ID = 'ProcessDepositReqID';
	var CUSTOMER_LIST_REQUEST_ID = exports.CUSTOMER_LIST_REQUEST_ID = 'CustomerListReqID';
	var CUSTOMER_REQUEST_ID = exports.CUSTOMER_REQUEST_ID = 'CustomerReqID';
	var PROCESS_WITHDRAW_REQUEST_ID = exports.PROCESS_WITHDRAW_REQUEST_ID = 'ProcessWithdrawReqID';
	var VERIFY_CUSTOMER_REQUEST_ID = exports.VERIFY_CUSTOMER_REQUEST_ID = 'VerifyCustomerReqID';
	var MD_REQUEST_ID = exports.MD_REQUEST_ID = 'MDReqID';
	var CLIENT_ORDER_ID = exports.CLIENT_ORDER_ID = 'ClOrdID';

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BALANCE = exports.BALANCE = 'BALANCE';
	
	var ORDER_BOOK = exports.ORDER_BOOK = 'OB';
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
	
	var DEPOSIT_REFRESH = exports.DEPOSIT_REFRESH = 'DEPOSIT_REFRESH';
	var WITHDRAW_REFRESH = exports.WITHDRAW_REFRESH = 'WITHDRAW_REFRESH';
	
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
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  HEARTBEAT: '1',
	  LOGIN: 'BE',
	  LOGOUT: 'BE',
	  CHANGE_PASSWORD: 'BE',
	
	  MARKET_DATA_FULL_REFRESH: 'V',
	  MARKET_DATA_UNSUBSCRIBE: 'V',
	
	  ORDER_SEND: 'D',
	  ORDER_CANCEL: 'F',
	
	  SECURITY_LIST: 'x',
	  SECURITY_STATUS: 'e',
	  BALANCE: 'U2',
	  ORDER_LIST: 'U4',
	  BROKER_LIST: 'U28',
	  TRADE_HISTORY: 'U32',
	  PROFILE_UPDATE: 'U38',
	
	  REQUEST_DEPOSIT: 'U18',
	  REQUEST_DEPOSIT_LIST: 'U30',
	  REQUEST_DEPOSIT_METHODS: 'U20',
	  REQUEST_WITHDRAW: 'U6',
	  REQUEST_WITHDRAW_LIST: 'U26',
	
	  REQUEST_LEDGER: 'U34',
	
	  CONFIRM_WITHDRAW: 'U24',
	  CANCEL_WITHDRAW: 'U70'
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _nodeify = __webpack_require__(4);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _fingerprintjs = __webpack_require__(11);
	
	var _fingerprintjs2 = _interopRequireDefault(_fingerprintjs);
	
	var _eventemitter = __webpack_require__(5);
	
	var _baseTransport = __webpack_require__(12);
	
	var _baseTransport2 = _interopRequireDefault(_baseTransport);
	
	var _listener = __webpack_require__(6);
	
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
	
	/* eslint-disable global-require */
	
	var WebSocketTransport = function (_BaseTransport) {
	  _inherits(WebSocketTransport, _BaseTransport);
	
	  /*
	   * Transport Promise
	   */
	
	
	  /*
	   * FingerPrint
	   */
	  function WebSocketTransport(params) {
	    _classCallCheck(this, WebSocketTransport);
	
	    var _this = _possibleConstructorReturn(this, (WebSocketTransport.__proto__ || Object.getPrototypeOf(WebSocketTransport)).call(this, params, 'ws'));
	
	    _this.stun = { local: null, public: [] };
	
	    _this.getStun();
	    _this.getFingerPrint();
	
	    _this.eventEmitter = new _eventemitter.EventEmitter2({ wildcard: true, delimiter: ':' });
	    return _this;
	  }
	
	  /*
	   * Event emitter to dispatch websocket updates
	   */
	
	
	  /*
	   * Stun object
	   */
	
	
	  /*
	   * WebSocket Instance
	   */
	
	
	  _createClass(WebSocketTransport, [{
	    key: 'connect',
	    value: function connect(callback) {
	      var _this2 = this;
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        _this2.request = { resolve: resolve, reject: reject };
	
	        var WebSocket = _this2.isNode ? __webpack_require__(15) : window.WebSocket;
	
	        _this2.socket = new WebSocket(_this2.endpoint);
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
	    value: function onError() {
	      this.request.reject();
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
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        var promise = { resolve: resolve, reject: reject };
	
	        if (!msg) {
	          return reject('Missing Message');
	        }
	
	        (0, _listener.registerRequest)(msg, promise);
	
	        // Send promise to sendMessage to we can mock it.
	        _this3.sendMessage(msg, promise);
	      }));
	    }
	  }, {
	    key: 'onMessage',
	    value: function onMessage(msg) {
	      var data = JSON.parse(msg.data);
	      if (data.MsgType === 'ERROR') {
	        throw new Error('Error: ' + data.Detail + ' ' + data.Description);
	      }
	
	      var request = (0, _listener.getRequest)(data);
	      var listener = (0, _listener.getListener)(data.MsgType);
	      this.dispatchPromise(request, data);
	      this.dispatchListeners(listener, data);
	    }
	  }, {
	    key: 'dispatchPromise',
	    value: function dispatchPromise(request, data) {
	      if (request) {
	        return request.resolve ? request.resolve(data) : request.callback ? request.callback(data) : null;
	      }
	    }
	  }, {
	    key: 'dispatchListeners',
	    value: function dispatchListeners(listener, data) {
	      return listener && listener(data);
	    }
	
	    /* eslint-disable no-param-reassign */
	
	  }, {
	    key: 'emitterPromise',
	    value: function emitterPromise(promise) {
	      var _this4 = this;
	
	      promise.on = function (event, listener) {
	        _this4.eventEmitter.on(event, listener);
	        return promise;
	      };
	      promise.onAny = function (listener) {
	        _this4.eventEmitter.onAny(listener);
	        return promise;
	      };
	      promise.offAny = function (listener) {
	        _this4.eventEmitter.offAny(listener);
	        return promise;
	      };
	      promise.once = function (event, listener) {
	        _this4.eventEmitter.once(event, listener);
	        return promise;
	      };
	      promise.many = function (event, times, listener) {
	        _this4.eventEmitter.many(event, times, listener);
	        return promise;
	      };
	      promise.removeListener = function (event, listener) {
	        _this4.eventEmitter.removeListener(event, listener);
	        return promise;
	      };
	      promise.removeAllListeners = function (events) {
	        _this4.eventEmitter.removeAllListeners(events);
	        return promise;
	      };
	
	      return _nodeify2.default.extend(promise);
	    }
	    /* eslint-enable no-param-reassign */
	
	  }, {
	    key: 'getFingerPrint',
	    value: function getFingerPrint() {
	      var _this5 = this;
	
	      if (this.isNode) {
	        return __webpack_require__(16).getMac(function (macAddress) {
	          _this5.fingerPrint = macAddress;
	        });
	      }
	      return new _fingerprintjs2.default().get(function (fingerPrint) {
	        _this5.fingerPrint = Math.abs(__webpack_require__(18).encodeByteArray(fingerPrint));
	      });
	    }
	  }, {
	    key: 'getStun',
	    value: function getStun() {
	      var _this6 = this;
	
	      if (this.isNode) {
	        __webpack_require__(19).getStun(function (data) {
	          _this6.stun = data;
	        });
	      }
	    }
	  }]);
	
	  return WebSocketTransport;
	}(_baseTransport2.default);
	
	exports.default = WebSocketTransport;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fingerprintjs2");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _nodeify = __webpack_require__(4);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _base = __webpack_require__(13);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _requests = __webpack_require__(9);
	
	var _requests2 = _interopRequireDefault(_requests);
	
	var _requestTypes = __webpack_require__(7);
	
	var RequestTypes = _interopRequireWildcard(_requestTypes);
	
	var _listener = __webpack_require__(6);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
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
	
	var BaseTransport = function (_Base) {
	  _inherits(BaseTransport, _Base);
	
	  function BaseTransport(params, env) {
	    _classCallCheck(this, BaseTransport);
	
	    var _this = _possibleConstructorReturn(this, (BaseTransport.__proto__ || Object.getPrototypeOf(BaseTransport)).call(this, params, env));
	
	    _this.send = env === 'ws' ? _this.sendMessageAsPromise : _this.fetchTrade;
	    return _this;
	  }
	
	  _createClass(BaseTransport, [{
	    key: 'balance',
	    value: function balance(callback) {
	      var _this2 = this;
	
	      var msg = {
	        MsgType: _requests2.default.BALANCE,
	        BalanceReqID: (0, _listener.generateRequestId)()
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this2.send(msg).then(function (data) {
	          var Available = {};
	          var balances = data[_this2.brokerId];
	          Object.keys(balances).map(function (currency) {
	            if (!currency.includes('locked')) {
	              Available[currency] = balances[currency] - balances[currency + '_locked'];
	            }
	            return Available;
	          });
	
	          return resolve(_extends({}, data, { Available: Available }));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'myOrders',
	    value: function myOrders() {
	      var _this3 = this;
	
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$page = _ref.page,
	          Page = _ref$page === undefined ? 0 : _ref$page,
	          _ref$pageSize = _ref.pageSize,
	          PageSize = _ref$pageSize === undefined ? 40 : _ref$pageSize;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _requests2.default.ORDER_LIST,
	        OrdersReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this3.send(msg).then(function (data) {
	          var Columns = data.Columns,
	              orders = _objectWithoutProperties(data, ['Columns']);
	
	          var OrdListGrp = _lodash2.default.map(data.OrdListGrp, function (order) {
	            return _lodash2.default.zipObject(Columns, order);
	          });
	          return resolve(_extends({}, orders, {
	            OrdListGrp: OrdListGrp
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'sendOrder',
	    value: function sendOrder(_ref2, callback) {
	      var _this4 = this;
	
	      var side = _ref2.side,
	          amount = _ref2.amount,
	          price = _ref2.price,
	          symbol = _ref2.symbol;
	
	      var msg = {
	        MsgType: _requests2.default.ORDER_SEND,
	        ClOrdID: (0, _listener.generateRequestId)(),
	        Symbol: symbol,
	        Side: side,
	        OrdType: '2',
	        Price: price,
	        OrderQty: amount,
	        BrokerID: this.brokerId
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this4.send(msg).then(function (data) {
	          (0, _listener.deleteRequest)(RequestTypes.CLIENT_ORDER_ID);
	          resolve(data);
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'cancelOrder',
	    value: function cancelOrder() {
	      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var callback = arguments[1];
	
	      var orderId = param.orderId ? param.orderId : param;
	      var msg = {
	        MsgType: _requests2.default.ORDER_CANCEL
	      };
	
	      if (param.clientId) {
	        msg.ClOrdID = param.clientId;
	      }
	
	      if (param.orderId) {
	        msg.OrderID = orderId;
	      }
	
	      return this.send(msg).nodeify(callback);
	    }
	
	    /**
	     * statusList: 1-Pending, 2-In Progress, 4-Completed, 8-Cancelled
	     */
	
	  }, {
	    key: 'requestWithdrawList',
	    value: function requestWithdrawList() {
	      var _this5 = this;
	
	      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref3$page = _ref3.page,
	          Page = _ref3$page === undefined ? 0 : _ref3$page,
	          _ref3$pageSize = _ref3.pageSize,
	          PageSize = _ref3$pageSize === undefined ? 20 : _ref3$pageSize,
	          _ref3$statusList = _ref3.statusList,
	          StatusList = _ref3$statusList === undefined ? ['1', '2', '4', '8'] : _ref3$statusList;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _requests2.default.REQUEST_WITHDRAW_LIST,
	        WithdrawListReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize,
	        StatusList: StatusList
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this5.send(msg).then(function (data) {
	          var Columns = data.Columns,
	              withdrawData = _objectWithoutProperties(data, ['Columns']);
	
	          var WithdrawListGrp = _lodash2.default.map(data.WithdrawListGrp, function (withdraw) {
	            return _lodash2.default.zipObject(Columns, withdraw);
	          });
	          return resolve(_extends({}, withdrawData, {
	            WithdrawListGrp: WithdrawListGrp
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
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
	        MsgType: _requests2.default.REQUEST_WITHDRAW,
	        WithdrawReqID: reqId,
	        ClOrdID: reqId,
	        Method: method,
	        Amount: amount,
	        Currency: currency,
	        Data: data
	      };
	
	      return this.send(msg).nodeify(callback);
	    }
	  }, {
	    key: 'confirmWithdraw',
	    value: function confirmWithdraw(_ref5, callback) {
	      var _this6 = this;
	
	      var WithdrawID = _ref5.withdrawId,
	          confirmationToken = _ref5.confirmationToken,
	          secondFactor = _ref5.secondFactor;
	
	      var msg = {
	        MsgType: _requests2.default.CONFIRM_WITHDRAW,
	        WithdrawReqID: (0, _listener.generateRequestId)(),
	        WithdrawID: WithdrawID
	      };
	
	      if (confirmationToken) {
	        msg.ConfirmationToken = confirmationToken;
	      }
	
	      if (secondFactor) {
	        msg.SecondFactor = secondFactor;
	      }
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this6.send(msg).then(function (data) {
	          return resolve(_extends({}, data));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'cancelWithdraw',
	    value: function cancelWithdraw(withdrawId, callback) {
	      var _this7 = this;
	
	      var reqId = (0, _listener.generateRequestId)();
	      var msg = {
	        MsgType: _requests2.default.CANCEL_WITHDRAW,
	        WithdrawCancelReqID: reqId,
	        ClOrdID: reqId,
	        WithdrawID: withdrawId
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this7.send(msg).then(function (data) {
	          return resolve(_extends({}, data));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }, {
	    key: 'requestDepositList',
	    value: function requestDepositList() {
	      var _this8 = this;
	
	      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref6$page = _ref6.page,
	          Page = _ref6$page === undefined ? 0 : _ref6$page,
	          _ref6$pageSize = _ref6.pageSize,
	          PageSize = _ref6$pageSize === undefined ? 20 : _ref6$pageSize,
	          _ref6$status = _ref6.status,
	          StatusList = _ref6$status === undefined ? ['1', '2', '4', '8'] : _ref6$status;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _requests2.default.REQUEST_DEPOSIT_LIST,
	        DepositListReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize,
	        StatusList: StatusList
	      };
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this8.send(msg).then(function (data) {
	          var Columns = data.Columns,
	              depositData = _objectWithoutProperties(data, ['Columns']);
	
	          var DepositListGrp = _lodash2.default.map(data.DepositListGrp, function (deposit) {
	            return _lodash2.default.zipObject(Columns, deposit);
	          });
	          return resolve(_extends({}, depositData, {
	            DepositListGrp: DepositListGrp
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
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
	        MsgType: _requests2.default.REQUEST_DEPOSIT,
	        DepositReqID: reqId,
	        ClOrdID: reqId,
	        Currency: currency,
	        BrokerID: this.brokerId
	      };
	
	      if (currency !== 'BTC') {
	        msg.DepositMethodID = depositMethodId;
	        msg.Value = value;
	      }
	
	      return this.send(msg).nodeify(callback);
	    }
	  }, {
	    key: 'requestDepositMethods',
	    value: function requestDepositMethods(callback) {
	      var msg = {
	        MsgType: _requests2.default.REQUEST_DEPOSIT_METHODS,
	        DepositMethodReqID: (0, _listener.generateRequestId)()
	      };
	
	      return this.send(msg).nodeify(callback);
	    }
	  }, {
	    key: 'requestLedger',
	    value: function requestLedger() {
	      var _this9 = this;
	
	      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref8$page = _ref8.page,
	          Page = _ref8$page === undefined ? 0 : _ref8$page,
	          _ref8$pageSize = _ref8.pageSize,
	          PageSize = _ref8$pageSize === undefined ? 20 : _ref8$pageSize,
	          currency = _ref8.currency,
	          filter = _ref8.filter;
	
	      var callback = arguments[1];
	
	      var msg = {
	        MsgType: _requests2.default.REQUEST_LEDGER,
	        LedgerListReqID: (0, _listener.generateRequestId)(),
	        Page: Page,
	        PageSize: PageSize
	      };
	
	      if (currency) {
	        msg.Currency = currency;
	      }
	      if (filter) {
	        msg.Filter = filter;
	      }
	
	      return _nodeify2.default.extend(new Promise(function (resolve, reject) {
	        return _this9.send(msg).then(function (data) {
	          var Columns = data.Columns,
	              ledgerData = _objectWithoutProperties(data, ['Columns']);
	
	          var LedgerListGrp = _lodash2.default.map(data.LedgerListGrp, function (ledger) {
	            return _lodash2.default.zipObject(Columns, ledger);
	          });
	          resolve(_extends({}, ledgerData, {
	            LedgerListGrp: LedgerListGrp
	          }));
	        }).catch(reject);
	      })).nodeify(callback);
	    }
	  }]);
	
	  return BaseTransport;
	}(_base2.default);
	
	exports.default = BaseTransport;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(14);
	
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
	
	var Base =
	
	/*
	 * Broker id
	 */
	function Base() {
	  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var env = arguments[1];
	
	  _classCallCheck(this, Base);
	
	  var endpoint = params.url ? params.url : params.prod ? _common2.default.prod[env] : _common2.default.testnet[env];
	
	  this.brokerId = params.brokerId || 5;
	
	  this.endpoint = endpoint;
	
	  this.isNode = typeof window === 'undefined';
	}
	
	/*
	 * Is node.js environment.
	 */
	
	
	/*
	 * url endpoint.
	 */
	;
	
	exports.default = Base;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  prod: {
	    ws: 'wss://api.blinktrade.com/trade/',
	    rest: 'https://api.blinktrade.com/'
	  },
	  testnet: {
	    ws: 'wss://api.testnet.blinktrade.com/trade/',
	    rest: 'https://api.testnet.blinktrade.com/'
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("ws");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMac = getMac;
	
	var _macaddress = __webpack_require__(17);
	
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
/* 17 */
/***/ function(module, exports) {

	module.exports = require("macaddress");

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encodeByteArray = encodeByteArray;
	/* eslint-disable no-var */
	/* eslint-disable no-bitwise */
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-fallthrough */
	/* eslint-disable no-underscore-dangle */
	/* eslint-disable default-case */
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
	function encodeByteArray(bytes) {
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
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
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
	
	exports.getStun = getStun;
	
	var _ip = __webpack_require__(24);
	
	var _ip2 = _interopRequireDefault(_ip);
	
	var _dgram = __webpack_require__(25);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20).Buffer))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(21)
	var ieee754 = __webpack_require__(22)
	var isArray = __webpack_require__(23)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("base64-js");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("ieee754");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("isarray");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("ip");

/***/ },
/* 25 */
/***/ function(module, exports) {



/***/ },
/* 26 */
/***/ function(module, exports) {

	exports.endianness = function () { return 'LE' };
	
	exports.hostname = function () {
	    if (typeof location !== 'undefined') {
	        return location.hostname
	    }
	    else return '';
	};
	
	exports.loadavg = function () { return [] };
	
	exports.uptime = function () { return 0 };
	
	exports.freemem = function () {
	    return Number.MAX_VALUE;
	};
	
	exports.totalmem = function () {
	    return Number.MAX_VALUE;
	};
	
	exports.cpus = function () { return [] };
	
	exports.type = function () { return 'Browser' };
	
	exports.release = function () {
	    if (typeof navigator !== 'undefined') {
	        return navigator.appVersion;
	    }
	    return '';
	};
	
	exports.networkInterfaces
	= exports.getNetworkInterfaces
	= function () { return {} };
	
	exports.arch = function () { return 'javascript' };
	
	exports.platform = function () { return 'browser' };
	
	exports.tmpdir = exports.tmpDir = function () {
	    return '/tmp';
	};
	
	exports.EOL = '\n';


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _restTransport = __webpack_require__(28);
	
	var _restTransport2 = _interopRequireDefault(_restTransport);
	
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
	
	var BlinkTradeRest = function (_RestTransport) {
	  _inherits(BlinkTradeRest, _RestTransport);
	
	  function BlinkTradeRest() {
	    _classCallCheck(this, BlinkTradeRest);
	
	    return _possibleConstructorReturn(this, (BlinkTradeRest.__proto__ || Object.getPrototypeOf(BlinkTradeRest)).apply(this, arguments));
	  }
	
	  _createClass(BlinkTradeRest, [{
	    key: 'ticker',
	    value: function ticker(callback) {
	      return _get(BlinkTradeRest.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeRest.prototype), 'fetchPublic', this).call(this, 'ticker', callback);
	    }
	  }, {
	    key: 'trades',
	    value: function trades() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$limit = _ref.limit,
	          limit = _ref$limit === undefined ? 1000 : _ref$limit,
	          _ref$since = _ref.since,
	          since = _ref$since === undefined ? '0' : _ref$since;
	
	      var callback = arguments[1];
	
	      return _get(BlinkTradeRest.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeRest.prototype), 'fetchPublic', this).call(this, 'trades?limit=' + limit + '&since=' + since, callback);
	    }
	  }, {
	    key: 'orderbook',
	    value: function orderbook(callback) {
	      return _get(BlinkTradeRest.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeRest.prototype), 'fetchPublic', this).call(this, 'orderbook', callback);
	    }
	  }]);
	
	  return BlinkTradeRest;
	}(_restTransport2.default);
	
	exports.default = BlinkTradeRest;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sjcl = __webpack_require__(29);
	
	var _sjcl2 = _interopRequireDefault(_sjcl);
	
	var _nodeify = __webpack_require__(4);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _url = __webpack_require__(30);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _path = __webpack_require__(31);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _baseTransport = __webpack_require__(12);
	
	var _baseTransport2 = _interopRequireDefault(_baseTransport);
	
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
	
	var RestTransport = function (_BaseTransport) {
	  _inherits(RestTransport, _BaseTransport);
	
	  /**
	   * Exchanges currencies available.
	   */
	
	
	  /**
	   * APIKey
	   */
	  function RestTransport(params) {
	    _classCallCheck(this, RestTransport);
	
	    var _this = _possibleConstructorReturn(this, (RestTransport.__proto__ || Object.getPrototypeOf(RestTransport)).call(this, params, 'rest'));
	
	    _this.key = params.key;
	    _this.secret = params.secret;
	    _this.currency = params.currency || 'USD';
	
	    _this.fetchRequest = _this.isNode ? __webpack_require__(33) : __webpack_require__(34);
	    return _this;
	  }
	
	  /**
	   * Fetch rest API
	   */
	
	
	  /**
	   * APISecret
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
	
	      return this.fetchRequest(_url2.default.resolve(this.endpoint, api), headers).then(function (response) {
	        return response.json();
	      });
	    }
	  }, {
	    key: 'fetchPublic',
	    value: function fetchPublic(api, callback) {
	      return (0, _nodeify2.default)(this.fetch({}, _path2.default.join('api/v1', this.currency, api)), callback);
	    }
	  }, {
	    key: 'fetchTrade',
	    value: function fetchTrade(msg, callback) {
	      var headers = this.headers('POST', msg);
	      return _nodeify2.default.extend(this.fetch(msg, 'tapi/v1/message', headers, callback).then(function (response) {
	        return response.Status === 500 ? Promise.reject(response) : response.Responses;
	      }).then(function (response) {
	        return response.length === 1 ? response[0] : response;
	      }));
	    }
	  }]);
	
	  return RestTransport;
	}(_baseTransport2.default);
	
	exports.default = RestTransport;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("sjcl");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("fetch-jsonp");

/***/ }
/******/ ]);
//# sourceMappingURL=blinktrade.js.map