/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
var index = async (ctx, next) => {
    console.log(ctx);
};

var auth = async (ctx, next) => {

};


module.exports = {
    'GET /': index,
    'GET /auth': auth,
};