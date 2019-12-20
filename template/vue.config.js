const webpack = require('webpack'){{#stylelint}}
const StyleLintPlugin = require('stylelint-webpack-plugin'){{/stylelint}}
const ENV = process.env
const { USER_TOKEN } = require('./.local.json')

// Mock 模拟数据地址
let proxyTable = {
  '^/api': {
    target: ENV.MOCK_URL,
    headers: {
      'host': ENV.MOCK_URL,
      'Portm-Target': ENV.TARGET_URL,
      'Portm-User': USER_TOKEN
    }
  },
  '^/portal/*': {
    target: ENV.MOCK_URL,
    headers: {
      'host': ENV.MOCK_URL,
      'Portm-Target': ENV.TARGET_URL,
      'Portm-User': USER_TOKEN
    }
  }
}

// 测试环境后端服务地址:
if (process.env.API_ENV === 'test') {
  proxyTable = {
    '^/api': {
      target: ENV.TARGET_URL
    },
    '^/portal/*': {
      target: ENV.MWS_PORTAL_URL,
      headers: {
        'host': ENV.MWS_PORTAL_URL
      }
    }
  }
}

module.exports = {
  devServer: {
    proxy: proxyTable
  },
  publicPath: '/',
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.API_ENV': ENV.API_ENV
      }){{#stylelint}},
      new StyleLintPlugin({
        files: ['src/**/*.{html,vue,css,sass,scss}'],
        fix: true,
        cache: true,
        ignorePath: 'iconfont'
      }){{/stylelint}}
    ]
  }
}
