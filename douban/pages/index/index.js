
// let http=require("../../utils/http.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    tvDomestic:{},
    tvVarietyShow:{},
    tvAmerican:{}
  },
  // 跳转列表页面
  goList(e){
    let thisID = e.currentTarget.dataset.tarVal
    wx.navigateTo({
      url: '../list/list?id='+thisID,
    })
  },
  //跳转详情页
  goDetail(e){
    let thisID = e.currentTarget.dataset.tvId
    wx.navigateTo({
      url: '../detail/detail?id='+thisID,
    })
  },
  // 请求页面数据
  getData(){
    let that = this;
    // 请求热播国产剧
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=0&count=8',
      success(res){
        // console.log(res.data.subject_collection_items)
        that.setData({
          tvDomestic:res.data,
          isLoading:false
        })
      }
    })
    //请求综艺 
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items?start=0&count=8',
      success(res){
        // console.log(res.data.subject_collection_items)
        that.setData({
          tvVarietyShow:res.data
        })
      }
    })
     //请求英美剧 
     wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_american/items?start=0&count=8',
      success(res){
        // console.log(res.data.subject_collection_items)
        that.setData({
          tvAmerican:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
  },


  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
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