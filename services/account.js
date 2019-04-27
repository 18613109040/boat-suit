import {
  request
} from '../utils/fetch.js'

export function wxCheckCode(params) {
  return request({
    url: `auth/v1.0/wx-check-code?code=${params.code}&nickName=${params.nickName}&avatar=${params.avatar}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}
export function wxCheckPhone(params) {
  return request({
    url: `auth/v1.0/wx-check-phone?code=${params.code}&encryptedData=${params.encryptedData}&iv=${params.iv}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function getUserApplyInfo(params){
  return request({
    url: "businiess/v1.0/user-apply-info",
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}