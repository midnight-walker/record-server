const model = require('../model');

var getStation = async (ctx, next) => {
    let page=parseInt(ctx.query._page)-1,size=parseInt(ctx.query._limit),regionId=parseInt(ctx.query.regionId);
    let listQuery={},countQuery={};
    if(!isNaN(page) && !isNaN(size)){
        listQuery={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(regionId) && regionId){
        listQuery.where={
            regionId
        };
        countQuery.where={regionId};
    }
    console.log(listQuery,countQuery);
    var station = await model.station.findAll(listQuery);
    var count=await model.station.count(countQuery);
    ctx.rest(station,count);
};

var deleteStation = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var station = await model.station.find({where:params});
    await station.destroy();
    ctx.rest({success:true});
};

var createStation = async (ctx, next) => {
    let params={
        name: ctx.request.body.name,
        regionId: ctx.request.body.regionId
    };
    var station = await model.station.create(params);
    ctx.rest({
        success:true
    });
};

var updateStation = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var station = await model.station.find({where:params});
    station.name=ctx.request.body.name;
    station.regionId=ctx.request.body.regionId;
    station.updatedAt=Date.now();
    await station.save();
    ctx.rest({
        success:true
    });
};

module.exports = {
    'GET /api/station': getStation,
    'POST /api/station': createStation,
    'PATCH /api/station/:id':updateStation,
    'DELETE /api/station/:id':deleteStation
};