// pages/products/items/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product:{
      type: Object,
      value: {}
    }
  },
  ready(){
   
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(){
      const { id, type } = this.data.product
      wx.navigateTo({
        url: `/pages/detail/index?id=${id}&type=${type}`,
      })
    }

  }
})
