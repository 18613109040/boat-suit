const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    left:{
      type: Boolean,
      value: false,
    },
    center:{
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '测试标题',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    customBarHeight: app.globalData.customBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
