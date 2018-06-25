const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          compact: false
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: 'buffer'
    })
  ],
  watch: true
}