const { join } = require('path')
const env = process.env
const prodEnvList = ['staging', 'production']
const isProd = prodEnvList.indexOf(env.NODE_ENV) > -1

const tenantId = isProd
  ? 'prodTenantId'
  : 'testTenantId'
const s3plusHost = isProd ? 's3plus.{{mtHost}}' : 'msstest.vip.{{mtHost}}'

module.exports = {
  tenantId,
  s3plusHost,
  deployCatalog: join(__dirname, 'dist'),
  bucket: env.NODE_ENV,
  customPath: '{{ name }}',
  kms: {
    appKey: 's3 服务 appkey',
    fileName: 's3-test.json'
  }
}
