/**
 * Created by tqj <2482366539@qq.com> on 2017/9/20.
 */

const XLSX = require('xlsx-style');
const {defaultHeadStyle, defaultBodyStyle} = require('./style');

//用于处理超过Z列的数据
let getColumnChar = function (num) {
    let secondNum = num % 26,
        firstNum = parseInt(num / 26),
        result = '';
    if (firstNum > 0) {
        result += String.fromCharCode(65 + (firstNum - 1));
    }
    result += String.fromCharCode(65 + secondNum);
    return result;
};

function createExcel({head = {}, startRow = 1, columns, body, footer = {}, merges = [], sheetName = 'mySheet'}) {

    let colWidth = [];
    let headers = columns.map((item, idx) => {
        if (item.width) {
            colWidth.push({
                wpx: item.width
            })
        }
        return Object.assign({}, {
            v: item.label,
            s: Object.assign({}, defaultHeadStyle, item.headStyle || {}),
            position: getColumnChar(idx) + startRow
        })
    }).reduce((prev, next) => {
        return Object.assign({}, prev, {
            [next.position]: {
                v: next.v,
                s: next.s
            }
        })
    }, {});

    let data;
    //用于容错后端数据缺失，body内没有数据
    if (body) {
        data = body
            .map((v, i) => columns.map((k, j) => {
                    let value=v[k['prop']];
                    if(!value && value!==0){
                        value='';
                    }
                    return Object.assign({}, {
                        v: value,
                        s: Object.assign({}, defaultBodyStyle, k.bodyStyle || {},v['highlight']?k.highlightStyle:{}),
                        position: getColumnChar(j) + (i + 1 + startRow)
                    })
                }
            ))
            .reduce((prev, next) => prev.concat(next))
            .reduce((prev, next) => {
                return Object.assign({}, prev, {
                    [next.position]: {
                        v: next.v,
                        s: next.s
                    }
                })
            }, {});
    } else {
        data = {};
    }

    // 合并 headers 和 data
    var output = Object.assign({}, head, headers, data, footer);
    // 获取所有单元格的位置
    var outputPos = Object.keys(output);
    // 计算出范围
    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    return Object.assign({}, output, {'!ref': ref}, {'!cols': colWidth}, {'!merges': merges});

}
module.exports = {
    createExcel
}
