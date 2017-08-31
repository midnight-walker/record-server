/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../model');

var getUsers = async (ctx, next) => {
    var region = await model.user.findAll();
    ctx.rest(region);
};

var deleteUsers = async (ctx, next) => {
    var region = await model.user.findAll();
    ctx.rest(region);
};

module.exports = {
    'GET /api/users': getUsers
};