/*
 * @Author: your name
 * @Date: 2020-05-27 14:24:16
 * @LastEditTime: 2020-07-08 12:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/store/index.js
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import eqpinfo from './modules/eqpinfo'
import sysinfo from './modules/sysinfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    eqpinfo,
    sysinfo
  },
  getters
})

export default store
