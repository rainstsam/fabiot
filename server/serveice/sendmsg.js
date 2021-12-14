/*
 * @Author: your name
 * @Date: 2020-05-17 22:17:50
 * @LastEditTime: 2020-07-08 00:32:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/sendmsg.js
 */ 
// const {sendone} = require('../utils/redisMQ');
const redisDB = require('../utils/redisDB');
// const eqpinfo = require('./eqpinfo');
const sendMsg={}
sendMsg.sendReqcntEqpMsg=async (topic,msg) => {
  redisDB.sendone(topic,msg)
}
sendMsg.sendRegMsg=async function(req) { 
    let header={};
    header.req='RegMsg'
    header.From='server'
    header.To=req.uuid
    let body=req
    let msgobj={header,body}
    msg=JSON.stringify(msgobj)
    redisDB.sendone(req.uuid,msg) 
}
sendMsg.sendCntMsg=async function(req) { 
  let header={};
  header.req='ConMsg'
  header.From='server'
  header.To=req.uuid
  let body=req
  let msgobj={header,body}
  msg=JSON.stringify(msgobj)
  redisDB.sendone(req.uuid,msg) 
}
// sendMsg.sendinReg=async function(eqpuuid) {
//   console.log('sengadsfasdddddd');
//   let eqpobj=await eqpinfo.getEqp(eqpuuid)
//   if (eqpobj.code=='200') {
//     let eqp=eqpobj.data
//     let ip=eqp.ip
//     let isReg=eqp.isReg  
//     let name=eqp.name
//     let whitelist= eqp.whitelist
//     let header={}
//     header.req='inReg'
//     header.From='server'
//     header.To=eqpuuid
//     let body={}
//     body.uuid=eqpuuid
//     body.ip=ip
//     body.name=name
//     body.isReg=isReg
//     body.whitelist=whitelist
//     let msgobj={header,body}
//     msg=JSON.stringify(msgobj)
//     await sendone(eqpuuid,msg)
//     console.log(msg);
//   } else {
//     console.log(eqpobj.errmsg);
//   }

// }
// sendMsg.sendunCon=async function(eqpuuid) {
//   let eqpobj=await eqpinfo.getEqp(eqpuuid)
//   if (eqpobj.code=='200') {
//     let header={}
//     header.req='unCon'
//     header.From='server'
//     header.To=eqpuuid
//     let body={}
//     body.msgId='500'
//     body.msg='拒绝接入'
//     let msgobj={header,body}
//     msg=JSON.stringify(msgobj)
//     await sendone(eqpuuid,msg)
//   } else {
//     console.log(eqpobj.errmsg);
//   }

// }
// sendMsg.sendConMsg=async function(eqpuuid) {
//   let eqpobj=await eqpinfo.getEqp(eqpuuid)
//   if (eqpobj.code=='200') {
//     let msgobj={}
//     let eqp=eqpobj.data
//     let ip=eqp.ip
//     let header={}
//     header.req='inCon'
//     header.From='server'
//     header.To=eqpuuid
//     let body={}
//     body.msgId='200'
//     body.msg='同意接入'
//     msgobj={header,body}
//     msg=JSON.stringify(msgobj)
//     await sendone(eqpuuid,msg) 
//   } else {
//     console.log(eqpobj.errmsg);
//   }
// }

module.exports = sendMsg
