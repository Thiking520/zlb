<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
 #divCss .fixed-table-toolbar{
		position: fixed;
		left: 92%;
		top:28%;
	}
</style>
</head>
<body class="skin-blue">
	<%-- <aside class="right-side"> 
	    <!-- 1 框架头部区域begin -->
		<section class="content-header">
			<h4>
				<ol class="breadcrumb">
					<li><a href="${contextPath}/login/right"><i class="fa fa-home"></i> 首页</a></li>
					<li class="active" href="${contextPath}/demo/list" >员工档案管理</li>
				</ol>
			</h4>
		</section> 
	</aside> --%>
	<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>员工档案管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">

						<form id="addOrEditeSearchForm" class="form-inline" role="form">
							<div class="controls controls-row">
							   <div class="form-group">
							   	<span>编码：</span><input name="uniqueKey_2" id="uniqueKey_2" type="text" class="form-control input-small" />
							   </div>
							   <div class="form-group">
							   	<span>姓名：</span><input name="cnName_2" id="cnName_2" type="text" class="form-control input-small" />	
							   </div>
							   <div class="form-group">
							   	<span>手机号码：</span><input name="userMobile" id="userMobile" type="text" class="form-control input-small" />
							   </div>
							   <!-- <div class="form-group">
							    <span>所属站点：</span>	
								<div class="input-group">
								  <input type="hidden" id="distributionPointId_2">
							      <input name="distributionPointName_2" id="distributionPointName_2" class="form-control input-small" type="text" readonly="readonly">
							      <div class="input-group-addon" style="background: white;"><span class="glyphicon glyphicon-search" id="dp_search_2"></span></div>
							      <div class="input-group-addon" style="background: white;"><span class="glyphicon glyphicon-remove" onclick="$('#distributionPointId_2').val('');$('#distributionPointName_2').val('');"></span></div>
							    </div>
						        </div> -->
						        <div class="form-group">
						        	<span>员工属性：</span>	
						        	<select class="form-control" name="occupationId_s" id="occupationId_s">
									  <option value="">全部</option>
									  
									</select>
						        </div>
						        <div class="form-group">
						        	<span>状态：</span>	
						        	<select class="form-control" name="enabled_2" id="enabled_2">
									  <option value="">全部</option>
									  
									</select>
						        </div>
						        <%-- <div class="form-group">
					         		<button type="button" id="example" class="btn btn-primary btn-xs popover-toggle"  
					         		data-html="true" data-toggle="popover"  data-placement="bottom" data-html="true" data-content="
				         			<table style='height:250px;'>
										<tr>
											<td><span>运营商：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
											<td><span>身份验证：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>员工属性：</span></td>
											<td><select class='form-control input-small'>
												  <option></option>
												  <option>配送员/楼小二</option>
												  <option>调度员</option>
												  <option>单证员</option>
												  <option>司机</option>
												</select>
											</td>
											<td><span>手机号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>驾驶证号：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
											<td><span>户籍：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>户籍地址：</span></td>
											<td colspan='3'><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>现居地址：</span></td>
											<td colspan='3'><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr style='text-align: center;background: rgb(7, 65, 123);color: white;' >
											<td colspan='4'><span class='glyphicon glyphicon-search' onclick='hid()'></span></td>
										</tr> 
								  </table>"
					         		>更多条件^</button>
					        	</div> --%>
					        	<div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        	<!-- <button type="button" class="btn btn-success btn-flat" id="btn_show_add">新增员工</button> -->
						        	<button id="btn_clean" onclick="cleanSearch();" class="btn btn-primary btn-flat" type="button">清空</button>
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
							<div id="divCss">
									<table id="empManagerTable" class="table table-hover table-striped table-bordered">

									</table>
							</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
    </div>
	</div>
	</section>
	
	<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm"  method="post" target="_blank" >
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow: scroll;">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content" >
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        <div class="modal-body" >
				  <table style="width:100%; height: 500px;">
					 <!-- <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>Key值：</label>
					      <input type="text" name="uniqueKey" class="form-control" id="uniqueKey" >
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group">
					      		<label>状态：</label>	
						        <select class="form-control" name="enabled" id="enabled">
								    <option value="1" selected="selected">生效</option>
									<option value="2">失效</option>
							    </select>
							</div>
					   </td>
					 </tr> -->
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>运营商：</label>
					      <input type="hidden" name="operatorId" id="operatorId">
					      <!-- <input type="text" name="operatorName" id="operatorName" class="form-control" value="0"> -->
					      <select class="form-control"  name="operatorNames" id="operatorNames" style="width: 239px;">
					      
					      </select>
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label style="margin-left: 50px;"><span class="text-required">*</span>姓名：</label>
					      <input type="text" name="cnName" class="form-control" id="cnName" style="width: 239px;margin-left: 50px;"/>
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <!-- <td style="width:50%;">
					      <div class="form-group">
					      <span style="font-weight: bolder;">英文名：</span>
					      <input type="text" name="enName" id="enName" class="form-control" style="width: 279px;" >
					      </div>
					   </td> -->
					   <td style="width:50%;">
					      <div class="form-group">
					      <span class="text-required">*</span><label>员工属性：</label>
					       <select class="form-control" name="occupationId" id="occupationId" style="width: 239px;">
										  
							</select>
					      </div>
					   </td>
					   <td style="width:50%;">
					   	<div class="form-group" style="margin-left: 50px;">
					      <label>性别：</label>
					      	<!-- <label style="padding-left: 30px;" for="male">男</label><input checked="checked" type="radio" name="gender" id="male" value="0" style="width: 30px;margin-left: 5px;vertical-align:text-bottom;margin-bottom:1px;*margin-bottom:2px;">
					      	<label style="margin-left: 30px;" for="female">女</label><input type="radio" name="gender" id="female" value="1" style="width: 30px;margin-left: 5px;vertical-align:text-bottom;margin-bottom:1px;*margin-bottom:2px;"> -->
					      	<select class="form-control" name="gender" id="occupationId" style="width: 239px;">
								<option value="0">男</option>
								<option value="1">女</option>
								<option></option>
							</select>
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td>
					      <div class="form-group">
					      <label><span class="text-required">*</span>手机号码：</label>
					      <input type="text" name="mobileNo" id="mobileNo" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					   <td>
					      <div class="form-group" style="margin-left: 50px">
					      <label><span class="text-required">*</span>身份证号：</label>
					      <input type="text" name="idNo" id="idNo" class="form-control" style="width: 239px;">
	                      </div>
					   </td>
					 </tr>
					 <tr>
					   <td>
					      <div class="form-group">
					      <label>驾驶证号：</label>
					      <input type="text" name="driverNo" id="driverNo" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label>户籍：</label>
					      <input type="text" name="registryCity" id="registryCity" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <!-- <td colspan="2">
					      <div class="form-group">
					      <label>户籍地址：</label>
					      <input type="text" name="censusAddress" class="form-control" id="censusAddress" >
					      </div>
					   </td> -->
					 </tr>
					 <tr>
					 	<td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>紧急联系人：</label>
					      <input type="text" name="kindredName" class="form-control" id="kindredName" style="width: 239px;">
					      </div>
					    </td>
					    <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      		<label><span class="text-required">*</span>紧急联系人关系：</label>
						        <select class="form-control" name="kindredId" id="kindredId" style="width: 239px;">
										  
								</select>
						   </div>
					    </td>
					 </tr>
					 <tr>
					    <td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>紧急联系人电话：</label>
					      <input type="text" name="emergentMobileNo" class="form-control" id="emergentMobileNo" style="width: 239px;" >
					      </div>
					   </td>
					 	<td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      		<label>状态：</label>
						        <select class="form-control" name="enabled" id="enabled" style="width: 239px;">
								    
							    </select>
							</div>
					    </td>
					 </tr>
					 <tr>
					 <td style="width:50%;">
					      
					   </td>
					  </tr>
					  <tr>
					   <td colspan="2">
					      <div class="form-group">
					      <label><span class="text-required">*</span>现居地址：</label>
					      <input type="text" name="currentAddress" id="currentAddress" class="form-control">
					      </div>
					   </td>
					 </tr>
				   </table>
				   <div class="form-group">
			            <label>描述：</label>
			            <input type="text" name="description" class="form-control" id="description" >
			       </div>
		        </div>
		        <div class="modal-footer">
		          <input type="hidden" id="rowId">
		          <button type="button" class="btn btn-default" data-dismiss="modal" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
		          <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		          <button id="btn_edit_submit" type="button" name="btn_edit_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
		        </div>
		      </div>
		    </div>
		  </div>
	</form>
	
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							选择站点
						</h4>
					</div>
					<div class="modal-body">
						<form id="fromModal02" action="" class="form-inline" role="form" id="sForm">
							<table style="width: 100%;height: 100px;">
								<tr>
									<td style="width: 10%">
										<span>编码：</span>
									</td>
									<td style="width: 27.5%">
										<input type="text" name="code_2" id="code_2" class="form-control input-small" style="width: 80%;"/>
									</td>
									<td style="width: 10%">
										<span>名称：</span>	
									</td>
									<td style="width: 27.5%">
										<input type="text" name="name_2" id="name_2" class="form-control input-small" style="width: 80%;"/>
									</td>
									<td  style="width: 25%">
										<button type="button" class="btn btn-success" id="btn_search_s" >搜索</button>
										<button type="button" style="margin-left: 5px;" class="btn btn-primary" id="btn_clean" onclick="javascript:resets('fromModal02');">清空</button>
										<button type="button" class="btn btn-primary" id="s_save" >确定</button>
									</td>
								</tr>
								<tr>
									
								</tr>
							</table>
							<table id="drList"></table>
					    </form>
						
						<div style="margin-left: 420px;">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" id="s_save_2" >确定</button>
						</div>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	
	 <!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	
	<!-- ★ 导入公共JS库 -->
	<script src="${contextPath}/resources/js/business/tms/emp.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		function resets(formId){
			document.getElementById(formId).reset();
		}
		$(function (){
			$("#example").popover({
				//placement:'bottom',
				//html : true
			});
		});
	</script>
	
</body>
	
</html>