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
    },
    // 重置
    filterRest() {
      this.setData({
        show:false
      })
      dispatcher.filter.setRest()
    }
  }
}
function mapStateToProps({ filter }) {
  const { filterData, productMenu } = filter.toJS()
  const type = productMenu.find(item => item.selected).type
  return {
    filterData,
    type
  }
}
Component(connectComponent(mapStateToProps)(page))