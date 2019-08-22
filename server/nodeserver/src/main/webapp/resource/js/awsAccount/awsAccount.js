/**********AWS account 管理*************/

var awsAccountTb = "";
var zeroData=0;
var selectData=null;
/**
 * 页面初始化
 */
$(function () {
	
	isPayingAccountCheck();//获取是否为主账号，如果改变按钮的选中就改变页面的显示情况
	
	accountValidatorForm();//验证添加AWS Account账号表单
	
	addModalShow(); //点击添加按钮，跳出添加页面的弹出框
	
	submitAccountData();//提交添加AWS Account账户信息数据
	
	selectOrg();//显示机构的下拉列表，将下拉列表显示在添加数据的页面上
	
	getMechanismPid();//绑定学校名称（机构名称）下拉列表change事件，获取当前所属院系名称的下来列表
	
	editAccountData();//编辑数据的提交
	
	getHostAccountName();//根据主账号将账户名称显示出来
	
	/*aws account列表初始化*/
	
	initAwsAccountTB();
	
});

/**
 * 校验重置重点在这里 当modal隐藏时销毁验证再重新加载验证
 */
$('#awsAccountModel').on('hidden.bs.modal', function() {
	pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
});

/**
 * 当页面的校验发生改变的时候，重新的获取页面的校验
 */
function pageValidator() {
   $('#awsAccountForm').data('bootstrapValidator').destroy();
   $('#awsAccountForm').data('bootstrapValidator', null);
   accountValidatorForm();//验证添加AWS Account账号表单
}


/****************************************
 * 查询
 ****************************************/
function doSearch(){

	awsAccountTb.ajax.reload();
}

/**
 * 点击添加按钮，跳出添加页面的弹出框
 */
function addModalShow() {
	$("#addModalShow").click(function(){
		$("input[type='text']").val("");
		$("input[type='date']").val("");
		$("#isPayingAccount").prop("checked",true);
		$("#isPayings").val("1");
		$("#departmentIdDiv").hide();
		$("#payingAccountIdDiv").hide();
		$("#payingAccountNameDiv").hide();
		$("#addh4").show();
		$("#edith4").hide();
		$("#org").val(-1);
		$("#submitAccountData").show();
		$("#editAccountData").hide();
		$("#awsAccountModel").modal('show');
	});
}

/**
 * 显示机构的下拉列表，将下拉列表显示在添加数据的页面上
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
			$("#org").append(insertText);
			$("#inputState").append(insertText);
		},
		error : function() {

		}
	})
}

/**
 * 绑定学校名称（机构名称）下拉列表change事件，获取当前所属院系名称的下来列表
 */
function getMechanismPid(){
	$("#org").change(function() {
		var org=$(this).children('option:selected').val();
		pageValidator();//当页面的校验发生改变的时候，重新的获取页面的校验
		$("#departmentId option:not(:first)").remove();
		$("#payingAccountId option:not(:first)").remove();
		$("#payingAccountName").val("");
		findByMechanismData(org);//获取学院列表数据
		getByHostAwsAccountData(org);//获取主账号的下拉列表数据
	});
}

/**
 * 获取院系列表数据
 * @param org
 */
function findByMechanismData(org){
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
			$("#departmentId").append(insertText);
		}
	});
}

/**
 * 获取主账号的下拉列表数据
 * @param org
 */
function getByHostAwsAccountData(org){
	$.ajax({
		url : contextPath +'/awsaccount/getByHostAwsAccount',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"school":org},
		success : function(data) {
			var insertText =  ""; 			
			for(var i = 0;i<data.length;i++){
				insertText += "<option value="+data[i].accountId+">"+data[i].accountId+"</option>";
			}
			$("#payingAccountId").append(insertText);
		}
	});
}

/**
 * 根据主账号将账户名称显示出来
 */
