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
%>
	<!-- 本地登录验证-->
	<script type="text/javascript">
	    window.location.href = '<%=contextPath%>/login/init';
	</script> 


<!-- 开启SSO需要进行3步操作：
     Step1:注释如上[本地登录验证]代码;
     Step2:修改spring-shiro.xml的shiroFilterChainDefinitions配置项;
     Step3:打开如下注释;
	<%@include file="ssoLogin.jsp"%>--> 
	
</body>
</html>