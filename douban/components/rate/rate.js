// components/rate/rate.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    val:0
  },
  lifetimes:{
    attached(){
        // console.log(this.data.val/2)
        this.setData({
            valNum: parseInt(this.data.val/2) 
        })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    valNum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})