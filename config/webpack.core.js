const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const env = require('./envLoader');

module.exports = {
  stats: { children: false},
  resolve: {
    alias: {
      'utils': path.join(__dirname, '../assets/utils'),
      '@core': path.join(__dirname, '../assets/components/@core'),
      'components': path.join(__dirname, '../assets/components'),
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve('./bin/'),
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?silent' }) },
      {
        enforce: 'pre',
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?silent&modules=true&importLoaders=true&localIdentName=[name]__[local]__[hash:base64:5]&context=../server',
            'postcss-loader',
            'typed-css-modules-loader?noEmit=true',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, '../assets/scss')],
                data: "@import 'variables.scss';"
              }
            }
          ]
        })
      },
      {test: /\.ts(x?)$/, loaders: ['babel-loader', 'ts-loader']},
      {test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'},
      {test: /\.(jpg|ico|png|gif|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin(env())
  ]
}