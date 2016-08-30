var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  node: {
    fs: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }]
  }
}
