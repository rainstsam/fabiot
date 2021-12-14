/*
 * @Author: your name
 * @Date: 2020-05-31 16:51:24
 * @LastEditTime: 2020-06-02 00:23:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/mock/ipinfo.js
 */ 
import Mock from 'mockjs'
const attackmodedisc = [
  { key:"rl0",label:"条件一"},
  { key:"rl1",label:"条件二"},
  { key:"rl2",label:"条件三"},
  { key:"rl3",label:"条件四"},
  { key:"rl4",label:"条件五"},
  { key:"rl5",label:"条件六"},
]
// 攻击方式字典
const operatordisc=[
  { key:"is",label:"is"},
  { key:"is_one_of",label:"is_one_of"},
  { key:"is_not",label:"is_not"},
  { key:"is_not_one_of",label:"is_not_one_of"},
]
// 运算符字典
const refcycledisc=[
  { key:"never",label:"从不"},
  { key:"5000",label:"5秒"},
  { key:"10000",label:"10秒"},
  { key:"30000",label:"30秒"},
  { key:"60000",label:"1分钟"},
]
// 刷新频率字典
const tabledisc=[
  { key:"attid",label:"ID" ,type:"sort"},
  { key:"atttime",label:"攻击时间", type: "normal" },
  { key:"attstate",label:"攻击类型", type: "normal" },
  { key:"attmethod",label:"攻击方法", type: "normal" },
  { key:"attresip",label:"攻击源IP", type: "normal" },
  { key:"attarmip",label:"攻击目的IP", type: "normal" }
]
// 表头
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    attid:'@increment',
    atttime:'@datetime("yyyy-MM-dd A HH:mm:ss")',
    'attstate|1':['方式1','方式2','方式3'],
    'attmethod|1':['方法1','方法2','方法3'],
    attresip:'@ip',
    attarmip:'@ip'
  }))
  
}

export default [
  {
    url: '/vue-admin-template/ipinfo/list',
    type: 'get',
    response: config => {
      const {  page = 1, limit = 20, sort } = config.query

      let mockList = List
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item,index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/ipinfo/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const item  of List) {
        if (item.id === +id) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },
  {
    url: '/vue-admin-template/ipinfo/init',
    type: 'get',
    response: _ => {
      return{
        code:20000,
        data:{
          initdata:{
            'attackmodedisc':attackmodedisc,
            'operatordisc':operatordisc,
            'tabledisc':tabledisc,
            'trefcycledisc':refcycledisc
          }        
          
        }
      }

    }
  }  
]