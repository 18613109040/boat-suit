import { host } from '../config.js'
export function request(options) {
  let token = wx.getStorageSync('token');
  let guid = wx.getStorageSync('guid')
  let params = {
    url: `${host}/${options.url}`,
    data: options.data,
    method: options.method || 'GET',
    header: {
      "igola-client":"ios_native",
      "Version-Name": 13.0,
      "Authorization": `Bearer ${token}`,
      "guid":guid,
      ...options.header
    }
  }
  return new Promise((resolve, reject) => {
    wx.request(
      Object.assign({
        ...params,
        success: (res) => {
          const data = res.data;
          // 有些接口返回没有状态码 统一处理成 {resultCode:Number,data:any}形式
          // token 过期
          if(res.statusCode === 401){
            wx.switchTab({
              url: '/pages/account/index',
            })
          }else{
            resolve(data)
          }
        },
        fail: reject
      })
    )
  })
}


