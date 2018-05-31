/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

let {exportExcel} = require('../../utils/export/supervisor');

var getSupervisor = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        id=parseInt(ctx.query.id),
        recordTypeId = parseInt(ctx.query.recordTypeId),
        supervisorId = parseInt(ctx.query.supervisorId),
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
    var supervisors = await model.supervisor.findAll(query);
    var count = await model.supervisor.count(query);
    ctx.rest(supervisors, count);
};

var deleteSupervisor = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var supervisor = await model.supervisor.find({where: params});
    console.log(supervisor);
    await supervisor.destroy();
    ctx.rest({});
};

var createSupervisor = async (ctx, next) => {

    let entity={};
    Object.assign(entity,ctx.request.body);

    var supervisor = await model.supervisor.create(entity);
    console.log('created: ' + JSON.stringify(supervisor));
    ctx.rest({
        success: true
    });
};

var importSupervisor = async (ctx, next) => {

    let entity={};
    let result=ctx.request.body.result;

    //Object.assign(entity,ctx.request.body);
    var supervisor = await model.supervisor.bulkCreate(result);
    console.log(supervisor);

    //var supervisor = await model.supervisor.create(entity);
    //console.log('created: ' + JSON.stringify(supervisor));
    ctx.rest({});
};

var exportSupervisor  = async (ctx, next) => {
    let projectId=parseInt(ctx.query.projectId);
    var supervisor = await model.supervisor.findAll({
        where:{
            projectId
        }
    });
    let data=exportExcel(supervisor);
    ctx.sendExcel(data,ctx.req,ctx.res,'监理计划表.xlsx');
};

var updateSupervisor = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var supervisor = await model.supervisor.find({where: params});
    Object.assign(supervisor,ctx.request.body);
    supervisor.updatedAt = Date.now();
    await supervisor.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/supervisor': getSupervisor,
    'GET /api/supervisor/export': exportSupervisor,
    'POST /api/supervisor': createSupervisor,
    'POST /api/supervisor/import': importSupervisor,
    'PATCH /api/supervisor/:id': updateSupervisor,
    'DELETE /api/supervisor/:id': deleteSupervisor
};