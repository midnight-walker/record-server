/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getSupervisorDetail = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        recordTypeId = parseInt(ctx.query.recordTypeId),
        supervisorId = parseInt(ctx.query.supervisorId),
        projectId = parseInt(ctx.query.projectId),
        operator = ctx.request.body.operator,
        query={},
        where={};

    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(recordTypeId)){
        where=Object.assign({},where,{recordTypeId});
    }
    if(!isNaN(supervisorId)){
        where=Object.assign({},where,{supervisorId});
    }
    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }
    if(!isNaN(operator)){
        where=Object.assign({},where,{operator});
    }
    query.where=where;
    query.order='id DESC';
    var supervisorDetails = await model.supervisorDetail.findAll(query);
    var count = await model.supervisorDetail.count(query);
    ctx.rest(supervisorDetails, count);
};

var deleteSupervisorDetail = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var supervisorDetail = await model.supervisorDetail.find({where: params});
    await supervisorDetail.destroy();
    ctx.rest({});
};

var createSupervisorDetail = async (ctx, next) => {

    let entity={};
    Object.assign(entity,ctx.request.body);

    var supervisorDetail = await model.supervisorDetail.create(entity);
    console.log('created: ' + JSON.stringify(supervisorDetail));
    ctx.rest({
        success: true
    });
};

var updateSupervisorDetail = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var supervisorDetail = await model.supervisorDetail.find({where: params});
    Object.assign(supervisorDetail,ctx.request.body);
    supervisorDetail.updatedAt = Date.now();
    await supervisorDetail.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/supervisorDetail': getSupervisorDetail,
    'POST /api/supervisorDetail': createSupervisorDetail,
    'PATCH /api/supervisorDetail/:id': updateSupervisorDetail,
    'DELETE /api/supervisorDetail/:id': deleteSupervisorDetail
};