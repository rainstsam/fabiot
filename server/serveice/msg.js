/*
 * @Author: your name
 * @Date: 2020-04-27 14:56:44
 * @LastEditTime: 2020-07-22 00:12:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/msg.js
 */
const redisDB = require('../utils/redisDB');
const eqpinfo = require('./eqpinfo');
const vote = require('./vote');
const moment = require('moment');
moment.locale('zh-cn');
const sendMsg = require('./sendmsg');
const sysinfo =require('./sysinfo')
const MsgFun = {};
// 投票结果处理
MsgFun.resVote = async function (msg) {   
   let data = JSON.parse(msg)
   let uuid = data.header.From
   let voteID = data.body.voteID 
   let name = data.body.name 
   let errmsg = data.body.errmsg
   let msgobj
   let currentvote = (await redisDB.getHvalue('currentvote')).data
   if (voteID == currentvote.voteID) {
      let sayyeslist=[]
      try {
         sayyeslist = eval(voteresult.sayyeslist)
       } catch (error) {
         sayyeslist =[]
       }
       sayyeslist.push(uuid)
       redisDB.setHkv('currentvote', 'sayyeslist', JSON.stringify(sayyeslist))
       msgobj = errmsg     
   }else{
      msgobj =name+'本次投票无效'      
   }
   await redisDB.updateList("messsage", msgobj)
   await redisDB.updateList("reqvotmesssage", msgobj)
}
//注册请求处理
/* 
*收到注册请求,保存注册信息,更新在线网关列表,缓存设备信息
*
*/
MsgFun.reqReg = async function (msg) { 
   let onlinelistobj=await eqpinfo.getOnlineGatewayList()
   let onlinegatewaylist =[]  
   if (onlinelistobj.code=='200') {
      let oldeqpuuid=onlinegatewaylist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('onlinegatewaylist')
      }
      onlinegatewaylist=(await eqpinfo.getOnlineGatewayList()).data
   } 
   let connectlistobj=await eqpinfo.getConnectList()
   let connectlist =[]  
   if (connectlistobj.code=='200') {
      let oldeqpuuid=connectlist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('connectlist')
      }
      connectlist=(await eqpinfo.getConnectList()).data
   }         

   let data = JSON.parse(msg)   
   let uuid = data.header.From
   let ip = data.body.ip
   let name = data.body.name
   let msgobj
   // let whitelist = data.body.whitelist
   let lasttime = Date.now()
   let eqp=(await eqpinfo.getEqp(uuid)).data 
   let obj = {}
   obj.name = name
   obj.uuid = uuid
   obj.ip = ip
   obj.isReg = 'false'
   obj.isOnline = 'true'
   obj.isCnt = 'false'
   obj.voterule = 'sr00'
   obj.whitelist =  'whitelist'
   obj.regtime ='0'
   obj.connecttime ='0'
   obj.errmsg='申请登记'
   obj.lasttime = lasttime 
      // 更新最后通讯时间和上线时间
   if (eqp == null || lasttime - eqp.lasttime > 60000) {
        obj.onlinetime = lasttime
   } else {
      obj.onlinetime = eqp.onlinetime
   } 
   await eqpinfo.setEqp(uuid, obj)  
   
      // 更新在线网关列表   
   if (!onlinegatewaylist.includes(uuid) || onlinegatewaylist.length == 0) {
      await redisDB.updateList("onlinegatewaylist", uuid) 
      console.log(uuid+'申请登记');  
      msgobj=uuid+obj.errmsg  
      await redisDB.updateList("messsage",msgobj) 
      await redisDB.updateList("reqregmesssage", msgobj)  

   }

}
//注册状态处理
/* 
*收到状态响应,保存响应信息,如需要更新设备列表和在线设备列表验证验证客户端发来的验证信息是否与
登记的信息一致如果一致更新在线设备列表和注册设备列表,如不一致更新在线设备列表,并且拒绝网关的业
务请求
如果证实伪造登记信息,列入黑名单
*/
MsgFun.isReg = async function (msg) {
   let onlinelistobj=await eqpinfo.getOnlineGatewayList()
   let onlinegatewaylist =[]  
   if (onlinelistobj.code=='200') {
      let oldeqpuuid=onlinegatewaylist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('onlinegatewaylist')
      }
      onlinegatewaylist=(await eqpinfo.getOnlineGatewayList()).data
   } 
   let connectlistobj=await eqpinfo.getConnectList()
   let connectlist =[]  
   if (connectlistobj.code=='200') {
      let oldeqpuuid=connectlist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('connectlist')
      }
      connectlist=(await eqpinfo.getConnectList()).data
   }         
   let reglist = (await eqpinfo.getRegList()).data                                                                                                                                            
   let data = JSON.parse(msg)
   let resfrom = data.header.From
   let uuid =data.body.uuid
   let name = data.body.name
   let ip = data.body.ip
   let whitelist = data.body.whitelist   
   let lasttime = Date.now()
   let connecttime ='0'
   let isReg ,errmsg
   let isCnt = 'false'
   let isOnline = 'true'
   let eqp =(await eqpinfo.getEqp(uuid)).data 
   let msgobj=resfrom+'申请验证'  
   await redisDB.updateList("messsage",msgobj )
   await redisDB.updateList("reqregmesssage",msgobj )
   // 校验设备信息
   if  (!reglist.includes(uuid) || reglist.length == 0) {
      errmsg = '未发现登记信息'
      isReg = 'refuse'
   } else  if ( resfrom !== uuid) {
      // 如果发送者信息与消息体信息不符列入黑名单
      errmsg = '伪造注册信息'
      isReg = 'black'
   } else {
      let verifydata={
         name:name,
         uuid:uuid,
         ip:ip,
         whitelist:whitelist
      }
      // 校验 不通过保存但拒绝注册信息,但缓存网关信息!!!!这个逻辑要想想
      let result=await eqpinfo.verifyEqp(verifydata)
      if (result.result) {
         // 通过校验\更新信息\确认注册
         errmsg = 'ok'
         isReg = 'confim'
      } else {
         //不通过\更新信息\拒绝注册,校验不同的地方要发给前台
         let temp=null
         for (let key in result) {
            if (result[key] == true&&key!='result') {
               temp +='|'+key
            }
            
         }
         errmsg = '以下参数未通过校验:'+temp
         isReg = 'refuse'
      }
   }
  
   // 缓存设备信息
   let obj = {}
   obj.name = name
   obj.uuid = uuid
   obj.ip = ip
   obj.isReg = isReg
   obj.isOnline = isOnline
   obj.isCnt = isCnt
   obj.connecttime=connecttime
   obj.whitelist = whitelist
   obj.voterule=eqp.voterule
   obj.lasttime=lasttime 
   if (eqp == null || lasttime - eqp.lasttime > 60000) {
      obj.onlinetime = lasttime
   } else {
      obj.onlinetime = eqp.onlinetime
   }
   if (errmsg == 'ok') {
      obj.errmsg = '网关验证通过'
   } else {
      obj.errmsg = errmsg
console.log("qqqq"+obj.errmsg);      
   }
   await eqpinfo.setEqp(uuid, obj)
