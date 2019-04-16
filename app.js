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
    app.setup()
  },
  globalData: {
    userInfo: null,
    color: '#FF7920',
    point: {
      latitude: 0,
      longitude: 0
    }
  }
})
