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
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>角色管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onSubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
										<span>编码：</span><input  id="suniquekey" type="text" class="form-control input-small" style="width: 150px;"/>
									</div>
									<div class="form-group">
									    <span>角色名称：</span><input id="sroleName" type="text" class="form-control input-small" style="width: 150px;"/>
							        </div>
								
								<div class="form-group">
						        	<span>状态：</span>	
						        	<select id="senabled" class="form-control">
						        		<option value=''>全部</option>
									  <option value="true">生效</option>
									  <option value="false">失效</option>
									</select>
						        </div>
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        </div>
						        <!-- <button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button> -->
						        <div class="form-group">
						        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						        </div>
						        <!-- <button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button> -->
						      </div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_true"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>生效</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_false"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>失效</button>
							 </div>
							</div>
							<table id="roleTable" class="table table-hover table-striped table-bordered" >
								
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        
		        <%-- ===================================这里新增页面==========================Start==== --%>
		        <div class="modal-body" >
				  <table style="width:100%;">
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>编码：</label>
					      <input readonly="readonly" type="text" name="uniquekey" class="form-control" id="uniquekey" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      		<label>状态：</label>	
						        <select class="form-control" name="enabled" id="enabled" style="width: 239px;">
								    <option value='1'>生效</option>
								    <option value='0'>失效</option>
							    </select>
							</div>
					   </td>
					 </tr>
					 
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
						      <label>运营商：</label>	
						      <select class="form-control" name="operatorId" id="operatorId" style="width: 239px;">
								  
							  </select>
						  </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px">
					      <label><span class="text-required">*</span>角色名称：</label>
					      <input type="text" name="roleName" class="form-control" id="roleName" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>是否为运营商超级管理员：</label><br/>
					      <label for="no" style="margin-left: 50px;">不是：</label><input type="radio" id="no" checked="checked" name="isSuperAdmin" value="0">
					      <label for="yes" style="margin-left: 100px">是：</label><input type="radio" id="yes" name="isSuperAdmin" value="1">
					      </div>
					   </td>
					 </tr>
				   </table>
				   <div class="form-group">
			            <label>角色描述：</label>
			            <input type="text" name="roleDescription" maxlength="50" class="form-control" id="roleDescription" >
			       </div>
			       <label style="color: #DDD">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">角色权限</label>—————————————————————————————————</label>
			       <div style="width: 100%;height: 300px;border: 1px solid #CCC; overflow: auto;border-radius: 4px;">
			       		<div role="grid" class="box-body table-responsive">
							<table id="roleTable" class="table table-hover table-striped table-bordered">
								<div class="zTreeDemoBackground left"><!-- 左侧菜单 -->
									<ul id="treeDemo" class="ztree">
									
									</ul>
								</div>
							</table>
						</div>
			       </div>
			       <%-- ===================================这里新增页面==========================Start==== --%>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel_add"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit"  type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>	
	
	<!-- 隐藏的修改框 -->
	<form id="modifyAnchorForm" method="post">
		<div class="modal fade" id="modifyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="modifyModalLabel">编辑</h4>
		        </div>
		        
		        <%-- ===================================这里新增页面==========================Start==== --%>
		        <div class="modal-body" >
				  <table style="width:100%;">
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>编码1111111：</label>
					      <input type="text" name="uniquekey_m" readonly="readonly" class="form-control" id="uniquekey_m" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      		<label>状态：</label>	
						        <select class="form-control" name="enabled_m" id="enabled_m" style="width: 239px;">
								    <option value='1'>生效</option>
								    <option value='0'>失效</option>
							    </select>
							</div>
					   </td>
					 </tr>
					 
					 <tr>
					   <td style="width:50%;">
					      <!-- <div class="form-group">
					      <label>*运营商：</label>
					      <input type="text" readonly="readonly" name="operatorId_m" id="operatorId_m" class="form-control">
					      </div> -->
					      <div class="form-group">
						      <label>运营商：</label>	
						      <select class="form-control" name="operatorId_m" id="operatorId_m" style="width: 239px;">
								  
							  </select>
						  </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label><label style="color: red"> *</label>角色名称：</label>
					      <input type="text" name="roleName_m" class="form-control" id="roleName_m" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>是否为运营商超级管理员：</label><br/>
					      <label for="n_m" style="margin-left: 50px;">不是：</label><input type="radio" checked="checked" id="n_m" name="isSuperAdmin_m" value="0">
					      <label for="yes_m" style="margin-left: 100px">是：</label><input type="radio" id="yes_m" name="isSuperAdmin_m" value="1">
					      </div>
					   </td>
					 </tr>
				   </table>
				   <div class="form-group">
			            <label>角色描述：</label>
			            <input type="text" name="roleDescription_m" class="form-control" id="roleDescription_m" >
			            <input type="hidden" id="modifyId" name="modifyId"/>
			       </div>
			       <label style="color: #DDD">——<label style="font-style: oblique;font-weight: none;color: #2FA4E7">角色权限</label>—————————————————————————————————</label>
			       <div style="width: 100%;height: 300px;border: 1px solid #CCC; overflow: auto;border-radius: 4px;">
			       		<div role="grid" class="box-body table-responsive">
							<table id="roleTableEdit" class="table table-hover table-striped table-bordered">
								<div class="zTreeDemoBackground left"><!-- 左侧菜单 -->
									<ul id="treeDemoEdit" class="ztree">
									
									</ul>
								</div>
							</table>
						</div>
			       </div>
			       
			       
			       <%-- ===================================这里新增页面==========================Start==== --%>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_modify_submit" type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>







	
<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/user/role.js" type="text/javascript"></script>
	<%-- <script src="${contextPath}/resources/js/business/publicData/user/roleAuth.js" type="text/javascript"></script> --%>
    <script type="text/javascript" src="${contextPath}/resources/zTreeStyle/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="${contextPath}/resources/zTreeStyle/jquery.ztree.excheck.js"></script>
	<link rel="stylesheet" href="${contextPath}/resources/zTreeStyle/zTreeStyle.css" type="text/css">
    
</body>
</html>