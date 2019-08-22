/****课程实验查看js管理*******/
var courseId = "";
var studentId = "";
var color = "#337ab7";
var preObj = null; /* 之前的对象 */
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	
	courseId = $("#courseId").val();
	studentId = $("#studentExperimentInfoTitleId").attr("data-student-id");
	
	var studentItem = $(".studentList").find('.studentList-item');
	
	$.each(studentItem, function(index, item){
		var id = $(item).attr("data-student-id");
		if(id == studentId){
			/* 设置当前字体为红色 */
			$(item).css("color", "red");
			// 保存当前对象为第一个学生
			preObj = item;
			return;
		}
		
	});
	
});


function studentExperimentInfo(obj){
	// 同一个对象直接返回
	if(preObj == obj){
		return;
	}
	
	// 保存学生ID
	studentId = $(obj).attr("data-student-id");
	
	/* 取得属性的文本值 */
	var value = $(obj).text();
	
	/* 设置属性的文本值 */
	$("#studentExperimentInfoTitleId").text(value);
	
	/* 设置当前字体为红色 */
	$(obj).css("color", "red");
	
	if(preObj != null){
		/* 还远之前的字体颜色 */
		$(preObj).css("color", color);
		
	}
	
	/* 保存之前的对象 */
	preObj = obj;

	$.ajax({
		url : contextPath +'/course/getStudentCourseReport.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'courseId': courseId,
			'studentId' : studentId
			
		},
		success : function(data) {
			var html = studentRepotStrConfig(data);
			$("#studentExperimentInfoHeight").empty();
			$("#studentExperimentInfoHeight").append(html);
		}
	});
	
	
	
}

/**
 * 组点击时进行缩放处理函数
 */
function groupClickFunc(obj){
	var parent = $(obj).parent(".group-menu");
	var children = parent.find('.student-item');
	var span = parent.find("span");
	
	var flag = span.hasClass("glyphicon-plus");
	
	if(flag == true){// 当前为+ 显示所有学生 并置为-
		span.removeClass("glyphicon-plus");
		span.addClass("glyphicon-minus");
		
		children.show();  //显示学生信息
		
	}else{ //当前为- 隐藏所有学生并置为+
		span.removeClass("glyphicon-minus");
		span.addClass("glyphicon-plus");
		
		children.hide();  //隐藏学生信息
	} 

}

function viewExperimentReport(obj){
	// 取得直接父对象
	var parent = $(obj).parent(".showReport");
	var children = parent.find('.studentReport');
	
	var html = children.html();
	
	var student = $("#studentExperimentInfoTitleId").text();
	
	// 取得多级父对象
	var parentMs = $(obj).parents(".widget-header");
	var experimentNo = parentMs.find('.experimentTitle').eq(0).text();
	
	//var experimentNo = 1;
	layer.open({
      type: 1,
      title: student + '-' + experimentNo + ' 的实验报告',
      shadeClose: true,
      shade: false,
      maxmin: true, //开启最大化最小化按钮
      area: ['893px', '600px'],
      content: html
    });
}
/**
 * 提交实验评价
 * @param obj
 */
function submitExperimetComment(obj){
	// 取得当前元素的父div, parent表示取得当前直接元素的父亲， parents 取得所有父亲
	var parent = $(obj).parents(".studentParent");
	
	// 取得实验评论页面元素，eq方法取得集合里的index元素
	var textarea = parent.find("textarea").eq(0);
	var comment = textarea.val();
	
	// 取得实验ID
	var experimentId = parent.find(".studentExperimentId").eq(0).text();
	
	// 取得分数输入页面元素
	var scoreObj = parent.find("input").eq(0);
	var score = scoreObj.val();
	
	// 取得编辑按钮页面元素
	var editBtObj = parent.find(".editBtnClass").eq(0);
	
	if(comment == ""){
		layer.msg('评论不能为空', {
            time: 2000, //2s后自动关闭
            btn: ['知道了', '哦']
          });
		return;
	}
	
	if(score == ""){
		layer.msg('评分不能为空', {
            time: 2000, //2s后自动关闭
            btn: ['知道了', '哦']
          });
		return;
	}
	
	if(score > 100){
		layer.msg('分数不能超过100分', {
            time: 5000, //5s后自动关闭
            btn: ['知道了', '哦']
          });
		return;
	}
	
	
	
	$.ajax({
		url : contextPath +'/course/appraiseReport.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'experimentId': experimentId,
			'studentId' : studentId,
			'comment' : comment,
			'score' : score
		},
		success : function(data) {
			if(data.resultFlag){
				layer.msg('提交成功', {icon: 6});
				// 提交成功后设置输入框为只读--点击修改按钮后修改再修改为可修改
				textarea.attr('readonly', true);
				scoreObj.attr('readonly', true);
				
				// 设置当前的提交按钮不能点击
				$(obj).attr('disabled', true);
				
				// 设置编辑按钮可点击
				editBtObj.attr('disabled', false);
			}else{
				layer.msg('提交失败', {icon: 5});
			}
			
		}
	});
	
}

