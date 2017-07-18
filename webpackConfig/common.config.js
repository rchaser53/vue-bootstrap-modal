const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules:[{
      test: /\.vue$/,
      loaders: [
        'vue-loader'
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//
    }
  ]
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