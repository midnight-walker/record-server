/**
 * Created by tqj <2482366539@qq.com> on 2018/1/18.
 */

const base = require('./base/base');
const XLSX = require('xlsx-style');
const {defaultHeadStyle,defaultBodyAmtStyle, defaultBodyStyle, defaultTitleStyle, defaultInfoStyle ,defaultInfoCenterStyle}=require('./base/style');
const moment = require('moment');
let rightStyle = {
    alignment: {
        vertical: "center",
        horizontal: "right"
    }
};

function initExport(list) {
    return list.map((item, index) => {
        return {
            id: index + 1,
            region: item.monitor.region,
            station: item.monitor.station,
            village: item.monitor.village,
            group: item.monitor.group,
            smallClass: item.monitor.smallClass,
            smallClassArea: item.monitor.smallClassArea,
            placeName: item.monitor.placeName,
            treeCompose: item.monitor.treeCompose,
            signNumber: item.signNumber,
            createdAt: moment(item.createdAt, 'x').format('YYYY年MM月DD日'),
            longitude: item.longitude,
            latitude: item.latitude,
            altitude: item.altitude,
            slopePosition: item.slopePosition,
            slopeDirection: item.slopeDirection,
            treeHeight: item.treeHeight,
            treeRadius: item.treeRadius,
            treeDensity: item.monitor.treeDensity,
            crownDensity: item.monitor.crownDensity,
            member:item.member && item.member.name?item.member.name : ''
        }
    })

}

function exportExcel(list) {
    let result=initExport(list);
    console.log(result);
    let columns = [
        {
            prop: "id",
            label: "序号",
            width: "50"
        },
        {
            prop: "station",
            label: "乡镇（林场）",
            width: "80"
        },
        {
            prop: "village",
            label: "村（林班）",
            width: "70"
        },
        {
            prop: "group",
            label: "社",
            width: "40"
        },
        {
            prop: "smallClass",
            label: "小班号",
            width: "50"
        },
        {
            prop: "placeName",
            label: "小地名",
            width: "80"
        },
        {
            prop: "signNumber",
            label: "编号",
            headStyle:defaultInfoCenterStyle,
            width: "60"
        },
        {
            prop: "createdAt",
            label: "挂放时间",
            headStyle:defaultInfoCenterStyle,
            width: "120"
        },
        {
            prop: "longitude",
            label: "东经",
            headStyle:defaultInfoCenterStyle,
            width: "120"
        },
        {
            prop: "latitude",
            label: "北纬",
            headStyle:defaultInfoCenterStyle,
            width: "120"
        },
        {
            prop: "altitude",
            label: "海拔(米)",
            width: "60"
        },
        {
            prop: "slopePosition",
            label: "坡位",
            width: "50"
        },
        {
            prop: "slopeDirection",
            label: "坡向",
            width: "50"
        },
        {
            prop: "treeCompose",
            label: "树种组成",
            width: "100"
        },
        {
            prop: "treeHeight",
            label: "平均树高(米)",
            width: "100"
        },
        {
            prop: "treeRadius",
            label: "平均胸径（cm）",
            width: "100"
        },
        {
            prop: "treeDensity",
            label: "林′密°（株/亩）",
            width: "100"
        },
        {
            prop: "crownDensity",
            label: "郁闭°",
            width: "120"
        },
        {
            prop: "member",
            label: "工作人员（签字）°",
            width: "120"
        },
    ];
    let head = {
        "A1":{
            v:"表1　APF-I型松墨天牛化学引诱剂及诱捕器防治示范点基本情况调查表",
            s:defaultTitleStyle
        },
        "A2":{
            v:"区县（自治县）：綦江区",
            s:defaultInfoStyle
        },
        "A3":{
            v:"序号",
            s:defaultInfoCenterStyle
        },
        "B3":{
            v:"乡镇（林场） ",
            s:defaultInfoCenterStyle
        },
        "C3":{
            v:"村（林班）",
            s:defaultInfoCenterStyle
        },
        "D3":{
            v:"社",
            s:defaultInfoCenterStyle
        },
        "E3":{
            v:"小班",
            s:defaultInfoCenterStyle
        },
        "F3":{
            v:"小地名",
            s:defaultInfoCenterStyle
        },
        "G3":{
            v:"诱捕器（点）设置",
            s:defaultInfoCenterStyle
        },
        "H3":{
            v:"诱捕器（点）设置",
            s:defaultInfoCenterStyle
        },
        "I3":{
            v:"地理座标",
            s:defaultInfoCenterStyle
        },
        "J3":{
            v:"地理座标",
            s:defaultInfoCenterStyle
        },
        "K3":{
            v:"海拔 (米)",
            s:defaultInfoCenterStyle
        },
        "L3":{
            v:"坡位",
            s:defaultInfoCenterStyle
        },
        "M3":{
            v:"坡向",
            s:defaultInfoCenterStyle
        },
        "N3":{
            v:"树种组成",
            s:defaultInfoCenterStyle
        },
        "O3":{
            v:"平均树高(米)",
            s:defaultInfoCenterStyle
        },
        "P3":{
            v:"平均胸径（cm）",
            s:defaultInfoCenterStyle
        },
        "Q3":{
            v:"林′密°（株/亩）",
            s:defaultInfoCenterStyle
        },
        "R3":{
            v:"郁闭°",
            s:defaultInfoCenterStyle
        },
        "S3":{
            v:"工作人员（签字）",
            s:defaultInfoCenterStyle
        }
    };
    let merges = [
        {s:{r:0,c:0},e:{r:0,c:18}},
        {s:{r:1,c:0},e:{r:1,c:18}},
        {s:{r:2,c:0},e:{r:3,c:0}},
        {s:{r:2,c:1},e:{r:3,c:1}},
        {s:{r:2,c:2},e:{r:3,c:2}},
        {s:{r:2,c:3},e:{r:3,c:3}},
        {s:{r:2,c:4},e:{r:3,c:4}},
        {s:{r:2,c:5},e:{r:3,c:5}},
        {s:{r:2,c:6},e:{r:2,c:7}},
        {s:{r:2,c:8},e:{r:2,c:9}},
        {s:{r:2,c:10},e:{r:3,c:10}},
        {s:{r:2,c:11},e:{r:3,c:11}},
        {s:{r:2,c:12},e:{r:3,c:12}},
        {s:{r:2,c:13},e:{r:3,c:13}},
        {s:{r:2,c:14},e:{r:3,c:14}},
        {s:{r:2,c:15},e:{r:3,c:15}},
        {s:{r:2,c:16},e:{r:3,c:16}},
        {s:{r:2,c:17},e:{r:3,c:17}},
        {s:{r:2,c:18},e:{r:3,c:18}}
    ];

    // 构建 workbook 对象
    //let exportData=initExport(list,regionList,stationList);
    let wb = {
        SheetNames: ['monitor'],
        Sheets: {
            'monitor': base.createExcel({
                head,
                startRow: 4,
                columns,
                body: result,
                merges
            })
        }
    };
    return XLSX.write(wb, {type: 'buffer', bookType: "biff8"});
}

module.exports = {
    exportExcel
};