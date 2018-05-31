/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

let {exportExcel} = require('../../utils/export/monitor');

var getMonitor = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        id=parseInt(ctx.query.id),
        monitorId = parseInt(ctx.query.monitorId),
        projectId = parseInt(ctx.query.projectId),
        query={},
        where={};

    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }
    if(!isNaN(id)){
        where=Object.assign({},where,{id});
    }
    query.where=where;
    var monitors = await model.monitor.findAll(query);
    var count = await model.monitor.count(query);
    ctx.rest(monitors, count);
};

var deleteMonitor = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var monitor = await model.monitor.find({where: params});
    console.log(monitor);
    await monitor.destroy();
    ctx.rest({});
};

var createMonitor = async (ctx, next) => {

    let entity={};
    Object.assign(entity,ctx.request.body);

    var monitor = await model.monitor.create(entity);
    console.log('created: ' + JSON.stringify(monitor));
    ctx.rest({
        success: true
    });
};

var importMonitor = async (ctx, next) => {

    let entity={};
    let result=ctx.request.body.result;

    var monitor = await model.monitor.bulkCreate(result);
    console.log(monitor);

    ctx.rest({});
};

var exportMonitor  = async (ctx, next) => {
    let projectId=parseInt(ctx.query.projectId);
    var monitor = await model.monitor.findAll({
        where:{
            projectId
        }
    });
    let data=exportExcel(monitor);
    ctx.sendExcel(data,ctx.req,ctx.res,'监测计划表'+projectId+'.xlsx');
};

var updateMonitor = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var monitor = await model.monitor.find({where: params});
    Object.assign(monitor,ctx.request.body);
    monitor.updatedAt = Date.now();
    await monitor.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/monitor': getMonitor,
    'GET /api/monitor/export': exportMonitor,
    'POST /api/monitor': createMonitor,
    'POST /api/monitor/import': importMonitor,
    'PATCH /api/monitor/:id': updateMonitor,
    'DELETE /api/monitor/:id': deleteMonitor
};