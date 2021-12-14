/*
 * @Author: your name
 * @Date: 2020-04-26 20:47:01
 * @LastEditTime: 2020-06-19 22:23:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/routes/api/users.js
 */ 
var Router =require('koa-router');
var router =new  Router();

router.get('/list',(ctx)=>{
  ctx.body='list';
  console.log('list')
})
router.get('/detail',(ctx)=>{
  ctx.body='detail';
  console.log('detail')
})
router.post('/reg',(ctx)=>{
  ctx.body='reg';
  console.log('reg')
})
router.post('/connect',async(ctx)=>{
  data=await ctx.request.body
  ctx.body={code:20000,data:data};
  console.log('connect')
})
module.exports = router.routes();
