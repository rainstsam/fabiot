/*
 * @Author: your name
 * @Date: 2020-05-28 14:42:15
 * @LastEditTime: 2020-07-22 09:26:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/api/ipinfo.js
 */ 
import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'eqps/geteqplist',
    method: 'get',
    params: '',
    baseURL:'api'
  })
}

export function fetchEqpDetai(uuid) {
  return request({
    url: '/eqps/detail/'+uuid,
    method: 'get',
    params: { uuid },
    baseURL:'api'
  })
}
export function fetchBcinfo(block) {
  return request({
    url: '/eqps/getbcinfo/'+block,
    method: 'get',
    params: { block },
    baseURL:'api'
  })
}
export function fetchBchight() {
  return request({
    url: '/eqps/getbchight',
    method: 'get',
    params: "",
    baseURL:'api'
  })
}

// export function fetchInit(query) {
//   return request({
//     url: '/vue-admin-template/ipinfo/init',
//     method: 'get',
//     params: query
//   })
// }

export function seteqpreg(data) {
  return request({
    url: '/eqps/seteqpreg',
    method: 'post',
    baseURL:'api',
    headers:{
      'Content-Type': 'text/plain'
  },
    data:data    
  })
}
export function seteqpcnt(data) {
    return request({
      url: '/eqps/seteqpcnt',
      method: 'post',
      baseURL:'api',
      headers:{
        'Content-Type': 'text/plain'
    },
      data:data
      
    })
}

// export function updateArticle(data) {
//   return request({
//     url: '/vue-element-admin/article/update',
//     method: 'post',
//     data
//   })
// }
