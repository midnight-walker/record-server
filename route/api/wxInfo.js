/**
 * Created by tqj <2482366539@qq.com> on 2018/1/11.
 */

var crypto = require('crypto');
let {appIds,appSecrets}=require('../../config/web');
let axios=require('axios');
const model = require('../../model');


function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
};

function handelUser() {

}

function handelGroup() {

}

var validateGroup=async (ctx, next) => {
    if(ctx.session.group){
        ctx.rest(0);
        return;
    }
    let phone=parseInt(ctx.query.phone);
    if(!isNaN(phone)){
        var group = await model.workGroup.find({
            where: {
                phone
            }
        });
        if(!group){
            var worker=await model.supervisor.findOne({
                attributes: ['workGroupName', 'workGroupPhone'],
                where: {
                    workGroupPhone:phone
                }
            });
            if(worker){
                let params = {
                    name: worker.workGroupName,
                    phone: phone,
                    fullName: worker.workGroupName
                };
                group = await model.workGroup.create(params);
            }else{
                throw new Error('无权限');
            }
        }
        ctx.session.group=group;
        ctx.rest(1);
    }else{
        throw new Error('手机号错误');
    }
}

var validateWx=async (ctx, next) => {
    if(ctx.session.member){
        ctx.rest(0);
        return;
    }
    let idx=ctx.query.appId || 0,appId=appIds[idx],appSecret=appSecrets[idx];

    let res=await axios({
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
            appid:appId,
            secret:appSecret,
            js_code:ctx.query.code,
            grant_type:"authorization_code"
        }
    });

    var sessionKey = res.data.session_key;
    var encryptedData =ctx.query.encryptedData;
    var iv = ctx.query.iv;
    var pc = new WXBizDataCrypt(appId, sessionKey)
    var data = pc.decryptData(encryptedData , iv)
    var member = await model.member.find({
        where: {
            $or: [{wxid: data.openId}, {wxname: data.nickName}]
        }
    });

    if(!member){
        throw new Error('没有权限，请联系管理员添加');
    }else{
        if(!member.wxid){
            member.wxid = data.openId;
            member.updatedAt = Date.now();
            await member.save();
        }
        ctx.session.member=member;
        ctx.rest(1);
    }

}


module.exports = {
    'GET /api/validateWx': validateWx,
};