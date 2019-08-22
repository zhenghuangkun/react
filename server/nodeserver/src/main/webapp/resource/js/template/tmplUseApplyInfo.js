/*****模板审核*******/
var element;//layui元素
var timer;
var timing = 5000;//定时时间
var percent = 10;
/****************************************
 * 页面初始化
 ****************************************/
$(function(){
	
	/*初始化验证表单*/
	initValidator();
	
	/*初始化星级评价插件*/
	initRaty();
	
	/*初始化spinner控件*/
	//initSpinner();
	
	/*初始化layui弹出层*/
	initLayer();
	
	/*初始化layui element元素*/
	initElement();

	/*初始化提示*/
	$("[data-toggle='tooltip']").tooltip();
	
});

/**
 * 初始化
 */
function init(){
	
	//失去焦点时计算总价
	$("#useTimeLength").blur(function(){
		$('#totalPrice').text($('#useTimeLength').val() * price);
	});
	
	/*测试申请按钮点击事件*/
	$("#applySubmit").click(function() {
		var formValidator = $('#applyForm').data("bootstrapValidator");
		formValidator.validate();//手动触发验证
		//是否校验成功
		if(formValidator.isValid()){
			applySubmit();
		}
		
	});
	
	/*启动资源按钮点击事件*/
	$("#startBtn").click(function() {
		$(this).addClass('layui-hide');
		$("#resouceTab .layui-progress").removeClass('layui-hide');
		$("#progressTitle").removeClass('layui-hide');
		resStartSubmit();
	});
	
	/*释放资源按钮点击事件*/
	$("#terminationBtn").click(function() {
		layer.confirm('确定是否释放资源?', {icon: 3, title:'提示'}, function(index){
			resTerminationSubmit();
			layer.close(index);
		});
	});
	
	/*镜像制作按钮点击事件*/
	$("#instance .AMIMakeBtn").click(function() {
		var instanceId = $(this).attr("data-ref");
		layer.confirm('镜像可用于制作模板，确定是否制作镜像?', {icon: 3, title:'提示'}, function(index){
			AMIMakeSubmit(instanceId);
			layer.close(index);
		});
	});
	
	/*模板制作按钮点击事件*/
	$("#makeTmpl").click(function() {
		location.href = contextPath + "/tmplmaking/new";
	});
	
	/*资源创建中*/
	if (stackState == "CREATE_IN_PROGRESS") {
		
		var tmplApply = {
			"tmplId" : $('#tmplId').val(),//模板ID
			"applyId" :$('#applyId').val()//申请ID

		};
		$("#progressTitle").removeClass('layui-hide');
		$("#resouceTab .layui-progress").removeClass('layui-hide');
		percent = percent + random(20,50);
		/*启动定时获取*/
     	timer = setInterval(function(){
			getResourceState(tmplApply);
        }, timing)
	}
}

/**
 * 资源启动
 */
