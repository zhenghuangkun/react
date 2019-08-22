/****中心管理员管理*******/
var zeroData=0;//学校名称
var pfRoleType=1;//平台管理员的用户类型
var dmRoleType=2;//院系管理员的用户类型
var tcRoleType=3;//教师管理员的用户类型
var atRoleType=4;//助教管理员的用户类型
var userTB = "",accountData="",iamData="",departmentData="";
var selectData=null;
var roleType=$("#roleType").val();//用户类型
var userRvailable=1;//可用状态
var userNoavailable=0;//删除状态
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	/*用户列表初始化*/
	formValidator();//表单验证
	
	//isAwsIamCheck();//获取是否绑定IAM，如果改变按钮的选中就改变页面的显示情况
	
	selectOrg();//显示学校名称（机构名称）的下拉列表，将下拉列表显示在添加数据的页面上
	
	getAwsAccount();//绑定学校名称（机构名称）下拉列表change事件，当下来列表改变时显示不同的AwsAccount账户
	
	getIAMName();//绑定AwsAccount（AwsAccount名称）下拉列表change事件，当下来列表改变时显示不同的Aws IAM账户
	
	getMechanismPid();//显示学校学院的下拉列表，将下拉列表显示在添加数据的页面上
	
	initUserTB();//表格列表数据的显示
	
	showAddUserModel();//点击页面的添加，将添加的用户Model显示出来
	
	editUserData();//编辑用户管理的数据，将数据提交到后台将数据存储起来
	
	addUserData();//添加用户管理的数据，将数据提交到后台将数据存储起来
	
	
	
});

/**
 * 校验重置重点在这里 当modal隐藏时销毁验证再重新加载验证
 */
$('#addOrEditPaltFormModel').on('hidden.bs.modal', function () {
	 pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
});

/**
 * 当页面的校验发生改变的时候，重新的获取页面的校验
 */
function pageValidator() {
   $('#paltFormForm').data('bootstrapValidator').destroy();
   $('#paltFormForm').data('bootstrapValidator', null);
   formValidator();    //重新加载验证
}

/**
 * 获取是否绑定IAM，如果改变按钮的选中就改变页面的显示情况
 * 0是绑定 1不绑定
 */
/*function isAwsIamCheck() {
	$("#awsIamDiv").hide();
    $("#isAwsIam").on('change', function () {//（是/否）绑定IAM 
    	if(this.checked) {
    		$("#awsIamDiv").show();
    		$("#isAwsIams").val("0");
		}else {
			$("#awsIamDiv").hide();
    		$("#isAwsIams").val("1");
    		$("#IAM").val(" ");
		}
    });
}*/


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
		var org=$(this).children('option:selected').val();
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		$("#departmentId option:not(:first)").remove();
		$("#awsAccount option:not(:first)").remove();
		$("#IAM option:not(:first)").remove();
		$("#awsAccountDiv").hide();
		if($("#roleType").val()==pfRoleType){
			findByOrgAwsAccountData(org,"");//获取AwsAccount列表数据
		}else if($("#roleType").val()==dmRoleType || $("#roleType").val()==tcRoleType){//院系用户管理
			findByMechanismData(org);//获取学院列表数据
		}
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
			$("#departmentId").append(insertText);
		}
	});
}

/**
 * 绑定学校名称（机构名称）下拉列表change事件，当下来列表改变时显示不同的AwsAccount账户
 */
function getAwsAccount() {
	if($("#roleType").val()==dmRoleType){//院系用户管理
		$("#departmentId").change(function() {
			var schoolId=$("#schoolId").val();
			var departmentId=$(this).children('option:selected').val();
			pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
			$("#awsAccount option:not(:first)").remove();
			$("#IAM option:not(:first)").remove();
			$("#awsAccountDiv").hide();
			findByOrgAwsAccountData(schoolId,departmentId);//获取AwsAccount列表数据
		});
	}else if($("#roleType").val()==tcRoleType){//教师用户管理
		$("#departmentId").change(function() {
			var departmentId=$(this).children('option:selected').val();
			pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
			$("#IAM option:not(:first)").remove();
			findByIAMData("");//获取iam下拉列表数据
			if(departmentId==departmentData){
				getAwsIamDatas(iamData);//获取选中的行数据，根据Id获取要编辑的数据
			}
		});
	}
}

