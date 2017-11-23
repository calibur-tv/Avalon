import axios from 'axios'
import { env, host, timeout } from '../../.env'

const getAuthToken = (ctx) => {
  let token = ''
  if (ctx.header) {
    const cookie = ctx.header.cookie
    if (cookie) {
      cookie.split('; ').forEach(item => {
        const temp = item.split('=')
        if (temp[0] === 'JWT-TOKEN') {
          token = temp[1]
        }
      })
    }
  } else if (ctx.$state) {
    // TODO
  } else {
    token = ctx
  }
  return token
}

export default (ctx) => {
  const http = axios.create({
    baseURL: env === 'development' ? host[env] : 'http://localhost/',
    headers: { Accept: 'application/json' },
    timeout: timeout.server
  })

  http.interceptors.request.use(config => {
    if (!ctx) {
      return config
    }
    const token = getAuthToken(ctx)
    if (token) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`
      })
    }
    return config
  })

  http.interceptors.response.use(res => res && res.data && res.data.data, err => Promise.reject(err))

  return http
}
