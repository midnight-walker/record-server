/**
 * Created by tqj <2482366539@qq.com> on 2019/2/20.
 */

let baseExcel = require('../../components/script/base');
let {defaultHeadStyle,defaultBodyStyle,defaultTitleStyle,defaultInfoStyle,defaultLeftTitleStyle,highlightStyle} = require('../../../utils/export/base/style');
let excelHelper={
    totalData:(data,titleName)=>{
        if(data.length<1){
            return;
        }
        let baseData=data,Sheets={},titles=[];
        let head={
            "A1":{
                v:titleName,
                s:defaultTitleStyle
            },
            "A5":{
                v:"监理点编号",
                s:defaultHeadStyle
            },
            "B5":{
                v:"社居委林班",
                s:defaultHeadStyle
            },
            "C5":{
                v:"组",
                s:defaultHeadStyle
            },
            "D5":{
                v:"小班号",
                s:defaultHeadStyle
            },
            "E5":{
                v:"小地名",
                s:defaultHeadStyle
            },
            "F5":{
                v:"面积",
                s:defaultHeadStyle
            }
        };
        let columns=[
            {
                prop:"id",
                label:"监理点编号",
                width:"80",
                headStyle:defaultHeadStyle
            },
            {
                prop: "village",
                label: "社居委林班",
                width: "80",
                headStyle:defaultHeadStyle
            },
            {
                prop: "group",
                label: "组",
                width: "40",
                headStyle:defaultHeadStyle
            },
            {
                prop: "smallClass",
                label: "小班号",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "placeName",
                label: "小地名",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "smallClassArea",
                label: "面积（亩）",
                width: "80",
                headStyle: defaultHeadStyle
            }
        ];
        let mergeEnd=12;
        let merges=[
            {s:{r:0,c:0},e:{r:2,c:mergeEnd}},
            {s:{r:3,c:0},e:{r:3,c:mergeEnd}},
            {s:{r:4,c:0},e:{r:5,c:0}},
            {s:{r:4,c:1},e:{r:5,c:1}},
            {s:{r:4,c:2},e:{r:5,c:2}},
            {s:{r:4,c:3},e:{r:5,c:3}},
            {s:{r:4,c:4},e:{r:5,c:4}},
            {s:{r:4,c:5},e:{r:5,c:5}}
        ];
        for(let j=0;j<7;j++){
            head[baseExcel.getColumnChar(j+6)+'5']={
                v:'监理评分',
                s:defaultHeadStyle
            };
        }
        merges.push({
            s:{r:4,c:6},e:{r:4,c:12}
        });
        columns=columns.concat([
            {
                prop:'startTime',
                label:"监理时间",
                width:"90",
                headStyle:defaultHeadStyle
            },
            {
                prop:'visited',
                label:"除治完成",
                width:"70",
                headStyle:defaultHeadStyle
            },
            {
                prop:'workQuality',
                label:"监理得分",
                width:"70",
                headStyle:defaultHeadStyle,
                highlightStyle
            },
            {
                prop:'pass',
                label:"是否合格",
                width:"70",
                headStyle:defaultHeadStyle,
                highlightStyle
            },
            {
                prop:'change',
                label:"是否整改",
                width:"70",
                headStyle:defaultHeadStyle,
                highlightStyle
            },
            {
                prop:'isEnd',
                label:"是否验收",
                width:"70",
                headStyle:defaultHeadStyle,
                highlightStyle
            },
            {
                prop:'mark',
                label:"备注",
                width:"70",
                headStyle:defaultHeadStyle
            }
        ])
        baseData.forEach((stations)=>{
            let list=[],title,stationTitle;
            stations.forEach((detail)=>{
                let item={};
                title=detail.station;
                stationTitle='乡镇（街道）林场：' + detail.station;
                item.id=detail.id;
                item.village=detail.village;
                item.group=detail.group;
                item.smallClass=detail.smallClass;
                item.placeName=detail.placeName;
                item.smallClassArea=detail.smallClassArea;
                item.workQuality=detail.workQuality;
                item.startTime=detail.startTime
                detail.visited=detail.step>0;
                if(detail.visited){
                    item.pass=detail.workQuality>=90?"是":"否";
                    item.passhighlight=item.workQualityhighlight=detail.workQuality<90;
                }else{
                    item.pass="";
                }
                if(detail.visited&&item.pass==="否"){
                    item.change=detail.step>2?"是":"否";
                }else{
                    item.change="";
                }
                if(detail.visited&&detail.step>2){
                    item.isEnd=detail.step>3?"是":"否";
                }else{
                    item.isEnd="";
                }

                item.mark="";
                item.visited=detail.visited?"是":"否";
                list.push(item);
            });

            titles.push(title);

            Sheets[title]=baseExcel.createExcel({
                head:Object.assign({},head,{
                    "A4":{
                            v:stationTitle,
                            s:defaultLeftTitleStyle
                    }
                }),
                columns,
                merges,
                body:list,
                startRow:6
            });
        });
        let wb = {
            SheetNames: titles,
            Sheets
        };
        return wb;
        /*return {
            head,
            columns,
            merges,
            body:data,
            startRow:3
        };*/
    }
}
module.exports=excelHelper;