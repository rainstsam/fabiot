/*
 * @Author: your name
 * @Date: 2020-06-08 15:13:30
 * @LastEditTime: 2020-06-08 15:34:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/store/modules/msg.js
 */ 
/*
 * @Author: your name
 * @Date: 2020-06-01 11:55:35
 * @LastEditTime: 2020-06-08 14:55:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/store/modules/ipinfo.js
 */ 
import {fetchList} from '@/api/info'
const getDefaultState = () => {
  return {
  msglist:[],
  regmsglist:[],
  onlinemsglist:[],
  conmsglist:[],

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
// resetdetaillist:(state,param ,key) => {
//   state.detaillist[key]=param
// },

updatamsglist:(state,param) => {
  state.msglist.push(param)
},
updataregmsglist:(state,param) => {
  state.regmsglist.push(param)
},
updataonlinemsglist:(state,param) => {
  state.onlinemsglist.push(param)
},
updataconmsglist:(state,param) => {
  state.conmsglist.push(param)
},
// updatadetaillist:(state,param) => {
//   state.detaillist.push(param)
// },
// updataedetaillist:(state,param) => {
//   state.detaillist.push(param)
// }
}

// const actions = {
// init:(store) => {
//   // store.commit('setdiscLoading', true)
//   fetchList().then(response => { 
//       for (let index = 0; index < array.length; index++) {
//         store.commit('updatamsglist', response.data) 
        
//       }   
//   }).catch(() => {
//     console.log('设备列表为空');
//   })
// }
// }

export default {
  // namespaced: true,
  state,
  mutations
  // actions
}