/**
 * 获取AwsAccount下拉列表数据
 */
function findByOrgAwsAccountData(org,departmentId) {
	$.ajax({
		url : contextPath +'/userManage/findByOrgAwsAccountData',
		async : false,
		type : 'post',
		data : {"org":org,"departmentId":departmentId},
		dataType : "json",
		success : function(data) {
			if(data=="" && org!=-1){
				if($("#roleType").val()==pfRoleType){//平台用户管理
					nullAwsAccount();//当前无可用AWS Account账户操作流程
				}else if($("#roleType").val()==dmRoleType && departmentId!=-1){//院系用户管理
					nullAwsAccount();//当前无可用AWS Account账户操作流程
				}
			}else{
				var insertText =  ""; 			
				for(var i = 0;i<data.length;i++){
					insertText += "<option value="+data[i].id+">"+data[i].accountName+"</option>";
				}
				$("#awsAccount").append(insertText);
			}
		}
	});
}


/**
 * 绑定AwsAccount（AwsAccount名称）下拉列表change事件，当下来列表改变时显示不同的Aws IAM账户
 */
function getIAMName() {
	$("#awsAccount").change(function() {
		var id=$(this).children('option:selected').val();
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		$("#IAM option:not(:first)").remove();
		getAwsAccounts(id);//获取账户ID
		findByIAMData(id)//获取iam下拉列表数据
		if(id==accountData){
			getAwsIamDatas(iamData);//获取选中的行数据，根据Id获取要编辑的数据
		}
	});
}


/**
 * 查询角色，用来显示对应用户的用户类型
 */
function findByRoleData(roleType){
	$.ajax({
		url : contextPath +'/userManage/findByRoleData',
		async : false,
		type : 'post',
		data : {"roleType":roleType},
		dataType : "json",
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].roleId+">"+data[i].roleName+"</option>";
			}
			$("#roleId").append(insertText);
		}
	});
}

/**
 * 获取iam下拉列表数据
 */
function findByIAMData(id) {
	$.ajax({
		url : contextPath +'/userManage/findByIAMData',
		async : false,
		type : 'post',
		data : {"accountId":id,"iamType":$("#iamType").val()},
		dataType : "json",
		success : function(data) {
			if(data=="" && id!=-1){
				if($("#copyIamName").val()==""){
					nullAwsIam();//当前无可用AWS IAM账户操作流程
				}
			}else{
				var insertText =  ""; 			
				for(var i = 0;i<data.length;i++){
					insertText += "<option value="+data[i].id+">"+data[i].iAMName+"</option>";
				}
				$("#IAM").append(insertText);
			}
		}
	});
}
/**
 * 获取账户ID
 */
function getAwsAccounts(id) {
	$.ajax({//获取账户ID
		url : contextPath +'/userManage/getAwsAccounts',
		async : false,
		type : 'post',
		data : {"id":id},
		dataType : "json",
		success : function(data) {
			if(id==-1){$("#awsAccountDiv").hide();}else{$("#awsAccountDiv").show();}
			$("#awsAccountId").text(data.accountId);
			$("#payingAccountId").text(data.payingAccountId);
		}
	});
}


/**
 * 点击页面的添加，将添加的用户Model显示出来
 */
function showAddUserModel() {
	$("#showAddUserModel").click(function(){
		$("#departmentId option:not(:first)").remove();
		$("#departmentId option:not(:first)").remove();
		$("#awsAccount option:not(:first)").remove();
		$("#IAM option:not(:first)").remove();
		$("#roleId option:not(:first)").remove();
		$("input[type='text']").val("");
		$("input[type='date']").val("");
		$("#schoolId").val(-1);
		accountData="";iamData="";departmentData="";
		$("#awsAccount").val(-1);
		$("#isAwsIam").prop("checked",false);
		//$("#awsIamDiv").hide();
		$("#IAM").val(" ");
		$("#departmentId").val(-1);
		$("#addh4").show();//添加标题
		$("#edith4").hide();//编辑标题
		$("#addUserData").show();//添加提交按钮
		$("#editUserData").hide();//编辑提交按钮
		$("#awsAccountDiv").hide();
		$("#copyIamName").val("");
		findByRoleData($("#roleType").val());//查询角色，用来显示对应用户的用户类型
		$('#addOrEditPaltFormModel').modal('show');
	});
}

