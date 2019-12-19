import axios from 'axios'
import config from './config'
import sso from './sso'

const service = axios.create(config)

// POST传参序列化(添加请求拦截器)
service.interceptors.request.use(
  config => {
    const ssoid = sso.getSsoid()
    if (!ssoid) {
      sso.setCurrentURL()
      sso.redirectLogin()
    } else {
      config.headers['access-token'] = ssoid
    }
    return config
  },
  error => {
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
    }
    if (error.response.status === 401) {
      // 重定向到SSO登录页
      sso.removeSsoid()
      sso.setCurrentURL()
      sso.redirectLogin()
    }
    return Promise.reject(error)
  }
)

export default service
