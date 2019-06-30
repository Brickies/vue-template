const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
// let proxyTable = {
//   '/api': {
//     target: 'http://yapi.demo.qunar.com/mock/13227/',
//     pathRewrite: {
//       '^/api': ''
//     }
//   }
// }
// // 测试环境后端服务地址
// if (process.env.API_ENV === 'test') {
//   proxyTable = {
//     '/api': {
//       target: 'https://staroom-api.yousails-project.com/clean',
//       pathRewrite: {
//         '^/api': ''
//       }
//     }
//   }
// }
let proxyTable = {}
module.exports = {
  devServer: {
    proxy: {
      ...proxyTable,
      '^/weather': {
        target: 'https://www.apiopen.top/api',
        pathRewrite: {
          '^/weather': ''
        }
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'src': resolve('src'),
      'views': resolve('src/views'),
      'styles': resolve('src/styles'),
      'components': resolve('src/components'),
      'utils': resolve('src/utils'),
      'assets': resolve('src/assets'),
      'store': resolve('src/store')
    }
  }
}
