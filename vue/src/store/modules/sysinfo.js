/*
 * @Author: your name
 * @Date: 2020-07-08 12:32:53
 * @LastEditTime: 2020-07-08 15:57:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/store/modules/sysinfo.js
 */
import {
  getsysinfo
} from '@/api/sysinfo'
const getDefaultState = () => {
  return {
    autoconnect: '',
    gvoterule: ''
  }
}

const state = getDefaultState()
const mutations = {
  // setData: (state, param) => {
  //   var val = param.val;
  //   if (typeof param.val == "object") {
  //     val = JSON.stringify(val);
  //   }
  //   eval(`state.${param.key}=${val}`);
  // },
  resetautoconnect: (state, param) => {
    state.autoconnect = param
  },
  resetgvoterule: (state, param) => {
    state.gvoterule = param
  }

}

const actions = {
  init: (store) => {
    getsysinfo().then(response => {
      console.log(response);
      let gvoterule = response.data.gvoterule
      let autocnt = response.data.autocnt
      store.commit('resetgvoterule', gvoterule)
      store.commit('resetautoconnect', autocnt)
    }).catch(() => {
      store.commit('resetgvoterule', 'gvr03')
      store.commit('resetautoconnect', 'ac03')
    })
  }
}
export default {

  state,
  mutations,
  actions
}
