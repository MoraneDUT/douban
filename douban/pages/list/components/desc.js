// pages/list/components/desc.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    val:""
  },
  lifetimes:{
    attached(){
        this.formatFun()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    valStr:"",
    isMore:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展开按钮事件
    showMore(){
        this.setData({
            valStr:this.data.val,
            isMore:false
        })
    },
    // 格式化初始文本
    formatFun(){
        let thisStr = this.data.val;
        if(thisStr.length>50){
            thisStr = thisStr.substr(0,60)
            this.setData({
                valStr:thisStr,
                isMore:true
            })
        }else{
            this.setData({
                valStr:this.data.val
            })
        }
    }
  }
})