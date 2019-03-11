/**
 * Created by tqj <2482366539@qq.com> on 2019/2/20.
 */

let baseExcel = require('../../components/script/base');
let {defaultHeadStyle,defaultBodyStyle,defaultTitleStyle,defaultInfoStyle,defaultLeftTitleStyle,highlightStyle} = require('../../../utils/export/base/style');
let excelHelper={
    transferData:(data)=>{
        let columns=[
            {
                prop:"id",
                label:"监理点编号",
                width:"70",
                headStyle:defaultHeadStyle
            },
            {
                prop: "region",
                label: "区县",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "station",
                label: "林场",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "village",
                label: "村（管护站）",
                width: "80",
                headStyle: defaultHeadStyle
            },
            {
                prop: "group",
                label: "（社、林班）号",
                width: "100",
                headStyle: defaultHeadStyle
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
                label: "小班面积",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "visitTime",
                label: "监理时间",
                width: "100",
                headStyle: defaultHeadStyle
            },
            {
                prop: "visited",
                label: "除治完成",
                width: "60",
                headStyle: defaultHeadStyle
            },
            {
                prop: "score",
                label: "扣分合计",
                width: "60",
                headStyle: defaultHeadStyle
            }
        ];
        let head={};
        let merges=[];
        return {
            head,
            columns,
            merges,
            body:data,
            startRow:1
        };
    },
    totalData:(data,titleName)=>{
        if(data.length<1){
            return;
        }
        console.log(data);
        let baseData=data[0],Sheets={},titles=[];
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
        let mergeEnd=6+6*data.length-1;
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
        for(let i=1;i<=data.length;i++){
            for(let j=0;j<6;j++){
                head[baseExcel.getColumnChar(j+i*6)+'5']={
                    v:'第'+i+'次监理评分',
                    s:defaultHeadStyle
                };
            }
            merges.push({
                s:{r:4,c:i*6},e:{r:4,c:(i+1)*6-1}
            });
            columns=columns.concat([
                {
                    prop:'visitTime'+i,
                    label:"监理时间",
                    width:"90",
                    headStyle:defaultHeadStyle
                },
                {
                    prop:'visited'+i,
                    label:"除治完成",
                    width:"70",
                    headStyle:defaultHeadStyle
                },
                {
                    prop:'score'+i,
                    label:"监理得分",
                    width:"70",
                    headStyle:defaultHeadStyle,
                    highlightStyle
                },
                {
                    prop:'pass'+i,
                    label:"是否合格",
                    width:"70",
                    headStyle:defaultHeadStyle
                },
                {
                    prop:'change'+i,
                    label:"是否整改",
                    width:"70",
                    headStyle:defaultHeadStyle
                },
                {
                    prop:'mark'+i,
                    label:"备注",
                    width:"70",
                    headStyle:defaultHeadStyle
                }
            ])
        }
        baseData.forEach((stations,stationIndex)=>{
            let list=[],title,stationTitle;
            stations.forEach((detail,detailIndex)=>{
                let item={};
                title=detail.station;
                stationTitle='乡镇（街道）林场：' + detail.station;
                item.id=detail.supervisorId;
                item.village=detail.village;
                item.group=detail.group;
                item.smallClass=detail.smallClass;
                item.placeName=detail.placeName;
                item.smallClassArea=detail.smallClassArea;
                for(let i=1;i<=data.length;i++){
                    let detailTime=data[i-1][stationIndex][detailIndex];
                    item['visitTime'+i]=detailTime.visitTime;
                    item['visited'+i]=detailTime.visited;
                    if(item['visitTime'+i]){
                        let realScore=100-detailTime.score;
                        item['score'+i]=realScore;
                        item['pass'+i]=realScore>=90?'合格':'不合格';
                        if(realScore<90){
                            item['score'+i+'highlight'] = true;
                        }
                        if(i>1){
                            item['change'+i]= realScore>=90?'是':'否';
                        }
                    }
                }
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