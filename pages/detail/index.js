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
    tabBarHeight: app.globalData.tabBarHeight,
    options: {
      type: ''
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    dispatcher.products.getProductDetailAction(options)
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
  pickerCabin(e){
    const { value } = e.detail;
    dispatcher.products.setChangePeriod(value)
    
  },
  selectMonry(e){
    const { value } = e.detail
    dispatcher.products.setMoney(value)
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  getPhoneNumber(e) {
    const { encryptedData, iv } = e.detail;
    wx.login({
        success(res) {
          if (res.code) {
            dispatcher.account.wxCheckPhoneAction({
              code: res.code,
              encryptedData: encryptedData,
              iv: iv
            }).then(res => {
              if (res.resultCode == 200)
                this.startApply()
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    
  },
  startApply(){
    const { nickName } = this.data
    dispatcher.application.startApplyAction(this.data.options).then(res=>{
      console.dir(res)
      if (res.resultCode === 200){
        if (res.data.resultType=='jump'){
          wx.navigateTo({
            url: `/pages/webView/index?url=${res.data.url}`,
          })
        }else{
          wx.navigateTo({
            url: '/pages/application/index',
          })
        }
      }else{
        // const { id, type } = this.data.options;
        // wx.switchTab({
        //   url: `/pages/account/index?url="/pages/detail/index?id=${id}&type=${type}"`,
        // })
      }
    })
  },
  // 收藏
  addFavorite(){
    const token = wx.getStorageSync('token')
    if (token){
      dispatcher.collection.addFavoriteAction(this.data.options).then(res=>{
        if (res.resultCode==200){
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 2000
          })
          dispatcher.products.setFavorite(true)
        }
      })
    }else{
      wx.showToast({
        title: '用户尚未登录,请先登录',
        icon: 'none',
        duration: 2000
      })
    }
     
  },
  // 取消收藏
  removeFavorite(){
    dispatcher.collection.removeFavoriteAction(this.data.options).then(res=>{
     
      if (res.resultCode == 200) {
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
          duration: 2000
        })
        dispatcher.products.setFavorite(false)
      }
    })
  }
  
}
function mapStateToProps({ products, account }) {
  const { detail } = products.toJS()
  const { userInfo } = account.toJS()
  
  const currentPriod = detail.periodValues&&detail.periodValues.find(item=>item.selected)||{}
  const interest = Math.round(detail.money * detail.rateValue * currentPriod.value)
  return {
    detail,
    currentPriod,
    interest,
    hasPhone: userInfo.hasPhone,
    nickName: userInfo.nickName
  }
}
Page(connect(mapStateToProps)(pageConfig))