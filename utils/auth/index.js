/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
const memberPath=[
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
        method:'GET',
        path:'/api/project'
    },
    {
        method:'GET',
        path:'/api/recordType'
    },
    {
        method:'GET',
        path:'/api/supervisor'
    },
    {
        method:'POST',
        path:'/api/scxcSupervisor'
    },
    {
        method:'GET',
        path:'/api/scxcSupervisor'
    },
    {
        method:'GET',
        path:'/api/validateWx'
    },
    {
        method:'GET',
        path:'/api/supervisorDetail'
    },
    {
        method:'POST',
        path:'/api/supervisorDetail'
    },
];

function checkMemberPath(ctx) {
    return memberPath.some((item)=>{
        return item.method===ctx.request.method && item.path===ctx.request.path;
    })
}

const workerPath=[
    {
        method:'GET',
        path:'/auth'
    },
    {
        method:'GET',
        path:'/api/validateUser'
    },
    {
        method:'GET',
        path:'/api/project'
    },
    {
        method:'GET',
        path:'/api/recordType'
    },
    {
        method:'GET',
        path:'/api/supervisor'
    },
    {
        method:'GET',
        path:'/api/validateWx'
    },
    {
        method:'GET',
        path:'/api/supervisorDetail'
    },
];

function checkWorkerPath(ctx) {
    return workerPath.some((item)=>{
        return item.method===ctx.request.method && item.path===ctx.request.path;
    })
}

module.exports={
    checkMemberPath,
    checkWorkerPath
}