const app = getApp();
import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.screenHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPhoneNumber(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  getPhoneNumber(e){
    const {encryptedData, iv } = e.detail;
    wx.login({
      success(res) {
        if (res.code) {
          dispatcher.account.wxCheckPhoneAction({
            code: res.code,
            encryptedData: encryptedData,
            iv: iv
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo(e){
    const { userInfo, encryptedData, iv } = e.detail;
    wx.login({
      success(res) {
        if (res.code) {
          dispatcher.account.wxCheckCodeAction({
            code: res.code,
            nickName: userInfo.nickName,
            avatar: userInfo.avatarUrl
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}
function mapStateToProps({ account }) {
  const { userInfo } = account.toJS()
  return {
    userInfo
  }
}
Page(connect(mapStateToProps)(pageConfig))