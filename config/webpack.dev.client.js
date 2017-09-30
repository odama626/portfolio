const webpack = require('webpack');
const webpackBase = require('./webpack.base.client');
const extend = require('util')._extend;

module.exports = extend (webpackBase, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    webpackBase.entry.main
  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "*": 'http://localhost:3000'
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    pathinfo: true,
    path: webpackBase.output.path,
    filename: webpackBase.output.filename,
    publicPath: 'http://localhost:3001/'
  },
  plugins: webpackBase.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ])
});