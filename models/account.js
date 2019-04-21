import { regeneratorRuntime } from '../libs/zoro'
import { getCurrentAddress } from '../utils/position.js'
const city = require('../utils/city.js');
import Immutable from '../libs/immutable.js'
const inintAccount = {
   city:{
     name:'',
     code:''
   },
  searchLetter:[],
  cityList:[]
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
    }
  },
}