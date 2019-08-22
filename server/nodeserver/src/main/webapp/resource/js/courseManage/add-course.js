/****添加课程管理*******/
//var myDropzone = null;
var experimentModifyFlag = false;  // true 修改
var selectCoursePicFlag = false; //是否选择课程图片了
var courseTypeDefaultPicUrl = "";
var selectCourseTypePicFlag = false; //是否选择课程类型图片了
var selectCourseTypePicSubmitFlag = false; //课程类型图片提交失败
var selectGuideFlag = false; //是否选择实验指南了

var experimentDescriptionShowLength = 28; // 课程描述最大长度


// 添加模态框用
var templateLibraryFlag = false;	// 模板库flag  false 为未从服务器取得数据，true为已取得数据
var templateLibraryObj = null;	// 模板库取得的数据
var templatePersionFlag = false;	// 个人模板flag  false 为未从服务器取得数据，true为已取得数据
var templatePersionObj = null;	// 个人模板取得的数据


//修改模态框用
var modifyTemplateLibraryFlag = false;	// 模板库flag  false 为未从服务器取得数据，true为已取得数据
var modifyTemplateLibraryObj = null;	// 模板库取得的数据
var modifyTemplatePersionFlag = false;	// 个人模板flag  false 为未从服务器取得数据，true为已取得数据
var modifyTemplatePersionObj = null;	// 个人模板取得的数据


/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	
	/* 选择实验组初始化 */
	experimentGroupSelectInit();
	courseValidator();
	courseExperimentTableInit();
	//initDropzone();
	
	var templet = $("#templetName").val();
	if(templet == "0"){
		$(".templateDescribe").hide();
	}else{
		$(".templateDescribe").show();
	}
	
	var modifytemplet = $("#modifyTempletName").val();
	if(modifytemplet == "0"){
		$(".modifyTemplateDescribe").hide();
	}else{
		$(".modifyTemplateDescribe").show();
	}
	
	$('.select2').css('width','100%').select2({allowClear:true});
	
	var courseOpenRange = $('.ace-courseOpenRange:radio:checked').val();
	if(courseOpenRange == "0"){
		$(".selectExperiment").show();
		$(".collegeOpenRange").hide();
	}else if(courseOpenRange == "1"){
		$(".selectExperiment").hide();
		$(".collegeOpenRange").show();
	}else{
		$(".selectExperiment").hide();
		$(".collegeOpenRange").hide();
	}
	
    $(".ace-courseOpenRange").click(function () {
    	value = $(this).val();
    	if(value == "0"){
    		$(".selectExperiment").show();
    		$(".collegeOpenRange").hide();
    	}else if(value == "1"){
    		$(".selectExperiment").hide();
    		$(".collegeOpenRange").show();
    	}else{
    		$(".selectExperiment").hide();
    		$(".collegeOpenRange").hide();
    	}
	});
    
    $(".ace-templateOrigin").click(function () {
    	value = $(this).val();
    	if(value == "0"){
    		
    		if(templateLibraryFlag == false){
    			$.ajax({
    				url : contextPath +'/course/getTemplateAllInfo.do',
    				type : 'POST',
    				traditional: true,//后台接收数组
    				dataType: "json",
    				data :{
    					'templateOrigin': value
    				},
    				success : function(data) {
    					if(data.resultFlag == true){
    						templateLibraryFlag = true;
    						templateLibraryObj = data.data;
    						resetTemplateSelect(data.data);
    					}
    					
    				}
    			});
    		}else{
    			resetTemplateSelect(templateLibraryObj);
    		}
    		
    		// 模板来源是模板库
    		//$("#templetName").removeClass('myhidden');
    		//$("#persionTempletName").addClass('myhidden');
    		
    		// 重置模板库选择框
    		//var options = $("#templetName").find("option");
    		//options.eq(0).attr("selected", true);
    		
    		$(".templateDescribe").hide();
    		
    	}else{
    		
    		if(templatePersionFlag == false){
    			$.ajax({
    				url : contextPath +'/course/getTemplateAllInfo.do',
    				type : 'POST',
    				traditional: true,//后台接收数组
    				dataType: "json",
    				data :{
    					'templateOrigin': value
    				},
    				success : function(data) {
    					if(data.resultFlag == true){
    						templatePersionFlag = true;
    						templatePersionObj = data.data;
    						resetTemplateSelect(data.data);
    					}
    					
    				}
    			});
    		}else{
    			resetTemplateSelect(templatePersionObj);
    		}
    		
    		// 模板来源是个人模板
    		//$("#templetName").addClass('myhidden');
    		//$("#persionTempletName").removeClass('myhidden');
    		
    		// 重置模板库选择框
    		//var options = $("#persionTempletName").find("option");
    		//options.eq(0).attr("selected", true);
    		
    		$(".templateDescribe").hide();
    	}
	});
    
    $(".ace-modifyTemplateOrigin").click(function () {
    	value = $(this).val();
    	if(value == "0"){
    		
    		if(modifyTemplateLibraryFlag == false){
    			$.ajax({
    				url : contextPath +'/course/getTemplateAllInfo.do',
    				type : 'POST',
    				traditional: true,//后台接收数组
    				dataType: "json",
    				data :{
    					'templateOrigin': value
    				},
    				success : function(data) {
    					if(data.resultFlag == true){
    						modifyTemplateLibraryFlag = true;
    						modifyTemplateLibraryObj = data.data;
    						modifyResetTemplateSelect(data.data);
    					}
    					
    				}
    			});
    		}else{
    			modifyResetTemplateSelect(modifyTemplateLibraryObj);
    		}
    		
    		// 模板来源是模板库
    		//$("#modifyTempletName").removeClass('myhidden');
    		//$("#modifyPersionTempletName").addClass('myhidden');
    		
    		// 重置模板库选择框
    		//var options = $("#modifyTempletName").find("option");
    		//options.eq(0).attr("selected", true);
    		
    		$(".modifyTemplateDescribe").hide();
    		
    	}else{
    		if(modifyTemplatePersionFlag == false){
    			$.ajax({
    				url : contextPath +'/course/getTemplateAllInfo.do',
    				type : 'POST',
    				traditional: true,//后台接收数组
    				dataType: "json",
    				data :{
    					'templateOrigin': value
    				},
    				success : function(data) {
    					if(data.resultFlag == true){
    						modifyTemplatePersionFlag = true;
    						modifyTemplatePersionObj = data.data;
    						modifyResetTemplateSelect(data.data);
    					}
    					
    				}
    			});
    		}else{
    			modifyResetTemplateSelect(modifyTemplatePersionObj);
    		}
    		
    		// 模板来源是个人模板
    		//$("#modifyTempletName").addClass('myhidden');
    		//$("#modifyPersionTempletName").removeClass('myhidden');
    		
    		// 重置模板库选择框
    		//var options = $("#modifyPersionTempletName").find("option");
    		//options.eq(0).attr("selected", true);
    		
    		$(".modifyTemplateDescribe").hide();
    	}
	});
    
    if($("#courseStartUpTypeVal").is(':checked')){
    	//自动-显示时间控件和提示框
		$('#courseStartTimeConfig').show();
		$('#promptCourseStartType').show();
    }else{
    	//手动-隐藏时间控件
		$('#courseStartTimeConfig').hide();
		$('#promptCourseStartType').hide();
    }
    
    //课程启动类型判断
    $("#courseStartUpTypeVal").on('change', function () {
    	if(this.checked) {
    		//自动-显示时间控件和提示框
    		$('#courseStartTimeConfig').show();
    		$('#promptCourseStartType').show();
		}
		else {
			//手动-隐藏时间控件
			$('#courseStartTimeConfig').hide();
			$('#promptCourseStartType').hide();
		}
    });
    
    
    /* 实验有效时间 */
    layui.use('laydate', function(){
    	var laydate = layui.laydate;
    	
    	//同时绑定多个
    	lay('.laydatetime').each(function(){
    		laydate.render({
    			elem: this,
            	type: 'datetime',
            	format: 'yyyy-MM-dd HH:mm:ss', //可任意组合
            	min: 0, //今天
            	max: 366 * 10, //10年
            	calendar: true, // 打开节日信息
            	//range: true //或 range: '~' 来自定义分割字符
    		});
    	});
    });
    
    
    // 取得课程默认图片的url
    courseTypeDefaultPicUrl = $('#courseTypeImg').attr('src');
    
    initCoursePicUpload();

    /* 初始化配置实验 */
    initExperimentGroupTable();
    
    // 初始化实验的时间
    Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {  
            "M+": this.getMonth() + 1, //月份   
            "d+": this.getDate(), //日   
            "H+": this.getHours(), //小时   
            "m+": this.getMinutes(), //分   
            "s+": this.getSeconds(), //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds() //毫秒   
        };  
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
        for (var k in o)  
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
        return fmt;  
    } 
    
    
    var nowDate = new Date();
    
    var startTimeStr = nowDate.Format("yyyy-MM-dd HH:mm:ss");
    
    // 下个月的时间
    nowDate.setMonth(nowDate.getMonth() + 1); // 月数从0开始
    var endTimeStr = nowDate.Format("yyyy-MM-dd HH:mm:ss");

    
    $("#startTime").val(startTimeStr);
    $("#endTime").val(endTimeStr);
    
    //初始化修改模态框模板选择框的数据
    initModifyTemplateSelectInfo(0); // 初始化（模板库）
    
    initModifyTemplateSelectInfo(1); // 初始化（个人模板）
});

