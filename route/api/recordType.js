/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getRecordType = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize),query={};
    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    query.order='type ASC';
    var recordTypes = await model.recordType.findAll(query);
    var count = await model.recordType.count();
    ctx.rest(recordTypes, count);
};

var deleteRecordType = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    let son=await model.recordType.findAll({
        where: {
            pid: ctx.params.id
        }
    });
    if(son.length){
        throw new Error('无法删除已有子类型的父类型，请先删除子类型');
    }
    var recordType = await model.recordType.find({where: params});
    await recordType.destroy();
    ctx.rest({});
};

var createRecordType = async (ctx, next) => {
    let params = {
        name: ctx.request.body.name,
        pid: ctx.request.body.pid,
        level: ctx.request.body.level,
        description: ctx.request.body.description
    };
    let sameName=await model.recordType.findAll({
        where: {
            pid: ctx.request.body.pid,
            name: ctx.request.body.name
        }
    });
    if(sameName.length){
        throw new Error('已存在记录类型名为'+ctx.request.body.name+'的记录类型，请修改记录类型名');
    }

    var recordType = await model.recordType.create(params);
    console.log('created: ' + JSON.stringify(recordType));
    ctx.rest({
        success: true
    });
};

var updateRecordType = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var recordType = await model.recordType.find({where: params});
    recordType.name = ctx.request.body.name;
    recordType.pid = ctx.request.body.pid;
    recordType.level = ctx.request.body.level;
    recordType.description = ctx.request.body.description;
    recordType.updatedAt = Date.now();
    await recordType.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/recordType': getRecordType,
    'POST /api/recordType': createRecordType,
    'PATCH /api/recordType/:id': updateRecordType,
    'DELETE /api/recordType/:id': deleteRecordType
};