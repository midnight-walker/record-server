/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../../db');

module.exports = db.defineModel('station', {
    name: {
        type:db.STRING(50)
    },
    regionId:{
        type:db.BIGINT
    }
});
