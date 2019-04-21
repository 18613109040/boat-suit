import {  promise } from '../../utils/util.js'
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
    banner:[{
      imageUrl:'/images/home/banner.png'
    },{
        imageUrl: '/images/home/banner.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 热门产品
    dispatcher.home.getNewProductsAction({
      city: "1/44/1",
      recommendType: "N"
    })
    // 最新产品
    dispatcher.home.getHotProductsAction({
      city: "1/44/1",
      recommendType: "H"
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
  swiperlClick(){

  },
  toSelectPage(){
    wx.navigateTo({
      url: '/pages/citySelect/index',
    })
  },
  goToNew(){
    dispatcher.filter.setProductMenu(0)
    wx.switchTab({
      url: '/pages/products/index',
    })
  },
  goToHot(){
    dispatcher.filter.setProductMenu(1)
    wx.switchTab({
      url: '/pages/products/index',
    })
  },
  gotoDetails(e){
    const { id, type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}&type=${type}`,
    })
  }
}
function mapStateToProps({ home, account, citys }) {
  const { newProducts, hotProducts } = home.toJS()
  const { city } = citys.toJS()
  return {
    newProducts,
    hotProducts,
    city
  }
}
Page(connect(mapStateToProps)(pageConfig))