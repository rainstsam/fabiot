/*
 * @Author: your name
 * @Date: 2020-04-27 14:32:25
 * @LastEditTime: 2020-07-05 18:56:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/routes/api.js
 */ 
const Router =require('koa-router');
const router =new  Router();

const eqps = require('./api/eqps')
const users = require('./api/users')
const sysinfo = require('./api/sysinfo');
// const blockchian = require('./api/blockchian')

router.use('/eqps',eqps);
router.use('/users',users);
router.use('/sysinfo',sysinfo);
// router.use('/blockchian',blockchian);
module.exports = router
