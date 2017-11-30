/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
var index = async (ctx, next) => {

};

var auth = async (ctx, next) => {
    console.log(ctx.request);
    console.log(ctx.request.params);
    ctx.rest(123);
};


module.exports = {
    'GET /': index,
    'GET /auth': auth,
};