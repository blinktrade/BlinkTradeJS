const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const config = {
  devtool: 'source-map',
  plugins: [],
  entry: './src/index.js',
  target: 'web',
  output: {
    filename: 'blinktrade.js',
    path: path.join(__dirname, './browser'),
    library: 'blinktrade',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  node: {
    ws: 'empty',
    fs: 'empty',
    os: 'empty',
    tls: 'empty',
    dgram: 'empty',
    encoding: 'empty',
    child_process: 'empty',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!(ws)\/).*/,
      loader: 'babel',
      query: {
        plugins: ['lodash'],
      },
    }],
  },
};

if (env === 'production') {
  config.output.filename = 'blinktrade.min.js';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
