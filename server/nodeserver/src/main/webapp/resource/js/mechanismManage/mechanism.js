/*****权限管理*******/
var zeroData=0;
var permissonTb = "";//角色权限列表
var zTreeObj = "";//菜单树对象
var permissionRoleId = null;//权限配置的角色ID
var log, className = "dark";
/*菜单树对象 初始化配置*/
var setting = {
		view: {
			addHoverDom: addHoverDom,//用于当鼠标移动到节点上时，显示用户自定义控件。务必与 removeHoverDom 同时使用 
			removeHoverDom: removeHoverDom,//用于当鼠标移出节点时，隐藏用户自定义控件。务必与 addHoverDom 同时使用 
			selectedMulti: false
		},edit: {
			enable: true,
			editNameSelectAll: true,// 节点编辑名称 input 初次显示时,设置 txt 内容是否为全选状态。 
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn
		},callback: {
			beforeEditName: beforeEditName,//用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态
			beforeRemove: beforeRemove,// 用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作
			onClick: this.onClick// 用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作  
		},data: {
			key: {
				name: "mechanismName",
				title: "mechanismName"
			},
			simpleData: {
				enable: true,
				idKey:"mechanismId",
				pIdKey:"mechanismPid"
			}
		}
};

/****************************************
 * 页面初始化
 ****************************************/
$(function(){
	
	getMechanismTree();//加载机构管理树，将树显示在界面上
	
	mechanismParentDialog();//点击添加按钮，显示添加父项机构的弹出框
	
	addParentMechanism();//提交数据，将父项的机构名称加入到数据库中
	
	addSubItemData();//获取添加新节点的数据信息
	
	editMechanismData();//编辑节点数据，将数据提交到数据库中存储起来
	
});

/**
 * 加载机构管理树，将树显示在界面上
 * @param 
 */
function getMechanismTree(){
	/*获取菜单树*/
	$.ajax({
		url : contextPath +'/mechanism/getMechanismList',
		type : 'POST',
		dataType: "json",
		success : function(data) {
			if(data!=''){
				clickGetMechanismData(data[0].mechanismId);
			}
			/*初始化树*/
			zTreeObj=$.fn.zTree.init($("#mechanismTree"), setting, data);
			zTreeObj.expandAll(true);//展开所有节点
		}
	});
	return false;
}

/**
 * 获取选中的数据，将选中的获取到页面上显示
 * @param e
 * @param treeId
 * @param node
 */
function onClick(e, treeId, node) {
	
	clickGetMechanismData(node.mechanismId);
}

/**
 * 点击个默认第一项来获取对象的数据
 */
function clickGetMechanismData(mechanismId) {
	$("#checkMechanism").text("");
	$("#mechanismNameData").text("");
	$("#mechanismdDescribeData").text("");
	$.ajax({
		url : contextPath +'/mechanism/getMechanismData',
		type : 'POST',
		data : {"mechanismId":mechanismId},
		dataType: "json",
		success : function(data) {
			$("#checkMechanism").append(data.mechanismName);
			$("#mechanismNameData").append(data.mechanismName);
			$("#mechanismdDescribeData").append(data.mechanismdDescribe);
		}
	});
}
/**
 * 点击添加按钮，显示添加父项机构的弹出框
 */
function mechanismParentDialog() {
	$("#mechanismParentDialog").click(function(){
		$("#mechanismName").val("");
		$("#mechanismdDescribe").val("");
		$("#notEmptyData").empty();
		$("#hA").show();$("#hE").hide();
		$("#submitParentMechanism").show();
		$("#editMechanism").hide();
		$('#mechanismParentModal').modal('show');
	});
}

/**
 * 提交数据，将父项的机构名称加入到数据库中
 */
function addParentMechanism() {
	$("#submitParentMechanism").click(function(){
		$("#notEmptyData").empty();
		var mechanismName=$("#mechanismName").val();
		var mechanismdDescribe=$("#mechanismdDescribe").val();
		if(mechanismName==""){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>机构名称不能为空，请输入机构名称！</p>");
		}else{
			$.ajax({
				url : contextPath +'/mechanism/addMechanismData',
				type : 'POST',
				data : {"mechanismName":mechanismName,"mechanismdDescribe":mechanismdDescribe,"mechanismPid":zeroData},
				dataType: "json",
				success : function(data) {
					if(data.success){
						getMechanismTree();//加载机构管理树，将树显示在界面上
						$('#mechanismParentModal').modal('hide');
					}else{
						$("#notEmptyData").append("<p style='color:red;font-size:14px'>机构名称已经存在，请重新输入提交！</p>");
					}
				}
			});
		}
	});	
}

/**
 * 重命名树列表前的列表操作，判断是否进行修改树上的机构数据
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeEditName(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("mechanismTree");
	zTree.selectNode(treeNode);
	setTimeout(function() {
		layer.confirm('您确定要修改'+treeNode.mechanismName+'节点吗?', {icon: 6, title:'提示'}, function(index){
			$("#hA").hide();$("#hE").show();
			$("#submitParentMechanism").hide();
			$("#editMechanism").show();
			getMechanismData(treeNode.mechanismId);
			layer.close(index);
		});
	}, 0);
	return false;
}

/**
 * 根据ID获取机构数据，将数据传到前台显示出来
 */
