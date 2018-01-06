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
    publicRest: './browser/publicRest',
  },
  output: {
    path: path.join(__dirname, 'browser/bundle'),
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
