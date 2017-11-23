/**
 * Created by tqj <2482366539@qq.com> on 2017/9/20.
 */
module.exports=function (data,req,res,fileName) {
    let userAgent = (req.headers['user-agent']||'').toLowerCase();
    if(userAgent.indexOf('edge') >= 0 && userAgent.indexOf('chrome') >= 0){
        res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'],["Content-Disposition",`attachment;filename=${encodeURIComponent(fileName)}`]]);
    } else if(userAgent.indexOf('chrome') >= 0){
        res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'],["Content-Disposition",`attachment;filename=${new Buffer(fileName).toString('binary')}`]]);
    } else if(userAgent.indexOf('firefox') >= 0) {
        res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'],["Content-Disposition",`attachment;filename*="utf8\'\'${new Buffer(fileName).toString('binary')}"`]]);
    } else {
        res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'],["Content-Disposition",`attachment;filename=${new Buffer(fileName).toString('binary')}`]]);
    }
    res.end(data);
};
