/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getUserLocation = async (ctx, next) => {
    let operator=ctx.query.operator,start=parseInt(ctx.query.start),end=parseInt(ctx.query.end);
    let where={};
    if(start && end &&!isNaN(start) && !isNaN(end)){
        where=Object.assign({},where,{
            time:{
                $between: [start, end]
            }
        })
    }
    if(operator){
        where=Object.assign({},where,{operator});
    }
    let listQuery={},countQuery={};

    countQuery.where=listQuery.where=where;

    var userLocation = await model.userLocation.findAll(listQuery);
    var count=await model.userLocation.count(countQuery);

    ctx.rest(userLocation,count);
};

var createUserLocation = async (ctx, next) => {
    let params={
        latitude: ctx.request.body.username,
        longitude: ctx.request.body.password,
        time:+new Date(),
        operator:ctx.request.body.operator
    };
    var userLocation = await model.user.create(params);
    console.log('created: ' + JSON.stringify(userLocation));
    ctx.rest({
        success:true
    });
};


module.exports = {
    'GET /api/userLocation': getUserLocation,
    'POST /api/userLocation': createUserLocation,
};