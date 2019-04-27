import { regeneratorRuntime } from '../libs/zoro'
import { getApplyLog } from '../services/record.js'
import Immutable from '../libs/immutable.js'
const inintApplylog = {
  list: []
}
export default {
  namespace: 'record',
  state: Immutable.fromJS(inintApplylog),
  effects: {
    // 获取申请记录
    async getApplyLogAction({ payload }, { put }) {
      const res = await getApplyLog(payload)
      if (res.resultCode === 200) {
        put({ type: 'setApplyLog', payload: res.data })
      }
    },

  },
  reducers: {
    setApplyLog({ payload }, state) {
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, list: payload })
    }
  }
}