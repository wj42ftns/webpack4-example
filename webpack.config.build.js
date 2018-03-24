const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfig = require('./webpack.config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = (NODE_ENV === 'development');

module.exports = merge(webpackConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(
          ['dist'],
          {
            exclude:  ['.gitignore']
          }
        ),
        new UglifyJsPlugin({ // родной minimize - не выдирает комментарии о лицензиях - это кладёт их рядом и в бандле тратит 1 строку, на коммент с указанием на лицензии
          sourceMap: true,
          extractComments: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].css"
        }),
    ],
    optimization: {
    minimize: false,
    runtimeChunk: false,
    splitChunks: {
      chunks: "async",
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
          name: "vendor",
          chunks: "initial",
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
          MiniCssExtractPlugin.loader, // он не умеет пока в HMR (но нужен в prod как замена 'extract-text-webpack-plugin' для 4 версии webpack)
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
