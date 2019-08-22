/**********AWS account 管理*************/

var awsIAMTB = "";
var zeroData=0;
var selectData=null;
/**
 * 页面初始化
 */
$(function () {
	/*aws Iam列表初始化*/
	initAwsIAMTB();
	addModalShow(); //点击添加按钮，跳出添加页面的弹出框
	selectIamType();//显示IAM类型的下拉列表，将下拉列表显示在添加数据的页面上
	selectAwsAccount();//显示AwsAccount的下拉列表，将下拉列表显示在添加数据的页面上
	iamValidatorForm(); //验证添加AWS IAM表单
	editIamData();//提交编辑AWS IAM账户信息数据
	submitIamData();//提交添加AWS IAM账户信息数据
});


/**
 * 校验重置重点在这里 当modal隐藏时销毁验证再重新加载验证
 */
$('#awsIAMModel').on('hidden.bs.modal', function () {
    $('#awsIAMForm').data('bootstrapValidator').destroy();
    $('#awsIAMForm').data('bootstrapValidator', null);
    iamValidatorForm();    //重新加载验证
});


/****************************************
 * 查询
 ****************************************/
function doSearch(){
	awsIAMTb.ajax.reload();
}



/**
 * 点击添加按钮，跳出添加页面的弹出框
 */
function addModalShow() {
	$("#addModalShow").click(function(){
		$("input[type='text']").val("");
		$("#addh4").show();
		$("#edith4").hide();
		$("#submitIamData").show();
		$("#editIamData").hide();
		$("#iAMtype").val(-1);
		$("#awsAccount").val(-1);
		$("#awsIAMModel").modal('show');
	});
}

/**
 * 获取选中的行数据，根据Id获取要编辑的数据，显示在页面上
 * @param id
 */
function getAwsIamData(id) {
	$("#addh4").hide();
	$("#edith4").show();
	$("#submitIamData").hide();
	$("#editIamData").show();
	$("#awsIAMModel").modal('show');
	$.ajax({
		url : contextPath+'/awaiam/getAwsIamData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id},
		success : function(data) {			
			$("#id").val(data.id);
			$("#iAMName").val(data.iAMName);
			$("#awsAccount").val(data.awsAccount);
			$("#copyIamName").val(data.iAMName);
			$("#isUsed").val(data.isUsed);
			$("#iAMStatus").val(data.iAMStatus);
			$("#accessKeyID").val(data.accessKeyID);
			$("#accessKey").val(data.accessKey);
			$("#region").val(data.region);
			if(isInArray(selectData,data.iAMtype)==true){				
				$("#iAMtype").val(data.iAMtype);
			}else if(isInArray(selectData,data.iAMtype)==false){
				$("#iAMtype").val(-1);
			}	
			$("#password").val(data.password);	
			/*$("#consoleLoginLink").val(data.consoleLoginLink);*/	
			$("#awsIAMModel").modal('show');
		}
	});
}


/**
 * 提交编辑AWS IAM账户信息数据
 */
function editIamData() {

	$("#editIamData").click(function() {
		var url=contextPath +'/awaiam/editAwsIam';
		submitEditData(url);
	});
}

/**
 * 提交添加AWS IAM账户信息数据
 */
function submitIamData() {
	$("#submitIamData").click(function (){
		var url=contextPath +'/awaiam/addAwsIam';
		submitEditData(url);
	});	
}


/**
 * 提交和编辑数据
 * @param url
 */
function submitEditData(url) {
	var bv = $('#awsIAMForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	var formData = $('#awsIAMForm').serializeJSON();
	console.log(formData);
	$.ajax({
		url : url,
		type : 'POST',
		data :JSON.stringify(formData),
		contentType : "application/json;charset=utf-8",
		dataType: "json",
		success : function(data) {
			if(data.resultFlag){
				$("#awsIAMModel").modal("hide");
				awsIAMTb.ajax.reload();
			}else{
				layer.alert(data.message, {icon: 5});	
			}			
		}
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
 * 显示IAM类型的下拉列表，将下拉列表显示在添加数据的页面上
 */
function selectIamType(){
	selectData=new Array();
	$.ajax({
		url : contextPath +'/awaiam/pageDesginIamlate',
		async : false,
		type : 'post',
		dataType : "json",
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				selectData.push(data[i].itemId);
				insertText += "<option value="+data[i].itemId+">"+data[i].itemName+"</option>";
				}
			$("#iAMtype").append(insertText);
		},
		error : function() {

		}
	})
}


/**
 * 显示AWSAccounts下拉列表，将下拉列表显示在添加数据的页面上
 */
function selectAwsAccount(){
	$.ajax({
		url : contextPath +'/awaiam/getAllAccountList',
		async : false,
		type : 'post',
		dataType : "json",
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].id+">"+data[i].accountName+"</option>";
				}
			$("#awsAccount").append(insertText);
		},
		error : function() {

		}
	})
}

/**
 * aws Iam 列表初始化
 */
