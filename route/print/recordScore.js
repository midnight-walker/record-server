/**
 * Created by tqj <2482366539@qq.com> on 2018/1/24.
 */
let render=require('../../utils/renderService');

var recordScore = async (ctx, next) => {
    ctx.response.body = render(ctx,'printRecord',{});
};



module.exports = {
    'GET /print/recordScore': recordScore
};