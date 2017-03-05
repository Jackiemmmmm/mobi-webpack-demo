const {join, resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ROOT_PATH = resolve(__dirname);
const APP_PATH = resolve(ROOT_PATH, 'client');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    jsx: APP_PATH,
    vendor: [
      'react',
      'react-dom',
      'react-intl'
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ico|png|jpg|svg)$/,
        loader: 'url-loader',
        include: /client\/images/,
        options: {
          limit: 10240,
          name: 'images/[name].[hash:base64:5]'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Mobi WebView',
      template: 'client/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle[hash].css',
      allChunks: true,
      disable: false,
    })
  ],
  resolve: {
    extensions: ['.js', '.less', '.jsx']
  },
}