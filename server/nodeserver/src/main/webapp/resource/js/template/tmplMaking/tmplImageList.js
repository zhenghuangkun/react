/*****镜像管理*******/

var imageTb = "";//镜像列表

/****************************************
 * 页面初始化
 ****************************************/
$(function(){

	/*镜像列表初始化*/
	initImageTb();
	
	init();
	
	
});



/****************************************
 * 模板列表初始化
 ****************************************/
function initImageTb(){
	imageTb = $('#imageTb').DataTable( {
		ajax: {
			url: contextPath + '/tmplmaking/listInstanceImages',// 数据请求地址
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
				   "data": "imageId",
				   "title":"镜像ID",
				   "defaultContent":''
			   },{
				   "data": "instanceId",
				   "title":"实例ID",
				   "defaultContent":''
			   },{
				   "data": "instanceType",
				   "title":"实例类型",
				   "defaultContent":''
			   },{
				   "data": "imageDescribe",
				   "title":"镜像描述",
				   "defaultContent":''
			   },{
				   "data": "optTime",
				   "title":"时间",
				   "defaultContent":''
			   },{
				   "data": "imageState",
				   "title":"状态",
				   "defaultContent":'',
				   "render": function (data, type, row, meta) {
					   if (data == 0) {
						   return '<span class="label label-danger arrowed-in">已删除</span>'; 
					   }
					   return '<span class="label label-success arrowed-in">可用</span>';
				   }
			   },{
				   "data": "operation",
				   "title":"操作",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
					   	if (row.imageState != 0) {
					   		return "<div class='hidden-sm hidden-xs btn-group'>" +
					   			"<button role='button' class='btn btn-xs btn-info btn-round' data-toggle='modal' data-target='#imageEditModel' " + "data-imgId='"+ row.imageId +"' >" +
					   				"<i class='ace-icon fa fa-pencil bigger-120'>编辑</i>" +
					   			"</button>" +
							    "<button role='button' class='btn btn-xs btn-danger btn-round imageDeleteBtn' data-imgId='"+ row.imageId +"'>" +
					   				"<i class='ace-icon fa fa-trash-o bigger-120'>删除</i>" +
					   			"</button>"
			   			   "</div>" ;
					   	}
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
		imageTb.ajax.reload();
	});
	
	/*镜像删除按钮点击事件*/
	$(document).on("click",".imageDeleteBtn",function(){
		var imgId = $(this).attr('data-imgId');
		layer.confirm('确定是否删除镜像?', {icon: 3, title:'提示'}, function(index){
			imageDeleteSubmit(imgId);
			layer.close(index);
		});
		
	});
	
	/*镜像编辑按钮点击事件*/
	$("#editSubmit").click(function(){
		imageEditSubmit($(this).attr('data-imgId'));
	});
	
	//  绑定模态框展示的方法  
	$("#imageEditModel").on("show.bs.modal",function(e){
	    var button=$(e.relatedTarget)  
	    //	    根据标签获得按钮传入的参数  
		$('#editSubmit').attr('data-imgId', button.attr("data-imgId"));
    })
}


/**
 * 编辑镜像
 */
function imageEditSubmit(imageId){
	
	$.ajax({
		url : contextPath + "/tmplmaking/imageedit",
		type : 'POST',
		data : {
			"imageId" : imageId,
			"imageDescribe" : $('#imageDescribe').val()
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
 * 删除镜像
 */
function imageDeleteSubmit(imageId){
	$.ajax({
		url : contextPath + "/tmplmaking/imagedelete",
		type : 'POST',
		data : {
			"imageId" : imageId
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