/**
 * 搜索函数
 */
function doSearch(){
	var searchName = $("#studentName").val();
	if(searchName == ""){
		return;
	}
	
	var flag = 0; 
	var studentItem = $(".studentList").find('.studentList-item');
	
	$.each(studentItem, function(index, item){
		var name = $(item).attr("data-student-name");
		
		if(name == searchName){
			// 搜索与当前显示的是同一个对象不做处理直接返回
			if(preObj == item){
				flag = 2;
				return false;  // return false 跳出遍历， true continue
			}
			
			
			/* 还远之前的字体颜色 */
			$(preObj).css("color", color);
			
			/* 设置当前字体为红色 */
			$(item).css("color", "red");
			
			// 不是同一个对象时保存当前的对象的id和studentID
			preObj = item;
			// 保存学生ID
			studentId = $(item).attr("data-student-id");
			
			/* 设置属性的文本值 */
			$("#studentExperimentInfoTitleId").text(name);
			
			flag = 1;
			
			// 找到第一个匹配的学生后跳出循环
			return false;  // return false 跳出遍历， true continue
		}
		
	});
	
	//匹配到学生-获取实验报告信息
	if(flag == 1){
		$.ajax({
			url : contextPath +'/course/getStudentCourseReport.do',
			type : 'POST',
			traditional: true,//后台接收数组
			dataType: "json",
			data :{
				'courseId': courseId,
				'studentId' : studentId
				
			},
			success : function(data) {
				var html = studentRepotStrConfig(data);
				$("#studentExperimentInfoHeight").empty();
				$("#studentExperimentInfoHeight").append(html);
			}
		});
	}else if(flag == 0){
		layer.msg('没有这个学生', {
            time: 5000, //5s后自动关闭
            btn: ['知道了', '哦']
          });
	}
	
}


/**
 * 解析学生实验列表
 * @param report
 * @returns {String}
 */
