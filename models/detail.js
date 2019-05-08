import { regeneratorRuntime } from '../libs/zoro'
import { getProductDetail, getAssess, getAssessRecommend } from '../services/products.js'
import Immutable from '../libs/immutable.js'
const inintProducts = {
  detail: {
    periodValues: []
  },
  assess: {
    baseAssess:[],
    conditionAssess:[],
    deepAssess:[] 
  }
}
export default {
  namespace: 'details',
  state: Immutable.fromJS(inintProducts),
  effects: {
    //获取产品详情
    async getProductDetailAction({ payload }, { put }) {
      const res = await getProductDetail(payload)
      if (res.resultCode === 200) {
        put({ type: 'setProductDetail', payload: res.data })
      }
    },
    async getAssessAction({ payload }, { put }) {
      const res = await getAssess(payload)
      if (res.resultCode === 200) {
        put({ type: 'setAssess', payload: res.data })
      }
    },
    async getAssessRecommendAction({ payload }, { put }){
      const res = await getAssessRecommend(payload)
      if (res.resultCode === 200) {
        put({ type: 'setAssessRecommend', payload: { ...res, ...payload} })
      }
      return res
    }
  },
  reducers: {
    setProductDetail({ payload }, state) {
      let newState = state.toJS()
      if (payload.periodValues)
        payload.periodValues[payload.periodValues.length - 1].selected = true
      payload.money = payload.quotaMax
      return Immutable.fromJS({ ...newState, detail: payload || {} })
    },
    setAssess({ payload }, state){
      let newState = state.toJS()
      payload.baseAssess.map(item=>{
        item.selected = false
        item.list = []
      })
      payload.conditionAssess.map(item =>{
        item.selected = false
        item.list = []
      })
      payload.deepAssess.map(item => {
        item.selected = false
        item.list = []
      })
     
      return Immutable.fromJS({ ...newState, assess: payload || {} })
    },
    setSelectd({ payload }, state){
      let newState = state.toJS()
      const { name, index } = payload
      if (name == '1') {
        newState.assess.baseAssess[index].selected = !newState.assess.baseAssess[index].selected
      } else if (name == '2') {
        newState.assess.conditionAssess[index].selected = !newState.assess.conditionAssess[index].selected 
      } else {
        newState.assess.deepAssess[index].selected = !newState.assess.deepAssess[index].selected
      }
      return Immutable.fromJS({ ...newState })
    },
    setAssessRecommend({ payload }, state){
      let newState = state.toJS()
      const { name,data,index } = payload
      console.dir(data)
      if (name == '1'){
        newState.assess.baseAssess[index].list = data
      }else if(name == '2'){
        newState.assess.conditionAssess[index].list = data
      }else{
        newState.assess.deepAssess[index].list = data
      }
      return Immutable.fromJS({ ...newState })
    },
    setMoney({ payload }, state) {
      let newState = state.toJS()
      newState.detail.money = payload
      return Immutable.fromJS(newState)
    },
    setChangePeriod({ payload }, state) {
      let newState = state.toJS()
      newState.detail.periodValues.map((item, index) => {
        item.selected = index == payload ? true : false
      })
      return Immutable.fromJS(newState)
    },
    setFavorite({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, detail: Object.assign(newState.detail, { isFavorite: payload }) })
    },
    emprtyDetail({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS( inintProducts )
    }
  },
}