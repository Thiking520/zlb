<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
.isDisplay{
	display:none;
}
</style>
</head>
<body>
	
	<div id="content">
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>仓库管理>随机入库</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/storageinRandom/init">
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" id="mainForm" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="controls controls-row">
									<div class="form-group ">
										<span>入库订单号：</span><input name="storageInNo" id="storageInNo" type="text" class="form-control input-small" />
									</div>
									<div class="form-group">
							        	<span>状态：</span>
							        	<select id="status" class="form-control" style="width: 120px" >
							        		<option value="">---全部---</option>
										  <option value="NEW">新建</option>
										  <option value="FINISH">完成</option>
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
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button id="btn_new" class="btn btn-default" type="button">
										<span class="glyphicon glyphicon-plus" style="color: green;"></span>新建随机入库</button>
								</div>
							</div>
							<table id="storageRandomTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="myOperateModal" tabindex="-2"
			role="dialog" style="text-align: -webkit-center;"
			aria-labelledby="myOperateModal" aria-hidden="true">
			<div class="modal-dialog" style="width: 100%;margin: 50px auto;">
				<div class="modal-content" style="width: 60%; margin: 50px auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<span>×</span>
						</button>
					</div>
					<div class="modal-body">
						<table class="table" style="margin-top: 10px; border: solid 1px #b1a2a2;">
							<tr>
								<td>是否指定库存批次号<span style="color: red;">*</span></td>
								<td class="center">
									<select class="form-control" name="isMatch" id="isMatch">
											<option value="0">否</option>
											<option value="1" selected="selected">是</option>
									</select>
								</td>
								<td class ="batchNo">指定库存批次号：<span style="color: red;">*</span></td>
								<td class="center batchNo">
									<input type="text" name="skuStockBatchNo" id="skuStockBatchNo" maxLength="60" class="form-control">
								</td>
							</tr>
							<tr>
								<td>货品名称：<span style="color: red;">*</span></td>
								<td class="center">
									<div class="input-group">
										<input type="hidden" name="skuCode" id="skuCode" class="form-control" style="width: 200px; height: 30px;">
										<input type="text" name="skuName" class="form-control" id="skuName" readonly="readonly">
										<div class="input-group-addon" id="skuCodeQuery" style="background-color: white;">
											<span class="glyphicon glyphicon-search"></span>
										</div>
									</div>
								</td>
								<td>入库库位：<span style="color: red;">*</span></td>
								<td class="input-group">
									<input type="hidden" name="storageInLocation" id="storageInLocation" class="form-control" style="width: 200px; height: 30px;">
									<input type="text" name="storageInLocationName" class="form-control" id="storageInLocationName" readonly="readonly">
									<div class="input-group-addon" id="warehouseQuery" style="background-color: white;">
										 <span class="glyphicon glyphicon-search"></span>
									</div>
								</td>
							</tr>
							<tr>
								<td>货品状态：<span style="color: red;">*</span></td>
								<td class="center">
									<select class="form-control" name="skuState" id="skuState">
											<option value="10">良品</option>
											<option value="20">残品</option>
									</select>
								</td>
								<td>收货数量<span style="color: red;">*</span></td>
								<td class="input-group"><input type="text" name="skuQty" id="skuQty" maxLength="9" class="form-control">
									<span class="input-group-addon" id="unit" ></span>
								</td>
							</tr>
							<tr class="isDisplay record">
								<td>生产日期：</td>
								<td class="center">
									<div class="input-group input-append date form_datetime_month">
										<input type="text" class="form-control" value=""
											id="skuProDate" name="skuProDate" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
								</td>
								<td>失效日期：</td>
								<td class="center">
									<div class="input-group input-append date form_datetime_month">
										<input type="text" class="form-control" value=""
											id="skuFailDate" name="skuFailDate" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
								</td>
							</tr>
							<tr class="isDisplay record">
								<td>入库日期：<span style="color: red;">*</span></td>
								<td class="center">
									<div class="input-group input-append date form_datetime_month">
										<input type="text" class="form-control" value=""
											id="skuStorageDate" name="skuStorageDate" readonly> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-th"></span></span> <span
											class="input-group-addon"><span
											class="glyphicon glyphicon-remove"></span></span>
									</div>
								</td>
								<td>生产批次号：</td>
								<td class="center"><input type="text" name="skuProBatchNo" id="skuProBatchNo" maxLength="16" class="form-control"></td>
							</tr>
						</table>
						<div class="form-group" style="text-align: center;">
							<button class="btn btn-primary" type="button" id="addToTable" style="margin-left: 20px;">添加</button>
						</div>
						<div class="form-group">
						<table class="table table-hover table-striped table-bordered" id="submitTable" data-unique-id="rowNo" style="width: 1121px;">
							<!-- <thead>
								<tr>
									<th  data-field="rowNo" data-visible=false tabindex="0"></th>
									<th  data-field="skuCode" data-uniqueid="1">货品编码</th>
									<th  data-field="skuName" tabindex="2">货品名称</th>	
									<th  data-field="storageInLocation" tabindex="3">库位编码</th>
									<th  data-field="storageInLocationName" tabindex="4">库位名称</th>	
									<th  data-field="skuState" data-visible=false tabindex="5"></th>
									<th  data-field="skuStateName" tabindex="6">货品状态</th>	
									<th  data-field="skuQty" tabindex="7">收货数量</th>
									<th  data-field="skuProDate" tabindex="8">生产日期</th>
									<th  data-field="skuFailDate" tabindex="9">失效日期</th>
									<th  data-field="skuStorageDate" tabindex="10">入库日期</th>
									<th  data-field="skuProBatchNo" tabindex="11">生产批次号</th>	
									<th  data-field="skuStockBatchNo" tabindex="12">指定库存批次号</th>
									<th  data-field="operate" tabindex="13">操作</th>				
								</tr>
							</thead> -->
						</table>
						</div>
						<div class="modal-footer" style="text-align: center;" id="btn_div">
				          <button id="btn_save" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
				           </button>
				          <button type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
				          		<span class="glyphicon" aria-hidden="true"></span>取消
				          </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
		<div class="modal fade" id="detailModal" tabindex="-2" role="dialog" style="text-align: -webkit-center;" aria-labelledby="detailModal" aria-hidden="true">
			<div class="modal-dialog" style="width: 100%; margin: 50px auto;">
				<div class="modal-content" style="width: 60%;margin: 20px auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							<span>×</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
						<table class="table table-hover table-striped table-bordered" id="detailTable" style="width: 1121px;">
						</table>
						</div>
						<div class="modal-footer" style="text-align: center;" id="btn_div_detail">
				          <button id="btn_approve" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>审批通过
				           </button>
				          <button type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
				          		<span class="glyphicon" aria-hidden="true"></span>取消
				          </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	<!--隐藏的供应商MODEL-->
