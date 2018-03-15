const webpack = require("webpack");
const core = require('./webpack.core');

// const babelOptions = {
//   "presets": [
//     "react",
//     "es2015"
//   ]
// }

module.exports = {...core, ...{
  context: __dirname,
  entry: {
    main: '../client/index.tsx',
  },
  target: 'web',
  output: {...core.output, ...{
    filename: "[name].js"
  }},
  module: {
    ...core.module,
    rules: [
      ...core.module.rules,
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader'}
      }
    ]
  },
  plugins: core.plugins.concat([
    new webpack.DefinePlugin({
      "ENV.BUILD_TARGET": JSON.stringify("client")
    }),
  ])
}};