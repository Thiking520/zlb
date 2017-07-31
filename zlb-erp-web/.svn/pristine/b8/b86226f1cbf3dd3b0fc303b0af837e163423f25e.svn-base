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
<body class="skin-blue">
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">仓库布局</a></li>
				<li><a href="#" class="active">库位档案</a></li>
			</ul>
		</div>

		<div >
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>仓库布局>库位档案
						</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/warehouseLocation/init">
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						  <!-- 表单查询区域begin -->
	                    <div class="alert alert-info">
	                        <form id="addOrEditeSearchForm" class="form-inline" role="form" >
	                            <div class="controls controls-row">
	                                <div class="form-group">
	                                    <span>库位编码：</span><input type="text" name="locationCode" id="locationCode" class="form-control input-small" style="width: 150px;"/>
	                                </div>
	                                <div class="form-group">
	                                    <span>库区：</span>
	                                    <div class="input-group">
	                                        <select class="form-control"  name="areaCode" id="areaCode">
	                                            <option value="">全部</option>
	                                        </select>
	                                    </div>
	                                </div>
	                                <div class="form-group">
	                                    <span>循环周期：</span>
	                                    <div class="input-group">
	                                        <select class="form-control"  name="cycle" id="cycle">
	                                            <option value="">全部</option>
	                                            <option value="10">快速周转</option>
	                                            <option value="20">中速周转</option>
	                                            <option value="30">慢速周转</option>
	                                        </select>
	                                    </div>
	                                </div>
	                                <div class="form-group">
	                                    <span>状态：</span>
	                                    <div class="input-group">
	                                        <select class="form-control"  name="state" id="state">
	                                            <option value="">全部</option>
	                                            <option value="0">生效</option>
	                                            <option value="1">失效</option>
	                                        </select>
	                                    </div>
	                                </div>
	                                <div class="btn-group pull-right form-group" style="position: relative; left: -52%;">
	                                    <button class="btn btn-default dropdown-toggle my_btn" data-toggle="dropdown">
	                                        <span class="hidden-sm hidden-xs">更多</span>
	                                        <span class="caret"></span>
	                                    </button>
	                                    <div class="alert alert-info row data_input" style="width: 800px; height: 250px;position: absolute;left:-400%;top: 100%; display: none; z-index: 9999;">
	                                        <div class="form-group box col-md-4">
	                                            <span>库位使用：</span>
	                                            <div class="input-group" >
	                                                <select class="form-control"  name=""locationUse"" id="locationUse" style="width: 130px; margin-left: 10px">
	                                                    <option value="">全部</option>
	                                                    <option value="10">收货默认存放库位</option>
	                                                    <option value="20">拣货默认存放库位</option>
	                                                    <option value="30">件拣货库位</option>
	                                                    <option value="40">箱拣货库位</option>
						                                <option value="50">存储库位</option>
						                                <option value="60">过渡库位</option>
						                                <option value="70">理货工作区</option>
						                                <option value="80">组装工作区</option>
						                                <option value="90">复核工作区</option>
						                                <option value="91">包装工作区</option>
	                                                </select>
	                                            </div>
	                                        </div>
	                                        <div class="form-group box col-md-4">
	                                            <span>库位类型：</span>
	                                            <div class="input-group ">
	                                                <select class="form-control"  name="locationType" id="locationType" style="width: 130px;">
	                                                    <option value="">全部</option>
	                                                    <option value="10">货架</option>
	                                                    <option value="20">托盘</option>
	                                                    <option value="30">地面</option>
	                                                </select>
	                                            </div>
	                                        </div>
	                                        <div class="form-group box col-md-4">
	                                            <span>温度要求：</span>
	                                            <div class="input-group ">
	                                                <select class="form-control"  name="warm" id="warm" style="width: 130px;">
	                                                    <option value="">全部</option>
	                                                    <option value="10">冷藏</option>
	                                                    <option value="20">冷冻</option>
	                                                    <option value="30">常温</option>
	                                                </select>
	                                            </div>
	                                        </div>
	                                        <div class="form-group box col-md-4">
	                                            <span>库位属性：</span>
	                                            <div class="input-group ">
	                                                <select class="form-control"  name="locationAttribute" id="locationAttribute" style="width: 130px; margin-left: 10px" >
	                                                    <option value="">全部</option>
	                                                    <option value="10">良品</option>
	                                                    <option value="20">残品</option>
	                                                    <option value="30">封存</option>
	                                                </select>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	
	                                <button id="btn_search" class="btn btn-success btn-flat" type="button" style="position: relative; left: 8%;">搜索</button>
	                                <button id="btn_clean" class="btn btn-primary btn-flat" type="button" style="position: relative; left: 8%;">清空</button>
	                            </div>
	                        </form>
	                    </div>
						<!-- 表单查询区域end -->

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add">
									<span class="glyphicon glyphicon-plus" style="color: green;"></span>新增
								</button>
							</div>
							</div>
							<div style="overflow-x: scroll;">
								<table id="warhouseLocationManagerTable" class="table table-hover table-striped table-bordered" >

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
	<form id="addAnchorForm" method="post" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="overflow-y: scroll;">
			<div class="modal-dialog" role="document" style="width:750px" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">新增</h4>
					</div>

					<div class="modal-body">
						<table style="width: 100%;">
								<tr>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label><span class="text-required">*</span>库位编码：</label>
								      <input type="text" name="locationCodeAdd" class="form-control" id="locationCodeAdd"  readonly="readonly">
								      </div>
								   </td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label><span class="text-required">*</span>库位名称：</label>
								      <input type="text" name="locationNameAdd" class="form-control" id="locationNameAdd" >
								      </div>
								   </td>
								   <td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>库区编码：</label>
											<input type="hidden" id="areaCodeAdd">
											<div class="input-group" >
												<input type="text" name="areaNameAdd" class="form-control"
													id="areaNameAdd" readonly="readonly" >
												<div class="input-group-addon" id="fromSouSuo01"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="search_name"></span>
												</div>
											</div>
										</div>	
									</td>
								</tr>
						</table >
						<table style="width: 100%;">
							<tr>
							    <td style="width: 33%;">
									<div class="form-group" >
										<label>仓库：</label>
										<input type="text" name="warehouseCodeAdd" class="form-control" id="warehouseCodeAdd" readonly="readonly">
									</div>
								</td>
							   <td style="width:33%;">
							      <div class="form-group">
							      <label>库位使用：</label>
							      <select class="form-control" name="locationUseAdd" id="locationUseAdd" >
                                        <option value="10">收货默认存放库位</option>
                                        <option value="20">拣货默认存放库位</option>
                                        <option value="30">件拣货库位</option>
                                        <option value="40">箱拣货库位</option>
		                                <option value="50">存储库位</option>
		                                <option value="60">过渡库位</option>
		                                <option value="70">理货工作区</option>
		                                <option value="80">组装工作区</option>
		                                <option value="90">复核工作区</option>
		                                <option value="91">包装工作区</option>
								  </select>
							      </div>
							   </td>
								<td style="width: 33%;">
									<div class="form-group" >
										<label>库位类型：</label> 
										<select class="form-control" name="locationTypeAdd" id="locationTypeAdd">
                                                <option value="10">货架</option>
                                                <option value="20">托盘</option>
                                                <option value="30">地面</option>
								  		</select>
									</div>
								</td>

							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
							   <td style="width:33%;">
							      <div class="form-group">
								      <label>循环周期：</label>
								      <select class="form-control" name="cycleAdd" id="cycleAdd">
	                                            <option value="10">快速周转</option>
	                                            <option value="20">中速周转</option>
	                                            <option value="30">慢速周转</option>
									  </select>
							      </div>
							   </td>
								<td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>库位属性：</label>
										<select class="form-control" name="locationAttributeAdd" id="locationAttributeAdd">
                                                    <option value="10">良品</option>
                                                    <option value="20">残品</option>
									    </select>
									</div>
								</td>
								 <td style="width: 33%;">
									<div class="form-group">
										<label><span class="text-required">*</span>温度要求：</label>
										<select class="form-control" name="warmAdd" id="warmAdd">
                                                    <option value="10">冷藏</option>
                                                    <option value="20">冷冻</option>
                                                    <option value="30">常温</option>
									    </select>
									</div>
								</td> 
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
  							   <td style="width:33%;">
							      <div class="form-group">
							      <label>上架顺序：</label>
							      <input type="text" name="shelfOrderAdd" class="form-control" id="shelfOrderAdd" >
							      </div>
							   </td>
								<td style="width: 33%;">
									<div class="form-group">
										<label>拣货顺序：</label> 
										<input type="text" name="pickingOrderAdd" class="form-control" id="pickingOrderAdd">
									</div>
								</td>
								<td style="width: 33%;">
									<div class="form-group" >
										<label><span class="text-required">*</span>状态：</label>
										<select class="form-control" name="disabledAdd" id="disabledAdd">
											<option value="1">失效</option>
											<option value="0">生效</option>
								  		</select>
									</div>
								</td>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
							   <td colspan="2">
							      <div class="form-group">
						      	        <div style="float:right;width: 210px;  padding-top:20px">
                   							<input type="checkbox" id="hybridSku" name="hybridSku" value="1" > 允许混放产品
                   						</div>
               							<div class="checkbox-inline" style="float:right;width: 400px; padding-top:20px">
                   							<input type="checkbox" id="hybridBatch" name="hybridBatch" value="1" > 允许混放批次
							      </div>
							   </td>
					 		</tr>
						</table>
					
					    <div  style="width:100%;min-height:220px;">
							<div style="width: 100%;">
						       	<div id="cleft" >
						       		<div style="color:#9F79EE" ><label>限制</label></div>
						       		<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 100%;">
									        <tr>
											   <td style="width:33%;">
											      <div class="form-group">
											      <label>体积限制（M3）：</label>
											      <input type="text" name="volumeLimitAdd" class="form-control" id="volumeLimitAdd" >
											      </div>
											   </td>
												<td style="width: 33%;">
													<div class="form-group">
														<label>重量限制（千克）:</label> 
														<input type="text" name="weightLimitAdd" class="form-control" id="weightLimitAdd">
													</div>
												</td>
												<td style="width: 33%;">
													<div class="form-group" >
														<label>箱数限制:</label> 
														<input type="text" name="boxLimitAdd" class="form-control" id="boxLimitAdd">
													</div>
												</td>
											</tr>
										  	<tr>
										  	   <td style="width:33%;">
											      <div class="form-group">
											      <label>数量限制：</label>
											      <input type="text" name="numLimitAdd" class="form-control" id="numLimitAdd" >
											      </div>
											   </td>
											   
												<td style="width: 33%;">
													<div class="form-group" >
														<label>托盘限制：</label> 
														<input type="text" name="trayLimitAdd" class="form-control" id="trayLimitAdd" >
													</div>
												</td>
											   
												<td style="width: 33%;">
													<div class="form-group" >
														<label>SKU上限：</label> 
														<input type="text" name="skuLimitAdd" class="form-control" id="skuLimitAdd" >
													</div>
												</td>
										  	</tr>
						       			</table>
						       		</div>
						       	</div>
						    </div>
					    </div>  
					    <div  style="width:100%;min-height:150px;">
							<div style="width: 100%;">
						       	<div id="cleft" >
						       		<div style="color:#9F79EE"><label>尺寸</label></div>
						       		<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 100%;">
									        <tr>
											   <td style="width:33%;">
											      <div class="form-group">
											      <label>长(CM)：</label>
											      <input type="text" name="LengthAdd" class="form-control" id="LengthAdd">
											      </div>
											   </td>
												<td style="width: 33%;">
													<div class="form-group">
														<label>宽(CM)：</label> 
														<input type="text" name="wideAdd" class="form-control" id="wideAdd">
													</div>
												</td>
												<td style="width: 33%;">
													<div class="form-group">
														<label>高(CM)：</label> 
														<input type="text" name="heightAdd" class="form-control" id="heightAdd">
													</div>
												</td>
											</tr>
						       			</table>
						       		</div>
						       	</div>
						    </div>
					    </div>
					   	<div  style="width:100%;min-height:220px;">
							<div style="width: 100%;">
						       	<div id="cleft">
						       		<div style="color:#9F79EE"><label>坐标</label></div>
						       		<div style="width:100%; height:30px; border-top:1px solid #F2F2F2"></div>
						       		<div>
						       			<table style="width: 100%;">
									        <tr>
											   <td style="width:33%;">
											      <div class="form-group">
											      <label>X坐标：</label>
											      <input type="text" name="xPointAdd" class="form-control" id="xPointAdd">
											      </div>
											   </td>
												<td style="width: 33%;">
													<div class="form-group has-feedback">
														<label>Y坐标：</label> 
														<input type="text" name="yPointAdd" class="form-control" id="yPointAdd">
													</div>
												</td>
											</tr>
						       			</table>
						       		</div>
						       	</div>
						    </div>
					    </div>
					<div class="modal-footer">
						<input type="hidden" id="rowId">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
						</button>
						<button id="btn_save_submit" type="button" name="btn_save_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
						</button>
						<button id="btn_edit_submit" type="button" name="btn_edit_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认修改
						</button>
					</div>
				</div>
			</div>
		</div>
		</div>
	</form>
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal02" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel02" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel02">选择库区</h4>
				</div>
				<div class="modal-body">
					<div class="controls controls-row">
						<form action="" class="form-inline" role="form" id="sForm">
							 <div class="form-group">
								 <span>编码：</span> 
								 <input type="text" name="code_2" id="code_2" class="form-control" style="width: 120px;"/>
							 </div>
							 <div class="form-group">
							     <span>名称：</span>
							 	 <input type="text" name="name_2" id="name_2" class="form-control" style="width: 120px;" />
							 </div>
							 <button type="button" class="btn btn-success btn-flat" id="btn_search_s">搜索</button>
							 <button type="button" class="btn btn-primary btn-flat" id="btn_areaCode_clean">清空</button>
						</form>
					</div>
					<table id="warehouseLocation"></table>
					<div class="modal-footer">
						  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						  <button type="button" class="btn btn-primary" id="s_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>

	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/wms/mastdata/warehousesLocation.js"
		type="text/javascript"></script>


</body>
<script type="text/javascript">
	$(function() {
		$("#example").popover({

		});
	});
</script>
</html>