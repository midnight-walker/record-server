/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../../db');

module.exports = db.defineModel('scxc_supervisor', {
    regionId: db.BIGINT,
    stationId: db.BIGINT,
    stationName: {
        type: db.STRING(50),
        allowNull: true
    },
    village: {
        type: db.STRING(50),
        allowNull: true
    },
    group: {
        type: db.STRING(50),
        allowNull: true
    },
    smallClass: {
        type: db.STRING(50),
        allowNull: true
    },
    placeName: {
        type: db.STRING(50),
        allowNull: true
    },
    smallClassArea: {
        type: db.DOUBLE,
        allowNull: true
    },
    treeCompose: {
        type: db.STRING(100),
        allowNull: true
    },
    targetName: {
        type: db.STRING(50),
        allowNull: true
    },
    time: {
        type: db.BIGINT,
        allowNull: true
    },
    workGroup: {
        type: db.STRING(50),
        allowNull: true
    },
    longitude: {
        type: db.DOUBLE,
        allowNull: true
    },
    latitude: {
        type: db.DOUBLE,
        allowNull: true
    },
    picture: {
        type: db.STRING(5000),
        allowNull: true
    },
    //伐除开始
    fcXianyan: {
        type: db.STRING(20),
        allowNull: true
    },
    fcXixiao: {
        type: db.STRING(20),
        allowNull: true
    },
    fcGaodudayuwu: {
        type: db.STRING(20),
        allowNull: true
    },
    fcChanzhe: {
        type: db.STRING(20),
        allowNull: true
    },
    fcFugai: {
        type: db.STRING(20),
        allowNull: true
    },
    fcFengzhe: {
        type: db.STRING(20),
        allowNull: true
    },
    fcHuoshao: {
        type: db.STRING(20),
        allowNull: true
    },
    fcXuanya: {
        type: db.STRING(20),
        allowNull: true
    },
    fcXuangua: {
        type: db.STRING(20),
        allowNull: true
    },
    fcHuoshukuzhi: {
        type: db.STRING(20),
        allowNull: true
    },
    fcTotal: {
        type: db.STRING(20),
        allowNull: true
    },
    //伐除结束，集材开始
    jcFcFengzhe: {
        type: db.STRING(20),
        allowNull: true
    },
    jcFcSongshu: {
        type: db.STRING(20),
        allowNull: true
    },
    jcFcSongmu: {
        type: db.STRING(20),
        allowNull: true
    },
    jcFcSongzhi: {
        type: db.STRING(20),
        allowNull: true
    },
    jcFcShaotou: {
        type: db.STRING(20),
        allowNull: true
    },
    jcFcTotal: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcCaogai: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcKuye: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcTurang: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcTengman: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcDigou: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcDongxue: {
        type: db.STRING(20),
        allowNull: true
    },
    jcYcTotal: {
        type: db.STRING(20),
        allowNull: true
    },
    //集材结束。焚烧开始
    fsSongzhi: {
        type: db.STRING(20),
        allowNull: true
    },
    fsSongmu: {
        type: db.STRING(20),
        allowNull: true
    },
    fsSongcai: {
        type: db.STRING(20),
        allowNull: true
    },
    //伐桩开始
    fzFazhuang: {
        type: db.STRING(20),
        allowNull: true
    },
    fzBopi: {
        type: db.STRING(20),
        allowNull: true
    },
    fzJiahao: {
        type: db.STRING(20),
        allowNull: true
    },
    fzTouyao: {
        type: db.STRING(20),
        allowNull: true
    },
    fzShuliao: {
        type: db.STRING(20),
        allowNull: true
    },
    fzNitu: {
        type: db.STRING(20),
        allowNull: true
    },
    fzTotal: {
        type: db.STRING(20),
        allowNull: true
    },
    fzNumber: {
        type: db.STRING(20),
        allowNull: true
    }
});


