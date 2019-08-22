/***********模板制作**********/

/**
 * 页面初始化
 */
$(function(){
	
	initValidator();//初始化表单验证控件
	
	initLayuiUpload();//初始化文件上传控件
	
	/*保存按钮点击事件*/
	$("#saveBtn").click(function(){
		saveFormData();
	});
	
    /*发布按钮点击事件*/
	$("#releaseSubmit").click(function(){
		layer.confirm('确定是否提交模板发布申请?', {icon: 3, title:'提示'}, function(index){
			tmplRelease();//模板发布 
			layer.close(index);
		});
	});
	
	/*模板信息查看按钮点击事件*/
	$(".help-button").click(function(){
		var tmplId = $("#associatedTmplId option:selected").val();
		var newTab = window.open('about:blank');
		newTab.location.href = contextPath + "/template/info?tmplId=" + tmplId;
	});
	
	/*发布范围选择事件*/
	$("input[name='releaseRange']").click(function(){
		var checkVal = $("input[name='releaseRange']:checked").val();
		if (checkVal == 1) {
			$("#releaseDeptDiv").addClass('hide');
		} else {
			$("#releaseDeptDiv").removeClass('hide');
		}
	});
	

	
	/*初始化提示*/
	$("[data-toggle='tooltip']").tooltip();
});


function tmplRelease() {
	
	var releaseRange = $('input[name="releaseRange"]:checked').val();//获取发布范围选中值
	var releaseData = {
			"tmplId" : 	$('#tmplId').val(),
			"releaseRange" : releaseRange,
			
			"remark" : $('#remark').val()
	};
	if (releaseRange == 2) {
		releaseData["releaseDept"] =  $('#releaseDept option:selected').val();
	}
	
	$.ajax({
		url : contextPath + '/tmplmaking/tmplReleaseApply',
		type : 'POST',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(releaseData),
		dataType: "json",
		traditional: true,//后台接收数组
		success : function(result) {
			if(result.resultFlag == true){
				layer.alert(result.message, {
					icon: 1,
					title: "提示"
				},function(index){
				  layer.close(index);
				  location.reload();
				});
			} else {
				layer.alert(result.message, {
					icon: 5,
					title: "提示"
				});
			}
		}
	}); 
} 
/**
 * 初始化表单提交事件
 */
function saveFormData(){
	var formValidator = $('#tmplMakeForm').data("bootstrapValidator");
	
	formValidator.validate();//手动触发验证
	
	//是否校验成功
	if(formValidator.isValid() && fileIsValid()){
		//获取表单数据并且转换为Json格式数据,添加文件信息
        var formData  = $('#tmplMakeForm').serializeJSON();
        if(tmplScript.data != ""){
        	formData.tmplScript = tmplScript.data;
        }
        
        /*判断添加还是编辑*/
        var url = contextPath + '/tmplmaking/addtmpl';
        if($('#operation').val() == "edit"){
        	url = contextPath + '/tmplmaking/edittmpl'
        }
        
		$.ajax({
			url : url,
			type : 'POST',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(formData),
			dataType: "json",
			traditional: true,//后台接收数组
			success : function(result) {
				if(result.resultFlag == true){
					layer.alert(result.message, {
						icon: 1,
						title: "提示"
					},function(index){
					  layer.close(index);
					  window.close();
					});
				} else {
					layer.alert(result.message, {
						icon: 5,
						title: "提示"
					});
				}
			}
		}); 
    }
}
 

/**
 * 初始化表单验证控件
 */
function initValidator(){
	$('#tmplMakeForm').bootstrapValidator({
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
			tmplName: {
				validators: {
					notEmpty: {
						message:"模板名称不能为空"
					},
					stringLength: {
						min: 0,
						max: 30,
						message: "模板名称限制30字符"
					}
				}
			},
			description: {
				validators: {
					notEmpty: {
						message:"模板描述不能为空"
					},
					stringLength: {
						min: 0,
						max: 500,
						message: "模板描述限制500字符"
					}
				}
			}
			
		}
	});
}

/**
 * 初始化文件上传控件
 */
function initLayuiUpload(){
	/*判断是否已存在文件*/
	if($('#fileList').children().length != 0){
		 tmplScript.uploadState = true;
	 	 //删除按钮点击操作
	 	 $('#fileList').find('.demo-delete').on('click', function(){
			  $('#fileList').empty();
			  $('#listAction').removeClass('layui-hide');
			  $('#fileListBtn').removeClass('layui-hide'); 
			  tmplScript.uploadState = false;
		 });	
	}
	
	layui.use('upload', function(){
	  var $ = layui.jquery;
	  var scriptFile = layui.upload;
  	  var loadIndex = null;
  	
	  //资源脚本上传
	  var uploadListIns = scriptFile.render({
	    elem: '#fileListBtn',
	    url: contextPath +'/tmpldesign/scriptUpload',
	    accept: 'file',
	    multiple: true,
	    auto: false,
	    data: {'correlationId':$('#tmplId').val()},
	    size: 1024, //限制文件大小，单位 KB
	    exts: 'txt|json|yaml|template', //只允许上传模板脚本文件
	    bindAction: '#listAction',
	    number: 1,
	    choose: function(obj){
  
	        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
	        //读取本地文件
	        obj.preview(function(index, file, result){
	       		var tr = $(['<tr id="upload-'+ index +'">',
	       	 	'<td><img class="layui-upload-img" src="'+ contextPath +'/resource/images/fileicon.jpg"></td>',
	       	 	'<td>'+ file.name +'</td>',
	       		 '<td>'+ (file.size/1014).toFixed(1) + '</td>',
	       		   '<td>等待上传</td>',
	        		  '<td>',
	        	 	   '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>',
        		  	   '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>',
	         		 '</td>',
	        		'</tr>'].join(''));
	        
	       		 //单个重传
	       		 tr.find('.demo-reload').on('click', function(){
	        		  obj.upload(index, file);
	      		 });
	        
        	 	 //删除
    		 	 tr.find('.demo-delete').on('click', function(){
	        		  delete files[index]; //删除对应的文件
	        		  tr.remove();
	        		  uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
	        		  tmplScript.uploadState = false;//设置状态未上传
	        		  tmplScript.data = "";
	        		  $('#listAction').removeClass('layui-hide');
	        		  $('#fileListBtn').removeClass('layui-hide');
	       		 });
	        
	       		 $('#fileList').append(tr);
	       		 $('#fileListBtn').addClass('layui-hide');
	     	 });
	    },
	    before: function(obj){
	      	loadIndex = layer.load(); //上传loading
	    },
	    done: function(res, index, upload){
	      layer.close(loadIndex);
	      if(res.resultFlag == true){ //上传成功
	        var tr = $('#fileList').find('tr#upload-'+ index);
	        var tds = tr.children();
	        tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
	        tmplScript.data = res.data;//获取设置模板脚本文件信息
	        tmplScript.uploadState = true;//设置状态已上传
	        $('#listAction').addClass('layui-hide');
	        $('#fileListBtn').addClass('layui-hide');
	      }else{
	      	this.error(index, upload);
	      }
	      
	    },
	    error: function(index, upload){
	      var tr = $('#fileList').find('tr#upload-'+ index);
	      var tds = tr.children();
	      tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
	      tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示重传
	    }
	  });
  
});		  
}
 
 /**
  * 判断文件是否已上传
  */
 function fileIsValid(){
 	if (!tmplScript.uploadState){
 		layer.alert('模板资源脚本未上传', {icon: 5, title: "提示"});
 		return false 
 	}
 	return true;
 }