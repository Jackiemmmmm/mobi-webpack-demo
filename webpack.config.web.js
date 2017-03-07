const {resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);
const WEB_VIEW_PATH = resolve(ROOT_PATH, 'client/webView');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
  entry: {
    jsx: WEB_VIEW_PATH,
    vendor: [
      'react',
      'react-dom'
    ]
  },
  plugins: baseConfig.plugins.concat([
    new HtmlwebpackPlugin({
      title: 'Mobi WebView',
      template: 'client/webView/index.html',
      chunks: ['jsx', 'vendor']
    }),
  ])
})
