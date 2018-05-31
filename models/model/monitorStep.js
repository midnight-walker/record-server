/**
 * Created by tqj <2482366539@qq.com> on 2018/5/15.
 */
const db = require('../../db');

module.exports = db.defineModel('monitor_step', {
    name: db.STRING(100),
});
