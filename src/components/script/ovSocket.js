/**
 * Created by tqj <2482366539@qq.com> on 2019/11/28.
 */

let ovSocket={
    socket:{},
    init({callback=()=>{}}){
        this.socket = new WebSocket("ws://127.0.0.1:7699", "ws");
        this.socket.onopen = ()=> {
            console.log("Socket 已打开");
            var mm="E10ADC3949BA59ABBE56E057F20F883E";
            var msg="{\"md5psk\":\"E10ADC3949BA59AB\"}";
            try {
                var mJsom = JSON.parse(msg);
                this.socket.send(JSON.stringify({
                    cmdid:20000,
                    ret:0,
                    msg:mJsom
                }));
            } catch (err) {
                console.log(err);
            }
        };
        this.socket.onmessage = (msg)=> {
            console.log(msg);
            let data=JSON.parse(msg.data);
            callback(data)
        };
        //关闭事件
        this.socket.onclose = ()=> {
            console.log("Socket 已关闭");
        };
        //发生了错误事件
        this.socket.onerror = ()=> {
            console.log("发生了错误" + socket.readyState);
        };
        return this.socket;
    },
    getOvSupervisorDetail(ObjID){
        this.sendJson(20101,JSON.stringify({LatlngType:2,ObjID}))
    },
    getSmallClassDetail(ObjID){
        console.log(ObjID);
        this.sendJson(20101,JSON.stringify({LatlngType:2,ObjID}))
    },
    searchObj(params){
        let defaultOption={
            ParentID:0,
            SrhOpt:0,
            ObjType:0,
            idParent:0,
            idShapeSelect:0,
            NoChild:0,
            MaxCnt:0,
            SrhTxt:"",
            SrhValue:1
        };
        let opt=Object.assign({},defaultOption,params);
        console.log(opt);
        this.sendJson(20107,JSON.stringify(opt))
    },
    getObjList(params={}){
        this.sendJson(20100,JSON.stringify(params))
    },
    getFiles(params={}){
        this.sendJson(20100,JSON.stringify(params))
    },
    sendJson(cmdid,msg){
        try {
            var mJsom = JSON.parse(msg);
        } catch (err) {
            console.log(err);
            return;
        }
        try {
            this.socket.send(JSON.stringify({
                cmdid: cmdid,
                ret: 0,
                msg: mJsom
            }));
            console.log("send JSON OK");
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports=ovSocket;