const path = require("path")
const commonConfig = require('./common.config.js')

module.exports = Object.assign(commonConfig, {
	context: path.resolve(__dirname, '../src'),
  entry: {
    index: "./index.vue"
  },
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/public/",
    filename: "index.js"
  }
})