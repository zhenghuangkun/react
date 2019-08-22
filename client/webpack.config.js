const path = require('path');
const webpack = require('webpack');
const conf = require('./src/CONF/conf');

module.exports = {
 
    /*入口*/
    entry: [
		'react-hot-loader/patch', // 热修改的时候保存状态
		path.join(__dirname, 'src/index.js')
	],
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        // path: path.join(__dirname, 'dist'),
		// filename: 'app.js',
		path: path.join(__dirname, '/../dist/dev/'),
        chunkFilename : '[name].[chunkhash:8].chunk.js', // 按需加载输出的文件名
        filename: 'app.js',
		//chunkFilename : '[name]-chunk.js', // 按需加载输出的文件名
		// publicPath:'/js/',
		// filename: '[name].js',
		// chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
	
	/*src文件夹下面的以.js结尾的文件，要使用babel解析*/
	/*cacheDirectory是用来缓存编译结果，下次编译加速*/
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, 'src')
			},
			/* 增加对css的支持 */
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader?importLoaders=1'],
				/* include: path.join(__dirname, '/node_modules/semantic-ui-css/') */
			},
			/* 增加对图片的支持 */
			{
				test: /\.(png|jpg|gif|woff|woff2|eot|svg|ttf)$/,
				use: 'url-loader?limit=8192'
			},
			/* 增加对视频的支持 */
			{
				test: /\.(mp4|ogg|svg)$/,
				use: 'file-loader'
			},
			
		]
	},
	
	/* webpack提供了一个别名配置，就是我们无论在哪个路径下，引用都可以这样
		import Login from 'pages/GH001Rui001/Login';
	*/ 
	resolve: {
        alias: {
            pages: path.join(__dirname, 'src/PAGES'),
			mvchome: path.join(__dirname, 'src/COMMON/MVC'),
			componenthome: path.join(__dirname, 'src/COMMON/COM/Component'),
            router: path.join(__dirname, 'src/router'),
			//redux: path.join(__dirname, 'src/redux')
			actions : path.join(__dirname, 'src/redux/actions'),
			// 添加style相对路径
			stylehome: path.join(__dirname, 'src/Resource/Style'),
			// 添加image相对路径
			imagehome: path.join(__dirname, 'src/Resource/image'),
			MOCKPATH: path.join(__dirname, 'src/MOCK'),
			AUTOPATH: path.join(__dirname, 'src/AUTO'),
			semanticuiCSS: path.join(__dirname, "node_modules/semantic-ui-css"),
        }
    },
	
	//配置jquery全局有效，单独使用: var $=require('jquery')
	plugins: [
		// 会自动加载模块
		new webpack.ProvidePlugin({ 
		  $:"jquery", 
		  jQuery:"jquery", 
		  jquery: "jquery",
		  "window.jQuery":"jquery" 
		})
	],
	/*webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。*/
	devServer: {
        port: conf.PORT,
        contentBase: path.join(__dirname, 'src'),
		/*
			historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行
			npm run start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，
			然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
			historyApiFallback，让所有的404定位到index.html。
		*/
        historyApiFallback: true,
		
		/* host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。 */
		host: conf.HOSTADDR,
		

		hot: true,

		quiet:false, //设置为true时，第二次编译不输出log

		compress: false, // 不压缩 
		
		proxy: {
			'/api': {
			  target: 'http://localhost:8080/awslabplatform-admin/',
			  secure: false
			}
		},
		// proxy: {
		// 	"/api": {
		// 	  "target": "http://localhost:8080/awslabplatform-admin/",
		// 	  "changeOrigin":true
		// 	}
		//   },
		overlay: true, // 编译错误时，浏览器也可以看到错误信息
		stats: { colors: true, progress: true } // state:"errors-only" 只输出错误信息
	},
	
	//devtool: 'inline-source-map'
	devtool: 'eval-source-map'
};



// 方式二
// 'use strict';
// const path = require('path');
// // minimist命令行参数解析工具
// const args = require('minimist')(process.argv.slice(2));

// const allowedEnvs = ["dev", "dist", "test"]
// console.log(args);
// let env;
// if(args._.length > 0 && args._.indexOf('start') !== -1){
// 	env = 'test';
// } else if(args.env) {
// 	env = args.env;
// } else {
// 	env = "dev";
// }

// console.log("process.env.REACT_WEBPACK_ENV:", process.env.REACT_WEBPACK_ENV);
// console.log("env:", env);
// process.env.REACT_WEBPACK_ENV = env;

// function buildConfig(wantedEnv) {
// 	console.log("wantedEnv", wantedEnv);
// 	let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
// 	let vaildEnv = isValid ? wantedEnv : 'dev';
// 	let config = require(path.join(__dirname, 'cfg/' + vaildEnv));
// 	return config;
// }

// module.exports = buildConfig(env);