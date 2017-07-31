<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
    	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
        <meta charset="UTF-8">
        <title>智联宝</title>
 <!-- ★ 导入公共JS库 -->
<%@include file="../common/commonJs.jsp"%>
<script src="${contextPath}/resources/js/business/login/main.js"></script>

    </head>
    
    <frameset rows="90,*" id="tframe">
    <frame src="${contextPath}/login/top" noresize="noresize" frameborder="NO" name="topFrame" scrolling="no" marginwidth="0" marginheight="0" target="main" />
    <frameset cols="260,*"  id="frame">
    <frame src="${contextPath}/login/left" name="leftFrame" noresize="noresize" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" target="main" />
    <frame src="${contextPath}/login/right" name="main" id="main" marginwidth="0" marginheight="0" frameborder="0" scrolling="auto"/>
    </frameset>
    </frameset>
    
    <body class="skin-blue">
           

    </body>
    
    	
</html>