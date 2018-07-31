import axios from 'axios'
import config from './config'
{{#sso}}
import sso from './sso'
{{/sso}}
{{#element}}
import { Message } from 'element-ui'
{{/element}}

const service = axios.create(config)

// POST传参序列化(添加请求拦截器)
service.interceptors.request.use(
  config => {
    {{#sso}}
    const ssoid = sso.getSsoid()
    if (!ssoid) {
      sso.setCurrentURL()
      sso.redirectLogin()
    } else {
      config.headers['access-token'] = ssoid
    }
    {{/sso}}
    return config
  },
  error => {
    {{#element}}
    Message({
      showClose: true,
      type: 'warning',
      message: '报错信息'
    })
    {{/element}}
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    if (!error.response) {
      return Promise.reject(error)
    }{{#sso}}
    if (error.response.status === 401) {
      // 重定向到SSO登录页
      sso.removeSsoid()
      sso.setCurrentURL()
      sso.redirectLogin()
    }{{/sso}}{{#element}} else if (error.response.status === 403) {
      Message({
        showClose: true,
        type: 'warning',
        message: '用户无权限访问数据，请联系管理员进行授权'
      })
    } else {
      Message({
        showClose: true,
        type: 'error',
        message: `${error.response.status} 请求出错了哦 ~`
      })
    }{{/element}}
    return Promise.reject(error)
  }
)

export default service
