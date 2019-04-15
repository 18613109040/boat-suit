import zoro, { dispatcher } from './libs/zoro.js'
import { setStore } from './libs/weapp-redux.js'
import account from './models/account.js'
const app = zoro()
app.model(account)

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
