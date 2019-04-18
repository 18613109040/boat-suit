import {  promise } from '../../utils/util.js'

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
    banner:[{
      imageUrl:'//static.rong360.com/upload/jpg/83/e6/83e6bfdf4fdd3c6a54fa44c8654a4014.jpg'
    },{
        imageUrl: '//static.rong360.com/upload/png/b7/2a/b72a5142d1592212e93b4378599a9590.png'
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
  }
}
function mapStateToProps({ home, account }) {
  const { newProducts, hotProducts } = home.toJS()
  const { city } = account.toJS()
  return {
    newProducts,
    hotProducts,
    city
  }
}
Page(connect(mapStateToProps)(pageConfig))