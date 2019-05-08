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
    options:{},
    cureentIndex:-1,
    name:-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = {
      id:724 ,
      type:'NL'
    }
    this.setData({
      options
    })
    dispatcher.details.getAssessAction(options)
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
  toDetail(){
    wx.navigateBack()
  },
  loadMore(e){
    const { options } = this.data;
    const { index, item, name } = e.currentTarget.dataset;
    if (item.list&&item.list.length==0){
      this.setData({
        cureentIndex : index,
        name:name
      })
      dispatcher.details.getAssessRecommendAction({
        id: options.id,
        type: options.type,
        assessType: item.type,
        assessLevel: item.level,
        index: index,
        name: name
      }).then(res=>{
        this.setData({
          cureentIndex: -1,
          name: -1
        })
        dispatcher.details.setSelectd({ index, name })
      })
    }else{
      dispatcher.details.setSelectd({ index, name })
    }
  },
  startApply() {
    const { nickName } = this.data
    dispatcher.application.startApplyAction(this.data.options).then(res => {
      if (res.resultCode === 200) {
        if (res.data.resultType == 'jump') {
          wx.navigateTo({
            url: `/pages/webView/index?url=${res.data.url}`,
          })
        } else {
          wx.navigateTo({
            url: '/pages/application/index',
          })
        }
      } else {
      }
    })
  },
  gotoDetails(e) {
    const { id, type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}&type=${type}`,
    })
  }

}
function mapStateToProps({ details }) {
  const { assess, detail } = details.toJS()
  const { baseAssess, conditionAssess, deepAssess } = assess
  return {
    baseAssess,
    conditionAssess, 
    deepAssess,
    detail
  }
}
Page(connect(mapStateToProps)(pageConfig))