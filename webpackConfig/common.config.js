const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules:[{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}