<div class="modal fade" id="myModal08" tabindex="-1" role="dialog" aria-labelledby="myModalLabel08" aria-hidden="true">
		<div class="modal-dialog" style="margin: 50px auto;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel08">选择商品信息</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="skuCodeForm">
						<table style="width: 100%; height: 100px;">
							<tr>
								<td style="width: 10%"><span>编码：</span></td>
								<td><input type="text" name="goodsCode" id="goodsCode"
									class="form-control input-small" style="width: 100%;" /></td>
								<td style="width: 10%"><span>名称：</span></td>
								<td><input type="text" name="goodsName" id="goodsName"
									class="form-control input-small" style="width: 100%;" /></td>
								<!-- <td>
									<select class="form-control" name="goodsMode" id="goodsMode">
											<option value="0">单品</option>
											<option value="1">多规格</option>
											<option value="2">组合</option>
											<option value="3">原始商品</option>
									</select>
								</td> -->
 								<td>
									<button type="button" class="btn btn-success" id="btn_search_goods">搜索</button>
 								</td>
 								<td>
									<button type="button" style="margin-left:5px;" class="btn btn-primary" id="btn_clear_goods">清空</button>
 								</td>
							</tr>
						</table>
					</form>
					<table id="skuGoodsList"></table>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="goods_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal04" tabindex="-1" role="dialog" aria-labelledby="myModalLabel04" aria-hidden="true">
		<div class="modal-dialog" style="margin: 50px auto;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel04">选择库位</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-inline" role="form" id="proForm">
						<div class="controls controls-row">
							<div class="form-group">
								<span>库位编码:</span><input name="warehouseLocationSerchCode" id="warehouseLocationSerchCode"
									class="form-control" style="width: 100px;">
							</div>
							<div class="form-group">
								<span>库位名称:</span><input name="warehouseLocationSerchName" id="warehouseLocationSerchName"
									class="form-control" style="width: 130px;">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-success" id="btn_search_location">搜索</button>
							</div>
							<div class="form-group">
							   <button class="btn btn-primary btn-flat" type="button" id="clear_search_location">清空</button>
							</div>
						</div>
					</form>
					<table id="warehouseLocationList"></table>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="location_save">确认</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/wms/storagein/storageInRandomList.js" type="text/javascript"></script>
</body>
</html>
