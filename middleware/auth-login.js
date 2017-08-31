/**
 * Created by tqj <2482366539@qq.com> on 2017/8/9.
 */
module.exports =async (ctx, next) => {
    let path=ctx.request.path;
    await next();
    /*if (path === '/loginResult' || path === '/login') {
     await next();
     } else {
     if(ctx.session.user){
     console.log(ctx.session.user);
     await next();
     }else{
     ctx.redirect('/login');
     }
     }*/
}