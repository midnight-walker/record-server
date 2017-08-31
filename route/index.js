/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
var render=require("../service/render-service");
var index = async (ctx, next) => {
    ctx.response.body = render("index", {test:123}, ctx);
};

module.exports = {
    'GET /': index
};