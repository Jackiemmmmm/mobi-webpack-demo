// const {resolve, join} = require('path');
// const webpack = require('webpack');


// const sourcePath = join(__dirname, './client');
// const staticsPath = join(__dirname, './static');
// module.exports = function (env) {
//   const nodeEnv = env && env.prod ? 'production' : 'development';
//   const isProd = nodeEnv === 'production';

//   const plugins = [
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: Infinity,
//       filename: 'vendor.bundle.js'
//     }),
//     new webpack.EnvironmentPlugin({
//       NODE_ENV: nodeEnv,
//     }),
//     new webpack.NamedModulesPlugin(),
//   ];

//   if (isProd) {
//     plugins.push(
//       new webpack.LoaderOptionsPlugin({
//         minimize: true,
//         debug: false
//       }),
//       new webpack.optimize.UglifyJsPlugin({
//         compress: {
//           warnings: false,
//           screw_ie8: true,
//           conditionals: true,
//           unused: true,
//           comparisons: true,
//           sequences: true,
//           dead_code: true,
//           evaluate: true,
//           if_return: true,
//           join_vars: true,
//         },
//         output: {
//           comments: false,
//         },
//       })
//     );
//   } else {
//     plugins.push(
//       new webpack.HotModuleReplacementPlugin()
//     );
//   }

//   return {
//     devtool: isProd ? 'source-map' : 'eval',
//     context: sourcePath,
//     entry: {
//       js: './index.js',
//       vendor: [
//         'react',
//         // 需要的库
//       ]
//     },
//     output: {
//       path: staticsPath,
//       filename: '[name].bundle.js',
//     },
//     module: {
//       rules: [
//         {
//           test: /\.html$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'file-loader',
//             query: {
//               name: '[name].[ext]'
//             },
//           },
//         },
//         {
//           test: /\.css$/,
//           exclude: /node_modules/,
//           use: [
//             'style-loader',
//             'css-loader'
//           ]
//         },
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: [
//             'babel-loader'
//           ],
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
//       modules: [
//         resolve(__dirname, 'node_modules'),
//         sourcePath
//       ]
//     },

//     plugins,

//     performance: isProd && {
//       maxAssetSize: 100,
//       maxEntrypointSize: 300,
//       hints: 'warning',
//     },

//     stats: {
//       colors: {
//         green: '\u001b[32m',
//       }
//     },

//     devServer: {
//       contentBase: './client',
//       historyApiFallback: true,
//       port: 9424,
//       compress: isProd,
//       inline: !isProd,
//       hot: !isProd,
//       stats: {
//         assets: true,
//         children: false,
//         chunks: false,
//         hash: false,
//         modules: false,
//         publicPath: false,
//         timings: true,
//         version: false,
//         warnings: true,
//         colors: {
//           green: '\u001b[32m',
//         }
//       },
//     }
//   };
// };



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
          // use: ['css-loader', 'less-loader']
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
          limit: 1024,
          name: '/images/[name].[hash:base64:5]'
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