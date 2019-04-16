// 引入SDK核心类
var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'M4JBZ-XVJWG-UMMQD-ITCZN-7YUXE-PDFWG' // 必填
});
export function getCurrentAddress(callback) {
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      const latitude = res.latitude
      const longitude = res.longitude
      const speed = res.speed
      const accuracy = res.accuracy
      qqmapsdk.reverseGeocoder({
        location: {
          latitude,
          longitude
        },
        success: function (res) {//成功后的回调
          console.log(res);
          const { address_component: { city } } = res.result;
          callback(city)
        },
        fail: function (error) {
          callback('')
        },
      })
    }
  })
}