/*****我的模板*******/

/****************************************
 * 页面初始化
 ****************************************/
$(function(){

	init();
	
    /*初始化星级评分插件*/
	initRaty();
	
});


/**
 * 初始化
 */
function init(){
	/*搜索按钮点击事件*/
	$("#searchBtn").click(function(){
		location.href = contextPath + "/template/index?keyword=" + $('#keyword').val(); 
	});
}


/**
 * 初始化星级评分插件
 */
function initRaty(){
	// 找到raty的div
	$("div.raty").each(function() {
	
	    // 初始化raty
	    $(this).raty({
	        // 设置值
	        score : function() {
	        	return $(this).attr('data-score');
	        },
	        noRatedMsg : "",
	        half: true,
	        // 由Raty生成的隐藏字段的名称。
	        readOnly : true
	    });
	});
	
}
