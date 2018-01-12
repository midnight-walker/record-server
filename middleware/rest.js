/**
 * Created by tqj <2482366539@qq.com> on 2017/8/9.
 */
const sendExcel=require('../utils/export/base/send');

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
        this.success = false;
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data,count) => {
                    ctx.response.type = 'application/json';
                    let result={
                        data,
                        success:true
                    };
                    if(count!==undefined){
                        result.total=count;
                    }
                    ctx.response.body = result;
                };
                ctx.sendExcel=sendExcel;
                try {
                    await next();
                } catch (e) {
                    console.log(e);
                    console.log('Process API error...');
                    ctx.response.status = 200;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || '',
                        success : false
                    };
                }
            } else {
                await next();
            }
        };
    }
};