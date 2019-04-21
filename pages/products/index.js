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
    loding: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
    
  },
  getProductList(){
    const { list, productMenu } = this.data;
    const type = productMenu.find(item => item.selected).type
    let skip = 0
    this.setData({
      loding: false
    })
    dispatcher.products.getProductsListAction({
      city: "1/44/1",
      orderType: "", //排序类型  
      productType: type,
      quotaMin: 0, //额度最小
      quotaMax: 0, //额度最大
      repayment: "", //还款方式  FQ 分期 DQ 到期
      mortgage: "", //抵押方式 No 不限 HOUSE 房子 CAR 车 OTHer 不限
      companyType: "", // 机构类型 BANK  小贷公司 LC  PS  other
      skip: skip
    }).then(res=>{
      this.setData({
        loding: true
      })
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
    const { productMenu, nlList, blList } = this.data;
    dispatcher.filter.setProductMenu(index)
    if ((productMenu[index].type == 'NL' && nlList.length == 0) || (productMenu[index].type == 'BL' && blList.length == 0) ){
      setTimeout(() => {
        this.getProductList();
      }, 500)
    } 

  },
  lower(){
    if(this.data.loding)
      this.getProductList()
  }
}
function mapStateToProps({ products, filter }) {
  const { productMenu } = filter.toJS()
  const { nlList, blList } = products.toJS()
  const type = productMenu.find(item => item.selected).type
  let skip = 0
  let list = []
  if (type == 'NL') {
    skip = nlList.length
    list = nlList
  } else {
    skip = blList.length
    list = blList
  }
  return {
    list,
    nlList,
    blList,
    productMenu,
    skip
  }
}
Page(connect(mapStateToProps)(pageConfig))