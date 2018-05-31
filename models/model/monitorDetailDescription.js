/**
 * Created by tqj <2482366539@qq.com> on 2018/5/15.
 */
const db = require('../../db');

module.exports = db.defineModel('monitor_detail_description', {
    monitorDetailId:db.INTEGER,
    monitorStepId:db.INTEGER,
    picture: db.STRING(500),
    description: {
        type: db.STRING(500),
        allowNull: true
    },
    memberId: {
        type: db.INTEGER,
        allowNull: true
    },
});
