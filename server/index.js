const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const Sentry = require('@sentry/node')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
const isDev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (isDev) {
    app.use(
      require('koa-logger')((str, args) => {
        if (/(\/_nuxt\/|__webpack_hmr|favicon.ico)/.test(args[2])) {
          return
        }
        args[0] = `[${new Date().toLocaleString()}]${args[0]}`
        console.log(...args)
      })
    )
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    Sentry.init({
      dsn: 'https://b92d1436a1ba431e91dd1644ea0bab3a@sentry.io/1300421'
    })
  }

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(e => {
          const code = e.statusCode || 0
          if (code === 302 && e.url) {
            ctx.redirect(e.url)
            return
          }
          if (
            !isDev &&
            e.message &&
            !/^Request failed with status code/.test(e.message) &&
            !/timeout of/.test(e.message)
          ) {
            Sentry.withScope(scope => {
              scope.setTag('request-url', ctx.req.url)
              Sentry.captureException(e)
            })
          }
          if (code !== 404) {
            console.error(e)
          }
          reject(e)
        })
      })
    })
  })

  isDev ? app.listen(port) : app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
