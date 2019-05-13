const app = getApp();
import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
import { isPone } from '../../utils/util.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    codeStatus: 'disable',
    phone: '',
    time:60,
    btnStatus:'hidden',
    code:''
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
  getCode(){
    dispatcher.account.getApplyCodeAction({
      phone: `w${this.data.phone}`
    }).then(res=>{
      if (res.resultCode==200){
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000,
        })
        this.setData({
          codeStatus:'pending'
        })
        this.timmer = setInterval(()=>{
          if(this.data.time == 1){
            clearInterval(this.timmer)
            this.setData({
              codeStatus: 'show',
              time:60
            })
            return ;
          }else{
            this.setData({
              time: this.data.time - 1
            })
          }
          
        },1000)
        
      }
    })
  },
  changePhone(e){
    const { value } = e.detail;
    if (isPone(value)){
      this.setData({
        codeStatus: 'show',
        phone: value
      })
    }else{
      this.setData({
        codeStatus: 'disable',
        phone: value
      })
    }

  },
  changeCode(e){
    const { value } = e.detail;
    this.setData({
      code:value
    })
    if (value.length>3 && isPone(this.data.phone)){
      this.setData({
        btnStatus: 'show'
      })
    }
  },
  login(){
    const { phone,code} = this.data
    dispatcher.account.verifyCodeLoginAction({
      phone: `w${phone}`,
      code: code
    }).then(res=>{
      if (res.resultCode==200){
        wx.navigateBack({
          delta: 2
        })
      }else{
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000,
        })
      }
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