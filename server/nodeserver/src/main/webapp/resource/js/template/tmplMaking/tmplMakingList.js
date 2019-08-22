/*****模板列表*******/

var tmplTb = "";//模板列表

/****************************************
 * 页面初始化
 ****************************************/
$(function(){

	init();
	
	/*模板列表初始化*/
	initTmplTb();
	
	
});



/****************************************
 * 模板列表初始化
 ****************************************/
function initTmplTb(){
	tmplTb = $('#tmplTb').DataTable( {
		ajax: {
			url: contextPath + '/tmplmaking/listTemplates',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.keyword = $('#keyword').val();
				return params;
			}
		},
        stateSave:false,
	    lengthChange: true,
	    searching: false,
	    ordering: false,
	    info: true,
	    autoWidth: false,
	    paging: true,
	    serverSide:true,
	    pagingType: "full_numbers",
	    iDisplayLength: 10,
        lengthMenu: [10, 50, 100],
		columns: [{
				   "data": "tmplName",
				   "title":"模板名称",
				   "defaultContent":''
			   },{
				   "data": "description",
				   "title":"模板描述",
				   "defaultContent":''
			   },{
				   "data": "optTime",
				   "title":"时间",
				   "defaultContent":''
			   },{
				   "data": "releaseStatus",
				   "title": "发布状态",
				   "defaultContent":'',
				   "render": function (data, type, row, meta) {
					   if (data == 0) {
						   return '<span class="label label-success arrowed-in arrowed-in-right">未发布 </span>'; 
					   }
					   return '<span class="label label-success arrowed-in arrowed-in-right">已发布</span>';
				   }
			   },{
				   "data": "releaseReviewState",
				   "title": "发布审核状态",
				   "defaultContent":'',
				   "render": function (data, type, row, meta) {
					   switch (data) {
							case 0:
								return '<span class="label label-success arrowed-in arrowed-in-right">未提交</span>'; 
								break;
							case 1:
								return '<span class="label label-success arrowed-in arrowed-in-right">审核中</span>'; 
								break;
							case 2:
								return '<span class="label label-success arrowed-in arrowed-in-right">审核通过</span>'; 
								break;
							case 3:
								return '<span class="label label-danger arrowed-in arrowed-in-right">审核拒绝</span>'; 
								break;
							default:
								return ''; 
								break;
						}
				   }
			   },{
				   "data": "state",
				   "title":"可用状态",
				   "defaultContent":'',
				   "render": function (data, type, row, meta) {
					   if (data == 0) {
						   return '<span class="label label-danger arrowed-in arrowed-in-right">已删除 </span>'; 
					   }
					   return '<span class="label label-success arrowed-in arrowed-in-right">可用</span>';
				   }
			   },{
				   "data": "operation",
				   "title":"操作",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
					   var btnRender = "<div class='hidden-sm hidden-xs btn-group'>";
					   
					   //发布按钮显示
					   if (row.releaseReviewState == 2) {
						   if (row.releaseStatus == 0) {
							   btnRender += "<a role='button' data-tmplId='"+  row.tmplId +"' data-state='1' class='btn btn-xs btn-info btn-round release' >" +
				   					"<i class='ace-icon fa fa-share bigger-120'>共享发布</i>" +
					   			"</a>";
						   } else {
							   btnRender += "<a role='button' data-tmplId='"+  row.tmplId +"' data-state='0' class='btn btn-xs btn-info btn-round release'>" +
				   					"<i class='ace-icon fa fa-undo bigger-120'>取消发布</i>" +
					   			"</a>";
						   }
					   }
					   
					   //编辑、删除按钮显示
					   if (row.state != 0 && row.releaseStatus != 1 && row.releaseReviewState != 1 && row.releaseReviewState != 2) {
				   			btnRender += "<a role='button' class='btn btn-xs btn-info btn-round' href='"+ contextPath +"/tmplmaking/edit?tmplId="+ row.tmplId +"' target='_blank'>" +
							   				"<i class='ace-icon fa fa-pencil bigger-120'>编辑</i>" +
							   			"</a>" +
									    "<a role='button' class='btn btn-xs btn-danger btn-round tmplDeleteBtn' data-tmplId='"+ row.tmplId +"'>" +
							   				"<i class='ace-icon fa fa-trash-o bigger-120'>删除</i>" +
							   			"</a>"
				   		}
				   		
				   		return btnRender + "<a role='button' class='btn btn-xs btn-success btn-round'  href='"+ contextPath +"/tmplmaking/tmplmakeInforead?tmplId="+ row.tmplId +"' target='_blank'>" +
								   				"<i class='ace-icon fa fa-search icon-on-right bigger-110'>查看</i>" +
								   			"</a></div>" ;
				   }
			   }
        ],
		language: {
			url: contextPath + "/resource/json/language-zh.json"
		}
     });
}

/**
 * 初始化
 */
function init(){
	/*搜索按钮点击事件*/
	$("#searchBtn").click(function(){
		tmplTb.ajax.reload();
	});
	/*模板删除按钮点击事件*/
	$(document).on("click",".tmplDeleteBtn",function(){
		var tmplId = $(this).attr('data-tmplId');
		layer.confirm('确定是否删除模板?', {icon: 3, title:'提示'}, function(index){
			tmplDeleteSubmit(tmplId);
			layer.close(index);
		});
	});
	
	/*模板发布、取消发布按钮点击事件*/
	$(document).on("click",".release",function(){
		var tmplId = $(this).attr('data-tmplId');
		var state = $(this).attr('data-state');
		var warning = '确定是否发布模板?';
		if (state == 0) {
			warning = '取消模板后需要重新提交发布申请，是否确定取消发布模板?';
		}
		layer.confirm(warning, {icon: 3, title:'提示'}, function(index){
			tmplReleaseOperation(tmplId,state);
			layer.close(index);
		});
	});
}

/**
 * 删除模板
 */
function tmplDeleteSubmit(tmplId){
	$.ajax({
		url : contextPath + "/tmplmaking/tmpldelete",
		type : 'POST',
		data : {
			"tmplId" : tmplId
		},
		traditional: true,//后台接收数组
		success : function(result) {
	      	if (result.resultFlag) {
	      		layer.alert(result.message , {icon: 1,title: "提示",closeBtn: false},function (index){
	      			location.reload();
	      		});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

/**
 * 发布、取消发布模板
 */
function tmplReleaseOperation(tmplId,state){
	$.ajax({
		url : contextPath + "/tmplmaking/tmplrelease",
		type : 'POST',
		data : {
			"tmplId" : tmplId,
			"state" : state
		},
		traditional: true,//后台接收数组
		success : function(result) {
	      	if (result.resultFlag) {
	      		layer.alert(result.message , {icon: 1,title: "提示",closeBtn: false},function (index){
	      			location.reload();
	      		});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

