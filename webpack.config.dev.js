const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config');

const PUBLIC = path.join(__dirname, 'public');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'eval-sourcemap ',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC, 'index.template.html'),
      filename: './index.html'
    })
  ],
  optimization: {
    minimize: false,
    runtimeChunk: true,
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
  devServer: {
    port: 3001,
    overlay: true,
    compress: false,
    stats: {
      colors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
    ],
  },
});
