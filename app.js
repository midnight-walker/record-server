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

/*const model = require('./model');

let User = model.user;
(async () => {
    var user = await User.create({
        username: 'John',
        password: '123456',
        wxname: 'hahaha',
        phone:13333333333
    });
    console.log('created: ' + JSON.stringify(user));
})();*/
app.use(session({
    key: "SESSIONID"   //default "koa:sess"
}));
app.use(bodyParser());
// log request URL:
app.use(staticFiles('/static/', __dirname + '/dist'));
app.use(staticFiles('/.well-known/', __dirname + '/.well-known'));
app.use(authLogin);
app.use(rest.restify());

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/route');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/route/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

// add router middleware:
app.use(router.routes());


var options = {
    key: fs.readFileSync('./ssl/214220465210095.key','utf-8'),
    cert: fs.readFileSync('./ssl/214220465210095.cert','utf-8')
};

app.listen(3000);
https.createServer(options, app.callback()).listen(443);