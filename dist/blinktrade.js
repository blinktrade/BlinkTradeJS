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
	
	var _rest = __webpack_require__(23);
	
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
	        var os = __webpack_require__(22);
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
	        BrokerID: brokerId || this.brokerId,
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
	
	      return _nodeify2.default.extend(_get(BlinkTradeWS.prototype.__proto__ || Object.getPrototypeOf(BlinkTradeWS.prototype), 'sendMessageAsPromise', this).call(this, msg)).nodeify(callback);
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
	      }), callback);
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
	      }), callback);
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
	
	var WebSocketTransport = function (_BaseTransport) {
	  _inherits(WebSocketTransport, _BaseTransport);
	
	  /*
	   * Transport Promise
	   */
	
	
	  /*
	   * FingerPrint
	   */
	  function WebSocketTransport() {
	    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, WebSocketTransport);
	
	    var _this = _possibleConstructorReturn(this, (WebSocketTransport.__proto__ || Object.getPrototypeOf(WebSocketTransport)).call(this, params, 'ws'));
	
	    _this.stun = { local: null, public: [] };
	
	    _this.getStun();
	    _this.getFingerPrint(params.fingerPrint);
	
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
	
	        if (!msg) {
	          return reject('Missing Message');
	        }
	
	        (0, _listener.registerRequest)(msg, promise);
	
	        // Send promise to sendMessage to we can mock it.
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
	  }, {
	    key: 'getFingerPrint',
	    value: function getFingerPrint(customFingerprint) {
	      var _this4 = this;
	
	      if (this.isNode) {
	        return __webpack_require__(16).getMac(function (macAddress) {
	          _this4.fingerPrint = macAddress;
	        });
	      } else if (this.isBrowser) {
	        return new _fingerprintjs2.default().get(function (fingerPrint) {
	          _this4.fingerPrint = Math.abs(__webpack_require__(18).encodeByteArray(fingerPrint)).toString();
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
	        __webpack_require__(19).getStun(function (data) {
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
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
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
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
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
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
	    }
	  }, {
	    key: 'requestDepositMethods',
	    value: function requestDepositMethods(callback) {
	      var msg = {
	        MsgType: _requests2.default.REQUEST_DEPOSIT_METHODS,
	        DepositMethodReqID: (0, _listener.generateRequestId)()
	      };
	
	      return _nodeify2.default.extend(this.send(msg)).nodeify(callback);
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
	 * Is node.js environment.
	 */
	
	
	/*
	 * url endpoint.
	 */
	function Base() {
	  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var env = arguments[1];
	
	  _classCallCheck(this, Base);
	
	  var endpoint = params.url ? params.url : params.prod ? _common2.default.prod[env] : _common2.default.testnet[env];
	
	  this.brokerId = params.brokerId || 5;
	
	  this.endpoint = endpoint;
	
	  this.isNode = typeof window === 'undefined';
	  this.isBrowser = typeof document !== 'undefined';
	}
	
	/*
	 * Is browser environment.
	 */
	
	
	/*
	 * Broker id
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
	    ws: 'wss://ws.blinktrade.com/trade/',
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
	
	exports.getStun = getStun;
	
	var _ip = __webpack_require__(20);
	
	var _ip2 = _interopRequireDefault(_ip);
	
	var _dgram = __webpack_require__(21);
	
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
/* 20 */
/***/ function(module, exports) {

	module.exports = require("ip");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("dgram");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _restTransport = __webpack_require__(24);
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sjcl = __webpack_require__(25);
	
	var _sjcl2 = _interopRequireDefault(_sjcl);
	
	var _nodeify = __webpack_require__(4);
	
	var _nodeify2 = _interopRequireDefault(_nodeify);
	
	var _url = __webpack_require__(26);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _path = __webpack_require__(27);
	
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
	
	    _this.fetchRequest = _this.isNode ? __webpack_require__(28) : _this.isBrowser ? __webpack_require__(29) : window.fetch;
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
/* 25 */
/***/ function(module, exports) {

	module.exports = require("sjcl");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("fetch-jsonp");

/***/ }
/******/ ]);
//# sourceMappingURL=blinktrade.js.map