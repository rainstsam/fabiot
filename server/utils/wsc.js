/*
 * @Author: your name
 * @Date: 2020-04-26 21:00:20
 * @LastEditTime: 2020-05-17 10:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/utils/ws.js
 */
const WebSocket = require('ws');

var wsc = {}
wsc.sendone=async function(ip,msg){
  let url="ws://"+ip+":9611"
  let wsc=new WebSocket(url)
  wsc.on('open',() => {
    wsc.send(msg,() => {
      console.log(msg);
      wsc.close()
    })
  })  
},
wsc.sendList=async function(list,msg){
  for (var i=0;i<list.length;i++) {
    await wsc.sendList(list[i],msg)
  }
},
module.exports=wsc
