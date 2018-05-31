/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');
const Sequelize = require('sequelize');
let moment = require('moment');

var getMonitorDetail = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        id=parseInt(ctx.query.id),
        monitorId = parseInt(ctx.query.monitorId),
        projectId = parseInt(ctx.query.projectId),
        startDate = parseInt(ctx.query.startDate),
        endDate = parseInt(ctx.query.endDate),
        memberId = ctx.query.memberId ? ctx.query.memberId : '',
        query = {},
        where = {};

    if (!isNaN(id)) {
        where = Object.assign({}, where, {id});
    }
    if (!isNaN(monitorId)) {
        where = Object.assign({}, where, {monitorId});
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
    if (memberId && !isNaN(memberId)) {
        where = Object.assign({}, where, {memberId});
    }
    query.where = where;
    query.order = [['savedAt','ASC']];
    query.include = [
        {
            model: model.member,
            attributes: ['name', 'wxname', 'phone'],
        },
        {
            model: model.monitor
        },
        {
            model:model.monitorDetailDescription
        }
    ];

    if (!isNaN(page) && !isNaN(size)) {
        query.offset= page * size;
        query.limit=size;
    }

    var monitorList = await model.monitor.findAll();
    var monitorDetails = await model.monitorDetail.findAll(query);
    var count = await model.monitorDetail.count(query);
    ctx.rest(monitorDetails, count);
};

var deleteMonitorDetail = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var monitorDetail = await model.monitorDetail.find({where: params});
    await monitorDetail.destroy();
    ctx.rest({});
};

var createMonitorDetail = async (ctx, next) => {

    let entity = {},description=[];
    Object.assign(entity, ctx.request.body);
    console.log(entity);
    //description=ctx.request.body.description;
    //console.log(entity);
    var monitorDetail = await model.monitorDetail.create(entity);
    //console.log('created: ' + JSON.stringify(monitorDetail));
    /*if(description && description.length){
        description.forEach(async (item)=>{
            let monitorDetailType = await model.monitorDetailDescription.create({
                monitorDetailId:monitorDetail.id,
                picture:item.picture,
                description:item.description
            });
        })
    }*/
    ctx.rest({
        success: true
    });
};

var createMonitorDetailDescription = async (ctx, next) => {
    let entity = {};
    Object.assign(entity, ctx.request.body);
    var monitorDetailDescription = await model.monitorDetailDescription.create(entity);
    ctx.rest({
        success: true,
        monitorDetailDescription
    });
};

var updateMonitorDetail = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var monitorDetail = await model.monitorDetail.find({where: params});
    Object.assign(monitorDetail, ctx.request.body);
    monitorDetail.updatedAt = Date.now();
    await monitorDetail.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/monitorDetail': getMonitorDetail,
    'POST /api/monitorDetail': createMonitorDetail,
    'POST /api/createMonitorDetailDescription': createMonitorDetailDescription,
    'PATCH /api/monitorDetail/:id': updateMonitorDetail,
    'DELETE /api/monitorDetail/:id': deleteMonitorDetail
};