/**
 * Created by tqj <2482366539@qq.com> on 2017/12/29.
 */
module.exports=(obj)=>{
    let result={
        regionId: 0,
        stationId: 0,
        village: "",
        group: "",
        smallClass: "",
        placeName: "",
        smallClassArea: "",
        treeCompose: "",
        targetName: "",
        time: moment().format('YYYY-MM-DD'),
        workGroup: "",
        fcXianyan: 0,
        fcXixiao: 0,
        fcGaodudayuwu: 0,
        fcChanzhe: 0,
        fcFugai: 0,
        fcFengzhe: 0,
        fcHuoshao: 0,
        fcXuanya: 0,
        fcXuangua: 0,
        fcHuoshukuzhi: 0,
        fcTotal: 0,
        jcFcFengzhe: 0,
        jcFcSongshu: 0,
        jcFcSongmu: 0,
        jcFcSongzhi: 0,
        jcFcShaotou: 0,
        jcFcTotal: 0,
        jcYcCaogai: 0,
        jcYcKuye: 0,
        jcYcTurang: 0,
        jcYcTengman: 0,
        jcYcDigou: 0,
        jcYcDongxue: 0,
        jcYcTotal: 0,
        fsSongzhi: 0,
        fsSongmu: 0,
        fsSongcai: 0,
        fzFazhuang: 0,
        fzBopi: 0,
        fzJiahao: 0,
        fzTouyao: 0,
        fzShuliao: 0,
        fzNitu: 0,
        fzTotal: 0,
        fzNumber: 0
    };
    if(obj){
        Object.assign(result,obj);
    }
    return result;
}