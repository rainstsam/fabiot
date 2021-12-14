/*
 * @Author: your name
 * @Date: 2020-05-27 14:24:16
 * @LastEditTime: 2020-07-08 14:01:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editattackmodedisc
 * @FilePath: /vue-admin-template/src/store/getters.js
 */ 
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  gatewaylist:state => state.eqpinfo.gatewaylist,
  reggatewaylist:state => state.eqpinfo.reggatewaylist,
  onlinegatewaylist:state => state.eqpinfo.onlinegatewaylist,
  eqponlinelist:state => state.eqpinfo.onlineeqplist,
  msglist:state => state.msg.msglist,
  regmsglist:state => state.msg.regmsglist,
  onlinemsglist:state => state.msg.onlinemsglist,
  conmsglist:state => state.conmsg.onlineeqplist,
  autoconnect:state =>state.sysinfo.autoconnect,
  gvoterule:state =>state.sysinfo.gvoterule
}
export default getters
