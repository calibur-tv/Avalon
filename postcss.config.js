const autoprefixer = require('autoprefixer')

module.exports = () => ({
  plugins: [
    autoprefixer({
      browsers: ['last 3 versions', 'ie 11'],
      remove: false
    })
  ]
})
