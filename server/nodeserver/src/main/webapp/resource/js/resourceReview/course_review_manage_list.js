/****课程信息js管理*******/

var courseReviewTb = "";
var checkStateFlag = 1; //0-显示所有课程      1-只显示已提交的课程，课程状态为已提交     2-显示审核过的课程，课程状态是未通过(4),已通过(5),已发布(6)

/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	
	$("#checkWait").css("font-size", "13px");
	/*课程列表初始化*/
	initCourseReviewTb();

	/* 初始化表单验证信息 */
	initFromValidator();
});

function initFromValidator(){
	//课程不同意验证
	$('#courseCheckInfoForm').bootstrapValidator({
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		//excluded:[":hidden",":disabled",":not(visible)"] ,//bootstrapValidator的默认配置
		fields: {
			description: {
				validators: {
					notEmpty: {
						message:"请填写不同意理由"
					},    
					stringLength: {
						min: 0,
						max: 500,
						message: "理由限制500字"
					}   
				}
			}
		}
	});
}

/****************************************
 * 查询
 ****************************************/
function doSearch() {
	courseReviewTb.ajax.reload(function(){
		// 重载完成
		initRaty();
	});
}


/****************************************
 * 课程列表初始化
 ****************************************/
function initCourseReviewTb() {

	courseReviewTb = $('#courseReviewTb').DataTable({
		ajax: {
			url: contextPath + '/course/getCourse.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.courseIdOrName = $('#inputCourseIdOrName').val();
				params.checkState = checkStateFlag; // 只显示已提交的课程
			}
		},
		stateSave: true,
		lengthChange: true,
		searching: false,
		ordering: false,
		info: true,
		autoWidth: false,
		serverSide: true,
		pagingType: "full_numbers",
		iDisplayLength: 10,
		lengthMenu: [10, 50, 100],
		columns: [
			{
				"data": null,
				"title": "序号",
				"render": function (data, type, row, meta) {
					return meta.settings._iDisplayStart + meta.row + 1;
				}
			},
			{"data": "courseId", "title": "课程ID", "visible": false},
			{"data": "courseName", "title": "课程名"},
			{"data": "useCount", "title": "已学习人数"},
			/*{"data": "commentAllowable", "title": "是否允许评价",
				"render":function(data, type, row, meta){
                    if(data != null){
                    	if(data == true){
                    		return "是";
                    	}else if(data == false){
                    		return "否";
                    	}else{
                    		return "否";
                    	}
                    }else{
                    	return "否";
                    }
                }
			},*/
			{"data": "evaluateAmount", "title": "评论数", 
				"render":function(data, type, row, meta){
					if(data == null){
						return "";
					}else{
						return data;
					}
				}
			},
			{"data": "avgScore", "title": "综合评分",
				"render":function(data, type, row, meta){
					if(data == null){
						return "<div class='bigger-120' style='display: inline-block;padding-left:1px;padding-top:-1px;'>\
						<div class='raty' data-length='0'></div>\
						</div>";
					}else{
						return "<div class='bigger-120' style='display: inline-block;padding-left:1px;padding-top:-1px;'>\
						<div class='raty' data-length='"+data+"'></div>\
						</div>";
					}
				}
			},
			{"data": "status", "title": "状态",
				"render":function(data, type, row, meta){
                    if(data != null){
                    	if(data == 0){
                    		return "<i class='deletedIcan'></i>已删除";
                    	}else if(data == 1){
                    		return "<i class='terminationIcan'></i>终止";
                    	}
                    	else if(data == 2){
                    		return "<i class='noSbmitSIcan'></i>未提交";
                    	}else if(data == 3){
                    		return "<i class='submitedIcan'></i>已提交";
                    	}else if(data == 4){
                    		return "<i class='noPassIcan'></i>未通过";
                    	}else if(data == 6){
                    		return "<i class='passIcan'></i>已通过";
                    	}else if(data == 5){
                    		return "<i class='launchedIcan'></i>已发布";
                    	}else{
                    		return "<i class='terminationIcan'></i>终止";
                    	}
                    }else{
                    	return "<i class=terminationIcan></i>终止";
                    }
                }
			
			},
			{"data": "courseTypeName", "title": "类型",
				"render":function(data, type, row, meta){
					if(data == null){
						return "";
					}else{
						return data;
					}
				}
			},
			{"data": "openRange", "title": "范围",
				"render":function(data, type, row, meta){
                    if(data != null){
                    	if(data == 1){
                    		return "院系";
                    	}else if(data == 2){
                    		return "学校";
                    	}else if(data == 3){
                    		return "AWS平台";
                    	}else{
                    		return "学生";
                    	}
                    }else{
                    	return "学生";
                    }
                }
			},
			{
				"data": "opt",
				"title": "操作",
				"render": function (data, type, row, meta) {
					if(row.status == 3){
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-success' onclick='showCourseReviewDetailInfo(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-search-plus bigger-120'>进入审核</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-info' onclick='courseReviewOk(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-check bigger-120'>同意</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='courseReviewNg(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-times bigger-120'>不同意</i>" +
						"</button>" +
						"</div>";
					}else{
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-success' onclick='showCourseDetailInfo(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-search-plus bigger-120'>详细信息</i>" +
						"</button>" +
						"</div>";;
					}
					
				}
			}
		],
		initComplete: function( settings, json ) {
			// 初始化完成
			initRaty();
		},
		language: {
			url: contextPath + "/resource/json/language-zh.json"
		}
	});
}


//模拟post跳转函数
function standardPost(url, args){

	var temp = document.createElement("form"); 
  temp.action = url; 
  temp.method = "post"; 
  temp.style.display = "none"; 
  for (var x in args) { 
    var opt = document.createElement("input"); 
    opt.name = x; 
    opt.value = args[x]; // alert(opt.name) 
    temp.appendChild(opt); 
    } 
  document.body.appendChild(temp); 
  temp.submit(); 
  return temp; 
}



function showCourseReviewDetailInfo(courseId, courseName){
	//跳转到课程详细信息页面
	//window.location = contextPath + "/coursemgt/coursedetailinfo";

	var url = contextPath + "/course/getCourseReviewDetailInfo";
	
	standardPost(url, {"courseId":courseId});
}

function courseAudit(courseId, flag, content){
	$.ajax({
		url : contextPath +'/course/courseAudit.do',
		type : 'POST',
		traditional: false,//后台接收数组
		dataType: "json",
		data :{
			"courseId":courseId,
			"flag" : flag,
			"content": content
		},
		success : function(data) {
			if(data.resultFlag == true){
				layer.msg("课程审核成功", {icon: 1});
				
			}else{
				layer.msg("课程审核失败", {icon: 5});
				
			}
			courseReviewTb.ajax.reload(function(){
				// 重载完成
				initRaty();
			});
		}
	});
}

function courseReviewOk(courseId, courseName){
	courseAudit(courseId, 1, ""); // 提交课程审核-审核状态 同意 1
}

var gCourseId = "";  // 保存课程Id

/**
 * 不同意的点击事件函数 保存课程ID 显示模态框
 * @param courseId
 * @param courseName
 */
function courseReviewNg(courseId, courseName) {
	
	gCourseId = courseId;
	$('#courseReviewEdit').modal('show');
}

/**
 * 提交课程审核确定的点击事件函数
 */
function submitCourseAuditFunc(){
	var contentTemp = $("#description").val();
	
	var bv = $('#courseCheckInfoForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	
	courseAudit(gCourseId, 0, contentTemp);  // 提交课程审核-审核状态 不同意 0
	$('#courseReviewEdit').modal('hide');
}



/**
 * 查看待审核列表
 */
function viewCheckWaitCourse(){
	$("#checkWait").css("font-size", "13px");
	$("#checkHistory").css("font-size", "12px");
	checkStateFlag = 1; //设置审核状态为1-只显示待审核的课程  课程状态为已提交
	//重新加载datatables
	courseReviewTb.ajax.reload(function(){
		// 重载完成
		initRaty();
	}); 
	
	//var length = courseReviewTb.columns().nodes().length;

	// 显示最后一列  操作列
	//courseReviewTb.column(length-1).visible(true);
}

/**
 * 查看审核历史
 */
function viewCheckHistoryCourse(){
	$("#checkWait").css("font-size", "12px");
	$("#checkHistory").css("font-size", "13px");
	checkStateFlag = 2; //设置审核状态为2-显示审核过的课程，课程状态是未通过(4),已通过(5),已发布(6)
	
	//重新加载datatables
	courseReviewTb.ajax.reload(function(){
		// 重载完成
		initRaty();
	}); 
	
	//var length = courseReviewTb.columns().nodes().length;

	// 隐藏最后一列  操作列
	//courseReviewTb.column(length-1).visible(false);
}


function showCourseDetailInfo(courseId, courseName){
	
	var url = contextPath + "/course/showCourseDetailInfo";
	
	standardPost(url, {"courseId":courseId});
}


/**
 * 初始化星级评分插件
 */
function initRaty(){
	// 找到raty的div
	$("div.raty").each(function() {
	    var $this = $(this);
	
	    // 获取初始化值
	    //var score = $this.text();
	    var score = $this.attr("data-length");

	    // 初始化raty
	    $this.raty({
	        // 设置值
	        score : score,
	        //noRatedMsg : "",
	        half: true,
	        // 由Raty生成的隐藏字段的名称。
	        readOnly : true
	    });
	    
	});
	
}


/**
 * 实时显示文本框的字数(不同意理由)
 */
function displayWordCound(obj, maxLength){
	if (obj == null || obj == undefined || obj == "") {  
        return;  
    }  
    if (maxLength == null || maxLength == undefined || maxLength == "") {  
        maxLen = 500;  
    } 
    
    var $obj = $(obj);  
    
    if (obj.value.length > maxLength) { //如果输入的字数超过了限制  
        obj.value = obj.value.substring(0, maxLength); //就去掉多余的字  
    }   
    
    $("#description-total").text(obj.value.length); 
}