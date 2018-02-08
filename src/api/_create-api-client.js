import axios from 'axios'
import { env, host, timeout } from 'env'

export default (ctx) => {
  const http = axios.create({
    baseURL: host[env],
    headers: { Accept: 'application/x.api.latest+json' },
    timeout: timeout.client
  })

  http.interceptors.request.use(config => {
    if (!ctx) {
      return config
    }
    Object.assign(config.headers, {
      Authorization: `Bearer ${ctx.$store ? ctx.$store.state.login ? ctx.$store.state.user.token : '' : ctx}`
    })
    return config
  })

  http.interceptors.response.use(res => res.data.data, err => {
    if (err.message === `timeout of ${timeout.client}ms exceeded`) {
      return Promise.reject('网路请求超时') // eslint-disable-line prefer-promise-reject-errors
    }
    try {
      return Promise.reject(err.response.data.message)
    } catch (e) {
      console.error(e)
    }
  })

  return http
}
