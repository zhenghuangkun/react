/**************************************
 * login js
 *************************************/


jQuery(function($) {

 //如果cookie 中记住我是打勾状态，将cookie 中的用户名密码设置到页面上
 if ($.cookie("rememberMe") == "true") {
     $("#rememberMe").attr("checked", "checked");
     $('input[name="userName"]').val($.cookie("userName"));
     $('input[name="userPwd"]').val($.cookie("userPwd"));
 }
});

/**
 * 使用ajaxSubmit 将数据提交到登录controller 处理
 */
$('#loginForm').on('submit', function() {
    $(this).ajaxSubmit({
        type: 'post',
        url: contentPath+'/login/userLogin',
        success: function(data) {
        	if(data.flag == false){
				layer.msg(data.message);
        		return;
			}
        	var code = parseInt(data.code);
            switch(code){
            	case SUCCESS_CODE:
            		//登录成功如果勾选了记住我，将用户名密码存入cookie
            		saveUserInfo();
            		window.location.href = contentPath+'/routing.do';
            		break;
            	case LOGIN_ACCOUNT_OVER_CODE:
            		$("#alert_warning").show();
            		$("#errorInfo").html("&nbsp"+data.errorInfo);
            		break;
            	case LOGIN_UNKNOW_ERROR_CODE:
            		$("#alert_warning").show();
            		$("#errorInfo").html("&nbsp"+data.errorInfo);
            		break;
            	case LOGIN_USER_LOCK_CODE:
            		$("#alert_warning").show();
            		$("#errorInfo").html("&nbsp"+data.errorInfo);
            		break;
				case MAIL_SEND_ERROR:
					$("#alert_warning").show();
					$("#errorInfo").html("&nbsp"+data.errorInfo);
					break;
				case VALIDATION_CODE:
					$("#alert_warning").show();
					$("#errorInfo").html("&nbsp"+data.errorInfo);
					break;
            	default:
            }

            $(this).resetForm();
        }

    });
    return false; // 阻止表单自动提交事件
});

/**
 * 保存用户名、密码信息到cookie 中
 * 功能内容描述：
 * 1.判断记住我是否勾选
 * 2.将用户名、密码存入cookie
 */
function saveUserInfo(){

	if($("#rememberMe").is(':checked')){

		var userName = $('input[name="userName"]').val();
		var userPwd = $('input[name="userPwd"]').val();

		//rmbUser
		$.cookie("rememberMe", "true", {  expires : 7 });
		//userName
		$.cookie("userName", userName, {  expires : 7 });
		//userPwd
		$.cookie("userPwd", userPwd, {  expires : 7 });
	}else{
		//delete rmbUser
		$.cookie("rememberMe", "false", {  expires : -1 });
		//delete userName
		$.cookie("userName", "", {  expires : -1 });
		//delete userPwd
		$.cookie("userPwd", "", {  expires : -1 });
	}
}
