var city = require('../../utils/city.js');
Page({
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
    const sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
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
})

