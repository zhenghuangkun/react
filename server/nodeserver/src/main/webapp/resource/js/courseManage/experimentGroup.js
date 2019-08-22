/****实验组程管理*******/
// 所有实验组datatables
var allExperimentGroupTb = null;

// 配置实验组datatables 对象
var experimentGroupTb = null;

var theadHtml = '<tr style="height:32px;width:100% !important;"><td style="width: 36px !important;height:32px;"><label class="pos-rel"><input type="checkbox" class="ace" onchange="changeAll(this)"><span class="lbl"></span></label></td><td style="width: 85px !important;height:32px;padding-left:30px;">姓名</td><td style="width: 213px !important;height:32px;padding-left:40px;">院系</td><td style="width: 163px !important;height:32px;">专业</td><td style="width: 70px;">年级</td><td  style="width: 141px !important;height:32px;">手机</td></tr>';

/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	
	//初始化所有实验组table
	initAllExperimentGroupTable();
	
	//初始化配置实验组table
	initExperimentGroupTable();
	
	/*$('.tableBody').find('table').eq(0).each(function(){
		var item = this;
		//alert(item);
		var width = item.width;
		//$(item).empty();
		
		//$(item).append(theadHtml);
        //$("#showResult").append(html);
	});*/
	
	//layuiTable();
});

function doSearch(){
	allExperimentGroupTb.ajax.reload();
}

/* 以下是所有实验组相关函数信息 */
function initAllExperimentGroupTable(){
	allExperimentGroupTb = $('#allExperimentGroupTb').DataTable({
		ajax: {
			url: contextPath + '/course/getAllExperimentGroupInfo.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.groupName = $('#groupName').val();
				//params.state = $('#inputState').val();
				//params.type = type;
				
			}
		},
		stateSave: true,
		lengthChange: true,
		searching: false,
		info: true,
		autoWidth: false,
		serverSide: true,
		ordering: false, //开启排序
		pagingType: "full_numbers",
		iDisplayLength: 10,
		lengthMenu: [10, 50, 100],
		/*select: {
			style: 'multi',
			info: true
		},*/
		columns: [
	          /*{"bSortable": false, "width": "10%", "title": '<label class="pos-rel">' + 
					   		   '<input type="checkbox" class="ace" onchange="changeAllGroup(this)">' +
					   		   '<span class="lbl"></span>' +
					   		   '</label>',
	        	  "render":function(data, type, row, meta){
					   return '<label class="pos-rel">' + 
					   		   '<input type="checkbox" class="ace">' +
					   		   '<span class="lbl"></span>' +
					   		   '</label>';
				   }
	          },*/
	          {"data": "groupId", "title": "Id", "visible": false},
	          {"data": "state", "title": "state", "visible": false},
	          {"data": "groupName", "title": "组名", "width": "25%"},
	          {"data": "createAuthorId", "title": "createId", "visible": false},
	          {"data": "createAuthorName", "title": "创建者", "width": "20%",
	        	  "render":function(data, type, row, meta){
	        		  if(data == null){
	        			  return "";
	        		  }else{
	        			  return data;
	        		  }
	        	  }
	          },
	          {"data": "memberNum", "title": "组人数", "width": "15%",
	        	  "render":function(data, type, row, meta){
	        		  if(data == null){
	        			  return "0人";
	        		  }else{
	        			  return data+"人";
	        		  }
	        	  }
	          },
	          {"data": "courseNum", "title": "关联的课程数", "width": "15%",
	        	  "render":function(data, type, row, meta){
	        		  if(data == null){
	        			  return "0门";
	        		  }else{
	        			  return data+"门";
	        		  }
	        	  }
	          },
	          {
				"data": "opt",
				"title": "",
				"render": function (data, type, row, meta) {
					if(row.state == 1){
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-success' onclick='showGroupDetailInfo(this)' >" +
						"<i class='ace-icon fa fa-search-plus bigger-120'>详细信息</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-info' onclick='modifyExperimentGroup(this)' >" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"</div>"+
						"<button class='btn btn-xs btn-danger' onclick='disableExperimentGroup(\""+row.groupId+"\")' >" +
						"<i class='ace-icon fa fa-times bigger-120'>禁用</i>" +
						"</button>" +
						"</div>";
					}else if(row.state == 0){
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-success' onclick='showGroupDetailInfo(this)' >" +
						"<i class='ace-icon fa fa-search-plus bigger-120'>详细信息</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-info' onclick='modifyExperimentGroup(this)' >" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"</div>"+
						"<button class='btn btn-xs btn-primary' onclick='enableExperimentGroup(\""+row.groupId+"\")' >" +
						"<i class='ace-icon fa fa-check bigger-120'>启用</i>" +
						"</button>" +
						"</div>";
					}
					
				}
				}
			],

			language: {
				url: contextPath + "/resource/json/language-zh.json"
			}
	});
	
	

}

