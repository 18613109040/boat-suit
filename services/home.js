import {
  request
} from '../utils/fetch.js'
export function getNewProducts(params) {
  return request({
    url: 'loan/v1.0/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
export function getHotProducts(params) {
  return request({
    url: 'loan/v1.0/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
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