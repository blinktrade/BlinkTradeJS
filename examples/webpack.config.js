var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    authWebSocket: './authWebSocket',
    balance: './balance',
    deposits: './deposits',
    eventEmitters: './eventEmitters',
    executionReport: './executionReport',
    listWithdraws: './listWithdraws',
    orderBookWebSocket: './orderBookWebSocket',
    tickerWebSocket: './tickerWebSocket',
    tradeHistory: './tradeHistory',
    sendAndCancelOrdersRest: './sendAndCancelOrdersRest',
    sendAndCancelOrdersWebSocket: './sendAndCancelOrdersWebSocket',
    withdraw: './withdraw'
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name].bundle.js'
  },
  node: {
    ws: 'empty',
    fs: 'empty',
    tls: 'empty',
    dgram: 'empty',
    encoding: 'empty',
    child_process: 'empty'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }]
  }
}
