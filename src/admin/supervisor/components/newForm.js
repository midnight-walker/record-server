/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        region: '',
        station:'',
        village: "",
        group: "",
        smallClass: "",
        placeName: "",
        smallClassArea: "",
        treeCompose: "",
        targetName: "",
        startTime: "",
        endTime: "",
        projectId:"",
        workGroupId: "",
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}