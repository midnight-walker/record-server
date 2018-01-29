/**
 * Created by tqj <2482366539@qq.com> on 2018/1/29.
 */
const db = require('../../db');

module.exports = db.defineModel('member', {
    name: db.STRING(50),
    wxid: {
        type: db.STRING(50),
        allowNull: true
    },
    wxname: db.STRING(50),
    phone:{
        type: db.BIGINT(20),
        allowNull: true
    }
});