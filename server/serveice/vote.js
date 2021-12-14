/*
 * @Author: your name
 * @Date: 2020-05-17 01:15:36
 * @LastEditTime: 2020-07-22 00:11:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/vote.js
 */
const redisDB = require('../utils/redisDB');
const eqpinfo = require('./eqpinfo');
const sysinfo = require('./sysinfo');
const moment = require('moment');
moment.locale('zh-cn');
moment.suppressDeprecationWarnings = true;
// const {subscribe,sendone,sendList}= require('../utils/redisMQ');
const sendMsg = require('./sendmsg');
const vote = {}
vote.setVote = async function (eqpuuid) {
  let msgobj = {
    msg: eqpuuid + '发起接入申请',
    time: moment(Date.now).format('YYYY-MM-DD HH:mm:ss')
  }
  await redisDB.updateList("messsage", msgobj)
  await redisDB.updateList("reqvotmesssage", msgobj)
  let voteID = 'vote' + eqpuuid + Date.now()

  let votemsgobj = {
    header: {
      req: "reqVote",
      From: "Server",
      To: "all"
    },
    body: {
      voteID: voteID,
      reqEqp: eqpuuid
    }
  }
  let msg = JSON.stringify(votemsgobj)

  let eqp = (await eqpinfo.getEqp(eqpuuid)).data
  let voterule = eqp.voterule

  // 确认采用投票的网关列表
  let votelist = []
  if (voterule == 'sr00') {
    // 使用全局模式
    let syscfg = await sysinfo.getsysinfo()
    let gvoterule = syscfg.data.gvoterule
    if (gvoterule == 'gsr01') {
      // 全局模式-所有注册网关
      votelist = (await eqpinfo.getRegList()).data
    } else if (gvoterule == 'gsr02') {
      // 全局模式-所有连线注册网关
      votelist = (await eqpinfo.getOnlineRegList()).data
    } else if (gvoterule == 'gsr03') {
      // 全局模式-所有设备在线网关
      votelist = (await eqpinfo.getConnectList()).data
    }
  } else if (voterule == 'sr01') {
    // 所有设备在线网关
    votelist = (await eqpinfo.getRegList()).data
  } else if (voterule == 'sr02') {
    votelist = (await eqpinfo.getOnlineRegList()).data
  } else if (voterule == 'sr03') {
    votelist = (await eqpinfo.getConnectList()).data
  }
  
  // 上一个投票结束后构造本次投票,并记录上次投票
  let currentvote = {}

  do {
    try {
      currentvote = (await redisDB.getHvalue('currentvote')).data
      console.log(currentvote==null);
    } catch (error) {
      currentvote = {}
      console.log('donothing');
    }
  } while (currentvote!==null&&currentvote.isfinish == 'false');
  if (currentvote!==null) {
    redisDB.updateList('votedlist', currentvote.voteID)
  }
  

  
  // redisDB.setHkv('currentvote', 'voteID', voteID)
  // redisDB.setHkv('currentvote', 'voterule', eqp.voterule)
  // redisDB.setHkv('currentvote', 'nameh', eqp.name)
  // redisDB.setHkv('currentvote', 'uuid', eqp.uuid)
  // redisDB.setHkv('currentvote', 'votelist', JSON.stringify(votelist))
  // redisDB.setHkv('currentvote', 'sayyeslist ', null)
  // redisDB.setHkv('currentvote', 'reqtime ', Date.now())
  // redisDB.setHkv('currentvote', 'isfinish ', 'false')
  // redisDB.setHkv('currentvote', 'result ', 'false')
  let thisvote={}
  thisvote.voteID = voteID
  thisvote.voterule = eqp.voterule
  thisvote.name = eqp.name
  thisvote.uuid = eqp.uuid
  thisvote.votelist = JSON.stringify(votelist)
  thisvote.sayyeslist = null
  thisvote.reqtime =(Date.now()).toString()
  thisvote.isfinish = 'false'
  thisvote.result = 'false'

  redisDB.setValue('currentvote',thisvote)

  // console.log('vote7'+typeof(thisvote));
  // 发送投票请求
  console.log(votelist);
  await redisDB.sendList(votelist, msg)
  setTimeout(async () => {
    console.log('完成投票');
  
  redisDB.setHkv('currentvote', 'isfinish', 'true')
  try {
    let voteresult = (await redisDB.getHvalue('currentvote')).data
    votelist = eval(voteresult.votelist)   
  } catch (error) {
    votelist=[]
  }
  console.log('votelist'+votelist);
  try {
    sayyeslist = eval(voteresult.sayyeslist)
  } catch (error) {
    sayyeslist =[]
  }
  
  console.log('sayyeslist'+sayyeslist);
  if (sayyeslist.length * 2 > votelist.length) {
    redisDB.setHkv('currentvote', 'result', 'true')
    currentvote = (await redisDB.getHvalue('currentvote')).data

    eqp.errmsg = eqp.name + '的设备接入请求被通过'
    eqp.isCnt = 'true'
  } else {
    eqp.isCnt = 'refuse'
    eqp.errmsg = eqp.name + '的设备接入请求被拒绝'
  }
  await sendMsg.sendCntMsg(eqp)
  redisDB.setValue(voteID, currentvote)
  msgobj = {
    msg: eqp.errmsg,
    time: moment(Date.now).format('YYYY-MM-DD HH:mm:ss')
  }
  await redisDB.updateList("messsage", msgobj)
  await redisDB.updateList("reqvotmesssage", msgobj)
}, 5000);

}


vote.getVote = async function () {
  let currentvote = null
  try {
    currentvote = (await redisDB.getValue('currentvote')).data
  } catch (error) {
    currentvote = null
  }
  return currentvote
}
vote.autoVote = async function () {
  redisDB.subscribe("reqcntgatewaylist", this.setVote)
  //  subscribe('reqcntgatewaylist',test  )


}

module.exports = vote