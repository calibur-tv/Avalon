import axios from 'axios'
import { env, host, timeout } from 'env'

export default (ctx) => {
  const http = axios.create({
    baseURL: host[env],
    headers: { Accept: 'application/json' },
    timeout: timeout.client
  })

  http.interceptors.request.use(config => {
    if (!ctx) {
      return config
    }
    Object.assign(config.headers, {
      Authorization: `Bearer ${ctx.$store ? ctx.$store.state.token : ctx}`
    })
    return config
  })

  http.interceptors.response.use(res => res && res.data && res.data.data, err => {
    if (err.response.status === 429) {
      return Promise.reject({message: ['请勿重复操作']}) // eslint-disable-line prefer-promise-reject-errors
    }
    if (err.message === `timeout of ${timeout.client}ms exceeded`) {
      return Promise.reject({message: ['网路请求超时']}) // eslint-disable-line prefer-promise-reject-errors
    }
    return Promise.reject(err && err.response && err.response.data)
  })

  return http
}