/**
 * 添加用户管理的数据，将数据提交到后台将数据存储起来
 */
function addUserData() {
	$("#addUserData").click(function() {
		var url=contextPath +'/userManage/addUser';
		submitEditData(url);
	});
}

/**
 * 编辑用户管理的数据，将数据提交到后台将数据存储起来
 */
function editUserData() {
	$("#editUserData").click(function (){
		var url=contextPath +'/userManage/editUser';
		submitEditData(url);
	});		
}

/**
 * 获取选中的行数据，根据Id获取要编辑的数据，显示在页面上
 * @param id
 */
function editUser(userId) {
	$('#addOrEditPaltFormModel').modal('show');
	$("#addh4").hide();//添加标题
	$("#edith4").show();//编辑标题
	$("#addUserData").hide();//添加提交按钮
	$("#editUserData").show();//编辑提交按钮
	$("#awsAccountDiv").hide();
	$("#departmentId option:not(:first)").remove();
	$("#awsAccount option:not(:first)").remove();
	$("#IAM option:not(:first)").remove();
	$("#roleId option:not(:first)").remove();
	$.ajax({
		url : contextPath+'/userManage/getUserData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"userId":userId},
		success : function(data) {
			$("#userId").val(data.userId);
			$("#realName").val(data.realName);
			if(isInArray(selectData,data.schoolId)==true){	
				$("#schoolId").val(data.schoolId);
				findByMechanismData(data.schoolId);
				$("#departmentId").val(data.departmentId);
				departmentData=data.departmentId;
			}else if(isInArray(selectData,data.schoolId)==false){
				$("#schoolId").val(-1);
				$("#departmentId").val(-1);
			}
			if($("#roleType").val()==pfRoleType){//平台用户管理
				findByOrgAwsAccountData(data.schoolId,"");//获取AwsAccount列表数据
				$("#copyIamName").val(data.iAM);
				accountData=data.awsAccount;
				iamData=data.iAM;
				$("#awsAccount").val(data.awsAccount);
				findByIAMData(data.awsAccount)//获取iam下拉列表数据
			//	if(data.isAwsIam==0){
				//	$("#isAwsIam").prop("checked",true);
					//$("#awsIamDiv").show();
		    		//$("#isAwsIams").val("0");
	    		getAwsIamDatas(data.iAM);//获取选中的行数据，根据Id获取要编辑的数据
	    		$("#IAM").val(data.iAM);	
				//}else{
				//	$("#isAwsIam").prop("checked",false);
					//$("#awsIamDiv").hide();
		    		//$("#isAwsIams").val("1");
				//}
				//$("#awsAccountDiv").show();
				getAwsAccounts(data.awsAccount);
			}else if($("#roleType").val()==dmRoleType){//院系用户管理
				findByOrgAwsAccountData(data.schoolId,data.departmentId);//获取AwsAccount列表数据
				$("#copyIamName").val(data.iAM);
				accountData=data.awsAccount;
				iamData=data.iAM;
				findByIAMData(data.awsAccount)//获取iam下拉列表数据
				$("#awsAccount").val(data.awsAccount);
				$("#awsAccountDiv").show();
				getAwsAccounts(data.awsAccount);
				getAwsIamDatas(data.iAM);//获取选中的行数据，根据Id获取要编辑的数据
	    		$("#IAM").val(data.iAM);	
			}else if($("#roleType").val()==tcRoleType){//教师用户管理
				$("#copyIamName").val(data.iAM);
				iamData=data.iAM;
				findByIAMData("");//获取iam下拉列表数据
				getAwsIamDatas(data.iAM);//获取选中的行数据，根据Id获取要编辑的数据
				$("#IAM").val(data.iAM);
			}
			findByRoleData(data.roleType);//查询角色，用来显示对应用户的用户类型
			$("#roleId").val(data.roleId);
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
 * 提交和编辑数据
 * @param url
 */
function submitEditData(url) {
	var bv = $('#paltFormForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	var formData = $('#paltFormForm').serializeJSON();
	console.log(formData);
	$.ajax({
		url : url,
		type : 'POST',
		data :JSON.stringify(formData),
		contentType : "application/json;charset=utf-8",
		dataType: "json",
		success : function(data) {
			if(data.resultFlag){
				$("#addOrEditPaltFormModel").modal("hide");
				userTB.ajax.reload();
			}else{
				layer.alert(data.message, {icon: 5});	
			}			
		}
	});
}

/**
 * 提示若是没有您要选择的学校、请到机构管理中添加
 */
/*function promptMessage() {
	layer.alert("若是没有您要选择的学校、请到机构管理中添加!", {icon: 3});
}
*/
/****************************************
 * 查询
 ****************************************/
function doSearch() {
	userTB.ajax.reload();
}


/****************************************
 * 管理员列表初始化
 ****************************************/
function initUserTB() {
	userTB = $('#userPdfTb').DataTable({
		ajax: {
			url: contextPath + '/userManage/selectUserManageData',// 数据请求地址
			type: "POST",
			data: function (params) {
				if(roleType==1){
					params.roleType=pfRoleType;
				}else if(roleType==2){
					params.roleType=dmRoleType;
				}else if(roleType==3){
					params.roleType=tcRoleType;
				}
				params.searchData = $('#searchData').val();
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
		columns: columnsData(),
			language: {
				url: contextPath + "/resource/json/language-zh.json"
			}
		});
}
/**
 * 表格数据的封装，通过不同的角色类型来显示不同的表格数据
 * @returns {Array}
 */
function columnsData() {
var columnFirst =[{
		"data": "realName",
		"title": "姓名",
		"defaultContent":''
		}, {
		"data": "mechanismName",
		"title": "学校",
		"defaultContent":''
	 }]

var columnSecond =[{
	"data": "departmentName",
	"title": "院系",
	"defaultContent":''
 }]

var columnThird=[{
		"data": "accountName",
		"title": "Account账户",
		"defaultContent":''
 }]
	
 var columnFour =[
		{
			"data": "iamName",
			"title": "AWS IAM账号",
			"defaultContent":''
		}, {
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
				if((row.userId!=row.currentUserId && row.roleType==pfRoleType && row.createBy!=row.currentCreateBy)|| row.userState==0){//平台登录时不是自己创建的不能编辑和删除
					return "<div class='hidden-sm hidden-xs btn-group'>" +
					"<button class='btn btn-xs btn-info' disabled='disabled'><i class='ace-icon fa fa-pencil bigger-120'>编辑</i></button>" +
					"<button class='btn btn-xs btn-danger' disabled='disabled'><i class='ace-icon fa fa-trash-o bigger-120'>禁用</i></button>" +
					"<button class='btn btn-xs btn-success'  onclick='activationUser(" + '"' + row.userId + '"' +")'><i class='ace-icon fa fa-pencil bigger-120'>激活</i></button>" +
					"</div>";
				}else{
					return "<div class='hidden-sm hidden-xs btn-group'>" +
					"<button class='btn btn-xs btn-info' onclick='editUser(" + '"' + row.userId + '"' +")'>" +
					"<i class='ace-icon fa fa-pencil bigger-120'>编辑</i></button>" +
					"<button class='btn btn-xs btn-danger' onclick='deleteUser(" + '"' + row.userId + '"' +")'>" +
					"<i class='ace-icon fa fa-trash-o bigger-120'>禁用</i></button>" +
					"</div>";
				}
			}
		}
	]

	if($("#roleType").val()==pfRoleType){//平台用户管理
		var mycolumns=(columnFirst.concat(columnThird)).concat(columnFour);;
	}else if($("#roleType").val()==tcRoleType){//教师用户管理
		var mycolumns=(columnFirst.concat(columnSecond)).concat(columnFour);
	}else if($("#roleType").val()==dmRoleType){//院系用户管理
		var mycolumns=((columnFirst.concat(columnSecond).concat(columnThird))).concat(columnFour);
	}
 
 return mycolumns;
}

/**
 * 激活已被禁用的数据的数据
 */
function activationUser(userId){
	layer.confirm('您确定要激活该用户吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/userManage/deleteUserData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"userId":userId,"userState":userRvailable},
		success : function(data) {
			if(data.success){
				userTB.ajax.reload();
			}else{
				layer.alert("激活该用户失败!", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}

/**
 * 获取选中的行数据，根据Id获取要编辑的数据
 * @param id
 */
function getAwsIamDatas(id) {
	$.ajax({
		url : contextPath+'/userManage/getAwsIamDatas',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id},
		success : function(data) {
			$("#IAM").append("<option value="+data.id+">"+data.iAMName+"</option>");
		}
	});
}
/**
 * 假删除用户列表上的数据
 */
function deleteUser(userId){
	layer.confirm('您确定要禁用该用户的信息吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/userManage/deleteUserData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"userId":userId,"userState":userNoavailable},
		success : function(data) {
			if(data.success){
				userTB.ajax.reload();
			}else{
				layer.alert("禁用该用户信息失败!", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}

/**
 * 当前无可用AWS Account账户操作流程
 */
function nullAwsAccount() {
	layer.open({type: 1,
		title :'当前无可用AWS Account账户操作流程',
		area: ['380px', '230px'],
		shadeClose: false, //点击遮罩关闭
		content: "<div style='padding:10px 30px 10px 30px;' ><div style='margin-top: 10px;font-size: 14px'>1.点击这里<a href='https://www.amazonaws.cn/sign-up/'>https://www.amazonaws.cn/sign-up/</a>申请aws account。</div><br>" +
				"<div style='font-size: 14px'>2.申请完成后请将信息回填至系统【aws 账户管理中的aws account】。</div><br><div style='font-size: 14px'>3.再次添加用户绑定aws account。</div></div>",
		success: function(layero, index){
		},
		cancel: function(index, layero){ 
			layer.closeAll();
		}    
	});	
}

/**
 * 当前无可用AWS IAM账户操作流程
 */
function nullAwsIam() {
	layer.open({type: 1,
		title :'当前无可用AWS IAM账户操作流程',
		area: ['380px', '230px'],
		shadeClose: false, //点击遮罩关闭
		content: "<div style='padding:10px 30px 10px 30px;' ><div style='margin-top: 10px;font-size: 14px'><a href="+getIamRegisterUrl()+" target='_blank'>1.点击这里  aws 官方平台上创建IAM账号。</a></div><br>" +
				 "<div style='font-size: 14px'>2 将信息回填到教学实验平台系统中的【IAM账号管理】。</div><br><div style='font-size: 14px'> 3 完成 1，2 之后再进行管理员添加。</div></div>",
		success: function(layero, index){
		},
		cancel: function(index, layero){ 
			layer.closeAll();
		}    
	});
}

/**
 * 根据当前登录的人信息来获取联盟登录的路径，将获取的路径显示在页面上
 * @returns {String}
 */
function getIamRegisterUrl() {
	var IamRegisterUrl="";
	$.ajax({
		url : contextPath+'/userManage/getIamRegisterUrl',
		async : false,
		type : 'post',
		dataType : "json",
		success : function(data) {
			console.log(data.message);
			IamRegisterUrl=data.message;
		}	
	});
	
	return IamRegisterUrl;
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
 * 表单验证
 */
function formValidator() {
	$('#paltFormForm').bootstrapValidator({
		excluded:[":hidden"] ,//bootstrapValidator的默认配置
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			realName: {
				validators: {
					notEmpty: {
						message: '用户姓名不能为空！'
					},stringLength: {
                        max: 20,
                        message: '用户姓名不超过20字符'
                    }
				}
			},
			schoolId: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择所属学校名称!'
	                }
	            }	
			},
			departmentId: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择学院!'
	                }
	            }	
			},
			awsAccount: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请绑定awsAccount名称！'
	                }
                }			   
			},
			IAM: {
				validators: {
	                regexp: {
	                    regexp: /^(?! )/,
	                    message: '请绑定AWS IAM名称!'
	                }
                }	
			},
			roleId: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择对应用户角色!'
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
