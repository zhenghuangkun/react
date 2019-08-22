
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 添加和编辑 -->

<div class="modal fade in" id="modifyCourseExperiment" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:500px;">
		<form class="form-horizontal" role="form" id="modifyCourseExperimentForm" enctype="multipart/form-data">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h3 id="editLabel">实验信息</h3>
				</div>
				<div class="modal-body">
					
					<!-- 实验名称 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">实验名称&nbsp;<!-- <span style="color: red">*</span> --></label>
						<div class="col-sm-8">
							<input type="text" class="form-control" name="modifyexperimentName" id="modifyexperimentName" placeholder="实验名称" maxlength="32"/>
						</div>
					</div>
					
					
					<!-- 实验区域 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel" for="modifyExperimentRegion">实验区域&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-8">
							<!-- 实验模板，不能为空 -->
							<select id="modifyExperimentRegion" name="modifyExperimentRegion" class="select" autocomplete="off">
								<option value="cn-north-1" selected="selected">北京区</option>
								<option value="cn-northwest-1" >宁夏区</option>
							</select>
						</div>
					</div>
					
					<!-- 模板来源选择 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel"></label>
						
						<div class="col-xs-12 col-sm-8">
							<div>
								<label class="line-height-0 blue" >
									<input name="modifyTemplateOrigin" value="0" class="ace ace-modifyTemplateOrigin" id="modifyTemplateLibrary" type="radio" checked="checked"/>
									<span class="lbl" style="font-size:12px;"> 模板库</span>
								</label>
								&nbsp;&nbsp;
								<label class="line-height-0 blue">
									<input name="modifyTemplateOrigin" value="1" class="ace ace-modifyTemplateOrigin" id="modifyPersionTemplate" type="radio"/>
									<span class="lbl"  style="font-size:12px;"> 个人模板</span>
								</label>
							</div>
						</div>
					
					</div>
					
					<!-- 模板ID -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel" for="modifyTempletName">实验模板&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-8">
							<!-- 实验模板，不能为空 -->
							<select id="modifyTempletName" name="modifyTempletName" class="select" data-placeholder="请选择模板..." onchange="modifyChangeTemplate(this)" autocomplete="off">
								<option value="0">请选择</option>
								<c:forEach items="${templateList}" var="template">
									<option value="${template.tmplId}">${template.tmplName}</option>
								</c:forEach>
							</select>
							
							<select id="modifyPersionTempletName" name="modifyPersionTempletName" class="select myhidden" data-placeholder="请选择模板..." onchange="modifyChangeTemplate(this)" autocomplete="off">
								<option value="0">请选择</option>
								<c:forEach items="${persionTemplateList}" var="template">
									<option value="${template.tmplId}">${template.tmplName}</option>
								</c:forEach>
							</select>
						</div>
						<div class="col-sm-1">
							<a href="javascript:void(0)" class="blue" onclick="viewTemplateDetail(1)" id="modifyTemplateDetailInfo" onmouseenter="modifyTemplateInfoMourseMove()">
								<i class='ace-icon fa fa-search-plus bigger-110' style="position: relative;top: 6px"></i>
							</a>
						</div>
						
						<!-- 空一行 -->
						<br></br>
						<div class="col-sm-12" style="padding-left:65px;">
							<i class="ace-icon fa fa-umbrella bigger-80 blue"></i>
							<small style="color: #9B9B9B; font-size:12px;">
								<strong>温馨提示:</strong>
								<span>模板允许为空，为空平台学生端默认登录aws console自行配置实验环境</span>
							</small>
						</div>
					</div>
					
					
					<!-- 空一行 -->
					<div class="space-2"></div>
					</div>
					
					<!-- 模板描述 -->
					<div class="form-group">
						<label class="col-sm-12 modifyTemplateDescribe">
							<i class="promptIcan"></i>
							<span >
								<small>
									<strong>模板信息:</strong>
									<strong id="modifyTemplateType"></strong>
									<small id="modifyTemplateDescribe"></small>
									<strong id="modifyTemplatePrice"></strong>
									<small>/分钟</small>
								</small>
							</span>
						</label>
					</div>
					
					
					<!-- 实验描述 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">实验描述&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-7">
							<textarea class="input-xlarge valid textarea-class" name="modifyExperimentDescription" id="modifyExperimentDescription" onkeydown="displayWordCoundExperimentModify(this,256)" onkeyup="displayWordCoundExperimentModify(this, 256)" onfocus="displayWordCoundExperimentModify(this, 256)" placeholder="请输入实验描述、要求、目标..." maxlength="256" style="height:65px;"></textarea>
						</div>
						<br/><br/><br/><span id="description-experimentModify-total">0</span>/256
					</div>
					
					<!-- 实验时长 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">实验时长<small>(分钟)</small>&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-8">
							
							<div class="ace-spinner middle" style="width:100%">
								<div class="input-group">
									<input class="form-control spinbox-input text-center" id="modifyRuntime" name="modifyRuntime" type="text">
									<div class="spinbox-buttons input-group-btn btn-group-vertical" style="display: none">					
										<button type="button" class="btn spinbox-up btn-sm btn-info" onclick="modifyIncreaseDown()">						
											<i class="icon-only  ace-icon fa fa-chevron-up"></i>					
										</button>					
										<button type="button" class="btn spinbox-down btn-sm btn-info" onclick="modifyDecreaseDown()">						
											<i class="icon-only  ace-icon fa fa-chevron-down"></i>					
										</button>				
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<!-- 实验指南 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">实验指南&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-8">
							<!-- <input name="modifyGuideName" id="modifyGuideName" class="col-xs-6 col-sm-6" type="file"> -->
							<div>
								<div class="layui-upload">
								  <button type="button" class="layui-btn layui-btn-normal" id="modifyExperimentGuideFileNameBt">选择文件</button>
								  <label class="mylabel"><i class=promptDateIcan></i>只支持PDF文件,最大10M</label><br/>
								  <label id="modifyExperimentGuideFileName"></label>
								</div>
							</div>
							
						</div>
					</div>
					
					<!-- 密钥 -->
					<div class="form-group" style="display: none">
						<label class="col-sm-3 control-label no-padding-right mylabel" for="modifyKeyName">密钥&nbsp;<span style="color: red">*</span></label>
						<div class="col-sm-8">
							<!-- 密钥，不能为空 -->
							<select id="modifyKeyName" name="modifyKeyName" class="select" data-placeholder="请选择密钥...">
								<option value="0">请选择</option>
								<c:forEach items="${keyList}" var="key">
									<option value="${key.fileId}">${key.fileName}</option>
								</c:forEach>
							</select>
						</div>
						<div class="col-sm-1">
							
							<a href="javascript:void(0)" class="blue" id="modifyCreateNewKeyPair" onmouseenter="modifyCreateKeyPairMourseMove()" onclick="createNewKeyPair()">
								<i class="glyphicon glyphicon-plus bigger-110" style="top: 6px"></i>
							</a>
						</div>
					</div>
					
					<!-- 策略 -->
					<div class="form-group" >
						<label class="col-sm-3 control-label no-padding-right mylabel" for="modifyPolicyId">策略&nbsp;</label>
						<div class="col-sm-8">
							<!-- 密钥，不能为空 -->
							<select id="modifyPolicyId" name="modifyPolicyId" class="select" data-placeholder="请选择策略...">
								<option value="0">请选择</option>
								<c:forEach items="${policyList}" var="policy">
									<option value="${policy.id}">${policy.name}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					
					<!-- 课程开始时间和结束时间 -->
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">开始时间&nbsp;&nbsp;&nbsp;</label>
						<div class="col-sm-7">
							<input class="form-control laydatetime" id="modifyStartTime" name="modifyStartTime" type="text"/>
						</div>
						
					</div>
					
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right mylabel">结束时间&nbsp;&nbsp;&nbsp;</label>
						<div class="col-sm-7">
							<input class="form-control laydatetime" id="modifyEndTime" name="modifyEndTime" type="text"/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-1 control-label no-padding-right"></label>
						<div class="col-xs-12 col-sm-8" style="padding-left:20px;">
							<i class=promptDateIcan></i>
							<small>默认为当前时间开始的一个月内</small>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" id="modifyExperimentBt" onclick="modifyCourseExperimentFunc()" type="button">
						修改
					</button>
					<button class="btn btn-info" id="modifyExperimentGuild" type="button" style="display: none"></button>
					<button class="btn btn-default" type="button" data-dismiss="modal">
						取消
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
