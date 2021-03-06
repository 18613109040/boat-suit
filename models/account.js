import { regeneratorRuntime } from '../libs/zoro'
import { getCurrentAddress } from '../utils/position.js'
import { wxCheckCode, wxCheckPhone, getUserApplyInfo } from '../services/account.js'
const city = require('../utils/city.js');
import Immutable from '../libs/immutable.js'
const inintAccount = {
  userInfo: wx.getStorageSync("userInfo")|| { hasPhone: false },
  applyInfo:{}
}
export default {
  namespace: 'account',
  state: Immutable.fromJS(inintAccount),
  effects: {
    async wxCheckCodeAction({ payload }, { put }){
      const res =  await wxCheckCode(payload)
      if (res.resultCode==200) {
        put({ type: 'setAccountInfo', payload: res.data })
      }
    },
    async wxCheckPhoneAction({ payload }, { put }) {
      const res = await wxCheckPhone(payload)
      if (res.resultCode == 200) {
        // put({ type: 'setAccountInfo', payload: res.data })
      }
    },
    async getUserApplyInfo({ payload }, { put }){
      const res = await getUserApplyInfo(payload)
      if (res.resultCode == 200) {
        put({ type: 'setUserApplyInfo', payload: res.data })
      }
    }
    
  },
  reducers: {
    setAccountInfo({ payload }, state){
      let newState = state.toJS()
      newState.userInfo = payload.userInfo;
      wx.setStorageSync('userInfo', payload.userInfo)
      wx.setStorage({
        key: 'token',
        data: payload.token
      })
      return Immutable.fromJS({ ...newState })
    }
  },
  setUserApplyInfo({ payload }, state){
    let newState = state.toJS()
    return Immutable.fromJS({ ...newState, applyInfo: payload })
  }
}