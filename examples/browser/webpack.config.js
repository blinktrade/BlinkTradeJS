var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  node: {
    ws: 'empty',
    fs: 'empty',
    tls: 'empty',
    encoding: 'empty',
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
