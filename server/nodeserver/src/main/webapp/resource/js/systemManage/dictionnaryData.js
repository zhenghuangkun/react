var subItemTable="";
/****************************************
 * 页面初始化
 ****************************************/
$(function(){	
	var height=window.screen.availHeight*0.64;
	$("#listGroup").height(height);
	
	getDictionaryData();//获取数据字典中父项的数据，将数据显示在列表上	
	
	dicParentModalShow();//点击父项中的点击添加显示添加弹出框
	
	submitDic();//点击提交按钮将添加父项中的数据提交到后台
	
    editDicData();//点击提交按钮将编辑的父项中的数据提交到后台
    
	getSubItemData();//获取子项的数据，将数据显示在表格上

	dicSubItemModalShow();//点击子项中的点击添加显示添加弹出框
	
	addSubItemDicData();//点击提交按钮将添加子项中的数据提交到后台
	
	editSubItemData();//点击提交按钮将编辑的子项中的数据提交到后台
});

/**
 * 获取数据字典中父项的数据，将数据显示在列表上
 *
 */
function getDictionaryData() {
	$.ajax({
		url: contextPath + '/dictionary/selectDictionary',
		type: 'POST',
		dataType: "json",
		success: function (data) {
			var str="",strs="";	
			$("#firstDicId").val(data[0].dicId);
			subItemTable.ajax.reload();
			for (var i = 0; i < data.length; i++) {
				if(i==0){
					strs="<div class='list-group-item' id='firstDataDiv' style='background-color:#99999938;'>";
				}else{
					strs="<div class='list-group-item'>";
				}strs
				str=str+strs+
					"<a style='text-decoration: none;color: #555' onclick='checkDicParent(this," + '"' + data[i].dicId + '"' +")'>"+data[i].dicName+"</a>" +
					"<a style='float: right;' onclick='deleteDicParent(" + '"' + data[i].dicId + '"' +")'><i class='ace-icon fa fa-trash-o bigger-120' style='color:red'></i></a>" +
					"<a style='float: right;' onclick='getDicParent(" + '"' + data[i].dicId + '"' +")'><i class='ace-icon fa fa-pencil bigger-120' style='color:#6fb3e0'></i></a>" +
					"</div>";
			}
			$("#listGroup").append(str);
		}
	});
}

/**
 * 点击父项中的点击添加显示添加弹出框
 * @returns
 */
function dicParentModalShow() {
	$("#dicParentDialog").click(function() {
		$("#dicCode").val("");
		$("#dicName").val("");
		$("#plusH").show();
		$("#pencilH").hide();
		$("#submitDic").show();
		$("#editDic").hide();
		$('#dicParentModal').modal('show');
		$("#notEmptyData").empty();
		$("#dicCode").attr("readOnly",false); 
	});
}

/**
 * 点击提交按钮将添加父项中的数据提交到后台
 */
function submitDic() {
	$("#submitDic").click(function() {
		$("#notEmptyData").empty();
		var reg = /^(?!_)([A-Za-z ]+)$/;
		var dicCode=$("#dicCode").val();
		var dicName=$("#dicName").val();
		if(dicCode==""){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>英文名称不能为空，请输入英文名称！</p>");
		}else if(!reg.test(dicCode)){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>英文名称只能输入英文，请重新输入！</p>");
		}else if(dicName==""){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>中文名称不能为空，请输入中文名称！</p>");
		}else{
			$.ajax({
				url : contextPath +'/dictionary/addParentDic',
				type : 'POST',
				data : {"dicCode":dicCode,"dicName":dicName},
				dataType: "json",
				success : function(data) {
					if(data.success){
						$("#listGroup").empty();
						getDictionaryData();//获取数据字典中父项的数据，将数据显示在列表上	
						$('#dicParentModal').modal('hide');
					}else{
						$("#notEmptyData").append("<p style='color:red;font-size:14px'>中文名称已经存在，请重新输入提交！</p>");
					}
					
				}
			});	
		}
	});
}

/**
 * 点击父项中的点击添加显示添加弹出框
 * @returns
 */
