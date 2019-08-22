'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
const config = require('../webpack.config');

var args = process.argv.splice(2);
var port = 8080;
args.forEach(function (val, index, array) {
	
	//console.log(index+': ' + val);

	if(val.indexOf("port") >= 0){
		port = parseInt(val.split("=")[1]);
		//console.log('port: ' + port);
		return true;
	}
});

// 初次编译flag
var isInitialCompiler = true;

// 打包配置文件
var compiler  =  webpack(config);

new WebpackDevServer(compiler, config.devServer)
.listen(port, config.devServer.host, function(err, result) {
	if (err) {
	  console.log(err);
	}
	console.log('Listening at localhost:'+port);
	console.log('webpackDevServer start success...');
	//open("http://localhost:" + port);
});

// 打包完成输出log
compiler.plugin('done', () =>{
	if(isInitialCompiler){
		setTimeout(() =>{
			console.log('\n/ The bundle is now ready for serving!\n');
			console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + port + '/webpack-dev-server/');
			console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + port + '/\n');
			console.log('  \x1b[33mHMR is active\x1b[0m, The bundle will automatcally rebuild and live-update on changes.');
		}, 350);
	}

	isInitialCompiler = false;
});