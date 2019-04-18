const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    leftSolt: {
      type: Boolean,
      value: false,
    },
    contentSolt:{
      type: Boolean,
      value: false,
    },
    // 这里定义属性，属性值可以在组件使用时指定
    back: {//是否显示返回
      type: Boolean,
      value: false,
    },
    background: {//导航栏背景色
      type: String,
      value: '#ffffff',//默认
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    placeholderBg: {//导航栏占位栏背景色
      type: String,
      value: 'transparent',//默认
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    color: {//导航栏字体色
      type: String,
      value: '#000000',//默认
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fontSize: {//导航栏字大小
      type: String,
      value: '40rpx',//默认
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    title: {//导航栏标题
      type: String,
      value: 'none', //默认
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fixed: {//导航栏是否fixed定位
      type: Boolean,
      value: true, //默认
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (newVal !== false && newVal !== true) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
  },
  data: {
    // 这里是一些组件内部数据
    statusBarHeight: app.globalData.statusBarHeight,
    customBarHeight: app.globalData.customBarHeight,
    show: true,//是否显示导航栏
  },
  methods: {
    // 这里是一个自定义方法
    navigateBack() {
     
    },
    /**
     * 切换导航栏显示
      */
    toggleShow() {
      if (!this.data.show) {
        this.setData({ show: true });
      }
    },
    /**
     * 切换导航栏隐藏
      */
    toggleHide() {
      if (this.data.show) {
        this.setData({ show: false });
      }
    }
  }
})
// const app = getApp();
// Component({
//   options: {
//     multipleSlots: true // 在组件定义时的选项中启用多slot支持
//   },
//   /**
//    * 组件的属性列表
//    */
//   properties: {
//     left: {
//       type: Boolean,
//       value: false,
//     },
//     center: {
//       type: Boolean,
//       value: false,
//     },
//     title: {
//       type: String,
//       value: '测试标题',
//     }
//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
//     statusBarHeight: app.globalData.statusBarHeight,
//     customBarHeight: app.globalData.customBarHeight,
//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {

//   }
// })
