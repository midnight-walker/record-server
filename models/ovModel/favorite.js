/**
 * Created by tqj <2482366539@qq.com> on 2018/1/5.
 */
const db = require('../../ovDb');
module.exports = db.defineModel('favorite', {
    id: {
        type : db.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        unique : true,
        allowNull: true
    },
    pid: db.BIGINT,
    userid: db.BIGINT,
    sn:db.INTEGER,
    name: db.STRING(200),
    type:db.INTEGER,
    showlevel:db.INTEGER,
    groupattr:db.INTEGER,
    allcnt:db.INTEGER,
    mtime:db.INTEGER,
    md5:db.INTEGER,
    datalen:db.INTEGER,
    data:db.BLOB('medium'),
});