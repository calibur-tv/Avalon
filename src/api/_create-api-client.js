import axios from 'axios'
import { env, host, timeout } from '../../.env'

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
      Authorization: `Bearer ${ctx.$store.state.token}`
    })
    return config
  })

  http.interceptors.response.use(res => res && res.data && res.data.data, err => {
    if (err.message === `timeout of ${timeout.client}ms exceeded`) {
      return Promise.reject(['网路请求超时']) // eslint-disable-line
    }
    return Promise.reject(err && err.response && err.response.data)
  })

  return http
}
