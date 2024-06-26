function request(url, callBack) {
  wx.request({
    url: url,
    success(res) {
      callBack(res.data)
    }
  })
}

module.exports = {
  request: request
}