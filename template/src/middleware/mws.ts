import sso from '@/utils/sso'
const { YUN_PORTAL_SSOID } = require('../../.local.json')

if (process.env.NODE_ENV === 'development') {
  sso.setSsoid(YUN_PORTAL_SSOID)
}
