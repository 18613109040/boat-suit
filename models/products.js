import { regeneratorRuntime } from '../libs/zoro'
import { getProductsList } from '../services/products.js'
import Immutable from '../libs/immutable.js'
const inintProducts = {
  flter:[],
  list:[]
}
export default {
  namespace: 'products',
  state: Immutable.fromJS(inintProducts),
  effects: {
    // 获取产品
    async getProductsListAction({ payload }, { put }) {
      const res = await getProductsList(payload)
      if (res.resultCode === 200) {
        put({ type: 'setProductsList', payload: res.data })
      }
    },
  },
  reducers: {
    setProductsList({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, list: payload || [] })
    }
  },
}