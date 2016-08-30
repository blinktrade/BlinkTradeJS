var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var env = process.env.NODE_ENV;
var config = {
  devtool: 'source-map',
  plugins: [],
  node: {
    child_process: 'empty',
  },
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config;
