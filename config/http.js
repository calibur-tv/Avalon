const host = require('../.env').host
const dev = process.env.NODE_ENV === 'development'

exports.config = {
  baseURL: dev ? host.dev : 'http://localhost/',
  browserBaseURL: dev ? host.dev : host.prod,
  headers: { Accept: 'application/json' },
  timeout: 10000,
  errorHandler (err) {
    return Promise.reject(err.response.data)
  },
  responseInterceptor: (res) => {
    return res && res.data && res.data.data
  }
}
