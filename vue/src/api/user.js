/*
 * @Author: your name
 * @Date: 2020-06-05 18:55:32
 * @LastEditTime: 2020-06-20 00:50:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/api/user.js
 */ 
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function connect(data) {
  return request({
    url: '/users/connect',
    baseURL:'api',
    method: 'post',
    headers:{
      'Content-Type': 'text/plain'
  },
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
