/*****角色管理*******/

var roleTB = "";
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	/*角色列表初始化*/
	roleValidator();
	initRoleTB();
});


function roleValidator(){
	$('#addRoleForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',			//显示验证成功或者失败时的一个小图标
            invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			
			roleName: {
				
				validators: {
					notEmpty: {
						message: '角色名不能为空'
					}
				}
			},
			roleDESC: {
				validators: {
					notEmpty: {
						message: '角色描述不能为空'
					}
				}
			}
		}
	});
	
	$('#updateRoleForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',			//显示验证成功或者失败时的一个小图标
            invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			
			roleName: {
				
				validators: {
					notEmpty: {
						message: '角色名不能为空'
					}
				}
			},
			roleDESC: {
				validators: {
					notEmpty: {
						message: '角色描述不能为空'
					}
				}
			}
		}
	});
	
	
}


/****************************************
 * 添加角色
 ****************************************/
function addRole() {
	
	var bv = $('#addRoleForm').data('bootstrapValidator');
	bv.validate();
	if(bv.isValid()){
		var formData = $('#addRoleForm').serialize();
		console.log(formData);
		$.ajax({
			url: contextPath + '/role/addRole.do',
			data: formData,
			type: 'POST',
			success: function (data) {
				var retData = $.parseJSON(data);
				if (!retData.sucess) {
					layer.msg(retData.message);
					return;
				}
				$('#addRoleForm')[0].reset();
				roleTB.ajax.reload(null, false);
				$('#addRoleForm').data('bootstrapValidator').resetForm();    //添加验证重置  
				$('#addRoleModel').modal('hide');
				//bootbox.alert("添加成功");
			}
		});
	}
}
/****************************************
 * 查询
 ****************************************/
function doSearch() {
//	var roleName = $('#roleName').val();
//	var param = {
//		"roleName": roleName
//	}
//	roleTB.settings()[0].ajax.data = param;
	roleTB.ajax.reload();
}

/****************************************
 * 角色列表初始化
 ****************************************/
function initRoleTB() {

	roleTB = $('#roleTb').DataTable({
		ajax: {
			url: contextPath + '/role/selectRole',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.roleName = $('#roleName').val();
				params.roleType = $('#roleType').val();
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
		lengthMenu: [10, 50, 100],
		columns: [{
				"data": "roleType",
				"title": "角色类型",
				"render": function (data, type, row, meta) {
					switch(data){
						case "0":
							return "超级管理员";
							break;
						case "1":
							return "平台管理员";
							break;
						case "2":
							return "院系管理员";
							break;
						case "3":
							return "教师";
							break;
						case "4":
							return "助教";
							break;
						case "5":
							return "学生";
							break;
						default:
							return "";
							break;
					
					}
				}
				
			},{
				"data": "roleName",
				"title": "角色名称"
			}, {
				"data": "roleDESC",
				"title": "角色描述"
			}, {
				"data": "updateTime",
				"title": "操作时间",
				"render": function (data, type, row, meta) {
					return data == null ? '' : data;
				}
			}, {
				"data": "opt",
				"title": "操作",
				"render": function (data, type, row, meta) {
					return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info'  onclick='editRole(" + meta.row + ")'>" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='deleteRole(" + '"' + row.roleId + '"' +")'>" +
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
 * 编辑角色
 * @param rowIndex
 */
function editRole(rowIndex) {
	var rowData = roleTB.rows(rowIndex).data()[0];
	$("#updateRoleForm").populateForm(rowData);
	$('#updateRoleModel').modal('show');
}

/**
 * 修改角色
 * @param roleId 角色ID
 */
function updateRole() {
	var bv = $('#updateRoleForm').data('bootstrapValidator');
	bv.validate();
	if(bv.isValid()){
		var formData = $('#updateRoleForm').serialize();
		$.ajax({
			url: contextPath + '/role/updateRole.do',
			data: formData,
			type: 'POST',
			success: function (data) {
				var retData = $.parseJSON(data);
				if (!retData.sucess) {
					layer.msg(retData.message);
					return;
				}
				roleTB.ajax.reload(null, false);
				$('#updateRoleForm').data('bootstrapValidator').resetForm();    //添加验证重置
				$('#updateRoleModel').modal('hide');
				//bootbox.alert("添加成功");
			}
		});
	}
}

/**
 * 删除角色
 * @param roleId 角色ID
 */
function deleteRole(roleId) {
	bootbox.confirm({
		message: "是否确定删除?",
		buttons: {
			confirm: {
				label: '是',
				className: 'btn-success'
			},
			cancel: {
				label: '否',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url: contextPath + '/role/deleteRole.do',
					data: {"roleId": roleId},
					type: 'POST',
					success: function (data) {
						var retData = $.parseJSON(data);
						if (!retData.sucess) {
							bootbox.alert(retData.message);
							return;
						}
						roleTB.ajax.reload(null, false);//重新刷新数据
						//bootbox.alert($.parseJSON(data).message);
					}
				});
			}
		}
	});

}


/**
 * 取消按钮按下动作
 */
function cancle(){
	$('#addRoleForm').data('bootstrapValidator').resetForm();    //添加验证重置  
	$('#updateRoleForm').data("bootstrapValidator").resetForm(); //修改验证重置
}
