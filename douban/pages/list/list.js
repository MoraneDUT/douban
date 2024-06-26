// pages/list/list.js

let thisId = "";
let thisStart = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDone: false,
    // wantToWatch:false,
    itemData: {
      count: 0,
      start: 0,
      subject_collection: {},
      subject_collection_items: [],
      total: 0,
      wantToWatch: {}
    }
  },
  //切换想不想看
  toggleWantToWatch: function (event) {
    const videoId = event.currentTarget.dataset.tvId;
    const updatedWantToWatch = {
      ...this.data.wantToWatch
    };
    updatedWantToWatch[videoId] = !updatedWantToWatch[videoId];

     // 更新全局状态并保存到本地存储
    this.setData({
      wantToWatch: updatedWantToWatch
    });
    wx.setStorageSync('wantToWatch', updatedWantToWatch);
    const storedStatuses = wx.getStorageSync('statuses') || {};
    storedStatuses.wantToWatch = updatedWantToWatch;
    wx.setStorageSync('statuses', storedStatuses);
  },
  // 跳转详情页面
  goDetail(e) {
    let thisID = e.currentTarget.dataset.tvId;
    wx.navigateTo({
      url: '../detail/detail?id=' + thisID,
    })
  },
  //获取数据函数 
  getData() {
    wx.showLoading({
      title: '加载中...'
    })
    let that = this;
    let thisUrl = "";
    if (thisId == "tv_domestic ") {
      thisUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items"
    } else if (thisId == "tv_variety_show ") {
      thisUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items"
    } else {
      thisUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_american/items"
    }
    wx.request({
      url: thisUrl,
      data: {
        start: thisStart,
        count: 8
      },
      success(res) {
        // console.log(res.data);
        wx.hideLoading();
         // 从本地存储中读取状态
        const storedWantToWatch = that.data.wantToWatch;
        const updatedItems = res.data.subject_collection_items.map(item => {
          item.wantToWatch = storedWantToWatch[item.id] || false;
          return item;
        });

        that.setData({
          itemData: {
            count: res.data.count,
            start: res.data.start,
            subject_collection: res.data.subject_collection,
            subject_collection_items: that.data.itemData.subject_collection_items.concat(res.data.subject_collection_items),
            total: res.data.total
          }
        })
        thisStart = thisStart + 8;
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    thisId = options.id;
    // const storedWantToWatch = wx.getStorageSync('wantToWatch') || {};
    // this.setData({
    //   wantToWatch: storedWantToWatch
    // });
    this.getData();
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
    const storedStatuses = wx.getStorageSync('statuses') || {};
    this.setData({
      wantToWatch: storedStatuses.wantToWatch || {}
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
    thisStart = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    thisStart = 0;
    this.setData({
      itemData: {
        count: 0,
        start: 0,
        subject_collection: {},
        subject_collection_items: [],
        total: 0
      }
    })
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log("加载数据")
    // let arr1 = [1,2,3,4];
    // let arr2 = [5,6,7,8];
    // console.log(arr1.concat(arr2))
    if (thisStart < this.data.itemData.total) {
      this.getData();
    } else {
      this.setData({
        isDone: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})