import { regeneratorRuntime } from '../libs/zoro'
import { getCurrentAddress } from '../utils/position.js'
import { wxCheckCode, wxCheckPhone } from '../services/account.js'
const city = require('../utils/city.js');
import Immutable from '../libs/immutable.js'
const inintAccount = {
   city:{
     name:'',
     code:''
   },
  searchLetter:[],
  cityList:[],
  userInfo: wx.getStorageSync("userInfo")|| {}
}
export default {
  namespace: 'account',
  state: Immutable.fromJS(inintAccount),
  effects: {
    // 获取定位城市
    async getCurrentCityAction({ payload }, { put }) {
      const cityName = await getCurrentAddress()
      const city = { name: cityName}
      put({ type: 'setCurrentCity', payload: city })
    },
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
    }
    
  },
  reducers: {
    setCurrentCity({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, city: payload  })
    },
    setSearchLetter({ payload }, state){
      let newState = state.toJS()
      var searchLetter = city.searchLetter;
      var cityList = city.cityList();
      return Immutable.fromJS({ ...newState, searchLetter, cityList })
    },
    setCitySelected({ payload }, state){
      let newState = state.toJS()
      const indx = payload.index.split('-')
      newState.city.name = newState.cityList[indx[0]].cityInfo[indx[1]].city
      newState.city.code = newState.cityList[indx[0]].cityInfo[indx[1]].code
      return Immutable.fromJS({ ...newState })
    },
    setAccountInfo({ payload }, state){
      let newState = state.toJS()
      newState.userInfo = payload.userInfo;
      wx.setStorageSync('userInfo', payload.userInfo)
      wx.setStorage({
        key: 'token',
        data: payload.token
      })
    }
  },
}