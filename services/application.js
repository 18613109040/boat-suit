import {
  request
} from '../utils/fetch.js'

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
export function getApplyVerifyCode(params) {
  return request({
    url: `businiess/v1.0/apply-verify-code?id=${params.id}&phone=${params.phone}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}




