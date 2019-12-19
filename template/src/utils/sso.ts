import Cookies from 'js-cookie'

const sso = {
  {{#sso}}
  redirectLogin () {
    if (process.env.NODE_ENV === 'development' && process.env.API_ENV !== 'test') return
    const loginInRedirectPath = '/oauth2.0/authorize'
    const ssoCallBack = '/#/ssocallback'
    const { host, protocol, href } = window.location
    let redirectHost = host === '{{ ssoOriginHost }}' ? '{{ prodSsoHost }}' : '{{ devSsoHost }}'
    let clientId = '{{ ssoConfig }}'
    const rdRedireactURI = encodeURIComponent(
      `${protocol}//${host}${ssoCallBack}`
    )

    if (protocol === 'http:') {
      window.location.href = href.replace('http:', 'https:')
      return false
    }

    const uri = `//${redirectHost}${loginInRedirectPath}?redirect_uri=${rdRedireactURI}&client_id=${clientId}`
    if (process.env.PROJECT === 'mws') {
      const currentURL = encodeURIComponent(window.location.href)
      window.location.href = `/login?re=${currentURL}`
    } else {
      window.location.href = uri
    }
  },{{/sso}}
  removeSsoid () {
    Cookies.remove('ssoid')
    Cookies.remove('yun_portal_ssoid')
  },
  setSsoid (ssoid: string) {
    Cookies.set('ssoid', ssoid, { expires: 7 })
    Cookies.set('yun_portal_ssoid', ssoid, { expires: 7 })
  },
  getSsoid () {
    return Cookies.get('ssoid')
  }{{#sso}},
  setCurrentURL () {
    const currentURL = window.location.href
    if (!currentURL.includes('/ssocallback')) {
      Cookies.set('currentURL', currentURL)
    }
  },
  getCurrentURL () {
    return Cookies.get('currentURL') || '/'
  }{{/sso}}
}

export default sso
