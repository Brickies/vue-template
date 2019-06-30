import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { redirectLogin } from './auth'

const service = axios.create(config)
// POST 传参序列化
service.interceptors.request.use(
  config => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    const { code, message } = res.data
    if (code === 401) {
      redirectLogin()
    }
    if (code !== 200) {
      Message.warning(`${message}`)
      return Promise.reject(res.data)
    } else {
      return res.data
    }
  },
  error => {
    if (error.response.status === 401) {
      redirectLogin()
    } else {
      Message({
        showClose: true,
        type: 'warning',
        message: error.message
      })
    }
    return Promise.reject(error)
  }
)

export default service
