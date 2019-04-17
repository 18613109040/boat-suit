import zoro, { dispatcher } from './libs/zoro.js'
import { setStore } from './libs/weapp-redux.js'
import home from './models/home.js'
import products from './models/products.js'
const app = zoro()
app.model(home)
app.model(products)

const store = app.start(false)
setStore(store)
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        const { statusBarHeight } = e;
        this.globalData.statusBarHeight = statusBarHeight;
        // const { width, height, top, bottom, right}  = wx.getMenuButtonBoundingClientRect();
        // this.globalData.customBarHeight = bottom + top - statusBarHeight;
        // console.dir(wx.getMenuButtonBoundingClientRect())
      }
    })
    app.setup()
  },
  globalData: {
    userInfo: null,
    statusBarHeight: 20
  }
})
