<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>

</head>
<body class="skin-blue">
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>运营商管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form" id="searchForm">
								<div class="controls controls-row">
									<div class="form-group">
									    <span>运营商名称：</span>	
										<div class="input-group">
									      <input class="form-control input-small" type="text" name="companyName" id="companyName" style="width: 150px;">
									      
									    </div>
							        </div>
									<!-- <div class="form-group">
									    <span>中文全称：</span>	
										<div class="input-group">
									      <input class="form-control input-small" type="text" name="companyFullName" id="companyFullName" style="width: 150px;">
									      
									    </div>
							        </div> -->
								
								<div class="form-group">
						        	<span>状态：</span>	
						        	<select class="form-control" id="enabled">
									  <option value="-1">全部</option>
<!-- 									  <option value="1">生效</option> -->
<!-- 									  <option value="0">失效</option> -->
									</select>
						        </div>
						        
					        	<div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        </div>
						        
						        <div class="form-group">
						        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						        </div>
						      </div>
								
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
							 <div>
								<table id="operatorTable" class="table table-hover table-striped table-bordered" >
									
								</table>
							</div>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm"  method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        
		        
		        <div class="modal-body" >
				  <table style="width:100%;">
				      <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label><span style="color: red;">*</span>key值：</label>
					      <input type="text" name="companyKey_a" class="form-control" id="companyKey_a" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label><span style="color: red;">*</span>中文简称：</label>
					      <input type="text" name="companyName_a" id="companyName_a" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>
					      客服联系人：
					      </label>
					      <input type="text" name="customerContact" id="customerContact" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label>
					      客服联系电话：
					      </label>
								<input type="text" name="customerMobileNo" class="form-control" id="customerMobileNo" style="width: 239px;" >
                           <!-- <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div> -->
					      </div>
					   </td>
					 </tr>
					 <tr>
					   
					   <td>
					      <div class="form-group"">
					      		<label>
					      		客服邮箱：
					      		</label>	
						        <input type="text" name="customerEmail" class="form-control" id="customerEmail" style="width: 239px;" >
					      </div>
					   </td>
					   
					   <td>
					      <div class="form-group" style="margin-left: 50px;">
					      <label>
					      对帐联系人：
					      </label>
					      <input type="text" name="reconciliationContact" class="form-control" id="reconciliationContact" style="width: 239px;" >
	                      </div>
					   </td>
					 </tr>
					 <tr>
					   
					   <td>
					      <div class="form-group" >
					      <label>
					      对帐联系电话：
					      </label>
					      <input type="text" name="reconciliationMobileNo" class="form-control" id="reconciliationMobileNo" style="width: 239px;" >
					      </div>
					   </td>
					   <td>
					      <div class="form-group" style="margin-left: 50px;">
					      <label>
					      对帐邮箱：
					      </label>
					      <input type="text" name="reconciliationEmail" id="reconciliationEmail" class="form-control" style="width: 239px;" >
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>网站链接：</label>
					      <input type="text" name="siteUrl" id="siteUrl" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label><span style="color: red;">*</span>客户地址：</label>
					      <input type="text" name="companyAddress" class="form-control" id="companyAddress" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 
				   </table>
				   <div class="form-group">
			            <label>描述：</label>
			            <textarea rows="3" name="remark" class="form-control" id="remark" maxlength="100"></textarea>
			       </div>
		        </div>
		        <div class="modal-footer">
		          <input type="hidden" id="rowId">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		          <button id="btn_edit_submit" type="button" name="btn_edit_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>	
	
	
    <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/auth/operator.js" type="text/javascript"></script>
	    
    
</body>
	
</html>