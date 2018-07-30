const path = require('path')
const f2eci = require('./f2eci')
const originalENV = process.env.ENV || f2eci.env
const env = (originalENV === 'beta' && f2eci.swimlane === 'alphaa') ? 'alpha' : originalENV //rewrite test env to alpha
const urlPrefix = env === 'development' ? '/' : f2eci.urlPrefix
const webpack = require('webpack')
let portm
if (env === 'development') {
  try {
    portm = require('./.portm.json')
  }
  catch (e) {
    console.warn(`!!!warning!!! \n 请在根目录下配置.portm.json文件，格式{userToken:"your porm token"}`)
    portm = {}
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}
// portm 模拟数据地址: http://portm.sankuai.com/api-groups/edit/{{ portmProjectToken }}
let proxyTable = {
  '^/api': {
    target: 'http://portm.sankuai.com',
    headers: {
      'host': 'portm.sankuai.com',
      'Portm-Target': '{{ portmTarget }}',
      'Portm-Token': '{{ portmProjectToken }}',
      'Portm-User': portm && portm.userToken
    }
  },
  {{#watermark}}
  '^/api-wm/*': {
    target: 'http://portm.sankuai.com',
    changeOrigin: true,
    headers: {
      'host': 'portm.sankuai.com',
      'Portm-Target': '{{ portmTarget }}',
      'Portm-Token': '{{ portmProjectToken }}',
      'Portm-User': portm && portm.userToken
    }
  }
  {{/watermark}}
}

// 测试环境
if (process.env.API_ENV === 'test') {
  // some options of test
}
module.exports = {
  devServer: {
    proxy: {
      ...proxyTable,
      '^/weather': {
        target: 'https://www.apiopen.top'
      }
    }
  },
  baseUrl: urlPrefix,
  configureWebpack: config => {
    if (process.env.API_ENV === 'test') {
      config.plugins = [
        ...config.plugins,
         new webpack.DefinePlugin({
          'process.env.API_ENV': '"test"'
        })
      ]
    }
  }
}
