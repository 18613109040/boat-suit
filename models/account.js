import { regeneratorRuntime } from '../libs/zoro'
import { promise } from '../utils/util'
import Immutable from '../libs/immutable.js'
const wxLogin = promise(wx.login)
const inintAccount = {
  
}
export default {
  namespace: 'account',
  state: Immutable.fromJS(inintAccount),
  effects: {
    async login({ payload }, { put }) {
      // const { code } = await wxLogin()
      // const { openid} = await getOpenid({ code: code})
      // const res = await getLoginInfo({ openId: openid, nickName: payload.nickName})
      // console.dir(res)
      // if (res.resultCode === 200){
      //   put({ type: 'setLoginInfo', payload: res.data })
      //   wx.setStorageSync('token', res.data.token)
      //   wx.setStorageSync('guid', res.data.guid)
      //   wx.setStorageSync('refresh_token', res.data.refresh_token)
      // }
        
      // 发送code到后台服务器中获取openId, sessionKey, unionId
    }
  },
  reducers: {
    setParams({ payload }, state){
      // let newState = state.toJS()
      // const token = wx.getStorageSync('token')
      // const guid = wx.getStorageSync('guid')
      // const refresh_token = wx.getStorageSync('refresh_token')
      // Object.assign(newState.loginInfo, { token: token, guid: guid, refresh_token: refresh_token})
      return Immutable.fromJS(newState)
    },
    

  },
}