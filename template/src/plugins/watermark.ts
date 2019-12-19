import watermark from '@dp/watermark'

if (process.env.NODE_ENV !== 'development') {
  // 增加水印
  watermark(document.body, {
    backgroundColor: '#F2F4F9',
    urlPrefix: '/api-wm'
  })
}
