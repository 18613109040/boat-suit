import {
  request
} from '../utils/fetch.js'

export function addFavorite(params) {
  return request({
    url: `businiess/v1.0/add-favorite?id=${params.id}&type=${params.type}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function removeFavorite(params) {
  return request({
    url: `businiess/v1.0/remove-favorite?id=${params.id}&type=${params.type}`,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}

export function getFavorite(params) {
  return request({
    url: 'businiess/v1.0/favorites',
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: params,
  })
}