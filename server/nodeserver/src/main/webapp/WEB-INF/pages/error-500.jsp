<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>500</title>
    <style type="text/css">
    html,body{
    	height: 100%;
    	width: 100%;
    	padding: 0;
    	margin: 0;
    	box-sizing: border-box;
    }
       
     
    .wrap {
        width: 100%;
        height: 100%;
        padding: 40px 0;
        position: fixed;
        
       
        background: linear-gradient(to top ,#a0a0a0,#f8f8f8);
        background: -webkit-linear-gradient(to bottom ,#a0a0a0,#f8f8f8;)
    }
    .container{
    	height: 400px;
    	width: 500px;
    	position: relative;
    	margin: 0 auto;
    	top: 50%;
    	
    	
    	transform: translateY(-50%);
    }
    .container img{
    	padding: 30px 30px;
    }
    .container>.word{
    	font-size: 25px;
    	color: dodgerblue;
    	font-weight: bold;
    	line-height: 30px;
    	margin-top: -80px;
    	margin-left: 100px;
    }
    .container span{
    	margin-left: 150px;
    	position: relative;
    	font-size: 120px;
    	color: dodgerblue;
    	text-shadow: 10px 10px 10px #333;
    	font-weight: bold;
    	
    }
    .container>.deco{
    	border:1px solid #333;
    	box-shadow: 30px 10px 10px #000;
    	width: 60%;
    	margin-left: 80px;
    }
    .btn-gr{
    	display: inline-block;
    	margin-left: 100px;
    }
    .btn-gr button{
    	border-radius: 10px;
    	padding: 12px;
    	font-size: 14px;
    }
    </style>
</head>
<body>
    <div class="wrap">
	<div class="container">
		<img src="${pageContext.request.contextPath}/resource/images/500.png" class="c-img2"/>
		<p class="word">很抱歉！您指定的页面无法访问...</p>
		<span>500</span>
		<div class="deco"></div>
		<!--<p class="word" style="margin-top: 30px;">您还可以：</p>
		<div class="btn-gr">
			<button style="background-color: dodgerblue;color: #fff;">访问首页</button>
			<button style="color: dodgerblue;">返回上一步</button>
		</div>-->
		
	</div>
</div>
</body>
</html>