<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">

<style type="text/css">
	


</style>


</head>
<body>
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>主数据>权限管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="mainForm" action="#" onSubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
										<span>编码：</span><input readonly="readonly" type="text" id="uniquekey" name="uniquekey" class="form-control input-small" style="width: 150px;"/>
									</div>
									<div class="form-group" style="margin-left: 102px">
							        	<span>角色名称：</span>	
							        	<select class="form-control" id="roleName" name="roleName">
										</select>
							        </div>
							        <div class="form-group" style="margin-left: 102px">
										<span>运营商：</span><input readonly="readonly" type="text" class="form-control input-small" id="operatorId" name="operatorId" style="width: 150px;"/>
									</div>
									<!--时间控件begin  -->
						      </div>
						      	<div class="form-group" style="margin-top: 20px">
									<span>描述：</span><input readonly="readonly" type="text" class="form-control input-small" id="roleDescription" name="roleDescription" style="width: 800px;"/>
								</div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="roleTable" class="table table-hover table-striped table-bordered">
								<div class="zTreeDemoBackground left"><!-- 左侧菜单 -->
									<ul id="treeDemo" class="ztree">
									
									</ul>
								</div>
								<a id="btn_auth_dv"><button id="btn_auth_submit"  type="button" name="button" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button></a>
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/user/roleAuth.js" type="text/javascript"></script>
    
	<link rel="stylesheet" href="${contextPath}/resources/zTreeStyle/zTreeStyle.css" type="text/css">
	<%-- <link rel="stylesheet" href="${contextPath}/resources/zTreeStyle/base.css" type="text/css">
	<script type="text/javascript" src="${contextPath}/resources/zTreeStyle/jquery.js"></script> --%>
	
</body>
</html>