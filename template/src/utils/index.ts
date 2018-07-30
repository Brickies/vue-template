const throttle = (delay: number, method: any) => {
  let last = 0
  return function () {
    let curr = + new Date()
    if (curr - last > delay) {
      method.apply(this, arguments)
      last = curr
    }
  }
}

const dateFormat = (date: Date, format = 'yyyy-MM-dd hh:mm:ss') => {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

const queryString = (key: string) => {
  let url = location.search || location.hash
  let re = new RegExp('' + key + '=([^&?#/]*)', 'ig')
  return url.match(re) ? decodeURI((url as any).match(re)[0].substr(key.length + 1)) : ''
}

export default {
  throttle,
  dateFormat,
  queryString
}
