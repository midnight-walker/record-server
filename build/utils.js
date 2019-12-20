/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */
"use strict";
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let runtime, publicPath, plugins;
let namespace = require('../package.json').name;

//根据编译环境变量，定义不同场景
runtime=process.env.NODE_ENV || 'local';
publicPath = `/static/`;

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
    /*new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 3
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),*/
    new ExtractTextPlugin({
        filename: runtime === 'local' ? '[name].css' : '[name].[contenthash:7].css'
    })
];

if(runtime === "local"){
    plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
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
            if (runtime === "local") {
                acc[dir + '/' + path.basename(cur, '.js')] = [cur, 'webpack-hot-middleware/client'];
            } else {
                acc[dir + '/' + path.basename(cur, '.js')] = cur;
            }
            return acc;
        }, {});
    },
    output: {
        path: path.resolve(__dirname, '../static') ,
        chunkFilename: runtime === 'local'? '[id].js': '[id].[chunkhash:7].js',
        filename: runtime === 'local'? '[name].js': '[name].[chunkhash:7].js',
        libraryTarget: 'umd',
        publicPath: publicPath,
    },
    devtool: runtime !== 'product' && '#cheap-module-eval-source-map',
    plugins: plugins,
    vueRuntimeByEnv: runtime === 'local' ? "dist/vue.runtime.js" : "dist/vue.runtime.min.js"
}
