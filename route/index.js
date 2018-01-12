/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
let render=require('../utils/renderService');

var index = async (ctx, next) => {
    ctx.response.body = render(ctx,'index',{});
};



module.exports = {
    'GET /': index
};