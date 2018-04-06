const config = require('../.env').sentry

module.exports = {
  url: 'https://sentry.io/',
  org: 'falstack',
  include: /\.js(\.map)?$/,
  project: 'RhoAias',
  token: config.token
}
