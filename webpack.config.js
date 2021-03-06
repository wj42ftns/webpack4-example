const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { dependencies } = require('./package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

const SRC_JS = path.join(__dirname, 'src/js');
const PUBLIC = path.join(__dirname, 'public');

module.exports = {
  entry: {
    vendor: Object.keys(dependencies),
    bundle: path.join(SRC_JS, 'app.jsx')
  },
  output: {
    path: path.join(PUBLIC, 'dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: [
      'node_modules',
      SRC_JS
    ],
    extensions: ['.jsx', '.js', '.json', '.map', '*']
  },
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.DefinePlugin({
      APP_CONFIG: fs.readFileSync(path.resolve(__dirname, 'configs', `${NODE_ENV}.json`)).toString()
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ],
  },
};
