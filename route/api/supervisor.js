/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

let {exportExcel} = require('../../utils/export/supervisor');
let notice=require('../../config/notice');
let getNotice=require('../../utils/getNotice');

var getSupervisor = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1,
        size = parseInt(ctx.query.pageSize),
        id=parseInt(ctx.query.id),
        queryName=ctx.query.queryName,
        recordTypeId = parseInt(ctx.query.recordTypeId),
        supervisorId = parseInt(ctx.query.supervisorId),
        projectId = parseInt(ctx.query.projectId),
        workGroupId = parseInt(ctx.query.workGroupId),
        step = parseInt(ctx.query.step),
        query={},
        where={};

    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    }
    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }
    if(!isNaN(workGroupId)){
        where=Object.assign({},where,{workGroupId});
    }
    if(!isNaN(step) && step>=0){
        where=Object.assign({},where,{step});
    }
    if(queryName){
        where=Object.assign({},where,{
            queryName:{
                $like: '%'+queryName+'%'
            }
        });
    }
    if(!isNaN(id)){
        where=Object.assign({},where,{id});
    }
    query.include = [
        {
            model: model.supervisorSimpleDetail
        },
        {
            model: model.member,
            attributes: ['name', 'phone'],
        },
        {
            model: model.workGroup,
            attributes: ['name', 'fullname', 'phone'],
        },
    ];
    query.where=where;
    var supervisors = await model.supervisor.findAll(query);
    delete query.include;
    var count = await model.supervisor.count(query);
    ctx.rest(supervisors,count);
};

var getSupervisorText= async (ctx, next) => {
    let id = parseInt(ctx.query.projectId),supervisorId=parseInt(ctx.query.supervisorId),where={},query={};
    if(!isNaN(id) && !isNaN(supervisorId)){
        where=Object.assign({},where,{id});
        query.where=where;
        query.attributes = ["standard"];
        var project = await model.project.find(query);

        let supervisorQuery={
            where:{
                id:supervisorId
            },
            include:[
                {
                    model: model.supervisorSimpleDetail
                },
                {
                    model: model.member,
                    attributes: ['name', 'phone'],
                },
                {
                    model: model.workGroup,
                    attributes: ['name', 'fullname', 'phone'],
                },
            ]
        };

        var supervisor = await model.supervisor.find(supervisorQuery);
        let result=getNotice(notice,supervisor);
        ctx.rest({
            standard:project.standard,
            supervisor,
            notice:result
        });
    }
};

var getSupervisorAll = async (ctx, next) => {
    let projectId = parseInt(ctx.query.projectId),
        query={},
        where={};

    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }
    query.where=where;
    query.attributes = ['id','region','station','village','group','smallClass', 'placeName','smallClassArea'];
    var supervisors = await model.supervisor.findAll(query);
    ctx.rest(supervisors);
};

var deleteSupervisor = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var supervisor = await model.supervisor.find({where: params});
    console.log(supervisor);
    await supervisor.destroy();
    ctx.rest({});
};

var setSupervisorMember = async (ctx, next) => {

    let queryName=ctx.request.body.queryName,
        projectId = parseInt(ctx.request.body.projectId),
        memberId = parseInt(ctx.request.body.memberId),
        workGroupId = parseInt(ctx.request.body.workGroupId),
        query={},
        where={};
    if(!isNaN(projectId)){
        where=Object.assign({},where,{projectId});
    }
    if(queryName){
        where=Object.assign({},where,{
            queryName:{
                $like: '%'+queryName+'%'
            }
        });
    }
    query.where=where;
    let supervisor = await model.supervisor.findAll(query);
    if(supervisor.length){
        supervisor.forEach(async (item,index)=>{
            Object.assign(item,{memberId,workGroupId});
            console.log(index);
            await item.save();
        })
    }
    console.log("end");
    ctx.rest({
        success: true
    });
};

var updateSupervisorStep = async (ctx, next) => {

    let id=parseInt(ctx.request.body.id);
    let workGroupId=parseInt(ctx.request.body.workGroupId);
    let memberId=parseInt(ctx.request.body.memberId);
    let step=parseInt(ctx.request.body.step);
    let time=+new Date();

    let supervisor = await model.supervisor.find({where: {id,workGroupId,memberId}});
    if(step===1){
        Object.assign(supervisor,{step:2,confirmTime:time});
    }else if(step===2){
        Object.assign(supervisor,{step:3,rectificationTime:time});
    }else if(step===3){
        Object.assign(supervisor,{step:4,endTime:time});
    }
    if(supervisor){
        await supervisor.save();
    }
    ctx.rest({
        success: true
    });
};

var createSupervisor = async (ctx, next) => {

    let entity={};
    Object.assign(entity,ctx.request.body);

    var supervisor = await model.supervisor.create(entity);
    console.log('created: ' + JSON.stringify(supervisor));
    ctx.rest({
        success: true
    });
};

var importSupervisorSimpleDetail = async (ctx, next) => {

    let entity=ctx.request.body.simpleDetails;
    let supervisorId=parseInt(ctx.request.body.supervisorId);
    let params = {supervisorId};
    if(supervisorId){
        await model.supervisorSimpleDetail.destroy({where: params});
    }
    await model.supervisorSimpleDetail.bulkCreate(entity);

    let workQuality=parseInt(ctx.request.body.workQuality);
    let workGroupId=parseInt(ctx.request.body.workGroupId);
    let memberId=parseInt(ctx.request.body.memberId);
    let startTime=ctx.request.body.startTime;
    let supervisor = await model.supervisor.find({where: {id:supervisorId}});
    Object.assign(supervisor,{workQuality,workGroupId,memberId,startTime,step:1});
    await supervisor.save();

    ctx.rest({
        success: true
    });
};

var importSupervisor = async (ctx, next) => {

    let entity={};
    let result=ctx.request.body.result,projectId=ctx.request.body.projectId;
    if(projectId){
        let params = {projectId: parseInt(projectId)};
        await model.supervisor.destroy({where: params});
    }

    //Object.assign(entity,ctx.request.body);
    var supervisor = await model.supervisor.bulkCreate(result);
    console.log(supervisor);

    //var supervisor = await model.supervisor.create(entity);
    //console.log('created: ' + JSON.stringify(supervisor));
    ctx.rest({});
};

var exportSupervisor  = async (ctx, next) => {
    let projectId=parseInt(ctx.query.projectId);
    var supervisor = await model.supervisor.findAll({
        where:{
            projectId
        }
    });
    let data=exportExcel(supervisor);
    ctx.sendExcel(data,ctx.req,ctx.res,'监理计划表.xlsx');
};

var updateSupervisor = async (ctx, next) => {
    let params={id:parseInt(ctx.params.id)};
    var supervisor = await model.supervisor.find({where: params});
    Object.assign(supervisor,ctx.request.body);
    supervisor.updatedAt = Date.now();
    await supervisor.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/supervisor': getSupervisor,
    'GET /api/supervisorText': getSupervisorText,
    'GET /api/supervisorAll': getSupervisorAll,
    'GET /api/supervisor/export': exportSupervisor,
    'POST /api/supervisor': createSupervisor,
    'POST /api/setSupervisorMember': setSupervisorMember,
    'POST /api/updateSupervisorStep': updateSupervisorStep,
    'POST /api/importSupervisorSimpleDetail': importSupervisorSimpleDetail,
    'POST /api/supervisor/import': importSupervisor,
    'PATCH /api/supervisor/:id': updateSupervisor,
    'DELETE /api/supervisor/:id': deleteSupervisor,

};