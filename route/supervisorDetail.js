/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */
let render=require('../utils/renderService');

var index = async (ctx, next) => {
    ctx.response.body = render(ctx,'supervisorDetail',{});
};



module.exports = {
    'GET /supervisorDetail': index
};