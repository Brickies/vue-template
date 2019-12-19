import SiteUpdateChecker from '@bfe/site-update-checker'

const DEFAULT_NOTICE_TEXT = '检测到新版本，点我刷新页面' // 检测到新版本，点我刷新页面

if (process.env.NODE_ENV !== 'development') {
  // 检测版本升级
  SiteUpdateChecker.init({
    enable: true,
    noticeText: DEFAULT_NOTICE_TEXT,
    requestInterval: 1,
    requestURL: location.pathname,
    customCallback: null
  })
}
