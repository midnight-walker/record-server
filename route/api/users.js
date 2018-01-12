/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getUsers = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize);
    var users = await model.user.findAll({
        offset: page * size,
        limit: size
    });
    var count = await model.user.count();
    ctx.rest(users, count);
};

var validateUser = async (ctx, next) => {
    var users = await model.user.findAll({
        where: {
            wxname: ctx.query.wxname
        }
    });
    ctx.rest(users);
};

var deleteUsers = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var user = await model.user.find({where: params});
    await user.destroy();
    ctx.rest({});
};

var createUsers = async (ctx, next) => {
    let params = {
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        wxname: ctx.request.body.wxname,
        phone: parseInt(ctx.request.body.phone),
        groupid: parseInt(ctx.request.body.groupid)
    };
    var user = await model.user.create(params);
    console.log('created: ' + JSON.stringify(user));
    ctx.rest({
        success: true
    });
};

var updateUsers = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var user = await model.user.find({where: params});
    user.username = ctx.request.body.username;
    user.password = ctx.request.body.password;
    user.wxname = ctx.request.body.wxname;
    user.phone = parseInt(ctx.request.body.phone);
    user.groupid = parseInt(ctx.request.body.groupid);
    user.updatedAt = Date.now();
    await user.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/users': getUsers,
    'GET /api/validateUser': validateUser,
    'POST /api/users': createUsers,
    'PATCH /api/users/:id': updateUsers,
    'DELETE /api/users/:id': deleteUsers
};