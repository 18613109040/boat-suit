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
    console.dir(options)
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

  getUserInfo(e){
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') return 
    const { userInfo, encryptedData, iv } = e.detail;
    wx.login({
      success(res) {
        if (res.code) {
          dispatcher.account.wxCheckCodeAction({
            code: res.code,
            nickName: userInfo.nickName,
            avatar: userInfo.avatarUrl
          }).then(res=>{
            if (res.resultCode != 200){
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
          // wx.navigateBack()
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  collection(){
    wx.navigateTo({
      url: '/pages/collection/index',
    })
  },
  record(){
    wx.navigateTo({
      url: '/pages/record/index',
    })
  },
  personalInfo(){
    wx.navigateTo({
      url: '/pages/personalInfo/index',
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