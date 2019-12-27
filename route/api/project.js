/**
 * Created by tqj <2482366539@qq.com> on 2017/8/16.
 */
const model = require('../../model');

var getProject = async (ctx, next) => {
    let page = parseInt(ctx.query.page) - 1, size = parseInt(ctx.query.pageSize),id=parseInt(ctx.query.id),where={},query={};
    if(!isNaN(page) && !isNaN(size)){
        query={
            offset: page*size,
            limit: size
        }
    };
    if(!isNaN(id)){
        where.id=id;
        query.where=where;
    }
    var projects = await model.project.findAll(query);
    var count = await model.project.count();
    ctx.rest(projects, count);
};

var deleteProject = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var project = await model.project.find({where: params});
    await project.destroy();
    ctx.rest({});
};

var createProject = async (ctx, next) => {
    let params = {
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        standard: ctx.request.body.standard,
        notice: ctx.request.body.notice,
    };
    let sameName=await model.project.findAll({
        where: {
            name: ctx.request.body.name
        }
    });
    if(sameName.length){
        throw new Error('已存在项目名为'+ctx.request.body.name+'的项目，请修改项目名');
    }

    var project = await model.project.create(params);
    console.log('created: ' + JSON.stringify(project));
    ctx.rest({
        success: true
    });
};

var updateProject = async (ctx, next) => {
    let params = {id: parseInt(ctx.params.id)};
    var project = await model.project.find({where: params});
    project.name = ctx.request.body.name;
    project.description = ctx.request.body.description;
    project.standard = ctx.request.body.standard;
    project.updatedAt = Date.now();
    await project.save();
    ctx.rest({
        success: true
    });
};

module.exports = {
    'GET /api/project': getProject,
    'POST /api/project': createProject,
    'PATCH /api/project/:id': updateProject,
    'DELETE /api/project/:id': deleteProject
};