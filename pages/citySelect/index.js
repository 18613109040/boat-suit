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
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    scrollTop: 0,
    city: "",
    cityArr: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var winHeight = app.globalData.windowHeight;
    var itemH = (winHeight - 50) / searchLetter.length;
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: searchLetter,
      cityList: cityList
    })
  },
  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter
    })
  },
  wxSortPickerViewItemTap: function (e) {
    var city = e.target.dataset.text;
    //可以跳转了
    console.log('选择了城市：', city);
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