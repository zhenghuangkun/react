var beenRelease=5;//已经发布课程
var notRelease="2,3,4,6"//未发布课程
	
var notAudit=3;//未审核课程
var approved="4,5,6";//已经审核核课程

var aCombination;//总额度	
var hasCost;//已花费
var haveInvoice;//已开发票
var notInvoice;//未开发票
var totalTip="您确定要修改该院系的总额度吗？"
var invoicePrompt="您确定要修改该院系的已开发票吗？"
/****************************************
 * 页面初始化
 ****************************************/
$(function () {
	/*用户列表初始化*/
	experimentTbTB();
	
	fimdCourseAmount();
	
	countCourseYes();//查询已经发布课程的数量
	
	countCourseNo();//查询未发布课程的数量
	
	selectNotAudit();//未审核课程数量
	
	selectApproved();//已经审核的课程数量
	
	learning();//查询当前登陆者老师的课程已学习总人数
	
	selCostMoney();//选择下拉值触发 查询月份总花费
	
	selDepartmentsCost();//选择时间下拉列表值触发 查询每个院系月份总花费
	

});

/*点击修改总额度金额(小笔按钮)*/
function updateQuota(open){
	var allCost=$(open).parent(".panel-body").find("span").attr("id");
	var inputVale = $(open).parent(".panel-body").find("input").attr("id");
	$('#'+inputVale).val($('#'+allCost).text());
		$(open).parent(".panel-body").find(".editContent").hide();
		$(open).parent(".panel-body").find(".edit-panel").hide();
		$(open).parent(".panel-body").find(".editInput").show();
		$(".edit-panel").parent(".panel-body").find();
}


/*点击修改已开发票金额(小笔按钮)*/
function updateQuotas(open){
	var allCostInvoice = $(open).parent(".panel-body").find("span").attr("id");
	var inputCostInvoice=$(open).parent(".panel-body").find("input").attr("id");
	$('#'+inputCostInvoice).val($('#'+allCostInvoice).text());
	var separateCost=$(open).parent(".panel-body").find("#hasCosts").text();
    if(separateCost==0){
		layer.confirm('抱歉,本院系没有账单暂不支持修改！', {icon: 2, title:'提示'});
	}else{
		$(open).parent(".panel-body").find(".editContentInvoice").hide();
		$(open).parent(".panel-body").find(".edit-panel").hide();
		$(open).parent(".panel-body").find(".editInput").show();
		$(".edit-panel").parent(".panel-body").find();
	}
}

/*已开发票金额时候选择X关闭*/
function editableInvoice(clo){
	$(clo).parent(".editInput").hide();
	$(clo).parent(".editInput").parent(".panel-body").find(".editContentInvoice").show();
	$(clo).parent(".editInput").parent(".panel-body").find(".edit-panel").show();
}

/*修改总额度时候选择X关闭*/
function editable(clo){
		$(clo).parent(".editInput").hide();
		$(clo).parent(".editInput").parent(".panel-body").find(".editContent").show();
		$(clo).parent(".editInput").parent(".panel-body").find(".edit-panel").show();
}


/*提交总额度的修改*/
function editLines(sum){
	var url=contextPath +'/overview/editLines';
	var linesNum =$(sum).parent(".editInput").find("input").attr("id");
    var accountId=$(sum).parent(".editInput").find("p").attr("id");
    var quotaId=$(sum).parent(".editInput").parent(".panel-body").find("lable").attr("id");
    var time = $("#dateinfo").val();
	submitEditDataRental(url,totalTip,$('#'+linesNum).val(),$('#'+accountId).text(),$('#'+quotaId).text(),time);
}
function submitEditDataRental(url,prompt,parameter,accountId,quotaId,time){
	var parnt = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(!parnt.test(parameter)){
		layer.confirm('请输入正确的金额！', {icon: 2, title:'提示'});
	}else{
		layer.confirm(prompt, {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url : url,
				async : false,
				type : 'post',
				dataType : "json",
				data : {"ModifyTheContent":parameter,"accountId":accountId,"quotaId":quotaId,"totalMonth":time},
				success : function(data) {
					if(data){
					    var time = $("#dateinfo").val();
					    seleAllDepartments(time);
					}else{
						layer.alert("抱歉,修改失败!", {icon: 5});
						}
					}	
				});	
				layer.close(index);
			});
	}
	
}


