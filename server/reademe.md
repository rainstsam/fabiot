 * # 对象说明

 * ## eqp

 

| 属性名               | 使用者 | 定义                | 默认值  | 说明                                 |
| -------------------- | ------ | ------------------- | ------- | ------------------------------------ |
| eqp.name             | c s b  | 设备\网关名         |         |                                      |
| eqp.uuid             | c s b  | 设备\网关uuid       |         |                                      |
| eqp.ip               | c s b  | ip                  |         |                                      |
| eqp.serverip         | c      | 服务器端地址        |         |                                      |
| eqp.voteruleatclient | c      | 终端侧接入策略      | 'cr00'  | 'cr00'严格/'cr01谨慎/'cr02'宽容/     |
| eqp.voteruleatserver | s b    | 服务器端接入策略    | 'sr00'  | 'sr00'全局/'sr01'注册/'sr00'在线注册 |
| eqp.whiltlist        | c s b  | 友好白名单          | 'wl00'  | 'wl00'无好友/'wl00'全友好/设定列表   |
| eqp.isReg            | c s    | 注册登记状态        | 'false' | 'false'/'true'/'refuse'/'black'      |
| eqp.isCnt            | c s    | 设备在线状态        | 'false' | 'false'/'true'/'refuse'/'req(s}      |
| eqp.isOnline         | c s    | 网关连接状态        | 'false' | 'false'/'true'                       |
| eqp.regtime          | b      | 网关登记时间        |         | 以服务器接收响应的时间为准           |
| eqp.onlinetime       | s      | 网关上线时间        |         | 同上                                 |
| eqp.connecttime      | s      | 设备连线时间        |         | 同上                                 |
| eqp.errmsg           | sc     | 当前请求 的响应结果 |         | s ----c                              |

### 方法

#### server端

- service/eqpinfo.js

setEqp()缓存网关信息包括所有 s 相关属性

regEqp()在区块链登记网关包括所有b相关属性

verifyEqp()根据登记信息验证发出请求的网关,验证 uuid\ip\name\whilelist

getEqp()获取缓存的当前状态包括所有 s 相关属性

- server/sendmsg.js

sendunReg()发送否决登记消息

sendinReg()发送验证同意信息

sendunCon()发送拒绝接入消息

sendinCon()发送同意接入消息

#### client端

 - utils.py

设置 ip uuid server  name 等

- task.py
发送消息
reqReg  登记请求
isReg  登记验证请求
reqCnt 设备上线请求
connect 设备在线状态
online 网关连线心跳


