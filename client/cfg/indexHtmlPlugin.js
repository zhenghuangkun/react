/**
 * 在插入js资源只能插入head或者body元素中，不能一些插入head中，另一些插入body中
 * 不支持在html中文件内联*，例如在文件的某个地方用<script src="xxx.js?__inline"></script>来内联外部脚本
 * 这些事件是提供给其他插件使用的，用于改变html的内容。因此，要用这些事件需要提供一个webpack插件。例如下面定义的MyPlugin插件
 * 然后，在webpack.config.js文件中配置Myplugin信息：
 * plugins: [
 *  new MyPlugin({options: ''})
 * ]
 */


function MyPlugin(options){
    this.options = options;
}

MyPlugin.prototype.apply = function (compiler){
    var env = this.options.env;
    console.log(env);
    compiler.plugin('compilation', function(compilation, options){
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback){
            if(env && 'dist' == env){
                var regExp = new RegExp('http://knowledge.ebaotech.com', 'g');
                htmlPluginData.html = htmlPluginData.html.replace(regExp, '');
            }

            var html = htmlPluginData.html;
            var form = html.indexOf('<link href="style.css">');
            var to = html.indexOf('</head>');
            var bodyForm = html.indexOf('<body>');
            var htmlArray = [];
            htmlArray.push(html.slice(0, from));
            htmlArray.push('</head><body>');
            htmlArray.push(html.slice(form, to));
            htmlArray.push(html.slice(bodyForm, 6));
            htmlPluginData.html = htmlArray.join("");
            callback(null, htmlPluginData);
        });
    });
}

module.exports = MyPlugin;