function resStartSubmit(){
	var tmplApply = {
		"tmplId" : $('#tmplId').val(),//模板ID
		"applyId" :$('#applyId').val()//申请ID
	};
	
	$.ajax({
		url : contextPath + "/template/startRes",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplApply),
		traditional: true,//后台接收数组
		success : function(result) {
	      	element.progress('progress', percent + '%');
	      	if (result.resultFlag) {
		      	timer = setInterval(function(){//启动定时器
					getResourceState(tmplApply);
		        }, timing);
	      	} else {
	      		$("#resouceTab .layui-progress").addClass('layui-hide');
	      		$("#progressTitle").addClass('layui-hide');
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

/**
 * 资源释放
 */
function resTerminationSubmit(){
	var tmplApply = {
		"tmplId" : $('#tmplId').val(),//模板ID
		"applyId" :$('#applyId').val()//申请ID
	};
	
	$.ajax({
		url : contextPath + "/template/terminationRes",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplApply),
		traditional: true,//后台接收数组
		success : function(result) {
	      	if (result.resultFlag) {
	      		$('#terminationBtn').addClass('layui-hide');
	      		$('.instanceState').empty().append("状态：<span class='red'>terminated</span>");
	      		layer.alert(result.message, {icon: 1,title: "提示",closeBtn: false});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}

/**
 * 制作镜像
 */
function AMIMakeSubmit(instanceId){
	
	$.ajax({
		url : contextPath + "/template/AMIMake",
		type : 'POST',
		data : {
			"tmplId" : $('#tmplId').val(),//模板ID
			"applyId" :$('#applyId').val(),//申请ID
			"instanceId" : instanceId //实例ID
		},
		traditional: true,//后台接收数组
		success : function(result) {
	      	if (result.resultFlag) {
	      		layer.alert(result.message + "<br/>镜像ID：" + result.data + "<br/><i class='ace-icon fa fa-hand-o-right icon-animated-hand-pointer blue '>" +
	      				"</i><a role='button' class='green' href='"+ contextPath +"/tmplmaking/imagelist'>查看镜像>>></a>", {icon: 1,title: "提示",closeBtn: false});
	      	} else {
	      		layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
	      	}

		}
	}); 
}


/**
 * 获取资源状态
 */
function getResourceState(tmplApply){
	$.ajax({
		url : contextPath + "/template/getResState",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplApply),
		traditional: true,//后台接收数组
		success : function(result) {
			/*资源创建失败*/
			if (!result.resultFlag) {
				clearInterval(timer);
				percent = 0;
				$("#resouceTab .layui-progress").addClass('layui-hide');
				$("#progressTitle").addClass('layui-hide');
				$("#startBtn").removeClass('layui-hide');
				layer.alert(result.message, {icon: 5,title: "提示",closeBtn: false});
			}
			
			/*创建中*/
			if (result.data == "CREATE_IN_PROGRESS" ) {
				/*判断是否已启动资源*/
				if (!$("#resouceTab .layui-progress").hasClass('layui-hide')) {//判断进度条是否显示
					percent = percent + Math.random() * 10 | 0;
					if (percent >= 88){
						percent = 88;
					}
					element.progress('progress', percent + '%');
				}
				return;
			} else {
				clearInterval(timer);
				percent = 0;
				stackState = "CREATE_COMPLETE";//设置状态
				/*影藏进度条*/
				if (!$("#resouceTab .layui-progress").hasClass('layui-hide')) {
					$("#resouceTab .layui-progress").addClass('layui-hide');
					$("#progressTitle").addClass('layui-hide');
				}
				
				showData(result.data);//展示数据
				return;
			}
			clearInterval(timer);
			percent = 0;
	      	
		}
	});
}
/**
 * 展示数据
 */
function showData(data){
	$('#instance').empty();
	data.awsInstances.forEach(function (val, index){
		$('#instance').append(
			"<h4 class='header blue bolder smaller'><i class='ace-icon fa fa-cloud green'></i>服务器&nbsp; " + val.instanceName + "</h4>" +
			"<label>到期时间：" + data.useEndTime + "</label><br/>" +
			"<label class='instanceState'>状态：<span class='green'>" + val.instanceState + "</span></label><br/>" +
			"<label>实例ID：<span>" + val.instanceId + "</span></label><br/>" +
			"<label>实例类型：<span>" + val.instanceType + "</span></label><br/>" +
			"<label>公有IP：<span>" + val.publicIpAddress + "</span></label><br/>" +
			"<label>私有IP：<span>" + val.privateIpAddress +  "</span></label><br/>" +
			"<label>密钥：<span>" + val.keyName.substring(0,5) + "</span>&nbsp;&nbsp;" +
			"<a href='" +val.keyPairUrl + "' data-toggle='tooltip' title='点击下载连接密钥'><i class='ace-icon fa fa-download blue'></i></a></label><br/>"
		);
	});

	/*显示释放资源那妞*/
	$("#startBtn").addClass('layui-hide');
	$("#terminationBtn").removeClass('layui-hide');
}

/**
 * 测试申请
 */
function applySubmit(){
	var tmplApplyUse = {
		"tmplId" : $('#tmplId').val(),//模板ID
		"applyId" : $('#applyId').val(),//申请ID
		"useTimeLength" : $('#useTimeLength').val(),//时长
		"remark" : $('#remark').val()//备注
	};
	
	$.ajax({
		url : contextPath + "/template/usereapply",
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(tmplApplyUse),
		traditional: true,//后台接收数组
		success : function(result) {
			if (result.resultFlag) {
				layer.alert(result.message, {
					icon: 1,
					title: "提示",
					closeBtn: false
				},function(index){
					location.href = contextPath + "/template/using";
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示",
					closeBtn: false
				},function(index){
				});
			}
		}
	}); 
}





/**
 * 初始化星级评分插件
 */
function initRaty(){
	// 找到raty的div
	$("div.raty.read").each(function() {
	    // 初始化raty
	    $(this).raty({
	        // 设置值
	        noRatedMsg : "",
	        half: true,
	        readOnly : true,
			score : function(){
	    		return $(this).attr('data-score');
	    	}
	    });
	});
}




/**
 * 初始化表单验证控件
 */
function initValidator(){
/*测试申请表单*/
	$('#applyForm').bootstrapValidator({
		excluded: [':disabled', ':hidden', ':not(:visible)'],//指定不验证情况
		feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
		},
		live: 'enabled',//生效规则，字段值有变化就触发验证
		message: '该值无效',
		submitButtons: 'button[type="button"]',//指定提交的按钮
        submitHandler: null,
		trigger: null,//为每个字段设置统一触发验证方式（也可在fields中为每个字段单独定义）
		fields: {
			useTimeLength : {
				validators: {
					notEmpty: {
						message:"请输入申请时长后提交"
					},
					stringLength: {
						min: 0,
						max: 50,
						message: "限制50字"
					},
					 regexp: {
			            regexp: "^[1-9][0-9]*$",
			            message: '申请时长必须为大于0的正整数'
			        }
				}
			},
			remark : {
				validators: {
					stringLength: {
						min: 0,
						max: 500,
						message: "限制500字"
					}
				}
			}
		}
	});
}


/**
 * 初始化Spinners控件
 */
function initSpinner(){
	$('#useTimeLength').ace_spinner({
		value:0,
		min:0,
		max:4320,
		step:60, 
		btn_up_class:'btn-info' , 
		btn_down_class:'btn-info'
	}).closest('.ace-spinner').on('changed.fu.spinbox', function(){
		$('#totalPrice').text($('#useTimeLength').val() * price);
	});
}

/**
 * 初始化layu弹出层
 */
function initLayer(){
  $('#tmplBtn').on('click', function(){
		layer.open({
		  	type: 1,
		  	title: "模板资源信息",
		  	area: ['300px', '540px'], //宽高
		  	content: $('#resouceTab'),
	   		success: function(layero, index){
//	   			if ($('#stackName').val() != "") {
//	   				var tmplApply = {
//					"tmplId" : $('#tmplId').val(),//模板ID
//					"applyId" :$('#applyId').val(),//申请ID
//					"stackName" : $('#stackName').val()//堆栈名称
//					};
//					getResourceState(tmplApply);
//	   			}
		  	}
		});
  });
}

/**
 * 进度条初始化
 */
function initElement(){
	layui.use('element', function(){
	  	element = layui.element;
      	/*初始化*/
		init();
	});
}

/**  
 * 产生随机整数，包含下限值，但不包括上限值  
 * @param {Number} lower 下限  
 * @param {Number} upper 上限  
 * @return {Number} 返回在下限到上限之间的一个随机整数  
 */  
function random(lower, upper) {  
    return Math.floor(Math.random() * (upper - lower)) + lower;  
}