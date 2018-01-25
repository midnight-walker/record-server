/**
 * Created by tqj <2482366539@qq.com> on 2018/1/25.
 */

const db = require('../../db');

module.exports = db.defineModel('supervisor_detail_types', {
    recordTypeId: db.INTEGER,
    supervisorDetailId: db.INTEGER
});