import {
  request
} from '../utils/fetch.js'
export function getProductsList(params) {
  return request({
    url: 'public/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
