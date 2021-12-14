/*
 * @Author: your name
 * @Date: 2020-04-26 20:47:01
 * @LastEditTime: 2020-06-10 16:45:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/app.js
 */ 
const Koa = require('koa')
const app = new Koa()
const router=require('koa-router')()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors=require('koa2-cors')
const api = require('./routes/api')

router.use('/api',api.routes())
// error handler
onerror(app)

// middlewares
app.use(cors())
.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
.use(json())
.use(logger())

// logger
.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
 });
// // routes
// app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
