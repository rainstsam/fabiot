/*
 * @Author: your name
 * @Date: 2020-05-20 23:57:03
 * @LastEditTime: 2020-07-08 10:10:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/serveice/bcinfo.js
 */ 
const BCUitls = require('../utils/blockchian');
const redisDB = require('../utils/redisDB');
var bcUitls= new BCUitls()
const bcinfo ={}
bcinfo.getbchight=async function () {
  let bchight=(await bcUitls.queryBCHeight()).height.low
  return bchight
}
bcinfo.getbcinfo=async function (hight) {
try {
  let res=await bcUitls.queryblockinfo(hight)
  return res
} catch (error) {
  return hight
}
}
module.exports = bcinfo




