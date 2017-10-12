"use strict";
// node 模块
const path = require('path');

// 依赖模块
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 全局变量
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: {
        supportArea: path.resolve(APP_PATH, 'js/supportArea.js')
    },
    output: {
        path: BUILD_PATH,
        publicPath:'/w/tidl/serve/dist/',
        filename: 'js/[name].min.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            public: path.resolve(APP_PATH, 'public'),
            scss: path.resolve(APP_PATH, 'scss'),
            img: path.resolve(APP_PATH, 'img')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        },{
            test: /\.(handlebars|hbs)$/,
            loader: "handlebars-loader",
            options: {
                runtime: 'handlebars/dist/handlebars.runtime',
            }
        }, {
            test: /\.(htm|html)$/i,
            use: {
                loader: 'html-loader',
            }
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader","postcss-loader","sass-loader"]
            })
        }, {
            test: /\.(jpg?g|png|gif|svg)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: '2048',
                    name: 'img/[name].[ext]',
                    publicPath:'/w/tidl/serve/dist/'
                }
            }
        }]
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true, //不跳转
        hot: true,
        inline: true, //实时刷新
        stats: 'errors-only'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.(htm|html)$/i,
            options: {
                htmlLoader: {
                    ignoreCustomFragments: [/\{\{.*?}}/],
                    root: path.resolve(__dirname, 'img'),
                    attrs: [
                        'img:src',
                        'div:data-lazyload-src',
                        'ul:data-lazyload-src',
                        'li:data-lazyload-src',
                        'img:data-lazyload-src',
                    ],
                    minimize: false
                },
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: false,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(APP_PATH, `pages/supportArea.tpl.htm`),
            filename: `html/supportArea.tpl.htm`,
            chunks: ["supportArea"],
            inject: 'body',
            hash:true
        })

    ]
};
