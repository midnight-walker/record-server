const model = require('../../model');
let {exportExcel} = require('../../utils/export/defence');
let moment = require('moment');

var getWhere=(query)=>{
    let where={};
    let regionId=parseInt(query.regionId),
        stationId=parseInt(query.stationId),
        startDate=moment(query.startDate).format('x'),
        endDate=moment(query.endDate).format('x');
    if(!isNaN(regionId) && regionId){
        where=Object.assign({},where,{regionId});
    }
    if(!isNaN(stationId) && stationId){
        where=Object.assign({},where,{stationId});
    }
    if(!isNaN(startDate) && !isNaN(endDate)){
        where=Object.assign({},where,{
            time:{
                $between: [startDate, endDate]
            }
        })
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

var getDefence = async (ctx, next) => {
    let listQuery=getListQuery(ctx.query),countQuery={};

    countQuery.where=listQuery.where=getWhere(ctx.query);

    var defence = await model.defence.findAll(listQuery);
    var count=await model.defence.count(countQuery);
    ctx.rest(defence,count);
};

var exportDefence = async (ctx, next) => {
    let listQuery=getListQuery(ctx.query),countQuery={};

    countQuery.where=listQuery.where=getWhere(ctx.query);

    var defence = await model.defence.findAll(listQuery);
    var count=await model.defence.count(countQuery);
    let data=exportExcel(defence);
    ctx.sendExcel(data,ctx.req,ctx.res,'aaa.xlsx');
};

var deleteDefence = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var defence = await model.defence.find({where:params});
    await defence.destroy();
    ctx.rest({success:true});
};

var createDefence = async (ctx, next) => {
    let entity={};
    Object.assign(entity,ctx.request.body);
    var defence = await model.defence.create(entity);
    ctx.rest({
        success:true
    });
};

var updateDefence = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var defence = await model.defence.find({where:params});
    Object.assign(defence,ctx.request.body);
    defence.updatedAt=Date.now();
    await defence.save();
    ctx.rest({
        success:true
    });
};

module.exports = {
    'GET /api/defence': getDefence,
    'GET /api/exportDefence': exportDefence,
    'POST /api/defence': createDefence,
    'PATCH /api/defence/:id':updateDefence,
    'DELETE /api/defence/:id':deleteDefence
};