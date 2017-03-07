const {resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);
const WEB_VIEW_PATH = resolve(ROOT_PATH, 'client/webView');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
  entry: {
    webView: WEB_VIEW_PATH,
    webViewVendor: [
      'react',
      'react-dom'
    ]
  },
  plugins: baseConfig.plugins.concat([
    new HtmlwebpackPlugin({
      title: 'Mobi WebView',
      template: 'client/webView/index.html',
      chunks: ['webView', 'webViewVendor']
    }),
  ])
})
