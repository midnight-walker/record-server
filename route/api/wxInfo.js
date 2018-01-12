/**
 * Created by tqj <2482366539@qq.com> on 2018/1/11.
 */

var crypto = require('crypto');
let {appId,appSecret}=require('../../config/web');
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
}

var validateWx=async (ctx, next) => {
    if(ctx.session.user){
        ctx.rest(0);
        return;
    }
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
    var user = await model.user.find({
        where: {
            $or: [{wxid: data.openId}, {wxname: data.nickName}]
        }
    });
    if(!user){
        throw new Error('没有权限，请联系管理员添加');
    }else{
        if(!user.wxid){
            user.wxid = data.openId;
            user.updatedAt = Date.now();
        }
        await user.save();
        ctx.session.user=user;
        ctx.rest(1);
    }
}


module.exports = {
    'GET /api/validateWx': validateWx,
};