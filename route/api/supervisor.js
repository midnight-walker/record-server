/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getSupervisor = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        recordTypeId = parseInt(ctx.query.recordTypeId),
        supervisorId = parseInt(ctx.query.supervisorId),
        projectId = parseInt(ctx.query.projectId),
        where={};

    if(!isNaN(page) && !isNaN(size)){
        where={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }

    var supervisors = await model.supervisor.findAll(where);
    var count = await model.supervisor.count(where);
    ctx.rest(supervisors, count);
};

var deleteSupervisor = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var supervisor = await model.supervisor.find({where: params});
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
    'POST /api/supervisor': createSupervisor,
    'PATCH /api/supervisor/:id': updateSupervisor,
    'DELETE /api/supervisor/:id': deleteSupervisor
};