/*提交已开发票金额的修改*/
function editInvoice(sum){
	var url=contextPath +'/overview/editLines';
	var haveInvoice =$(sum).parent(".editInput").find("input").attr("id");
	var accountId=$(sum).parent(".editInput").find("p").attr("id");
	var greater=$(sum).parent(".editInput").parent(".panel-body").find("#hasCosts").text();
	var quotaId=$(sum).parent(".editInput").parent(".panel-body").find("b").attr("id");
	var time = $("#dateinfo").val();
	
	submitEditData(url,invoicePrompt,$('#'+haveInvoice).val(),$('#'+accountId).text(),greater,$('#'+quotaId).text(),time);
			
}
function submitEditData(url,prompt,parameter,accountId,greater,quotaId,time){
	var parnt = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(!parnt.test(parameter)){
			layer.confirm('请输入正确的金额！', {icon: 2, title:'提示'});
		}else{
			if(eval(parameter) > eval(greater)){
				layer.confirm("抱歉,输入已开发票金额不能大于已花费金额!", {icon: 2, title:'提示'});
			}else{
			    layer.confirm(prompt, {icon: 3, title:'提示'}, function(index){
				$.ajax({
					url : url,
					async : false,
					type : 'post',
					dataType : "json",
					data : {"invoiceByvalue":parameter,"accountId":accountId,"quotaId":quotaId,"totalMonth":time},
					success : function(data) {
						if(data){
						    var time = $("#dateinfo").val();
						    seleAllDepartments(time);
						}else{
							layer.alert("抱歉,修改失败!", {icon: 5});
							}
						}	
					});	
					layer.close(index);
				});
		}
	}
}


/*查询出所有的院系 accountId 和院系名称*/
function seleAllDepartments(month){
	aCombination=0;
	hasCost=0;
	haveInvoice=0;
	notInvoice=0;
	$('#departmentsName').empty();
    $.ajax({
        url: contextPath + '/overview/seleAllDepartments',// 数据请求地址
        type: "post",
        dataType: "json",
        success: function (date) {
            var joint = '';
            for (var i = 0; i < date.length; i++) {
            	var money= departmentsCost(date[i].accountId,month);
            	var combination=selACombination(date[i].accountId);
            	aCombination=(aCombination+combination.quota);
            	hasCost=(hasCost+money[0]);
            	haveInvoice=(haveInvoice+combination.invoiceAmount);
            	notInvoice=(notInvoice+Math.round((money[0]-money[1])*100)/100);
            	joint +='<div class="panel panel-success">'
							+'<div class="panel-heading">'
							+'<h3 class="panel-title">'+date[i].mechanismName+'</h3>'
				 		+'</div>'
						+'<div class="panel-body" style="font-size:16px;">'
							+'<div class="col-md-5 column">'
							+'<div class="panel-body" align="center" style="height: 128px">'
								+'<img width="50px" alt="" src="'+contextPath+'/resource/images/home/money.png"><br>'
								+'可用额度：<span class="editContent" id="editContents'+i+'">'+combination.quota+'</span><lable style=display:none id="quotaId'+i+'">'+combination.quotaId+'</lable><i class="ace-icon fa fa-pencil edit-panel" onclick="updateQuota(this)" style="color:#428bca;margin-left:3px"></i>'
							     +'<span class="editInput" style="display:none;">'
							        +'<p style=display:none id="lableAccountId'+i+'">'+date[i].accountId+'</p>'
									+'<input type="text" id="editMoney'+i+'" class="editValue" style="width:100px;" maxlength="10">'
									+'<button type="submit" class="btn btn-info editable-submit" onclick="editLines(this)" style="line-height: 12px;"><i class="ace-icon fa fa-check" style="width:8px;"></i></button>'
									+'<button type="button" class="btn editable-cancel" onclick="editable(this)" style="line-height: 12px;"><i class="ace-icon fa fa-times" style="width:8px;"></i></button>'
								+'</span>'
								+'<span id="hasCostsSpan" style="display:block;">&nbsp;已花费：'+money[0]+'</span>'
							+'</div>'
						+'</div>'
						+'<div class="col-md-7 column">'
							+'<div class="panel-body" align="center" style="height: 128px">'
								+'<img width="50px" alt="" src="'+contextPath+'/resource/images/home/release.png"><br>'
								+'开发票金额：<span class="editContentInvoice" id="editContentInvoices'+i+'">'+combination.invoiceAmount+'</span><lable style=display:none id=hasCosts>'+money[0]+'</lable><b style=display:none id="quotaId'+i+'">'+combination.quotaId+'</b><i class="ace-icon fa fa-pencil edit-panel" onclick="updateQuotas(this)" style="color:#428bca;margin-left:3px"></i>'
								+'<span class="editInput" style="display:none;">'
								    +'<p style=display:none id="lableAccountId'+i+'">'+date[i].accountId+'</p>'
									+'<input type="text" id="editMoneyInvoice'+i+'" class="editValueInvoice" style="width:100px;" maxlength="10">'
									+'<button type="submit" class="btn btn-info editable-submit" onclick="editInvoice(this)" style="line-height: 12px;"><i class="ace-icon fa fa-check" style="width:8px;"></i></button>'
									+'<button type="button" class="btn editable-cancel" onclick="editableInvoice(this)" style="line-height: 12px;"><i class="ace-icon fa fa-times" style="width:8px;"></i></button>'
								+'</span>'
								+'<span style="display:block;">&nbsp;未开发票金额：'+Math.round((money[0]-combination.invoiceAmount)*100)/100+'</span>'
							+'</div>	'									
						+'</div>'
						+'</div>'
					+'</div>'
            }
            $('#departmentsName').append(joint);
            $('#aCombination').html(aCombination);
            $('#hasCost').html(hasCost);
            $('#haveInvoice').html(haveInvoice);
            $('#notInvoice').html(notInvoice);

        },
        error: function (XMLResponse) {
            alert(" 错误信息：" + XMLResponse.responseText);
        }
    });
	
	
}



