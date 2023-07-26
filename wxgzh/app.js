var express=require('express')
var app=express()
var API = require('wechat-api')
var config=require('./config.js')
var wechat=require('./routes/wechat.js') //路由路径


app.use('/wechat',wechat) //进入路由。  
// '/wechat' 对应公众号后台基本配置-服务器配置-服务器地址 https://www.xxxxxxx.com/wechat


console.log('ok');
app.listen(80);
