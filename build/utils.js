"use strict";
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let runtime="local", publicPath, plugins;
let namespace = require('../package.json').name;

publicPath = `http://${getIpAddress()}:${process.env.PORT || 3000}/static/`;

// 获取本机ip，供其他人访问本机
function getIpAddress(){

    let os = require('os'), ip, ifaces=os.networkInterfaces();
    for (let key in ifaces) {
        ifaces[key].forEach((item)=>{
            if (!ip && item.family === 'IPv4' && typeof item.address==='string' && !~item.address.indexOf('127.0.0.1')) {
                ip=item.address;
            }
        });
    }
    return ip;
}

plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(runtime)
        }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 3
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),
    new ExtractTextPlugin({
        filename: runtime === 'local' ? '[name].css' : '[name].[contenthash:7].css'
    })
];

if(runtime === "local"){
    //plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
}

if(runtime === "product"){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}


module.exports = {
    entry: function (pattern) {
        // multiple entry
        let source = glob.sync(pattern);
        return source.reduce(function (acc, cur) {
            let dir = path.dirname(cur).split('/').splice(-1);
            //if (runtime === "local") {
                //acc[dir + '/' + path.basename(cur, '.js')] = [cur, 'webpack-hot-middleware/client'];
            //} else {
                acc[dir + '/' + path.basename(cur, '.js')] = cur;
            //}
            console.log(acc);
            return acc;
        }, {});
    },
    output: {
        path:path.resolve(__dirname, '../dist'),
        chunkFilename: runtime === 'local'? '[id].js': '[id].[chunkhash:7].js',
        filename: runtime === 'local'? '[name].js': '[name].[chunkhash:7].js',
        libraryTarget: 'umd',
        publicPath: publicPath,
    },
    devtool: runtime !== 'product' && '#cheap-module-eval-source-map',
    plugins: plugins,
    vueRuntimeByEnv: runtime === 'local' ? "dist/vue.runtime.js" : "dist/vue.runtime.min.js"
}