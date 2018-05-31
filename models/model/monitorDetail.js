/**
 * Created by tqj <2482366539@qq.com> on 2018/5/15.
 */
const db = require('../../db');

module.exports = db.defineModel('monitor_detail', {
    projectId:db.INTEGER,
    monitorId:db.INTEGER,
    longitude: db.DOUBLE,
    latitude: db.DOUBLE,
    altitude: db.DOUBLE,
    signNumber: db.INTEGER,
    slopePosition: db.STRING(50),
    slopeDirection: db.STRING(50),
    treeHeight: db.DOUBLE,
    treeRadius: db.DOUBLE,
    picture: db.STRING(500),
    description: {
        type: db.STRING(500),
        allowNull: true
    },
    status:db.INTEGER,
    memberId: {
        type: db.INTEGER,
        allowNull: true
    },
    savedAt: db.BIGINT,
});
