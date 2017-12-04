/**
 * Created by tqj <2482366539@qq.com> on 2017/12/4.
 */
var allows=[
    '/api/validateUser',
    '/api/region'
];
module.exports = function(refer,url){
    if(~refer.indexOf(':8000')){
        return true;
    }else{

    }
}