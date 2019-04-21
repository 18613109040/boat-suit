import { regeneratorRuntime } from '../libs/zoro'
import { getProductsList, getProductDetail } from '../services/products.js'
import Immutable from '../libs/immutable.js'
const inintProducts = {
  flter:[],
  nlList:[],
  blList:[],
  detail:{}
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
    },
    //获取产品详情
    async getProductDetailAction({ payload }, { put }) {
      const res = await getProductDetail(payload)
      if (res.resultCode === 200) {
        put({ type: 'setProductDetail', payload: res.data })
      }
    },
  },
  reducers: {
    setProductsList({ payload }, state) {
      let newState = state.toJS()
      const { data, type} = payload
      newState[`${type.toLowerCase()}List`] = [...newState[`${type.toLowerCase()}List`], ...data]
      return Immutable.fromJS(newState)
    },
    setProductDetail({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, detail: payload || {} })
    },
    emptyProductList({ payload }, state){
      if (payload == 'nl'){
        return Immutable.fromJS({ ...newState, nlList: [] })
      } else if (payload =='bl'){
        return Immutable.fromJS({ ...newState, nlList: [] })
      }else{
        return Immutable.fromJS({ ...newState, nlList: [], blList:[] })
      }
      
    }
  },
}