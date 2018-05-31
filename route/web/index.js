/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
let render=require('../../utils/renderService');

var indexWeb = async (ctx, next) => {
    ctx.response.body = render(ctx,'indexWeb',{});
};

var projectWeb = async (ctx, next) => {
    ctx.response.body = render(ctx,'projectWeb',{
        id:parseInt(ctx.params.id)
    });
};

var supervisorWeb = async (ctx, next) => {
    ctx.response.body = render(ctx,'supervisorWeb',{
        id:parseInt(ctx.params.id)
    });
};
module.exports = {
    'GET /web': indexWeb,
    'GET /web/project/:id': projectWeb,
    'GET /web/supervisor/:id': supervisorWeb,
};