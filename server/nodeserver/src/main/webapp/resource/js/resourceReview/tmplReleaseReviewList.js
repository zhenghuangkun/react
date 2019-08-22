/*****模板发布审核*******/

var tmplReleaseTb = "";//发布审核列表

/****************************************
 * 页面初始化
 ****************************************/
$(function(){
	/*列表初始化*/
	initTmplReleaseTb();
	
	init();
	
});



/****************************************
 * 发布审核列表初始化
 ****************************************/
function initTmplReleaseTb(){
	tmplReleaseTb = $('#tmplReleaseTb').DataTable( {
		ajax: {
			url: contextPath + '/tmplreview/releaseList',
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
				   "data": "releaser",
				   "title":"发布者",
				   "defaultContent":''
			   },{
				   "data": "releaseRange",
				   "title":"发布范围",
				   "defaultContent":'',
				   "render":function(data, type, row, meta){
						  switch (data) {
						  	case 1:
						  		return "平台共享";
						  		break;
							case 2:
						  		return row.releaseDept;
						  		break;
							default:
						  		return "";
						  		break;
						  }

					   }
			   },{
				   "data": "releaseReviewTime",
				   "title":"时间",
				   "defaultContent":''
			   },{
				   "data": "releaseReviewState",
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
				   		if (row.releaseReviewState == 1) {
						    return "<div class='hidden-sm hidden-xs btn-group'>" +
								    "<a role='button' class='btn btn-xs btn-success btn-round' href='"+ 
								    contextPath + "/tmplreview/tmplReleaseReviewInfo?tmplId=" + row.tmplId  +  "' target='_blank'>" +
						   				"<i class='ace-icon fa fa-search bigger-120'>审核</i>" +
						   			"</a>"
					   			  "</div>" ;
				   		} else {
				   			return "<div class='hidden-sm hidden-xs btn-group'>" +
								    "<a role='button' class='btn btn-xs btn-success btn-round' href='"+ 
								    contextPath + "/tmplreview/tmplReleaseReviewInfo?tmplId=" + row.tmplId  + "' target='_blank'>" +
						   				"<i class='ace-icon fa fa-search bigger-120'>查看</i>" +
						   			"</a>"
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
		tmplReleaseTb.ajax.reload();
	});
	
	$("#reviewState").change(function(){
		tmplReleaseTb.ajax.reload();
	});
	
}