function initAwsIAMTB(){
	awsIAMTb = $('#awsIAMTb').DataTable({
		ajax: {
			url: contextPath + '/awaiam/selectAwsIamData',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.inputUnitName = $('#inputUnitName').val();
				params.inputState = $('#inputState').val();
				params.inputIAMStatus = $('#inputIAMStatus').val();
				return params;
			}
		},
		stateSave: true,
		lengthChange: true,
		searching: false,
		ordering: false,
		autoWidth: false,
		serverSide: true,
		pagingType: "full_numbers",
		iDisplayLength: 10,
		lengthMenu: [10, 50, 100],
		columns: [{
			
			    "sWidth":"10%",
				"data": "iAMName",
				"title": "IAM 用户名"
			},{
				"sWidth":"10%",
				"data": "tb_accountid",
				"title": "AWS 账户"
			},{
				"sWidth":"15%",
				"data": "accessKeyID",
				"title": "密钥ID"
			},
			{
				"sWidth":"5%",
				"data": "region",
				"title": "区域",
				"render": function (data, type, row, meta) {
					switch (data) {
						case 'cn-north-1':
							return "北京";
							break;
						case 'cn-northwest-1':
							return "宁夏";
							break;
						default:
							return "";
						    break;
					}
				}
				
			},{
				"sWidth":"15%",
				"data": "createTime",
				"title": "创建时间"
				
			},
			/*{
				"sWidth":"30%",
				"data": "consoleLoginLink",
				"title": "登录控制台链接"
				
			},*/{
				"sWidth":"15%",
				"data": "opt",
				"title": "操作",
				"render": function (data, type, row, meta) {
					return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info'  onclick='getAwsIamData(" + '"' + row.id + '"' +")'>" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='deleteAwsIamData(" + '"' + row.id + '"' +")'>" +
						"<i class='ace-icon fa fa-trash-o bigger-120'>删除</i>" +
						"</button>" +
						"</div>";
				}
			}
		],
		language: {
			url: contextPath + "/resource/json/language-zh.json"
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
	
	document.getElementById("registerIam").href=IamRegisterUrl;
}

/**
 * 假删除AWS IAM列表上的数据
 */
function deleteAwsIamData(id){
	layer.confirm('您确定要删除该AWS 的数据信息吗?', {icon: 3, title:'提示'}, function(index){
		$.ajax({
			url : contextPath+'/awaiam/deleteAwsIamData',
			async : false,
			type : 'post',
			dataType : "json",
			data : {"id":id},
			success : function(data) {
				if(data.success){
					awsIAMTb.ajax.reload();
				}else{
					layer.alert("删除AWS IAM数据信息失败!", {icon: 5});
					}
				}	
			});	
			layer.close(index);
		});
	}




/**
 * 验证添加AWS IAM表单
 */
function iamValidatorForm() {
	$('#awsIAMForm').bootstrapValidator({
		excluded:[":hidden"] ,//bootstrapValidator的默认配置
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			awsAccount: {
				validators: {
					notEmpty: {
						message: 'AWS 账户不能为空！'
					},callback: {
		                message: '请选择AWS 账户',
		                  callback: function(value, validator) {				 
		                   if (value == -1) {
		                        return false;
		                    } else {
		                         return true;
		                      }				
		       }
		   }
				}
			},
			iAMName: {
				validators: {
					notEmpty: {
						message: 'IAM 用户名不能为空！'
					},stringLength: {
                        max: 12,
                        message: 'IAM 用户名不超过20字符'
                    }
				}
			},
			accessKeyID: {
				validators: {
					notEmpty: {
						message: 'accessKeyID 不能为空！'
					},stringLength: {
                        max: 30,
                        message: 'accessKeyID不超过30字符'
                    }
				}
			},
			accessKey: {
				validators: {
					notEmpty: {
						message: 'accessKey 不能为空！'
					},stringLength: {
                        max: 50,
                        message: 'accessKey不超过60字符'
                    }
				}
			},
			/*password: {
				validators: {
					notEmpty: {
						message: 'password 不能为空！'
					},stringLength: {
                        max: 20,
                        message: 'password不超过20字符'
                    }
				}
			},*/
			/*consoleLoginLink: {
				validators: {
					notEmpty: {
						message: 'consoleLoginLink 不能为空！'
					},stringLength: {
                        max: 100,
                        message: 'consoleLoginLink不超过80字符'
                    }
				}
			},*/
			iAMtype:{
			    validators:{
			       notEmpty:{
			          message:'IAM 类型不能为空'
			             },
			              callback: {
			                message: '必须选择一个IAM 类型',
			                  callback: function(value, validator) {				 
			                   if (value == -1) {
			                        return false;
			                    } else {
			                         return true;
			                      }				
			       }
			   }
		   }
		 },
    	 region:{
				    validators:{
				       notEmpty:{
				          message:'区域不能为空'
				             },
				              callback: {
				                message: '请选择区域',
				                  callback: function(value, validator) {				 
				                   if (value == -1) {
				                        return false;
				                    } else {
				                         return true;
				                      }				
				       }
				   }
			   }
			 }
		}
	});
}