//初始化修改模态框模板选择框的数据
function initModifyTemplateSelectInfo(templateOriginTemp){
	
	$.ajax({
		url : contextPath +'/course/getTemplateAllInfo.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'templateOrigin': templateOriginTemp
		},
		success : function(data) {
			if(data.resultFlag == true){
				if(templateOriginTemp == 0){
					// 保存数据（模板库）
					modifyTemplateLibraryFlag = true;
					modifyTemplateLibraryObj = data.data;
				}else{
					// 保存数据（个人模板）
					modifyTemplatePersionFlag = true;
					modifyTemplatePersionObj = data.data;
				}
			}
		}
	});
}

/**
 * 重置模板选择下拉框(添加模态框)
 * @param templateList
 */
function resetTemplateSelect(templateList){
	// 取得选择模板对象
	var templateSelect = $("#templetName");
	// 取得选择模板所有的options
	var templateAllOptions = $("#templetName option");
	
	var emptyOption = "<option value='0' selected>请选择</option>";
	
	templateAllOptions.remove();
	templateSelect.append(emptyOption);
	
	$.each(templateList, function(index, template){
		var str = "<option value='" + template.tmplId + "'>" + template.tmplName + "</option>";
		templateSelect.append(str);
	});	
}

/**
 * 重置模板选择下拉框(修改模态框)
 * @param templateList
 */
function modifyResetTemplateSelect(templateList){
	// 取得选择模板对象
	var templateSelect = $("#modifyTempletName");
	// 取得选择模板所有的options
	var templateAllOptions = $("#modifyTempletName option");
	
	var emptyOption = "<option value='0' selected>请选择</option>";
	
	templateAllOptions.remove();
	templateSelect.append(emptyOption);
	
	$.each(templateList, function(index, template){
		var str = "<option value='" + template.tmplId + "'>" + template.tmplName + "</option>";
		templateSelect.append(str);
	});	
}


var zTreeObj = null;
/*实验组树对象 初始化配置*/
var setting = {
		check: {
			enable: true,
			chkDisabledInherit: true
		},
		data: {
			key: {
				name: "name",
				title: "name"
			}
		}
};

/**
 * 实验组ZTree初始化
 * @param roleId
 */
function experimentGroupSelectInit(){
	/*获取菜单树*/
	$.ajax({
		url : contextPath +'/experiment/getAllGroup.do',
		type : 'POST',
		data : {},
		dataType: "json",
		success : function(data) {
			/*初始化树*/
			zTreeObj = $.fn.zTree.init($("#mytree"), setting, data);
			zTreeObj.expandAll(true);//展开所有节点
			nodes = zTreeObj.getCheckedNodes(false);
			//alert(nodes.length);
			for (var i=0, l=nodes.length; i<l; i++) {
				//alert(nodes[i].isParent);
				if(nodes[i].isParent == false){
					zTreeObj.setChkDisabled(nodes[i], true, false, true);
				}
				
			}
		}
	});
	return false;
}


function courseValidator(){
	
	//课程配置验证
	$('#addCourseFrom').bootstrapValidator({
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		//excluded:[":hidden",":disabled",":not(visible)"] ,//bootstrapValidator的默认配置
		fields: {
			courseName: {
				validators: {
					notEmpty: {
						message: '课程名不能为空！'
					},
					stringLength: {
						min: 0,
						max: 30,
						message: "课程名称限制30字符"
					}
					
				}
			},
			collegeId: {
				validators: {
					notEmpty: {
						message: '学院名称不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择学院！'
					}
				}
			},
			specialtyId: {
				validators: {
					notEmpty: {
						message: '专业不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择专业！'
					}
				}
			},
			courseType: {
				validators: {
					notEmpty: {
						message: '课程类型不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择课程类型！'
					}
				}
			},
			courseTypeLevel:{
				validators: {
					notEmpty: {
						message: '课程等级不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择课程等级！'
					}
				}
			},
			coursePic: {
				validators: {
					notEmpty: {
						message: '没有选择课程图片！'
					}
				}
			},
			description: {
				validators: {
					notEmpty: {
						message: '课程描述不能为空！'
					},
					stringLength: {
						min: 0,
						max: 500,
						message: "课程描述限制500字符"
					}
				}
			}
			/*courseStratTime: {
				validators: {
					notEmpty: {
						message: '课程启动日期不能为空！'
					},
					regexp: {
						regexp: /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,  格式为双 // 里的表达式 
						message: '课程启动日期格式不正确！'
					}
				}
			}*/
		}
	});
	
	//添加实验验证
	$('#addCourseExperimentForm').bootstrapValidator({
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			experimentName: {
				validators: {
					notEmpty: {
						message: '实验名不能为空！'
					},
					stringLength: {
						min: 0,
						max: 32,
						message: "实验名称限制32字符"
					}
				}
			},
			/*templetName: {
				validators: {
					notEmpty: {
						message: '实验模板不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择实验模板！'
					}
				}
			},*/
			/*persionTempletName:{
				validators: {
					notEmpty: {
						message: '实验模板不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择实验模板！'
					}
				}
			},*/
			experimentDescription: {
				validators: {
					notEmpty: {
						message: '请输入实验描述！'
					},
					stringLength: {
						min: 0,
						max: 256,
						message: "实验描述限制256字符"
					}
				}
			},
			runtime: {
				validators: {
					notEmpty: {
						message: '实验时长不能为空！'
					},
					regexp: {
						regexp: /^[1-9]\d{0,3}$/, /* 格式为双 // 里的表达式 */
						message: '实验时长格式不正确！'
					}
				}
			},
			guideName: {
				validators: {
					notEmpty: {
						message: '请选择实验指南！'
					},
					labelVerify:{   //自定义规则-值为空-没有选择
						message: '请添加实验指南！'
					}
				}
			}/*,
			keyName: {
				validators: {
					notEmpty: {
						message: '密钥不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择密钥！'
					}
				}
			}*/
		}
	});
	
	// 修改课程实验验证
	$('#modifyCourseExperimentForm').bootstrapValidator({
		message: '该字段无效！',
		feedbackIcons: {
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			modifyexperimentName: {
				validators: {
					notEmpty: {
						message: '实验名不能为空！'
					},
					stringLength: {
						min: 0,
						max: 32,
						message: "实验名称限制32字符"
					}
				}
			},
			/*modifyTempletName: {
				validators: {
					notEmpty: {
						message: '实验模板不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择实验模板！'
					}
				}
			},*/
			/*modifyPersionTempletName: {
				validators: {
					notEmpty: {
						message: '实验模板不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择实验模板！'
					}
				}
			},*/
			modifyExperimentDescription: {
				validators: {
					notEmpty: {
						message: '请输入实验描述！'
					},
					stringLength: {
						min: 0,
						max: 256,
						message: "实验描述限制256字符"
					}
				}
			},
			modifyRuntime: {
				validators: {
					notEmpty: {
						message: '实验时长不能为空！'
					},
					regexp: {
						regexp: /^[1-9]\d{0,3}$/, /* 格式为双 // 里的表达式 */
						message: '实验时长格式不正确！'
					}
				}
			},
			modifyExperimentGuideFileName: {
				validators: {
					notEmpty: {
						message: '请选择实验指南！'
					},
					labelVerify:{   //自定义规则-值为空-没有选择
						message: '请添加实验指南！'
					}
				}
			}/*,
			modifyKeyName: {
				validators: {
					notEmpty: {
						message: '密钥不能为空！'
					},
					selectVerify:{   //自定义规则-值为0没有选择
						message: '请选择密钥！'
					}
				}
			}*/
		}
	});
}

//添加实验方法
var courseExperimentTB = "";

