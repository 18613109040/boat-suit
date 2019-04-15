
Component({
  /**
   * 组件的属性列表
   * @swiperList {Array} 数据
   * @indicatorDots {Boolean} 是否显示面板指示点
   * @indicatorColor {Color} 指示点颜色
   * @indicatorActiveColor {Color} 当前选中的指示点颜色
   * @autoplay {Boolean} 是否自动切换
   * @interval {Number} 自动切换时间间隔
   * @duration {Number} 滑动动画时长
   * @circular {Boolean} 是否采用衔接滑动
   */
  properties: {
    swiperList:{
      type: Array,
      value: []
    },
    indicatorDots:{
      type: Boolean,
      value:true
    },
    indicatorColor:{
      type: String,
      value: '#8799a3'
    },
    indicatorActiveColor:{
      type: String,
      value: '#0081ff'
    },
    autoplay:{
      type: Boolean,
      value: true
    },
    interval:{
      type: Number,
      value: 5000
    },
    duration:{
      type: Number,
      value: 500
    },
    circular:{
      type: Boolean,
      value: true
    },
    dotStyle:{
      type: Boolean,
      value: false
    },
    imageModel:{
      type: String,
      value: ''
    },
    easingFunction:{
      type: String,
      value: 'default'
    }
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
    bindchange(e){
      const { item } = e.currentTarget.dataset;
      this.triggerEvent('swiperlClick', item)
    }
  }
})
