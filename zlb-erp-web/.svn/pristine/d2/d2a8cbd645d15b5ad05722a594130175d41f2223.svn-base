<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<title>生鲜运营支撑系统</title>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonMainCss.jsp"%>
<!--[if lte IE 9]>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/html5shiv.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/respond.js"></script>
	<![endif]-->
	<style type="text/css">

		#headDiv{
			border: 1px solid black;
			color: #282d30;
			background-color: #282d30;
		}
		.box-content {
			box-shadow:0px;
			border: none;
			padding: 0 10px 10px 10px;
		}
		#leftcontent {
			height: 920px;
			background-color: #282d30;
		}
		._nav-bar-logo {
			float: left;
			text-align: center;
			width: 228px;
			line-height: 50px;
			color: #d0d0d0;
			border-bottom: 1px solid #000;
		}
		._nav-bar-logo img {
			height: 30px;
			width: 180px;
			margin-right:0px;
			vertical-align:middle;
		}
		#topMenu a{
			height: 50px;
			vertical-align: middle;
			text-align: center;
			font-size: 16px;
		}
		#topMenu span{color: #d0d0d0;}
		#topMenu a:hover span{
			color: #f92e59;
		}
		#topMenu a:hover{
			color:#000000;
			background-color: #000000;
		}
		#topMenu .active span{
			color: #f92e59;
		}
		#topMenu .active a{
			color:#000000;
			background-color: #000000;
			outline: 0;
		}
		/*列表导航块样式*/
		.table_nav{
			margin-top:10px;
			margin-bottom: 10px;
		}
		#feature-tab{
			margin-top:0px;
			margin-bottom: 0px;
		}
		#toolbar {
			margin-top:0px;
			margin-bottom: 0px;
		}
		#toolbar button {
			height: 40px;
		}
		/*搜索*/
		.alert{
			margin-bottom: 10px;
			margin-top: 10px;
		}
		/*搜索栏*/
		.alert-info{
			background-color: #f1fafd;
			border-color:#f1fafd;
			border: 0px;
			margin-bottom: 10px;
			margin-top: 10px;
		}
		.alert-info button {
			margin: 0 0 0 0;
		}
		/*表格样式*/
		/*按照单个字母去换行，不保证单词的完整性*/
		.break-word{
			word-wrap:break-word;
			word-break:break-all;
			white-space:normal;
		}
		#rightcontent .table th,#rightcontent .table td {
			text-align: center;
			vertical-align: middle;
			border: none;
		}
		.table thead{
			color:#1f2d3d;
			background-color: #eef1f6;
			font-weight:bold;
		}
		.table tbody{
			color:#1f2d3d;
			font-weight:normal;
		}
		.table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th
		{
			background-color: #FAFAFA
		}
		.table-hover>tbody>tr:hover>td, .table-hover>tbody>tr:hover>th {
			background-color: #eef1f6;
		}
		.pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {
			z-index: 2;
			color: #fff;
			background-color: #20a0ff;
			border-color: #dddddd;
			cursor: default;
		}
		.box-inner {
			border:none;
			box-shadow: 0 0 0 0;
		}
		.fixed-table-container {
			border: none;
		}
		#rightcontent .dropdown-menu{
			min-width: 47px;
		}
		#rightcontent .dropdown-menu a{
			padding: 3px 11px;
		}
		#rightcontent .page-list button{
			padding: 5px 10px;
			font-size: 12px;
			line-height: 1.5;
			border-radius: 3px;
		}

		/*时间控件的样式*/
		#rightcontent .form_datetime input[disabled],
		#rightcontent .form_datetime input[readonly],
		#rightcontent  .form_datetime .form-control[readonly],
		#rightcontent  .form_datetime .form-control[disabled]{
			cursor: pointer;
			background-color: #FFF;
		}
		#rightcontent .form_datetime .input-group-addon{
			background-color: #FFF;
		}
		/*取消lable标签加粗字体*/
		#rightcontent label{
			font-weight: normal;
		}
        /*顶端导航*/
        #rightcontent .box-header{
			margin-bottom: 10px;
			margin-left: 0px;
		}
		/*表格内按钮加外边距*/
		.table .btn {
			margin: 5px 5px 5px 5px;
		}
		/*隐藏导航栏*/
		#rightcontent .breadcrumb{
			display: none;
		}
		.btn[disabled]{
			background-color: #e0e0e0;
			background-image: none;
			border-color: #e0e0e0;
			color:black;
		}
		#rightcontent .navbar-collapse{
			padding-right: 0px;
			 padding-left: 0px;
		}

		/*自定义标准样式*/
		/*消除内边距*/
		.no-padding{
			padding: 0px;
		}
		/*添加左右外边距*/
		.left-right-margin{
			margin-left: 10px;
			margin-right: 10px;
		}
		/*添加上下外边距*/
		.top-bottom-margin{
			margin-left: 10px;
			margin-right: 10px;
		}
		/*表单必填星号样式*/
		.text-required{
			color: #C00;
			margin-right: 4px;
		}
		/*自定义表格排版*/
		#rightcontent .table-custom{
			border: none;
			background-color: white;
		}
		#rightcontent .table-custom th{
			text-align: left;
			vertical-align: text-bottom;
			border: none;
		}
		#rightcontent .table-custom td{
			text-align: left;
			vertical-align: middle;
			border: none;
		}
		#rightcontent .table-custom .text-left{
			text-align: left;
			vertical-align: middle;
		}
        #rightcontent .table-custom .text-right{
			text-align: right;
			vertical-align: middle;
		}
        /*所有禁用的输入框，下拉框,span背景色设为白色*/
        #rightcontent input,#rightcontent select,#rightcontent .input-group-addon{
            background-color:white;
        }
        #rightcontent .table-custom input,#rightcontent .table-custom select,#rightcontent .table-custom .input-group-addon{
			background-color:white;
		}
        /*解决多个蒙态框滚动条消失问题*/
        .modal {
            overflow-x:hidden !important;
            overflow-y:auto !important;
        }
