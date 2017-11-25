const host = {
  development: 'https://t-api.calibur.tv/',
  staging: 'https://t-api.calibur.tv/',
  production: 'https://api.calibur.tv'
}

const cdn = {
  host: 'https://cdn.calibur.tv/'
}

const qiniu = {
  host: '',
  access: '',
  secret: '',
  bucket: '',
  prefix: ''
}

const timeout = {
  server: 60000,
  client: 30000
}

const script = {
  baiduStat: '',
  baiduPush: '',
  google: ''
}

const env = process.env.NODE_ENV

const listCacheLimit = 5

module.exports = {
  host,
  timeout,
  env,
  script,
  listCacheLimit,
  cdn,
  qiniu
}
