import axios from 'axios'
import config from './config'

const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    console.log('post request url', url)
    return service.post(url, data)
  },
  get (url, data) {
    console.log('get request url', url)
    return service.get(url, data)
  },
  delete (url, data) {
    console.log('delete request url', url)
    return service.delete(url, data)
  }
}
