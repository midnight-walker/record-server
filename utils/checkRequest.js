/**
 * Created by tqj <2482366539@qq.com> on 2017/12/4.
 */
var allows=[
    {
        method:'GET',
        path:'/api/region'
    },
    {
        method:'GET',
        path:'/api/station'
    },
    {
        method:'GET',
        path:'/auth'
    },
    {
        method:'GET',
        path:'/api/validateUser'
    },
    {
        method:'POST',
        path:'/api/scxcSupervisor'
    },

];
module.exports = function(header,method,path){
    if(header.host.indexOf('127.0.0.1:3000'>-1)){
        return true;
    }else{
        console.log(method,path);
        return allows.some((item)=>{
            return item.method===method && item.path===path;
        })
    }
}