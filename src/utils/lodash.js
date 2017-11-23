const orderBy = require('lodash/orderBy')
const groupBy = require('lodash/groupBy')
const throttle = require('lodash/throttle')
const shuffle = (array) => {
  for (let i = array.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]]
  }
  return array
}
module.exports = {
  orderBy,
  groupBy,
  throttle,
  shuffle
}
