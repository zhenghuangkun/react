
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 添加和编辑 -->

<div class="modal fade in" id="ExperimentGroupModify" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:900px;">
		<div class="modal-content">
			<form action="" class="form-horizontal">
				<!-- 头 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<p style="text-align: center;">
						<span style="color:#FFFFFF;font-size:15px;">修改实验组</span>
					</p>
				</div>
				
				<!-- 内容 -->
				<div class="modal-body">
					
					<div>
						<div class="mytitle">
							查询
						</div>
						<table style="margin-bottom: 10px;">
							<colgroup>
							    <col width="15%">
							    <col width="30%">
							    <col width="10%">
							    <col width="45%">
						  	</colgroup>
							<tr>
								<td align="right"><label>专业/姓名:&nbsp;</label></td>
								<td align="left"><input type="text" id="studentSearchModify" name="studentSearchModify" placeholder="专业、年级或学生名" style="width:100%;"></td>
								<td align="right"><label>院系:&nbsp;</label></td>
								<td align="left">
									<select id="collegeIdModify" name="collegeIdModify" data-placeholder="请选择" onchange="changeCollegeModify(this)" style="height: 34px;">
										<option value="0">请选择</option>
										<c:forEach items="${collegeList}" var="college">
											<option value="${college.mechanismId}">${college.mechanismName}</option>
										</c:forEach>
									</select>
									<button type="button" class="btn btn-link" onclick="doSearchStudentModify()">
										<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
										搜索
									</button>
								</td>
								
							</tr>
						</table>
						
					</div>
					
					<div class="row" style="border-bottom: 1px solid #b9bec5;"></div>
					
					<div id="experimentGroupTbWrapperModify">
						<div style="width:79%;float:left">
							<div class="mytitle">
								学生列表
							</div>
							
							<div style="border: 1px solid blue;height:540px">
								<table id="experimentGroupTbModify" class="table table-striped table-hover">
								</table>
							</div>
						</div>
						
						<div style="width:6%;float:left">
							
							
							<div style="height:511px">
								<button class="btn btn-primary" type="button" style="margin: 180px 5px 0px 5px;width:42px;" onclick="addPageAllStudentModifyFunc()">
									<i class="fa fas fa-angle-double-right"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 10px 5px 0px 5px;width:42px;" onclick="addStudentModifyFunc()">
									<i class="fa fas fa-angle-right"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 20px 5px 0px 5px;width:42px;" onclick="cleanSelectStudentModifyFunc()">
									<i class="fa fas fa-angle-left"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 10px 5px 0px 5px;width:42px;" onclick="cleanStudentModifyFunc()">
									<i class="fa fas fa-angle-double-left"></i>
								</button>
							</div>
							
						</div>
						
						<div style="width:15%;float:right;">
							
							<div class="mytitle">
								已添加的学生
							</div>
							
							<div  style="border: 1px solid blue;height:540px;overflow:auto;">
								<table class="studentListTable" id="studentList" style="width:100%;">
									<colgroup>
										<col width="100%">
									</colgroup>
								</table>
							</div>
							
						</div>
						
						
					</div>
					
					
					<div style="line-height: 40px;">
						<div style="margin-bottom: 10px;padding-right:22px;float: right;">
							<label>已添加人数:</label>
							<strong style="padding-left:10px;" id="studentNum">0</strong><label>人</label>
						</div>
					</div>
					
					<div class="row" style="border-bottom: 1px solid #b9bec5;"></div>
					
					
					<div>
						<div class="mytitle">
							设置组名
						</div>
						<table style="margin-bottom: 10px;">
							<colgroup>
							    <col width="15%">
							    <col width="50%">
						  	</colgroup>
							<tr>
								<td align="right"><label>组名:&nbsp;</label></td>
								<td align="left"><input type="text" id="groupNameConfig" name="groupNameConfig" placeholder="组名" style="width:100%;" maxlength="25"></td>
								
							</tr>
						</table>
						
					</div>
					
				</div>
				
				
				<!-- 尾 -->
				<div class="modal-footer">
					<button class="btn btn-primary" id="modifyExperimentBt" onclick="submitExperimentGroupInfoFunc()" type="button">
						确定
					</button>
					<button class="btn btn-default" type="button" data-dismiss="modal">
						取消
					</button>
					
				</div>
			</form>
		</div>
	</div>
</div>