/*下拉列表显示当前月份的前五个月 默认选择当前月份*/
var last_year_month = function() {  
    var d = new Date();  
    var result = [];  
    for(var i = 0; i < 5; i++) {  
        d.setMonth(d.getMonth()- 1);  
        var m = d.getMonth() + 1;  
        m = m < 10 ? "0" + m : m;  
        //在这里可以自定义输出的日期格式  
        //result.push(d.getFullYear() + "-" + m);  
        result.push(d.getFullYear() + "-" + m);  
    }  
    return result;  
}  
$(document).ready(function() {  
	var d=new Date();
	m = d.getMonth() + 1;
	m = m < 10 ? "0" + m : m;  
	
	$("#getCurrentMonth").val(d.getFullYear() + "-" + m);
	$("#getCurrentMonth").text(d.getFullYear() + "-" + m);
	seleAllDepartments($("#getCurrentMonth").val());
	billMethods($("#getCurrentMonth").val());
    //生成前5个月日期下拉框  
    for(var allinfo = last_year_month(), i = 0; i < allinfo.length; i++) {  
        $("#dateinfo").append("<option value='" + allinfo[i] + "'>" + allinfo[i] + "</option>");  
    }  
});  

/*选择时间下拉列表值触发 查询每个院系月份总花费*/
function selDepartmentsCost(){
	$("#dateinfo").bind("change",function(){
    var choose = $(this).val();
    departmentsCost(choose);
    seleAllDepartments(choose);

});
}
/*查询每个院系花费*/
function departmentsCost(accountId,month){
	var money=[];
	 $.ajax({
			url : contextPath +'/overview/seleDepartmentsCost',
			async : false,
			type : 'post',
			dataType : "json",
			data:{"accountId":accountId,"month":month},
			success : function(data) {
				if(data==null){
					money.push(0);
					money.push(0);
				}else{
					if(data.totalCost==undefined){
						money.push(0);
						money.push(0);
					}else{
						money.push(Math.round((data.totalCost) * 100) / 100);
					}
					if(data.invoiceAmount==undefined){
						money.push(0);
					}else{
						money.push(Math.round((data.invoiceAmount) * 100) / 100);
					}
				}
			}
		});
	 return money;
}

/*查询每个院系的总额度和已开发票金额 条件是accountId*/
function selACombination(accountId){
	var time = $("#dateinfo").val();
	var combination={};
	 $.ajax({
			url : contextPath +'/overview/selACombination',
			async : false,
			type : 'post',
			dataType : "json",
			data:{"accountId":accountId,"totalMonth":time},
			success : function(data) {
				if(data==null){
					combination.quota=0;
					combination.quotaId=0;
				}else{
					if(data.totalAmount==undefined){
						combination.quota=0;
					}else{
						combination.quota=(Math.round((data.totalAmount) * 100) / 100);
					}
					if(data.invoiceAmount==undefined){
						combination.invoiceAmount=0;
					}else{
						combination.invoiceAmount=(Math.round((data.invoiceAmount) * 100) / 100);
					}
					if(data.id==undefined){
						combination.quotaId=0;
					}else{
						combination.quotaId=1;
					}
					
				}
			}
		});
	 return combination;
}



