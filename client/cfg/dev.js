
'use strict';

const os = require('os');

/**
 * 由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
 * 我们需要Webpack 能同一时间处理多个任务，发挥多核 CPU 电脑的威力，HappyPack  就能让 Webpack 做到这点，
 * 它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
 * 
 */
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//const MyPlugin = require('./indexHtmlPlugin');

const BowerWebpackPlugin = require('bower-webpack-plugin');

// 将所有可枚举属性的值从一个或多个源对象复制到目标对象,返回复制后的对象
// 将baseConfig，{...} 整合成新的对象
let config = Object.assign({}, baseConfig, {
    /*入口*/
    entry: [
		// 'react-hot-loader/patch', // 热修改的时候保存状态
        path.join(__dirname, '../src/index')
        // index: `${defaultSettings.srcPath}/index`,
        
	],
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, '/../dist/dev/'),
        chunkFilename : '[name].[chunkhash:8].chunk.js', // 按需加载输出的文件名
        filename: 'app.js',
		publicPath: defaultSettings.pubilcPath
    },

    

    devtool: 'eval',
    module: defaultSettings.getDefaultModules(),
    // module: {
    //     loaders: [
    //     			{
    //     				test: /\.js[x]?$/,
    //     				use: ['babel-loader?cacheDirectory=true'],
    //     				include: path.join(__dirname, 'src')
    //     			},
    //     			/* 增加对css的支持 */
    //     			{
    //     				test: /\.css$/,
    //     				use: ['style-loader', 'css-loader']
    //                 },
    //                 { test: path.join(__dirname, 'es6'),
    //                     loader: 'babel-loader' }
    //     		]
    //     	},
    plugins:[
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.HotModuleReplacementPlugin(),
        // new BowerWebpackPlugin({
        //     searchResolveModulesDirectories: false
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new CopyWebpackPlugin([
            {from: `${defaultSettings.rootPath}/package.json`, to: "package.json"},
            {from: `${defaultSettings.srcPath}/Resource/Style/Home/home.css`, to: "./Resource/Style/Home/home.css"}
        ]),

        new HappyPack({
            
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,

        }),

        //配置jquery全局有效
        new webpack.ProvidePlugin({ 
            $:"jquery", 
            jQuery:"jquery", 
            jquery: "jquery",
            "window.jQuery":"jquery" 
        }),

        //new MyPlugin({env: 'env'})
    ],
    
});

// config.module.loaders.push({
//     test: /\.(js|jsx)$/,
//     loader: 'babel',
//     include: [].concat(
//         config.additionalPaths,
//         [path.join(__dirname, '/../src')]
//     )
// });

module.exports = config;