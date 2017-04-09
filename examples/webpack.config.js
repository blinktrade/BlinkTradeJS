const path = require('path');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  resolve: {
    alias: {
      blinktrade: 'blinktrade/browser',
    },
  },
  entry: {
    authWebSocket: './authWebSocket',
    balance: './balance',
    deposits: './deposits',
    myOrders: './myOrders',
    eventEmitters: './eventEmitters',
    executionReport: './executionReport',
    orderBookWebSocket: './orderBookWebSocket',
    tickerWebSocket: './tickerWebSocket',
    tradeHistory: './tradeHistory',
    sendAndCancelOrdersRest: './sendAndCancelOrdersRest',
    sendAndCancelOrdersWebSocket: './sendAndCancelOrdersWebSocket',
    withdraw: './withdraw',
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
