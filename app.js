import zoro, { dispatcher } from './libs/zoro.js'
import { setStore } from './libs/weapp-redux.js'
import home from './models/home.js'
import products from './models/products.js'
import account from './models/account.js'
import filter from './models/filter.js'
const app = zoro()
app.model(home)
app.model(products)
app.model(account)
app.model(filter)


const store = app.start(false)
setStore(store)
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        console.dir(e)
        const { statusBarHeight, system, screenHeight, windowHeight } = e;
        this.globalData.statusBarHeight = statusBarHeight;
        this.globalData.windowHeight = windowHeight;
        const custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.custom = custom;  
        if((/ios/i).test(system)){
          this.globalData.customBarHeight = 44
        }else{
          this.globalData.customBarHeight = 48
        }
        this.globalData.screenHeight = screenHeight
        // this.globalData.customBarHeight = custom.height + custom.top - statusBarHeight;
        
      }
    })
    app.setup();
    dispatcher.account.getCurrentCityAction();
  },
  globalData: {
    userInfo: null,
    statusBarHeight: 20,
    customBarHeight: 44,
    screenHeight: 667,
    windowHeight: 667,
    custom:{

    }
  }
})
