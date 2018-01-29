/**
 * Created by tqj <2482366539@qq.com> on 2017/8/9.
 */

let {checkMemberPath,checkWorkerPath}= require('../utils/auth/index');

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
                    code: -1,
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
            let member=ctx.session.member;
            let group=ctx.session.group;
            if(user){
                await next();
            }else if(member.id && checkMemberPath(ctx)){
                if(typeof ctx.request.body === 'object'){
                    ctx.request.body.memberId=member.id;
                }
                await next();
            }else if(group.id && checkWorkerPath(ctx)){
                if(typeof ctx.request.body === 'object'){
                    ctx.request.body.workGroupId=group.id;
                }
                await next();
            }else{
                goAway();
            }
        }
    }
}