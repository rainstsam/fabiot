/*
 * @Author: your name
 * @Date: 2020-06-01 11:55:35
 * @LastEditTime: 2020-07-22 00:29:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/store/modules/ipinfo.js
 */ 
import {fetchList} from '@/api/info'
const getDefaultState = () => {
  return {
  gatewaylist:[],
  reggatewaylist:[],
  onlinegatewaylist:[],
  eqponlinelist:[] 
  }
}

const state = getDefaultState()

const mutations = {
  setData:(state, param)=>{
  var val = param.val;
  if (typeof param.val == "object") {
      val = JSON.stringify(val);
  }
  eval(`state.${param.key}=${val}`);
},
resetdetaillist:(state,param ,key) => {
  state.detaillist[key]=param
},

updatagatewaylist:(state,param) => {
  if (!state.gatewaylist.includes(param)||state.gatewaylist.length==0) {
    state.gatewaylist.push(param)
  }
  
},
updatareggatewaylist:(state,param) => {
  if (!state.reggatewaylist.includes(param)||state.reggatewaylist.length==0) {
    state.reggatewaylist.push(param)
  }
  
},
updataonlinegatewaylist:(state,param) => {
  if (!state.onlinegatewaylist.includes(param)||state.onlinegatewaylist.length==0) {
    state.onlinegatewaylist.push(param)
  }
},
updataeqponlinelist:(state,param) => {
  if (!state.eqponlinelist.includes(param)||state.eqponlinelist.length==0) {
    state.eqponlinelist.push(param)
  }
}

}

const actions = {
initlist:(store) => {
  // store.commit('setdiscLoading', true)
  fetchList().then(response => { 
      for (let index = 0; index < array.length; index++) {
        let obj=response.data[index]
        if (state.gatewaylist.length==0||state.gatewaylist.includes(obj)) {
          store.commit('updatagatewaylist', obj) 
        }       
        
      }   
  }).catch(() => {
    console.log('设备列表为空');
  })
}
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}