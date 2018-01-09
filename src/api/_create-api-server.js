import axios from 'axios'
import { env, host, timeout } from 'env'

const getAuthToken = (ctx) => {
  if (!ctx) {
    return ''
  }
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
  return {
    async get (url, data) {
      const token = getAuthToken(ctx)
      const params = data && data.params ? data.params : {}
      try {
        const res = await axios({
          method: 'GET',
          url: (env === 'development' ? host[env] : 'http://localhost/') + url,
          params,
          timeout: timeout.server,
          headers: {
            Accept: 'application/x.api.latest+json',
            Authorization: `Bearer ${token}`
          }
        })
        return res && res.data && res.data.data
      } catch (e) {
        e.code = e.response.status
        throw e
      }
    },

    async post (url, params) {
      const token = getAuthToken(ctx)
      try {
        const res = await axios({
          method: 'POST',
          url: (env === 'development' ? host[env] : 'http://localhost/') + url,
          params,
          timeout: timeout.server,
          headers: {
            Accept: 'application/x.api.latest+json',
            Authorization: `Bearer ${token}`
          }
        })
        return res && res.data && res.data.data
      } catch (e) {
        e.code = e.response.status
        throw e
      }
    }
  }
}
