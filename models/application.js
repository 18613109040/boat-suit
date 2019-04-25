import { regeneratorRuntime } from '../libs/zoro'
import { startApply, getApplyVerifyCode } from '../services/application.js'
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
  car: '',
  code:''
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
    },
    async getApplyVerifyCodeAction({ payload }, { put }){
      return await getApplyVerifyCode(payload)
      
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
    },
    setFund({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, fund: fund?'有':''}) 
    },
    setSocialSecurity({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, socialSecurity: socialSecurity ? '有' : '' }) 
    },
    selectCar({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, car: car ? '有' : '' }) 
    },
    setCode({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, code: payload }) 
    }
  },
}