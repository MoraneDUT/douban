// pages/search/search.js
let http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Domestic: {}
  },

  goDetail(e) {
    let thisID = e.currentTarget.dataset.tvId;
    wx.navigateTo({
      url: '../detail/detail?id=' + thisID,
    })
  },
  
  getData() {
    let that = this;
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items',
      success(res) {
        that.setData({
          Domestic: res.data,
        })
        // console.log(res.data)
      }
    })
  },
  inputValue(e) {
    let val = e.detail.value;
    console.log(val);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})