function getMechanismData(mechanismId) {
	$.ajax({
		url : contextPath+'/mechanism/getMechanismData',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"mechanismId":mechanismId},
		success : function(data) {
			$('#mechanismParentModal').modal('show');
			$("#mechanismName").val(data.mechanismName);
			$("#mechanismdDescribe").val(data.mechanismdDescribe);
			$("#mechanismId").val(mechanismId);
			$("#copyMechanismName").val(data.mechanismName);
			$("#mechanismPid").val(data.mechanismPid);
		 }	
	 });
}

/**
 * 编辑节点数据，将数据提交到数据库中存储起来
 */
function editMechanismData() {
	$("#editMechanism").click(function() {
		$("#notEmptyData").empty();
		var mechanismId=$("#mechanismId").val();
		var mechanismName=$("#mechanismName").val();
		var mechanismPid=$("#mechanismPid").val();
		var mechanismdDescribe=$("#mechanismdDescribe").val();
		var copyMechanismName=$("#copyMechanismName").val();
		if (mechanismName== "") {
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>机构名称不能为空，请输入机构名称！</p>");
        }else{
        	$.ajax({
        		url : contextPath+'/mechanism/editMechanismData',
        		async : false,
        		type : 'post',
        		dataType : "json",
        		data : {"mechanismId":mechanismId,"mechanismPid":mechanismPid,"mechanismName":mechanismName,"mechanismdDescribe":mechanismdDescribe,"copyMechanismName":copyMechanismName},
        		success : function(data) {
	        			if(data.success){
	        				getMechanismTree();
	        				$('#mechanismParentModal').modal('hide');
	        			}else{
	        				$("#notEmptyData").append("<p style='color:red;font-size:14px'>该父项下的节点名称已经存在，请重新输入提交！</p>");
	        			}
        			}	
        	 });	
        }
	});
}

/**
 * 删除树的机构列表名称
 * @param treeId
 * @param treeNode
 * @returns
 */
function beforeRemove(treeId, treeNode) {
	var flag=false;//此处必须定义一个变量，不然还没确定就把节点从树上删除
    layer.confirm("确认要删除当前节点("+treeNode.mechanismName+")吗？", {
        btn: ['确定','取消']
    }, function(){
    	 var treeObj = $.fn.zTree.getZTreeObj("mechanismTree");
    	 var childNodes =treeObj.transformToArray(treeNode); 
         var deleteId = new Array(); 
         for(i = 0; i < childNodes.length; i++) { 
        	 deleteId[i] = childNodes[i].mechanismId; 
         } 
        $.ajax({
    		url : contextPath+'/mechanism/deleteMechanismData',
    		async : false,
    		type : 'post',
    		dataType : "json",
    		data : {
    			"mechanismId":deleteId.join(","),
    			"deleteId":treeNode.mechanismId
    			},
    		success : function(data) {
	    		if(data.success){
	    			flag=true;
	    			clickGetMechanismData(treeNode.mechanismId);
	    			getMechanismTree();
	    			layer.closeAll();
	    		}else{
	    			layer.alert("该节点已被用户使用或Account绑定，删除失败！", {icon: 5});
	    		}
			 }	
    	 });
	}, function(index){
	    layer.close(index);
	    flag=false;
	})
	return flag;
}


/**
 * 是否显示删除按钮
 */
function showRemoveBtn(treeId, treeNode) {
	//获取节点所配置的noRemoveBtn属性值
	if(treeNode.noRemoveBtn != undefined && treeNode.noRemoveBtn){
		return false;
	}else{
		return true;
	}
}

/**
 * 是否显示编辑按钮
 */
function showRenameBtn(treeId, treeNode) {
	//获取节点所配置的noEditBtn属性值
	if(treeNode.noEditBtn != undefined && treeNode.noEditBtn){
		return false;
	}else{
		return true;
	}
}

/**
 * 添加树列表的机构数据，将数据存储到数据库中
 */
function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId+ "' title='add' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_"+treeNode.tId);
	if (btn) btn.bind("click", function(){
		$("#notEmptySubItem").empty();
		$("#subItemName").val("");
		$("#subItemDescribe").val("");
		$("#mechanismId").val(treeNode.mechanismId);
		$('#addTreeModal').modal('show');
	});
};

/**
 * 获取添加新节点的数据信息
 */
function addSubItemData() {	
	$("#addSubItemSubmit").click(function() {
		$("#notEmptySubItem").empty();
		var subItemName=$("#subItemName").val();
		var subItemDescribe=$("#subItemDescribe").val();
		if (subItemName== "") {
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>新节点名称不能为空，请输入新节点名称！</p>");
        }else{
        	$.ajax({
        		url : contextPath+'/mechanism/addMechanismData',
        		async : false,
        		type : 'post',
        		dataType : "json",
        		data : {"mechanismPid":$("#mechanismId").val(),"mechanismName":subItemName,"mechanismdDescribe":subItemDescribe},
        		success : function(data) {
	        			if(data.success){
	        				getMechanismTree();
	        				$('#addTreeModal').modal('hide');
	        			}else{
	        				$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>该父项下的节点名称已经存在，请重新输入提交！</p>");
	        			}
        			}	
        	 });	
        }
	});
}

function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.tId).unbind().remove();
};
