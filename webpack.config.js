const webpack = require('webpack');
const {join, resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)

const ROOT_PATH = resolve(__dirname);
const APP_PATH = resolve(ROOT_PATH, 'client');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

const baseConfig = {
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
      },
      {
        test: /\.svg$/,
        include: /client\/icons/,
        loaders: [
          'babel-loader',
          'svg-react-loader'
        ]
      }
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        APP_ENV: JSON.stringify(process.env.APP_ENV || 'production')
      }
    }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    })),
    ifProduction(new webpack.LoaderOptionsPlugin({
      minimize: true
    })),
  ])
}

module.exports = Object.assign({}, baseConfig, {
  entry: {
    jsx: APP_PATH,
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js'
  },
  
  plugins: baseConfig.plugins.concat([
    new HtmlwebpackPlugin({
      title: 'Mobi WebView',
      template: 'client/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle[hash].css',
      allChunks: true,
      disable: false,
    })
  ])
});