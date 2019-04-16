import { regeneratorRuntime } from '../libs/zoro'
import { getNewProducts, getHotProducts } from '../services/home.js'
import Immutable from '../libs/immutable.js'
const inintHome = {
  newProducts: [],
  hotProducts: []
}
export default {
  namespace: 'home',
  state: Immutable.fromJS(inintHome),
  effects: {
    // 获取最新产品
    async getNewProductsAction({ payload }, { put }) {
      const res = await getNewProducts(payload)
      if (res.resultCode === 200) {
        put({ type: 'setNewProducts', payload: res.data })
      }
    },
    async getHotProductsAction({ payload }, { put }) {
      const res = await getHotProducts(payload)
      if (res.resultCode === 200) {
        put({ type: 'setHotProducts', payload: res.data })
      }
    },
    
  },
  reducers: {
    setNewProducts({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, newProducts: payload || [] })
    },
    setHotProducts({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, hotProducts: payload || [] })
    },
  },
}