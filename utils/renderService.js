/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */

let pageList = {};

// 资源表
let resourceMap;



module.exports = function (ctx, pageName, model) {
    resourceMap = require("../static/manifest.json");

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
            if(/^[-\w]+?\/index.css$/g.test(item) && item !== pageName + "/index.css") {
                return;
            }
            linkList += `<link rel="stylesheet" href="${resourceMap.chunks[item]}"/>`
        }
        if(/(.js)/g.test(item)){
            if(/^[-\w]+?\/index.js$/g.test(item) && item !== pageName + "/index.js") {
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
    <title></title>
    ${linkList}
    <script type="text/javascript">
        //存放一些基本的页面信息
        window.renderData = ${JSON.stringify(model)};
    </script>
    </head>
    <body>
    <div id="app"></div>
    ${scriptList}
    <script type="text/javascript" src="//cdn.bootcss.com/xlsx/0.11.17/xlsx.full.min.js"></script>
    <script type="text/javascript" src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    </body>
    </html>`;
};

