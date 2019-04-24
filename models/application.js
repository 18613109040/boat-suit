import { regeneratorRuntime } from '../libs/zoro'
import { startApply } from '../services/products.js'
import Immutable from '../libs/immutable.js'
const inintApplication = {
  desc:"",
  houseList:[],
  incomeList:[],
  professionList:[],
  selectHouseIndex:-1,
  selectIncomeIndex:-1,
  selectProfessionIndex:-1,
  idCard: '',
  name: '',
  phone:'',
  fund:'',
  socialSecurity:'',
  car: ''
}
export default {
  namespace: 'application',
  state: Immutable.fromJS(inintApplication),
  effects: {
    // 产品申请
    async startApplyAction({ payload }, { put }) {
      const res = await startApply(payload)
      if (res.resultCode === 200) {
        put({ type: 'setApply', payload: res.data })
      }
      return res
    }
  },
  reducers: {
    setApply({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, ...payload.applyData, desc: payload.desc })
    },
    setProfessionIndex({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, selectProfessionIndex: payload })
    },
    setIncomeIndex({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, selectIncomeIndex: payload })
    },
    setHouseIndex({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, selectHouseIndex: payload })
    },
    setName({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, name: payload })
    },
    setIdCard({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, idCard: payload })
    },
    setPhone({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, phone: payload }) 
    }
  },
}