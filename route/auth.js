/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
const model = require('../model');
const qs = require("querystring");
const crypto = require("crypto");

var login = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/loginResult" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var loginResult = async (ctx, next) => {
    var users = await model.user.findAll({
        where: {
            username: ctx.request.body.name || '',
            password: ctx.request.body.password || ''
        }
    });
    //console.log(user[0].dataValues);
    if (users.length) {
        var user=users[0].dataValues;
        ctx.session.user=user;
        ctx.response.body = `<h1>Welcome, ${user.username}!</h1>`;
    } else {
        ctx.redirect('/login');
    }
};

var logout = async (ctx, next) => {
    ctx.session.user=undefined;
    ctx.response.body = '已经退出登录'
};


var md5 = function(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    return crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
}

var auth = async (ctx, next) => {
    if(ctx.request.query && ctx.request.query.data){
        var args=ctx.request.query.data;
        var app_secret=md5("gse23%21s*ph@dds1saw2");
        var sign=crypto.createHmac('sha1', app_secret).update(args).digest().toString('base64');

        ctx.response.body=sign;
    }else{
        ctx.response.body='error code';
    }

};

module.exports = {
    'GET /login': login,
    'POST /loginResult': loginResult,
    'GET /logout':logout,
    'GET /auth': auth
};