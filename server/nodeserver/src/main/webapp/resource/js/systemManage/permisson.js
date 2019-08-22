/*****权限管理*******/

var permissonTb = "";//角色权限列表
var zTreeObj = "";//菜单树对象
var permissionRoleId = null;//权限配置的角色ID

/*菜单树对象 初始化配置*/
var setting = {
		check: {
			enable: true
		},
		data: {
			key: {
				name: "menuName",
				title: "menuName"
			},
			simpleData: {
				enable: true,
				idKey:"menuId",
				pIdKey:"menuPID"
			}
		}
};


/****************************************
 * 页面初始化
 ****************************************/
$(function(){
	/*权限列表初始化*/
	initPermissonTb();
});


/****************************************
 * 查询
 ****************************************/
function doSearch(){
//	var roleName = $('#roleName').val();
//	var param = {
//		"roleName": roleName
//	}
//	permissonTb.settings()[0].ajax.data = param;
	permissonTb.ajax.reload();
}

/****************************************
 * 权限列表初始化
 ****************************************/
function initPermissonTb(){

	permissonTb = $('#permissonTb').DataTable( {
		ajax: {
            url: contextPath +'/role/selectRole.do',// 数据请求地址
            type: "POST",
            data: function (params) {
                //此处为定义查询条件 传给控制器的参数
                params.roleName = $('#roleName').val();
                params.roleType = $('#roleType').val();
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
        lengthMenu: [10, 50, 100],
		columns: [{
				   "data": "roleType",
				   "title":"角色类型",
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
				   "title":"角色名称"
			   },{
				   "data": "roleDESC",
				   "title":"角色描述",
				"defaultContent":''
			   },{
				   "data": "authorityTime",
				   "title":"操作时间",
					"defaultContent":''
			   },{
				   "data": "opt",
				   "title":"操作",
				   "render":function(data, type, row, meta){
					   return "<div class='hidden-sm hidden-xs btn-group'>" +
					   			"<button class='btn btn-xs btn-success' onclick='editPermisson(" + '"' + row.roleId + '"' + ")'>" +
					   				"<i class='ace-icon fa fa-pencil bigger-120'>权限配置</i>" +
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
 * 编辑权限
 * @param roleId
 */
function editPermisson(roleId){
	permissionRoleId = roleId;//设置选中的角色Id
	/*获取菜单树*/
	$.ajax({
		url : contextPath +'/menu/getMenuTree.do',
		type : 'POST',
		data : {"roleId":roleId},
		dataType: "json",
		success : function(data) {

			/*设置角色对应的菜单选中*/
			for(var i in data.roleMenus){
				for(var j in data.menus){
					if(data.menus[j].menuId == data.roleMenus[i]){
						data.menus[j].checked = true;
					}
				}
			}

			/*初始化树*/
			zTreeObj = $.fn.zTree.init($("#menuTree"), setting, data.menus);
			zTreeObj.expandAll(true);//展开所有节点

			$('#permissonModel').modal('show');
		}
	});
	return false;
}


/**
 * 修改权限
 * @param
 */
function updatePermission(){
	var nodes = zTreeObj.getCheckedNodes();//获取选中节点
	if(nodes.length < 0){
		return false;
	}

	/*保存选中节点的菜单id*/
	var menuIdList = new Array();
	$.each(nodes,function(index,data){
		menuIdList.push(data.menuId);
	})

	/*设置角色菜单*/
	if(permissionRoleId){
		$.ajax({
			url : contextPath +'/role/setRolePermisson.do',
			type : 'POST',
			data : {"roleId":permissionRoleId,"menuIdList":menuIdList},
			dataType: "json",
			traditional: true,//后台接收数组
			success : function(data) {
				if(!data.sucess){
					bootbox.alert(data.message);
				}
				permissonTb.ajax.reload();
				$('#permissonModel').modal('hide');
			}
		});
	}
	return false;
}
