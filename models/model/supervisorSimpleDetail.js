/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../../db');

module.exports = db.defineModel('supervisor_simple_detail', {
    recordTypeId: db.INTEGER,
    recordTypeName: db.STRING(100),
    supervisorId: db.INTEGER,
    projectId: db.INTEGER,
    score: db.INTEGER,
});