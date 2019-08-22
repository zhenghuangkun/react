/*****个人模板查看*******/


/****************************************
 * 页面初始化
 ****************************************/
$(function(){
	
	/*初始化星级评价插件*/
	initRaty();
	
	/*初始化分页插件*/
	initPaginator();
	
});




/**
 * 初始化星级评分插件
 */
function initRaty(){
	// 找到raty的div
	$("div.raty.read").each(function() {
	    // 初始化raty
	    $(this).raty({
	        // 设置值
	        noRatedMsg : "",
	        half: true,
	        readOnly : true,
			score : function(){
	    		return $(this).attr('data-score');
	    	}
	    });
	});
	
	$('#rating').raty({
		cancel : false,
		half: false,
		numberMax : 5,
		noRatedMsg : "",
		starType : 'i',
		click: function(score, evt) {
		    return $(this).attr('data-score',score);
	    }
	})	
	
}


/**
 * 初始化分页控件
 */
function initPaginator(){
	//计算总页数
	var totalPages = Math.ceil(totalSize/perSize);
	
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
	    		currentPage = num;
	    		loadCommentData(num);
	    	}
	    }
	});
}

/**
 * 加载评论分页内容
 */
function loadCommentData(page){
	var pageComment = {
		"page" : page,
		"tmplId" : $('#tmplId').val()
	};
	
	$.ajax({
		url : contextPath + "/template/listcomment",
		type : 'POST',
		data : pageComment,
		dataType: "json", //后台处理后返回的数据格式
		success : function(result) {
			$('#tmplCommentData').empty();
			for(i = 0,len=result.data.length; i < len; i++) {
   				var text = '<div class="profile-activity clearfix">' +
				       	 		'<div>';
				if (result.data[i].userImageUrl != null) {
					text += '<img class="pull-left" src="' + result.data[i].userImageUrl + '" />';
				} else {
					text += '<img class="pull-left" src="' + contextPath + '/resource/assets/avatars/avatar5.png' + '" />'
				}
				text +=  '<a class="user">' + result.data[i].userRealName  + '</a><br/>' + 
				       		'<div>' + result.data[i].content + '</div>' + 
				       		'<div class="time"><i class="ace-icon fa fa-clock-o bigger-110"></i>' + result.data[i].commentTime + '</div>' +
			       		'</div>' + 
		        		'<div class="tools action-buttons">' +
		        		  	'<a id="deleteComment" data-commentId="' + result.data[i].commentId + '" class="blue" role="button">' +
								'<i class="ace-icon fa fa-trash-o bigger-125"></i>删除' + 
							'</a>' +
		         		'</div>' +
	        		'</div>';
				$('#tmplCommentData').append(text);
			}
		}
	});
}