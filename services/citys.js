import {
  request
} from '../utils/fetch.js'

export function getHotCitys(params) {
  return request({
    url: 'loan/v1.0/city/hot',
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}