/**
 * Created by tqj <2482366539@qq.com> on 2019/1/10.
 */
let tools = {
    downloadExl:(tmpWB)=> {
    let tmpDown = new Blob([tools.s2ab(XLSX.write(tmpWB,
        {bookType: 'xlsx',bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
    ))], {
        type: ""
    });
    tools.saveAs(tmpDown,'数据.xlsx');
    //创建二进制对象写入转换好的字节流
    /*var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hf").href = href; //绑定a标签
    document.getElementById("hf").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);*/
},
    s2ab: (s) => { //字符串转字符流
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    },
    saveAs:(obj, fileName)=> {
        let tmpa = document.createElement('a');
        tmpa.download = fileName || '下载';
        tmpa.href = URL.createObjectURL(obj);
        tmpa.click();
        setTimeout(function() {
            URL.revokeObjectURL(obj);
        }, 100);
    }
}
module.exports=tools;