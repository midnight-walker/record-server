/**
 * Created by tqj <2482366539@qq.com> on 2017/9/20.
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
            prop:"village",
            label:"村（管护站）名",
            width:"100"
        },
        {
            prop:"group",
            label:"组（社、林班）号",
            width:"250"
        },
        {
            prop:"smallClass",
            label:"小班号",
            width:"50"
        },
        {
            prop:"placeName",
            label:"小地名",
            width:"100"
        },
        {
            prop:"smallClassArea",
            label:"小班面积（亩）",
            width:"100"
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
            prop:"time",
            label:"防治时间（年、月、日）",
            width:"100"
        },
        {
            prop:"mode",
            label:"防治方式",
            width:"100"
        },
        {
            prop:"quantity",
            label:"防治数量",
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
        "A1":{
            v:"林业有害生物防治监理汇总表",
            s:{
                alignment: {
                    horizontal: "center"
                }
            }
        },
        "A2":{
            v:"区县名称：",
            s:{
                alignment: {
                    horizontal: "left"
                }
            }
        },
        "D2":{
            v:"乡镇（林场名称）：",
            s:{
                alignment: {
                    horizontal: "left"
                }
            }
        }
    };
    let merges=[
        {s:{r:0,c:0},e:{r:0,c:10}},
        {s:{r:1,c:0},e:{r:1,c:2}},
        {s:{r:1,c:3},e:{r:1,c:5}}
    ];

    // 构建 workbook 对象
    //let exportData=initExport(list,regionList,stationList);
    let wb = {
        SheetNames: ['防治记录'],
        Sheets: {
            '防治记录': base.createExcel({
                head,
                startRow:3,
                columns,
                body:list,
                merges
            })
        }
    };
    return XLSX.write(wb, {type: 'buffer',bookType:"xls"});
}

module.exports={
    exportExcel
};