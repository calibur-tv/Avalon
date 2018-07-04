import axios from 'axios'

const pendingQueue = {}
const timeout = 15000

const createRequestKey = (method, args) => {
  let url = args[0]
  let params = {}
  if (args[1]) {
    params = method === 'get' ? args[1].params || null : args[1]
  }
  if (!params) {
    return `${method}-${url}`
  }
  url += `${method}-${url}?`
  Object.keys(params).forEach(key => {
    url += `${key}=${params[key]}&`
  })
  return url.slice(0, -1)
}

export default (ctx) => {
  const http = axios.create({
    baseURL: process.env.API_HOST,
    headers: { Accept: 'application/x.api.latest+json' },
    timeout: timeout
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
    if (err.message === `timeout of ${timeout}ms exceeded`) {
      return Promise.reject('网路请求超时，请稍候再试！') // eslint-disable-line prefer-promise-reject-errors
    }
    try {
      if (!err.response) {
        return Promise.reject('网络错误，请刷新网页重试！') // eslint-disable-line prefer-promise-reject-errors
      }
      let message = err.response.data.message
      if (typeof message === 'string') {
        return Promise.reject(message)
      }
      return Promise.reject(message[Object.keys(message)[0]][0])
    } catch (e) {
      console.error(e)
    }
  })

  const Request = class {
    get () {
      return this.pending('get', arguments)
    }

    post () {
      return this.pending('post', arguments)
    }

    delete () {
      return http.delete(...arguments)
    }

    put () {
      return http.put(...arguments)
    }

    head () {
      return http.head(...arguments)
    }

    pending (method, args) {
      const key = createRequestKey(method, args)
      if (pendingQueue[key]) {
        return new Promise((resolve, reject) => {
          pendingQueue[key].then(() => {
            resolve()
          }).catch(() => {
            reject() // eslint-disable-line
          })
        })
      }
      const task = new Promise((resolve, reject) => {
        http[method](...args).then((res) => {
          resolve(res)
          delete pendingQueue[key]
        }).catch((err) => {
          reject(err)
          delete pendingQueue[key]
        })
      })
      pendingQueue[key] = task
      return task
    }
  }

  return new Request()
}
