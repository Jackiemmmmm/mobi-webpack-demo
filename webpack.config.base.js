const webpack = require('webpack');
const {join, resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV);
const ROOT_PATH = resolve(__dirname);
const BUILD_PATH = resolve(ROOT_PATH, 'build');

module.exports = {
  output: {
    path: BUILD_PATH,
    filename: ifProduction('scripts/[name].bundle.js?v=[hash]', 'scripts/[name].bundle.js'),
    chunkFilename: ifProduction('scripts/[id].chunk.js?v=[chunkhash]', 'scripts/[id].chunk.js'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // include: '/client/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
            }
          ]
        }),
      },
      // {
      //   test: /\.css$/,
      //   exclude: ['node_modules'],
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
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
      'node_modules',
      join(__dirname, '../node_modules'),
    ],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
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
      filename: ifProduction('scripts/vendor.bundle.js?v=[hash]', 'scripts/vendor.bundle.js')
    }),
    new ExtractTextPlugin({
      filename: ifProduction('styles/bundle.css?v=[hash]', 'styles/bundle.css'),
      allChunks: true,
      disable: false,
    })
  ])
}