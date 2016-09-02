!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.BlinkTradeRest=t.BlinkTradeWS=void 0;var o=r(1),i=n(o),u=r(18),s=n(u);t.BlinkTradeWS=i["default"],t.BlinkTradeRest=s["default"]},function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r={};for(var n in e)t.indexOf(n)<0&&Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;arguments.length>t;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f=function(){function e(e,t){for(var r=0;t.length>r;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),p=function I(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:I(o,t,r)}if("value"in n)return n.value;var i=n.get;if(void 0!==i)return i.call(r)},d=r(2),E=o(d),_=r(3),y=n(_),R=r(4),O=o(R),T=r(16),v=r(9),D=r(17),h=function(e){function t(e){s(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.eventEmitter=new T.EventEmitter,r}return c(t,e),f(t,[{key:"heartbeat",value:function(e){var r=this,n=new Date,o={MsgType:E["default"].HEARTBEAT,TestReqID:n.getTime(),SendTime:n.getTime()};return new Promise(function(n,i){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",r).call(r,o,e).then(function(e){return n(l({},e,{Latency:new Date(Date.now())-e.SendTime}))})["catch"](i)})}},{key:"login",value:function(e,r,n,o){var i=this,u=void 0;this.isNode||(u={UserAgent:window.navigator.userAgent,UserAgentLanguage:window.navigator.language,UserAgentPlatform:window.navigator.platform,UserAgentTimezoneOffset:(new Date).getTimezoneOffset()});var s=l({MsgType:E["default"].LOGIN,UserReqID:(0,v.generateRequestId)(),BrokerID:this.brokerId,Username:e,Password:r,UserReqTyp:"1"},u);return n&&(s.SecondFactor=n),new Promise(function(e,r){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",i).call(i,s,o).then(function(t){return 1===t.UserStatus?(i.session=t,e(t)):r(t)})})}},{key:"logout",value:function(e){var r={MsgType:E["default"].LOGOUT,BrokerID:this.brokerId,UserReqID:(0,v.generateRequestId)(),Username:this.session.Username,UserReqTyp:"2"};return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",this).call(this,r,e)}},{key:"profile",value:function r(e){var t=this.session.Profile,r=u(t,["VerificationData"]);return e?e(r):Promise.resolve(r)}},{key:"changePassword",value:function(e,r,n,o){var i={MsgType:E["default"].CHANGE_PASSWORD,UserReqID:(0,v.generateRequestId)(),UserReqTyp:"3",BrokerID:this.brokerId,Username:e,Password:r,NewPassword:n};return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",this).call(this,i,o)}},{key:"balance",value:function(e){var r=this,n={MsgType:E["default"].BALANCE,BalanceReqID:(0,v.generateRequestId)()};(0,v.registerListener)("U3",function(t){return e&&e(null,t),r.eventEmitter.emit(D.BALANCE,t)});var o=new Promise(function(o,i){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",r).call(r,n,e).then(function(e){var t={},n=e[r.brokerId];return Object.keys(n).map(function(e){e.includes("locked")||(t[e]=n[e]-n[e+"_locked"])}),o(l({},e,{Available:t}))})["catch"](i)});return o.on=function(){var e;return(e=r.eventEmitter).on.apply(e,arguments),o},o}},{key:"subscribeTicker",value:function(e,r){var n=this,o={MsgType:E["default"].SECURITY_STATUS,SecurityStatusReqID:(0,v.generateRequestId)(),SubscriptionRequestType:"1",Instruments:e},i=function(e){return l({},e,{SellVolume:e.SellVolume/1e8,LowPx:e.LowPx/1e8,LastPx:e.LastPx/1e8,BestAsk:e.BestAsk/1e8,HighPx:e.HighPx/1e8,BuyVolume:e.BuyVolume/1e8,BestBid:e.BestBid/1e8})},u=new Promise(function(e,u){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",n).call(n,o,r).then(function(t){e(i(t)),(0,v.registerEventEmitter)({SecurityStatusReqID:t.SecurityStatusReqID},function(e){return r&&r(null,i(e)),n.eventEmitter.emit("BLINK:"+t.Symbol,i(e))})})["catch"](u)});return u.on=function(){var e;return(e=n.eventEmitter).on.apply(e,arguments),u},u}},{key:"unSubscribeTicker",value:function(e){var r={MsgType:E["default"].SECURITY_STATUS,SecurityStatusReqID:e,SubscriptionRequestType:"2"};return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessage",this).call(this,r),e}},{key:"subscribeOrderbook",value:function(e,r){var n=this,o={MsgType:E["default"].MARKET_DATA_FULL_REFRESH,MDReqID:(0,v.generateRequestId)(),SubscriptionRequestType:"1",MarketDepth:0,MDUpdateType:"1",MDEntryTypes:["0","1","2"],Instruments:e},u=new Promise(function(e,u){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",n).call(n,o,r).then(function(t){if("W"===t.MsgType){var r=t.MDFullGrp.filter(function(e){return"0"===e.MDEntryType||"1"===e.MDEntryType}).reduce(function(e,t){var r="0"===t.MDEntryType?"bids":"asks";return(e[r]||(e[r]=[])).push([t.MDEntryPx/1e8,t.MDEntrySize/1e8,t.UserID]),e},[]),n=r.bids,o=r.asks;return(0,v.registerEventEmitter)({MDReqID:t.MDReqID},s),e(l({},t,{MDFullGrp:i({},t.Symbol,{bids:n,asks:o})}))}})["catch"](function(e){return u(e)})});u.on=function(){var e;return(e=n.eventEmitter).on.apply(e,arguments),u};var s=function(e){"3"===e.MDBkTyp&&e.MDIncGrp.map(function(e){var t={index:e.MDEntryPositionNo,price:e.MDEntryPx/1e8,size:e.MDEntrySize/1e8,side:"0"===e.MDEntryType?"buy":"sell",userId:e.UserID,orderId:e.OrderID,symbol:e.Symbol,time:""+new Date(e.MDEntryDate+" "+e.MDEntryTime)};switch(r&&r(null,t),e.MDEntryType){case"0":case"1":var o=D.EVENTS.ORDERBOOK[e.MDUpdateAction];return n.eventEmitter.emit(o,l({},t,{type:o}));case"2":var i=D.EVENTS.TRADES[e.MDUpdateAction];return n.eventEmitter.emit(i,l({},t,{type:i}));case"4":break;default:return null}return null})};return u}},{key:"unSubscribeOrderbook",value:function(e){var r={MsgType:E["default"].MARKET_DATA_UNSUBSCRIBE,MDReqID:e,MarketDepth:0,SubscriptionRequestType:"2"};return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessage",this).call(this,r),e}},{key:"sendOrder",value:function(e,r){var n=this,o=e.side,i=e.amount,u=e.price,s=e.symbol,a={MsgType:E["default"].ORDER_SEND,ClOrdID:(0,v.generateRequestId)(),Symbol:s,Side:o,OrdType:"2",Price:u,OrderQty:i,BrokerID:this.brokerId};return new Promise(function(e,o){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",n).call(n,a,r).then(function(t){(0,v.deleteRequest)(y.CLIENT_ORDER_ID),e(t)})["catch"](o)})}},{key:"cancelOrder",value:function(e,r,n){var o={MsgType:E["default"].ORDER_CANCEL,OrderID:e};return r&&(o.ClOrdID=r),p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",this).call(this,o,n)}},{key:"myOrders",value:function(e,r,n){var o=this,i={MsgType:E["default"].ORDER_LIST,OrdersReqID:(0,v.generateRequestId)(),Page:e||0,PageSize:r||40};return new Promise(function(e,r){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",o).call(o,i,n).then(function(t){var r=u(t,["Columns"]),n=[];return t.OrdListGrp.map(function(e){return n.push({ClOrdID:e[0],OrderID:e[1],CumQty:e[2],OrdStatus:e[3],LeavesQty:e[4],CxlQty:e[5],AvgPx:e[6],Symbol:e[7],Side:e[8],OrdType:e[9],OrderQty:e[10],Price:e[11],OrderDate:e[12],Volume:e[13],TimeInForce:e[14]})}),e(l({},r,{OrdListGrp:n}))})["catch"](r)})}},{key:"executionReport",value:function(e){var t=this;return(0,v.registerListener)("8",function(r){return e&&e(r),t.eventEmitter.emit(D.EVENTS.EXECUTION_REPORT[r.ExecType],r)}),this.eventEmitter}},{key:"tradeHistory",value:function(e,r,n){var o=this,i={MsgType:E["default"].TRADE_HISTORY,TradeHistoryReqID:(0,v.generateRequestId)(),Page:e||0,PageSize:r||80};return new Promise(function(e,r){return p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"sendMessageAsPromise",o).call(o,i,n).then(function(t){var r=0,n=!1,o=u(t,["Columns"]),i={};return t.TradeHistoryGrp.reverse().map(function(e){return n=r===e[3]?n:e[3]>=r,r=e[3],i[e[1]]=i[e[1]]||[],i[e[1]].unshift({TradeID:e[0],Market:e[1],Side:e[2],Price:e[3],Size:e[4],Buyer:e[5],Seller:e[6],Created:e[7],IsPump:n})}),e(l({},o,{TradeHistoryGrp:i}))})["catch"](r)})}}]),t}(O["default"]);t["default"]=h},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={HEARTBEAT:"1",LOGIN:"BE",LOGOUT:"BE",CHANGE_PASSWORD:"BE",MARKET_DATA_FULL_REFRESH:"V",MARKET_DATA_UNSUBSCRIBE:"V",ORDER_SEND:"D",ORDER_CANCEL:"F",SECURITY_LIST:"x",SECURITY_STATUS:"e",BALANCE:"U2",ORDER_LIST:"U4",BROKER_LIST:"U28",TRADE_HISTORY:"U32",PROFILE_UPDATE:"U38",API_KEY_LIST:"U50",API_KEY_CREATE:"U52",API_KEY_REVOKE:"U54"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SOCKET_ID="SocketID",t.REQUEST_ID="ReqID",t.TEST_REQUEST_ID="TestReqID",t.USER_REQUEST_ID="UserReqID",t.SECURITY_REQUEST_ID="SecurityReqID",t.RESET_PASSWORD_REQUEST_ID="ResetPasswordReqID",t.DEPOSIT_REQUEST_ID="DepositReqID",t.WITHDRAW_REQUEST_ID="WithdrawReqID",t.BALANCE_REQUEST_ID="BalanceReqID",t.ORDERS_REQUEST_ID="OrdersReqID",t.ENABLE_TWO_FACTOR_REQUEST_ID="EnableTwoFactorReqID",t.DEPOSIT_METHOD_REQUEST_ID="DepositMethodReqID",t.WITHDRAW_LIST_REQUEST_ID="WithdrawListReqID",t.BROKER_LIST_REQUEST_ID="BrokerListReqID",t.DEPOSIT_LIST_REQUEST_ID="DepositListReqID",t.TRADE_HISTORY_REQUEST_ID="TradeHistoryReqID",t.LEDGER_LIST_REQUEST_ID="LedgerListReqID",t.TRADERS_RANK_REQUEST_ID="TradersRankReqID",t.UPDATE_REQUEST_ID="UpdateReqID",t.POSITION_REQUEST_ID="PositionReqID",t.SECURITY_STATUS_REQUEST_ID="SecurityStatusReqID",t.API_KEY_LIST_REQUEST_ID="APIKeyListReqID",t.API_KEY_CREATE_REQUEST_ID="APIKeyCreateReqID",t.API_KEY_REVOKE_REQUEST_ID="APIKeyRevokeReqID",t.PROCESS_DEPOSIT_REQUEST_ID="ProcessDepositReqID",t.CUSTOMER_LIST_REQUEST_ID="CustomerListReqID",t.CUSTOMER_REQUEST_ID="CustomerReqID",t.PROCESS_WITHDRAW_REQUEST_ID="ProcessWithdrawReqID",t.VERIFY_CUSTOMER_REQUEST_ID="VerifyCustomerReqID",t.MD_REQUEST_ID="MDReqID",t.CLIENT_ORDER_ID="ClOrdID"},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;t.length>r;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(5),c=n(a),l=r(7),f=n(l),p=r(8),d=n(p),E=r(9),_=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,"ws"));return r.getFingerPrint(),r}return u(t,e),s(t,[{key:"connect",value:function(e){var t=this;return d["default"].extend(new Promise(function(e,n){t.promise={resolve:e,reject:n};var o=t.isNode?r(11):window.WebSocket;t.socket=new o(t.endpoint),t.socket.onopen=t.onOpen.bind(t),t.socket.onclose=t.onClose.bind(t),t.socket.onerror=t.onError.bind(t),t.socket.onmessage=t.onMessage.bind(t)})).nodeify(e)}},{key:"disconnect",value:function(){this.socket.close()}},{key:"onOpen",value:function(){this.promise.resolve({connected:!0})}},{key:"onClose",value:function(){}},{key:"onError",value:function(){this.promise.reject()}},{key:"sendMessage",value:function(e){if(1===this.socket.readyState){var t=e;t.FingerPrint=this.fingerPrint,this.socket.send(JSON.stringify(t))}}},{key:"sendMessageAsPromise",value:function(e,t){var r=this;return d["default"].extend(new Promise(function(t,n){var o={resolve:t,reject:n};return e?((0,E.registerRequest)(e,o),void r.sendMessage(e,o)):n("Missing Message")})).nodeify(t)}},{key:"onMessage",value:function(e){var t=JSON.parse(e.data);"ERROR"===t.MsgType&&this.promise.reject("ERROR");var r=(0,E.getRequest)(t),n=(0,E.getListener)(t.MsgType);this.dispatchPromise(r,t),this.dispatchListeners(n,t)}},{key:"dispatchPromise",value:function(e,t){return e&&e.resolve?e.resolve(t):e&&e.callback?e.callback(t):this.promise.reject("ERROR")}},{key:"dispatchListeners",value:function(e,t){return e&&e(t)}},{key:"getFingerPrint",value:function(){var e=this;return this.isNode?r(12).getMac(function(t,r){return e.fingerPrint=r,r}):(new f["default"]).get(function(t){return e.fingerPrint=t,t})}}]),t}(c["default"]);t["default"]=_},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=r(6),u=n(i),s=function a(e,t){o(this,a);var r=e.url?e.url:e.prod?u["default"].prod[t]:u["default"].testnet[t];this.brokerId=e.brokerId||5,this.endpoint=r,this.isNode="undefined"==typeof window};t["default"]=s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={prod:{ws:"wss://api.blinktrade.com/trade/",rest:"https://api.blinktrade.com/api/v1/"},testnet:{ws:"wss://api.testnet.blinktrade.com/trade/",rest:"https://api.testnet.blinktrade.com/tapi/v1/"}}},function(e,t){e.exports=require("fingerprintjs2")},function(e,t){e.exports=require("nodeify")},function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}function i(){return O}function u(){return parseInt(1e7*Math.random()+"",10)}function s(e){return T[e]}function a(e){var t=void 0;return _["default"].mapKeys(R,function(r){_["default"].has(e,r)&&(t=_["default"].find(O[r],{ReqId:""+e[r]}))}),t}function c(e,t){return _["default"].mapKeys(R,function(r){_["default"].has(e,r)&&(O[r]=O[r]||[],O[r].push(d({ReqId:""+e[r]},t)))}),O}function l(e,t){return _["default"].mapKeys(R,function(r){if(_["default"].has(e,r)&&O[r]!==[]){var n=_["default"].findIndex(O[r],{ReqId:""+e[r]});O[r][n]=d({},O[r][n],{resolve:null,reject:null,callback:t})}}),O}function f(e,t){T[e]=T[e]||[],T[e]=t}function p(e){return O=_["default"].omit(O,[e])}Object.defineProperty(t,"__esModule",{value:!0});var d=Object.assign||function(e){for(var t=1;arguments.length>t;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.getListeners=i,t.generateRequestId=u,t.getListener=s,t.getRequest=a,t.registerRequest=c,t.registerEventEmitter=l,t.registerListener=f,t.deleteRequest=p;var E=r(10),_=o(E),y=r(3),R=n(y),O={},T={}},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("ws")},function(e,t,r){(function(t){var n,o,i,u,s,a,c;n=r(14).exec,o=r(15),s=0===t.platform.indexOf("win"),a=/(?:[a-z0-9]{2}[:\-]){5}[a-z0-9]{2}/gi,c=/(?:[0]{2}[:\-]){5}[0]{2}/,i=function(e,t){var r,i,u,l;return l=o(e,t),e=l[0],t=l[1],i=e.data,null==i&&(i=null),r=s?"getmac":"ifconfig -a || ip link",u=function(e,t){var r,n,o,i,u;for(u=null;i=a.exec(e);)o=i[0],n=c.test(o),n===!1&&null==u&&(u=o);return null===u?(r=Error("could not determine the mac address from:\n"+e),t(r)):t(null,u)},i?u(i,t):n(r,function(e,r,n){return e?t(e):u(r,t)})},u=function(e){var t;return 1===(null!=(t=(e+"").match(a))?t.length:void 0)},e.exports={macRegex:a,getMac:i,isMac:u}}).call(t,r(13))},function(e,t){function r(e){if(a===setTimeout)return setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}function n(e){if(c===clearTimeout)return clearTimeout(e);try{return c(e)}catch(t){try{return c.call(null,e)}catch(t){return c.call(this,e)}}}function o(){d&&f&&(d=!1,f.length?p=f.concat(p):E=-1,p.length&&i())}function i(){if(!d){var e=r(o);d=!0;for(var t=p.length;t;){for(f=p,p=[];++E<t;)f&&f[E].run();E=-1,t=p.length}f=null,d=!1,n(e)}}function u(e,t){this.fun=e,this.array=t}function s(){}var a,c,l=e.exports={};!function(){try{a=setTimeout}catch(e){a=function(){throw Error("setTimeout is not defined")}}try{c=clearTimeout}catch(e){c=function(){throw Error("clearTimeout is not defined")}}}();var f,p=[],d=!1,E=-1;l.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;arguments.length>n;n++)t[n-1]=arguments[n];p.push(new u(e,t)),1!==p.length||d||r(i)},u.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=s,l.addListener=s,l.once=s,l.off=s,l.removeListener=s,l.removeAllListeners=s,l.emit=s,l.binding=function(e){throw Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw Error("process.chdir is not supported")},l.umask=function(){return 0}},function(e,t){},function(e,t){e.exports=require("extract-opts")},function(e,t){e.exports=require("events")},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(t.BALANCE="BALANCE",t.TRADE_NEW="OB_TRADE_NEW"),n=t.ORDER_BOOK_NEW_ORDER="OB_NEW_ORDER",o=t.ORDER_BOOK_UPDATE_ORDER="OB_UPDATE_ORDER",i=t.ORDER_BOOK_DELETE_ORDER="OB_DELETE_ORDER",u=t.ORDER_BOOK_DELETE_ORDERS_THRU="OB_DELETE_ORDERS_THRU",s=t.EXECUTION_REPORT_NEW="EXECUTION_REPORT_NEW",a=t.EXECUTION_REPORT_PARTIAL="EXECUTION_REPORT_PARTIAL",c=t.EXECUTION_REPORT_EXECUTION="EXECUTION_REPORT_EXECUTION",l=t.EXECUTION_REPORT_CANCELED="EXECUTION_REPORT_CANCELED",f=t.EXECUTION_REPORT_REJECTED="EXECUTION_REPORT_REJECTED";t.EVENTS={ORDERBOOK:{0:n,1:o,2:i,3:u},TRADES:{0:r},EXECUTION_REPORT:{0:s,1:a,2:c,4:l,8:f}}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;t.length>r;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=function p(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:p(o,t,r)}if("value"in n)return n.value;var i=n.get;if(void 0!==i)return i.call(r)},c=r(19),l=n(c),f=function(e){function t(e){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return u(t,e),s(t,[{key:"trades",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3,r=arguments[1],n=arguments[2];return a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"fetch",this).call(this,{},this.currency+"/trades?limit="+e+"&since="+r,n)}}]),t}(l["default"]);t["default"]=f},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;t.length>r;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(5),c=n(a),l=r(20),f=n(l),p=r(8),d=n(p),E=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,"rest"));return n.key=e.key,n.secret=e.secret,n.currency=e.currency,n.fetch=r(n.isNode?21:22),n}return u(t,e),s(t,[{key:"headers",value:function(e){var t=""+Date.now(),r=f["default"].codec.utf8String.toBits(this.secret),n=new f["default"].misc.hmac(r,f["default"].hash.sha256),o=f["default"].codec.hex.fromBits(n.encrypt(t));return{method:e,headers:{"Content-Type":"application/json",Nonce:t,APIKey:this.key,Signature:o}}}},{key:"fetch",value:function(e,t,r){return(0,d["default"])(this.fetch(this.endpoint+t).then(function(e){return e.json()}),r)}}]),t}(c["default"]);t["default"]=E},function(e,t){e.exports=require("sjcl")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("fetch-jsonp")}]);
//# sourceMappingURL=blinktrade.js.map