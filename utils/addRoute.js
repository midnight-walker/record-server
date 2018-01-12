/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */

const fs = require('fs');
function add(router,dir,list,p) {
    list.forEach(f=>{
        console.log(`process controller: ${f}...`);
        // 导入js文件:
        let mapping = require(dir + p + f);
        for (var url in mapping) {
            if (url.startsWith('GET ')) {
                // 如果url类似"GET xxx":
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                // 如果url类似"POST xxx":
                var path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else if (url.startsWith('DELETE ')) {
                // 如果url类似"POST xxx":
                var path = url.substring(7);
                router.delete(path, mapping[url]);
                console.log(`register URL mapping: DELETE ${path}`);
            }else if (url.startsWith('PATCH ')) {
                // 如果url类似"PATCH xxx":
                var path = url.substring(6);
                router.patch(path, mapping[url]);
                console.log(`register URL mapping: PATCH ${path}`);
            }else {
                // 无效的URL:
                console.log(`invalid URL: ${url}`);
            }
        }
    })
}

module.exports=function (router,dir) {
    // 先导入fs模块，然后用readdirSync列出文件
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
    var files = fs.readdirSync(dir + '/route');
    var apiFiles = fs.readdirSync(dir + '/route/api');
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });
    var js_apiFiles = apiFiles.filter((f)=>{
        return f.endsWith('.js');
    });
    add(router,dir,js_files,'/route/');
    add(router,dir,js_apiFiles,'/route/api/');
}