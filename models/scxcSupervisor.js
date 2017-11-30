/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
const db = require('../db');

module.exports = db.defineModel('scxc_supervisor', {
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
    workGroup:{
        type:db.STRING(50),
        allowNull:true
    },
    workQuality:{
        type:db.STRING(50),
        allowNull:true
    },
    mainQuestion:{
        type:db.STRING(50),
        allowNull:true
    },
    effect:{
        type:db.STRING(50),
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
    },
    fcXianyan:{
        type:db.STRING(255),
        allowNull:true
    },
    fcXixiao:{
        type:db.STRING(255),
        allowNull:true
    },
    fcGaodudayuwu:{
        type:db.STRING(255),
        allowNull:true
    },
    fcChanzhe:{
        type:db.STRING(255),
        allowNull:true
    },
    fcFugai:{
        type:db.STRING(255),
        allowNull:true
    },
    fcFengzhe:{
        type:db.STRING(255),
        allowNull:true
    },
    fcHuoshao:{
        type:db.STRING(255),
        allowNull:true
    },
    fcXuanya:{
        type:db.STRING(255),
        allowNull:true
    },
    fcXuangua:{
        type:db.STRING(255),
        allowNull:true
    },
    fcHuoshukuzhi:{
        type:db.STRING(255),
        allowNull:true
    },
    jcFachu:{
        type:db.STRING(255),
        allowNull:true
    },
    jcYincang:{
        type:db.STRING(255),
        allowNull:true
    },
    jcKusi:{
        type:db.STRING(255),
        allowNull:true
    },
    fsJicai:{
        type:db.STRING(255),
        allowNull:true
    },
    fzFazhuang:{
        type:db.STRING(255),
        allowNull:true
    },
    fzJiahao:{
        type:db.STRING(255),
        allowNull:true
    },
    fzTouyao:{
        type:db.STRING(255),
        allowNull:true
    },
    fzShuliao:{
        type:db.STRING(255),
        allowNull:true
    },
    fzNitu:{
        type:db.STRING(255),
        allowNull:true
    }
});