console.log(obj.errmsg);
   // 如果不在在线网关列表,则加入
   if (!onlinegatewaylist.includes(uuid) || onlinegatewaylist.length == 0) {     
      await redisDB.updateList("onlinegatewaylist", uuid)   
   }
   await sendMsg.sendRegMsg(obj)
   msgobj=resfrom+obj.errmsg  
   await redisDB.updateList("messsage", msgobj) 
   await redisDB.updateList("reqregmesssage", msgobj)  
}

//连接请求
MsgFun.reqCnt = async function (msg) {
   let onlinelistobj=await eqpinfo.getOnlineGatewayList()
   let onlinegatewaylist =[]  
   if (onlinelistobj.code=='200') {
      let oldeqpuuid=onlinegatewaylist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('onlinegatewaylist')
      }
      onlinegatewaylist=(await eqpinfo.getOnlineGatewayList()).data
   } 
   let connectlistobj=await eqpinfo.getConnectList()
   let connectlist =[]  
   if (connectlistobj.code=='200') {
      let oldeqpuuid=connectlist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('connectlist')
      }
      connectlist=(await eqpinfo.getConnectList()).data
   }        
   let reglist = (await eqpinfo.getRegList()).data                                                                                                                                         
   let data = JSON.parse(msg)
   let resfrom = data.header.From
   let uuid =data.body.uuid
   let name = data.body.name
   let ip = data.body.ip
   let whitelist = data.body.whitelist   
   let lasttime = Date.now()
   let connecttime ='0'
   let isReg ,errmsg
   let isCnt = 'false'
   let isOnline = 'true'
   let eqp =(await eqpinfo.getEqp(uuid)).data 
   let msgobj=resfrom+'申请设备接入'  
   await redisDB.updateList("messsage",msgobj) 
   await redisDB.updateList("reqcntmesssage",msgobj) 
   // 校验设备信息
   if  (!reglist.includes(uuid) || reglist.length == 0) {
      errmsg = '未发现登记信息'
      isReg = 'refuse'
   } else  if ( resfrom !== uuid) {
      // 如果发送者信息与消息体信息不符列入黑名单
      errmsg = '伪造注册信息'
      isReg = 'black'
   } else {
      let verifydata={
         name:name,
         uuid:uuid,
         ip:ip,
         whitelist:whitelist
      }
      // 校验 不通过保存但拒绝注册信息,但缓存网关信息!!!!这个逻辑要想想
      let result=await eqpinfo.verifyEqp(verifydata)
      if (result.result) {
         // 通过校验\更新信息\确认注册
         errmsg = 'ok'
         isReg = 'confim'  
      } else {
         //不通过\更新信息\拒绝注册,校验不同的地方要发给前台
         let temp=null
         for (let key in result) {
            if (result[key]==true&&key!='result') {
               temp +='|'+key
            }
            
         }
         errmsg = '以下参数未通过校验:'+temp
         isReg = 'refuse'
         isCnt = 'false'
      }
   }
  
   // 缓存设备信息
   let obj = {}
   obj.name = name
   obj.uuid = uuid
   obj.ip = ip
   obj.isReg = isReg
   obj.isOnline = isOnline
   obj.isCnt = isCnt
   obj.connecttime=connecttime
   obj.whitelist = whitelist
   obj.voterule=eqp.voterule
   obj.lasttime=lasttime 
   if (eqp == null ||  lasttime - eqp.lasttime > 60000) {
      obj.onlinetime = lasttime
   } else {
      obj.onlinetime = eqp.onlinetime
   }
   if (errmsg == 'ok') {
      obj.errmsg == '设备接入请求已受理,等待验证...'      
      msgobj=name+obj.errmsg 
   } else {
      obj.errmsg = errmsg
      await sendMsg.sendRegMsg(obj)
      msgobj=resfrom+obj.errmsg 
   }
   

   // 如果不在在线网关列表,则加入
   if (!onlinegatewaylist.includes(uuid) || onlinegatewaylist.length == 0) {     
      await redisDB.updateList("onlinegatewaylist", uuid)   
   } 
    
   await redisDB.updateList("messsage",msgobj )
   await redisDB.updateList("reqcntmesssage",msgobj )  
   // 是否自主协同,如果是推送到队列等待处理
   let syscfg=await sysinfo.getsysinfo()
   let isAutoCnt=syscfg.data.autocnt
   console.log('333333333333333333333333333333'+isAutoCnt);
   if (isAutoCnt=='ac02') {
      console.log('77777777777777777777777777777777777777777777777');
      await vote.setVote(uuid) 
   }else if(isAutoCnt=='ac03'){
      obj.isCnt = 'true'
      obj.errmsg =  obj.name+'设备可自行接入'
   }
   await sendMsg.sendCntMsg(obj)
   await eqpinfo.setEqp(uuid, obj)
}
MsgFun.isCnt = async function (msg) {
   let onlinelistobj=await eqpinfo.getOnlineGatewayList()
   let onlinegatewaylist =[]  
   if (onlinelistobj.code=='200') {
      let oldeqpuuid=onlinegatewaylist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('onlinegatewaylist')
      }
      onlinegatewaylist=(await eqpinfo.getOnlineGatewayList()).data
   } 
   let connectlistobj=await eqpinfo.getConnectList()
   let connectlist =[]  
   if (connectlistobj.code=='200') {
      let oldeqpuuid=connectlist[-1]
      let oldeqp=(await eqpinfo.getEqp(oldeqpuuid)).data
      if ((Date.now()-oldeqp.lasttime)>60000) {
         await redisDB.popList('connectlist')
      }
      connectlist=(await eqpinfo.getConnectList()).data
   }        
   let reglist = (await eqpinfo.getRegList()).data                                                                                                                                        
   let data = JSON.parse(msg)
   let resfrom = data.header.From
   let uuid =data.body.uuid
   let name = data.body.name
   let ip = data.body.ip
   let whitelist = data.body.whitelist   
   let lasttime = Date.now()
   let connecttime ='0'
   let isReg ,errmsg
   let isCnt=data.body.isCnt
   let isOnline = 'true'
   let eqp =(await eqpinfo.getEqp(uuid)).data 
   let msgobj=resfrom+'申请设备接入' 
 console.log('1111111111');
   await redisDB.updateList("messsage", msgobj )
   await redisDB.updateList("reqcntmesssage", msgobj )
   // 校验设备信息
   if  (!reglist.includes(uuid) || reglist.length == 0) {
      errmsg = '未发现登记信息'
      isReg = 'refuse'
   } else  if ( resfrom !== uuid) {
      // 如果发送者信息与消息体信息不符列入黑名单
      errmsg = '伪造注册信息'
      isReg = 'black'
   } else {
      let verifydata={
         name:name,
         uuid:uuid,
         ip:ip,
         whitelist:whitelist
      }
      // 校验 不通过保存但拒绝注册信息,但缓存网关信息!!!!这个逻辑要想想
      let result=await eqpinfo.verifyEqp(verifydata)
      if (result.result) {
         // 通过校验\更新信息\确认注册
         errmsg = 'ok'
         isReg = 'confim'
         console.log('22222222222');
      } else {
         //不通过\更新信息\拒绝注册,校验不同的地方要发给前台
         let temp=null
         for (let key in result) {
            if (result[key]==true&&key!='result') {
               temp +='|'+key
            }            
         }
         errmsg = '以下参数未通过校验:'+temp
      }
   }
  
   // 缓存设备信息
   let obj = {}
   obj.name = name
   obj.uuid = uuid
   obj.ip = ip
   obj.isReg = isReg
   obj.isOnline = isOnline
   obj.isCnt = isCnt
   obj.connecttime=connecttime
   obj.whitelist = whitelist
   obj.voterule=eqp.voterule
   obj.lasttime=lasttime 
   
   if (eqp.lasttime == '0' || lasttime - eqp.lasttime > 60000) {
      obj.onlinetime = lasttime
      console.log('133333333333');
   } else {
      obj.onlinetime = eqp.onlinetime
   }
   if (errmsg == 'ok') {
      console.log('44444444444444444444');
      obj.errmsg == '设备在线' 
      obj.isCnt == 'true' 
      if (obj.connecttime=='0') {
         obj.connecttime=Date.now()  
      }
      if (!connectlist.includes(uuid) || connectlist.length == 0) {     
         await redisDB.updateList("connectlist", uuid)
         obj.connecttime=Date.now()  
         console.log('777777777777777777'); 
      } 
      await sendMsg.sendCntMsg(obj)  
   } else {     
      obj.errmsg = errmsg
      obj.isCnt == 'refuse'
      await sendMsg.sendRegMsg(obj)      
   } 
   
   await eqpinfo.setEqp(uuid, obj)

   // 如果不在在线网关列表,则加入
   if (!onlinegatewaylist.includes(uuid) || onlinegatewaylist.length == 0) {     
      await redisDB.updateList("onlinegatewaylist", uuid)   
   } 

   msgobj=resfrom+obj.errmsg  
   await redisDB.updateList("messsage", msgobj )
   await redisDB.updateList("reqcntmesssage", msgobj )  
}

