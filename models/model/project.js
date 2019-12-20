/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../../db');

module.exports = db.defineModel('project', {
    name: db.STRING(100),
    description: db.STRING(200),
    standard: db.TEXT,
    notice: db.TEXT,
    scoreSheet: db.TEXT,
});