/**
 * 删除策略
 * 
 */
function deletePolicy(id){
	//layer.confirm('您确定要删除该策略信息?',{icon: 3, title:'提示'})
	layer.confirm('您确定要删除该策略？', {
		icon: 3,
		btn: ['确定','取消'] //按钮
		}, function(){
		  window.location.href=contextPath+"/deletePolicy?id="+id;
		}, function(){
		});
}
/**
 * 编辑策略
 * 
 */
function updatePolicy(id,name,description,fileUrl){
	layer.open({
		 	       type: 0,
		 	       title: "修改策略",
		 	       shadeClose: false,
		 	       shade: false,
		 	       maxmin: false, //开启最大化最小化按钮
		 	       btn:false,
		 	       scrollbar: false,
		 	      shade: [0.8, '#393D49'],
		 	      shadeClose:false,
		 	       area: ['520px', '450px'],
		 	       content: '<form class="form-horizontal" method="post" action="'+contextPath+'/updatePolicy?id='+id+'" role="form" id="tacticsForm" enctype="multipart/form-data">\
							 	    	<div class="modal-body">\
		 	    	   						<div class="form-group">\
												<label class="col-sm-3 control-label no-padding-right" >策略名称：</label>\
												<div class="col-sm-8">\
													<input type="text" name="name" value="'+name+'" class="form-control" placeholder="策略名称不超过50个字符" maxlength="50" required/>\
												</div>\
											</div>\
											<div class="form-group">\
												<label class="col-sm-3 control-label no-padding-right" >策略描述：</label>\
												<div class="col-sm-8">\
													<textarea name="description" class="autosize-transition form-control" required style="height: 125px;" placeholder="策略描述不超过500个字符" maxlength="500">'+description+'</textarea>\
												</div>\
											 </div>\
											 <div class="form-group">\
												<label class="col-sm-3 control-label no-padding-right" >策略内容：</label>\
												<div class="col-sm-8">\
												<label class="col-sm-3 control-label no-padding-right" ><a href="'+fileUrl+'" target="_blank">查看</a></label>\
												</div>\
											</div>\
											  <div class="form-group">\
												<label class="col-sm-3 control-label no-padding-right" >更新策略文件：</label>\
												<div class="col-sm-8">\
													<input type="file" name="myfile" class="form-control" style="display:inline-block;height: 40px;" required>\
												</div>\
											 </div>\
											</div>\
								 	    	<div class="modal-footer">\
									           <button type="submit" id="addTactics" class="btn btn-primary" >提交</button>\
								               <button type="button" onclick="closeTactics()" class="btn btn-default" data-dismiss="modal">取消</button>\
								            </div>\
							  </form><!-- 添加态框（Modal）end -->'
		 	     });
}
/**
 * 关闭编辑策略
 * 
 */
function closeTactics(){
	$(".layui-layer-close").click();
}