function getHostAccountName(){
	$("#payingAccountId").change(function() {
		var payingAccount=$(this).children('option:selected').val();
		if(payingAccount==" "){
			$("#payingAccountName").val("");
		}else{
			$.ajax({
				url : contextPath +'/awsaccount/getByHostAccountName',
				async : false,
				type : 'post',
				dataType : "json",
				data:{"accountId":payingAccount},
				success : function(data) {
					$("#payingAccountName").val(data[0].accountName);
				}
			});
		}
	});
}

/**
 * 提交添加AWS Account账户信息数据
 */
function submitAccountData() {
	$("#submitAccountData").click(function (){
		var url=contextPath +'/awsaccount/addAwsAccount';
		submitEditData(url);
	});	
}

/**
 * 获取是否为主账号，如果改变按钮的选中就改变页面的显示情况
 */
function isPayingAccountCheck() {
	$("#departmentIdDiv").hide();
	$("#payingAccountIdDiv").hide();
	$("#payingAccountNameDiv").hide();
	 //主账号（是/否）
    $("#isPayingAccount").on('change', function () {
    	if(this.checked) {
    		$("#departmentIdDiv").hide();
    		$("#payingAccountIdDiv").hide();
    		$("#payingAccountNameDiv").hide();
    		$("#isPayings").val("1");
    		$("#payingAccountId").val("");
    		$("#payingAccountName").val("");
		}else {
			$("#departmentIdDiv").show();
			$("#payingAccountIdDiv").show();
    		$("#payingAccountNameDiv").show();
    		$("#isPayings").val("0");
		}
    });
}


/**
 * aws account 列表初始化
 */
