/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
const model = require('../model');

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

module.exports = {
    'GET /login': login,
    'POST /loginResult': loginResult,
    'GET /logout':logout
};