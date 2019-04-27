var city = require('../../utils/city.js');
const app = getApp();
import {
  dispatcher
} from '../../libs/zoro'
import {
  connect
} from '../../libs/weapp-redux'
const pageConfig = {
  data: {
    showLetter: "",
    height: app.globalData.height,
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    dispatcher.citys.setSearchLetter()
    if (this.data.hotCitys.length==0)
      dispatcher.citys.getHotCitysAction()
  },
  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter:true
    })
    setTimeout(()=>{
      this.setData({isShowLetter: false})
    },1000)
  },
  wxSortPickerViewItemTap (e) {
    const { index, item } = e.currentTarget.dataset;
    dispatcher.citys.setCitySelected({index});
    console.dir(item)
    this.getData(item.code)
    wx.navigateBack();
  },
  hotSelect(e){
    const { item } = e.currentTarget.dataset;
    dispatcher.citys.setHotCitySelected({ ...item });
    this.getData(item.code)
    wx.navigateBack();
  },
  getData(code){
    // 热门产品
    dispatcher.home.getNewProductsAction({
      city: code,
      recommendType: "N"
    })
    // 最新产品
    dispatcher.home.getHotProductsAction({
      city: code,
      recommendType: "H"
    })
  }
}

function mapStateToProps({ citys }) {
  const { searchLetter, cityList, hotCitys } = citys.toJS()
  return {
    searchLetter,
    cityList,
    hotCitys
  }
}
Page(connect(mapStateToProps)(pageConfig))