import {
  dispatcher
} from '../../../libs/zoro'
import {
  connectComponent
} from '../../../libs/weapp-redux'
const app = getApp();
const page = {
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    customBarHeight: app.globalData.customBarHeight,
    screenHeight: app.globalData.screenHeight,
    show: false,
    selectIndex: 0,
    sortData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){
      dispatcher.products.emptyProductList()
      const { city, type, filterData, quotaMin, quotaMax, repayment, skip } = this.data;
      const findOrderType = filterData[0].orders.find(item=>item.selected)
      dispatcher.products.getProductsListAction({
        city: city.code,
        orderType: findOrderType ? findOrderType.sortType : '', //排序类型  
        productType: type,
        quotaMin: quotaMin, //额度最小
        quotaMax: quotaMax, //额度最大
        repayment: repayment, //还款方式  FQ 分期 DQ 到期
        // mortgage: "", //抵押方式 No 不限 HOUSE 房子 CAR 车 OTHer 不限
        // companyType: "", // 机构类型 BANK  小贷公司 LC  PS  other
        skip: skip
      }).then(res => {
        this.setData({
          loding: true
        })
      })
    },
    clickSortMenu(e){
      const {
        index
      } = e.currentTarget.dataset;
      let { filterData, selectIndex, show } = this.data;
      let currentOrders = filterData[index].orders
      if (currentOrders.length>0){
        this.setData({
          show: !show,
          selectIndex: index,
          sortData: currentOrders
        })
      }else{
        filterData[index].selected = !filterData[index].selected
        dispatcher.filter.setSortSelsectd(filterData)
        this.setData({
          selectIndex: index,
          show: false
        })
      }
      
    },
    //综合排序
    comprehensiveChose(e){
      const {
        index
      } = e.currentTarget.dataset;
      let { filterData } = this.data;
      filterData[0].orders.map((item,idx)=>{
        item.selected = idx == index? !item.selected:false
      })
      const isSelected = filterData[0].orders.some(item=>item.selected == true)
      filterData[0].selected = isSelected
      dispatcher.filter.setSortSelsectd(filterData)
      this.setData({
        show:false
      })
      setTimeout(()=>{
        this.getData()
      },300)
    },
    // 筛选
    filterClick(e){
      const {
        index
      } = e.currentTarget.dataset;
      let { filterData } = this.data;
      const idx = index.split('-');
      if (idx[1] == 0) {
        filterData[3].orders[idx[0]].orders.map(item=>item.selected = false)
      } else {
        filterData[3].orders[idx[0]].orders[0].selected = false
      }
      filterData[3].orders[idx[0]].orders[idx[1]].selected = !filterData[3].orders[idx[0]].orders[idx[1]].selected;
    
      const isSelected = filterData[3].orders.some(item=>{
        return item.orders.some(i => i.selected == true)
      })
      filterData[3].selected = true
      dispatcher.filter.setSortSelsectd(filterData)
     
    },
    // 确定
    filterEnter(){
      this.setData({
        show: false
      })
      this.getData()
    },
    // 重置
    filterRest() {
      this.setData({
        show:false
      })
      dispatcher.filter.setRest()
      setTimeout(()=>{
        this.getData()
      },300)
    },
    clickRepayment(e){
      const {
        type
      } = e.currentTarget.dataset;
      dispatcher.filter.setRepayment(type)
    },
    quotaMinChange(e){
      const { value } = e.detail;
      dispatcher.filter.setQuotaMin(value)
    },
    quotaMaxChange(e){
      const { value } = e.detail;
      dispatcher.filter.setQuotaMax(value)
    }
  }
}
function mapStateToProps({ products, filter, citys }) {
  const { filterData, productMenu, quotaMin, quotaMax, repayment } = filter.toJS()
  const { list } = products.toJS()
  const { city } = citys.toJS()
  const type = productMenu.find(item => item.selected).type
  let skip = list.length
  return {
    filterData,
    type,
    city,
    quotaMin,
    quotaMax,
    repayment,
    skip
  }
}
Component(connectComponent(mapStateToProps)(page))