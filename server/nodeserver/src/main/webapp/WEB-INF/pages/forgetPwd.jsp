<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>忘记密码</title>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/css/forget.css" media="all">
</head>
<body>
   <!-- 头部 -->

	
   <!-- 确认账号 -->
   <div class="adm_body w692" id="idCard">
      <div id="data_form">
		<div class="reg_form">
			<div>
				<h3>
                  	<span class="hover"><em>1</em>确认账号</span>
					<strong class="hrig"></strong>
					<span><em>2</em>安全验证</span>
					<strong></strong>
					<span><em>3</em>重置密码</span>
					<strong></strong>
					<span><em>4</em>完成</span>
				</h3>
				<dl><dt>账号：</dt><dd><input id="account" name="account" type="text" placeholder="请输入电话号码/邮箱" onblur="checkUserName();" />
				<span class="error"></span>
				<span class="correct"> </span>
				</dd></dl> 
				<dl><dt>验证码：</dt><dd><input class=" w_6"  name="imgVerCode"  id="imgVerCode" type="text" placeholder="请输入验证码" />
				<img id="sendVerCode" onclick="changeImgVerCode(this)" src="${pageContext.request.contextPath}/ForgetPwd/createImgVerCode" alt='验证码' title='点击更换验证码' class='check-img w_5' style='cursor:pointer;'/>
				<!-- <a></a> --><span class="error"></span><span class="correct"></span></dd></dl>
				<div class="btn mt30"><input name="" type="button" class="button" value="下一步"  onclick="javaScript:checkIdCard()"/></div>
			</div>
          </div>
      </div>
	</div>
   
   <!--安全验证-->
	<div class="adm_body w692 none" id="check">
		<div id="data_form">
			<div class="reg_form">
				<h3>
					<span><em>1</em>确认账号</span>
					<strong class="hlef"></strong>
					<span class="hover"><em>2</em>安全验证</span>
					<strong class="hrig"></strong>
					<span><em>3</em>重置密码</span>
					<strong></strong>
					<span><em>4</em>完成</span>
				</h3>
				<h4>为了您的帐号安全，请完成身份验证：</h4>
				<dl>
					<dt>验证方式：</dt>
					<dd>
						<div class="select-toggle">
							<ul class="clearfix">
								<li class="select-list on"  mod="sms"><p class="cs1-1" id="phone">暂不支持手机验证</p></li>
								<li class="select-list margin-t"  mod="email"><p class="cs1-1" id="email"></p></li>
	                      	</ul>
						</div>
					</dd>
				</dl>
				<dl>
					<dt>验证码：</dt>
					<dd><input id="verCode" name="verCode" type="text" placeholder="请输入验证码" class="w_6"/>
					<input type="button" value="获取验证码" style="margin-left: 10px;" id="codeBtn" onclick="sendCode();" class="blue_btn hover-none w_5"/>
					<span class="error"></span><span class="warning"></span>
					</dd>
				</dl>
				<div class="btn mt30"><input id="checkBtn" type="button" class="button" value="下一步"  onclick="checkCode()"/></div>
			</div>  
		</div>
	</div>
	
   <!-- 重置密码 -->
	<div class="adm_body w692 none" id="reset" >
		<div id="data_form_reset">
		<div class="reg_form">
		<div>
			<h3>
				<span><em>1</em>确认账号</span>
		       	<strong></strong>
				<span><em>2</em>安全验证</span>
				<strong class="hlef"></strong>
				<span class="hover"><em>3</em>重置密码</span>
				<strong class="hrig"></strong>
				<span><em>4</em>完成</span>
			</h3>
			<dl>
				<dt>新密码：</dt>
				<dd><input id="newPwd" name="newPwd" type="password" placeholder="密码为8-30位字符组合" onblur="passChangeSuccess()">
				<span class="error special"></span>
				<span class="correct"></span></dd>
			</dl>
	           	<dl><dt>确认密码：</dt><dd><input id="confirmPwd" name="confirmPwd" type="password" placeholder="再次确认密码" onblur="passChangeSuccess()"><span class="error"></span><span class="correct"></span></dd></dl>
	           	<div class="btn mt30"><input name="" type="button" class="button" value="确定" onclick="passChangeSuccess(1)"></div>
		</div>
		</div>
		</div>
	</div>
	
   <!-- 完成 -->
	<div class="adm_body w692 none" id="end">
		<div id="data_form_end">
			<div class="reg_form">
				<h3>
					<span><em>1</em>确认账号</span>
					<strong></strong>
					<span><em>2</em>安全验证</span>
					<strong></strong>
					<span><em>3</em>重置密码</span>
					<strong class="hlef"></strong>
					<span class="hover"><em>4</em>完成</span>
				</h3>
				<div class="end_form">
					<em></em><span>恭喜您，您的密码重置成功！</span>今后将使用新的密码，请妥善保管好您的密码。
					<a class="xy" href="${pageContext.request.contextPath}/login" >返回登录</a>
				</div>
				<div class="trun">
					<span class="second">5</span><span>s之后自动</span>  
					<a class="xy" href="${pageContext.request.contextPath}/login">跳转</a>  
				</div>
			</div>
		</div>
	</div>
	
	<script src="${pageContext.request.contextPath}/resource/assets/js/jquery.min.js" charset="utf-8"></script>
	<script src="${pageContext.request.contextPath}/resource/pulgins/layer/layer.js"></script>
		
	<script type="text/javascript">
        
	$(function(){
	//绑定方式
		$('.select-toggle').each(function(){
			$(this).find('li').click(function(){
				$(this).siblings().removeClass('on');
				$(this).addClass('on');
			})
		})
	});
          
	/*检查账户输入是否为空*/
	function checkUserName(){
		var account=$("#account").val();
		if(!account){ 
			showResult("#account","请输账号","");
			return false;
		}else{
			showResult("#account","","");
			return true;
		}
	}
        
	/*检查验证账号的图片验证码是否为空*/
	function checkValtiCode(){
		var imgVerCode=$("#imgVerCode").val();
		if(!imgVerCode){
		showResult("#imgVerCode","请输入验证码","");
		return ;
		}
	}
	
              
	/*确认账号*/
	function checkIdCard(){
		if(!checkUserName()){
			return false; 
		}
		checkValtiCode();
        var account=$("#account").val();
        var imgVerCode=$("#imgVerCode").val();
		if(account){
			$.ajax({
		    	type: "POST",
		        url: "${pageContext.request.contextPath}/ForgetPwd/confirmAccount",
		        data: {account:account,imgVerCode:imgVerCode},
		        dataType: "json",
		        success: function(data){
		            if(data.resultFlag){			
			 			$("#idCard").addClass("none");
			            $("#check").removeClass("none");
			            $("#reset").addClass("none");
			            $("#end").addClass("none");
			            $("#email").text("邮箱"+account.substr(0,3)+"****"+account.substr(account.length-7,7));
		            }
		            else{
		            	layer.alert(data.message,{
		            	icon: 5,
		            	title: "提示"
		            	});
		            }
		         }             
		         });
			}
		}
	
	
		/* 改变图片验证码数字  */
		function changeImgVerCode() {
			$("#sendVerCode").attr("src","${pageContext.request.contextPath}/ForgetPwd/createImgVerCode?timestamp=" + (new Date()).valueOf());
		}
		
		var codewait=60;
		function btnReload(o) {  			
		        if (codewait == 0) {  
		            o.attr("disabled",false);            
		            o.val("获取验证码");   
		            o.css("background","#2498ff");
		            o.css("color","#fff");
		            codewait = 60;
		            return;
		        } else {  
		            o.attr("disabled", true); 
		            o.val("重新发送(" + codewait + ")");
		            o.css("background","#ebebeb");
		            o.css("color","black");
		            codewait--;  		            
		         };
		         setTimeout(function() {  
		            	btnReload(o)
		            	},  
		            	1000);
		}
		
		/* 发送验证码 */
		function sendCode(){
			var mod = $("#account").val();
			var btn = $("#codeBtn");
			$.ajax({
				type: "POST",
	            url: "${pageContext.request.contextPath}/ForgetPwd/sendForgetPwdEmailVerCode",
	            data: {Email:mod},
	            dataType: "json",
	            success: function(data){
	            	if(data.resultFlag){
	            		btnReload(btn);
	            	}else{
	            		layer.alert(data.message,{
		            		icon: 5,
		            		title: "提示"
		            		});
	            	}	            	
				}
			})
		}
	    
		/*检查电话 或者邮件动态验证码是否为空*/
        function checkCode(){
			var verCode=$("#verCode").val();
			if(!verCode){
				showResult("#verCode","请输入验证码","");
				return ;
			}
			else{
				$.ajax({
		             type: "POST",
		             url: "${pageContext.request.contextPath}/ForgetPwd/securityVerification",
		             data: {verCode:verCode},
		             dataType: "json",
		             success: function(data){
		            	 if(data.resultFlag){
		            		 $("#idCard").addClass("none");
			            	 $("#check").addClass("none");
			            	 $("#reset").removeClass("none");
			            	 $("#end").addClass("none");
		            	 }
		            	 else{
		            		 layer.alert(data.message,{
		            			 icon: 5,
		            			 title: "提示"
				            });
		            	 }
		             }		                        
		         }); 
			}				
        }     
		
	         
	         
