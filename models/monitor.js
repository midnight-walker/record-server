/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../db');

module.exports = db.defineModel('monitor', {
    regionId:db.BIGINT,
    stationId:db.BIGINT,
    stationName:{
        type:db.STRING(50),
        allowNull:true
    },
    village:{
        type:db.STRING(50),
        allowNull:true
    },
    group:{
        type:db.STRING(50),
        allowNull:true
    },
    smallClass:{
        type:db.STRING(50),
        allowNull:true
    },
    placeName:{
        type:db.STRING(50),
        allowNull:true
    },
    smallClassArea:{
        type:db.DOUBLE,
        allowNull:true
    },
    treeCompose:{
        type:db.STRING(100),
        allowNull:true
    },
    targetName:{
        type:db.STRING(50),
        allowNull:true
    },
    time:{
        type:db.BIGINT,
        allowNull:true
    },
    happenLevel:{
        type:db.STRING(50),
        allowNull:true
    },
    harmLevel:{
        type:db.STRING(50),
        allowNull:true
    },
    treeName:{
        type:db.STRING(50),
        allowNull:true
    },
    witheredNumer:{
        type:db.DOUBLE,
        allowNull:true
    },
    burnNumber:{
        type:db.DOUBLE,
        allowNull:true
    },
    breakNumber:{
        type:db.DOUBLE,
        allowNull:true
    },
    downNumber:{
        type:db.DOUBLE,
        allowNull:true
    },
    landslideNumber:{
        type:db.DOUBLE,
        allowNull:true
    },
    wormPercent:{
        type:db.DOUBLE,
        allowNull:true
    },
    wormDensity:{
        type:db.DOUBLE,
        allowNull:true
    },
    illIndex:{
        type:db.DOUBLE,
        allowNull:true
    },
    longitude:{
        type:db.DOUBLE,
        allowNull:true
    },
    latitude:{
        type:db.DOUBLE,
        allowNull:true
    },
    picture:{
        type:db.STRING(5000),
        allowNull:true
    }
});
