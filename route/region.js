const model = require('../model');

var getRegion = async (ctx, next) => {
    let page=parseInt(ctx.query._page)-1,size=parseInt(ctx.query._limit),query={};
    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    var region = await model.region.findAll(query);
    var count=await model.region.count();
    ctx.rest(region,count);
};

var deleteRegion = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var region = await model.region.find({where:params});
    await region.destroy();
    ctx.rest({success:true});
};

var createRegion = async (ctx, next) => {
    let params={
        name: ctx.request.body.name,
        code: ctx.request.body.code,
        pid:0
    };
    var region = await model.region.create(params);
    ctx.rest({
        success:true
    });
};

var updateRegion = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var region = await model.region.find({where:params});
    region.name=ctx.request.body.name;
    region.code=ctx.request.body.code;
    region.updatedAt=Date.now();
    await region.save();
    ctx.rest({
        success:true
    });
};

module.exports = {
    'GET /api/region': getRegion,
    'POST /api/region': createRegion,
    'PATCH /api/region/:id':updateRegion,
    'DELETE /api/region/:id':deleteRegion
};