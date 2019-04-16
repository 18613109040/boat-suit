import {
  request
} from '../utils/fetch.js'
export function getNewProducts(params) {
  return request({
    url: 'public/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
export function getHotProducts(params) {
  return request({
    url: 'public/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}