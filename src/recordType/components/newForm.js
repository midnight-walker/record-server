/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        name:'',
        pid:0,
        level:1,
        description:''
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}