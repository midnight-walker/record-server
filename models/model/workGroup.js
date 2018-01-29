/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../../db');

module.exports = db.defineModel('work_group', {
    phone: db.BIGINT,
    name: db.STRING(50),
    fullName: db.STRING(50)
});