import { regeneratorRuntime } from '../libs/zoro'
import { getCurrentAddress } from '../utils/position.js'
import { getHotCitys } from '../services/citys.js'
const city = require('../utils/city.js');
import Immutable from '../libs/immutable.js'
const inintCitys = {
  city: {
    name: '',
    code: ''
  },
  hotCitys: [],
  searchLetter: [],
  cityList: []
}
export default {
  namespace: 'citys',
  state: Immutable.fromJS(inintCitys),
  effects: {
    // 获取定位城市
    async getCurrentCityAction({ payload }, { put }) {
      const city = await getCurrentAddress()
      put({ type: 'setCurrentCity', payload: city })
    },
    async getHotCitysAction({ payload }, { put }) {
      const res = await getHotCitys(payload)
      if (res.resultCode === 200) {
        put({ type: 'setHotCitys', payload: res.data })
      }
    }
  },
  reducers: {
    setCurrentCity({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, city: payload })
    },
    setSearchLetter({ payload }, state) {
      let newState = state.toJS()
      var searchLetter = city.searchLetter;
      var cityList = city.cityList();
      return Immutable.fromJS({ ...newState, searchLetter, cityList })
    },
    setCitySelected({ payload }, state) {
      let newState = state.toJS()
      const indx = payload.index.split('-')
      newState.city.name = newState.cityList[indx[0]].cityInfo[indx[1]].city
      newState.city.code = newState.cityList[indx[0]].cityInfo[indx[1]].code
      return Immutable.fromJS({ ...newState })
    },
    setHotCitys({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, hotCitys: payload || [] })
    },
    setHotCitySelected({ payload }, state){
      let newState = state.toJS()
      console.dir(payload)
      return Immutable.fromJS({ ...newState, city: payload || {} })
    }
  },
}