function courseExperimentTableInit(){
	courseExperimentTB = $('#courseExperimentTB').DataTable({
		stateSave:false,
	    lengthChange: true,
	    searching: false,
	    ordering: false,
	    info: true,
	    autoWidth: false,
	    paging: true,
	    serverSide:false,
	    pagingType: "full_numbers",
	    iDisplayLength: 10,
        lengthMenu: [10, 50, 100],
		columns: [
		       /*{
				"data": null,
				"title": "序号",
				"render": function (data, type, row, meta) {
					return meta.settings._iDisplayStart + meta.row + 1;
				}
		       },*/{
				   "data": "experimentName",
				   "title":"<th>实验名</th>",
				   "width": "12%"
			   },{
				   "data": "experimentRegionId",
				   "title":"区域",
				   "visible": false
			   },{
				   "data": "experimentRegionName",
				   "title":"区域",
				   "width": "6%"
			   },{
				   "data": "templetName",
				   "title":"实验模板",
				   "width": "8%"
			   },{
				   "data": "templateId",
				   "title":"实验模板",
				   "visible": false
			   },{
				   "data": "experimentDescriptionTmp",
				   "title":"实验描述<small>(最多256个字符)</small>",
				   "width": "18%"
			   },{
				   "data": "experimentDescription",
				   "title":"实验描述<small>(最多256个字符)</small>",
				   "visible": false
			   },{
				   "data": "runtime",
				   "title":"时长<small>(分)</small>",
				   "width": "8%"
			   },{
				   "data": "guideName",
				   "title":"实验指南",
				   "width": "9%"
			   },{
				   "data": "guideInfo",
				   "title":"实验指南",
				   "visible": false
			   },{
				   "data": "policyId",
				   "title":"策略",
				   "visible": false,
				   "render":function(data, type, row, meta){
					   if(data == null){
						   return "";
					   }else{
						   return data;
					   }
				   }
			   },{
				   "data": "policyName",
				   "title":"策略",
				   "width": "8%",
				   "render":function(data, type, row, meta){
					   if(data == null){
						   return "";
					   }else{
						   return data;
					   }
				   }
			   },{
				   "data": "startTime",
				   "title":"开始时间",
				   "width": "12%",
				   "render":function(data, type, row, meta){
					   if(data == null){
						   return "";
					   }else{
						   return data;
					   }
				   }
			   },{
				   "data": "endTime",
				   "title":"结束时间",
				   "width": "12%",
				   "render":function(data, type, row, meta){
					   if(data == null){
						   return "";
					   }else{
						   return data;
					   }
				   }
			   },
			   {
				   "data": "templateOrigin",
				   "title":"模板来源",
				   "visible": false
			   },
			   /*{
				   "data": "keyName",
				   "title":"密钥"
			   },{
				   "data": "keyFile",
				   "title":"密钥",
				   "visible": false
			   },*/{
				   "data": "opt",
				   "title":"操作",
				   "width": "7%",
				   "render":function(data, type, row, meta){
					   return "<div class='hidden-sm hidden-xs action-buttons'>" +
							    "<a class='green' href='javascript:void(0)' onclick='modifyExperiment(this)'>" +
				   				"<i class='ace-icon fa fa-pencil bigger-130'></i>" +
				   				"</a>" +
				   				"<a class='red' href='javascript:void(0)' onclick='deleteExperiment(this)'>" +
				   				"<i class='ace-icon fa fa-trash-o bigger-130'></i>" +
				   				"</a>" +
				   			  "</div>" ;
				   }
			   }
         ],
		language: {
			url: contextPath + "/resource/json/language-zh.json"
		},
		createdRow: function ( row, data, index ) {
			
			var obj = $(row).children('td').eq(2);
			
			var length = data.experimentDescription.length;
			var substr = "";
			if(length > experimentDescriptionShowLength){//只有超长，才有td点击事件
				
				obj.attr('onclick','changeShowExperimentDetail(this);');
				var substr = getPartialDescriptionHtml(data.experimentDescription);
				obj.attr('isDetail',false);
			}else{
				var substr = data.experimentDescription;
				obj.attr('isDetail', true);
			}
			
			obj.attr('data-content', data.experimentDescription);
			obj.html(substr);
        },
        rowCallback: function( row, data, index ) {
        	var obj = $(row).children('td').eq(2);
			
			var length = data.experimentDescription.length;
			var substr = "";
			if(length > experimentDescriptionShowLength){//只有超长，才有td点击事件
				
				obj.attr('onclick','changeShowExperimentDetail(this);');
				var substr = getPartialDescriptionHtml(data.experimentDescription);
				obj.attr('isDetail',false);
			}else{
				var substr = data.experimentDescription;
				obj.attr('isDetail', true);
			}
			
			obj.attr('data-content', data.experimentDescription);
			obj.html(substr);
        }
	});
	
}

function changeShowExperimentDetail(obj){
	var content = $(obj).attr("data-content");
	
	if(content != null && content != ''){
      if($(obj).attr("isDetail") == 'true'){//当前显示的是详细信息，切换到显示部分
         //$(obj).removeAttr('isDetail');//remove也可以
         $(obj).attr('isDetail', false);
         $(obj).html(getPartialDescriptionHtml(content));
      }else{//当前显示的是部分详细信息，切换到显示全部
         $(obj).attr('isDetail',true);
         $(obj).html(getTotalDescriptionHtml(content));
      }
   }

}


//部分信息
function getPartialDescriptionHtml(detail){
	return detail.substr(0, experimentDescriptionShowLength) + '&nbsp;&nbsp;<a href="javascript:void(0);" style="color:#49c6b9b3;"><b>[展开]</b></a>';
}

//全部信息
function getTotalDescriptionHtml(detail){
	
	if(detail.length > experimentDescriptionShowLength){
		return detail + '&nbsp;&nbsp;<a href="javascript:void(0);" style="color:#49c6b9b3;">[收起]</a>';
	}
	
	return detail;
}

