/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../../db');

module.exports = db.defineModel('record_type', {
    name: db.STRING(100),
    type: db.INTEGER,
    pid:db.INTEGER,
    level:db.INTEGER,
    description:db.STRING(200)
});