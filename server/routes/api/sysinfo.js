/*
 * @Author: your name
 * @Date: 2020-07-05 18:54:59
 * @LastEditTime: 2020-07-05 21:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/routes/api/sysinfo.js
 */ 
var Router = require('koa-router');
var router = new Router();
var sysinfo = require('../../serveice/sysinfo')
router.get('/sysinfo', async (ctx) => {
  let res = await sysinfo.getsysinfo()
  console.log(res);
  let req={}
  req.code = 20000
  req.data = res.data
  ctx.type = 'json'
  ctx.body = req;
  console.log('detail')
})
router.get('/setgvoterule/:gvoterule',async (ctx) => {
  try {
    let gvoterule = ctx.params.gvoterule
    await sysinfo.setsysinfovalue('gvoterule',gvoterule)
    let req={}
    req.code = 20000
    req.data = '设置成功' 
    ctx.body = req;
  } catch (error) {
    req.code = 51000
    req.data = '设置失败' 
    ctx.body = req;    
  }

})
router.get('/setsystemname/:systemname',async (ctx) => {
  try {
    let systemname = ctx.params.systemname
    await sysinfo.setsysinfovalue('systemname',systemname)
    let req={}
    req.code = 20000
    req.data = '设置成功' 
    ctx.body = req;
  } catch (error) {
    req.code = 51000
    req.data = '设置失败' 
    ctx.body = req;    
  }

})
router.get('/setautocnt/:autocnt',async (ctx) => {
  try {
    let autocnt = ctx.params.autocnt
    await sysinfo.setsysinfovalue('autocnt',autocnt)
    let req={}
    req.code = 20000
    req.data = '设置成功' 
    ctx.body = req;
  } catch (error) {
    let req={}
    req.code = 51000
    req.data = '设置失败' 
    ctx.body = req;
  }

})
module.exports = router.routes();