/**
 * 显示组详细信息
 * @param row
 */
function showGroupDetailInfo(obj){
	// 取得行元素
	row = allExperimentGroupTb.row( $(obj).parents('tr') );
	
	//取得行数据
	rowData = row.data();
	
	var html = initExperimentGroupHtml(rowData);
	
	//location = contextPath + '/coursemg/experimentGroupDetail';
	
	
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

/**
 * 禁用实验组
 * @param obj
 */
function disableExperimentGroup(groupId){
	/* 禁用实验组请求 */
	layer.confirm("禁用之后课程将不能关联该实验组", {
		icon: 3,
		title: "确认消息"
	}, function () {
		
		//请求发布课程
		$.ajax({
			url : contextPath +'/experiment/disableExperimentGroup',
			type : 'POST',
			traditional: true,//后台接收数组
			dataType: "json",
			data :{
				'groupId': groupId
			},
			success : function(data) {
				if(data.resultFlag == true){
					allExperimentGroupTb.ajax.reload(); //重新加载信息
					layer.close(layer.index); //关闭提示层
					layer.msg('禁用成功', {icon: 6});
				}
			}
		});
	});
}

/**
 * 启用实验组
 * @param obj
 */
function enableExperimentGroup(groupId){
	/* 启用实验组请求 */
	layer.confirm("确认启用该实验组吗?", {
		icon: 3,
		title: "确认消息"
	}, function () {
		
		//请求发布课程
		$.ajax({
			url : contextPath +'/experiment/enableExperimentGroup',
			type : 'POST',
			traditional: true,//后台接收数组
			dataType: "json",
			data :{
				'groupId': groupId
			},
			success : function(data) {
				if(data.resultFlag == true){
					allExperimentGroupTb.ajax.reload(); //重新加载信息
					layer.close(layer.index); //关闭提示层
					layer.msg('启用成功', {icon: 6});
				}
			}
		});
	});
}


function initExperimentGroupHtml(obj){
	
	var state = "可用";
	if(obj.state == 0){
		state = "不可用";
	}
	
	var member = "";
	$.each(obj.children, function(index, item){
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
											<span>'+ obj.groupName +'</span>\
										</div>\
									</div>\
									<div class="profile-info-row">\
										<div class="profile-info-name"> 创建时间 </div>\
										<div class="profile-info-value">\
											<i class="fa fa-map-marker light-orange bigger-110"></i>\
											<span>'+ obj.createDate +'</span>\
										</div>\
									</div>\
									<div class="profile-info-row">\
										<div class="profile-info-name"> 创建者 </div>\
										<div class="profile-info-value">\
											<span>'+ obj.createAuthorName +'</span>\
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
											<span>'+ obj.memberNum +'人</span>\
										</div>\
									</div>\
									<div class="profile-info-row">\
										<div class="profile-info-name"> 关联课程数 </div>\
										<div class="profile-info-value">\
											<span>'+ obj.courseNum +'</span>\
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
	
	return html;
}







/*以下是配置实验组相关函数信息*/
var studentDefPic = contextPath + "/resource/images/courseManage/studentDefault2.jpg";
/**
 * 搜索
 */
function doSearchStudent(){
	experimentGroupTb.ajax.reload();
}
function initExperimentGroupTable(){
	//$("#experimentGroupTb").DataTable().destroy();
	experimentGroupTb = $('#experimentGroupTb').DataTable({
		ajax: {
			url: contextPath + '/course/getStudentInfo.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.findValue = $('#studentSearch').val();
				params.collegeId = $('#groupCollegeId').val();
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
		processing: false,
		pagingType: "full_numbers",
		/*paging: false,
		scrollY: 200,*/
		iDisplayLength: 10,
		lengthMenu: [5, 10, 50, 100],
		//destroy: true,
		//dom: '<"row tableFiter"<"col-sm-6"l><"col-sm-6"f>><"tableBody"tr><"row bottomInfo"<"col-sm-6"i><"col-sm-6"p>><"clear">',
		dom: '<"tableFiter"><"tableBody"tr><"row bottomInfo"<"col-sm-4"i><"col-sm-8"p>><"clear">',
		/*fixedHeader: true,
		fixedColumns: true,*/
		select: {
			style: 'multi',
			info: false
		},
		search: {
		    "search": "", //默认初始化搜索内容
		    "caseInsensitive": false // 忽略大小写
		},
		columns: [
		          {"bSortable": false, "width": "1%", "title": '<label class="pos-rel">' + 
						   		   '<input type="checkbox" class="ace" id="selectAll" onchange="changeAll(this)">' +
						   		   '<span class="lbl"></span>' +
						   		   '</label>',
						   		   
		        	  "render":function(data, type, row, meta){
						   return '<label class="pos-rel">' + 
						   		   '<input type="checkbox" class="ace">' +
						   		   '<span class="lbl"></span>' +
						   		   '</label>';
					   }
		          },
		          {"data": "realName", "title": "姓名", "width": "14% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(row.picFileUrl == null || row.picFileUrl == ""){
		        			  return "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>" + data;
		        		  }else{
		        			  return "<img class='studentDefPic' alt='匿名用户' src='"+row.picFileUrl+"'>" + data;
		        		  }
		        	  }
		          },
		          {"data": "mechanismName", "title": "院系", "width": "28% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "mechanismId", "title": "院系", "visible": false},
		          {"data": "majorName", "title": "专业", "width": "19% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "major", "title": "专业","visible": false},
		          {"data": "gradeName", "title": "年级", "width": "8% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "email", "title": "邮箱", "width": "15% !important"},
		          {"data": "phoneNum", "title": "手机", "width": "15% !important"},
				],
		language: {
			/*"sProcessing": "<img src='/images/datatable_loading.gif'>  努力加载数据中.",
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sInfo": "共 _TOTAL_ 条数据  &nbsp;",
			"sInfoEmpty": "",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)&nbsp;",
			"sZeroRecords": "没有检索到数据&nbsp;",  没有检索到数据时的提示 
			"sSearch": "表内检索:  "   搜索框的文字提示 */
			/*"oPaginate": {
			    "sFirst": '<i class="fa fas fa-angle-double-left"></i>',
			    "sPrevious": '<i class="fa fas fa-angle-left"></i>',
			    "sNext": '<i class="fa fas fa-angle-right"></i>',
			    "sLast": '<i class="fa fas fa-angle-double-right"></i>'
			},*/
				
			"sProcessing": "<img src='/images/datatable_loading.gif'>  努力加载数据中.",
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"sZeroRecords": "没有检索到数据",
			"sSearch": "表内检索:  ",
			/*"oPaginate": {
			    "sFirst": "首页",
			    "sPrevious": "前一页",
			    "sNext": "后一页",
			    "sLast": "尾页"
			}*/
			"oPaginate": {
			    "sFirst": '<i class="fa fas fa-angle-double-left"></i>',
			    "sPrevious": '<i class="fa fas fa-angle-left"></i>',
			    "sNext": '<i class="fa fas fa-angle-right"></i>',
			    "sLast": '<i class="fa fas fa-angle-double-right"></i>'
			},
		}/*,
		initComplete: function( settings, json ) {
			// 初始化完成之后将服务器模式
			//alert( '1111111111111111111111' );
		    settings.oFeatures.bServerSide = false;
		},
		drawCallback: function( settings ) {
			settings.oFeatures.bServerSide = false;
	        alert( '222222222222222222' );
	    },
		preDrawCallback: function( settings ) {
			alert( settings.oFeatures.bServerSide );
			settings.oFeatures.bServerSide = true;
		}*/
	});
	
	
	experimentGroupTb.on( 'select', function ( e, dt, type, index ) {
		if ( type === 'row' ) {
			$( experimentGroupTb.row( index ).node() ).find('input:checkbox').prop('checked', true);
		}
	} );
	experimentGroupTb.on( 'deselect', function ( e, dt, type, index ) {
		if ( type === 'row' ) {
			$( experimentGroupTb.row( index ).node() ).find('input:checkbox').prop('checked', false);
		}
	} );
	
	
	experimentGroupTb.on( 'click', 'input[type=checkbox]', function (index) {
		
		var th_checked = this.checked;
		var row = experimentGroupTb.row( $(this).parents('tr') );
		if(th_checked){
			// 当前为选中时设置为未选中， 并去掉select 
			this.checked = false;
			experimentGroupTb.row(row).deselect();
		}else{
			
			this.checked = true;
			
			experimentGroupTb.row(row).select();
		}
		
	} );
	
	//改变页时 设置头选择框为未选中
	experimentGroupTb.on( 'page.dt', function () {
		$("#selectAll").get(0).checked = false;
	});
}


//表头选中-遍历所有tr，并设置选中
function changeAll(obj){
	var th_checked = obj.checked;//checkbox inside "TH" table header
	
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		if(th_checked){
			obj.checked = false;
			experimentGroupTb.row(row).deselect();
		} 
		else{
			obj.checked = true;
			experimentGroupTb.row(row).select();
			
		}
	});
	
}

/*
 * 改变学院函数
 */
function experimentGroupChangeCollege(obj){
	experimentGroupTb.ajax.reload();
}

var studentArray = new Array();

//添加当前页的所有学生
function addPageAllStudentFunc(){
	
	
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		//选中则将ID添加到数组
		var rdata = experimentGroupTb.row( row ).data();
		var studentId = rdata.id; // 取得选择行的学生ID
		var realName = rdata.realName; // 取得选择行的学生真实名
		var picFileUrl = rdata.picFileUrl; // 取得选择行的学生头像
		var flag = $.inArray(studentId, studentArray); //判断数组中是否存在这个ID
		if(flag == -1){
			//不存在则添加到数组中
			studentArray.push(studentId);
			var str = "<tr class='studentItem studentNoCheck' data-studentId='"+ studentId +"' onclick='selectOptionFunc(this)'><td>";
			if(picFileUrl == null || picFileUrl == ""){
				str += "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>&nbsp;";
      		}else{
      			str += "<img class='studentDefPic' alt='匿名用户' src='"+picFileUrl+"'>&nbsp;";
      		}
			
			str += realName + "</td></tr>";
			$("#studentList").append(str);
		}
	});
	
	var sLength = studentArray.length;
	$("#studentNum").text(sLength);
}

/**
 * 添加学生信息到数组
 */
function addStudentFunc(){
	/* 将学生列表转成数组 */
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		var th_checked = $( experimentGroupTb.row( row ).node() ).find('input:checkbox').is(":checked"); //判断是否选中， true选中  false未选中
		if(th_checked) {
			//选中则将ID添加到数组
			var rdata = experimentGroupTb.row( row ).data();
			var studentId = rdata.id; // 取得选择行的学生ID
			var realName = rdata.realName; // 取得选择行的学生真实名
			var picFileUrl = rdata.picFileUrl; // 取得选择行的学生头像
			var flag = $.inArray(studentId, studentArray); //判断数组中是否存在这个ID
			if(flag == -1){
				//不存在则添加到数组中
				studentArray.push(studentId);
				var str = "<tr class='studentItem studentNoCheck' data-studentId='"+ studentId +"' onclick='selectOptionFunc(this)'><td>";
				if(picFileUrl == null || picFileUrl == ""){
					str += "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>&nbsp;";
	      		}else{
	      			str += "<img class='studentDefPic' alt='匿名用户' src='"+picFileUrl+"'>&nbsp;";
	      		}
				
				str += realName + "</td></tr>";
				$("#studentList").append(str);
			}
		}
		
	});
	
	var sLength = studentArray.length;
	$("#studentNum").text(sLength);
}

