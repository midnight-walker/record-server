/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../db');

module.exports = db.defineModel('user', {
    password: db.STRING(50),
    username: db.STRING(50),
    wxname: db.STRING(50),
    phone:db.BIGINT(20),
    groupid:db.BIGINT(20)
});