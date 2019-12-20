/**
 * Created by tqj <2482366539@qq.com> on 2017/8/8.
 */
// scan all models defined in models:
const fs = require('fs');
const db = require('./ovDb');
let path=require('path');
let filePath=path.join(__dirname,'models','ovModel');
let files = fs.readdirSync(filePath);

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};
let models={};
for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = models[name]= require(path.join(filePath,f));
}

module.exports.sync = () => {
    db.sync();
};