/**
 * 清除选中的学生
 */
function cleanSelectStudentFunc(){
	
	$("#studentList").find('tr').each(function(){
		var tr = this;
		var flag = $(tr).hasClass('studentCheck');
		if(flag){
			var studentId = $(tr).attr('data-studentId');
			//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
			//inArray() 查找参数1 在数组studentArray中出现的位置。返回-1 表示没有                   
			studentArray.splice($.inArray(studentId, studentArray), 1);
			$(tr).remove();
			
			$("#studentNum").text(studentArray.length);
		}
	});
	
}

/**
 * 清除所有的学生数组
 */
function cleanStudentFunc(){
	studentArray.length = 0;
	$("#studentNum").text("0");
	$("#studentList").html("");
}


function selectOptionFunc(obj){
	var flag = $(obj).hasClass('studentNoCheck');
	if(flag){
		$(obj).removeClass('studentNoCheck');
		$(obj).addClass('studentCheck');
	}else{
		$(obj).removeClass('studentCheck');
		$(obj).addClass('studentNoCheck');
	}
	
}

var gloabGroupId = "";

function submitExperimentGroupInfoFunc(){
	if(studentArray.length <= 0 ){
		
		layer.msg('您还没添加学生,请先添加.', {icon: 4});
		return;
		
	}		

	var groupName = $('#groupNameConfig').val();
	if(groupName == "" ){
		
		layer.msg('组名不能为空', {icon: 5});
		return;
		
	}

	$.ajax({
		url : contextPath +'/course/addNewExperimentGroup.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'groupName': groupName,
			'studentArray':studentArray,
			'groupId':gloabGroupId
		},
		success : function(data) {
			if(data.resultFlag == true){
				layer.confirm(data.message, {
					icon: 1,
					title: "提示",
					closeBtn:false,
					btn: ['确定']
				}, function () {
					//返回课程信息界面
					$('#ExperimentGroupConfigure').modal('hide');
					/*$("#groupName").val("");*/
					$("#studentNum").text("0");
					$("#studentSearch").val("");
					$("#studentList").html("");
					studentArray.length = 0;
					allExperimentGroupTb.ajax.reload();
					layer.close(layer.index);
					layer.close(index);
				});
			}else{
				
				layer.msg(data.message, {icon: 5});
			}
			
			
			gloabGroupId = "";
		}
	});
	
	/*layer.prompt({
				title: '输入组名，并确认', 
				formType: 0,
				value: '', //初始时的值，默认空字符
				maxlength: 32, //可输入文本的最大长度，默认500
			}, function(val, index){
		if(val == ""){
			layer.msg('组名不能为空', {icon: 5});
		}else{
			$.ajax({
				url : contextPath +'/course/addNewExperimentGroup.do',
				type : 'POST',
				traditional: true,//后台接收数组
				dataType: "json",
				data :{
					'groupName': val,
					'studentArray':studentArray
				},
				success : function(data) {
					if(data.resultFlag == true){
						layer.confirm("添加成功", {
							icon: 1,
							title: "提示",
							closeBtn:false,
							btn: ['确定']
						}, function () {
							//返回课程信息界面
							$('#ExperimentGroupConfigure').modal('hide');
							$("#groupName").val("");
							$("#studentNum").text("0");
							$("#studentSearch").val("");
							$("#studentList").html("");
							studentArray.length = 0;
							allExperimentGroupTb.ajax.reload();
							layer.close(layer.index);
							layer.close(index);
						});
					}else{
						
						layer.msg(data.message, {icon: 5});
					}
					
				}
			});
		}
	});*/
	
}

