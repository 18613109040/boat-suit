import {
  request
} from '../utils/fetch.js'


export function getApplyLog(params) {
  return request({
    url: 'businiess/v1.0/apply-log',
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}