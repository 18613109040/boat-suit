import { regeneratorRuntime } from '../libs/zoro'
import { getCurrentAddress } from '../utils/position.js'
const city = require('../utils/city.js');
import Immutable from '../libs/immutable.js'
const inintApplication = {
  jobType:[{
    name: '上班族',
    type: ''
  },{
    name: ''
  }]
}
export default {
  namespace: 'application',
  state: Immutable.fromJS(inintApplication),
  effects: {
   
  },
  reducers: {
  
  },
}