/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */

let pageList = {};

// 资源表
let resourceMap;

resourceMap = require("../dist/manifest.json");


module.exports = function (pageName, model, ctx) {
    if(!resourceMap){
        return pageList[pageName] = "资源编译中，重启应用再试"
    }

    let linkList = "";
    let scriptList = "";

    if(resourceMap.externals){
        Object.keys(resourceMap.externals).forEach(function (item) {
            if(/(.css)/g.test(item)){
                linkList += `<link rel="stylesheet" href="${resourceMap.externals[item]}"/>`
            }
            if(/(.js)/g.test(item)){
                scriptList += `<script type="text/javascript" src="${resourceMap.externals[item]}"></script>`
            }
        })
    }

    Object.keys(resourceMap.chunks).forEach(function (item) {
        if(/(.css)/g.test(item)){
            if(/^[-\w]+?\/main.css$/g.test(item) && item !== pageName + "/main.css") {
                return;
            }
            linkList += `<link rel="stylesheet" href="${resourceMap.chunks[item]}"/>`
        }
        if(/(.js)/g.test(item)){
            if(/^[-\w]+?\/main.js$/g.test(item) && item !== pageName + "/main.js") {
                return;
            }
            scriptList += `<script type="text/javascript" src="${resourceMap.chunks[item]}"></script>`
        }
    })

    return pageList[pageName] = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="http://s.zbjimg.com/img/favicon.ico" type="image/x-icon">
    <title>管理后台</title>
    ${linkList}
    <script type="text/javascript">
        window.renderData = ${JSON.stringify(model)};
    </script>
    </head>
    <body>
    <div id="app"></div>
    ${scriptList}
    </body>
    </html>`;
};

