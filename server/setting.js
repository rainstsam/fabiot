/*
 * @Author: your name
 * @Date: 2020-04-26 21:21:11
 * @LastEditTime: 2020-04-30 16:52:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/setting.js
 */
const SYS_CFG={
  API_PORT:3000,
  WS_PORT:3010,
  BC_CFG:{
    BC_DIR:'../fabric/chaincode/',
    MSP_ID:'WorkMSP',
    MSP_DIR:'../fabric/fabricdev/crypto-config/',
    USER:'admin',
    CHAANNEL:'samchannel',
    ODERER_URL:'grpc://127.0.0.1:7050',
    PEER0_URL:'grpc://127.0.0.1:7051'

  },
  MONGO_CFG:{
    URL:'mongodb://127.0.0.1:37017/',
    DBNAME:'koa'
    
  },
  REDIS_CFG:{
    HOST:'127.0.0.1',
    PORT:'6079',
    DB:'1'
}
}
module.exports=SYS_CFG
