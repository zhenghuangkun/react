/*****镜像制作*******/

var instanceTb = "";//实例列表

/****************************************
 * 页面初始化
 ****************************************/
$(function(){

	init();
	
	/*实例列表初始化*/
	initInstanceTb();
	
	
});



/****************************************
 * 实例列表初始化
 ****************************************/
function initInstanceTb(){
	instanceTb = $('#instanceTb').DataTable( {
		ajax: {
			url: contextPath + '/tmplmaking/listInstances',// 数据请求地址
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
				   "data": "instanceId",
				   "title":"实例ID",
				   "defaultContent":''
			   },{
				   "data": "instanceName",
				   "title":"实例名称",
				   "defaultContent":''
			   },{
				   "data": "publicIpAddress",
				   "title":"共有IP",
				   "defaultContent":''
			   },{
				   "data": "privateIpAddress",
				   "title":"私有IP",
				   "defaultContent":''
			   },{
				   "data": "instanceType",
				   "title":"实例类型",
				   "defaultContent":''
			   },{
				   "data": "instanceState",
				   "title":"实例状态",
				   "defaultContent":'',
				   "render": function (data, type, row, meta) {
					   if (data == "terminated") {
						   return '<span class="label label-danger arrowed-in">' + 
								   		data +
								  '</span>'; 
					   }
					   return '<span class="label label-success arrowed-in">' + 
					   				data +
							  '</span>';
				   }
			   },{
				   "data": "operation",
				   "title":"操作",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
					   if (row.instanceState == "running") {
						   return "<div class='btn-group'>" +
						    "<button role='button' class='btn btn-xs btn-success btn-round imageMakeBtn' data-toggle='modal' data-target='#imageMakeModel' " +
						    "data-instanceId='" + row.instanceId + "' data-tmplId='" + row.tmplId + "' data-applyId='" + row.applyId + "'>" +
				   				"<i class='ace-icon fa fa-asterisk bigger-120'>镜像制作</i>" +
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
		instanceTb.ajax.reload();
	});
	/*镜像制作按钮点击事件*/
	$("#makeSubmit").click(function(){
		imageMakeSubmit($(this).attr('data-instanceId'),$(this).attr('data-tmplId'),$(this).attr('data-applyId'));
	});
	
	//  绑定模态框展示的方法  
	$("#imageMakeModel").on("show.bs.modal",function(e){
	    var button=$(e.relatedTarget)  
	    //	    根据标签获得按钮传入的参数  
		$('#makeSubmit').attr('data-instanceId', button.attr("data-instanceId"));
	    $('#makeSubmit').attr('data-tmplId', button.attr("data-tmplId"));
	    $('#makeSubmit').attr('data-applyId', button.attr("data-applyId"));
    })
	
}

/**
 * 制作镜像
 */
function imageMakeSubmit(instanceId,tmplId, applyId){
	
	$.ajax({
		url : contextPath + "/tmplmaking/imageMake",
		type : 'POST',
		data : {
			"instanceId" : instanceId,//实例ID
			"tmplId" : tmplId,
			"applyId" : applyId,
			"imageDescribe" : $('#imageDescribe').val()
		},
		traditional: true,//后台接收数组
		success : function(result) {
	      	if (result.resultFlag) {
	      		layer.alert(result.message + "<br/>镜像ID：" + result.data , {icon: 1,title: "提示",closeBtn: false},function (index){
	      			location.reload();
	      		});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

