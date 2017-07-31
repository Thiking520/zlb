<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>生鲜运营支撑系统</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
</head>
<body>

<%
String contextPath = request.getScheme() +"://" + request.getServerName() + ":" +request.getServerPort() + request.getContextPath(); 
String info=request.getParameter("info");
String ssoUrl=request.getParameter("ssoUrl");
%>

<table style="width: 100%;height: 100%;">
<tr>
<td align="center" valign="top"><%=info %>,<span id="autojump"></span>秒后跳转到登录，<a href="javascript:jump();">点击跳转</a></td>
</tr>
</table>


	<script type="text/javascript">
	    function jump(){
	    	var ssoUrl = '<%=ssoUrl%>';
	    	var forwardUrl = '<%=contextPath%>';
			if (null != ssoUrl && 'null' != ssoUrl && '' != ssoUrl) {
				forwardUrl += ssoUrl;
			}
			top.location.href = forwardUrl;
		}
		var num = 5;
		function secondNum() {
			if (num <= 0) {
				jump();
			} else {
				document.getElementById("autojump").innerText = num;
				num--;
				setTimeout("secondNum()", 1000);
			}
		}
		secondNum();
	</script>
	
</body>
</html>