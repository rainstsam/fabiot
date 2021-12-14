/*
 * @Author: your name
 * @Date: 2020-06-21 11:08:18
 * @LastEditTime: 2020-07-06 17:42:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/utils/redisMQ.js
 */ 
var redis = require("redis");
const SYS_CFG = require('../setting')
var client_mq = redis.createClient(SYS_CFG.REDIS_CFG.PORT, SYS_CFG.REDIS_CFG.HOST);
sendone=async function(topic,msg){
  try {    
    client_mq.select(1)
    client_mq.pubsub=true
    // console.log(client.pubsub);
    client_mq.publish(topic,msg)
    // client.lpush(uuid,msg,(err,res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(res);
    //   }
      
    // })    
  } catch (error) {
    return{
      code:'53000',
      data:error
    }
  }  
}
sendList=async function(list,msg){
  for (var i=0;i<list.length;i++) {
    sendone(list[i],msg)
  }
},
subscribe = async function(topic, cb){

  client_mq.subscribe(topic)
  client_mq.on('error', function(error) {
    console.log(error);
    client_mq.subscribe(topic)
});
client_mq.on('message',(err,msg) => {
 cb(msg)
})

}
module.exports={sendone,sendList,subscribe}