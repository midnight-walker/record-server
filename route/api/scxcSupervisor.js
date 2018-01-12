const model = require('../../model');
let {exportExcel} = require('../../utils/export/scxcSupervisor');
let moment = require('moment');

var getWhere=(query)=>{
    let where={};
    let regionId=parseInt(query.regionId),
        stationId=parseInt(query.stationId),
        startDate=moment(query.startDate).format('x'),
        endDate=moment(query.endDate).format('x'),
        operator=query.operator;
    if(!isNaN(regionId) && regionId){
        where=Object.assign({},where,{regionId});
    }
    if(!isNaN(stationId) && stationId){
        where=Object.assign({},where,{stationId});
    }
    if(query.startDate && query.endDate &&!isNaN(startDate) && !isNaN(endDate)){
        where=Object.assign({},where,{
            time:{
                $between: [startDate, endDate]
            }
        })
    }
    if(operator){
        where=where=Object.assign({},where,{operator});
    }
    return where
}

var getListQuery=(query)=>{
    let page=parseInt(query.page)-1,size=parseInt(query.pageSize),listQuery={};
    if(!isNaN(page) && !isNaN(size)){
        listQuery={
            offset: page*size,
            limit: size
        }
    }
    return listQuery;
};

var getScxcSupervisor = async (ctx, next) => {
    let listQuery=getListQuery(ctx.query),countQuery={};

    countQuery.where=listQuery.where=getWhere(ctx.query);

    var scxcSupervisor = await model.scxcSupervisor.findAll(listQuery);
    var count=await model.scxcSupervisor.count(countQuery);
    ctx.rest(scxcSupervisor,count);
};

var exportScxcSupervisor = async (ctx, next) => {
    let listQuery=getListQuery(ctx.query),countQuery={};

    countQuery.where=listQuery.where=getWhere(ctx.query);

    var scxcSupervisor = await model.scxcSupervisor.findAll(listQuery);
    var count=await model.scxcSupervisor.count(countQuery);
    let data=exportExcel(scxcSupervisor);
    ctx.sendExcel(data,ctx.req,ctx.res,'aaa.xlsx');
};

var deleteScxcSupervisor = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var scxcSupervisor = await model.scxcSupervisor.find({where:params});
    await scxcSupervisor.destroy();
    ctx.rest({success:true});
};

var createScxcSupervisor = async (ctx, next) => {
    let entity={};
    Object.assign(entity,ctx.request.body);
    var scxcSupervisor = await model.scxcSupervisor.create(entity);
    ctx.rest({
        success:true
    });
};

var updateScxcSupervisor = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var scxcSupervisor = await model.scxcSupervisor.find({where:params});
    Object.assign(scxcSupervisor,ctx.request.body);
    scxcSupervisor.updatedAt=Date.now();
    await scxcSupervisor.save();
    ctx.rest({
        success:true
    });
};

module.exports = {
    'GET /api/scxcSupervisor': getScxcSupervisor,
    'GET /api/exportScxcSupervisor': exportScxcSupervisor,
    'POST /api/scxcSupervisor': createScxcSupervisor,
    'PATCH /api/scxcSupervisor/:id':updateScxcSupervisor,
    'DELETE /api/scxcSupervisor/:id':deleteScxcSupervisor
};