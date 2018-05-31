const utils = require('./utils')
const CopyWebpackExternalsManifest = require('copy-webpack-externals-manifest')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: utils.entry("./src/**/**/index.js"),
    output: utils.output,
    plugins: [
        ...utils.plugins,
        new CopyWebpackExternalsManifest({
            externals: []
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
