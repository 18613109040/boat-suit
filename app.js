import zoro, { dispatcher } from './libs/zoro.js'
import { setStore } from './libs/weapp-redux.js'
import home from './models/home.js'
import products from './models/products.js'
import account from './models/account.js'
import filter from './models/filter.js'
import citys from './models/citys.js'
import application from './models/application.js'
import collection from './models/collection.js'
import record from './models/record.js'
const app = zoro()
app.model(home)
app.model(products)
app.model(account)
app.model(filter)
app.model(citys)
app.model(application)
app.model(collection)
app.model(record)

const store = app.start(false)
setStore(store)
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
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
        this.globalData.screenHeight = windowHeight - this.globalData.customBarHeight - statusBarHeight;
        this.globalData.height = screenHeight - this.globalData.customBarHeight - statusBarHeight;
        this.globalData.tabBarHeight = screenHeight - windowHeight
        // this.globalData.customBarHeight = custom.height + custom.top - statusBarHeight;
        
      }
    })
    app.setup();
    // dispatcher.citys.getCurrentCityAction();
  },
  globalData: {
    userInfo: null,
    statusBarHeight: 20,
    customBarHeight: 44,
    screenHeight: 667,
    windowHeight: 667,
    tabBarHeight: 50,
    height: 667,
    custom:{

    }
  }
})
