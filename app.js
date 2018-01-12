/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
const Koa = require('koa');
const https = require('https');
const enforceHttps = require('koa-sslify');

const session = require("koa-session2");
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const rest = require('./middleware/rest');

const app = new Koa();
const fs = require('fs');
let staticFiles = require('./middleware/static-files');
let authLogin = require('./middleware/auth-login');

if(process.env.NODE_ENV==='local'){
    const {devMiddleware,hotMiddleware}= require("./utils/webpackUtil");
    app.use(devMiddleware());
    app.use(hotMiddleware());
}
/*app.use(async (ctx, next) =>{

})*/

app.use(session({
    key: "SESSIONID"   //default "koa:sess"
}));
app.use(bodyParser());


//app.use(koabody({}));
// log request URL:
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(staticFiles('/.well-known/', __dirname + '/.well-known'));
app.use(authLogin);
app.use(rest.restify());


// add router middleware:
let addRoute=require('./utils/addRoute');
addRoute(router,__dirname);
app.use(router.routes());


var options = {
    key: fs.readFileSync('./ssl/214353335480095.key','utf-8'),
    cert: fs.readFileSync('./ssl/214353335480095.cert','utf-8')
};

app.listen(3000);
https.createServer(options, app.callback()).listen(443);