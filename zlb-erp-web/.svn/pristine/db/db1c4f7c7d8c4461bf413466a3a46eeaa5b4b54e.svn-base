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
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>系统操作员管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onSubmit="return false;" method="get">
								<div class="controls controls-row">
									<!-- <div class="form-group">
										<span>编码：</span><input id="suniquekey" type="text" class="form-control input-small" style="width: 170px;"/>
									</div> -->
									<div class="form-group">
									    <span>登录帐号：</span>	
										<div class="input-group">
									      <input id="suserName" class="form-control input-small" type="text" style="width: 170px;">
									      <!-- <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div> -->
									    </div>
							        </div>
								
									<div class="form-group">
									    <span>姓名：</span>	
										<div class="input-group">
									      <input id="snickname" class="form-control input-small" type="text" style="width: 170px;">
									      <!-- <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div> -->
									    </div>
							        </div>
									<div class="form-group">
									    <span>角色名称：</span>	
										<div class="input-group">
									      <input id="roleName" class="form-control input-small" type="text" style="width: 170px;">
									      <!-- <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div> -->
									    </div>
							        </div>
									<div class="form-group">
							        	<span>状态：</span>	
							        	<select id="senabled" class="form-control">
							        	  <option value="">全部</option>
										  <option value="1">生效</option>
										  <option value="0">失效</option>
										</select>
							        </div>
						        <%--<div class="form-group">--%>
					         		<%-- <button type="button" id="example" class="btn btn-primary btn-xs popover-toggle"   
					         		data-html="true" data-toggle="popover"  data-placement="bottom" data-html="true" data-content="
				         			<table>
										<tr>
											<td><span>运营商：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>联系方式：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr style='text-align: center;background: rgb(7, 65, 123);color: white;' >
											<td colspan='2'><span class='glyphicon glyphicon-search' onclick='hid()'></span></td>
										</tr> 
								  </table>"
					         		>更多条件^</button> --%>
					        	<%--</div>--%>
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        	<button id="btn_clean" onclick="cleanSearch('searchForm');" class="btn btn-primary btn-flat" type="button">清空</button>
						        </div>
						        <!-- <div class="form-group">
						        	<button id="btn_add" class="btn btn-success btn-flat" type="button">新增</button>
						        </div> -->
						      </div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="button" class="btn btn-default  btn-sm" id="btn_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_true"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>生效</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_false"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>失效</button>
							 </div>
							</div>
							<table id="userTable" class="table table-hover table-striped table-bordered" >
								
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
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style= "overflow-y:scroll;
		">
		    <div class="modal-dialog" style="width:950px" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增/编辑</h4>
		        </div>
		        
		        <%-- ===================================这里编辑页面==========================Start==== --%>
		        <div class="modal-body" >
				  <table style="width:100%;">
					 <tr>
					   <td style="width:33%;">
					      <div class="form-group" style="width: 170px;">
					      <label>编码：</label>
					      <input type="text" name="uniquekey" class="form-control" id="uniquekey" readonly="readonly" style="width:170px;">
					      </div>
					   </td>
					   <td style="width:33%;">
					      <div class="form-group" style="width: 170px;">
					      <label><span class="text-required">*</span>运营商：</label>
					      <!-- <input type="text" name="operatorId" id="operatorId" readonly="readonly" class="form-control" style="width:170px;"> -->
					      <select class="form-control" name="operatorId" id="operatorId" style="width: 170px;">
					      </select>
					      
					      </div>
					   </td>
					   <td style="width:33%;">
					      <div style="width:170px;">
					      		<div class="form-group" style="width:130px; float:left;">
							    <label><span class="text-required">*</span>员工：</label>
								<!-- <div class="input-group"> -->
							      <input class="form-control input-small" id="empName" name="empName" readonly="readonly" type="text" style="display:block;width: 130px;float:left;">
							      </div>
							      <div class="input-group-addon findStaff" id="findStaff" style = "background: white;width: 40px;height:38px;float:left;margin-top:14.5%"><span id="glyphicon-search-1" class="glyphicon glyphicon-search"></span></div>
							     
					        </div>
					   </td>
					 </tr>
					 
					 <tr>
					   <td style="width:33%;">
					      <div class="form-group" style="width: 170px;">
					      <label><span class="text-required">*</span>帐号：</label>
					      <input type="text" name="userName" id="userName" readonly="readonly" class="form-control" style="width:170px;">
					      </div>
					   </td>
					   <td style="width:33%;">
					      <div class="form-group" style="width: 170px;">
					      <label><span class="text-required">*</span>联系电话：</label>
					      <!-- <input class="form-control input-small" type="text" name="mobileNo" class="form-control" id="mobileNo" style="width:170px;"> -->
					      <input class="form-control input-small" id="mobileNo" name="mobileNo" readonly="readonly" type="text" style="width: 170px;">
					      </div>
					   </td>
					   <td style="width:33%;">
							<div class="form-group" style="width: 170px;">
								<label>员工属性：</label>	
							  	<select class="form-control" disabled="disabled" name="job" id="job" style="width: 170px;">
								    <option value="10">配送员/楼小二</option>
								    <option value="20">调度员</option>
								    <option value="30">单证员</option>
								    <option value="40">司机</option>
							    </select>
							</div>
							<input type="hidden" id="jobId" />
							<input type="hidden" id="operatorID" />
							<input type="hidden" id="empId">
							<input type="hidden" id="nickName">
							<input type="hidden" id="zhandian">
							<input type="hidden" id="roleIds">
							<input type="hidden" id="pointIds">
					   </td>
					 </tr>
				   </table>
				   <div class="form-group">
			            <label>描述：</label>
			            <input type="text" name="description" readonly="readonly" class="form-control" id="description" >
			       </div>
			       <div style="width: 100%; max-height:660px;float:left;">
			       	<div id="cleft" style="width: 48%;float: left;">
			       		<div><label>角色</label></div>
			       		<div>
			       			<table id="roleList">
			       				
			       			</table>
			       		</div>
			       	</div>
			       	<div id="cright" style="width: 47%;float: right;">
			       		<div><label>配送点</label></div>
			       		<table id="pointList">
		       				
		       			</table>
			       	</div>
			       </div>
			       <%-- ===================================这里编辑页面==========================Start==== --%>
		        </div>
		        
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit" type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>	
	
