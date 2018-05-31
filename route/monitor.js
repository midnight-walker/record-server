/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */
let render=require('../utils/renderService');

var monitor = async (ctx, next) => {
    ctx.response.body = render(ctx,'monitor',{});
};

var monitorDetail = async (ctx, next) => {
    ctx.response.body = render(ctx,'monitorDetail',{});
};

var monitorStep = async (ctx, next) => {
    ctx.response.body = render(ctx,'monitorStep',{});
};


module.exports = {
    'GET /monitor': monitor,
    'GET /monitorDetail': monitorDetail,
    'GET /monitorStep': monitorStep
};