function addCourseExperimentFunc(){
	var bv = $('#addCourseExperimentForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	
	if(selectGuideFlag == false){
		layer.msg('请上传实验指南.', {icon: 7});
		return;
	}
	
	$('#addCourseExperiment').modal('hide');
	
	//加载层-风格4
	layer.msg('添加中', {
	  icon: 16
	  ,shade: 0.01
	  ,time: 0 
	});
	
	
	
	// 先保存from的数据
	saveExperimentFromDate();
	
	getGxperimentGuideUrl();
	
	$('#addCourseExperimentForm')[0].reset();
	$('#addCourseExperimentForm').data("bootstrapValidator").resetForm();
	
}

var experimentName = "";
var templateId = "";
var templetName = "";
var experimentDescription = "";
var runtime = "";
var guideName = "";
var keyName = "";
var keyFile = "";	
var startTime = "";
var endTime = "";
var templateOrigin = 0;
var policyId = "";
var policyName = "";
var experimentRegionId = "";
var experimentRegionName = "";

function saveExperimentFromDate(){
	/* 取得表单数据 */
	experimentName = $("#experimentName").val();
	
	templateOrigin = $('.ace-templateOrigin:radio:checked').val();
	
	templateId = $("#templetName  option:selected").val();
	templetName = $("#templetName option:selected").text();
	
	experimentRegionId = $("#experimentRegion  option:selected").val();
	experimentRegionName = $("#experimentRegion option:selected").text();
	/*if(templateOrigin == 0){
		templateId = $("#templetName  option:selected").val();
		templetName = $("#templetName option:selected").text();
	}else{
		templateId = $("#persionTempletName  option:selected").val();
		templetName = $("#persionTempletName option:selected").text();
	}*/
	
	experimentDescription = $("#experimentDescription").val();
	runtime = $("#runtime").val();
	guideName = $("#guideName").text();
	startTime = $("#startTime").val();
	endTime = $("#endTime").val();
	
	//keyName = $("#keyName option:selected").text();
	//keyFile = $("#keyName option:selected").val();
	
	policyName = $("#policyId option:selected").text();
	policyId = $("#policyId option:selected").val();
	
	if(policyId == "0"){
		policyName = "";
	}
}

function resetExperimentFromDate(){
	experimentName = "";
	templateId = "";
	templetName = "";
	experimentRegionId = "";
	experimentRegionName = "";
	experimentDescription = "";
	runtime = "";
	guideName = "";
	startTime = "";
	endTime = "";
	templateOrigin = 0;
	//keyName = "";
	//keyFile = "";	
	policyId = "";
	policyName = "";	
	
	var templet = $("#templetName").find("option");
	$(templet[0]).attr("selected", "selected");
	$(".templateDescribe").hide();
	
	var experimentRegion = $("#experimentRegion").find("option");
	$(experimentRegion[0]).attr("selected", "selected");
	
	//var keyName = $("#keyName").find("option");
	//$(keyName[0]).attr("selected", "selected");
	
	var policy = $("#policyId").find("option");
	$(policy[0]).attr("selected", "selected");
	
	

	// 时间清空
	//$("#startTime").val("");
	//$("#endTime").val("");
}

/**
 * 取消添加课程实验-隐藏模态框
 */
function cancelAddExperimentFunc(){
	resetExperimentFromDate();
	
	//保存之前的时间
	var startTimeStr = $("#startTime").val();
	var endTimeStr = $("#endTime").val();
	
	$('#addCourseExperimentForm')[0].reset();
	$('#addCourseExperimentForm').data("bootstrapValidator").resetForm();
	
	//var templateValue = $('.ace-templateOrigin:radio:checked').val();
	
	// 重置模板库选择框
	var options = $("templetName").find("option");
	options.first().attr("selected", true);
	$(".templateDescribe").hide();

	
	
	// 时间设置跟之前一样
	$("#startTime").val(startTimeStr);
	$("#endTime").val(endTimeStr);
	
	$("#guideName").text("");
	
	//设置选择指南标志为false
	selectGuideFlag = false;
	$('#addCourseExperiment').modal('hide');
}

/****************************************
 * 添加课程实验列表初始化
 ****************************************/
function addCourseExperimentTB(guideInfo) {
	
	//alert(experimentUUID);
	if(guideInfo == "ng"){
		
		layer.msg('添加失败，请重试', {icon: 4});
		return;
	}
	
	/*alert(experimentName + "," + templetId + ","+ templetName+ ","+
			experimentDescription + "," +runtime + "," + guideUrl + "," +
			keyName + "," + keyFile);*/
	
	
	
	courseExperimentTB.row.add({
		experimentUUID: experimentUUID, 
		experimentName: experimentName,
		experimentRegionId: experimentRegionId, 
		experimentRegionName: experimentRegionName,
		templetName: templetName, 
		templateId: templateId, 
		experimentDescriptionTmp: experimentDescription,
		experimentDescription: experimentDescription, 
		runtime: runtime, 
		guideName: guideName,
		guideInfo: guideInfo,
		startTime: startTime,
		endTime: endTime,
		templateOrigin:templateOrigin,
		policyId : policyId,
		policyName : policyName
		/*keyName: keyName,
		keyFile: keyFile*/
	}).draw();
	
	layer.close(layer.index);
	
	resetExperimentFromDate();
	$('#addCourseExperimentForm')[0].reset();
	$("#guideName").text("");
	//添加完成设置选择指南标志为false
	selectGuideFlag = false;
	$('#addCourseExperiment').modal('hide');
}

function getGxperimentGuideUrl(){
	
	/*$(this).ajaxSend(function(e,xhr,opt){
		layer.load();
	  });*/
	
	/* 添加课程请求 */
	/*$.ajax({
		url : contextPath +'/course/getExperimentUuid',
		type : 'POST',
		data : new FormData($('#addCourseExperimentForm')[0]),
		async: false,  // 设置为同步
		beforeSend: function(){
			layer.load();
        },
		success : function(data) {
			// 取得字符串
			var str  = data.toString();
			// 去掉字符串两边的双引号
			var regexp = new RegExp("\"", "g");
			var str = str.replace(regexp, "");
			experimentUuid = str;
			layer.closeAll(); //关闭加载层
		},
		error: function(data, status, e) {  //提交失败自动执行的处理函数。
            console.error(e);
        }
	});*/
	
	$("#submitExperimentGuild").trigger("click");
	/* 添加课程实验请求-上传实验指南 */
	/*$.ajaxFileUpload({
        url : contextPath +'/course/getExperimentUuid',//后台请求地址
        type: 'post',//请求方式  当要提交自定义参数时，这个参数要设置成post
        secureuri : false,//是否启用安全提交，默认为false。 
        fileElementId : 'guideName',// 需要上传的文件域的ID，即<input type="file">的ID。
        dataType : 'json',//服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。如果json返回的带pre,这里修改为json即可解决。
        success : function (data, status) {//提交成功后自动执行的处理函数，参数data就是服务器返回的数据-实验指南url。

        	addCourseExperimentTB(data);
        	
        },
        error : function (json, status, e) {//提交失败自动执行的处理函数。
        	addCourseExperimentTB("ng");
        }
    });*/
	
	/*$(this).ajaxSuccess(function(){
		layer.closeAll(); //关闭加载层
	});*/
	
	
	return;
}


function viewPictures(id){
	
	// 获取对象ID
	var targetId = "#" + id;
	
	//取得图片宽高
	var img = document.getElementById(id);
	var width = img.width;
	var height = img.height;
    
	//弹出原图
	layer.open({
	  type: 1,
	  title: false,
	  closeBtn: 0,
	  area: [width, height], //设置大小
	  skin: 'layui-layer-nobg', //没有背景色
	  shadeClose: true,
	  content: $(targetId)
	});
	
}

var successPrompt = "课程提交审核成功";
var continuePrompt = "确定提交课程审核?";
var requestType; // 请求类型
var formData; //表单数据
var experimentList ; //实验数据
var groupIdList; //实验数据


function submitCourseCheck(){
	
	
	var bv = $('#addCourseFrom').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	
	if(selectCoursePicFlag == false){
		layer.msg('请上传课程图片.', {icon: 7});
		return;
	}
	
	/* 将表达数据转为JSON数组 */
	formData = "";
	formData = JSON.stringify($('#addCourseFrom').serializeJSON());
	
	/* 获取选中节点 */
	var nodes = zTreeObj.getCheckedNodes(true);
	if(nodes.length <= 0 && $('.ace-courseOpenRange:radio:checked').val() == 0){
		layer.msg('请选择课程实验组.', {icon: 7});
		return false;
	}
	if(nodes.length != 1 && $('.ace-courseOpenRange:radio:checked').val() == 0){
		layer.msg('只能选择一个实验组.', {icon: 7});
		return false;
	}
	
	/*保存选中节点的groupid*/
	var groupIdListTmp = new Array();
	$.each(nodes, function(index, data){
		if(data.isParent == true){
			groupIdListTmp.push(data);
		}
	});
	
	groupIdList = "";
	groupIdList = JSON.stringify(groupIdListTmp);
	/* 获取请求类型 */
	requestType = "";
	requestType = $("#requestType").val();
	$("#requestType").val("add");
	if(requestType == "save"){
		successPrompt = "课程保存成功";
		continuePrompt = "确定保存课程吗?"
	}else{
		successPrompt = "课程提交审核成功";
		continuePrompt = "确定提交课程审核?"
	}
	
	/* 将实验列表转成json数组 */
	var data = courseExperimentTB.rows().data().toArray();
	experimentList = "";
	experimentList = JSON.stringify(data);
	if(data.length <= 0){
		/* 添加课程请求 */
		layer.confirm("您还没添加课程实验,"+continuePrompt, {
			icon: 3,
			title: "确认消息"
		}, function () {
			
			layer.close(layer.index);
			
			//加载层-风格4
			layer.msg('添加中', {
			  icon: 16
			  ,shade: 0.01
			  ,time: 0 
			});
			
			// 触发提交课程图片的点击事件
			$("#startSubmit").trigger("click");

		});
		
		return false;
	}
	
	/* 添加课程请求 */
	layer.confirm(continuePrompt, {
		icon: 3,
		title: "确认消息"
	}, function () {
		
		layer.close(layer.index);
		//加载层-风格4
		layer.msg('添加中', {
		  icon: 16
		  ,shade: 0.01
		  ,time: 0 
		});
		
		// 触发提交课程图片的点击事件
		$("#startSubmit").trigger("click");

	});
	
	return true;
}

function submitCourseInfo(coursePicInfo){
	
	// 课程图片成功上传后提交课程信息;
	$.ajax({
		url : contextPath +'/course/addCourse.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'requestType': requestType,
			'coursePicInfo':JSON.stringify(coursePicInfo),
			'course':formData,
			'groupIdList':groupIdList,
			'experimentList':experimentList
		},
		success : function(data) {
			
			layer.close(layer.index);
			
			if(data.resultFlag == true){
				
				
				// 成功提示
				layer.confirm(successPrompt, {
					icon: 1,
					title: "提示",
					closeBtn:false,
					btn: ['确定', '继续添加']
				}, function () {
					//返回课程信息界面
					window.location = contextPath + "/coursemgt/courseinfo";
				}, function(){
					//继续添加的回调,刷新当前页面
					window.location = contextPath + "/coursemgt/addcourse";
				});
				
			}else{
				
				layer.msg(data.message, {icon: 5});
			}
			
		}
	});
}

function saveCourse(){

	$("#requestType").val("save");
	submitCourseCheck();
}

function quitAddPage(){
	//跳转到课程课程管理页面
	window.location = contextPath + "/coursemgt/courseinfo";
	
}

/* 增加实验时长  10递增 */
function increaseDown(){
	var time = $("#runtime").val();
	var tmp = 0;
	
	if(time == ''){
		tmp = 10;
	}else{
		//time += 10;
		tmp = parseInt(time);
		
		
		tmp += 10;
		
		if(tmp >= 3600){
			tmp = 3600;
		}
	}
	
	//设置值;
	$("#runtime").val(tmp);
}

/* 减少实验时长  10递减 */
function decreaseDown(){
	
	var time = $("#runtime").val();
	var tmp = 0;
	
	if(time == ''){
		tmp = 0;
	}else{
		tmp = parseInt(time);
		tmp -= 10;
		
		if(tmp <= 0){
			tmp = 0;
		}
	}
	
	//alert(time);
	$("#runtime").val(tmp);
}


/* 增加实验时长  10递增 */
function modifyIncreaseDown(){
	var time = $("#modifyRuntime").val();
	var tmp = 0;
	
	if(time == ''){
		tmp = 10;
	}else{
		//time += 10;
		tmp = parseInt(time);
		
		
		tmp += 10;
		
		if(tmp >= 3600){
			tmp = 3600;
		}
	}
	
	//设置值;
	$("#modifyRuntime").val(tmp);
}

/* 减少实验时长  10递减 */
function modifyDecreaseDown(){
	
	var time = $("#modifyRuntime").val();
	var tmp = 0;
	
	if(time == ''){
		tmp = 0;
	}else{
		tmp = parseInt(time);
		tmp -= 10;
		
		if(tmp <= 0){
			tmp = 0;
		}
	}
	
	//alert(time);
	$("#modifyRuntime").val(tmp);
}

var modifyrow = null;
var rowData = null;
var modifyexperimentName = "";
var modifytemplateId = "";
var modifytempletName = "";
var modifyexperimentDescription = "";
var modifyruntime = "";
var modifyguideName = "";
var modifykeyName = "";
var modifykeyFile = "";	
var modifyStartTime = "";
var modifyEndTime = "";	
var modifyTemplateOrigin = 0;
var modifyPolicyId = "";
var modifyPolicyName = "";
var modifyExperimentRegionId = "";
var modifyExperimentRegionName = "";

