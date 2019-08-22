
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 添加和编辑 -->

<div class="modal fade in" id="ExperimentGroupConfigure" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:940px;">
		<div class="modal-content">
			<form action="" class="form-horizontal">
				<!-- 头 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<p style="text-align: center;">
						<span style="color:#FFFFFF;font-size:15px;">配置实验组</span>
					</p>
				</div>
				
				<!-- 内容 -->
				<div class="modal-body">
					
					<div>
						<div class="mytitle">
							查询
						</div>
						<table class="groupTable" style="margin-bottom: 10px;">
							<colgroup>
							    
							    
						  	</colgroup>
							<tr>
								<td align="right" style="padding-left: 14px;"><label>专业/姓名:&nbsp;&nbsp;</label></td>
								<td align="left"><input type="text" id="studentSearch" name="studentSearch"  placeholder="专业/姓名" style="width:240px;"></td>
								<td align="right" style="padding-left: 60px;"><label>院系:&nbsp;&nbsp;</label></td>
								<td align="left">
									<select id="groupCollegeId" name="groupCollegeId" data-placeholder="请选择" onchange="experimentGroupChangeCollege(this)" style="height: 34px;">
										<option value="0">全部</option>
										<c:forEach items="${collegeList}" var="college">
											<option value="${college.mechanismId}">${college.mechanismName}</option>
										</c:forEach>
									</select>
									<button type="button" class="btn btn-link" onclick="doSearchStudent()">
										<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
										搜索
									</button>
								</td>
								
							</tr>
						</table>
						
					</div>
					
					<div class="row" style="border-bottom: 1px solid #b9bec5;"></div>
					
					<div id="experimentGroupTbWrapper">
						<div style="width:82%;float:left">
							<div class="mytitle">
								学生列表
							</div>
							
							<div style="border: 1px solid #BBB5B7;height:540px;font-size:12.5px;">
								<table id="experimentGroupTb" class="table table-striped table-hover">
								</table>
							</div>
						</div>
						
						<div style="width:5%;float:left">
							
							
							<div style="height:511px">
								<button class="btn btn-primary" type="button" style="margin: 180px 4px 0px 4px;width:38px;" onclick="addPageAllStudentFunc()">
									<i class="fa fas fa-angle-double-right"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 10px 4px 0px 4px;width:38px;" onclick="addStudentFunc()">
									<i class="fa fas fa-angle-right"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 20px 4px 0px 4px;width:38px;" onclick="cleanSelectStudentFunc()">
									<i class="fa fas fa-angle-left"></i>
								</button>
								<button class="btn btn-primary" type="button" style="margin: 10px 4px 0px 4px;width:38px;" onclick="cleanStudentFunc()">
									<i class="fa fas fa-angle-double-left"></i>
								</button>
							</div>
							
						</div>
						
						<div style="width:13%;float:right;">
							
							<div class="mytitle">
								已添加的学生
							</div>
							
							<div  style="border: 1px solid #BBB5B7;height:540px;overflow:auto;">
								<table class="groupTable studentListTable" id="studentList" style="width:100%;font-size:12.5px;">
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
						<table class="groupTable" style="margin-bottom: 10px;">
							<colgroup>
							    
							    
						  	</colgroup>
							<tr>
								<td align="right" style="padding-left: 14px;"><label>组名:&nbsp;&nbsp;</label></td>
								<td align="left">
									<input type="text" id="groupNameConfig" name="groupNameConfig" placeholder="组名" style="width:240px;" maxlength="25">
									<label class="myhidden" id="groupNameLabel" style="width:100%;"></label>	
								</td>
								<td >
									&nbsp;&nbsp;&nbsp;
									<button class="btn btn-xs btn-info myhidden" id="edmitGroupName" type="button" onclick="edmitGroupNameFunc()" style="height: 34px;">
										<i class='fa fas fa-edit bigger-120'>编辑</i>
									</button>
									<button class="btn btn-xs btn-danger myhidden" id="cancelEdmit" type="button" onclick="cancelEdmitFunc()" style="height: 34px;">
										<i class="ace-icon fa fa-times bigger-120">取消</i>
										
									</button>
									<button class="btn btn-xs btn-primary myhidden" id="confirmEdmit" type="button" onclick="confirmEdmitFunc()" style="height: 34px;">
										<i class="ace-icon fa fa-check bigger-120">确定</i>
										
									</button>
								</td>
							</tr>
						</table>
						
					</div>
					
				</div>
				
				
				<!-- 尾 -->
				<div class="modal-footer">
					<div  style="float:left;padding-top: 7px;">
						<small>小提示:  &nbsp;>> &nbsp;添加当前页的所有学生</small>
					</div>
					
					<button class="btn btn-default" type="button" data-dismiss="modal">
						取消
					</button>
					
					<button class="btn btn-primary" id="modifyExperimentBt" onclick="submitExperimentGroupInfoFunc()" type="button">
						确定
					</button>
					
					
				</div>
			</form>
		</div>
	</div>
</div>
