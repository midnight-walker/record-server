/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        regionId: '',
        stationId: '',
        village: "",
        group: "",
        smallClass: "",
        placeName: "",
        smallClassArea: "",
        treeCompose: "",
        targetName: "",
        time: moment().format('YYYY-MM-DD'),
        projectId:"",
        workGroupId: "",
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}