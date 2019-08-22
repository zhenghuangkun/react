/****中心管理员管理*******/
var zeroData=0;//学校名称
var stuTB = "";
var selectData=null;
var available=1;//可用状态
var noavailable=0;//删除状态
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	/*用户列表初始化*/
	formValidator();//表单验证
	
	initstuTB();
	
	showAddUserModel();//点击页面的添加，将添加的用户Model显示出来
	
	selectOrg();//显示学校名称（机构名称）的下拉列表，将下拉列表显示在添加数据的页面上
	
	getMechanismPid();//显示学校学院的下拉列表，将下拉列表显示在添加数据的页面上
	
	getMechanismMajor();//显示专业下拉列表，将下拉列表显示在添加数据的页面上
	
	getMechanismGrade();//显示年级下拉列表，将下拉列表显示在添加数据的页面上
	
	getMechanismClasses();//显示班级下拉列表，将下拉列表显示在添加数据的页面上
	
	editUserData();//编辑用户管理的数据，将数据提交到后台将数据存储起来
	
	addUserData();//添加用户管理的数据，将数据提交到后台将数据存储起来
	
	downloadExcelModel();//下载Excel批量导入数据的模板
	
	uploadExcelData();//导入Excel表格数据
});

/**
 * 校验重置重点在这里 当modal隐藏时销毁验证再重新加载验证
 */
$('#userStuModel').on('hidden.bs.modal', function () {
	pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
});

/**
 * 当页面的校验发生改变的时候，重新的获取页面的校验
 */
function pageValidator() {
   $('#userStuForm').data('bootstrapValidator').destroy();
   $('#userStuForm').data('bootstrapValidator', null);
   formValidator();    //重新加载验证
}

/**
 * 显示学校名称（机构名称）的下拉列表，将下拉列表显示在添加数据的页面上
 */
function selectOrg(){
	selectData=new Array();
	$.ajax({
		url : contextPath +'/awsaccount/findMechanismName',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"mechanismPid":zeroData},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				selectData.push(data[i].mechanismId);
				insertText += "<option value="+data[i].mechanismId+">"+data[i].mechanismName+"</option>";
				}
			$("#schoolId").append(insertText);
		}
	})
}

/**
 * 绑定学校名称（机构名称）下拉列表change事件，当下来列表改变时显示不同的学院账户
 */
function getMechanismPid(){
	$("#schoolId").change(function() {
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		$("#mechanismId option:not(:first)").remove();
		$("#major option:not(:first)").remove();
		$("#grade option:not(:first)").remove();
		$("#classes option:not(:first)").remove();
		var org=$(this).children('option:selected').val();
		findByMechanismData(org);//获取学院列表数据
	});
}

/**
 * 获取学院列表数据
 * @param org
 */
function findByMechanismData(org){
	$.ajax({
		url : contextPath +'/userManage/getDepartmentName',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"mechanismPid":org},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].mechanismId+">"+data[i].mechanismName+"</option>";
				}
			$("#mechanismId").append(insertText);
		}
	});
}

/**
 * 绑定学院下拉列表change事件，当下来列表改变时显示不同的专业
 */
function getMechanismMajor(){
	$("#mechanismId").change(function() {
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		$("#major option:not(:first)").remove();
		$("#grade option:not(:first)").remove();
		$("#classes option:not(:first)").remove();
		var org=$(this).children('option:selected').val();
		findByMechanismMajor(org);//获取专业列表数据
	});
}


/**
 * 获取专业列表数据
 * @param org
 */
function findByMechanismMajor(org){
	$.ajax({
		url : contextPath +'/awsaccount/findMechanismName',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"mechanismPid":org},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].mechanismId+">"+data[i].mechanismName+"</option>";
				}
			$("#major").append(insertText);
		}
	});
}

/**
 * 绑定专业下拉列表change事件，当下来列表改变时显示不同的年级
 */
function getMechanismGrade(){
	$("#major").change(function() {
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		var org=$(this).children('option:selected').val();
		$("#grade option:not(:first)").remove();
		$("#classes option:not(:first)").remove();
		findByMechanismGrade(org);//获取年级列表数据
	});
}

