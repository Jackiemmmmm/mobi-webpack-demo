const webpack = require('webpack');
const {join, resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)

const ROOT_PATH = resolve(__dirname);
const APP_PATH = resolve(ROOT_PATH, 'client');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    jsx: APP_PATH,
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: ifProduction('scripts/bundle.js?v=[hash]', 'scripts/bundle.js')
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
          name: 'images/[name].[ext]?v=[hash:base64:5]'
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
      },
      {
        test: /\.svg$/,
        include: /client\/icons/,
        loaders: [
          'babel-loader',
          'svg-react-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        // section to check source files, not modified by other loaders
        enforce: "pre",
      },
    ]
  },
  resolve: {
    modules: [
      resolve('client'),
      'node_modules'
    ],
    extensions: ['.js', '.less', '.jsx']
  },
  plugins: removeEmpty([
    ifProduction(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // display warnings when dropping unreachable code or unused declarations etc
          warnings: false,
          // Pass true to discard calls to console.* functions
          drop_console: true,
          // apply optimizations for if-s and conditional expressions
          conditionals: true,
          // drop unreferenced functions and variables
          unused: true,
          // remove unreachable code
          dead_code: true,
          // optimizations for if/return and if/continue
          if_return: true,
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: ifProduction('scripts/vendor.bundle.js?v=[hash]', 'pscripts/vendor.bundle.js')
    }),
    new HtmlwebpackPlugin({
      title: 'Mobi WebView',
      template: 'client/index.html'
    }),
    new ExtractTextPlugin({
      filename: ifProduction('styles/bundle.css?v=[hash]', 'styles/bundle.css'),
      allChunks: true,
      disable: false,
    })
  ])
}
