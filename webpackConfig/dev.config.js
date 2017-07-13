const path = require("path")
const commonConfig = require('./common.config.js')

module.exports = Object.assign(commonConfig, {
	context: path.resolve(__dirname, '../src'),
  devtool: 'inline-source-map',
  entry: {
    index: "./entry.js"
  },
  output: {
    path: path.resolve(__dirname, "../"),
    publicPath: "/public/",
    filename: "bundle.js"
  }
})