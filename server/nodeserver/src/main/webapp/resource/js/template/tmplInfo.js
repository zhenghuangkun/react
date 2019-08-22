/*****模板展示*******/


/****************************************
 * 页面初始化
 ****************************************/
$(function(){

    /*初始化*/
	init();
	
	/*初始化验证表单*/
	initValidator();
	
	/*初始化星级评价插件*/
	initRaty();
	
	/*初始化分页插件*/
	initPaginator();
	
	/*初始化spinner控件*/
	//initSpinner();
	
});

/**
 * 初始化页面事件
 */
function init(){
	
	//失去焦点时计算总价
	$("#useTimeLength").blur(function(){
		$('#totalPrice').text($('#useTimeLength').val() * price);
	});
	
	/*收藏按钮点击事件*/
	$("#collection").click(function() {
		if ($(this).attr('data-ref') == '') {
			var url = "/template/collection";
			var removeClass = 'fa-heart-o';
			var addClass = 'fa-heart';
			var text = "取消收藏";
		} else {
			var url = "/template/collectioncanacel";
			var removeClass = 'fa-heart';
			var addClass = 'fa-heart-o';
			var text = "收藏";
		}
		collectionSubmit(url, this, removeClass, addClass, text);
	});
	
	/*测试申请按钮点击事件*/
	$("#applySubmit").click(function() {
		var formValidator = $('#applyForm').data("bootstrapValidator");
		formValidator.validate();//手动触发验证
		//是否校验成功
		if(formValidator.isValid()){
			applySubmit();
		}
		
	});
	
	/*发表评论按钮点击事件*/
	$("#comment").click(function() {
		var formValidator = $('#tmplCommentForm').data("bootstrapValidator");
		formValidator.validate();//手动触发验证
		//是否校验成功
		if(formValidator.isValid()){
			commentSubmit();
		}
		
	});
	
	/*删除评论按钮点击事件*/
	$("#deleteComment").click(function() {
		var commentId = $(this).attr('data-commentId');
		layer.confirm('确定是否删除评论?', {icon: 3, title:'提示'}, function(index){
			deleteComment(commentId);
		});
		
	});
	
}


/**
 * 添加到收藏
 */
function collectionSubmit(url, btn, removeClass, addClass, text){
	var tmplId= $('#tmplId').val();//获取模板ID
	
	$.ajax({
		url : contextPath + url,
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplId),
		traditional: true,//后台接收数组
		success : function(result) {
			if(!result.resultFlag){
				layer.alert(result.message, {
					icon: 5,
					title: "提示"
				});
			}else{
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				});
				$(btn).attr('data-ref', result.data);
				$(btn).empty().append('<i class="ace-icon fa ' + addClass + ' bigger-110"></i>' + text);
			}
		}
	}); 
}

/**
 * 测试申请
 */
function applySubmit(){
	var tmplApplyUse = {
		"tmplId" : $('#tmplId').val(),//模板ID
		"useTimeLength" : $('#useTimeLength').val(),//时长
		"remark" : $('#remark').val()//备注
	};
	
	$.ajax({
		url : contextPath + "/template/usingapply",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplApplyUse),
		traditional: true,//后台接收数组
		success : function(result) {
			if (result.resultFlag) {
				layer.alert(result.message, {
					icon: 1,
					title: "提示",
					closeBtn: false
				},function(index){
					location.href = contextPath + "/template/using";
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示",
					closeBtn: false
				},function(index){
					location.reload();
				});
			}
			
		}
	}); 
}

/**
 * 发表评论
 */
function commentSubmit(){
	var tmplId= $('#tmplId').val();//获取模板ID
	var tmplComment = {
		"tmplId" : $('#tmplId').val(),
		"content" : $('#content').val(),
		"stars" : $('#rating').attr("data-score")
	};
	
	$.ajax({
		url : contextPath + "/template/addcomment",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplComment),
		traditional: true,//后台接收数组
		success : function(result) {
			if (result.resultFlag) {
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				},function(index){
					location.reload();
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示"
				},function(index){
					location.reload();
				});
			}
			
		}
	}); 
}

/**
 * 删除评论
 */
function deleteComment(commentId){
	$.ajax({
		url : contextPath + "/template/deletecomment",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(commentId),
		traditional: true,//后台接收数组
		success : function(result) {
			if (result.resultFlag) {
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				},function(index){
					location.reload();
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示"
				},function(index){
					location.reload();
				});
			}
			loadCommentData(currentPage);
		}
	});
}


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
 * 初始化Spinners控件
 */
function initSpinner(){
	$('#useTimeLength').ace_spinner({
		value:0,
		min:0,
		max:4320,
		step:60, 
		btn_up_class:'btn-info' , 
		btn_down_class:'btn-info'
	}).closest('.ace-spinner').on('changed.fu.spinbox', function(){
		$('#totalPrice').text($('#useTimeLength').val() * price);
	});
}



/**
 * 初始化表单验证控件
 */
function initValidator(){
	/*评论表单*/
	$('#tmplCommentForm').bootstrapValidator({
		excluded: [':disabled', ':hidden', ':not(:visible)'],//指定不验证情况
		feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
		},
		live: 'enabled',//生效规则，字段值有变化就触发验证
		message: '该值无效',
		submitButtons: 'button[type="button"]',//指定提交的按钮
        submitHandler: null,
		trigger: null,//为每个字段设置统一触发验证方式（也可在fields中为每个字段单独定义）
		fields: {
			content: {
				validators: {
					notEmpty: {
						message:"请输入评论内容后提交"
					},
					stringLength: {
						min: 0,
						max: 500,
						message: "评论限制500字"
					}
				}
			}
		}
	});	
	/*测试申请表单*/
	$('#applyForm').bootstrapValidator({
		excluded: [':disabled', ':hidden', ':not(:visible)'],//指定不验证情况
		feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
		},
		live: 'enabled',//生效规则，字段值有变化就触发验证
		message: '该值无效',
		submitButtons: 'button[type="button"]',//指定提交的按钮
        submitHandler: null,
		trigger: null,//为每个字段设置统一触发验证方式（也可在fields中为每个字段单独定义）
		fields: {
			useTimeLength : {
				validators: {
					notEmpty: {
						message:"请输入申请时长后提交"
					},
					stringLength: {
						min: 0,
						max: 50,
						message: "限制50字"
					},
					 regexp: {
			            regexp: "^[1-9][0-9]*$",
			            message: '申请时长必须为大于0的正整数'
			        }
				}
			},
			remark : {
				validators: {
					stringLength: {
						min: 0,
						max: 500,
						message: "限制500字"
					}
				}
			}
		}
	});
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