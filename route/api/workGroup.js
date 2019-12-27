/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getWorkGroup = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize),query={};
    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    };
    var workGroups = await model.workGroup.findAll(query);
    var count = await model.workGroup.count();
    ctx.rest(workGroups, count);
};

var validateWorkGroup = async (ctx, next) => {
    let name = ctx.query.username , phone = parseInt(ctx.query.phone),query={};
    query.where={
        name,
        phone
    }
    var workGroups = await model.workGroup.find(query);
    if(workGroups){
        ctx.rest(workGroups);
    }else{
        ctx.rest(false);
    }
};



var deleteWorkGroup = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var workGroup = await model.workGroup.find({where: params});
    await workGroup.destroy();
    ctx.rest({});
};

var createWorkGroup = async (ctx, next) => {
    let params = {
        name: ctx.request.body.name,
        phone: ctx.request.body.phone,
        fullName: ctx.request.body.fullName,
    };
    let sameName=await model.workGroup.findAll({
        where: {
            name: ctx.request.body.name
        }
    });
    if(sameName.length){
        throw new Error('已存在用户名为'+ctx.request.body.name+'的施工单位，请修改用户名');
    }

    var workGroup = await model.workGroup.create(params);
    console.log('created: ' + JSON.stringify(workGroup));
    ctx.rest({
        success: true
    });
};

var updateWorkGroup = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var workGroup = await model.workGroup.find({where: params});
    workGroup.name = ctx.request.body.name;
    workGroup.password = ctx.request.body.password;
    workGroup.fullName = ctx.request.body.fullName;
    workGroup.updatedAt = Date.now();
    await workGroup.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/workGroup': getWorkGroup,
    'GET /api/validateWorkGroup': validateWorkGroup,
    'POST /api/workGroup': createWorkGroup,
    'PATCH /api/workGroup/:id': updateWorkGroup,
    'DELETE /api/workGroup/:id': deleteWorkGroup
};