function getDicParent(dicId) {
	$("#notEmptyData").empty();
	$("#plusH").hide();
	$("#pencilH").show();
	$("#submitDic").hide();
	$("#editDic").show();
	$.ajax({
		url : contextPath +'/dictionary/getParentDic',
		type : 'POST',
		data : {"dicId":dicId},
		dataType: "json",
		success : function(data) {
			$('#dicParentModal').modal('show');
			$("#dicId").val(data.dicId);
			$("#dicCode").val(data.dicCode);
			$("#dicName").val(data.dicName);
			$("#copyDicName").val(data.dicName);
			$("#dicCode").attr("readOnly",true); 
		}
	});	
}


/**
 * 点击提交按钮将编辑的父项中的数据提交到后台
 */
function editDicData() {
	$("#editDic").click(function() {
		$("#notEmptyData").empty();
		var reg = /^(?!_)([A-Za-z ]+)$/;
		var dicId=$("#dicId").val();
		var dicCode=$("#dicCode").val();
		var dicName=$("#dicName").val();
		var copyDicName=$("#copyDicName").val();
		if(dicCode==""){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>英文名称不能为空，请输入英文名称！</p>");
		}else if(!reg.test(dicCode)){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>英文名称只能输入英文，请重新输入！</p>");
		}else if(dicName==""){
			$("#notEmptyData").append("<p style='color:red;font-size:14px'>中文名称不能为空，请输入中文名称！</p>");
		}else{
			$.ajax({
				url : contextPath +'/dictionary/editParentDic',
				type : 'POST',
				data : {"dicId":dicId,"dicCode":dicCode,"dicName":dicName,"copyDicName":copyDicName},
				dataType: "json",
				success : function(data) {
					if(data.success){
						$("#listGroup").empty();
						getDictionaryData();//获取数据字典中父项的数据，将数据显示在列表上	
						$('#dicParentModal').modal('hide');
					}else{
						$("#notEmptyData").append("<p style='color:red;font-size:14px'>中文名称已经存在，请重新输入提交！</p>");
					}
					
				}
			});	
		}
	});
}

/**
 * 删除父项列表上的数据
 */
