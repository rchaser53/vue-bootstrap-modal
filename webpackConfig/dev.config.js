const path = require("path")
const commonConfig = require('./common.config.js')

module.exports = Object.assign(commonConfig, {
	context: path.resolve(__dirname, '../example'),
  devtool: 'inline-source-map',
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "../"),
    publicPath: "/public/",
    filename: "bundle.js"
  }
})