var express = require('express');
var app = express();

// 引入路由模块
var filmsRouter = require('./routes/films.js');
var userRouter = require('./routes/user.js');

// 使用路由模块，中间件
app.use('/api/films/', filmsRouter);
app.use('/api/user/', userRouter);


app.listen(3000);
console.log('服务启动成功。http://localhost:3000/');
