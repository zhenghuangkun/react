'use strict';

let path = require('path');
let defaultSettings = require('./defaults');
let additionalPaths = [];

module.exports = {
	// additionalPaths: additionalPaths,

	devtool: 'eval',

	// 	/*webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。*/
	devServer: {
        //port: 8080,
        contentBase: './src/',

        historyApiFallback: true,
		
		/* host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。 */
		//host: '0.0.0.0',

		hot: true,

		noInfo: false
	},

	resolve: {
		extensions: ['.js', '.jsx'],
        alias: {
            pages: path.join(__dirname, 'src/PAGES'),
            //component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
			//redux: path.join(__dirname, 'src/redux')
			actions : path.join(__dirname, 'src/redux/actions'),
			// 添加style相对路径
			stylehome: path.join(__dirname, 'src/Resource/Style'),

			
			config: '${defaultSettings.srcPath}/config/config.js',
			i18n: '${defaultSettings.srcPath}/i18n/index.js',
        }
    },
}