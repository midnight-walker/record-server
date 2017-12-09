/**
 * Created by tqj <2482366539@qq.com> on 2017/8/9.
 */
const sendExcel=require('../utils/export/base/send');

const checkRequest=require('../utils/checkRequest');

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            console.log(ctx.request);
            if(!checkRequest(ctx.request.header,ctx.request.method,ctx.request.path)){
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: 'auth failed',
                    message: 'auth failed'
                };
            }
            else if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data,count=10) => {
                    ctx.response.set('x-total-count', count);
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                };
                ctx.sendExcel=sendExcel;
                try {
                    await next();
                } catch (e) {
                    console.log(e);
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};