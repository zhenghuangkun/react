/***********模板设计**********/

/**
 * 页面初始化
 */
$(function(){
	
	initValidator();//初始化表单验证控件
	
	initLayuiUpload();//初始化文件上传控件
	
	initEditAble();//初始化实时编辑控件
	
	$("#saveBtn").click(function(){
		saveFormData();
	});

	
    
});

/**
 * 初始化表单提交事件
 */
function saveFormData(){
	var formValidator = $('#tmplDesignForm').data("bootstrapValidator");
	
	formValidator.validate();//手动触发验证
	
	//是否校验成功
	if(formValidator.isValid() && fileIsValid()){
		//获取表单数据并且转换为Json格式数据,添加文件信息
        var formData  = $('#tmplDesignForm').serializeJSON();
        formData.tmplImg = tmplImg;
        if(tmplScript.data != ""){
        	formData.tmplScript = tmplScript.data;
        }
        
        /*判断添加还是编辑*/
        var url = contextPath + '/tmpldesign/addtemplate';
        if($('#operation').val() == "edit"){
        	url = contextPath + '/tmpldesign/edittemplate'
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
	$('#tmplDesignForm').bootstrapValidator({
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
			tmplPrice: {
				validators: {
					notEmpty: {
						message: "模板价格不能为空"
					},
					numeric: {
						message: "请输入正确的价格，且价格不低于0"
					},
					minNumber: {
						message: "价格保留两位小数"
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
 * 初始化实时编辑控件
 */
 function initEditAble() {
 	//设置可编辑模式:内联或弹出(默认)
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    
		
 	// *** editable init *** //
	try {//ie8异常处理

		//首先让我们为有问题的浏览器添加一个伪appendChild方法。
		//因为可编辑插件调用appendChild，它会在未预测的点上造成IE错误
		try {
			document.createElement('IMG').appendChild(document.createElement('B'));
		} catch(e) {
			Image.prototype.appendChild = function(el){}
		}

		var last_gritter = "";
		$('#tmplImg').editable({
			type: 'image',
			name: 'tmplImg',
			value: null,
			//onblur: 'ignore',  //不要重置或隐藏可编辑的onblur?!
			image: {
				//在这里指定ace文件输入插件的选项。
				btn_choose: '更换图片',
				droppable: true,
				maxSize: 30000000,//~100Kb
				name: 'tmplImg',//字段名
				on_error : function(error_type) {//当选定的文件有问题时，将调用on_error函数。
					if(last_gritter) {
						$.gritter.remove(last_gritter);
					}
					
					if(error_type == 1) {//文件格式错误
						last_gritter = $.gritter.add({
							title: '文件不是图像!',
							text: '请选择jpg,gif,png格式图像!',
							class_name: 'gritter-error gritter-center'
						});
					} else if(error_type == 2) {//文件大小错误
						last_gritter = $.gritter.add({
							title: '文件太大!',
							text: '图像大小不超过30M!',
							class_name: 'gritter-error gritter-center'
						});
					} else {//其他错误
					}
				},
				on_success : function() {
					$.gritter.removeAll();
				}
			},
		    url: function(params) {
				// ***UPDATE AVATAR HERE*** //
				//对于一个工作上传示例，您可以替换该函数的内容。 
				//examples/profile-avatar-update.js
				
				var submit_url = contextPath +'/tmpldesign/imageUpload';//上传后台路径
				var deferred = null;
				var avatar = '#' + params.name;
				
				//如果值为空(“”)，则表示没有选择有效的文件。
				//但它仍然可以通过x-editable插件提交。
				//因为“”(空字符串)与之前的非空值不同。
				//我们只是来这里以预防问题
				var value = $(avatar).next().find('input[type=hidden]:eq(0)').val();
				if(!value || value.length == 0) {
					deferred = new $.Deferred
					deferred.resolve();
					return deferred.promise();
				}
				
				var $form = $(avatar).next().find('.editableform:eq(0)')
				var file_input = $form.find('input[type=file]:eq(0)');
				var pk = $(avatar).attr('data-pk');//发送到服务器的主键。
				
				var ie_timeout = null
				
				
				if( "FormData" in window ) {
					var formData_object = new FormData();//创建空FormData对象
					
					//序列化我们的表单(不包括文件输入)
					$.each($form.serializeArray(), function(i, item) {
						//将它们逐个添加到我们的FormData中。 
						formData_object.append(item.name, item.value);							
					});
					
					//添加文件
					$form.find('input[type=file]').each(function(){
						var field_name = $(this).attr('name');
						var files = $(this).data('ace_input_files');
						if(files && files.length > 0) {
							formData_object.append(field_name, files[0]);
						}
					});
					
				
					//将主键附加到我们的formData。
					formData_object.append('pk', pk);
					
					//添加额外参数
					formData_object.append('correlationId', $('#tmplId').val());
				
					deferred = $.ajax({
								url: submit_url,
							   type: 'POST',
						processData: false,//重要
						contentType: false,//重要
						   dataType: 'json',//服务端返回类型
							   data: formData_object
					})
				} 
				
				//延迟回调，由ajax和iframe解决方案触发。
				deferred.done(function(result) {//成功
					if(result.resultFlag == true){
						/*设置返回数据*/
						tmplImg = result.data;
					    $(avatar).get(0).src = result.data.fileUrl;
					} else {
						layer.alert(result.message, {
							icon: 5,
							title: "提示"
						});
					}
				}).fail(function(result) {//失败
					layer.alert('上传错误', {
						icon: 5,
						title: "提示"
					});
				}).always(function() {//超时
					if(ie_timeout) {
						clearTimeout(ie_timeout);
					} 
					ie_timeout = null;	
				});

				
				// ***END OF UPDATE AVATAR HERE*** //
			},
			
			success: function(response, newValue) {
			}
		})
	}catch(e) {}
	
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