/****课程详细信息js管理*******/


function modifyCourseImg(){
	//layer.tips('单机修改图片', '.img-responsive');
	//layer.msg('尼玛，打个酱油', {icon: 4});
	//layer.prompt(function(val, index){
	//	  layer.msg('得到了'+val);
	//	  layer.close(index);
	//	});
	
	
}


$(function () {
	
	/* 初始化操作信息是否显示 */
	var status = $("#operator").attr("date-stute");
	// 已发布状态下显示
	if(status == 5){
		$("#operator").removeClass('layui-hide');
	}else{
		$("#operator").addClass('layui-hide');
	}
	
	//initRaty();
	initCourseRaty();
	
	initStreamLoad();
	
	/* 初始化layer进度条信息 */
	initElement();
	
});


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

function courseExperimentReviewFunc(courseId, openRange){
	
	var url = contextPath + "/course/getCourseReport";
	
	
	//location = contextPath + "/course/getCourseExperiment"
	standardPost(url, {"courseId":courseId, "openRange":openRange});
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
 *初始化流加载 
 */
function initStreamLoad()
{
	layui.use('flow', function(){
		  var flow = layui.flow;
		 
		  flow.load({
		    elem: '.streamLoad' //流加载容器
		    //,scrollElem: '#LAY_demo1' //滚动条所在元素，一般不用填，此处只是演示需要。
		    ,done: function(page, next){ //执行下一页的回调
		    	var lis = [];
		    	
		    	$.ajax({
					url: contextPath + '/course/getCourseCommentInfo',
					dataType:'json',
					type:'post',
					data:{
						//type:pe,//类型0 1 2 3 4
						page: page,
						pageSize: 5,
						courseId:$("#courseId").val()
					},
					success:function(res){
						layui.each(res.data.data, function(index, item){
							var studentPic = contextPath + "/resource/images/courseManage/studentDefault2.jpg";
							//var studentName = "匿名用户";
							var studentName = item.student.realName;
							if(item.student.picFileUrl != null && item.student.picFileUrl != ""){
								studentPic = item.student.picFileUrl;
								//studentName = item.student.realName;
							}  
							
						      lis.push("\
						    		  <div class='layui-row' style='padding-bottom: 10px; margin-bottom: 20px; border-bottom: 1px solid #d9dde1;'>\
										<div class='layui-col-md1' style='margin-top: 5px;'>\
											<img class='studentPic' alt='匿名用户' src='"+studentPic+"'>\
										</div>\
										<div class='layui-row layui-col-md10' style='height: 100%'>\
											<label style='color:#4d555d;'>"+studentName+"</label>\
											<div class='bigger-120' style='display: inline-block;padding-left:15px;padding-top:-1px;'>\
												<div class='raty' data-length='"+item.score+"'></div>\
											</div>\
											<div style='word-wrap: break-word; margin-top:5px;'>\
												<p>\
													"+item.content+"\
												</p>\
											</div>\
											<div style='color: gray;margin-top:20px;'>"+item.commentTime+"</div>\
										</div>\
									</div>");
						});
						//initRaty();
						next(lis.join(''), page < (res.data.recordsTotal / 5) + 1 ); //总页数=总记录数/每页显示的数量 + 1
						initRaty();
					}
		    	});
		    	//initRaty();
		    }	
		  
		  });
	});
}





// 全局变量
var element;//layui元素
var timer;
var timing = 5000;//定时时间
var percent = 10;
var experimentInfo = new Array();
var courseStatus = 0;
var map = [];
var experimentFlag = false;
var messagePromt = "";
var gExperimentNo = 0;
var resourceStartFlag = false; //是否正在启动实验
/**
 * 显示模态框
 */
function showModal(status, tempId, keyName, experimentId, experimentNo){
	
	courseStatus = status;
	
	
	if(gExperimentNo != experimentNo && experimentInfo.length != 0 && experimentInfo[1] != experimentId && resourceStartFlag == true){
		
		messagePromt = "请等待实验" + gExperimentNo + "结束后再进行实验.";
		
		layer.msg(messagePromt, {
            time: 10000, //10s后自动关闭
            btn: ['确定']
          });
		
		return;
		
	}
	gExperimentNo = experimentNo;
	
	experimentInfo.length = 0;
	experimentInfo.push(tempId);
	experimentInfo.push(experimentId);
	
	
	
	
	$('#instance').empty();
	
	/*if(experimentId in map){
		var flag = map[experimentId];
		if(flag == true){
			$("#startBtn").addClass('layui-hide');
      		$("#progressTitle").removeClass('layui-hide');
      		$("#resouceTab .layui-progress").removeClass('layui-hide');
		}
	}else{
		map[experimentId] = false;
	}*/
	
	
	
	$.ajax({
		url : contextPath + '/course/getExperimentResInfo',
		type : 'POST',
		traditional: true, //后台接收数组
		dataType: "json",
		data : {
			"experimentInfo": experimentInfo
		},
		success : function(result) {
	      	if (result.resultFlag) {
	      		
	      		$("#resouceTab .layui-progress").addClass('layui-hide');
	      		$("#startBtn").addClass('layui-hide');
	      		$("#progressTitle").addClass('layui-hide');
      			showInstanceData(result.data);
      			layer.open({
      			  	type: 1,
      			  	title: "实验"+ gExperimentNo +"的资源信息",
      			  	area: ['300px', '540px'], //宽高
      			  	content: $('#resouceTab'),
      		   		success: function(layero, index){

      			  	}
      			});
	      		
	      	} else {
	      		if(resourceStartFlag == true){
	      			$("#startBtn").addClass('layui-hide');
					$("#progressTitle").removeClass('layui-hide');
					$("#terminationBtn").addClass('layui-hide');
	      		}else{
	      			$("#startBtn").removeClass('layui-hide');
		      		$("#terminationBtn").addClass('layui-hide');
		      		$("#progressTitle").addClass('layui-hide');
		      		
	      		}
	      		layer.open({
      			  	type: 1,
      			  	title: "实验"+ gExperimentNo +"的资源信息",
      			  	area: ['300px', '540px'], //宽高
      			  	content: $('#resouceTab'),
      		   		success: function(layero, index){

      			  	}
      			});
	      		
	      	}

		}
	});
	
	
	
}


/**
 * 启动实验
 * @param tempId
 * @param keyName
 * @returns
 */
function startUpCourseExperiment(){
	
	//课程状态判断
	if(courseStatus < 5){
		layer.msg('课程还没有发布或未审核通过，暂不能启动实验资源', {
            time: 10000, //10s后自动关闭
            btn: ['确定']
          });
		
		return;
	}

	
	
	
	
	$.ajax({
		url : contextPath + '/course/startCourseExperiment',
		type : 'POST',
		traditional: true, //后台接收数组
		dataType: "json",
		data : {
			"experimentInfo":experimentInfo
		},
		success : function(result) {
			
			$("#resouceTab .layui-progress").removeClass('layui-hide');
	      	element.progress('progress', percent + '%');
	      	$("#progressTitle").removeClass('layui-hide');
	      	$("#startBtn").addClass('layui-hide');
	      	if (result.resultFlag) {
	      		resourceStartFlag = true;
	      		//map[experimentInfo[1]] = true;
		      	timer = setInterval(function(){//启动定时器
					getExpResourceState(experimentInfo);
		        }, timing);
	      	} else {
	      		//map[experimentInfo[1]] = false;
	      		$("#startBtn").removeClass('layui-hide');
	      		$("#progressTitle").addClass('layui-hide');
	      		$("#resouceTab .layui-progress").addClass('layui-hide');
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

/**
 * 停止实验
 */
function stopExperiment(courseStatus, tempId, keyName, experimentId){
	experimentInfo.length = 0;
	experimentInfo.push(tempId);
	experimentInfo.push(experimentId);
	resourceStartFlag = false;
}
/**
 * 资源释放
 */
function resTerminationSubmit(){
	
	layer.confirm('确定释放资源吗？', {icon: 3, title:'提示'}, function(index){
		$.ajax({
			url : contextPath + "/course/terminationExperimentRes",
			type : 'POST',
			traditional: true, //后台接收数组
			dataType: "json",
			data : {
				"experimentInfo":experimentInfo
			},
			success : function(result) {
		      	if (result.resultFlag) {
		      		$('#startBtn').removeClass('layui-hide');
		      		$('#terminationBtn').addClass('layui-hide');
		      		$("#progressTitle").addClass('layui-hide');
		      		$('.instanceState').empty().append("状态：<span class='red'>terminated</span>");
		      		layer.alert(result.message, {icon: 1,title: "提示",closeBtn: false});
		      	} else {
		      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
		      	}

			}
		}); 
		
		layer.close(index);
	});
	
	resourceStartFlag = false;
}

/**
 * 制作镜像
 */
function AMIMakeSubmit(){
	
	$.ajax({
		url : contextPath + "/course/experimentAMIMake",
		type : 'POST',
		traditional: true, //后台接收数组
		dataType: "json",
		data : {
			"experimentInfo":experimentInfo
		},
		success : function(result) {
	      	if (result.resultFlag) {
	      		$('#AMIMakeBtn').addClass('layui-hide');
	      		layer.alert(result.message + "<br/>镜像ID：" + result.Data , {icon: 1,title: "提示",closeBtn: false});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}


/**
 * 获取资源状态
 */
function getExpResourceState(experimentInfo){
	$.ajax({
		url : contextPath + "/course/getExperimentResState",
		type : 'POST',
		dataType: "json",
		data : {
			"experimentInfo":experimentInfo
		},
		traditional: true,//后台接收数组
		success : function(result) {
			/*资源创建失败*/
			if (!result.resultFlag) {
				clearInterval(timer);
				percent = 0;
				//map[experimentInfo[1]] = false;
				resourceStartFlag = false;
				$("#resouceTab .layui-progress").addClass('layui-hide');
				$("#progressTitle").addClass('layui-hide');
				$("#startBtn").removeClass('layui-hide');
				
				layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
				return;
			}
			
			/*创建中*/
			if (result.data == "CREATE_IN_PROGRESS" ) {
				/*判断是否已启动资源*/
				if (!$("#resouceTab .layui-progress").hasClass('layui-hide')) {//判断进度条是否显示
					resourceStartFlag = true;
					percent = percent + Math.random() * 10 | 0;
					if (percent >= 88){
						percent = 88;
					}
					element.progress('progress', percent + '%');
				}
				return;
			} else {
				clearInterval(timer);
				percent = 0;
				stackState = "CREATE_COMPLETE";//设置状态
				//map[experimentInfo[1]] = false;
				/*影藏进度条*/
				if (!$("#resouceTab .layui-progress").hasClass('layui-hide')) {
					$("#resouceTab .layui-progress").addClass('layui-hide');
				}
				
				showData(result.data);//展示数据
				return;
			}
			clearInterval(timer);
			percent = 0;
	      	
		}
	});
}
/**
 * 展示数据
 */
function showData(data){
	$('#instance').empty();
	data.awsInstances.forEach(function (val, index){
		$('#instance').append(
			"<h4 class='header blue bolder smaller'><i class='ace-icon fa fa-cloud green'></i>服务器&nbsp; " + val.instanceName + "</h4>" +
			"<label>到期时间：" + data.useEndTime + "</label><br/>" +
			"<label class='instanceState'>状态：<span class='green'>" + val.instanceState + "</span></label><br/>" +
			"<label>实例ID：<span>" + val.instanceId + "</span></label><br/>" +
			"<label>实例类型：<span>" + val.instanceType + "</span></label><br/>" +
			"<label>公有IP：<span>" + val.publicIpAddress + "</span></label><br/>" +
			"<label>私有IP：<span>" + val.privateIpAddress +  "</span></label><br/>" +
			"<label>密钥：<span>" + val.keyName.substring(0,5) + "</span>&nbsp;&nbsp;" +
			"<a href='" +val.keyPairUrl + "' data-toggle='tooltip' title='点击下载连接密钥'><i class='ace-icon fa fa-download blue'></i></a></label><br/>"
		);
	});

	
	
	/*显示释放资源那妞*/
	$("#startBtn").addClass('layui-hide');
	$("#terminationBtn").removeClass('layui-hide');
	$("#resouceTab .layui-progress").addClass('layui-hide');
	$("#progressTitle").addClass('layui-hide');
}

/**
 * 展示数据
 */
function showInstanceData(data){
	$('#instance').empty();
	data.forEach(function (val, index){
		$('#instance').append(
			"<h4 class='header blue bolder smaller'><i class='ace-icon fa fa-cloud green'></i>服务器&nbsp; " + val.instanceName + "</h4>" +
			"<label>到期时间：" + val.useEndTime + "</label><br/>" +
			"<label class='instanceState'>状态：<span class='green'>" + val.instanceState + "</span></label><br/>" +
			"<label>实例ID：<span>" + val.instanceId + "</span></label><br/>" +
			"<label>实例类型：<span>" + val.instanceType + "</span></label><br/>" +
			"<label>公有IP：<span>" + val.publicIpAddress + "</span></label><br/>" +
			"<label>私有IP：<span>" + val.privateIpAddress +  "</span></label><br/>" +
			"<label>密钥：<span>" + val.keyName.substring(0,5) + "</span>&nbsp;&nbsp;" +
			"<a href='" +val.keyPairUrl + "' data-toggle='tooltip' title='点击下载连接密钥'><i class='ace-icon fa fa-download blue'></i></a></label><br/>"
		);
	});

	/*显示释放资源那妞*/
	$("#startBtn").addClass('layui-hide');
	$("#terminationBtn").removeClass('layui-hide');
	$("#resouceTab .layui-progress").addClass('layui-hide');
	$("#progressTitle").addClass('layui-hide');
}

/**
 * 进度条初始化
 */
function initElement(){
	layui.use('element', function(){
	  	element = layui.element;
      	
	});
}

/**  
 * 产生随机整数，包含下限值，但不包括上限值  
 * @param {Number} lower 下限  
 * @param {Number} upper 上限  
 * @return {Number} 返回在下限到上限之间的一个随机整数  
 */  
function random(lower, upper) {  
    return Math.floor(Math.random() * (upper - lower)) + lower;  
}



// 全局实验组信息List
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
	      area: ['1000px', '600px'],
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
			
			if(item.email == null){
				str += '<td></td>';
			}else{
				str += '<td>'+item.email+'</td>';
			}
			
			if(item.phoneNum == null){
				str += '<td></td>';
			}else{
				str += '<td>'+item.phoneNum+'</td>';
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
							<div class="row" style="width:90.3%;margin-left: 10px;margin-top: 20px;">\
								<table class="table table-hover" style="width:98%;">\
									<colgroup>\
										<col >\
										<col >\
										<col >\
										<col >\
										<col >\
										<col >\
										<col >\
										<col >\
									</colgroup>\
									<thead>\
										<tr>\
											<th>姓名</th>\
											<th>学号</th>\
											<th>院系</th>\
											<th>专业</th>\
											<th>年级</th>\
											<th>班级</th>\
											<th>邮箱</th>\
											<th>手机</th>\
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
