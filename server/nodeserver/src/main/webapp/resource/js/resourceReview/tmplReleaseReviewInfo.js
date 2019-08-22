/*****模板审核*******/

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
	
	
});

/**
 * 初始化
 */
function init(){
	/*同意按钮点击事件*/
	$("#pass").click(function() {
		/*去除空校验*/
		$("#tmplReviewForm").bootstrapValidator('removeField','reviewContent');
		$("#tmplReviewForm").bootstrapValidator("addField", "reviewContent", {    
            validators: {  
				stringLength: {
					min: 0,
					max: 500,
					message: "意见限制500字"
				}   
            }    
        });
		var formValidator = $('#tmplReviewForm').data("bootstrapValidator");
		formValidator.validate();//手动触发验证
		//是否校验成功
		if(formValidator.isValid()){
			layer.confirm('确定是否同意使用?', {icon: 3, title:'提示'}, function(index){
				reviewSubmit($("#pass").attr('data-opt'));
				layer.close(index);
			});
		}
		
	});
	/*拒绝按钮点击事件*/
	$("#refuse").click(function() {
		/*添加校验*/
		$("#tmplReviewForm").bootstrapValidator('removeField','reviewContent');
		$("#tmplReviewForm").bootstrapValidator("addField", "reviewContent", {    
            validators: {
            	notEmpty: {
					message:"请填写审核意见"
				},    
				stringLength: {
					min: 0,
					max: 500,
					message: "意见限制500字"
				}   
            }    
        });
		var formValidator = $('#tmplReviewForm').data("bootstrapValidator");
		formValidator.validate();//手动触发验证
		//是否校验成功
		if(formValidator.isValid()){
			layer.confirm('确定是否拒绝使用?', {icon: 3, title:'提示'}, function(index){
				reviewSubmit($("#refuse").attr('data-opt'));
				layer.close(index);
			});
		}
		
	});
}

/**
 * 审核提交
 */
function reviewSubmit(operation){
	var tmplReview = {
		"tmplId" : $('#tmplId').val(),//模板ID
		"operation" : operation,//操作
		"remark" : $('#reviewContent').val()//意见
	};
	$.ajax({
		url : contextPath + "/tmplreview/releaseReview",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplReview),
		traditional: true,//后台接收数组
		success : function(result) {
			if (result.resultFlag) {
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				},function(index){
					location.href = contextPath + "/tmplreview/list/tmplReleaseReviewList";
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
}




/**
 * 初始化表单验证控件
 */
function initValidator(){
	/*审核表单验证初始化*/
	$('#tmplReviewForm').bootstrapValidator({
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
			reviewContent: {
				validators: {
					notEmpty: {
						message:"请填写审核意见"
					},
					stringLength: {
						min: 0,
						max: 500,
						message: "意见限制500字"
					}
				}
			}
		}
	});	
}

