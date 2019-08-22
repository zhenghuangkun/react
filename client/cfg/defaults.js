'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const cfgPath = path.join(__dirname, '/../cfg');
const rootPath = path.join(__dirname, '../');

// extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDefaultModules() {
	const buildModule = [];
	buildModule.push(srcPath);

	for(let key in require(rootPath + 'package.json')['dependencies']){
		buildModule.push(path.resolve(__dirname, '../node_modules/' + key));
	}

	return {
		rules: [
			{
				test: /\.js[x]?$/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, 'src')
			},
			/* 增加对css的支持 */
			
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.(png|jpg|gif|woff|woff2)$/,
				use: 'url-loader?limit=8192'
			},
			{
				test: /\.(mp4|ogg|svg)$/,
				use: 'file-loader'
			},
		]

	};
}


module.exports = {
	srcPath : srcPath,
	cfgPath: cfgPath,
	rootPath: rootPath,
	pubilcPath: '',
	getDefaultModules: getDefaultModules
}