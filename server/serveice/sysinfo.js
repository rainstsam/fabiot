/*
 * @Author: your name
 * @Date: 2020-07-05 18:41:50
 * @LastEditTime: 2020-07-09 10:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/sysinfo.js
 */ 
const redisDB = require('../utils/redisDB');
let sysinfo={}
sysinfo.getsysinfo = async function () {
  // 获取设备详情
  let data = null
  let res = await redisDB.getHvalue('sysinfo')

  if (res.code == '200' || res.data !== null) {
    // console.log('9999999999999999'+res.data.autocnt);
    return {
      code: '200',
      data: res.data
    }
  } else {
    let errmsg = '返回错误'
    return {
      code: '500',
      errmsg: errmsg,
      data: data
    }
  }
}

sysinfo.setsysinfovalue=async function (key,value) {
  await redisDB.setHkv('sysinfo',key,value)
}

module.exports = sysinfo