/*
 * @Author: your name
 * @Date: 2020-04-27 14:57:08
 * @LastEditTime: 2020-07-22 00:10:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/eqp.js
 */

// var mongoDb =require('../utils/mongo');
const redisDB = require('../utils/redisDB');
const BCUitls = require('../utils/blockchian')
bcUitls = new BCUitls()
var eqpinfo = {};
eqpinfo.getEqpList = async function () {
  // //获取所有设备列表
  try {
    let regeqplist = (await this.getRegList()).data
    let onlinegatewaylist = (await this.getOnlineGatewayList()).data
    let eqplist = regeqplist.concat(onlinegatewaylist.filter(function (v) {
      return !(regeqplist.indexOf(v) > -1)
    }));
    return {
      code: '200',
      data: eqplist
    }
  } catch (error) {
    let errmsg = '设备列表不存在或为空'
    return {
      code: '500',
      // errmsg: errmsg,
      data: errmsg
    }
  }
}
eqpinfo.getOnlineGatewayList = async function () {
  //获取在线www要列表
  let data = []
  let res = await redisDB.getList('onlinegatewaylist', 0, -1)
  console.log(res);
  if (res.code == '200') {
    return {
      code: '200',
      data: res.data
    }
  } else {
    let errmsg = '设备列表不存在或为空'
    return {
      code: '500',
      // errmsg: errmsg,
      data: errmsg
    }
  }
}
eqpinfo.getOnlineRegList = async function () {
  //获取在线已注册网关列表
  try {
    let regeqplist = (await this.getRegList()).data
    let onlinegatewaylist = (await this.getOnlineGatewayList()).data
    let onlinereglist = regeqplist.filter(function (v) {
      return onlinegatewaylist.indexOf(v) > -1
    })
    return {
      code: '200',
      data: onlinereglist
    }
  } catch (error) {
    let errmsg = '设备列表不存在或为空'
    return {
      code: '500',
      // errmsg: errmsg,
      data: errmsg
    }
  }


}
eqpinfo.getConnectList = async function () {
  //获取设备在线网关列表
  let data = []
  let res = await redisDB.getList('connectlist', 0, -1)
  if (res.code == '200') {
    return {
      code: '200',
      data: res.data
    }
  } else {
    let errmsg = uuid +'设备列表不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}

eqpinfo.getRegList = async function () {
  //获取已注册网关列表
  let regeqplist = []
  try {
    res =await bcUitls.queryCC('emcs', 'queryEqpList', [])
    regeqplist =eval((res.data).toString())
   
    // console.log('eqpinfo1'+regeqplist[0]);
  } catch (err) {
    // console.log('eqpinfo2'+err);
    regeqplist = []
  }
  
  return {
    code: '200',
    data: regeqplist
  }
}

eqpinfo.getEqp = async function (uuid) {
  // 获取设备详情
  let data = null
  let res = await redisDB.getHvalue(uuid)
  if (res.code == '200' || res.data !== null) {
    return {
      code: '200',
      data: res.data
    }
  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}

eqpinfo.getEqpIp = async function (uuid) {
  // 获取设备ip
  let data = null
  let res = redisDB.getHvalue(uuid)
  if (res.code == '200') {
    return {
      code: '200',
      data: res.data.ip
    }
  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}
eqpinfo.setEqp = async function (uuid, req) {
  // 建立/修改设备信息 

  res = await redisDB.setValue(uuid, req)

  return res
}
/* 
在区块链上登记设备基本信息
并对内容进行hash
*/
eqpinfo.regEqp = async function (uuid, req) {
  // 注册设备信息   
  let regmsg = {}
  regmsg.uuid = req.uuid
  regmsg.ip = req.ip
  regmsg.name = req.name
  // regmsg.isReg = req.isReg
  regmsg.regtime = Date.now()
  regmsg.voterule = req.voterule
  regmsg.whitelist = req.whitelist
  // regmsg.hash=hex_sha256(regmsg.uuid+regmsg.ip+regmsg.name+regmsg.isReg+regmsg.voterule)
  let reg = JSON.stringify(regmsg)
  let msg = await bcUitls.invokeCC('emcs', 'creatEqp', [uuid, reg])
  console.log(msg);
}

eqpinfo.setRegYes = async function (uuid) {
  //修改设备注册信息
  let data = null
  let res = await redisDB.getHvalue(uuid)
  if (res.code == '200') {
    await bcUtils.invokeCC('emcs', 'inReg', [uuid], async (bcerr) => {
      if (bcerr) throw bcerr
      redisDB.setHkv(uuid, 'isReg', 'true', (rediserr) => {
        if (rediserr) throw rediserr
      })
      return {
        code: '200',
        data: '网关注册成功'
      }
    })
  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}
eqpinfo.verifyEqp =async function (req){
  let sumdd=await bcUitls.queryCC('emcs','queryEqp',[req.uuid])
  let sum=sumdd.data.toString()
  let bcinfo = JSON.parse(JSON.parse(sum));
  let uuid = bcinfo.uuid == req.uuid;
  let ip = bcinfo.ip == req.ip;
  let name = bcinfo.name == req.name;
  let whitelist =  bcinfo.whitelist == req.whitelist;
  var result = {
    result: uuid&&ip&&name&&whitelist,
    uuid:uuid,
    ip:ip,
    name:name,
    whitelist:whitelist
  }
  return result
}
eqpinfo.setRegNo = async function (uuid) {
  //拒绝/撤销设备注册
  let data = null
  let res = redisDB.getHvalue(uuid)
  if (res.code == '200') {
    await bcUtils.invokeCC('emcs', 'unReg', [uuid], async (bcerr) => {
      if (bcerr) throw bcerr
      redisDB.setHkv(uuid, 'isReg', 'false', (rediserr) => {
        if (rediserr) throw rediserr
      })
      return {
        code: '200',
        data: '拒绝网关注册'
      }
    })
  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}
eqpinfo.setConnetYes = async function (uuid) {
  //同意设备接入
  let data = null
  let res = await redisDB.getHvalue(uuid)
  if (res.code == '200') {
    redisDB.setHkv(uuid, 'isCnt', 'true', (rediserr) => {
      if (rediserr) throw rediserr
    })
    return {
      code: '200',
      data: '设备在线'
    }

  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}

eqpinfo.setConnetNo = async function (uuid) {
  //拒绝设备接入
  let data = null
  let res = redisDB.getHvalue(uuid)
  if (res.code == '200') {
    redisDB.setHkv(uuid, 'isCnt', 'false', (rediserr) => {
      if (rediserr) throw rediserr
    })
    return {
      code: '200',
      data: '拒绝设备接入'
    }

  } else {
    let errmsg = uuid + '设备不存在或为空'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}
// eqpinfo.setRule=async function(uuid){
//   //设备授权
//   if (redisDB.getHvalue(uuid)===null) {
//     let errmsg=uuid+'设备未找到'
//     console.log(errmsg)
//     return errmsg
//   } else {    
//   }
// }
eqpinfo.setEqpWhitelist = async function (uuid) {
  //设备白名单
  if (redisDB.getHvalue(uuid) === null) {
    let errmsg = uuid + '设备未找到'
    console.log(errmsg)
    return errmsg
  } else {
    bcUtils.invokeCC('emcs', 'setEqpWhitelist', [uuid, list], async (err) => {
      if (err) throw err
      // let bff=await bcUtils.queryCC('emcs','queryEqp',[uuid])
      // eqp=JSON.parse(bff.toString())
      redisDB.setHkv(uuid, 'isReg', 'false', (err) => {
        if (err) throw err
      })
    })
  }

}
module.exports = eqpinfo