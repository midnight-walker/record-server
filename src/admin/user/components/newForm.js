/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        username:'',
        password:'',
        wxname:'',
        phone:'',
        groupid:0
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}