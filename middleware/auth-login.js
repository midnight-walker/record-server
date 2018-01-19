/**
 * Created by tqj <2482366539@qq.com> on 2017/8/9.
 */

let {checkMemberPath}= require('../utils/auth/index');

module.exports = async (ctx, next) => {
    if (process.env.NODE_ENV === 'local') {
        if(!ctx.session.user){
            ctx.session.user = {
                username: 'frog',
                wxname: 'frog',
                phone: 13333333333,
                id: 1,
            };
            console.log('gege');
            await next();
        }else{
            await next();
        }

    } else {
        let path = ctx.request.path;
        let goAway=()=>{
            if(path.startsWith('/api/')){
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    success : false,
                    code: 'auth failed',
                    message: 'auth failed'
                };
            }else{
                ctx.redirect('/login');
            }
        };
        if (path === '/loginResult' || path === '/login' || path === '/api/validateWx' || path === '/auth') {
            await next();
        } else {
            let user=ctx.session.user;
            if (user) {
                if(user.groupid===1){
                    await next();
                }else if(checkMemberPath(ctx)){
                    if(typeof ctx.request.body === 'object'){
                        ctx.request.body.operator=user.id;
                    }
                    await next();
                }else{
                    goAway();
                }
            }else{
                goAway();
            }
        }
    }
}