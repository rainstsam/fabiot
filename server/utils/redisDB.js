/*
 * @Author: Sam
 * @Date: 2020-04-26 20:59:20
 * @LastEditTime: 2020-07-08 20:15:05
 * @LastEditors: Please set LastEditors
 * @Description: redis tools 
 * @FilePath: /server/utils/redis.js
 */
var redis = require("redis");
const SYS_CFG = require('../setting')
var client = redis.createClient(SYS_CFG.REDIS_CFG.PORT, SYS_CFG.REDIS_CFG.HOST);

client.on('error',function (err) {
    console.log('redis error：'+err);
});

client.on('connect',function () {
    console.log ('redis连接成功...')
});

var client_mq = redis.createClient(SYS_CFG.REDIS_CFG.PORT, SYS_CFG.REDIS_CFG.HOST);
var client_mqres = redis.createClient(SYS_CFG.REDIS_CFG.PORT, SYS_CFG.REDIS_CFG.HOST,{return_buffers:true});
client_mq.select(1)
client_mq.pubsub=true
client_mq.on('error', function(error) {
    console.log(error);
    // client_mq.subscribe(topic)
});
client_mq.on('connect',function () {
    console.log ('redisMQ连接成功...')
});
client_mqres.on('connect',function () {
    console.log ('redisMQ监听连接成功...')
});
sendone=async function(topic,msg){
  try {    
    // client_mq.select(1)
    // client_mq.pubsub=true
    // console.log(client.pubsub);
    client_mq.publish(topic,msg)  
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

  client_mqres.subscribe(topic)

client_mqres.on('message',(err,msg) => {
 if (err) {
    console.log(err); 
 } else {
    cb(msg)
 }
   
})
}
//获取值
const getValue = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 参数不存在'                    
                })
                return 

            } else {
                resolve({
                    code: '200',
                    data: value
                })
            }
        })
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });
}

// 设置值
const setValue = (key, value) => {
    if (typeof value === 'string') {
        client.set(key, value)
    } else if (typeof value === 'object') {
        for (let item in value) {
            client.hmset(key, item, value[item], redis.print)
        }
    }
    // return new Promise((resolve, reject) => {
    //     if (typeof value === 'string') {
    //         client.set(key, value,(err) => {
    //             if (err) {
    //                 reject({
    //                     code: '510',
    //                     data: 'redis 错误! 参数不存在'
    //                 })
    //                 return
    //             } else {
    //                 resolve({
    //                     code: '200',
    //                     data: '参数设置成功'
    //                 })
    //             }
    //         })
    //     } else if (typeof value === 'object') {
    //         for (let item in value) {
    //             client.hmset(key, item, value[item], redis.print,(err) => {
    //                 if (err) {
    //                     reject({
    //                         code: '510',
    //                         data: 'redis 错误! hash参数不存在'
    //                     })
    //                     return
    //                 } else {
    //                     resolve({
    //                         code: '200',
    //                         data: '参数设置成功'
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // })
    // .then((res) => {
    //     return res
    // })
    // .catch((err) => {
    //     return err
    // });

}
// 设置hashkv
const setHkv = (key, field, value) => {
    return new Promise((resolve, reject) => {
        client.hset(key, field, value, (err) => {
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 参数不存在'
                })
                return
            } else {
                resolve({
                    code: '200',
                    data: '参数设置成功'
                })
            }
        })
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });
}

// 获取hash
const getHvalue = (key) => {
    return new Promise((resolve, reject) => {
        client.hgetall(key, (err, hash) => {
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 参数不存在'
                })
                return
            } else {
                resolve({
                    code: '200',
                    data: hash
                })
            }
        })
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });
}
// 插入列表
const updateList = (List, value) => {
    return new Promise((resolve, reject) => {
        client.rpush(List, value, (err, count) => {
          
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 列表不存在'
                })
                return
            } else {
                resolve({
                    code: '200',
                    data: count
                })
            }
        })
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });
}
const popList = (List) => {
    return new Promise((resolve, reject) => {
        client.lpop(List, (err, count) => {
            client.expire('message',10)
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 列表不存在'
                })
                return
            } else {
                resolve({
                    code: '200',
                    data: count
                })
            }
        })
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });
}

// 清空列表
const cleanList = (List) => {
    return new Promise((resolve, reject) => {
        client.ltrim(List, 0, 0,(err) => {
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 列表不存在'
                })
                return                     
            }
        })
        client.lset(List, 0, 'start',(err) => {
            if (err) {
                reject({
                    code: '510',
                    data: 'redis 错误! 列表不存在'
                })

            } else {
                resolve({
                    code: '200',
                    data: list
                })
            }            
        }) 
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    });    
}



// 获取列表
const getList = (List, start, end) => {
    return new Promise((resolve, reject) => {
            client.lrange(List, start, end, async (err, list) => {
                if (err) {
                    reject({code:'510',data:'redis 错误! 列表不存在'})

                } else {
                    resolve({code:'200',data: list})
                }
            })
        })
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });

}

module.exports = {
    getValue,
    setValue,
    setHkv,
    getHvalue,
    updateList,
    getList,
    cleanList,
    sendone,
    sendList,
    subscribe,
    popList

}