<!-- 隐藏的员工列表 Begin -->
	<form id="empForm" method="post">
		<div class="modal fade" id="staffModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content" style = "z-index:999999999;">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">员工列表</h4>
		        </div>
		        <table style="width: 100%;height: 100px;">
					<tr>
						<td style="width: 10%">
							<span style="margin-left: 5px;">姓名：</span>
						</td>
						<td>
							<input type="text" name="s_cnName" id="s_cnName" class="form-control input-small" style="width: 100%;"/>
						</td>
						<td style="width: 13%">
							<span style="margin-left: 5px">电话号码：</span>	
						</td>
						<td >
							<input type="text" name="s_mobileNo" id="s_mobileNo" class="form-control input-small" style="width: 100%;"/>
						</td>
						<td colspan="4" style="text-align: right;">
							<button type="button" class="btn btn-success" id="btn_search_s">搜索</button>
						</td>
						<td colspan="4" style="text-align: right;">
							<button style="margin-left: 5px;margin-right: 20px" type="button" class="btn btn-primary" id="btn_clean" onclick="javascript:cleanSearch('empForm');">清空</button>
						</td>
					</tr>
				</table>
		        <div role="grid" class="box-body table-responsive">
					<table id="staffTable" class="table table-hover table-striped table-bordered">
						
					</table>
				</div>
			       <%-- ===================================这里新增页面==========================Start==== --%>
			       <div class="modal-footer" style = "">
			          <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
			          <button id="btn_staff_submit" type="button" name="button" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认</button>
			        </div>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>
	
<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/user/user.js" type="text/javascript"></script>
</body>
<script type="text/javascript">
		$(function (){
			$("#example").popover({
				
			});
		});
		
	</script>
</html>