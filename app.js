//引入express
const express = require('express');
const getRouterIndex = require('./router/index');

//使用express
const app = express();

//post请求接口
app.use('/index',getRouterIndex);

//监听服务器是否启动
app.listen('3434',()=>{
    console.log('服务器启动成功');
})
