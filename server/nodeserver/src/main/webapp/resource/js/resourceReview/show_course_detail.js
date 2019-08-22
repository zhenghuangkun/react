/****课程详细信息js管理*******/

$(function () {
	
	initCourseRaty();
});


/**
 * 打开模板信息新窗口
 * @param tempId
 * @returns
 */
function openTemplateDetailInfo(tempId){
	
	/*显示模板详细信息*/
	var targetUrl = contextPath + '/template/info?tmplId=' + tempId;
	
	if(tempId == "0"){
		return;
	}
	
	//页面跳转
	window.open(targetUrl);
}


/*显示实验指南PDF*/
function viewExperimentGuideInfo(isShow, guideUrl) {
    var state = "";
    if (isShow) {
        state = "block";
    } else {
        state = "none";
    }
    
    var pdfContainer = $("#pdfContainer");
    pdfContainer.attr("src", guideUrl);
    
    
    var pop = document.getElementById("pop");
    pop.style.display = state;
    var lightbox = document.getElementById("lightbox");
    lightbox.style.display = state;
}
function close() {
	viewExperimentGuideInfo(false, "");
}

/**
 * 初始化课程综合星级评分插件
 */
function initCourseRaty(){
	// 找到raty的div
	$("div.courseRaty").each(function() {
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


//全局实验组信息List
var globalExperimentGroupList = null;

// 是否是第一次显示，初始值为true 表示是第一次显示
var firstShowFlag = true;

/**
 * 显示组详细信息
 * @param row
 */
function showExperimentGroupStudent(courseId){
	
	if(firstShowFlag == true){
		$.ajax({
			url : contextPath + "/course/showExperimentGroupStudent",
			type : 'POST',
			dataType: "json",
			data : {
				"courseId":courseId
			},
			traditional: true,//后台接收数组
			success : function(result) {
				
				if (result.resultFlag) {
					// 取得成功, 保存数据，下次直接使用，无需请求后台。
					globalExperimentGroupList = result.data;
					firstShowFlag = false;
					showStudentModal(result.data);
				}
			}
		});
	}else{
		showStudentModal(globalExperimentGroupList);
	}
	
}

function showStudentModal(experimentGroupList){
	var html = initExperimentGroupHtml(experimentGroupList);
	
	
	layer.open({
	      type: 1,
	      title: '实验组详细信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['893px', '600px'],
	      content: html
	    });
}

function initExperimentGroupHtml(experimentGroupList){
	
	var allHtml = "";
	
	$.each(experimentGroupList, function(indexExperiment, experiment){
		
		
		var state = "可用";
		if(experiment.state == 0){
			state = "不可用";
		}
		
		var member = "";
		$.each(experiment.children, function(index, item){
			var str = '<tr>\
			<td>'+item.realName+'</td>\
			<td>'+item.stuId+'</td>\
			<td>'+item.mechanismName+'</td>';
			
			if(item.majorName == null){
				str += '<td></td>';
			}else{
				str += '<td>'+item.majorName+'</td>';
			}
			
			if(item.gradeName == null){
				str += '<td></td>';
			}else{
				str += '<td>'+item.gradeName+'</td>';
			}
			
			if(item.classesName == null){
				str += '<td></td>';
			}else{
				str += '<td>'+item.classesName+'</td>';
			}
			str += '</tr>';
			member += str;
		});
		
		var html = '\
			<html>\
			<head>\
			</head>\
			<body>\
				<div class="main-content">\
					<div class="main-content-inner">\
						<div class="page-content">\
							<div class="row" >\
								<div class="col-xs-12 col-sm-12 col-md-12" style="border-bottom:1px solid #A8D4F5;">\
									<label style="font-size: 17px" class="text-primary">\
										<i class="ace-icon fa fa-leaf"></i>\
										<strong id="studentExperimentInfoTitleId">实验组信息</strong>\
									</label>\
								</div>\
							</div>\
							<div class="row" style="margin-top: 15px;">\
								<div class="col-md-10">\
									<div class="profile-user-info profile-user-info-striped">\
									 	<div class="profile-info-row">\
											<div class="profile-info-name"> 组名 </div>\
											<div class="profile-info-value">\
												<span>'+ experiment.groupName +'</span>\
											</div>\
										</div>\
										<div class="profile-info-row">\
											<div class="profile-info-name"> 创建时间 </div>\
											<div class="profile-info-value">\
												<i class="fa fa-map-marker light-orange bigger-110"></i>\
												<span>'+ experiment.createDate +'</span>\
											</div>\
										</div>\
										<div class="profile-info-row">\
											<div class="profile-info-name"> 创建者 </div>\
											<div class="profile-info-value">\
												<span>'+ experiment.createAuthorName +'</span>\
											</div>\
										</div>\
										<div class="profile-info-row">\
											<div class="profile-info-name"> 状态 </div>\
											<div class="profile-info-value">\
												<span>'+ state +'</span>\
											</div>\
										</div>\
										<div class="profile-info-row">\
											<div class="profile-info-name"> 组人数 </div>\
											<div class="profile-info-value">\
												<span>'+ experiment.memberNum +'人</span>\
											</div>\
										</div>\
										<div class="profile-info-row">\
											<div class="profile-info-name"> 关联课程数 </div>\
											<div class="profile-info-value">\
												<span>'+ experiment.courseNum +'</span>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="row" >\
								<div class="col-xs-12 col-sm-12 col-md-12" style="border-bottom:1px solid #A8D4F5;margin-top: 20px;">\
									<label style="font-size: 17px" class="text-primary">\
										<i class="ace-icon fa fa-leaf"></i>\
										<strong id="studentExperimentInfoTitleId">组成员信息</strong>\
									</label>\
								</div>\
							</div>\
							<div class="row" style="width:83.3%;margin-left: 10px;margin-top: 20px;">\
								<table class="table table-hover" style="width:98%;">\
									<colgroup>\
										<col width="12%">\
										<col width="17%">\
										<col width="30%">\
										<col width="15%">\
										<col width="14%">\
										<col width="12%">\
									</colgroup>\
									<thead>\
										<tr>\
											<th>姓名</th>\
											<th>学号</th>\
											<th>院系</th>\
											<th>专业</th>\
											<th>年级</th>\
											<th>班级</th>\
										</tr>\
									</thead>\
									<tbody>\
									'+member+'\
									</tbody>\
								</table>\
							</div>\
						</div>\
					</div>\
				</div>\
			</body>\
		</html>';
		
		allHtml += html;
	});
	
	return allHtml;
}