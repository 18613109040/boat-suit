import { host } from '../config.js'
export function request(options) {
  let token = wx.getStorageSync('token');
  let guid = wx.getStorageSync('guid')
  let params = {
    url: `${host}/${options.url}`,
    data: options.data,
    method: options.method || 'GET',
    header: {
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
          // token 过期
          if(res.statusCode === 401){
            // resolve({ resultCode: 401})
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


