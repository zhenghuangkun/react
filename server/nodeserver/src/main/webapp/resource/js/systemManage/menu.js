/*****菜单管理*******/

var menuTb = "";
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	/*菜单列表初始化*/
	initMenuTB();

	/*菜单等级下拉框初始化*/
	initMenuLevel('addMenuLevel', 'addMenuPID', 'addPIDDiv');

	/*父菜单下拉框初始化*/
	initMenuLevel('updateMenuLevel', 'updateMenuPID', 'updatePIDDiv');

	/*增加、删除模态框隐藏事件*/
	$('#addMenuModel').on('hidden.bs.modal', function () {
		/*清空下拉框内容并隐藏下拉框内容*/
		$('#addMenuForm')[0].reset();
		$("#addMenuPID").empty().append("<option value='0'></option>");
		$("#addPIDDiv").hide();
	})

	$('#updateMenuModel').on('hidden.bs.modal', function () {
		$('#updateMenuForm')[0].reset();
		$("#updateMenuPID").empty().append("<option value='0'></option>");
		$("#updatePIDDiv").hide();
	})

});

/**
 * 菜单等级下拉框初始化
 * @param id 菜单下拉框元素id
 * @param pid 父菜单下拉框元素id
 * @param pidDiv 父菜单下拉框父元素id
 */
function initMenuLevel(id, pid, pidDiv) {
	$("#" + id).change(function () { //选中触发事件
		var menuLevel = $("#" + id).val(); //获取选中的菜单等级

		/*是否选择一级菜单*/
		if (menuLevel == 0) {
			$("#" + pidDiv).hide();
		} else {
			$("#" + pidDiv).show();
		}

		/*加载父菜单下拉框内容*/
		initMenuPID(menuLevel, pid, null);
	});
}

/**
 * 父菜单下拉框初始化
 * @param menuLevel 菜单等级
 * @param pid 父菜单下拉框元素id
 * @param menuPID 修改菜单的父菜单id
 */
function initMenuPID(menuLevel, pid, menuPID) {
	$.ajax({
		url: contextPath + '/menu/selectParentMenu.do',
		data: {'menuLevel': menuLevel},
		type: 'POST',
		dataType: "json",
		success: function (data) {
			/*清空下拉框内容*/
			$("#" + pid).empty();

			if (data.length > 0) {
				$.each(data, function (index, data) {
					$("#" + pid).append("<option value='" + data.menuId + "'>" + data.menuName + "</option>"); //为Select追加Option(下拉项)
				})
			} else {
				$("#" + pid).append("<option value='0'></option>"); //追加默认下拉项
			}

			/*若存在父菜单ID,则设置父菜单下拉框内容*/
			if (menuPID) {
				$("#updatePIDDiv").show();
				$("#" + pid).val(menuPID);
			}

		}
	});

}

/****************************************
 * 添加菜单
 ****************************************/
function addMenu() {
	var formData = $('#addMenuForm').serialize();
	$.ajax({
		url: contextPath + '/menu/addMenu.do',
		data: formData,
		type: 'POST',
		success: function (data) {
			var retData = $.parseJSON(data);
			if (!retData.sucess) {
				layer.msg(retData.message);
				return;
			}
			menuTb.ajax.reload(null, false);
			$('#addMenuModel').modal('hide');
		}
	});

	return false;
}
/****************************************
 * 查询
 ****************************************/
function doSearch() {
//	var roleName = $('#roleName').val();
//	var param = {
//		"roleName": roleName
//	}
//	menuTB.settings()[0].ajax.data = param;
	menuTb.ajax.reload();
}

/****************************************
 * 菜单列表初始化
 ****************************************/
function initMenuTB() {

	menuTb = $('#menuTb').DataTable({
		ajax: {
			url: contextPath + '/menu/selectMenu.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.menuLevel = $('#menuLevelSearch').val();
				params.menuName = $('#menuNameSearch').val();
			}
		},
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
				"data": "menuPID",
				"visible": false
			}, {
				"data": "menuId",
				"title": "菜单ID",
				'width':'65px'
			}, {
				"data": "menuLevel",
				"title": "菜单等级",
				'width':'80px',
				"render": function (data, type, row, meta) {
					switch (data) {
						case 0:
							return "一级菜单";
							break;
						case 1:
							return "二级菜单";
							break;
						case 2:
							return "三级菜单";
							break;
						default:
							return "";
							break;
					}
				}
			}, {
				"data": "menuName",
				'width':'80px',
				"title": "菜单名称"
			}, {
				"data": "menuIcon",
				'width':'80px',
				"title": "菜单图标"
			}, {
				"data": "menuUrl",
				"title": "菜单链接",
				"render": function (data, type, row, meta) {
					return data==null?'':data;
				}
			}, {
				"data": "menuSort",
				'width':'80px',
				"title": "排序标识"
			}, {
				"data": "updateTime",
				'width':'160px',
				"title": "操作时间"
			}, {
				"data": "permissionIdentifier",
				"title": "标识",
				'width':'90px',
				"render": function (data, type, row, meta) {
					return data==null?'':data;
				}
			}, {
				"data": "opt",
				"title": "操作",
				'width':'150px',
				"render": function (data, type, row, meta) {
					return "<div class='hidden-sm hidden-xs btn-group'>" +
						"<button class='btn btn-xs btn-info'  onclick='editMenu(" + meta.row + ")'>" +
						"<i class='ace-icon fa fa-pencil bigger-120'>修改</i>" +
						"</button>" +
						"<button class='btn btn-xs btn-danger' onclick='deleteMenu(" +'"' + row.menuId + '"' + ")'>" +
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
 * 编辑菜单
 * @param rowIndex
 */
function editMenu(rowIndex) {

	var rowData = menuTb.rows(rowIndex).data()[0];//获取行数据

	initMenuPID(rowData.menuLevel, 'updateMenuPID', rowData.menuPID);//初始化父菜单下拉框内容

	$("#updateMenuForm").populateForm(rowData);//填充表单数据
	$('#updateMenuModel').modal('show');
}

/**
 * 修改菜单
 * @param menuId 菜单ID
 */
function updateMenu() {
	var formData = $('#updateMenuForm').serialize();
	$.ajax({
		url: contextPath + '/menu/updateMenu.do',
		data: formData,
		type: 'POST',
		success: function (data) {
			var retData = $.parseJSON(data);
			if (!retData.sucess) {
				layer.msg(retData.message);
				return;
			}
			menuTb.ajax.reload(null, false);
			$('#updateMenuModel').modal('hide');
			//bootbox.alert("添加成功");
		}
	});
	return false;
}

/**
 * 删除菜单
 * @param menuId 菜单ID
 */
function deleteMenu(menuId) {
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
					url: contextPath + '/menu/deleteMenu.do',
					data: {"menuId": menuId},
					type: 'POST',
					success: function (data) {
						var retData = $.parseJSON(data);
						if (!retData.sucess) {
							layer.msg(retData.message);
							return;
						}
						menuTb.ajax.reload(null, false);//重新刷新数据
						//bootbox.alert($.parseJSON(data).message);
					}
				});
			}
		}
	});

}