function deleteDicParent(dicId){
	layer.confirm('删除父项会连带删除该子项全部数据，您确定要删除该父项数据字典吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/dictionary/deleteDicParent',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"dicId":dicId},
		success : function(data) {
			if(data.success){
				$("#listGroup").empty();
				getDictionaryData();//获取数据字典中父项的数据，将数据显示在列表上	
				subItemTable.ajax.reload();
			}else{
					layer.alert("删除失败！", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}

/**
 * 获取子项的数据，将数据显示在表格上
 */
function getSubItemData() {
	subItemTable=$('#subItemTable').DataTable( {
		ajax: {
            url: contextPath +'/dictionary/getSubItemData',// 数据请求地址
            type: "POST",
            data: function (params) {
                //此处为定义查询条件 传给控制器的参数
                params.dicId = $("#firstDicId").val();
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
	    iDisplayLength: 7,
        lengthMenu: [7,20,30,50,100],
		columns: [{
				   "data": "itemValue",
				   "title":"子项数值"
			   },{
				   "data": "itemName",
				   "title":"子项名称"
			   }, {
					"data": "opt",
					"title": "操作",
					"render": function (data, type, row, meta) {
						return "<div class='hidden-sm hidden-xs btn-group'>" +
							"<button class='btn btn-xs btn-info'  onclick='getSubItemDic(" + '"' + row.itemId + '"' +")'>" +
							"<i class='ace-icon fa fa-pencil bigger-120' style='color:white;'>修改</i>" +
							"</button>" +
							"<button class='btn btn-xs btn-danger' onclick='deleteDicSubItem(" + '"' + row.itemId + '"' +")'>" +
							"<i class='ace-icon fa fa-trash-o bigger-120' style='color:white;'>删除</i>" +
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
 * 点击列表上父项不太的值。进行显示不太的子项列表数据
 * @param dicId
 */
var preObj=null;
function checkDicParent(obj,dicId){
	$("#firstDataDiv").css("background-color", "");
	$(obj).parent().css("background-color", "#99999938");
	if(preObj != null){
		/* 还原之前的css样式 */
		$(preObj).parent().css("background-color", "");
	}
	/* 保存之前的对象 */
	preObj = obj;
	$("#firstDicId").val(dicId);
	subItemTable.ajax.reload();
}

/**
 * 点击子项中的点击添加显示添加弹出框
 * @returns
 */
function dicSubItemModalShow() {
	$("#dicSubItemDialog").click(function() {
		$("#itemName").val("");
		$("#itemValue").val("");
		$("#siplusH").show();
		$("#sipencilH").hide();
		$("#addSubItemSubmit").show();
		$("#editSubItemSubmit").hide();
		$('#subItemModal').modal('show');
		$("#notEmptySubItem").empty();
	});
}

/**
 * 点击提交按钮将添加子项中的数据提交到后台
 */
function addSubItemDicData() {
	$("#addSubItemSubmit").click(function() {
		$("#notEmptySubItem").empty();
		var reg = /^[0-9a-zA-Z]+$/;
		var itemName=$("#itemName").val();
		var itemValue=$("#itemValue").val();
		var dicId=$("#firstDicId").val();
		if(itemValue==""){
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项数值不能为空，请输入子项数值！</p>");
		}else if(!reg.test(itemValue)){
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项数值只能输入英文或数字，请重新输入！</p>");
		}else if(itemName==""){
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项名称不能为空，请输入子项名称！</p>");
		}else {
			$.ajax({
				url : contextPath +'/dictionary/addSubItemDic',
				type : 'POST',
				data : {"itemName":itemName,"itemValue":itemValue,"dicId":dicId},
				dataType: "json",
				success : function(data) {
					if(data.success){
						subItemTable.ajax.reload();
						$('#subItemModal').modal('hide');
					}else{
						$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项名称或子项数值已经存在，请重新输入提交！</p>");
					}
					
				}
			});	
		}
	});
}

/**
 * 点击子项中显示编辑弹出框，将数据显示出来
 * @returns
 */
function getSubItemDic(itemId) {
	$("#notEmptySubItem").empty();
	$("#sipencilH").show();
	$("#siplusH").hide();
	$("#editSubItemSubmit").show();
	$("#addSubItemSubmit").hide();
	$.ajax({
		url : contextPath +'/dictionary/getSubItemDic',
		type : 'POST',
		data : {"itemId":itemId},
		dataType: "json",
		success : function(data) {
			$('#subItemModal').modal('show');
			$("#itemId").val(data.itemId);
			$("#itemName").val(data.itemName);
			$("#itemValue").val(data.itemValue);
			$("#copyItemName").val(data.itemName);
			$("#copyitemValue").val(data.itemValue);
			$("#subItemDicId").val(data.dicId);
		}
	});	
}


/**
 * 点击提交按钮将编辑的子项中的数据提交到后台
 */
function editSubItemData() {
	$("#editSubItemSubmit").click(function() {
		$("#notEmptySubItem").empty();
		var reg = /^[0-9a-zA-Z]+$/;
		var itemId=$("#itemId").val();
		var itemName=$("#itemName").val();
		var itemValue=$("#itemValue").val();
		var copyItemName=$("#copyItemName").val();
		var copyitemValue=$("#copyitemValue").val();
		var dicId=$("#subItemDicId").val();
		if(itemValue==""){
		    $("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项数值不能为空，请输入子项数值！</p>");
		}else if(!reg.test(itemValue)){
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项数值只能输入英文或数字，请重新输入！</p>");
		}else if(itemName==""){
			$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项名称不能为空，请输入子项名称！</p>");
		} else{
			$.ajax({
				url : contextPath +'/dictionary/editSubItemDic',
				type : 'POST',
				data : {"dicId":dicId,"itemId":itemId,"itemName":itemName,"itemValue":itemValue,"copyItemName":copyItemName,"copyitemValue":copyitemValue},
				dataType: "json",
				success : function(data) {
					if(data.success){
						subItemTable.ajax.reload();
						$('#subItemModal').modal('hide');
					}else{
						$("#notEmptySubItem").append("<p style='color:red;font-size:14px'>子项数值或子项名称已经存在，请重新输入提交！</p>");
					}
				}
			});	
		}
	});
}

/**
 * 删除父项列表上的数据
 */
function deleteDicSubItem(itemId){
	layer.confirm('您确定要删除该子项数据字典吗?', {icon: 3, title:'提示'}, function(index){
	$.ajax({
		url : contextPath+'/dictionary/deleteSubItem',
		async : false,
		type : 'post',
		dataType : "json",
		data : {"itemId":itemId},
		success : function(data) {
			if(data.success){
				subItemTable.ajax.reload();
				$('#subItemModal').modal('hide');
			}else{
					layer.alert("删除失败！", {icon: 5});
				}
			}	
		});	
		layer.close(index);
	});
}