/**
 * 获取年级列表数据
 * @param org
 */
function findByMechanismGrade(org){
	$.ajax({
		url : contextPath +'/awsaccount/findMechanismName',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"mechanismPid":org},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].mechanismId+">"+data[i].mechanismName+"</option>";
				}
			$("#grade").append(insertText);
		}
	});
}

/**
 * 绑定年级下拉列表change事件，当下来列表改变时显示不同的班级
 */
function getMechanismClasses(){
	$("#grade").change(function() {
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		var org=$(this).children('option:selected').val();
		$("#classes option:not(:first)").remove();
		findByMechanismClasses(org);//获取班级列表数据
	});
}

/**
 * 获取班级列表数据
 * @param org
 */
function findByMechanismClasses(org){
	$.ajax({
		url : contextPath +'/awsaccount/findMechanismName',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"mechanismPid":org},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].mechanismId+">"+data[i].mechanismName+"</option>";
				}
			$("#classes").append(insertText);
		}
	});
}

/****************************************
 * 查询
 ****************************************/
function doSearch() {
	stuTB.ajax.reload();
}

/****************************************
 * 管理员列表初始化
 ****************************************/
function initstuTB(){
	stuTB = $("#stuTb").DataTable({
		ajax: {
			url: contextPath + '/userManage/selectUserStuManageData',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.inputUnitName = $('#searchData').val();
				return params;
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
		lengthMenu: [10,30,50,100],
		columns: [
					{
						"data": "stuId",
						"title": "学号",
						"defaultContent":''
					},
					{
						"data": "realName",
						"title": "姓名",
						"defaultContent":''
					}, {
						"data": "schoolName",
						"title": "学校",
						"defaultContent":''
					}, {
						"data": "mechanismName",
						"title": "学院",
						"defaultContent":''
					}, {
						"data": "majorName",
						"title": "专业",
						"defaultContent":''
					}, {
						"data": "gradeName",
						"title": "年级",
						"defaultContent":''
					}, {
						"data": "classesName",
						"title": "班级",
						"defaultContent":''
					},{
						"data": "phoneNum",
						"title": "电话",
						"defaultContent":''
					}, {
						"data": "email",
						"title": "邮箱",
						"defaultContent":''
					}, {
						"data": "userState",
						"title": "账号状态",
						"render": function (data, type, row, meta) {
							switch (data) {
								case 0:
									return "不可用";
									break;
								case 1:
									return "可用";
									break;
								default:
									return "";
									break;
							}
						},
						"defaultContent":''
					},{
				"data": "opt",
				"title": "操作",
				"render": function (data, type, row, meta) {
					if(row.userState==0){//已经被禁用的用户账号信息不能被编辑和删除
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info' disabled='disabled'><i class='ace-icon fa fa-pencil bigger-120'>编辑</i></button>" +
						"<button class='btn btn-xs btn-danger' disabled='disabled'><i class='ace-icon fa fa-trash-o bigger-120'>禁用</i></button>" +
						"<button class='btn btn-xs btn-success'  onclick='activationStu(" + '"' + row.id + '"' +")'><i class='ace-icon fa fa-pencil bigger-120'>激活</i></button>" +
						"</div>";
					}else {
						return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info'  onclick='editUser(" + '"' + row.id + '"' +")'>" +
						"<i class='ace-icon fa fa-pencil bigger-120'>编辑</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='deleteUser(" + '"' + row.id + '"' +")'>" +
						"<i class='ace-icon fa fa-trash-o bigger-120'>禁用</i>" +
						"</button>" +
						"</div>";
					}
					
				}
					
			}
		],
		language: {
			url: contextPath + "/resource/json/language-zh.json"
		}
	})
}

/**
 * 假删除用户列表上的数据
 */
function deleteUser(id){
	layer.confirm('您确定要禁用该学生信息吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/userManage/deleteUserStuData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id,"userState":noavailable},
		success : function(data) {
			if(data.success){
				stuTB.ajax.reload();
			}else{
				layer.alert("禁用学生信息失败!", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}


/**
 * 激活已被禁用的数据的数据
 */
function activationStu(id){
	layer.confirm('您确定要激活该学生吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/userManage/deleteUserStuData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id,"userState":available},
		success : function(data) {
			if(data.success){
				stuTB.ajax.reload();
			}else{
				layer.alert("激活该学生失败!", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}
/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value == arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 编辑用户信息
 * @param
 */
function editUser(id) {
	$("#addh4").hide();//添加标题
	$("#edith4").show();//编辑标题
	$("#addUserData").hide();//添加提交按钮
	$("#editUserData").show();//编辑提交按钮
	$("#mechanismId option:not(:first)").remove();
	$("#major option:not(:first)").remove();
	$("#grade option:not(:first)").remove();
	$("#classes option:not(:first)").remove();
	$('#userStuModel').modal('show');
	$.ajax({
		url : contextPath+'/userManage/getUserStuData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id},
		success : function(data) {
			$("#id").val(data.id);
			$("#stuId").val(data.stuId);
			$("#copyStuId").val(data.stuId);
			if(isInArray(selectData,data.schoolId)==true){				
				$("#schoolId").val(data.schoolId);//学校
				findByMechanismData(data.schoolId);
				$("#mechanismId").val(data.mechanismId);//院系
				findByMechanismMajor(data.mechanismId);//专业
				$("#major").val(data.major);
				findByMechanismGrade(data.major);//年级
				$("#grade").val(data.grade);
				findByMechanismClasses(data.grade);//班级
				$("#classes").val(data.classes);
			}else if(isInArray(selectData,data.schoolId)==false){
				$("#schoolId").val(-1);
				$("#mechanismId").val(-1);
				$("#major").val(-1);
				$("#grade").val(-1);
				$("#classes").val(-1);
			}
			$("#realName").val(data.realName);	
			$("#phoneNum").val(data.phoneNum);
			$("#copyPhoneNum").val(data.phoneNum);
			$("#email").val(data.email);
			$("#copyEmail").val(data.email);
			$("#birthday").val(data.birthday);
			$("#address").val(data.address);
		}
	});
}

/**
 * 添加用户管理的数据，将数据提交到后台将数据存储起来
 */
function addUserData() {
	$("#addUserData").click(function() {
		var url=contextPath +'/userManage/addUserStu';
		submitEditData(url);
	});
}

/**
 * 添加管理用户
 */
function showAddUserModel() {
	$("#showAddUserModel").click(function(){
		$("input[type='text']").val("");
		$("input[type='date']").val("");
		$("#schoolId").val(-1);
		$("#mechanismId option:not(:first)").remove();
		$("#major option:not(:first)").remove();
		$("#grade option:not(:first)").remove();
		$("#classes option:not(:first)").remove();
		$("#addh4").show();//添加标题
		$("#edith4").hide();//编辑标题
		$("#addUserData").show();//添加提交按钮
		$("#editUserData").hide();//编辑提交按钮
		$('#userStuModel').modal('show');
	});
}

/**
 * 编辑用户管理的数据，将数据提交到后台将数据存储起来
 */
function editUserData() {
	$("#editUserData").click(function (){
		var url=contextPath +'/userManage/editUserStu';
		submitEditData(url);
	});		
}

/**
 * 提交和编辑数据
 * @param url
 */
function submitEditData(url) {
	var bv = $('#userStuForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	
	var formData = $('#userStuForm').serializeJSON();
	console.log(formData);
	$.ajax({
		url : url,
		type : 'POST',
		data :JSON.stringify(formData),
		contentType : "application/json;charset=utf-8",
		dataType: "json",
		success : function(data) {
			if(data.resultFlag){
				$("#userStuModel").modal("hide");
				stuTB.ajax.reload();
			}else{
				layer.alert(data.message, {icon: 5});	
			}			
		}
	});
}


/**
 * 下载Excel批量导入数据的模板
 */
function downloadExcelModel() {
	$("#downLoadExcel").click(function(){
		$.post(contextPath + '/userManage/downloadExcelModel',"",function(res){
			location.href = contextPath +'/userManage/exportExcelModel';
		});	
	});
}

/****************************************
 * 导入Excel表格数据
 *@param
 *@return  
 ****************************************/
function uploadExcelData(){	
	$("#uploadExcel").click(function() {
	$("#errorMessage").text("");
	layer.open({
	      type: 1,
	      title :'批量导入数据',
	      area: ['420px', '270px'],
	      shadeClose: false, //点击遮罩关闭
	      content: "<div id='tb' style='padding:10px 0px 10px 40px;' ><div style='font-size: 15px;color: red;font-family: serif;'>请选择一个后缀为.xls的Excel文件上传</div><br><div class='layui-upload'><button type='button' class='layui-btn layui-btn-normal' id='test8'>选择文件</button></div><button class='layui-btn layui-btn-radius' id='test9' style='margin-top: 50px'>导入数据</button></div>",
	      success: function(layero, index){
	    	  uploadFile();
    	  },
	      cancel: function(index, layero){ }    
	    });	
	});
}
/**
 * 上传EXCEL文件
 */
function uploadFile() {
	var table = layui.table;
	var $ = layui.jquery;
	var upload = layui.upload;
	 //选完文件后不自动上传
	  upload.render({
	    elem: '#test8'
	    ,url: contextPath + '/userManage/uploadExcel'
	    ,accept: 'file' //普通文件
	    ,exts: 'xls' //只允许上传后缀为.xls文件上传
	    ,auto: false
	    ,bindAction: '#test9'
	    ,done: function(res){
	    	if(res.errorMessage!=undefined){
	    		errorOpenDialog();//下载导入失败的数据
			}else{
				layer.alert(res.resultMessage, {icon: 6},function(){
					stuTB.ajax.reload();
					layer.closeAll();
				});
			}
	    }
	  });
}
/**
 * 下载导入失败的数据
 */
function errorOpenDialog() {
	layer.open({type: 1,
		title :'批量导入结果详情',
		area: ['380px', '230px'],
		shadeClose: false, //点击遮罩关闭
		content: "<div id='error' style='padding:10px 30px 10px 30px;' ><div id='errorMessage' style='margin-top: 10px;font-size: 14px'></div><button class='layui-btn layui-btn-radius' style='margin-top: 55px' onclick='downloadErrorExcelData();'>异常数据下载</button></div>",
		success: function(layero, index){
		},
		cancel: function(index, layero){ 
			stuTB.ajax.reload();
			layer.closeAll();
		}    
	});	
	$("#errorMessage").append("您批量导入的数据有部分数据导入异常或学生学号、邮箱或电话号码已经存在，请点击“异常数据下载”，改正后再重新导入数据!");
}

/**
 * 下载批量导入Excel的异常数据
 */
function downloadErrorExcelData() {
	location.href =contextPath + '/userManage/errorExportExcelData';
	layer.closeAll();
}

/**
 * 表单验证
 */
function formValidator() {
	$('#userStuForm').bootstrapValidator({
		excluded:[":hidden"] ,//bootstrapValidator的默认配置
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			stuId: {
				validators: {
					notEmpty: {
						message: '学生学号不能为空！'
					},stringLength: {
						min: 6,
                        max: 12,
                        message: '学生学号在6到12之间'
                    }
				}
			},
			realName: {
				validators: {
					notEmpty: {
						message: '学生姓名不能为空！'
					},stringLength: {
                        max: 20,
                        message: '学生姓名不超过20字符'
                    }
				}
			},schoolId: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择学校名称!'
	                }
	            }	
			},mechanismId: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择学院名称!'
	                }
	            }	
			},major: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择专业!'
	                }
	            }	
			},grade: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择年级!'
	                }
	            }	
			},classes: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择班级!'
	                }
	            }	
			},
			phoneNum: {
				validators: {
					notEmpty: {
						message: '电话不能为空！'
					},
					regexp: {
						regexp: /^1\d{10}$/,
						message: '电话号码格式不正确'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: '邮箱不能为空！'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
						message: '电子邮箱格式不正确！'
					}
				}
			},
			address: {
				validators: {
					stringLength: {
                        max: 40,
                        message: '地址不超过40字符'
                    }
				}
			}
		}
	});
}
