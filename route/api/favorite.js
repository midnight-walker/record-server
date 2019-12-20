/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../ovModel');
const util=require('util');

var getOvFavorite = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize),query={};
    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    query.where={
        type:13
    };
    var favorites = await model.favorite.findAll(query);
    console.log(favorites[0].name);
    favorites.forEach(item=>{
        item.data=item.data.toString('utf8')
    })
    //let buffer=new Buffer(favorites[0].name);
    var count = await model.favorite.count();
    ctx.rest(favorites, count);
};

module.exports = {
    'GET /api/ovFavorite': getOvFavorite,
};