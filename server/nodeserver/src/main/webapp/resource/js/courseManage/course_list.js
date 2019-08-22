/****课程信息js管理*******/

var courseTB = "";
/****************************************
 * 页面初始化
 ****************************************/
$(function () {

	/*课程列表初始化*/
	initCourseTB();
	
});

/****************************************
 * 查询
 ****************************************/
function doSearch() {
	courseTB.ajax.reload(function(){
		// 重载完成
		//initRaty();
	});
}

function addCoursePage() {
	
	//跳转到添加课程页面
	location = contextPath + "/coursemgt/addcourse";
	
}


/****************************************
 * 课程列表初始化
 ****************************************/
function initCourseTB() {

	courseTB = $('#courseTb').DataTable({
		ajax: {
			url: contextPath + '/course/getCourse.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.courseIdOrName = $('#inputCourseIdOrName').val();
				params.state = $('#inputState').val();
				//params.type = type;
				
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
				"width": "5%",
				"render": function (data, type, row, meta) {
					return meta.settings._iDisplayStart + meta.row + 1;
				}
			},
			/*{"data": "courseId", "title": "课程ID"},*/
			{"data": "courseName", "title": "课程名", "width": "15%"},
			{"data": "useCount", "title": "已学习人数", "width": "10%"},
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
			{"data": "evaluateAmount", "title": "评论数","width": "8%",
				"render":function(data, type, row, meta){
					if(data == null){
						return "";
					}else{
						return data;
					}
				}
			},
			{"data": "avgScore", "title": "综合评分","width": "12%",
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
			{"data": "status", "title": "状态","width": "8%",
				"render":function(data, type, row, meta){
                    if(data != null){
                    	if(data == 0){
                    		return "<i class='deletedIcan'></i>已失效";
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
			{"data": "courseTypeName", "title": "类型","width": "8%",
				"render":function(data, type, row, meta){
					if(data == null){
						return "";
					}else{
						return data;
					}
				}
			},
			{"data": "openRange", "title": "范围","width": "5%",
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
				"width": "29%",
				"render": function (data, type, row, meta) {
					if(row.status == 6){
						return "<div class='hidden-sm hidden-xs btn-group'>" +
							"<button class='btn btn-xs btn-purple' onclick='launchCourseFunc(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
							"<i class='ace-icon fa fa-check bigger-120'>发布</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-success' onclick='showCourseDetailInfo(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
							"<i class='ace-icon fa fa-search-plus bigger-120'>详细</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-info' onclick='modifyCourseInfo(\""+ row.courseId + "\"," + row.status +")' >" +
							"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-primary' onclick='cloneCourseOpt(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
							"<i class='ace-icon fa fa-clone bigger-120'>克隆</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-danger' onclick='deleteCourse(\""+ row.courseId + "\"," + row.status +")' >" +
							"<i class='ace-icon fa fa-trash-o bigger-120'>失效</i>" +
							"</button>" +
							
							"</div>";
					}else if(row.status == 0){
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-success' disabled='disabled' onclick='showCourseDetailInfo(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-search-plus bigger-120'>详细</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-info' disabled='disabled' onclick='modifyCourseInfo(\""+ row.courseId + "\"," + row.status +")' >" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-primary' onclick='cloneCourseOpt(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
						"<i class='ace-icon fa fa-clone bigger-120'>克隆</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' disabled='disabled' onclick='deleteCourse(\""+ row.courseId + "\"," + row.status +")' >" +
						"<i class='ace-icon fa fa-trash-o bigger-120'>失效</i>" +
						"</button>" +
						
						"</div>";
					}else{
						return "<div class='hidden-sm hidden-xs btn-group'>" +
							"<button class='btn btn-xs btn-success' onclick='showCourseDetailInfo(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
							"<i class='ace-icon fa fa-search-plus bigger-120'>详细</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-info' onclick='modifyCourseInfo(\""+ row.courseId + "\"," + row.status +")' >" +
							"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-primary' onclick='cloneCourseOpt(\""+ row.courseId + "\",\"" + row.courseName +"\")' >" +
							"<i class='ace-icon fa fa-clone bigger-120'>克隆</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-danger' onclick='deleteCourse(\""+ row.courseId + "\"," + row.status +")' >" +
							"<i class='ace-icon fa fa-trash-o bigger-120'>失效</i>" +
							"</button>" +
							
							"</div>";
					}
					
				}
			}
		],
		initComplete: function( settings, json ) {
			// 初始化完成
			initRaty();
		},
		drawCallback: function( settings ) {
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

/**
 * 发布课程处理
 * @param courseId
 * @param courseName
 */
function launchCourseFunc(courseId, courseName){
	/* 添加课程请求 */
	layer.confirm("发布之后不能再修改课程信息", {
		icon: 3,
		title: "确认消息"
	}, function () {
		
		//请求发布课程
		$.ajax({
			url : contextPath +'/course/launchCourse',
			type : 'POST',
			traditional: true,//后台接收数组
			dataType: "json",
			data :{
				'courseId': courseId
			},
			success : function(data) {
				if(data.resultFlag == true){
					//重新加载
					courseTB.ajax.reload(function(){
						// 重载完成
						//initRaty();
					});
					layer.close(layer.index); //关闭提示层
					layer.msg('发布成功', {icon: 6});
				}
			}
		});
	});
}


function showCourseDetailInfo(courseId, courseName){
	//跳转到课程详细信息页面
	//window.location = contextPath + "/coursemgt/coursedetailinfo";

	var url = contextPath + "/course/getCourseDetailInfo";
	
	standardPost(url, {"courseId":courseId});
}



function modifyCourseInfo(courseId, status){
	//layer.msg("课程ID=" + courseId + "课程名=" + courseName, {icon: 1});
	//跳转到课程课程管理页面
	
	if(status == 3){
		layer.msg('课程正在审核不能修改', {
            time: 10000, //10s后自动关闭
            btn: ['知道了', '确定']
        });
		
		return false;
	}
	
	if(status == 5){
		layer.msg('课程已发布不能修改', {
            time: 10000, //10s后自动关闭
            btn: ['知道了', '确定']
        });
		
		return false;
	}
	
	var url = contextPath + "/course/modifycourse";
	
	standardPost(url, {"courseId":courseId});
}

function cloneCourseOpt(courseId, courseName){
	
	
	layer.prompt({
		title: '输入新的课程名，并确认', 
		formType: 0,
		value: '', //初始时的值，默认空字符
		maxlength: 30, //可输入文本的最大长度，默认500
	}, function(val, index){
		if(val == ""){
			layer.msg('课程名不能为空.', {icon: 7});
		}else if(val == courseName){
			layer.msg('课程名不能相同.', {icon: 7});
		}else{
			
			layer.close(layer.index);
			
			//加载层-风格4
			layer.msg('克隆中', {
			  icon: 16
			  ,shade: 0.01
			});
			
			//课程克隆处理
			$.ajax({
				url : contextPath +'/course/courseClone.do',
				type : 'POST',
				traditional: true,//后台接收数组
				dataType: "json",
				data :{
					'courseId': courseId,
					'courseName': val
				},
				success : function(data) {
					layer.close(layer.index);
					if(data.resultFlag == true){
						layer.msg("克隆成功", {icon: 1});
						courseTB.ajax.reload(function(){
							// 重载完成
							//initRaty();
						});
					}else{
						
						layer.msg(data.message, {icon: 5});
					}
				}
			});
		}
	});
	
}

function deleteCourse(courseId, status) {
	
	if(status == 3){
		layer.msg('课程正在审核不能删除', {
            time: 10000, //10s后自动关闭
            btn: ['知道了', '确定']
        });
		
		return false;
	}
	
	/*if(status == 5){
		layer.msg('课程已发布不能删除', {
            time: 10000, //10s后自动关闭
            btn: ['知道了', '确定']
        });
		
		return false;
	}*/
	
	layer.confirm("确定要删除吗？", {
		icon: 3,
		title: "提示"
	}, function (index) {
		layer.close(index);
		// 确定删除的回调函数;
		$.ajax({
			url : contextPath +'/course/courseDelete.do',
			type : 'POST',
			traditional: true,//后台接收数组
			dataType: "json",
			data :{
				'courseId': courseId
			},
			success : function(data) {
				if(data.resultFlag == true){
					courseTB.ajax.reload(function(){
						// 重载完成
						//initRaty();
					});
				}else{
					layer.msg(data.message, {
			            time: 10000, //10s后自动关闭
			            btn: ['知道了', '确定']
			        });
					
					return false;
				}
			}
		});
		return;
	});
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