</style>
</head>
<body>
	<!-- 头部层================================= starts -->
	<div id="headDiv" class="navbar navbar-default" role="navigation">

		<div class="navbar-inner">

			<div class="_nav-bar-logo">
				<a href="http://www.zhilianbao.cn/" target="_blank">
					<img alt="乐摇网" src="${contextPath}/resources/img/leyao-logo.png"  style="width: 100px;"/>
				</a>
			</div>


			<!-- user dropdown starts -->
			<div class="btn-group pull-right">

				<button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					<i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs"> 设置</span> <span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<!-- <li><a href="#">个人信息</a></li>
					<li class="divider"></li>-->
					<li><a href="#" onclick="javascript:resets();" data-toggle="modal" data-target="#myModal13">修改密码</a></li>
					<li class="divider"></li>
					<li><a href="${contextPath}/login/logout">退出</a></li>
				</ul>
			</div>

			<div class="btn-group pull-right">
				<select class="form-control" id="managerOperator" name="managerOperator"></select>
			</div>
			<!-- user dropdown ends -->

			<ul id="topMenu" class="collapse navbar-collapse nav nav-pills top-menu">
				<!--             <li><a href="#"><h2>订单管理(OMS)</h2></a></li> -->
				<!--             <li><a href="#"><h2>运输管理(TMS)</h2></a></li> -->
				<!--             <li><a href="#"><h2>公共数据</h2></a></li> -->
			</ul>


		</div>

	</div>
	<!-- 头部层================================= ends -->
	<div id="allcontainer">
		<!-- 左侧菜单层================================= starts -->
		<div id="leftcontent">
			<div class="nav-sm nav nav-stacked"></div>
			<div id="tree" class="blackTree"></div>
		</div>
		<!-- 左侧菜单层================================= ends -->

		<div id="rightcontent">
			<!-- 右侧主体内容层==================================================================================================== starts -->
			<div id="allcontent">
			</div>
			<!-- 右侧主体内容层==================================================================================================== ends -->
		</div>
	</div>
	<div id="externalContainer">
		
	</div>
	<div id="layerOne"></div>
	<div id="layerTwo"></div>

	<div class="modal fade" id="myModal13" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">


	<div class="modal-dialog">
		<div class="modal-content">
		<form role="form" class="form-inline" id="pwdForm" action="#" onSubmit="return false;" method="get">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					修改密码
				</h4>
			</div>
			<div class="modal-body" style="width: 100%;">
				<div style="width: 266px;margin: auto;">
					<div>
						<label style="color: red">* </label><label style="width: 35%">原&nbsp;&nbsp;密&nbsp;&nbsp;码：</label><input class="form-control" style="width: 60%" id="sourcePwd" name="sourcePwd" type="password" placeholder="原始密码">
					</div>
					<div style="margin-top: 20px;">
						<label style="color: red">* </label><label style="width: 35%">新&nbsp;&nbsp;密&nbsp;&nbsp;码：</label><input class="form-control" style="width: 60%"  id="newPwd" name="newPwd" type="password" placeholder="请输入新密码">
					</div>
					<div style="margin-top: 20px">
						<label style="color: red">* </label><label style="width: 35%">确认密码：</label><input class="form-control" id="newPwdTwo" style="width: 60%"  name="newPwdTwo" type="password" placeholder="请再次输入新密码">
					</div>
				</div>
			</div>
			
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消
				</button>
				<button type="button" onclick="javasrcript:myMain.modifyPwd();" class="btn btn-primary">
					确认
				</button>
			</div>	
		</form>
			
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


	<script src="${contextPath}/resources/js/common/config.js" type="text/javascript"></script>
	<script type="text/javascript">
		document.write('<script src="'+config.url_map_api+'&ak='+config.url_map_ak+'" type="text/javascript"></scr'+'ipt>');
	</script>


	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonMainJs.jsp"%>
	<%-- <%@include file="../common/commonJs.jsp"%> --%>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/js/bootstrap-treeview.js"></script>

	
	<script src="${contextPath}/resources/js/business/login/myMain.js"></script>
	<script src="${contextPath}/resources/js/business/auth/operator.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/js/placeholder.js"></script>
	<script>
		function resets() {
			document.getElementById("pwdForm").reset();
			//刷新表单校验
			//$('#pwdForm').bootstrapValidator('resetForm', true);
			//var bootstrapValidator = $("#pwdForm").data('bootstrapValidator');
			//bootstrapValidator.validate();

		}
	</script>
</body>
</html>

