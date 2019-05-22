const webpack = require('webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '../dist/app.js'
  },
  module: {
      rules: [{
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader",
              options: {
                url: false
              }
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: ["src/app.scss"]
              }
          }]
      }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery"
    })
  ]
}