function showModifyExperimentGroupModal(){
	$("#studentSearch").val("");
	studentArray.length = 0;
	// 清空已选学生列表
	$("#studentList").html("");
	$.each(rowData.children, function(index, item){
		
		var studentId = item.id;
		
		var picFileUrl = item.picFileUrl; // 取得学生头像url
		
		
		//添加到数组中
		studentArray.push(studentId);
		var str = "<tr class='studentItem studentNoCheck' data-studentId='"+ studentId +"' onclick='selectOptionFunc(this)'><td>";
		if(picFileUrl == null || picFileUrl == ""){
			str += "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>&nbsp;";
  		}else{
  			str += "<img class='studentDefPic' alt='匿名用户' src='"+picFileUrl+"'>&nbsp;";
  		}
		
		str += item.realName + "</td></tr>";
		$("#studentList").append(str);
		
		
	});
	
	// 设置已选学生人数
	$("#studentNum").text(studentArray.length);
	
	// 设置组名label
	$("#groupNameLabel").text(rowData.groupName);
	
	// 设置组名input编辑的初始值
	$("#groupNameConfig").val(rowData.groupName);
	
	// 删除组名label 的隐藏class
	$("#groupNameLabel").removeClass('myhidden');
	
	// 添加组名input 的隐藏class
	$("#groupNameConfig").addClass('myhidden');
	
	// 编辑button 删除隐藏class
	$("#edmitGroupName").removeClass('myhidden');
	
	
	gloabGroupId = rowData.groupId;
	
	$('#ExperimentGroupConfigure').modal('show');
}

