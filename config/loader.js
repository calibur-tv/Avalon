const resolve = require('path').resolve

const isVueRule = (rule) => {
  return rule.test.toString() === '/\\.vue$/'
}

const isSASSRule = (rule) => {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}

const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve(__dirname, '../assets/css/variables.scss'),
      resolve(__dirname, '../assets/css/mixins.scss'),
      resolve(__dirname, '../assets/css/theme.scss')
    ]
  }
}

module.exports = {
  isVueRule,
  isSASSRule,
  sassResourcesLoader
}
