/**
 * Created by tangqiaojie <2482366539@qq.com> on 2017/8/12 0012
 */

let _ = require('lodash');
let createPdfBinary = require('./base/base');

function getTitle() {
    return {
        text: "彭水县松材线虫病林间除治检查小班评分表",
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, 10]
    }
}

function getTable(data) {
    let result = {
        style: 'tableExample',
        table: {
            widths: [130, '*', 80, 80],
            body: [
                [
                    {
                        text: '摘要',
                        margin: [0, 7, 0, 7],
                        bold: true,
                        alignment: "center"
                    },
                    {
                        text: '会计科目',
                        margin: [0, 7, 0, 7],
                        bold: true,
                        alignment: "center"
                    },
                    {
                        text: '借方',
                        margin: [0, 7, 0, 7],
                        bold: true,
                        alignment: "center"
                    },
                    {
                        text: '贷方',
                        margin: [0, 7, 0, 7],
                        bold: true,
                        alignment: "center"
                    }
                ]
            ]
        }
    };
    data.voucherDetails.forEach(item => {
        result.table.body.push(getVoucherItem(item));
    });
    result.table.body.push([
        {
            text: '合计:' + data.totalText,
            colSpan: 2,
            fontSize: 10,
            margin: [0, 13, 0, 13]
        },
        {},
        {
            text: data.debitCount,
            fontSize: 10,
            alignment: "right",
            margin: [0, 13, 0, 13]
        },
        {
            text: data.creditCount,
            fontSize: 10,
            alignment: "right",
            margin: [0, 13, 0, 13]
        }
    ]);
    return result;
}

function getScoreItem(item) {
    return [
        {
            text: item.detailRemark || ' ',
            fontSize: 10,
            margin: [0, 3, 0, 3]
        },
        {
            text: item.currencyAmount + '    ' + item.currencyName,
            fontSize: 10,
            alignment: "right",
            margin: [0, 2, 0, 2]
        },
        {
            text: item.debitAmount || ' ',
            fontSize: 10,
            alignment: "right",
            margin: [0, 13, 0, 13]
        },
        {
            text: item.creditAmount || ' ',
            fontSize: 10,
            alignment: "right",
            margin: [0, 13, 0, 13]
        }
    ]
}

function printHelper(data) {
    let result = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [40, 20, 40, 0],
        defaultStyle: {
            font: 'st'
        },
        content: []
    };


    result.content.push(getTitle());
    result.content.push(getTable(data));
    return result;
}

module.exports = function (list, opt, callback) {
    createPdfBinary(printHelper(list, opt), (binary) => {
        callback(binary);
    });
};