/* 		function getCheckCodeBack(result){
			if(result.codePass=='1'){
				window.location.href="resetPwd.jsp?email=124****@qq.com&phone=180****6125";
			}else {
				showResult("#verCode",result.errMsg,"");
			}
		} */
			
		/* 提示图标的显示 */
		function showResult(target,errorMsg,rightMsg){
			$(target).parent("dd").find("span").not(".time-end").hide();
			if(errorMsg){
				$(target).parent("dd").find("span.error").show();
				$(target).parent("dd").find("span.error").text(errorMsg);
				$(target).parent("dd").find("span.correct").hide();
			}else{
				$(target).parent("dd").find("span.error").hide();
				$(target).parent("dd").find("span.correct").show();
				$(target).parent("dd").find("span.correct").text(rightMsg);
			}
		}
		
		/* 重置密码并保存 */
		function passChangeSuccess(check){
			var newPwd = $("#newPwd").val(); 
			var confirmPwd = $('#confirmPwd').val();
			var regex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/;
			if(!newPwd.match(regex)){
				showResult("#newPwd","密码必须由6-30位字母、数字、特殊字符构成。","");
				return ;
			}else{
				showResult("#newPwd","","");
			}
			if (newPwd != confirmPwd) {
				showResult("#confirmPwd","前后两次密码输入不一致！","");
				return ;
			}else{
				showResult("#confirmPwd","","");
			} 
			if(check=='1'){
				/* newPwd=encodeURIComponent(newPwd); */
				//保存密码
				/* var returnData = ajaxJSON("/partysso/findPwd/passChangeSuccess?newPassword="+newPassword+"", PassChangeSuccessBack, "", true, false, "post"); */
				$.ajax({
		             type: "POST",
		             url: "${pageContext.request.contextPath}/ForgetPwd/resetPassword",
		             data: {newPwd:newPwd,confirmPwd:confirmPwd},
		             dataType: "json",
		             success: function(data){
		            	 $("#idCard").addClass("none");
		            	 $("#check").addClass("none");
		            	 $("#reset").addClass("none");
		            	 $("#end").removeClass("none");	
		            	 timeOut();
		             }		                         
		         });
			}
		}
		
		var wait = $(".second").html();  
         
        /**  
         * 实现倒计时  
         */  
         function timeOut() {  
             if(wait!= 0) {  
                 setTimeout(function() {  
                     $('.second').text(--wait);  
                     timeOut();  
                 }, 1000);  
             }else if(wait == 0){
            	 location.href="${pageContext.request.contextPath}/login";
             }  
         }

	</script>
</body>
</html>