function saveModifyExperimentFromData(){
	/* 取得表单数据 */
	modifyexperimentName = $("#modifyexperimentName").val();
	
	modifyTemplateOrigin = $('.ace-modifyTemplateOrigin:radio:checked').val();
	
	modifytemplateId = $("#modifyTempletName  option:selected").val();
	modifytempletName = $("#modifyTempletName option:selected").text();
	
	modifyExperimentRegionId = $("#modifyExperimentRegion  option:selected").val();
	modifyExperimentRegionName = $("#modifyExperimentRegion option:selected").text();
	
	/*if(modifyTemplateOrigin == 0){
		modifytemplateId = $("#modifyTempletName  option:selected").val();
		modifytempletName = $("#modifyTempletName option:selected").text();
	}else{
		modifytemplateId = $("#modifyPersionTempletName  option:selected").val();
		modifytempletName = $("#modifyPersionTempletName option:selected").text();
	}*/
	
	modifyexperimentDescription = $("#modifyExperimentDescription").val();
	modifyruntime = $("#modifyRuntime").val();
	modifyguideName = $("#modifyExperimentGuideFileName").text();
	//modifykeyName = $("#modifyKeyName option:selected").text();
	//modifykeyFile = $("#modifyKeyName option:selected").val();
	modifyStartTime = $("#modifyStartTime").val();
	modifyEndTime = $("#modifyEndTime").val();
	
	modifyPolicyName = $("#modifyPolicyId option:selected").text();
	modifyPolicyId = $("#modifyPolicyId option:selected").val();
	
	if(modifyPolicyId == "0"){
		modifyPolicyName = "";
	}
}

function resetModifyExperimentFromDate(){
	modifyexperimentName = "";
	modifyExperimentRegionId = "";
	modifyExperimentRegionName = "";
	modifytemplateId = "";
	modifytempletName = "";
	modifyexperimentDescription = "";
	modifyruntime = "";
	modifyguideName = "";
	//modifykeyName = "";
	//modifykeyFile = "";
	modifyStartTime = "";
	modifyEndTime = "";
	modifyStartTime = "";
	modifyEndTime = "";
	modifyTemplateOrigin = 0;
	modifyPolicyName = "";
	modifyPolicyId = "";
}


/* 修改实验onclick函数，显示模态框 */
function modifyExperiment(obj){
	modifyrow = courseExperimentTB.row( $(obj).parents('tr') );
	
	rowData = modifyrow.data();
	
	if(rowData.templateOrigin == 0){
		$("#modifyTemplateLibrary").prop("checked",true);
		
		// 模板来源是模板库
		//$("#modifyTempletName").removeClass('myhidden');
		//$("#modifyPersionTempletName").addClass('myhidden');
		
	}else{
		$("#modifyPersionTemplate").prop("checked",true);
		
		// 模板来源是个人模板
		//$("#modifyTempletName").addClass('myhidden');
		//$("#modifyPersionTempletName").removeClass('myhidden');
	}
	
	
	initChangeTemplate(rowData.templateId);
	
	$("#modifyexperimentName").val(rowData.experimentName);
	
	if(rowData.experimentRegionId == "cn-north-1"){
		$("#modifyExperimentRegion option[value='cn-north-1']").attr("selected", false);
		$("#modifyExperimentRegion option[value='cn-northwest-1']").attr("selected", false);
		$("#modifyExperimentRegion option[value='cn-north-1']").attr("selected", true);
		
	}else{
		$("#modifyExperimentRegion option[value='cn-north-1']").attr("selected", false);
		$("#modifyExperimentRegion option[value='cn-northwest-1']").attr("selected", false);
		$("#modifyExperimentRegion option[value='cn-northwest-1']").attr("selected", true);
	}
	//var temp = "#modifyTempletName option[value='" + rowData.templateId + "']";
	//$("#modifyTempletName").removeClass("select2");
	$("#modifyTempletName option[value='" + rowData.templateId + "']").attr("selected",true);
	//$("#modifyPersionTempletName option[value='" + rowData.templateId + "']").attr("selected",true);
	
	$("#modifyExperimentDescription").val(rowData.experimentDescription);
	$("#modifyRuntime").val(rowData.runtime);
	$("#modifyExperimentGuideFileName").text(rowData.guideName);
	//var key = "#modifyKeyName option[value='rowData.keyFile']";
	//$("#modifyKeyName option[value='"+rowData.keyFile+"']").attr("selected",true);
	
	$("#modifyPolicyId option[value='" + rowData.policyId + "']").attr("selected",true);
	
	$("#modifyStartTime").val(rowData.startTime);
	$("#modifyEndTime").val(rowData.endTime);
	
	
	
	// 修改字数提示
	$("#description-experimentModify-total").text(rowData.experimentDescription.length);
	
	$('#modifyCourseExperiment').modal('show');
}




/* 提交修改课程实验函数 */
function modifyCourseExperimentFunc(){
	
	var bv = $('#modifyCourseExperimentForm').data('bootstrapValidator');
	bv.validate();
	if (!bv.isValid()) {
		return;
	}
	
	$('#modifyCourseExperiment').modal('hide');
	
	//加载层-风格4
	layer.msg('修改中', {
	  icon: 16
	  ,shade: 0.01
	  ,time: 0 
	});
	
	saveModifyExperimentFromData();
	
	if(experimentModifyFlag == true){
		$("#modifyExperimentGuild").trigger("click");
	}else{
		drawModifyExperimentInfo("noUpdate");
	}

	
}

function drawModifyExperimentInfo(guideInfo){
	if(guideInfo != "noUpdate"){
		modifyrow.data({
			experimentId: rowData.experimentId, 
			experimentNo: rowData.experimentNo, 
			experimentName: modifyexperimentName,
			experimentRegionId: modifyExperimentRegionId, 
			experimentRegionName: modifyExperimentRegionName, 
			templetName: modifytempletName, 
			templateId: modifytemplateId, 
			experimentDescription: modifyexperimentDescription, 
			runtime: modifyruntime, 
			guideName: modifyguideName,
			guideInfo: guideInfo,
			startTime: modifyStartTime,
			endTime: modifyEndTime,
			templateOrigin: modifyTemplateOrigin,
			policyId: modifyPolicyId,
			policyName: modifyPolicyName
			//keyName: modifykeyName,
			//keyFile: modifykeyFile
		});
		
	}else{
		modifyrow.data({
			experimentId: rowData.experimentId, 
			experimentNo: rowData.experimentNo, 
			experimentName: modifyexperimentName, 
			experimentRegionId: modifyExperimentRegionId, 
			experimentRegionName: modifyExperimentRegionName, 
			templetName: modifytempletName, 
			templateId: modifytemplateId, 
			experimentDescriptionTmp: modifyexperimentDescription, 
			experimentDescription: modifyexperimentDescription, 
			runtime: modifyruntime, 
			guideName: modifyguideName,
			guideInfo: rowData.guideInfo, 
			startTime: modifyStartTime,
			endTime: modifyEndTime,
			templateOrigin: modifyTemplateOrigin,
			policyId: modifyPolicyId,
			policyName: modifyPolicyName
			//keyName: modifykeyName,
			//keyFile: modifykeyFile
		});
	}
	
	layer.close(layer.index);
	
	resetModifyExperimentFromDate();
	courseExperimentTB.draw();
	$("#modifyTempletName option[value='"+modifytemplateId+"']").attr("selected",false);
	$("#modifyKeyName option[value='"+modifykeyFile+"']").attr("selected",false);
	$('#modifyCourseExperiment').modal('hide');
}

function deleteExperiment(obj){
	var row = courseExperimentTB.row( $(obj).parents('tr') );
	row.remove();
	courseExperimentTB.draw();
}


/**
 * 初始化文件上传控件
 */
