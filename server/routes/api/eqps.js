/*
 * @Author: your name
 * @Date: 2020-04-27 18:01:34
 * @LastEditTime: 2020-07-22 00:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/routes/api/eqps.js
 */
var Router = require('koa-router');
var router = new Router();
var BCUtils = require('../../utils/blockchian')
// var redisDB = require('../../utils/redisDB')
var eqpinfo = require('../../serveice/eqpinfo')
var bcinfo = require('../../serveice/bcinfo')
var sendMsg = require('../../serveice/sendmsg')
var bcUtils = new BCUtils()
router.get('/geteqplist', async (ctx) => {
    let eqplistobj = await eqpinfo.getEqpList()
    let eqplist = []
    if (eqplistobj.code == '200') {
      eqplist = eqplistobj.data
    }
    let req = {}
    req.code = 20000
    req.data = eqplist
    ctx.type = 'json'
    ctx.body = req;
    console.log('list')
  }),


  router.get('/getreglist', async (ctx) => {
    let reglistobj = await eqpinfo.getRegList()
    let reglist = []
    if (reglistobj.code == '200') {
      reglist = reglistobj.data
    }
    let req = {}
    req.code = 20000
    req.data = reglist
    ctx.type = 'json'
    ctx.body = req;
    console.log('list')
  }),

  router.get('/getconnectlist', async (ctx) => {
    let connectlistobj = await eqpinfo.getConnecltList()
    let connectlist = []
    if (connectlistobj.code == '200') {
      connectlist = connectlistobj.data
    }
    let req = {}
    req.code = 20000
    req.data = connectlist
    ctx.type = 'json'
    ctx.body = req;
    console.log('list')
  }),

  
  router.get('/getonlinereglist', async (ctx) => {
    let onlinereglistobj = await eqpinfo.getOnlineRegList()
    let onlinereglist = []
    if (onlinereglistobj.code == 200) {
      onlinereglist = onlinereglistobj.data
    }
    let req = {}
    req.code = 20000
    req.data = onlinereglist
    ctx.type = 'json'
    ctx.body = req;
    console.log('list')
  }),  
  
  router.get('/getonlinegatewaylist', async (ctx) => {
    let onlinegatewaylistobj = await eqpinfo.getOnlineGatewayList()
    let onlinegatewaylist = []
    if (onlinegatewaylistobj.code == '200') {
      onlinegatewaylist = onlinegatewaylistobj.data
    }
    let req = {}
    req.code = 20000
    req.data = onlinegatewaylist
    ctx.type = 'json'
    ctx.body = req;
    console.log('list')
  }),  

  router.get('/getbchight', async (ctx) => {
    let res = await bcinfo.getbchight()
    // bchight=JSON.parse(buf.toString())  
    let req = {}
    req.code = 20000
    req.data = {
      bchight: res
    }
    ctx.type = 'json'
    ctx.body = req;
    console.log('getbchight')
  })
router.get('/getbcinfo/:block', async (ctx) => {
  let block = ctx.params.block * 1
  let buf = JSON.stringify(await bcUtils.queryblockinfo(block))
  let bcinfo = JSON.parse(buf)
  console.log(bcinfo);
  if (bcinfo.code = '200') {
    let req = {}
    req.code = 20000
    req.data = bcinfo.data
    ctx.type = 'json'
    ctx.body = req;
  } else {
    ctx.type = 'json'
    ctx.body = bcinfo;
  }

  console.log('getbcinfo')
})

router.get('/detail/:uuid', async (ctx) => {
  let onlinegatewaylistobj = await eqpinfo.getOnlineGatewayList()
  let onlinegatewaylist = []
  if (onlinegatewaylistobj.code == '200') {
    onlinegatewaylist = onlinegatewaylistobj.data
  }
  let connectlistobj = await eqpinfo.getConnectList()
  let connectlist = []
  if (connectlistobj.code == '200') {
    connectlist = connectlistobj.data
  }

  let reglistobj = await eqpinfo.getRegList()
  let reglist = []
  if (reglistobj.code == '200') {
    reglist = reglistobj.data
  }
  let uuid = ctx.params.uuid
  let eqpabj=await eqpinfo.getEqp(uuid)
  let eqp=null
  if ( eqpabj.code=='200') {
    eqp=eqpabj.data
  }
  
  let res = {}
  res.reglist=reglist
  res.onlinegatewaylist=onlinegatewaylist
  res.connectlist=connectlist
  res.eqp=eqp
  console.log(res);
  let req = {}
  req.code = 20000
  req.data = res
  ctx.type = 'json'
  ctx.body = req;
  console.log('detail')
})
router.post('/seteqpreg', async (ctx) => {
  // 接收到登记信息后在区块链上登记并通知网关
  try {
    // 接收消息
    var reqstr = ctx.request.body
    // console.log("eqpset1"+reqstr);
  } catch (err) {
    let res = {}
    res.code = 51000
    res.data = err
    ctx.body = res
    return
  }
  let req = JSON.parse(reqstr)
  req.isOnline = 'true'
  let eqpuuid = req.uuid
  try {
    await eqpinfo.regEqp(eqpuuid, req)
    let res = {}
    res.code = 20000
    res.data = req
    ctx.body = res
  } catch (error) {
    let res = {}
    res.code = 51000
    res.data = '设备登记失败'
    ctx.body = res
    return
  }
  try {
    sendMsg.sendRegMsg(req)
  } catch (error) {
    let res = {}
    res.code = 51000
    res.data = '消息发送失败'
    ctx.body = res
    return
  }
  // console.log(ctx)
})
router.post('/seteqpcnt', async (ctx) => {
  try {
    // 接收消息
    var reqstr = ctx.request.body
    // console.log("eqpset1"+reqstr);
  } catch (err) {
    let res = {}
    res.code = 51000
    res.data = err
    ctx.body = res
    return
  }
  let req = JSON.parse(reqstr)
  req.isOnline = 'true'
  req.isCnt = 'true'
  try {
    sendMsg.sendCntMsg(req)
  } catch (error) {
    let res = {}
    res.code = 51000
    res.data = '消息发送失败'
    ctx.body = res
    return
  }

})
router.post('/setvote', async (ctx) => {
  try {
    var reqstr = await ctx.request.body
    console.log(reqstr + 'reqstr');
    let uuid = JSON.parse(reqstr).uuid
    console.log(uuid);
    await sendMsg.sendinCon(uuid)
    let res = {}
    res.code = 20000
    res.data = '允许设备接入'
    ctx.body = res
  } catch (err) {
    let res = {}
    res.code = 51000
    res.data = err
    ctx.body = res
    return
  }
})
// router.post('/rule',async(ctx)=>{

//   await eqpService.setRule()

// })
module.exports = router.routes();