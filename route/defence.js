const model = require('../model');

var getDefence = async (ctx, next) => {
    let page=parseInt(ctx.query._page)-1,size=parseInt(ctx.query._limit),regionId=parseInt(ctx.query.regionId),stationId=parseInt(ctx.query.regionId),where={};
    let listQuery={},countQuery={};
    if(!isNaN(page) && !isNaN(size)){
        listQuery={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(regionId) && regionId){
        where=Object.assign({},where,{regionId});
    }
    if(!isNaN(stationId) && stationId){
        where=Object.assign({},where,{stationId});
    }
    countQuery.where=listQuery.where=where;
    var defence = await model.defence.findAll(listQuery);
    var count=await model.defence.count(countQuery);
    ctx.rest(defence,count);
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
    'POST /api/defence': createDefence,
    'PATCH /api/defence/:id':updateDefence,
    'DELETE /api/defence/:id':deleteDefence
};