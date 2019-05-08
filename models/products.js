import { regeneratorRuntime } from '../libs/zoro'
import { getProductsList, getProductDetail } from '../services/products.js'
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
        put({ type: 'setProductsList', payload: { data: res.data || [], type: payload.productType} })
      }
      return res
    }
  },
  reducers: {
    setProductsList({ payload }, state) {
      let newState = state.toJS()
      const { data, type} = payload
      const list = [...newState.list, ...data]
      newState.list = list
      return Immutable.fromJS(newState)
    },
    emptyProductList({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, list: [] })
      
    }
  },
}