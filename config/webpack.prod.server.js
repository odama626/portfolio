const webpack = require('webpack');
const webpackBase = require('./webpack.base.server');

module.exports = { ...webpackBase, ...{
  mode: 'production'
}};