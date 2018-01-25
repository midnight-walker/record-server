/**
 * Created by tqj <2482366539@qq.com> on 2018/1/18.
 */

const base=require('./base/base');
const XLSX = require('xlsx-style');
const {defaultHeadStyle,defaultBodyStyle}=require('./base/style');
let rightStyle={
    alignment: {
        vertical: "center",
        horizontal: "right"
    }
};

function initExport(list,regionList,stationList){

}

function exportExcel (list,regionList,stationList) {
    let columns=[
        {
            prop:"id",
            label:"监理点编号",
            width:"100"
        },
        {
            prop:"region",
            label:"区县名",
            width:"100"
        },
        {
            prop:"station",
            label:"乡镇（林场）名",
            width:"120"
        },
        {
            prop:"village",
            label:"村（管护站）名",
            width:"120"
        },
        {
            prop:"group",
            label:"组（社、林班）号",
            width:"120"
        },
        {
            prop:"smallClass",
            label:"小班号",
            width:"50"
        },
        {
            prop:"placeName",
            label:"小地名",
            width:"120"
        },
        {
            prop:"smallClassArea",
            label:"小班面积（亩）",
            width:"120"
        },
        {
            prop:"treeCompose",
            label:"树种组成",
            width:"100"
        },
        {
            prop:"targetName",
            label:"防治对象名称",
            width:"100"
        },
        {
            prop:"startTime",
            label:"开始时间",
            width:"100"
        },
        {
            prop:"endTime",
            label:"结束时间",
            width:"100"
        },
        {
            prop:"workGroup",
            label:"施工单位",
            width:"100"
        },
        {
            prop:"workGroup",
            label:"施工单位联系电话",
            width:"160"
        },
        {
            prop:"workQuality",
            label:"工作质量",
            width:"100"
        },
        {
            prop:"mainQuestion",
            label:"主要问题",
            width:"100"
        },
        {
            prop:"effect",
            label:"防治效果",
            width:"100"
        },
        {
            prop:"operator",
            label:"防治人员",
            width:"100"
        }
    ];
    let head={
    };
    let merges=[
    ];

    // 构建 workbook 对象
    //let exportData=initExport(list,regionList,stationList);
    let wb = {
        SheetNames: ['监理计划'],
        Sheets: {
            '监理计划': base.createExcel({
                head,
                startRow:2,
                columns,
                body:list,
                merges
            })
        }
    };
    return XLSX.write(wb, {type: 'buffer'});
}

module.exports={
    exportExcel
};