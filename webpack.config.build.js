const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = (NODE_ENV === 'development');

const PUBLIC = path.join(__dirname, 'public');

module.exports = merge(webpackConfig, {
  mode: 'production',
  plugins: [
    new UglifyJsPlugin({ // it's better than native minimize - because get LICENSE to another file.
      sourceMap: true,
      extractComments: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: PUBLIC,
        exclude: ['.gitignore']
      }
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC, 'index.template.html'),
      filename: path.resolve(PUBLIC, 'index.html'),
      inject: 'body',
      hash: true
    }),
  ],
  optimization: {
    minimize: false,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // it doesn't work wiht HMR (but need in production instead 'extract-text-webpack-plugin' for webpack 4)
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
        ]
      },
    ],
  },
});
