const utils = require('./utils')
const CopyWebpackExternalsManifest = require('copy-webpack-externals-manifest')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: utils.entry("./src/**/index.js"),
    output: utils.output,
    plugins: [
        ...utils.plugins,
        new CopyWebpackExternalsManifest({
            externals: [{
                module: "lodash",
                entry: ["lodash.min.js"],
                export: {
                    root: "_",
                    commonjs2: 'lodash'
                }
            }, {
                module: "jquery",
                entry: ["dist/jquery.min.js"],
                export: {
                    root: "$",
                    commonjs2: 'jquery'
                }
            }, {
                module: "moment",
                entry: ["min/moment.min.js"],
                export: {
                    root: "moment",
                    commonjs2: 'moment'
                }
            }, {
                module: "vue",
                entry: [utils.vueRuntimeByEnv],
                export: {
                    root: "Vue",
                    commonjs2: 'vue'
                }
            }, {
                module: "element-ui",
                entry: ["lib/index.js", "lib/theme-chalk/index.css"],
                export: {
                    root: "ELEMENT",
                    commonjs2: 'element-ui'
                },
                assets: ["lib/theme-chalk/fonts"]
            }, {
                module: "vue-echarts",
                entry: ["dist/vue-echarts.js"],
                export: {
                    root: "VueECharts",
                    commonjs2: 'vue-echarts'
                }
            }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            use: 'css-loader!less-loader',
                            fallback: 'vue-style-loader'
                        })
                    },
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 5 versions']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [["vue-app", {"useBuiltIns": true}]]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg|woff|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    }
}
