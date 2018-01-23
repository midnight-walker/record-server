/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../../db');

module.exports = db.defineModel('user', {
    password: db.STRING(50),
    username: db.STRING(50),
    wxid: {
        type: db.STRING(50),
        allowNull: true
    },
    wxname: db.STRING(50),
    phone:{
        type: db.BIGINT(20),
        allowNull: true
    },
    groupid:db.BIGINT(20)
});