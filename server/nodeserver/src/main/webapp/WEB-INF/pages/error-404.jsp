<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>404</title>
    <style type="text/css">
        * {
            box-sizing: border-box;
        }
        html,body {
            margin: 0; 
            padding: 0;
            height: 100%;
            width: 100%;
            font: 16px/20px microsft yahei;
        }
        .wrap {
            width: 100%;
            
            height: 100%;
            position: fixed;
            
           
            
            opacity: 0.8;
            background: linear-gradient(to bottom right,#88b6c5,#87b5d6);
            background: -webkit-linear-gradient(to bottom right,#88b6c5,#87b5d6);
        }
      
       .container{
	       	width: 800px;
	       	height: 400px;
	       	position: relative;
	       	margin: 0 auto;
	       	top: 50%;
	       	transform: translateY(-50%);
	       	background-color: dodgerblue
	       	opacity: 0.3;
       }
       .container>.c-img{
	       	padding: 100px 50px;
	       	margin-left: 300px;
	       	position: relative;
      
       }
       .container span{
	       font-size: 140px;
	       color: dodgerblue;
	       font-weight: bold;
	       margin-left: -240px;
	       margin-top: 80px;
	       position: absolute;
	       z-index: -1;
       	
       }
       .container p{
	       	font-size: 40px;
	       	position: absolute;
	       	color: dodgerblue;
	       	margin-top: -80px;
	       	margin-left: 150px;
	       	font-weight: bold;
       	
       }

       .c-img{
       	     -webkit-animation: ani 2.2s ease 1.2s both;
            animation: ani 2.2s ease 1.2s both;
       }
       @keyframes ani {
          0%  {
                  -webkit-transform: translateY(0deg);
                  transform: translateY(0deg)
              }
          100% {
                  
                  transform: rotate(360deg);
                 /* -webit-transform: rotate(600deg);*/
                  -webkit-transform: translateY(-360);
                  /*transform: translateY(-500);*/
          }
      }
   
    </style>
</head>
<body>
    <div class="wrap">
        <div class="container">
        	<img src="${pageContext.request.contextPath}/resource/images/404.png" class="c-img" />
        	<span class="word">404</span>
           
        	<p>SORRY！您访问的页面弄丢啦！</p>
        </div>
           
        <!--<ul style="text-align: center;">
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
            <li>出错啦</li>
        </ul>-->
    </div>
</body>
</html>