/**
 * 添加学生到实验组
 * @param obj
 */
function modifyExperimentGroup(obj){
	// 取得行元素
	row = allExperimentGroupTb.row( $(obj).parents('tr') );
	
	//取得行数据
	rowData = row.data();
	
	var courseNum = rowData.courseNum;
	if(courseNum > 0){
		layer.confirm("已有课程使用了该实验组,确定继续修改吗？", {
			icon: 3,
			title: "提示",
			btn: ['取消', '确定']
		}, function () {
			//取消， return
			layer.close(layer.index); //关闭提示层
			return;
		},function (){
			//确定
			layer.close(layer.index); //关闭提示层
			showModifyExperimentGroupModal();
		});
	}else{
		showModifyExperimentGroupModal();
	}
	
	
}



/**
 * 修改组名按钮按下
 */
function edmitGroupNameFunc(){
	
	// 设置组名label 添加隐藏class
	$("#groupNameLabel").addClass('myhidden');
	
	// 设置组名input 删除隐藏class
	$("#groupNameConfig").removeClass('myhidden');
	
	// 编辑button 添加的隐藏class
	$("#edmitGroupName").addClass('myhidden');
	
	// 取消button 删除隐藏class
	$("#cancelEdmit").removeClass('myhidden');
	
	// 确定button 删除隐藏class
	$("#confirmEdmit").removeClass('myhidden');
	
	// 设置确定添加button 为非活性，不可点击
	$("#modifyExperimentBt").attr("disabled", true); 
}

