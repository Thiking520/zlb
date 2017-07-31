<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	#divCss .fixed-table-toolbar{
		position: fixed;
		left: 92%;
		top:28%;
	}
	.mod-dropdownlist .dropdown-options li.dropdown-options-focus a{
		background-color:#fff;
	}
	
</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<!-- <div>
			<ul class="breadcrumb">
				<li><a href="#">公共资源</a></li>
				<li><a href="#" class="active">站点档案</a></li>
			</ul>
		</div>
		 -->
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>站点档案管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form" id="searchForm" >
								<div class="controls controls-row">
								   <div class="form-group">
										<span>编码：</span><input type="text" name="code_01" id="code_01" class="form-control input-small" style="width: 150px;"/>
									</div> 
									<div class="form-group">
										<span>名称：</span><input type="text" name="name_01" id="name_01" class="form-control input-small" style="width: 150px;"/>
									</div>
									<!-- <div class="form-group">
										<span>上级站点：</span><input type="text" name="superior" id="superior" class="form-control input-small" style="width: 150px;"/>
									</div> -->
									<!--时间控件begin  -->
									<div class="form-group">
							        	<span>类型：</span>	
							        	<select class="form-control"  name="deliveryType_01" id="deliveryType_01">
										  <option value="">全部</option>
										</select>
							        </div>
								
								<div class="form-group">
						        	<span>状态：</span>	
						        	<select class="form-control" name="enabled_01" id="enabled_01">
									  <option value="">全部</option>
									  <option value="1">生效</option>
									  <option value="0">失效</option>
									</select>
						        </div>
						        <div class="form-group">
						        	<span>上级站点：</span>	
						        	<select class="form-control" name="parent" id="parent">
									</select>
						        </div>
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
						        	<button id="btn_clean" onclick="cleanSearch();" class="btn btn-primary btn-flat" type="button">清空</button>
						        	<!-- <button type="button" class="btn btn-success btn-flat" id="btn_show_add">新增车辆</button> -->
						        </div>
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
								<!-- <button type="button" class="btn btn-default  btn-sm" id="btn_delivery_edit"><span class="glyphicon glyphicon-pencil" style="color: green;"></span>编辑</button> -->
								<!-- <button type="button" class="btn btn-default  btn-sm" id="btn_view_detail"><span class="glyphicon glyphicon-zoom-in" style="color: green;"></span>查看</button> -->
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_true"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>生效</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_false"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>失效</button>
							 </div>
							</div>
							   <div id="divCss">
								<table id="drManagerTable" class="table table-hover table-striped table-bordered" style="min-width: 1650px;">
									
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
	<form id="addAnchorForm"  method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow: scroll;">
		     <div class="modal-dialog" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        <div class="modal-body" >
		        	<ul id="myTab" class="nav nav-tabs">
						<li class="active">
							<a href="#jbxx" data-toggle="tab">
								基本信息
							</a>
						</li>
						<li><a href="#fgfw" data-toggle="tab">覆盖范围</a></li>
						<li><a href="#pcfw" data-toggle="tab">排除范围</a></li>
					</ul>
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade in active" id="jbxx">
							<table style="width:100%;">
							 <tr>
							   <!-- <td style="width:50%;">
							      <div class="form-group">
							      <label>编号：</label>
							      <input type="text" name="code" class="form-control" id="code" >
							      </div>
							   </td> -->
							   <td style="width:50%;">
							   	 <div class="form-group">
							      <label><span class="text-required">*</span>名称：</label>
							      <input type="hidden" id="formId">
							      <input type="text" name="name" id="name" class="form-control" value="0" style="width: 239px;">
							      </div>
							   </td>
							 </tr>
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group">
							      		<label><span class="text-required">*</span>类型：</label>
								        <select style="width: 239px;" onchange="javascript:disClick();" class="form-control" name="deliveryType" id="deliveryType" value="">
										    
									    </select>
									</div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group" style="margin-left: 50px">
							      <label>上级：</label>
							      <input type="hidden" id="superiorId">
							      <input type="hidden" id="superiorType">
							      <div class="input-group">
							      	<input type="text" name="superior" class="form-control" id="superior" readonly="readonly" style="width: 239px;">
							      	<div class="input-group-addon" id="fromSouSuo01" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_superior"></span></div>
							      </div>
							   </td>
							 </tr>
							 <tr>
							   <td style="width:50%;">
							      <div class="form-group" style="width:239px;">
							      <label><span style="color: red;">&nbsp</span>负责人：</label>
							      <input type="hidden" id="deliveryHeadId" style="width: 239px;">
							      <div class="input-group">
							      <input type="text" name="deliveryHead" id="deliveryHead" class="form-control" readonly="readonly" style="width: 239px;">
							      <div class="input-group-addon" id="fromSouSuo02" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_deliveryHead"></span></div>
							    </div>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group" style="margin-left: 50px">
							      <label><span class="text-required">*</span>联系电话：</label>
							       <input type="text" name="deliveryHeadPhone" id="deliveryHeadPhone" style="width: 239px;" class="form-control">
							      </div>
							   </td>
							 </tr>
							 <tr>
							   <td>
							      <div class="form-group">
							      <label><span class="text-required">*</span>运营商：</label>
							      <!-- <input type="hidden" name="operatorId" id="operatorId" value="1">
							      <input type="text" name="operatorName" id="operatorName" class="form-control"> -->
							      <select class="form-control" name="operatorId" id="operatorId" style="width: 239px;">
								   </select>
							      </div>
							   </td>
							   <td style="width:50%;">
							      <div class="form-group" style="margin-left: 50px;">
							      <label><span class="text-required">*</span>状态：</label>
							       <select class="form-control" name="enabled" id="enabled" style="width: 239px;">
											<option value="1">生效</option>
											<option value="0">失效</option>
								   </select>
							      </div>
							   </td>
							 <tr>
							 	<td colspan="2">
							      <div class="form-group">
							      <label><span class="text-required">*</span>行政地址：</label>
							       <input type="hidden" id="province_val">
							      <input type="hidden" id="city_val">
							      <input type="hidden" id="area_val">
							      <input type="hidden" id="street_val"> 
							      <div id="DropDownList">
							      		<span id="province"></span><span id="city"></span><span id="area"></span><span id="street"></span>
							      </div>
							      </div>
							    </td>
							 </tr>
							 <tr>
							 	<td colspan="2">
							      <div class="form-group">
							      <label><span class="text-required">*</span>站点地址：</label>
							      <input type="text" name="detailedAddress" id="detailedAddress" class="form-control">
							      </div>
							    </td>
							 </tr>
						   </table>
						   <!-- <div style="height: 80px;"></div> -->
					       <div>
						       <div style="margin-left: 65%" >
						       	  <button type="button" style="margin-left: 55px;" data-dismiss="modal" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
						          <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>继续</button>
						          <button id="btn_edit_submit" type="button" name="btn_edit_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
						       </div>
					       </div>
						</div>
						<div class="tab-pane fade" id="fgfw" style="height: 664px;">
								<div class="well well-sm" style="margin-bottom:0px;"><label>配送范围</label></div>
								<div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_add_ds"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
								    <button type="button" class="btn btn-default  btn-sm" id="btn_show_edit"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>编辑</button>
								    <button type="button" class="btn btn-default  btn-sm" id="btn_show_del"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>删除</button>
								   <!--  <button type="button" class="btn btn-default  btn-sm" ><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>导入</button>
								    <button type="button" class="btn btn-default  btn-sm" ><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>导出</button> -->
								 </div>
								<div>
									<table id="dsManagerTable1" class="table table-bordered table-hover table-condensed" style="text-align: center;min-width:800px;">
										
									</table>
								</div>
						</div>
						<div class="tab-pane fade" id="pcfw" style="height: 664px;">
							 	<div class="well well-sm" style="margin-bottom:0px;"><label>排除地址</label></div>
							 	<button type="button" class="btn btn-default  btn-sm" id="btn_show_add_ds2"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_edit2"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>编辑</button>
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_del2"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>删除</button>
							 	<div>
								 	<table id="dsManagerTable2" class="table table-bordered table-hover table-condensed" style="text-align: center;min-width:1000px;">
										
									</table>
								</div>
						</div>
					</div>
		        </div>
		      </div>
		    </div> 
		  </div>
	</form>
	
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel01" aria-hidden="true">
			<div class="modal-dialog"  style="width: 650px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel01">
							添加站点范围
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form" id="dsForm">
							<table style="width: 100%;height: 200px;">
								<tr>
									<td style="width: 10%;">
										<span><label style="color: red">*</label>类型：</span>	
									</td>
									<td >
							        	<select class="form-control" onchange="javascript:changeAddress();" name="level_ds" id="level_ds">
										  
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<span><label style="color: red">*</label>行政区域：</span>
									</td>
								</tr>
								<tr>
									<td colspan="2" style="padding-left: 60px">
										<div class="input-group">
										  <input type="hidden" id="id_ds">
										  <input type="hidden" id="type_ds">
										  <input type="hidden" id="province_val_ds">
									      <input type="hidden" id="city_val_ds">
									      <input type="hidden" id="area_val_ds">
									      <input type="hidden" id="street_val_ds"> 
									      <div id="DropDownList">
							      			<span id="province_ds"></span><span id="city_ds"></span><span id="area_ds"></span><span id="street_ds"></span>
							      			<div id="areaDV" style="width: 120px;height: 30px;position: absolute;left: 45.3%;top:0%;display: none;filter:alpha(Opacity=20);-moz-opacity:0.2;opacity: 0.2;background-color: #666"></div>
							      			<div id="streetDV" style="width: 168px;height: 30px;position: absolute;left: 68%;top:0%;display: none;filter:alpha(Opacity=20);-moz-opacity:0.2;opacity: 0.2;background-color: #666"></div>
							      		  </div>
									</td>
								</tr>
								<tr>
									<td >
										<span>名称：</span>	
									</td>
									<td>
										<input type="text" name="name_ds" id="name_ds" class="form-control" style="width: 80%;"/>
										<!-- <input type="text" name="detailedAddress" id="detailedAddress" class="form-control"> -->
									</td>
								</tr>
								<tr>
									<td colspan="2" style="text-align: right;">
										<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" id="car_save_ds" >保存</button>
										<button type="button" class="btn btn-primary" id="car_edit_ds" >保存</button>
									</td>
								</tr>
							</table>
					    </form>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							选择上级 
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form" id="sForm">
							<table style="width: 100%;height: 100px;">
								<tr>
									<td style="width: 10%">
										<span>编码：</span>
									</td>
									<td>
										<input type="text" name="code_2" id="code_2" class="form-control input-small" style="width: 100%;"/>
									</td>
									<td style="width: 10%">
										<span>名称：</span>	
									</td>
									<td >
										<input type="text" name="name_2" id="name_2" class="form-control input-small" style="width: 100%;"/>
									</td>
									<td colspan="4" style="text-align: right;">
										<button type="button" class="btn btn-success" id="btn_search_s" >搜索</button>
									</td>
									<td colspan="4" style="text-align: right;">
										<button style="margin-left: 5px;" type="button" class="btn btn-primary" id="btn_clean" onclick="javascript:resets('sForm');">清空</button>
									</td>
								</tr>
							</table>
						<table id="superiorList"></table>
						<div style="margin-left: 446px;">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" id="s_save" >确认</button>
						</div>
						</form>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel03" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel03">
							选择负责人
						</h4>
					</div>
					<div class="modal-body">
						<form action="" class="form-inline" role="form" id="empForm">
							<div class="controls controls-row">
								<div class="form-group">
									<span>姓名:</span><input name="name_emp" id="name_emp" class="form-control" style="width: 100px;">
						    	</div>
						    	<div class="form-group">
						    		<span>电话:</span><input name="tel_emp" id="tel_emp" class="form-control" style="width: 130px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn btn-success" id="btn_search_emp" >搜索</button>
									<button type="button" class="btn btn-primary" style="margin-left: 5px;" onclick="javascript:resets('empForm');">清空</button>
						    	</div>
						    </div>
						<table id="empList"></table>
						</form>
						<div class="form-group" style="margin-left: 440px;">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary" id="emp_save" >确认</button>
				    	</div>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	</div>
	</div>
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/archives/deliveryRecord.js" type="text/javascript"></script>
    
    
</body>
	<script type="text/javascript">
		function resets(formId){
			document.getElementById(formId).reset();
		}
	
		$(function (){
			$("#example").popover({
				
			});
		});
	</script>
</html>