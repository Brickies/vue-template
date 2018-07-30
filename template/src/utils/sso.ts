import Cookies from 'js-cookie'

const sso = {
  redirectLogin () {
    if (process.env.NODE_ENV === 'development' && process.env.API_ENV !== 'test') return
    // your sso origin host
    const prodHost = '{{ ssoOriginHost }}'
    const devSsoHost = 'sso.it.beta.sankuai.com'
    const prodSsoHost = 'sso.sankuai.com'
    const loginInRedirectPath = '/oauth2.0/authorize'
    const ssoCallBack = '/#/ssocallback'
    let { host, protocol, href } = window.location
    let redirectHost = host === prodHost ? prodSsoHost : devSsoHost
    // sso client id
    let clientId = '{{ ssoConfig }}'
    const rdRedireactURI = encodeURIComponent(
      `${protocol}//${host}${ssoCallBack}`
    )

    if (protocol === 'http:') {
      window.location.href = href.replace('http:', 'https:')
      return false
    }

    const uri = `https://${redirectHost}${loginInRedirectPath}?redirect_uri=${rdRedireactURI}&client_id=${clientId}`
    window.location.href = uri
  },
  removeSsoid () {
    Cookies.remove('mbop-ssoid')
    Cookies.remove('ssoid')
  },
  setSsoid (ssoid: string) {
    Cookies.set('mbop-ssoid', ssoid, { expires: 7 })
    Cookies.set('ssoid', ssoid, { expires: 7 })
  },
  getSsoid () {
    return Cookies.get('mbop-ssoid')
  },
  setCurrentURL () {
    const currentURL = window.location.href
    if (!currentURL.includes('/callback')) {
      Cookies.set('currentURL', currentURL)
    }
  },
  getCurrentURL () {
    return Cookies.get('currentURL') || '/'
  }
}

export default sso
