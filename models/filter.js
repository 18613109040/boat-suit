import {
  regeneratorRuntime
} from '../libs/zoro'
import Immutable from '../libs/immutable.js'
const inintFilter = {
  productMenu: [{
    name: '极速贷',
    selected: true,
    type:'NL'
  }, {
    name: '银行贷',
    selected: false,
    type:'BL'
  }],
  filterData: [{
    name: '综合排序',
    selected: false,
    sortOrder: '',
    sortType: '',
    orders: [{
      name: '放款时间最快',
      selected: false,
      sortOrder: '',
      sortType: '',
    }, {
      name: '利息最低',
      selected: false,
      sortOrder: '',
      sortType: '',
    }, {
      name: '额度最高',
      selected: false,
      sortOrder: '',
      sortType: '',
    }]
  }, {
    name: '易通过',
    selected: false,
    sortOrder: '',
    sortType: '',
    orders: []
  }, {
    name: '利息低',
    selected: false,
    sortOrder: '',
    sortType: '',
    orders: []
  }, {
    name: '筛选',
    selected: false,
    sortOrder: '',
    sortType: '',
    orders: [{
      name: '职业身份',
      selected: false,
      sortOrder: '',
      sortType: '',
      orders: [{
        name: '不限',
        selected: true,
        sortOrder: '',
        sortType: '',
      }, {
        name: '上班族',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '个体户',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '自由职业',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '学生',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '企业',
        selected: false,
        sortOrder: '',
        sortType: '',
      }]
    }, {
      name: '机构类型',
      selected: false,
      sortOrder: '',
      sortType: 'companyType',
      orders: [{
        name: '不限',
        selected: true,
        sortOrder: '',
        sortType: '',
      }, {
        name: '银行',
        selected: false,
        sortOrder: '',
        sortType: 'BANK',
      }, {
        name: '小贷公司',
        selected: false,
        sortOrder: '',
        sortType: 'LC',
      }, {
        name: '典当行',
        selected: false,
        sortOrder: '',
        sortType: 'PS',
      }, {
        name: '其他',
        selected: false,
        sortOrder: '',
        sortType: 'OTHER',
      }]
    }, {
      name: '抵押类型',
      selected: false,
      sortOrder: '',
      sortType: '',
      orders: [{
        name: '不限',
        selected: true,
        sortOrder: '',
        sortType: '',
      }, {
        name: '无抵押',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '房产',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '车辆',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '其他',
        selected: false,
        sortOrder: '',
        sortType: '',
      }]
    }, {
      name: '产品类型',
      selected: false,
      sortOrder: '',
      sortType: '',
        orders: [{
          name: '不限',
          selected: true,
          sortOrder: '',
          sortType: '',
        },{
        name: '信用贷',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '抵押贷',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '车贷',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '房贷',
        selected: false,
        sortOrder: '',
        sortType: '',
      }, {
        name: '其他',
        selected: false,
        sortOrder: '',
        sortType: '',
      }]
    }]
  }]
}
export default {
  namespace: 'filter',
  state: Immutable.fromJS(inintFilter),
  effects: {
 
  },
  reducers: {
    setSortSelsectd({ payload }, state){
      let newState = state.toJS()
      return Immutable.fromJS({ ...newState, filterData: payload })
    },
    setRest({ payload }, state){
      let newState = state.toJS()
      newState.filterData[3] = inintFilter.filterData[3]
      return Immutable.fromJS({ ...newState })
    },
    setProductMenu({ payload }, state){
      let newState = state.toJS()
      newState.productMenu.map((item,index)=>{
        item.selected = index == payload ? true : false
      })
      return Immutable.fromJS({ ...newState })
    }
  },
}