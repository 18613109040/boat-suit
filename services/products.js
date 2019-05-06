import {
  request
} from '../utils/fetch.js'
export function getProductsList(params) {
  return request({
    url: 'loan/v1.0/products',
    method: 'POST',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
export function getProductDetail(params) {
  return request({
    url: `loan/v1.0/product-detail?id=${params.id}&type=${params.type}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function startApply(params) {
  return request({
    url: `businiess/v1.0/start-apply?id=${params.id}&type=${params.type}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function getAssess(params) {
  return request({
    url: `businiess/v1.0/assess?id=${params.id}&type=${params.type}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function getAssessRecommend(params) {
  return request({
    url: `businiess/v1.0/assess-recommend?id=${params.id}&type=${params.type}&assessType=${params.assessType}&assessLevel=${params.assessLevel}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
