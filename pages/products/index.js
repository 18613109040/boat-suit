import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
const app = getApp();
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    customBarHeight: app.globalData.customBarHeight,
    windowHeight: app.globalData.windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 热门产品
    dispatcher.products.getProductsListAction({
      city: "1/44/1",
      orderType: "",
      productType: "NL",
      quotaMin: 1,
      quotaMax: 10,
      repayment: "",
      mortgage: "",
      companyType: "bank",
      skip: 0
    })
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
  clickMenu(e){
    const { index } = e.currentTarget.dataset;
    dispatcher.filter.setProductMenu(index)
  },
  lower(){
    console.dir('==============')
  },
  scroll(){
    console.dir('==============')
  }
}
function mapStateToProps({ products, filter }) {
  const { productMenu } = filter.toJS()
  const { list } = products.toJS()
  return {
    list,
    productMenu
  }
}
Page(connect(mapStateToProps)(pageConfig))