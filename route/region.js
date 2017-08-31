const model = require('../model');

var getRegion = async (ctx, next) => {
    var region = await model.region.findAll();
    ctx.rest(region);
};

var addRegion=async (ctx, next) => {
    var region = await model.region.create({
        name: ctx.request.body.name,
        code: ctx.request.body.code
    });
    console.log('created: ' + JSON.stringify(region));
};

var addRegion1=async (ctx, next) => {
    try{
        var region = await model.region.create({
            name: '南岸区',
            pid:0
        });
        console.log('created: ' + JSON.stringify(region));
    }catch (e){
        console.log(e);
    }

};

module.exports = {
    'GET /api/getRegion': getRegion,
    'GET /api/addRegion': addRegion1,
    'POST /api/addRegion': addRegion,
};