/**
 * 取消按钮按下
 */
function cancelEdmitFunc(){
	
	var groupName = $('#groupNameLabel').text();
	
	$('#groupNameConfig').val(groupName);
	
	// 组名label 删除隐藏class
	$("#groupNameLabel").removeClass('myhidden');
	
	// 组名input 添加的隐藏class
	$("#groupNameConfig").addClass('myhidden');
	
	// 编辑button 删除隐藏class
	$("#edmitGroupName").removeClass('myhidden');
	
	// 取消button 添加隐藏class
	$("#cancelEdmit").addClass('myhidden');
	
	// 确定button 添加隐藏class
	$("#confirmEdmit").addClass('myhidden');
	
	// 设置确定添加button 为活性，可点击
	$("#modifyExperimentBt").attr("disabled", false); 
}

/**
 * 确定按钮按下
 */
function confirmEdmitFunc(){
	
	

	var groupName = $("#groupNameConfig").val();
	if(groupName == "" ){
		
		layer.msg('组名不能为空', {icon: 5});
		return;
	}
	
	
	$('#groupNameLabel').text(groupName);
	
	// 组名label 删除隐藏class
	$("#groupNameLabel").removeClass('myhidden');
	
	// 组名input 添加的隐藏class
	$("#groupNameConfig").addClass('myhidden');
	
	// 编辑button 删除隐藏class
	$("#edmitGroupName").removeClass('myhidden');
	
	// 取消button 添加隐藏class
	$("#cancelEdmit").addClass('myhidden');
	
	// 确定button 添加隐藏class
	$("#confirmEdmit").addClass('myhidden');
	
	// 设置确定添加button 为活性，可点击
	$("#modifyExperimentBt").attr("disabled", false); 
}


// 添加实验组处理函数
function showExperimentGroupConfigureModal(){
	gloabGroupId = "";
	
	// 清除查询框的值
	$("#studentSearch").val("");
	
	// 清空选中学生的数组
	studentArray.length = 0;
	// 设置已选学生人数
	$("#studentNum").text("0");
	// 清空已选学生列表
	$("#studentList").html("");
	
	
	// 组名label 添加隐藏class
	$("#groupNameLabel").addClass('myhidden');
	
	// 组名input 删除隐藏class
	$("#groupNameConfig").removeClass('myhidden');
	// 设置输入框初始值为空
	$("#groupNameConfig").val("");
	
	// 编辑button 添加隐藏class
	$("#edmitGroupName").addClass('myhidden');
	
	// 取消button 添加隐藏class
	$("#cancelEdmit").addClass('myhidden');
	
	// 确定button 添加隐藏class
	$("#confirmEdmit").addClass('myhidden');
	
	$('#ExperimentGroupConfigure').modal('show');
}


function layuiTable(){
	layui.use('table', function(){
		  var table = layui.table;
		  
		  //第一个实例
		  table.render({
		    elem: '#experimentGroupTb',
		    height: 315,
		    url: contextPath + '/course/getStudentInfo.do', //数据接口
		    method: 'post',
		    request: {
		    	  findValue: $('#studentSearch').val()
		    }, 
		    page: true, //开启分页
		    cols: [[ //表头
				 {checkbox: true}, 
				 {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'},
				 {field: 'realName', title: '姓名', width:80},
				 {field: 'mechanismName', title: '院系', width:80, sort: true},
				 {field: 'mechanismId', title: '院系ID', width:80, sort: true},
				 {field: 'majorName', title: '专业', width:80} ,
				 {field: 'major', title: '专业ID', width: 177},
				 {field: 'gradeName', title: '年级', width: 80, sort: true},
				 {field: 'phoneNum', title: '手机', width: 80, sort: true}
		    ]]
		  });
	});
}
