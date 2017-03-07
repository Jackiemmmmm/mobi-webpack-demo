const {resolve} = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = resolve(__dirname);
const PAYMENT_PATH = resolve(ROOT_PATH, 'client/payment');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
  entry: {
    payment: PAYMENT_PATH,
    paymentVendor: [
      'react',
      'react-dom',
      'redux',
      'react-router',
      'react-router-redux',
      'redux-actions',
      'redux-saga',
    ]
  },
  plugins: baseConfig.plugins.concat([
    new HtmlwebpackPlugin({
      title: 'Mobi Payment',
      template: 'client/payment/index.html',
      chunks: ['payment', 'paymentVendor'],
    })
  ])
})
