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
  getUserInfo(e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    const { userInfo, encryptedData, iv } = e.detail;
    wx.login({
      success(res) {
        if (res.code) {
          dispatcher.account.wxCheckCodeAction({
            code: res.code,
            nickName: userInfo.nickName,
            avatar: userInfo.avatarUrl
          }).then(res => {
            if (res.resultCode != 200) {
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000
              })
            }else{
              wx.navigateBack()
            }
          })
          // wx.navigateBack()
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  toRegister(){
    wx.navigateTo({
      url: '/pages/register/index',
    })
  }
}
function mapStateToProps({  }) {
  return {
    
  }
}
Page(connect(mapStateToProps)(pageConfig))