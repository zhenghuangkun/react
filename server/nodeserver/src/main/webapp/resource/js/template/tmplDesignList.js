/*****模板设计*******/


/****************************************
 * 页面初始化
 ****************************************/
$(function(){

    /*初始化*/
	init();
	
});

/**
 * 初始化页面事件
 */
function init(){
	//计算总页数
	var totalPages = Math.ceil(totalSize/perSize);
	
	if(keyword != "") {
		$('#keyword').val(keyword);
	}
	

	
	/*排序初始化*/
	$('#toggle-result-format .btn').each(function() {
		if($(this).find('input').val() == defalutSort){
			$(this).siblings().each(function() {
				$(this).removeClass("active");
				$(this).removeClass($(this).attr('data-class')).addClass('btn-grey');
			});
			$(this).addClass("active");
			$(this).removeClass('btn-grey').addClass($(this).attr('data-class'));
		}
	});
	
	/*搜索按钮点击事件*/
	$("#searchBtn").click(function(){
		var selectSort = $('#toggle-result-format .active').find('input').val();//获取排行
		location.href = contextPath + "/tmpldesign/list?sort=" + selectSort + "&keyword=" + $('#keyword').val(); 
	});
	
	//排行按钮事件
	$('#toggle-result-format .btn').on('click', function(e){
		var sortValue = $(this).find('input').val() ;
		loadPageData(sortValue,$('#keyword').val());
	});
	
	
   /*发布按钮点击事件*/
	$("a[name='releaseBtn']").click(function(){
		var tmplId = $(this).attr("data-ref");//获取模板ID
		layer.confirm('确定是否发布该模板?', {icon: 3, title:'提示'}, function(index){
			submit(tmplId, '/tmpldesign/releasetemplate');
			layer.close(index);
		});
	});
	
   /*编辑按钮点击事件*/
	$("a[name='editBtn']").click(function(){
		var tmplId = $(this).attr("data-ref");//获取模板ID
		var newTab = window.open('about:blank');
		newTab.location.href = contextPath + "/tmpldesign/edit?tmplId=" + tmplId;
	});
	
	
   /*删除按钮点击事件*/
	$("a[name='deleteBtn']").click(function(){
		var tmplId = $(this).attr("data-ref");//获取模板ID
		layer.confirm('确定是否删除该模板?', {icon: 3, title:'提示'}, function(index){
			submit(tmplId, '/tmpldesign/deltetemplate');
			layer.close(index);
		});
		
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
	    		var selectSort = $('#toggle-result-format .active').find('input').val();//获取排行
	    		currentPage = num;//设置当前页码
        		loadPageData(selectSort,$('#keyword').val());
	    	}
	    }
	});
	
}


/*加载分页数据*/
function loadPageData(sort, keyword){
	location.href = contextPath + "/tmpldesign/list?page=" + currentPage + "&sort=" + sort + "&keyword=" + keyword; 
}


/**
 * 模板操作提交
 * tmplId 模板ID
 * url 操作URL
 */
function submit(tmplId, url){
	//判断ID是否存在
	if(tmplId == null || tmplId == ""){
		return ;
	}
	//异步提交数据删除模板
	$.ajax({
		url : contextPath + url,
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplId),
		dataType: "json",
		success : function(result) {
			if(result.resultFlag == true){
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				},function(index){
					var selectSort = $('#toggle-result-format .active').find('input').val();//获取排行
					loadPageData(selectSort,$('#keyword').val());
				  	layer.close(index);
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示"
				});
			}
		}
	});
}
