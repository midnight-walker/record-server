/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        picture: "",
        longitude: "",
        latitude: "",
        description: "",
        quantity:0,
        recordTypeId: 0,
        supervisorId: '',
        projectId: 1,
        status:0,
        reason:''
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}