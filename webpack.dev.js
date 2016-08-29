var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/ws/),
    new webpack.IgnorePlugin(/\/iconv-loader$/),
    new webpack.IgnorePlugin(/\/getmac$/)
  ],
  node: {
    child_process: 'empty'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      // exclude: /node_modules/,
      loader: 'babel'
    },
    { test: /\.(json)$/, loader: 'json' }]
  }
};
