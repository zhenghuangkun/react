/*****我的模板*******/

var tempalteTb = "";//模板列表

/****************************************
 * 页面初始化
 ****************************************/
$(function(){

	init();
	
	/*模板列表初始化*/
	initTempalteTb();
	
	
});



/****************************************
 * 模板列表初始化
 ****************************************/
function initTempalteTb(){
	tempalteTb = $('#templateTb').DataTable( {
		ajax: {
			url: contextPath + '/template/listtmplapply',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.keyword = $('#keyword').val();
				params.reviewState =  $('#reviewState').val();
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
				   "data": "tmplTypeName",
				   "title":"模板类型",
				   "defaultContent":''
			   },{
				   "data": "applicant",
				   "title":"申请人",
				   "defaultContent":''
			   },{
				   "data": "useTimeLength",
				   "title":"时长",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
				   		return data + "分钟";
				   }
			   },{
				   "data": "totalPrice",
				   "title":"预计费用",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
				   		return data + "元";
				   }
			   },{
				   "data": "applyTime",
				   "title":"申请时间",
				   "defaultContent":''
			   },{
				   "data": "reviewState",
				   "title":"状态",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
					  switch (data) {
					  	case 1:
					  		return "等待审核";
					  		break;
						case 2:
					  		return "审核通过";
					  		break;
						case 3:
					  		return "审核拒绝";
					  		break;
					  	default:
					  		return "";
					  		break;
					  }

				   }
			   },{
				   "data": "operation",
				   "title":"操作",
				   "render":function(data, type, row, meta){
				   		if (row.reviewState == 3) {
				   			return "<div class='hidden-sm hidden-xs btn-group'>" +
							    "<a role='button' class='btn btn-xs btn-success btn-round' href='"+ 
							    contextPath + "/template/tmplapplyinfo?tmplId=" + row.tmplId + "&applyId=" + row.applyId  + "' target='_blank'>" +
					   				"<i class='ace-icon fa fa-search bigger-120'>修改</i>" +
					   			"</a>"
				   			  "</div>" ;
				   		}
			   			return "<div class='hidden-sm hidden-xs btn-group'>" +
							    "<a role='button' class='btn btn-xs btn-success btn-round' href='"+ 
							    contextPath + "/template/tmplapplyinfo?tmplId=" + row.tmplId + "&applyId=" + row.applyId  + "' target='_blank'>" +
					   				"<i class='ace-icon fa fa-search bigger-120'>查看</i>" +
					   			"</a>"
				   			  "</div>" ;

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
		tempalteTb.ajax.reload();
	});
	
	$("#reviewState").change(function(){
	    tempalteTb.ajax.reload();
	});
	
}

