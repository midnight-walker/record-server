/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../db');

module.exports = db.defineModel('supervisor_detail', {
    picture: db.STRING(500),
    longitude: db.DOUBLE,
    latitude: db.DOUBLE,
    description:db.STRING(500),
    recordTypeId: db.INTEGER,
    quantity: db.INTEGER,
    supervisorId: db.INTEGER,
    status: db.INTEGER,
    reason: db.STRING(500),
});