function initCoursePicUpload()
{
	
	layui.use('upload', function(){
		var $ = layui.jquery
		  ,upload = layui.upload;
	  
		//选完文件后不自动上传-课程图片
	  /*upload.render({
	    elem: '#coursePic'
	    ,url: contextPath + "/course/uploadCoursePic"
	    ,auto: false
	    //,multiple: true
	    ,bindAction: '#startSubmit'
	    ,done: function(res){
	      if(res.resultFlag == true){
	    	  submitCourseInfo(res.data);
	      }else{
	    	  layer.msg('课程图片上传失败，请稍后重试..', {icon: 5});
	      }
	    }
	  });*/
		
		//选完文件后不自动上传-课程图片
		  upload.render({
		    elem: '#coursePic'
		    ,url: contextPath + "/course/uploadCoursePic"
		    ,auto: false
		    //,multiple: true
		    ,size: 5120 //限制文件大小，单位 5120KB 5M
		    ,drag: true //允许拖拉上传
		    ,accept: 'images'//上传类型
		    ,bindAction: '#startSubmit'
	    	,choose: function(obj){
	    		selectCoursePicFlag = true;
		        //预读本地文件示例，不支持ie8
		        obj.preview(function(index, file, result){
		        	
		        	/*var img = new Image();
		            img.onload = function () {
		            	alert('width:'+img.width+',height:'+img.height);
		            };
		        	img.src = result;*/
		          $('#coursePicImg').attr('src', result); //图片链接（base64）
		        });
		    }
		    ,done: function(res){
		    	if(res.resultFlag == true){
			    	submitCourseInfo(res.data);
			    }else{
			    	layer.msg('课程图片上传失败，请稍后重试..', {icon: 5});
			    }
		    }
		  });
		
		//选完文件后不自动上传-课程类型图片
		  upload.render({
		    elem: '#courseTypePic'
		    ,url: contextPath + "/course/uploadCourseTypePic"
		    ,auto: false
		    //,multiple: true
		    ,size: 5120 //限制文件大小，单位 5120KB 5M
		    ,drag: true //允许拖拉上传
		    ,accept: 'images'//上传类型
		    ,bindAction: '#courseTypePicSubmit'
	    	,choose: function(obj){
	    		selectCourseTypePicFlag = true;
	    		selectCourseTypePicSubmitFlag = true;
		        //预读本地文件示例，不支持ie8
		        obj.preview(function(index, file, result){
		          $('#courseTypeImg').attr('src', result); //图片链接（base64）
		        });
		    }
		    ,done: function(res){
		    	if(res.resultFlag == true){
			    	submitCourseTypeInfoFunc(res.data);
			    }else{
			    	layer.msg('课程类型图片上传失败，请稍后重试..', {icon: 5});
			    }
		    }
		  });
		  
	  /*upload.render({
		    elem: '#guideName'
		    ,url: contextPath +'/course/getExperimentUuid'
		    ,auto: false
		    ,accept: 'file' //普通文件
		    ,bindAction: '#submitExperimentGuild'
		    ,done: function(res){
		      if(res.resultFlag == true){
		    	  addCourseExperimentTB(res.data);
		      }else{
		    	  addCourseExperimentTB("ng");
		      }
		    },
		  });*/
	  upload.render({
		    elem: '#guideNameBt'
		    ,url: contextPath +'/course/getExperimentUuid'
		    ,auto: false
		    ,accept: 'file' //普通文件
		    ,size: 10240 //限制文件大小，单位 KB  10M
		    /*,exts: 'doc|docx|xls|xlsx|rar|zip|7z|pdf'*/
		    ,exts: 'pdf|PDF' //只允许上传PDF文件
		    ,bindAction: '#submitExperimentGuild'
	    	,choose: function(obj){
		        //预读本地文件示例，不支持ie8
	    		//设置选择指南标志为true
	    		selectGuideFlag = true;
		        obj.preview(function(index, file, result){
		        	modifyguideName = file.name;
		          $("#guideName").text(file.name);
		        });
		    }
		    ,done: function(res){
		    	if(res.resultFlag == true){
		    		addCourseExperimentTB(res.data);
		    	}else{
		    		addCourseExperimentTB("ng");
		    	}
		    }
		  });
	  
	//修改实验指南
	  upload.render({
	    elem: '#modifyExperimentGuideFileNameBt'
	    ,url: contextPath +'/course/modifyExperimentGuide'
	    ,auto: false
	    ,accept: 'file' //普通文件
	    ,size: 10240 //限制文件大小，单位 KB 10M
	    /*,exts: 'doc|docx|xls|xlsx|rar|zip|7z|pdf'*/
    	,exts: 'pdf|PDF' //只允许上传PDF文件
    	,bindAction: '#modifyExperimentGuild'
    	,choose: function(obj){
	        //预读本地文件示例，不支持ie8
    		//设置修改图片标志为true
    		experimentModifyFlag = true;
	        obj.preview(function(index, file, result){
	        	modifyguideName = file.name;
	          $("#modifyExperimentGuideFileName").text(file.name);
	        });
	    }
	    ,done: function(res){
	    	if(res.resultFlag == true){
	    		drawModifyExperimentInfo(res.data);
	    	  
	        }else{
	        	drawModifyExperimentInfo("ng");
	        }
	    }
	  });
	});
	
	
}



function changeCollege(obj){
	var opt = obj.options[obj.selectedIndex];
	var mechanismId = opt.value;
	
	// 取得专业对象
	var specialty = $("#specialtyId");
	// 取得专业所有的options
	var specialtyAllOptions = $("#specialtyId option");
	var emptyOption = "<option value='0' selected>请选择</option>";
	
	
	
	/* 值为0 不请求服务器 */
	if(mechanismId == "0"){
		$("#collegeOpenRangeLabel").text("请选择课程所属院系");
		specialtyAllOptions.remove();
		specialty.append(emptyOption);
		specialty.css('width','100%').select2({allowClear:true});
		return;
	}
	
	$("#collegeOpenRangeLabel").text(opt.text);
	
	$.ajax({
		url : contextPath +'/course/getProfessional.do',
		type : 'POST',
		traditional: false,//后台接收数组
		dataType: "json",
		data :{"mechanismId":mechanismId},
		success : function(data) {
			specialtyAllOptions.remove();
			specialty.append(emptyOption);
			$.each(data, function(index, res){
				var str = "<option value='" + res.mechanismId + "'>" + res.mechanismName + "</option>";
				specialty.append(str);
			});	
			
			specialty.css('width','100%').select2({allowClear:true});
		}
	});
}

function changeTemplate(obj){
	var opt = obj.options[obj.selectedIndex];
	var tmplId = opt.value;
	
	if(tmplId == "0"){
		$(".templateDescribe").hide();
		return false;
	}
	
	var templateOriginTemp = $('.ace-templateOrigin:radio:checked').val();
	
	// 取得模板信息对象
	var templatePriceObj = $("#templatePrice");
	var templateDescribeObj = $("#templateDescribe");
	var templateTypeObj = $("#templateType");
	
	
	$.ajax({
		url : contextPath +'/course/getTemplateInfo.do',
		type : 'POST',
		traditional: false,//后台接收数组
		dataType: "json",
		data :{
			"tmplId": tmplId,
			"templateOrigin": templateOriginTemp
		},
		success : function(data) {
			var description = "(" + data.description + ")";
			templateTypeObj.text(data.tmplTypeName);
			templateDescribeObj.text(description);
			templatePriceObj.text(data.tmplPrice+"元");
			$(".templateDescribe").show();
		}
	});
}

function modifyChangeTemplate(obj){
	var opt = obj.options[obj.selectedIndex];
	var tmplId = opt.value;

	if(tmplId == "0"){
		$(".modifyTemplateDescribe").hide();
		return false;
	}
	
	var templateOriginTemp = $('.ace-modifyTemplateOrigin:radio:checked').val();
	
	// 取得模板信息对象
	var templatePriceObj = $("#modifyTemplatePrice");
	var templateDescribeObj = $("#modifyTemplateDescribe");
	var templateTypeObj = $("#modifyTemplateType");
	
	
	$.ajax({
		url : contextPath +'/course/getTemplateInfo.do',
		type : 'POST',
		traditional: false,//后台接收数组
		dataType: "json",
		data :{
			"tmplId": tmplId,
			"templateOrigin": templateOriginTemp
		},
		success : function(data) {
			var description = "(" + data.description + ")";
			templateTypeObj.text(data.tmplTypeName);
			templateDescribeObj.text(description);
			templatePriceObj.text(data.tmplPrice+"元");
			$(".modifyTemplateDescribe").show();
		}
	});
}

function initChangeTemplate(tmplId){
	if(tmplId == "0"){
		$(".modifyTemplateDescribe").hide();
		return false;
	}else{
		$(".modifyTemplateDescribe").show();
	}
	
	var templateOriginTemp = $('.ace-modifyTemplateOrigin:radio:checked').val();
	
	if(templateOriginTemp == 0){
		modifyResetTemplateSelect(modifyTemplateLibraryObj);
	}else{
		modifyResetTemplateSelect(modifyTemplatePersionObj);
	}
	
	// 取得模板信息对象
	var templatePriceObj = $("#modifyTemplatePrice");
	var templateDescribeObj = $("#modifyTemplateDescribe");
	var templateTypeObj = $("#modifyTemplateType");
	
	
	$.ajax({
		url : contextPath +'/course/getTemplateInfo.do',
		type : 'POST',
		traditional: false,//后台接收数组
		dataType: "json",
		data :{
			"tmplId": tmplId,
			"templateOrigin": templateOriginTemp
		},
		success : function(data) {
			var description = "(" + data.description + ")";
			templateTypeObj.text(data.tmplTypeName);
			templateDescribeObj.text(description);
			templatePriceObj.text(data.tmplPrice+"元");
			
			$("#modifyTempletName option[value='" + tmplId + "']").attr("selected",true);
		}
	});
}

/**
 * 查看模板详细信息鼠标移入函数
 */
function templateInfoMourseMove(){
	layer.tips('点击查看模板详细信息', '#templateDetailInfo');
}

/**
 * 查看模板详细信息鼠标移入函数(修改modal)
 */
function modifyTemplateInfoMourseMove(){
	layer.tips('点击查看模板详细信息', '#modifyTemplateDetailInfo');
}


/*显示模板详细信息*/
function viewTemplateDetail(index){
	var targetUrl = contextPath + '/template/coursetmplinfo?tmplId=';
	
	var templateId = $("#templetName").val();
	
	if(index == 1){
		templateId = $("#modifyTempletName").val();
	}
	
	if(templateId == "0"){
		return;
	}
	
	// 参数加上模板ID
	targetUrl += templateId;
	
	//页面跳转
	window.open(targetUrl);
}


/**
 * 创建密钥鼠标移入函数
 */
function createKeyPairMourseMove(){
	layer.tips('点击创建新的密钥', '#createNewKeyPair');
}

/**
 * 创建密钥鼠标移入函数(修改modal)
 */
function modifyCreateKeyPairMourseMove(){
	layer.tips('点击创建新的密钥', '#modifyCreateNewKeyPair');
}

/**
 * 创建新的密钥函数-显示创建密钥信息
 */
function createNewKeyPair(){
	
	layer.prompt({
				title: '输入密钥名，并确认', 
				formType: 0,
				value: '', //初始时的值，默认空字符
				maxlength: 32, //可输入文本的最大长度，默认500
			}, function(val, index){
		if(val == ""){
			layer.msg('密钥名不能为空', {icon: 5});
		}else{
			$.ajax({
				url : contextPath +'/course/createNewKeyPair.do',
				type : 'POST',
				traditional: true,//后台接收数组
				dataType: "json",
				data :{
					'keyName': val
				},
				success : function(data) {
					if(data.resultFlag == true){
						layer.confirm("创建成功", {
							icon: 1,
							title: "提示",
							closeBtn:false,
							btn: ['确定']
						}, function () {
							layer.close(layer.index);
							layer.close(index);
						});
					}else{
						
						layer.msg(data.message, {icon: 5});
					}
					
				}
			});
		}
	});
}



