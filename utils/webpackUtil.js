/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */

let webpack = require("webpack");
let localConfig = require("../build/webpack.config");
let compiler = webpack(localConfig);
const PassThrough = require('stream').PassThrough;
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
let devMiddleware = () => {
    const middleware = webpackDevMiddleware(compiler, {
        publicPath: localConfig.output.publicPath,
        stats: {
            colors: true
        }
    })
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
};

let hotMiddleware = () => {
    const middleware = webpackHotMiddleware(compiler);
    return async (ctx, next) => {
        let stream = new PassThrough();
        if(~ctx.url.indexOf('static') || ~ctx.url.indexOf('webpack')){
            ctx.body = stream
        }
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
};

module.exports={
    devMiddleware,
    hotMiddleware
}