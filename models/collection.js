import { regeneratorRuntime } from '../libs/zoro'
import { addFavorite, removeFavorite, getFavorite } from '../services/collection.js'
import Immutable from '../libs/immutable.js'
const inintCollection = {
  list:[]
}
export default {
  namespace: 'collection',
  state: Immutable.fromJS(inintCollection),
  effects: {
    // 收藏
    async addFavoriteAction({ payload }, { put }) {
      return await addFavorite(payload)
    },
    //取消收藏
    async removeFavoriteAction({ payload }, { put }) {
      return await removeFavorite(payload)
    },
    async getFavoriteAction({ payload }, { put }){
      const res = await getFavorite(payload)
      if (res.resultCode === 200) {
        put({ type: 'setFavorite', payload: res.data })
      }
    }

  },
  reducers: {
    setFavorite({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, list: payload })
    }
  }
}