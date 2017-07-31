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

</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>基础数据>车辆档案管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form" id="searchForm" >
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>编码：</span><input name="carId_c" id="carId_c" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
										<span>车牌号：</span><input type="text" name="carNumber_c" id="carNumber_c" class="form-control input-small" style="width: 150px;"/>
									</div>
									<div class="form-group">
									    <span>默认司机：</span>	
										<div class="input-group">
										<input type="hidden" name="driver_c" id="driver_c">
									      <input class="form-control input-small" type="text" name="driverName_c" id="driverName_c" style="width: 150px;" readonly="readonly">
									      <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="btn_show_deiver_c"></span></div>
									      <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-remove" onclick="$('#driver_c').val('');$('#driverName_c').val('');"></span></div>
									    </div>
							        </div>
									<!--时间控件begin  -->
									<div class="form-group">
							        	<span>车辆类型：</span>	
							        	<select class="form-control"  name="carType_c" id="carType_c">
										  <option value="">全部</option>
										</select>
							        </div>
								<div class="form-group">
						        	<span>状态：</span>	
						        	<select class="form-control" name="enabled_c" id="enabled_c">
									  <option value="">全部</option>
									</select>
						        </div>
						        <%-- <div class="form-group">
					         		<button type="button" id="example" class="btn btn-primary btn-xs popover-toggle"   
					         		data-html="true" data-toggle="popover"  data-placement="bottom" data-html="true" data-content="
				         			<table style='height:250px;'>
										<tr>
											<td><span>描述：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>车牌所在地：</span></td>
											<td><input type='text' class='form-control input-small' /></td>
										</tr>
										<tr>
											<td><span>自营\外包：</span></td>
											<td><select class='form-control input-small'>
												  <option></option>
												  <option value='10'>自营</option>
												  <option value='20'>外包</option>
												</select>
											</td>
										</tr>
										<tr>
											<td><span>干线\区域：</span></td>
											<td><select class='form-control input-small'>
												  <option></option>
												  <option value='10'>干线车</option>
												  <option value='20'>区域车</option>
												</select>
											</td>
										</tr>
										<tr>
											<td colspan='2'>
										      <div class='form-group'>
										      	<input type='checkbox'  value='1'><span>可配送液体</span>
										      	<input type='checkbox'  value='1'><span>可配送冻品</span>
										      	<input type='checkbox'  value='1'><span>可配送冷藏</span>
										      </div>
										   </td>
										</tr>
										<tr style='text-align: center;background: rgb(7, 65, 123);color: white;' >
											<td colspan='2'><span class='glyphicon glyphicon-search' onclick='hid()'></span></td>
										</tr> 
								  </table>"
					         		>更多条件^</button>
					        	</div> --%>
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
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_true"><span class="glyphicon glyphicon-ok-circle" style="color: maroon;"></span>生效</button>
							    <button type="button" class="btn btn-default  btn-sm" id="btn_is_false"><span class="glyphicon glyphicon-remove-circle" style="color:black;"></span>失效</button>
							 </div>
							</div>
							 <div id="divCss">
									<table id="carsManagerTable" class="table table-hover table-striped table-bordered">
									
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
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow: scroll;">
		    <div class="modal-dialog" role="document">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		          <h4 class="modal-title" id="myModalLabel">新增</h4>
		        </div>
		        
		        
		        <div class="modal-body" >
				  <table style="width:100%;">
					<!--  <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>Key值：</label>
					      <input type="text" name="carId" class="form-control" id="carId" >
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
					      <input type="hidden" id="operatorId" value="0" >
					      <input type="text" name="operatorName" id="operatorName" style="width: 239px" class="form-control" value="0">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label><span class="text-required">*</span>车牌号：</label>
					      <input type="text" name="carNumber" class="form-control" style="width: 239px" id="carNumber" >
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label><span class="text-required">*</span>车牌所在地：</label>
					      <input type="text" name="city" id="city" style="width: 239px" class="form-control">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label><span class="text-required">*</span>默认司机：</label>
					       <div class="input-group">
					       		<input type="hidden" id="driver" name="driver">
								<input type="text" name="driverName" class="form-control" id="driverName" readonly="readonly" style="width: 239px;">
								<div class="input-group-addon" id="fromSousuo" style="background-color: white;"><span class="glyphicon glyphicon-search" id="search_driver"></span></div>
						   </div>
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td>
					      <div class="form-group">
					      		<label><span class="text-required">*</span>车辆类型：</label>
						        <select class="form-control" name="carType" id="carType" style="width: 239px;">
										  <!-- <option value='10'>10：面包车</option>
										  <option value='20'>20：电动车</option>
										  <option value='30'>30：自行车</option>
										  <option value='40'>40：卡车</option> -->
							    </select>
					      </div>
					   </td>
					   <td>
					      <div class="form-group" style="margin-left: 50px;">
					      <label><span class="text-required">*</span>干线\区域：</label>
					      <select class="form-control" name="region"  id="region" style="width: 239px">
	                         <!-- <option value='10'>10：干线车</option>
	                         <option value='20'>20：区域车</option> -->
	                      </select>
	                      </div>
					   </td>
					 </tr>
					 <tr>
					   <td>
					      <div class="form-group">
					      <label><span class="text-required">*</span>自营\外包：</label>
					      <select class="form-control" name="selfSupport"  id="selfSupport" style="width: 239px" >
	                         <!-- <option value='10'>10：自营</option>
	                         <option value='20'>20：外包</option> -->
	                      </select>
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label>长（m）：</label>
					      <input type="text" name="length" id="length" class="form-control" style="width: 239px">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>宽（m）：</label>
					      <input type="text" name="width" id="width" class="form-control" style="width: 239px">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px;">
					      <label>高（m）：</label>
					      <input type="text" name="high" class="form-control" id="high" style="width: 239px">
					      </div>
					   </td>
					 </tr>
					 <tr>
					   <td style="width:50%;">
					      <div class="form-group">
					      <label>体积（m³）：</label>
					      <input type="text" name="volume" id="volume" class="form-control" style="width: 239px;">
					      </div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px">
					      <label>载重（吨）：</label>
					      <input type="text" name="weight" class="form-control" id="weight" style="width: 239px;">
					      </div>
					   </td>
					 </tr>
					 <tr>
					 <td style="width:50%;">
					      <div class="form-group">
					      		<label>状态：</label>	
						        <select class="form-control" name="enabled" id="enabled" style="width: 239px;">
								   
							    </select>
							</div>
					   </td>
					   <td style="width:50%;">
					      <div class="form-group" style="margin-left: 50px">
					      	<label>可配送：</label><br/>	
					      	<input type="checkbox" name="isTransportLiquid" id="isTransportLiquid" value="1"><span>液体</span>
					      	<input type="checkbox" name="isTransportFreezing" id="isTransportFreezing" value="1" style="margin-left: 40px;"><span>冻品</span>
					      	<input type="checkbox" name="isTransportStorage" id="isTransportStorage" value="1" style="margin-left: 40px"><span>冷藏品</span>
					      </div>
					   </td>
					   </tr>
				   </table>
				   <div class="form-group">
			            <label>描述：</label>
			            <input type="text" name="describes" class="form-control" id="describes" maxlength="50" >
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
	<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							选择司机列表
						</h4>
					</div>
					<div class="modal-body">
						<form id="fromModal02" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
							<div class="controls controls-row" style="margin-bottom: 20px">
								<div class="form-group">
									<span>姓名:</span><input name="name" id="name" class="form-control" style="width: 100px;">
						    	</div>
						    	<div class="form-group">
						    		<span>电话:</span><input name="tel" id="tel" class="form-control" style="width: 130px;">
						    	</div>
						    	<div class="form-group">
									<button type="button" class="btn btn-success" id="btn_search_driver" >搜索</button>
									<button type="button" class="btn btn-primary" onclick="resets('fromModal02')" style="margin-left: 5px" id="btn_clean" >清空</button>
						    	</div>
						    </div>
						<table id="driverList"></table>
						</form>
					</div>
					<div style="margin-left: 450px; margin-bottom: 20px">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="driver_save_c" >确认</button>
						<button type="button" class="btn btn-primary" id="driver_save" >确认</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/cars/cars.js" type="text/javascript"></script>
	    
    
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