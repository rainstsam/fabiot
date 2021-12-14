/*
 * @Author: your name
 * @Date: 2020-07-08 00:26:49
 * @LastEditTime: 2020-07-08 13:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/api/sysinfo.js
 */ 
import request from '@/utils/request'

export function getsysinfo() {
  return request({
    url: '/sysinfo/sysinfo',
    method: 'get',
    params: "",
    baseURL:'api'
  })
}
export function setgvoterule(data) {
  return request({
    url: '/sysinfo/setgvoterule/'+data,
    method: 'get',
    params: {data},
    baseURL:'api'
  })
}
export function setsystemname(data) {
  return request({
    url: '/sysinfo/setsystemname/'+data,
    method: 'get',
    params: {data},
    baseURL:'api'
  })
}
export function setautocnt(data) {
  return request({
    url: '/sysinfo/setautocnt/'+data,
    method: 'get',
    params: {data},
    baseURL:'api'
  })
}