function initAwsAccountTB(){
	awsAccountTb = $('#awsAccountTb').DataTable( {
		ajax: {
            url: contextPath +'/awsaccount/selectAwsAccountData',// 数据请求地址
            type: "POST",
            data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.inputUnitName = $('#inputUnitName').val();
				params.inputUserRealName = $('#inputUserRealName').val();
				params.inputState = $('#inputState').val();
				return params;
			}
        },
        stateSave:true,
	    lengthChange: true,
	    searching: false,
	    ordering: false,
	    info: true,
	    autoWidth: false,
	    serverSide:true,
	    pagingType: "full_numbers",
	    iDisplayLength: 10,
        lengthMenu: [10,20,30,50,100],
        columns: [{
				"data": "accountId",
				"title": "account ID",
				"defaultContent":''
			},{
				"data": "accountName",
				"title": "account 名称",
				"defaultContent":''
			},/*{
				"data": "email",
				"title": "邮箱",
				"defaultContent":''
			},*/{
				"data": "orgName",
				"title": "所属机构",
				"defaultContent":''
			},{
				"data": "isPayingAccount",
				"title": "是否付款账户",
				"render": function (data, type, row, meta) {
					switch (data) {
						case 0:
							return "";
							break;
						case 1:
							return "<i class=\"ace-icon glyphicon glyphicon-star bigger-120\"></i>";
							break;
					}
				}
			},{
				"data": "payingAccountId",
				"title": "付款账户",
				"defaultContent":''
			},{
				"data": "payingAccountName",
				"title": "付款账户名称",
				"defaultContent":''
			},{
				"data": "createTime",
				"title": "加入时间",
				"defaultContent":''
			},{
				"data": "opt",
				"title": "操作",
				"render": function (data, type, row, meta) {
					return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info' onclick='getAwsAccountData(" + '"' + row.id + '"' +")'>" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='deleteAwsAccountData(" + '"' + row.id + '"' +")'>" +
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
 * 获取选中的行数据，根据Id获取要编辑的数据，显示在页面上
 * @param id
 */
function getAwsAccountData(id) {
	$("#addh4").hide();
	$("#edith4").show();
	$("#submitAccountData").hide();
	$("#editAccountData").show();
	$("#departmentId option:not(:first)").remove();
	$("#payingAccountId option:not(:first)").remove();
	$.ajax({
		url : contextPath+'/awsaccount/getAwsAccountData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id},
		success : function(data) {
			$("#id").val(data.id);
			$("#accountId").val(data.accountId);
			$("#accountName").val(data.accountName);
			$("#copyAccountId").val(data.accountId);
			$("#copyAccountName").val(data.accountName);
			$("#email").val(data.email);
			if(data.isPayingAccount==0){
				$("#isPayingAccount").prop("checked",false);
				$("#departmentIdDiv").show();
				$("#payingAccountIdDiv").show();
				$("#payingAccountNameDiv").show(); 
				$("#isPayings").val("0");
			}else{
				$("#isPayingAccount").prop("checked",true);
				$("#departmentIdDiv").hide();
				$("#payingAccountIdDiv").hide();
				$("#payingAccountNameDiv").hide();
				$("#isPayings").val("1");
			}
			if(isInArray(selectData,data.org)==true){
				$("#org").val(data.org);
				findByMechanismData(data.org);
				getByHostAwsAccountData(data.org);
				$("#departmentId").val(data.departmentId);
				$("#payingAccountId").val(data.payingAccountId);
				$("#payingAccountName").val(data.payingAccountName);
			}else if(isInArray(selectData,data.org)==false){
				$("#org").val(-1);
				$("#departmentId").val(" ");
				$("#payingAccountId").val(" ");
				$("#payingAccountName").val("");
			}
			$("#awsAccountModel").modal('show');
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
 * 编辑数据的提交
 */
function editAccountData() {
	$("#editAccountData").click(function() {
		var url=contextPath +'/awsaccount/editAwsAccount';
		submitEditData(url);
	});
}

/**
 * 提交和编辑数据
 * @param url
 */
function submitEditData(url) {
	var bv = $('#awsAccountForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	var formData = $('#awsAccountForm').serializeJSON();
	console.log(formData);
	$.ajax({
		url : url,
		type : 'POST',
		data :JSON.stringify(formData),
		contentType : "application/json;charset=utf-8",
		dataType: "json",
		success : function(data) {
			if(data.resultFlag){
				$("#awsAccountModel").modal("hide");
				awsAccountTb.ajax.reload();
			}else{
				layer.alert(data.message, {icon: 5});	
			}			
		}
	});
}

/**
 * 删除AWS Account列表上的数据
 */
function deleteAwsAccountData(id){
	layer.confirm('您确定要删除该AWS Account数据信息吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/awsaccount/deleteAwsAccountData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"id":id},
		success : function(data) {
			if(data.success){
				awsAccountTb.ajax.reload();
			}else{
				layer.alert("删除AWS Account数据信息失败!", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}

/**
 * 验证添加AWS Account账号表单
 */
function accountValidatorForm() {
	$('#awsAccountForm').bootstrapValidator({
		excluded:[":hidden"] ,//bootstrapValidator的默认配置
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			accountId: {
				validators: {
					notEmpty: {
						message: 'awsAccount ID不能为空！'
					},stringLength: {
                        max: 30,
                        message: 'awsAccount ID不超过30字符'
                    }
				}
			},
			accountName: {
				validators: {
					notEmpty: {
						message: 'Account名称不能为空！'
					},stringLength: {
                        max: 20,
                        message: 'Account名称不超过20字符'
                    }
				}
			},
			/*email: {
				validators: {
					notEmpty: {
						message: '电子邮箱不能为空！'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
						message: '电子邮箱格式不正确！'
					}
				}
			},*/
			payingAccountId: {
				validators: {
	                regexp: {
	                    regexp: /^(?! )/,
	                    message: '请选择付款账户!'
	                }
                }
			},
			payingAccountName: {
				validators: {
					notEmpty: {
						message: '付款账户名称不能为空！'
					},stringLength: {
                        max: 20,
                        message: '付款账户名称不超过20字符'
                    }
				}
			},org: {
				validators: {
	                regexp: {
	                    regexp: /^(?!-1)/,
	                    message: '请选择所属学校(机构)!'
	                }
                }	
			},departmentId: {
				validators: {
	                regexp: {
	                    regexp: /^(?! )/,
	                    message: '请选择所属院系!'
	                }
                }	
			}
		}
	});
}