/****实验组程管理*******/

var studentDefPic = contextPath + "/resource/images/courseManage/studentDefault2.jpg";

var experimentGroupTb = null;


/**
 * 搜索
 */
function doSearchStudent(){
	experimentGroupTb.ajax.reload();
}
function initExperimentGroupTable(){
	//$("#experimentGroupTb").DataTable().destroy();
	experimentGroupTb = $('#experimentGroupTb').DataTable({
		ajax: {
			url: contextPath + '/course/getStudentInfo.do',// 数据请求地址
			type: "POST",
			data: function (params) {
				//此处为定义查询条件 传给控制器的参数
				params.findValue = $('#studentSearch').val();
				params.collegeId = $('#groupCollegeId').val();
				//params.type = type;
				
			}
		},
		stateSave: true,
		lengthChange: true,
		searching: false,
		ordering: false,
		info: true,
		autoWidth: false,
		serverSide: true,
		processing: false,
		pagingType: "full_numbers",
		/*paging: false,
		scrollY: 200,*/
		iDisplayLength: 10,
		lengthMenu: [5, 10, 50, 100],
		//destroy: true,
		//dom: '<"row tableFiter"<"col-sm-6"l><"col-sm-6"f>><"tableBody"tr><"row bottomInfo"<"col-sm-6"i><"col-sm-6"p>><"clear">',
		dom: '<"tableFiter"><"tableBody"tr><"row bottomInfo"<"col-sm-4"i><"col-sm-8"p>><"clear">',
		/*fixedHeader: true,
		fixedColumns: true,*/
		select: {
			style: 'multi',
			info: false
		},
		search: {
		    "search": "", //默认初始化搜索内容
		    "caseInsensitive": false // 忽略大小写
		},
		columns: [
		          {"bSortable": false, "width": "1%", "title": '<label class="pos-rel">' + 
						   		   '<input type="checkbox" class="ace" id="selectAll" onchange="changeAll(this)">' +
						   		   '<span class="lbl"></span>' +
						   		   '</label>',
						   		   
		        	  "render":function(data, type, row, meta){
						   return '<label class="pos-rel">' + 
						   		   '<input type="checkbox" class="ace">' +
						   		   '<span class="lbl"></span>' +
						   		   '</label>';
					   }
		          },
		          {"data": "realName", "title": "姓名", "width": "14% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(row.picFileUrl == null || row.picFileUrl == ""){
		        			  return "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>" + data;
		        		  }else{
		        			  return "<img class='studentDefPic' alt='匿名用户' src='"+row.picFileUrl+"'>" + data;
		        		  }
		        	  }
		          },
		          {"data": "mechanismName", "title": "院系", "width": "28% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "mechanismId", "title": "院系", "visible": false},
		          {"data": "majorName", "title": "专业", "width": "19% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "major", "title": "专业","visible": false},
		          {"data": "gradeName", "title": "年级", "width": "8% !important",
		        	  "render":function(data, type, row, meta){
		        		  if(data == null){
		        			  return "";
		        		  }else{
		        			  return data;
		        		  }
		        	  }
		          },
		          {"data": "email", "title": "邮箱", "width": "15% !important"},
		          {"data": "phoneNum", "title": "手机", "width": "15% !important"},
				],
		language: {
			/*"sProcessing": "<img src='/images/datatable_loading.gif'>  努力加载数据中.",
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sInfo": "共 _TOTAL_ 条数据  &nbsp;",
			"sInfoEmpty": "",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)&nbsp;",
			"sZeroRecords": "没有检索到数据&nbsp;",  没有检索到数据时的提示 
			"sSearch": "表内检索:  "   搜索框的文字提示 */
			/*"oPaginate": {
			    "sFirst": '<i class="fa fas fa-angle-double-left"></i>',
			    "sPrevious": '<i class="fa fas fa-angle-left"></i>',
			    "sNext": '<i class="fa fas fa-angle-right"></i>',
			    "sLast": '<i class="fa fas fa-angle-double-right"></i>'
			},*/
				
			"sProcessing": "<img src='/images/datatable_loading.gif'>  努力加载数据中.",
			"sLengthMenu": "每页显示 _MENU_ 条记录",
			"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"sZeroRecords": "没有检索到数据",
			"sSearch": "表内检索:  ",
			/*"oPaginate": {
			    "sFirst": "首页",
			    "sPrevious": "前一页",
			    "sNext": "后一页",
			    "sLast": "尾页"
			}*/
			"oPaginate": {
			    "sFirst": '<i class="fa fas fa-angle-double-left"></i>',
			    "sPrevious": '<i class="fa fas fa-angle-left"></i>',
			    "sNext": '<i class="fa fas fa-angle-right"></i>',
			    "sLast": '<i class="fa fas fa-angle-double-right"></i>'
			},
		}/*,
		initComplete: function( settings, json ) {
			// 初始化完成之后将服务器模式
			//alert( '1111111111111111111111' );
		    settings.oFeatures.bServerSide = false;
		},
		drawCallback: function( settings ) {
			settings.oFeatures.bServerSide = false;
	        alert( '222222222222222222' );
	    },
		preDrawCallback: function( settings ) {
			alert( settings.oFeatures.bServerSide );
			settings.oFeatures.bServerSide = true;
		}*/
	});
	
	
	experimentGroupTb.on( 'select', function ( e, dt, type, index ) {
		if ( type === 'row' ) {
			$( experimentGroupTb.row( index ).node() ).find('input:checkbox').prop('checked', true);
		}
	} );
	experimentGroupTb.on( 'deselect', function ( e, dt, type, index ) {
		if ( type === 'row' ) {
			$( experimentGroupTb.row( index ).node() ).find('input:checkbox').prop('checked', false);
		}
	} );
	
	
	experimentGroupTb.on( 'click', 'input[type=checkbox]', function (index) {
		
		var th_checked = this.checked;
		var row = experimentGroupTb.row( $(this).parents('tr') );
		if(th_checked){
			// 当前为选中时设置为未选中， 并去掉select 
			this.checked = false;
			experimentGroupTb.row(row).deselect();
		}else{
			
			this.checked = true;
			
			experimentGroupTb.row(row).select();
		}
		
	} );
	
	//改变页时 设置头选择框为未选中
	experimentGroupTb.on( 'page.dt', function () {
		$("#selectAll").get(0).checked = false;
	});
}



//表头选中-遍历所有tr，并设置选中
function changeAll(obj){
	var th_checked = obj.checked;//checkbox inside "TH" table header
	
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		if(th_checked){
			obj.checked = false;
			experimentGroupTb.row(row).deselect();
		} 
		else{
			obj.checked = true;
			experimentGroupTb.row(row).select();
			
		}
	});
	
}

/*
 * 改变学院函数
 */
function experimentGroupChangeCollege(obj){
	experimentGroupTb.ajax.reload();
}

var studentArray = new Array();

//添加当前页的所有学生
function addPageAllStudentFunc(){
	
	
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		//选中则将ID添加到数组
		var rdata = experimentGroupTb.row( row ).data();
		var studentId = rdata.id; // 取得选择行的学生ID
		var realName = rdata.realName; // 取得选择行的学生真实名
		var picFileUrl = rdata.picFileUrl; // 取得选择行的学生头像
		var flag = $.inArray(studentId, studentArray); //判断数组中是否存在这个ID
		if(flag == -1){
			//不存在则添加到数组中
			studentArray.push(studentId);
			var str = "<tr class='studentItem studentNoCheck' data-studentId='"+ studentId +"' onclick='selectOptionFunc(this)'><td>";
			if(picFileUrl == null || picFileUrl == ""){
				str += "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>&nbsp;";
      		}else{
      			str += "<img class='studentDefPic' alt='匿名用户' src='"+picFileUrl+"'>&nbsp;";
      		}
			
			str += realName + "</td></tr>";
			$("#studentList").append(str);
		}
	});
	
	var sLength = studentArray.length;
	$("#studentNum").text(sLength);
}

/**
 * 添加学生信息到数组
 */
function addStudentFunc(){
	/* 将学生列表转成数组 */
	$('#experimentGroupTb').find('tbody > tr').each(function(){
		var row = this;
		var th_checked = $( experimentGroupTb.row( row ).node() ).find('input:checkbox').is(":checked"); //判断是否选中， true选中  false未选中
		if(th_checked) {
			//选中则将ID添加到数组
			var rdata = experimentGroupTb.row( row ).data();
			var studentId = rdata.id; // 取得选择行的学生ID
			var realName = rdata.realName; // 取得选择行的学生真实名
			var picFileUrl = rdata.picFileUrl; // 取得选择行的学生头像
			var flag = $.inArray(studentId, studentArray); //判断数组中是否存在这个ID
			if(flag == -1){
				//不存在则添加到数组中
				studentArray.push(studentId);
				var str = "<tr class='studentItem studentNoCheck' data-studentId='"+ studentId +"' onclick='selectOptionFunc(this)'><td>";
				if(picFileUrl == null || picFileUrl == ""){
					str += "<img class='studentDefPic' alt='匿名用户' src='"+studentDefPic+"'>&nbsp;";
	      		}else{
	      			str += "<img class='studentDefPic' alt='匿名用户' src='"+picFileUrl+"'>&nbsp;";
	      		}
				
				str += realName + "</td></tr>";
				$("#studentList").append(str);
			}
		}
		
	});
	
	var sLength = studentArray.length;
	$("#studentNum").text(sLength);
}

