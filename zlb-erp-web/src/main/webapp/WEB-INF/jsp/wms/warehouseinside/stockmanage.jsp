<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	.modal-headers {
		padding: 15px;
		min-height: 16.42857143px;
	}
	
	.col-md-table-12 {
		width: 48%;
		position: relative;
		min-height: 1px;
		padding-left: 40px;
		padding-right: 15px;
		float: left;
	}
	
	.col-md-table-6{
		margin-top: 10px;
   	    margin-bottom: 10px;
	}
	.col-md-table-5{
		margin-top: 16px;
   	    margin-bottom: 10px;
	}
</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">库存管理</a></li>
				<li><a href="#" class="active">库存余量</a></li>
			</ul>
		</div>
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>库存管理>库存余量</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/stockmanage/init">
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form"  id="searchform">
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>货品编码：</span><input name="skuCode" id="skuCode" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
										<span>库存批次号：</span><input type="text" name="stockBatchNo" id="stockBatchNo" class="form-control input-small" style="width: 150px;"/>
									</div>
									
									<div class="form-group">
							        	<span>库存状态：</span>
							        	<select class="form-control"  name="state" id="state">
							        	  <option value="">全部</option>
										  <option value="10">良品</option>
										  <option value="20">残品</option>
										</select>
							        </div>
							     
						        <div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">库存余量（按批次）</button>
						        	<button id="btn_search_location" class="btn btn-success btn-flat" type="button">库存余量（按批次+库位）</button>
						        	<button type="button" class="btn btn-primary btn-flat" id="btn_show_reset">清空</button>
						        </div>
						      </div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->
						<div class="table_nav">
						<div id="toolbar" class="btn-group">
							<button type="button" class="btn btn-default  btn-sm" id="btn_show_physical"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成盘点操作</button>
							<button type="button" class="btn btn-default  btn-sm" id="btn_show_mate"><span class="glyphicon glyphicon-plus" style="color: green;"></span>原料转成品操作</button>
							<button type="button" class="btn btn-default  btn-sm" id="btn_show_adjustment"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成调整操作</button>
						</div>
						</div>
												
						<!-- 分页列表区域begin -->
						<div id="batch_div">
							<div role="grid" class="box-body table-responsive">
								 <div >
										<table id="stockBatcManagerTable" class="table table-hover table-striped table-bordered">
										
										</table>
								</div>
							</div>
						</div>
						
						<div id="location_div" style="display:none">
							<div role="grid" class="box-body table-responsive">
								 <div >
										<table id="stocklocationManagerTable" class="table table-hover table-striped table-bordered">
										
										</table>
								</div>
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
	<form id="addAnchorForm" method="post" class="form-inline" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document" style="width:880px">
				<div class="modal-content">
					<div class="modal-headers">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
							<div class="row">
							    <div class="box col-md-table-12 col-md-table-5">
							        <div class="box-inner">
							            <div class="box-header well" data-original-title="">
							                <h2>从--原料</h2>
							            </div>
							            <div class="box-content" style="display: block;">
							            		<input type="hidden" id="stockBatchNos">
							            		<div class="form-group">
							                        <label>货品编码：</label>
							                        <input type="text" name="mateCode" id="mateCode" class="form-control" readonly="readonly" >
							                    </div>
							                    <div class="form-group">
							                        <label  >中文描述：</label>
							                        <input type="text" name="mateDescrip" id="mateDescrip" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>生产日期：</label>
							                        <input type="text" name="matePro" id="matePro" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>入库日期：</label>
							                        <input type="text" name="mateStorage" id="mateStorage" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>失效日期：</label>
							                        <input type="text" name="mateFail" id="mateFail" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>库存状态：</label>
							                        <select class="form-control" name="mateState" id="mateState" disabled="disabled">
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    <div class="form-group">                    							                    							                    <div class="form-group">
							                        <label>库位编码：</label>
							                        <input type="text" name="locationCode" id="locationCode" class="form-control" readonly="readonly">
							                    </div>
							                    <table style="width: 100%;" >
									                    <tr>
															<td colspan="3">
																<div class="form-inline">
												 					<label style="margin-top: 20px;">总净重：</label>
									                       			<label name="qty" id="qty"></label>
																</div>
															</td>
															<td colspan="3">
																<div class="form-group">
												 					<label style="margin-top: 20px;">已分配净重：</label>
									                       			<label name="allocationQty" id="allocationQty"></label>
																</div>
															</td>
															<td colspan="3">
																<div class="form-group">
												 					<label style="margin-top: 20px;">可用数量：</label>
									                       			<label name="preAllocationQty" id="preAllocationQty"></label>
																</div>
															</td>
														</tr>
												</table>
												<div class="form-group">
							 					<label style="margin-top: 20px;"><span class="text-required">*</span>计划转为成品净重:</label>
				                       			<input type="text" name="mateQty" id="mateQty" class="form-control" >
												</div>
												<div class="form-group">
							 					<label style="margin-top: 20px;">单位：</label>
							 					<input type="text" name="stockUnit" id="stockUnit" class="form-control" readonly="readonly">
												</div>
							
							            </div>
							        </div>
							    </div>
							    </div>
							    
							      <div class="box col-md-table-12 col-md-6 col-md-table-6">
							        <div class="box-inner" style="width:415px;">
							            <div class="box-header well" data-original-title="">
							                <h2>至--成品</h2>
							            </div>
							            <div class="box-content" >
												<div class="form-group">
													<label><span class="text-required">*</span>货品编码：</label>
													<div class="input-group">
														<input type="text" name="proCode" id="proCode" class="form-control"  readonly="readonly"> 
														<div class="input-group-addon" id="fromSouSuo02" style="background-color: white;">
															<span class="glyphicon glyphicon-search" id="skuCodeQuery"></span>
														</div>
													</div>
												</div>
							                    <div class="form-group">
							                        <label><span class="text-required">*</span>中文描述：</label>
							                        <input type="text" name="proName" id="proName" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>&nbsp&nbsp生产批次：</label>
							                        <input type="text" name="proBatchNo" id="proBatchNo" class="form-control" >
							                    </div>
							                    <div class="form-group">
							                      	<label>&nbsp&nbsp生产日期：</label>
								                    <div class="input-group input-append date form_datetime" >
								                        <input type="text" class="form-control" value="" id="proPro" name="proPro" readonly="readonly"> 
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>

							                    <div class="form-group">
							                        <label><span class="text-required">*</span>入库日期：</label>
							                        <div class="input-group input-append date form_datetime" >
								                        <input type="text" class="form-control" value="" id="proStorage" name="proStorage" readonly="readonly"> 
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>
							                     <label>&nbsp&nbsp失效日期：</label>
							                    <div class="form-group">
							                        <div class="input-group input-append date form_datetime" >
							                        <input type="text" class="form-control" value="" id="proFail" name="proFail" readonly="readonly"> 
							                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
							                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                    </div>
							                    </div>
							                    <div class="form-group">
							                        <label><span class="text-required">*</span>库存状态：</label>
						                         	<select class="form-control" name="proState" id="proState">
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    <div class="form-group">					                    							                    							                    <div class="form-group">
							                        <label><span class="text-required">*</span>推荐库位：</label>
							                        <div class="input-group">
								                        <input type="text" name="locationRecommend" id="locationRecommend" class="form-control" readonly="readonly">
								                        <div class="input-group-addon" id="searchRecommend" style="background-color: white;">
																<span class="glyphicon glyphicon-search" id="recommendQuery"></span>
														</div>
													</div>
							                    </div>
												<div class="form-group">
							 						<label style="margin-top: 30px;"><span class="text-required">*</span>预计成品数量：</label>
				                       			 	<input type="text" name="proQty" id="proQty" class="form-control" >
												</div>
												<div class="form-group">
							 					<label style="margin-top: 20px; width: 100px"><span class="text-required">*</span>单位：</label>
				                       			<select class="form-control" name="proUnit" id="proUnit"> 
				                       				<option value="个">个</option>
				                       				<option value="份">份</option>
				                       				<option value="件">件</option>
				                       				<option value="箱">箱</option>
				                       				<option value="瓶">瓶</option>
				                       				<option value="千克">千克</option>
				                       				<option value="克">克</option>
				                       			</select>
												</div>
							
							            </div>
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
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>生成原料转成品单
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal08" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel08" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width:750px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel08">选择商品信息</h4>
				</div>
				<div class="modal-body">
					<form action="" class="rows" role="form" id="goodsForm">
						<table style="width: 100%; height: 100px;">
							<tr>
								<td><span>编码：</span></td>
								<td><input type="text" name="skuCodeSer" id="skuCodeSer"
									class="form-control"/></td>
								<td><span>名称：</span></td>
								<td><input type="text" name="skuNameSer" id="skuNameSer"
									class="form-control"/></td>
								<td colspan="4" style="text-align: right;">
									<button type="button" class="btn btn-success btn-flat" id="btn_search_goods">搜索</button>
									<button type="button" class="btn btn-primary btn-flat" id="btn_goods_reset">清空</button>
								</td>
							</tr>
						</table>
					</form>
					<table id="skuGoodsList"></table>
					<div class="modal-footer">
						 <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						 <button type="button" class="btn btn-primary" id="goods_save">保存</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal09" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel09" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width:750px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel09">选择库位信息</h4>
				</div>
				<div class="modal-body">
					<form action="" class=form-inline role="form" id="recommendForm">
						<div class="controls controls-row">
							<div class="form-group">
								 <span>库区编码：</span>
								  <input type="text" name="areaCode" id="areaCode" class="form-control"/> 
						    </div>
						    <div class="form-group">
				 				 <span>库区名称：</span> 
								 <input type="text" name="areaName" id="areaName"
									class="form-control"/>
							</div>
							<div class="form-group">
								<span>库位编码：</span> 
								 <input type="text" name="LocationCode" id="LocationCode"
									class="form-control"/> 
							</div>
							<div class="form-group">
								<span>库位名称：</span>
								<input type="text" name="LocationName" id="LocationName" class="form-control"/>
						 	</div>
						 	<div class="form-group">
						 		<button type="button" class="btn btn-success btn-flat" id="btn_search_recommend">搜索</button>
						 		<button type="button" class="btn btn-primary btn-flat" id="btn_recommend_reset">清空</button>
						 	</div>
						  </div>
					</form>
					<table id="locationList"></table>
					<div class="modal-footer">
						 <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						 <button type="button" class="btn btn-primary" id="recommend_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	
	<!-- 隐藏，生成盘点单 -->
	<div class="modal fade" id="physicalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel05" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                    &times;
	                </button>
	                <h4 class="modal-title" id="myModalLabel06">
	                    选择生成盘点单
	                </h4>
	            </div>
	            <div class="modal-body" id="physical_div">
	                    <table style="width: 100%;height: 100px;">
	                        <tr>
	                           <td>
	                                    <label class="radio-inline"><br>
	                                        <input type="radio"  value="20" name="pick" checked="true" >
	                                       把选中的库存，生成盘点单
	                                    </label>
	                               </td>
	                            </tr>
	                        <tr>
	                        <td>
	                                <label class="radio-inline"><br>
	                                    <input type="radio"  value="10" name="pick" >
	                                       全盘
	                                </label>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td colspan="4" style="text-align: center;">
	                                <button type="button" class="btn btn-primary" id="physicalCreate" >确定</button>
	                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                            </td>
	                        </tr>
	                    </table>
	            </div>
	        </div><!-- /.modal-content -->
	    </div><!-- /.modal -->
	</div>
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/warehouseinside/stockmanage.js" type="text/javascript">
	</script>
	    
    
</body>
</html>