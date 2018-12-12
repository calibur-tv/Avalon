export default err => {
  if (/timeout of/.test(err.message)) {
    err.statusCode = 504
    err.message = '网络请求超时，请稍候再试！'
    return err
  }
  if (!err.response) {
    err.statusCode = 502
    err.message = '网络错误，请刷新网页重试！'
    return err
  }
  err.statusCode = err.response.status
  err.message = err.response.data.message
  return err
}
