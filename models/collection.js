import { regeneratorRuntime } from '../libs/zoro'
import { addFavorite, removeFavorite } from '../services/collection.js'
import Immutable from '../libs/immutable.js'
const inintCollection = {

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
    }

  },
  reducers: {
   
  }
}