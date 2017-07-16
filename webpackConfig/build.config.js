const path = require("path")
const webpack = require('webpack')
const commonConfig = require('./common.config.js')

module.exports = Object.assign(commonConfig, {
	context: path.resolve(__dirname, '../src'),
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/public/",
    filename: "index.js",
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
})