/*选择下拉值触发 查询月份总花费*/
function selCostMoney(){
	$("#dateinfo").bind("change",function(){
    var theSelected = $(this).val();
    billMethods(theSelected);

});
}
/*根据登陆院系者accountid获取总花费*/
function billMethods(month) {
	 $.ajax({
			url : contextPath +'/overview/selectCostMoney',
			async : false,
			type : 'post',
			dataType : "json",
			data:{"month":month},
			success : function(data) {
				if(data==null){					
					$("#costMoney").html("未消费")
				}else{
					$("#costMoney").html(Math.round((data.totalCost) * 100) / 100 );
				}
			}
		})
}



/*查询已经发布课程的数量*/
function countCourseYes(){
	$.ajax({
		url : contextPath +'/overview/countCourseYes',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"release":beenRelease},
		success : function(data) {
			$("#releaseYes").html(data);
		}
	})
	
}


/*查询未发布课程的数量*/
function countCourseNo(){
	$.ajax({
		url : contextPath +'/overview/countCourseYes',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"release":notRelease},
		success : function(data) {
			$("#releaseNo").html(data);
		}
	})
	
}

/*查询未审核课程的数量*/
function selectNotAudit(){
	$.ajax({
		url : contextPath +'/overview/auditCourse',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"status":notAudit},
		success : function(data) {
			$("#notAuditNo").html(data);
		}
	})
	
}

/*查询已经审核课程的数量*/
function selectApproved(){
	$.ajax({
		url : contextPath +'/overview/auditCourse',
		async : false,
		type : 'post',
		dataType : "json",
		data:{"status":approved},
		success : function(data) {
			$("#approvedYes").html(data);
		}
	})
	
}



/*查询当前登陆者老师的课程已学习总人数*/
function learning(){
	$.ajax({
		url : contextPath +'/overview/haveBeenStudying',
		async : false,
		type : 'post',
		dataType : "json",
		success : function(data) {
			$("#beenStudying").html(data);
		}
	})
	
}

/*查询当前登陆者院系管理员 看到的本院系教师课程数量前十排行*/
function fimdCourseAmount() {
    $.ajax({
        url: contextPath + '/overview/selectCourseAmount',// 数据请求地址
        type: "post",
        dataType: "json",
        success: function (json) {
            var Join = '';
            for (var i = 0; i < json.length; i++) Join += '<tr><td>' + (i+1)+ '</td><td>' + json[i].realName + '</td><td>' + json[i].courseSum + '</td><td>' + json[i].people + '</td></tr>';
            $('#teaSubjectTb').append(Join);
        },
        error: function (XMLResponse) {
            alert(" 错误信息：" + XMLResponse.responseText);
        }
    });
}




/****************************************
 * 管理员列表初始化
 ****************************************/
function experimentTbTB(){
	$("#experimentTb").DataTable({
		ajax: {
			url: contextPath + '/overview/selectUserStuexperiment',// 数据请求地址
			type: "POST"
		},
		stateSave: true,
		lengthChange: true,
		searching: false,
		ordering: false,
		info: true,
		autoWidth: false,
		serverSide: true,
		pagingType: "full_numbers",
		iDisplayLength: 10,
		lengthMenu: [10,30,50,100],
		columns: [
					{
						"data": "stuId",
						"title": "学号",
						"defaultContent":''
					},
					{
						"data": "realName",
						"title": "姓名",
						"defaultContent":''
					}, {
						"data": "schoolName",
						"title": "学校",
						"defaultContent":''
					}, {
						"data": "mechanismName",
						"title": "学院",
						"defaultContent":''
					}, {
						"data": "majorName",
						"title": "专业",
						"defaultContent":''
					}, {
						"data": "gradeName",
						"title": "年级",
						"defaultContent":''
					}, {
						"data": "classesName",
						"title": "班级",
						"defaultContent":''
					}, {
						"data": "experimentName",
						"title": "实验名称",
						"defaultContent":''
					}
					
		],
		language: {
			url: contextPath + "/resource/json/language-zh.json"
		}
	})
}