//网关心跳
MsgFun.online = async function (msg) {
   let onlinegatewaylist = (await eqpinfo.getOnlineGatewayList()).data       
   let data = JSON.parse(msg)
   let uuid =data.body.uuid
   let resfrom= data.header.From
   let eqp =(await eqpinfo.getEqp(uuid)).data                                                                                                                                       
   let lasttime = Date.now()
   let obj = {}
   if (eqp!==null) {
      
   }
   obj.name =eqp.name
   obj.uuid = eqp.uuid
   obj.ip = eqp.ip
   obj.isReg = eqp.isReg
   obj.isOnline = eqp.isOnline
   obj.isCnt = eqp.isCnt
   obj.connecttime=eqp.connecttime
   obj.whitelist = eqp.whitelist
   obj.voterule=eqp.voterule
   obj.lasttime=lasttime 
   obj.errmsg = data.body.errmsg
   if (eqp == null ||lasttime - eqp.lasttime > 60000) {
      obj.onlinetime = lasttime
   } else {
      obj.onlinetime = eqp.onlinetime
   }
   await eqpinfo.setEqp(uuid, obj)
      // 如果不在在线网关列表,则加入
   if (!onlinegatewaylist.includes(uuid) || onlinegatewaylist.length == 0) {     
      await redisDB.updateList("onlinegatewaylist", uuid)   
   }
   let msgobj=resfrom+obj.errmsg  
   await redisDB.updateList("messsage", msgobj )
   await redisDB.updateList("reqregmesssage", msgobj )

}
module.exports = MsgFun;