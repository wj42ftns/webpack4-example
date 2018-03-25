const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackDevConfig = require('./webpack.config.dev');

module.exports = merge(webpackDevConfig, {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true
  },
});
