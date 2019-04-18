import { regeneratorRuntime } from '../libs/zoro'
// import { getProductsList } from '../services/products.js'
import { getCurrentAddress } from '../utils/position.js'
import Immutable from '../libs/immutable.js'
const inintAccount = {
   city:{
     name:''
   }
}
export default {
  namespace: 'account',
  state: Immutable.fromJS(inintAccount),
  effects: {
    // 获取定位城市
    async getCurrentCityAction({ payload }, { put }) {
      const cityName = await getCurrentAddress()
      console.dir(city)
      const city = { name: cityName}
      put({ type: 'setCurrentCity', payload: city })
      // const res = await getProductsList(payload)
      // if (res.resultCode === 200) {
      //   put({ type: 'setProductsList', payload: res.data })
      // }
    },
  },
  reducers: {
    setCurrentCity({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, city: payload  })
    }
  },
}