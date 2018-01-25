/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');
let moment = require('moment');

var getSupervisorDetail = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        recordTypeId = parseInt(ctx.query.recordTypeId),
        supervisorId = parseInt(ctx.query.supervisorId),
        projectId = parseInt(ctx.query.projectId),
        startDate = parseInt(ctx.query.startDate),
        endDate = parseInt(ctx.query.endDate),
        operator = ctx.query.operator ? ctx.request.body.operator : '',
        onlyError = !!ctx.query.onlyError,
        query = {},
        where = {};

    if (!isNaN(page) && !isNaN(size)) {
        query = {
            offset: page * size,
            limit: size
        }
    }
    if (!isNaN(recordTypeId)) {
        where = Object.assign({}, where, {recordTypeId});
    }
    if (!isNaN(supervisorId)) {
        where = Object.assign({}, where, {supervisorId});
    }
    if (!isNaN(projectId)) {
        where = Object.assign({}, where, {projectId});
    }
    if (ctx.query.startDate && ctx.query.endDate && !isNaN(startDate) && !isNaN(endDate)) {
        where = Object.assign({}, where, {
            createdAt: {
                $between: [startDate, endDate]
            }
        })
    }
    let includeRecordType = {
        model: model.recordType
    };
    if(onlyError){
        includeRecordType.where={
            type:{
                $not:0
            }
        }
    }
    if (operator && !isNaN(operator)) {
        where = Object.assign({}, where, {operator});
    }
    query.where = where;
    query.order = 'id DESC';
    query.include = [
        {
            model: model.user,
            attributes: ['username', 'wxname', 'phone'],
        },
        {
            model: model.supervisor
        },
        includeRecordType
    ];
    var supervisorList = await model.supervisor.findAll();
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

    let entity = {},types=[];
    Object.assign(entity, ctx.request.body);
    types=ctx.request.body.recordTypes;

    var supervisorDetail = await model.supervisorDetail.create(entity);
    console.log('created: ' + JSON.stringify(supervisorDetail));
    console.log(types);
    console.log(supervisorDetail.id);
    if(types && types.length){
        types.forEach(async (item)=>{
            let supervisorDetailType = await model.supervisorDetailTypes.create({
                supervisorDetailId:supervisorDetail.id,
                recordTypeId:item,
                operator:supervisorDetail.operator || ''
            });
            console.log(supervisorDetailType);
        })
    }
    ctx.rest({
        success: true
    });
};

var updateSupervisorDetail = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var supervisorDetail = await model.supervisorDetail.find({where: params});
    Object.assign(supervisorDetail, ctx.request.body);
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