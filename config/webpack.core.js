const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const env = require('./envLoader');

module.exports = {
  resolve: {
    modules: ['../assets', 'node_modules'],
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve('./bin/'),
  },
  module: {
    rules: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
      {
        enforce: 'pre',
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?modules=true&importLoaders=true&localIdentName=[name]__[local]__[hash:base64:5]&context=../server",
            "postcss-loader",
            "typed-css-modules-loader", {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve(__dirname, "../assets/scss")],
                data: "@import 'vars.scss';"
              }
            }
          ]
        })
      },
      {test: /\.d.ts$/, loader: ['ignore-loader']},
      {test: /\.ts(x?)$/, loaders: ['babel-loader', 'ts-loader']},
      {test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'},
      // {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      // {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])(\?.*$|$)/, loader: "file-loader"},
      {test: /\.(jpg|ico|png|gif|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin(env())
  ]
}