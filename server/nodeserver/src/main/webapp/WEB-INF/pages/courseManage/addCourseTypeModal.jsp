
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 添加和编辑 -->

<div class="modal fade in" id="addCourseTypeModal" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:500px;">
		<!-- 添加课程类型弹出框（Modal） -->
		<form action="" class="form-horizontal">
			<div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 id="siplusH" class="modal-title"><span class="ace-icon fa fa-plus icon-on-right bigger-110"></span> 添加课程类型</h4>
	            </div>
	            <div class="modal-body">
					<div class="form-group">
						<label  class="control-label col-lg-3">课程类型名称</label>
						<div class="col-lg-8">
							<input class="form-control" id="courseTypeName" name="courseTypeName" type="text" placeholder="请输入课程类型名称."/>
						</div>
					</div>
					<div class="form-group" >
						<label class="control-label col-lg-3" style="padding-top:50px;">类型图片</label>
						<div class="col-lg-4">
							<div class="clearfix">
								<a href="javascript:void(0);" id="courseTypePic" style="width:200px;display:block;padding-top:20px;">
									<img src="${pageContext.request.contextPath}/resource/images/courseManage/uploadDefault.png" class="img-responsive" alt="请选择图片" id="courseTypeImg">
								</a>
							</div>
						</div>
					</div>	
					<div class="form-group" style="margin-left: 118px;padding-bottom: 10px;">
						<div class="col-lg-10 prompt">
							<i class=promptIcan></i>
							<small>图片格式:jpg/bmp等,大小不超过5M</small>
						</div>
					</div>			
				</div>
	            <div class="modal-footer">
	            	<button type="button" class="btn btn-primary" onclick="submitCourseTypeInfo()">提交</button>
	                <button id="courseTypePicSubmit" type="button" class="btn btn-primary" style="display: none"></button>
	                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	            </div>
	        </div><!-- /.modal-content -->
        </form>
	</div>
</div>
