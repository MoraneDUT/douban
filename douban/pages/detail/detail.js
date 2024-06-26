// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    wantToWatch: false,
    watching: false,
    watched: false
  },

  getData(id) {
    wx.showLoading({
      title: '加载中···',
    })
    let that = this;
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/tv/' + id,
      success(res) {
        wx.hideLoading();
        // console.log(res)
        that.setData({
          formData: res.data
        });
        //修改导航条颜色
        wx.setNavigationBarColor({
          backgroundColor: '#' + res.data.color_scheme.primary_color_light,
          frontColor: '#ffffff',
        });
        wx.setNavigationBarTitle({
          title: res.data.title
        });
        // 读取本地存储的状态
        const storedStatuses = wx.getStorageSync('statuses') || {};
        that.setData({
          wantToWatch: storedStatuses.wantToWatch && storedStatuses.wantToWatch[id] || false,
          watching: storedStatuses.watching && storedStatuses.watching[id] || false,
          watched: storedStatuses.watched && storedStatuses.watched[id] || false
        });
      }
    });
  },
  // 切换“想看”状态
  toggleWantToWatch() {
    const videoId = this.data.formData.id;
    const updatedWantToWatch = !this.data.wantToWatch;
    this.setData({
      wantToWatch: updatedWantToWatch
    });

    // 保存到本地存储
    const storedStatuses = wx.getStorageSync('statuses') || {};
    if (!storedStatuses.wantToWatch) storedStatuses.wantToWatch = {};
    storedStatuses.wantToWatch[this.data.formData.id] = updatedWantToWatch;
    wx.setStorageSync('statuses', storedStatuses);
  },

  // 切换“在看”状态
  toggleWatching() {
    const updatedWatching = !this.data.watching;
    this.setData({
      watching: updatedWatching
    });

    // 保存到本地存储
    const storedStatuses = wx.getStorageSync('statuses') || {};
    if (!storedStatuses.watching) storedStatuses.watching = {};
    storedStatuses.watching[this.data.formData.id] = updatedWatching;
    wx.setStorageSync('statuses', storedStatuses);
  },

  // 切换“看过”状态
  toggleWatched() {
    const updatedWatched = !this.data.watched;
    this.setData({
      watched: updatedWatched
    });

    // 保存到本地存储
    const storedStatuses = wx.getStorageSync('statuses') || {};
    if (!storedStatuses.watched) storedStatuses.watched = {};
    storedStatuses.watched[this.data.formData.id] = updatedWatched;
    wx.setStorageSync('statuses', storedStatuses);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData(options.id);
    const videoId = options.id;
    this.getData(videoId);

    // 从本地存储读取状态
    const storedStatuses = wx.getStorageSync('statuses') || {};
    this.setData({
      wantToWatch: storedStatuses.wantToWatch && storedStatuses.wantToWatch[videoId] || false
    });
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
    const videoId = this.data.formData.id;

    // 从本地存储读取状态
    const storedStatuses = wx.getStorageSync('statuses') || {};
    this.setData({
      wantToWatch: storedStatuses.wantToWatch && storedStatuses.wantToWatch[videoId] || false
    });
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
    return {
      title: this.data.formData.title,
      path: `/pages/detail/detail?id=${this.data.formData.id}`
    };
  }
})