const app = getApp();
import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
import { isIdCard, isName, isPone } from '../../utils/util.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.screenHeight,
    tabBarHeight: app.globalData.tabBarHeight,
    options: {},
    text: '获取验证码',
    number: 60,
    isCountDown: false
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
    dispatcher.account.getUserApplyInfo()
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
  bindChangeProfess(e) {
    const { value } = e.detail;
    dispatcher.application.setProfessionIndex(value)
  },
  bindChangeIncome(e) {
    const { value } = e.detail;
    dispatcher.application.setIncomeIndex(value)
  },
  bindChangeHouse(e) {
    const { value } = e.detail;
    dispatcher.application.setHouseIndex(value)
  },
  changeName(e) {
    const { value } = e.detail
    if (!isName(value)) {
      wx.showToast({
        title: '用户名不正确',
        icon: 'none',
        duration: 2000
      })
    }
    dispatcher.application.setName(value)
  },
  changeIdCard(e) {
    const { value } = e.detail
    if (!isIdCard(value)) {
      wx.showToast({
        title: '身份证号码不正确',
        icon: 'none',
        duration: 2000
      })
    }
    dispatcher.application.setIdCard(value)
  },
  changePhone(e) {
    const { value } = e.detail
    if (!isPone(value)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none',
        duration: 2000
      })
    }
    dispatcher.application.setPhone(value)
  },
  selectFund() {
    dispatcher.application.setFund()
  },
  selectSocialSecurity() {
    dispatcher.application.setSocialSecurity()
  },
  selectCar() {
    dispatcher.application.setCar()
  },
 
  changeCode(e) {
    const { value } = e.detail
    dispatcher.application.setCode(value)
  },
 

}
function mapStateToProps({ account }) {
  const { applyInfo } = account.toJS()
  return {
    applyInfo
  }
}
Page(connect(mapStateToProps)(pageConfig))