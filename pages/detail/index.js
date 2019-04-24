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
    options: {},
    cabinOptions:[{
      name: '12月',
      value:12
    }, {
        name: '11月',
        value: 11
      }, {
        name: '10月',
        value: 10
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.dir(options)
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
    console.dir(e.detail.value)
    const { value } = e.detail
    dispatcher.products.setMoney(value)
  },
  startApply(){
    dispatcher.application.startApplyAction(this.data.options).then(res=>{
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
      }
    })
  }
}
function mapStateToProps({ products }) {
  const { detail } = products.toJS()
  const currentPriod = detail.periodValue&&detail.periodValues.find(item=>item.selected)||{}
  const interest = Math.round(detail.money * detail.rateValue * currentPriod.value)
  return {
    detail,
    currentPriod,
    interest
  }
}
Page(connect(mapStateToProps)(pageConfig))