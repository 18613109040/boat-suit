const app = getApp();
import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
import { isIdCard, isName, isPone } from '../../utils/util.js'
import { host } from '../../config.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.screenHeight,
    tabBarHeight: app.globalData.tabBarHeight,
    options: {},
    text:'获取验证码',
    number:60,
    isCountDown:false,
    creditImg:''
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
    clearInterval(this.setinterval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.setinterval)
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
  bindChangeProfess(e){
    const { value } = e.detail;
    dispatcher.application.setProfessionIndex(value)
  },
  bindChangeIncome(e){
    const { value } = e.detail;
    dispatcher.application.setIncomeIndex(value)
  },
  bindChangeHouse(e){
    const { value } = e.detail;
    dispatcher.application.setHouseIndex(value)
  },
  changeName(e){
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
  changeIdCard(e){
    const { value } = e.detail
    if(!isIdCard(value)){
      wx.showToast({
        title: '身份证号码不正确',
        icon: 'none',
        duration: 2000
      })
    }
    dispatcher.application.setIdCard(value)
  },
  changePhone(e){
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
  selectFund(){
    dispatcher.application.setFund()
  },
  selectSocialSecurity(){
    dispatcher.application.setSocialSecurity()
  },
  selectCar(){
    dispatcher.application.setCar()
  },
  getApplyVerifyCode(){
    const { phone, isShowCode, id, number } = this.data;
    if (!isShowCode) return ;
    this.setData({
      isCountDown: true
    })
    dispatcher.application.getApplyVerifyCodeAction({
      id:id,
      phone: `w${phone}`
    }).then(res=>{
      if (res.resultCode == 200){
        this.setinterval = setInterval(()=>{
          if (this.data.number==0){
            clearInterval(this.setinterval)
            this.setData({
              number:60,
              isCountDown:false
            })
          }else{
            let count = this.data.number - 1
            this.setData({
              number: count,
              text: `${count}s`
            })
          }
        },1000)
      }else{
        wx.showToast({
          title: res.errorDescription,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  changeCode(e){
    const { value } = e.detail
    dispatcher.application.setCode(value)
  },
  uploadImage(){
    let token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: `${host}/businiess/v1.0/credit-img/upload`, // 仅为示例，非真实的接口地址
          header:{
            "Authorization": `Bearer ${token}`,
          },
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            if (res.resultCode==200){
              this.setData({
                creditImg: res.data
              })
            }
          }
        })
      }
    })
  },
  startApply(){
    const { id, name, idCard, professionType, incomeType, socialSecurity, fund, houseType, car, phone, code, creditImg } = this.data
    const params = {
      "id": id,
      "name": name,
      "idCard": idCard,
      "sex": "",
      "profession": professionType,
      "income": incomeType,
      "socialSecurity": socialSecurity?'有':'无',
      "fund": fund?'有':'无',
      "house": houseType,
      "car": car?'有':'无',
      "credit": "",
      "creditImg": creditImg,
      "phone": phone,
      "needVerify": true,
      "save": 1,
      "verifyCode": code
    }
    this.setData({
      isShowBtn:false
    })
    dispatcher.application.businiessApplyAction(params).then(resd=>{
      if (resd.resultCode==200){
        wx.showModal({
          title: '提交成功',
          content: '您已经成功申请',
          confirmText: '确定',
          cancelText: '产品列表',
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/record/index',
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '/pages/products/index',
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: res.errorDescription,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

}
function mapStateToProps({ application }) {
  const { houseList, incomeList, name, idCard, phone, professionList, selectHouseIndex, selectIncomeIndex, selectProfessionIndex, fund, socialSecurity, car, id, code } = application.toJS();
  const houseType =  selectHouseIndex == -1 ? '请选择' : houseList[selectHouseIndex]
  const professionType = selectProfessionIndex == -1 ? '请选择' : professionList[selectProfessionIndex]
  const incomeType = selectIncomeIndex == -1 ? '请选择' : incomeList[selectIncomeIndex]
  const isShowBtn = selectHouseIndex !== -1 && selectProfessionIndex !== -1 && selectIncomeIndex !== -1 && isPone(phone)&& code
  const isShowCode = isPone(phone)
  return {
    houseList,
    incomeList,
    professionList,
    selectHouseIndex, 
    selectIncomeIndex, 
    selectProfessionIndex,
    houseType,
    professionType,
    incomeType,
    name,
    idCard,
    phone,
    fund, 
    socialSecurity,
    car,
    isShowBtn,
    isShowCode,
    id,
    code
  }
}
Page(connect(mapStateToProps)(pageConfig))