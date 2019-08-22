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
	
	var totalPages = Math.ceil(totalSize/perSize);//计算总页数
	//设置关键词
	if(keyword != "") {
		$('#keyword').val(keyword);
	}
	
	/*搜索按钮点击事件*/
	$("#searchBtn").click(function(){
		location.href = contextPath + "/template/collection?keyword=" + $('#keyword').val(); 
	});
	
	//判断是否有数据
	if (totalSize < 1) {
		return;
	}
	
	/*分页初始化*/
	$('#pagination').jqPaginator({
	    totalPages: totalPages,
	    currentPage: currentPage,
        first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
        prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页<\/a><\/li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
	    onPageChange: function (num) {
	    	if(num != currentPage){
	    		currentPage = num;//设置当前页码
        		loadPageData($('#keyword').val());
	    	}
	    }
	});
}

/*加载分页数据*/
function loadPageData(keyword){
	location.href = contextPath + "/template/collection?page=" + currentPage  + "&keyword=" + keyword; 
}

/**
 * 初始化星级评分插件
 */
function initRaty(){	// 找到raty的div
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