/**
 * 清除选中的学生
 */
function cleanSelectStudentFunc(){
	
	$("#studentList").find('tr').each(function(){
		var tr = this;
		var flag = $(tr).hasClass('studentCheck');
		if(flag){
			var studentId = $(tr).attr('data-studentId');
			//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
			//inArray() 查找参数1 在数组studentArray中出现的位置。返回-1 表示没有                   
			studentArray.splice($.inArray(studentId, studentArray), 1);
			$(tr).remove();
			
			$("#studentNum").text(studentArray.length);
		}
	});
	
}

/**
 * 清除所有的学生数组
 */
function cleanStudentFunc(){
	studentArray.length = 0;
	$("#studentNum").text("0");
	$("#studentList").html("");
}


function selectOptionFunc(obj){
	var flag = $(obj).hasClass('studentNoCheck');
	if(flag){
		$(obj).removeClass('studentNoCheck');
		$(obj).addClass('studentCheck');
	}else{
		$(obj).removeClass('studentCheck');
		$(obj).addClass('studentNoCheck');
	}
	
}

function submitExperimentGroupInfoFunc(){
	
	if(studentArray.length <= 0 ){
		
		layer.msg('您还没添加学生,请先添加.', {icon: 4});
		return;
		
	}		

	var groupName = $('#groupNameConfig').val();
	if(groupName == "" ){
		
		layer.msg('组名不能为空', {icon: 5});
		return;
		
	}
	
	$('#ExperimentGroupConfigure').modal('hide');
	
	//加载层-风格4
	layer.msg('添加中', {
	  icon: 16
	  ,shade: 0.01
	  ,time: 0 
	});
	
	$.ajax({
		url : contextPath +'/course/addNewExperimentGroup.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'groupName': groupName,
			'studentArray':studentArray,
			'groupId': ''
		},
		success : function(data) {
			layer.close(layer.index);
			if(data.resultFlag == true){
				layer.confirm("添加成功", {
					icon: 1,
					title: "提示",
					closeBtn:false,
					btn: ['确定']
				}, function () {
					//返回课程信息界面
					$('#ExperimentGroupConfigure').modal('hide');
					//$("#groupName").val("");
					$("#studentNum").text("0");
					$("#studentList").html("");
					$("#studentSearch").val("");
					studentArray.length = 0;
					experimentGroupSelectInit();
					layer.close(layer.index);
					layer.close(index);
				});
			}else{
				
				layer.msg(data.message, {icon: 5});
			}
			
		}
	});
	
	
	/*if(studentArray.length <= 0){
		layer.msg('您还没添加学生,请先添加.', {icon: 4});
		return;
	}
	else{
		layer.prompt({
					title: '输入组名，并确认', 
					formType: 0,
					value: '', //初始时的值，默认空字符
					maxlength: 32, //可输入文本的最大长度，默认500
				}, function(val, index){
			if(val == ""){
				layer.msg('组名不能为空', {icon: 5});
			}else{
				$.ajax({
					url : contextPath +'/course/addNewExperimentGroup.do',
					type : 'POST',
					traditional: true,//后台接收数组
					dataType: "json",
					data :{
						'groupName': val,
						'studentArray':studentArray
					},
					success : function(data) {
						if(data.resultFlag == true){
							layer.confirm("添加成功", {
								icon: 1,
								title: "提示",
								closeBtn:false,
								btn: ['确定']
							}, function () {
								//返回课程信息界面
								$('#ExperimentGroupConfigure').modal('hide');
								//$("#groupName").val("");
								$("#studentNum").text("0");
								$("#studentSearch").val("");
								studentArray.length = 0;
								experimentGroupSelectInit();
								layer.close(layer.index);
								layer.close(index);
							});
						}else{
							
							layer.msg(data.message, {icon: 5});
						}
						
					}
				});
			}
		});
	}*/
	
}

//添加实验组处理函数
function showExperimentGroupConfigureModal(){
	
	// 清除查询框的值
	$("#studentSearch").val("");
	
	// 清空选中学生的数组
	studentArray.length = 0;
	// 设置已选学生人数
	$("#studentNum").text("0");
	// 清空已选学生列表
	$("#studentList").html("");
	
	
	// 组名label 添加隐藏class
	$("#groupNameLabel").addClass('myhidden');
	
	// 组名input 删除隐藏class
	$("#groupNameConfig").removeClass('myhidden');
	// 设置输入框初始值为空
	$("#groupNameConfig").val("");
	
	// 编辑button 添加隐藏class
	$("#edmitGroupName").addClass('myhidden');
	
	// 取消button 添加隐藏class
	$("#cancelEdmit").addClass('myhidden');
	
	// 确定button 添加隐藏class
	$("#confirmEdmit").addClass('myhidden');
	
	$('#ExperimentGroupConfigure').modal('show');
}

// 课程类型名
var courseTypeName = "";
//课程类型图片
var globalCourseTypePicInfo = null;

// 提交课程类型信息
function submitCourseTypeInfo(){
	
	courseTypeName = $("#courseTypeName").val();
	if(courseTypeName == ""){
		layer.msg('请输入课程类型名', {icon: 7});
		return;
	}
	
	if(selectCourseTypePicFlag == false){
		layer.msg('请上传课程类型图片.', {icon: 7});
		return;
	}
	
	$('#addCourseTypeModal').modal('hide');
	
	//加载层-风格4
	layer.msg('添加中', {
	  icon: 16
	  ,shade: 0.01
	  ,time: 0 
	});
	
	if(selectCourseTypePicSubmitFlag == false && selectCourseTypePicFlag == true && globalCourseTypePicInfo != null){
		submitCourseTypeInfoFunc(globalCourseTypePicInfo);
	}else{
		// 触发提交课程类型图片的点击事件
		$("#courseTypePicSubmit").trigger("click");
	}
	
}


function submitCourseTypeInfoFunc(courseTypePicInfo){
	
	// 课程图片成功上传后提交课程信息;
	$.ajax({
		url : contextPath + '/course/addCourseType.do',
		type : 'POST',
		traditional: true,//后台接收数组
		dataType: "json",
		data :{
			'courseTypeName': courseTypeName,
			'courseTypePicInfo':JSON.stringify(courseTypePicInfo)
		},
		success : function(data) {
			layer.close(layer.index);
			if(data.resultFlag == true){
				// 成功提示
				layer.confirm("添加成功", {
					icon: 1,
					title: "提示",
					closeBtn:false,
					btn: ['确定']
				}, function () {
					layer.close(layer.index);
					
					selectCourseTypePicFlag = false;
					$('#courseTypeImg').attr('src', courseTypeDefaultPicUrl);
					$("#courseTypeName").val("");
					
					$('#addCourseTypeModal').modal('hide');
					/* 添加课程类型到下拉框 */
					
					var courseTypeId = data.data;
					var str = "<option value='" + courseTypeId + "'>" + courseTypeName + "</option>";
					$("#courseType").append(str);
					$("#courseType").css('width','100%').select2({allowClear:true});
					courseTypeName = "";
				});
				
			}else{
				layer.msg(data.message, {icon: 5});
				selectCourseTypePicSubmitFlag = false;
				globalCourseTypePicInfo = courseTypePicInfo;
			}
		}
	});
	
}

/**
 * 实时显示文本框的字数(课程描述)
 */
function displayWordCound(obj, maxLength){
	if (obj == null || obj == undefined || obj == "") {  
        return;  
    }  
    if (maxLength == null || maxLength == undefined || maxLength == "") {  
        maxLen = 500;  
    } 
    
    var $obj = $(obj);  
    
    if (obj.value.length > maxLength) { //如果输入的字数超过了限制  
        obj.value = obj.value.substring(0, maxLength); //就去掉多余的字  
    }   
    
    $("#description-total").text(obj.value.length); 
}


/**
 * 实时显示文本框的字数(添加实验，实验描述)
 */
function displayWordCoundExperiment(obj, maxLength){
	if (obj == null || obj == undefined || obj == "") {  
        return;  
    }  
    if (maxLength == null || maxLength == undefined || maxLength == "") {  
        maxLen = 256;  
    } 
    
    var $obj = $(obj);  
    
    if (obj.value.length > maxLength) { //如果输入的字数超过了限制  
        obj.value = obj.value.substring(0, maxLength); //就去掉多余的字  
    }   
    
    $("#description-experiment-total").text(obj.value.length); 
}

/**
 * 实时显示文本框的字数(添加实验，修改实验描述)
 */
function displayWordCoundExperimentModify(obj, maxLength){
	if (obj == null || obj == undefined || obj == "") {  
        return;  
    }  
    if (maxLength == null || maxLength == undefined || maxLength == "") {  
        maxLen = 256;  
    } 
    
    var $obj = $(obj);  
    
    if (obj.value.length > maxLength) { //如果输入的字数超过了限制  
        obj.value = obj.value.substring(0, maxLength); //就去掉多余的字  
    }   
    
    $("#description-experimentModify-total").text(obj.value.length); 
}

