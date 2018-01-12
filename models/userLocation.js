/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../db');

module.exports = db.defineModel('user_location', {
    latitude: db.DOUBLE,
    longitude: db.DOUBLE,
    time: db.BIGINT
});