function studentRepotStrConfig(report){
	var studentStr = "";
	$.each(report, function(index, item){
		
		var comment = '';
		var score = '';
		var length = 0;
		var readonlyStr = '';
		var editButtonStr = '';
		var disableStr = ''; 
		if(item.comment != null && item.comment != ''){
			editButtonStr = '<button class="btn btn-xs btn-info pull-right editBtnClass" type="button" onclick="editExperimentComment(this)"> '+
								'<i class="ace-icon fa fa-pencil icon-on-left"></i>'+
								'<span class="bigger-110">编辑</span>'+
							'</button>';
			comment = item.comment;
			score = item.score;
			readonlyStr = " readonly='readonly' ";
			disableStr = " disabled='disabled' ";
			length = comment.length;
		}else{
			editButtonStr = '<button class="btn btn-xs btn-info pull-right editBtnClass" type="button" disabled="disabled" onclick="editExperimentComment(this)"> '+
								'<i class="ace-icon fa fa-pencil icon-on-left"></i>'+
								'<span class="bigger-110">编辑</span>'+
							'</button>';
		}
		
		
		var str = 	'	<div class="col-xs-12 col-sm-12 col-md-12 studentParent" >' +
		'		<div class="widget-box">' +
		'			<div class="widget-header"> ' +
		'				<h5 class="widget-title experimentTitle">实验'+item.experimentNo+'</h5>' +
		'				<div class="widget-toolbar"> ' +
		'					<a href="#" data-action="collapse">' +
		'						<i class="1 ace-icon fa fa-angle-up bigger-125"></i>' +
		'					</a>' +
		'				</div>  ' +
		'				<div class="widget-toolbar no-border showReport">' +
		'					<div class="studentReport" style="display: none">'+item.content+'</div>	 '+		
		'					<button class="btn btn-xs btn-light bigger" type="button" onclick="viewExperimentReport(this)">' +
		'						<i class="ace-icon glyphicon glyphicon-download-alt"></i>' +
		'						查看报告   ' +
		'					</button> ' +
		'				</div>  ' +
		'			</div> ' +
		'			<div class="widget-body"> ' +
		'				<div class="row"> ' +
		'					<div class="space-8"></div>	' +
		'					<div class="col-md-5">' +
		'						<div class="profile-user-info profile-user-info-striped">' +
		'							<div class="profile-info-row"> ' +
		'								<div class="studentExperimentId" style="display: none">'+item.experimentId+'</div>' +
		'								<div class="profile-info-name"> 实验名 </div> ' +
		'								<div class="profile-info-value">' +
		'									<span>'+item.experimentName+'</span> ' +
		'								</div>' +
		'							</div> ' +
		'							<div class="profile-info-row">   ' +
		'								<div class="profile-info-name"> 实验时长<small>(分钟)</small> </div> ' +
		'								<div class="profile-info-value">' +
		'									<span>'+item.runtime+'</span>' +
		'								</div> ' +
		'							</div> ' +
		'							<div class="profile-info-row">' +
		'								<div class="profile-info-name"> 提交时间 </div>' +
		'								<div class="profile-info-value">' +
		'									<i class="fa fa-clock-o light-orange bigger-110"></i>' +
		'									<span>'+item.createTime+'</span>' +
		'								</div>' +
		'							</div>' +
		'						</div>' +
		'						<div class="space-8"></div>' +
		'					</div>' +
		'					<div class="col-md-7">' +
		'						<form> ' +
		'							<div class="row">' +
		'								<div class="col-md-3">' +
		'									<h5 class="blue lighter experimentComment">评价</h5>' +
		'								</div>' +
		'								<div class="col-md-9">' +
		'									<textarea class="col-md-12" rows="3" onkeydown="displayWordCound(this,500)" onkeyup="displayWordCound(this, 500)" onfocus="displayWordCound(this, 500)" '+ readonlyStr +' placeholder="请输入实验评价…" style="width:98%;">'+comment+'</textarea>' +
		'									<div style="float: right;margin-top: 0px;padding-right: 18px;">' +
		'										<span>'+ length +'</span>/500' +
		'									</div>'+	
		'								</div>' +
		'							</div>' +
		'							<div class="space-16"></div>' +
		'							<div class="row">' +
		'								<div class="col-md-3">' +
		'									<h5 class="blue lighter experimentScore">评分</h5>' +
		'								</div>' +
		'								<div class="col-md-5"> ' +
		'									<input name="score" value="'+ score +'" onkeyup="value=value.replace(/[^\d]/g,"")" placeholder="请输入实验得分..." '+ readonlyStr +' style="height:32px;width:80%;padding-left: 8px;" />' +
		'								</div>' +
		'								<div class="scorePromptIcan">' +
		'									<i></i>' +
		'									<small>最高分数100分</small>' +
		'								</div>' +
		'							</div>' +
		'						</form>' +
		'					</div>' +
		'					<div class="space-4"></div>' +
		'				</div>' +
		'				<div class="widget-toolbox padding-8 clearfix">' +	
		'						<button class="btn btn-xs btn-success pull-right submitBtnClass" type="button" '+ disableStr +'onclick="submitExperimetComment(this)">' +
		'							<span class="bigger-110">提交</span>' +
		'							<i class="ace-icon fa fa-arrow-right icon-on-right"></i>' +
		'						</button>' +
		'						<span class="pull-right"  style="width:10px;"> &nbsp;</span>'+
								editButtonStr +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'	<div class="col-xs-12 col-sm-12 col-md-12 space-4"></div>' 
	
		studentStr += str;
	});
	
	return studentStr;
}



/**
 * 实时显示文本框的字数(课程描述)
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
    
    
    // 取得当前元素的父div, parent表示取得当前直接元素的父亲， parents 取得所有父亲
	var parent = $obj.parent("div");
	
	// 取得字数计数页面元素，eq方法取得集合里的index元素
	var wordCound = parent.find("span").eq(0);
    
    wordCound.text(obj.value.length); 
}

/**
 * 启动编辑
 * @param obj
 */
function editExperimentComment(obj){
	var $obj = $(obj); 
	
	// 取得当前元素的父div, parent表示取得当前直接元素的父亲， parents 取得所有父亲
	var parent = $obj.parent("div");
	
	// 取得字数计数页面元素，eq方法取得集合里的index元素
	var submitBt = parent.find(".submitBtnClass").eq(0);
	
	// 设置编辑按钮不可再次点击-提交成功后修改为可点击
	$obj.attr('disabled', true);
	
	// 设置提交按钮可再次点击-提交成功后修改为不可点击
	submitBt.attr('disabled', false);
	
	
	// 取得当前元素的父div, parent表示取得当前直接元素的父亲， parents 取得所有父亲
	var parents = $obj.parents(".studentParent");
	
	// 取得实验评论页面元素，eq方法取得集合里的index元素
	var textarea = parents.find("textarea").eq(0);
	
	
	// 取得分数输入页面元素
	var score = parents.find("input").eq(0);
	
	// 设置输入框为可修改--提交成功后不可修改
	textarea.attr('readonly', false);
	score.attr('readonly', false);
}

