/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getMembers = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize);
    var members = await model.member.findAll({
        offset: page * size,
        limit: size
    });
    var count = await model.member.count();
    ctx.rest(members, count);
};

var deleteMembers = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var member = await model.member.find({where: params});
    await member.destroy();
    ctx.rest({});
};

var createMembers = async (ctx, next) => {
    let params = {
        name: ctx.request.body.name,
        wxname: ctx.request.body.wxname,
        phone: parseInt(ctx.request.body.phone),
    };
    var member = await model.member.create(params);
    console.log('created: ' + JSON.stringify(member));
    ctx.rest({
        success: true
    });
};

var updateMembers = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var member = await model.member.find({where: params});
    member.name = ctx.request.body.name;
    member.wxname = ctx.request.body.wxname;
    member.phone = parseInt(ctx.request.body.phone);
    member.updatedAt = Date.now();
    await member.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/members': getMembers,
    'POST /api/members': createMembers,
    'PATCH /api/members/:id': updateMembers,
    'DELETE /api/members/:id': deleteMembers
};