<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>

    <!-- ★ 导入公共样式库 -->
    <%@include file="../../common/commonCss.jsp"%>
    <link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>

<div id="content">
    <div>
        <div class="box col-md-12">
            <div class="box-inner">
                <div class="box-header well" data-original-title="">
                    <h2><i class="glyphicon glyphicon-user"></i> 库存管理>条形码管理</h2>
                    <%@include file="../myWarehouse.jsp"%>
					<input type="hidden" id="init" value="/wms/skuManage/init">
                </div>

                <!-- 每个人只用关注这块区域starts -->
                <div class="box-content">
                    <!-- 表单查询区域begin -->
                    <div class="alert alert-info">
                        <form id="skuManageSearchForm" class="form-inline" role="form" style="padding-bottom: 10px;" onkeydown="if(event.keyCode==13) return false;" action="#"  method="post">
                            <div class="controls controls-row">
                                <div class="form-group">
                                    <span>商品编码：</span><input type="text" name="skuCodeSearch" id="skuCodeSearch"  class="form-control input-small" style="width: 150px;"/>
                                    <span>商品名称：</span><input type="text" name="skuCodeName" id="skuCodeName"  class="form-control input-small" style="width: 150px;"/>
                                    <span>供应商名称：</span><input type="text" name="skuCodeName" id="skuCodeName"  class="form-control input-small" style="width: 150px;"/>
                                </div>
                                <button id="btn_skuManage_search" class="btn btn-success btn-flat" type="button">搜索</button>
                                <button id="btn_skuManage_clear" class="btn btn-primary btn-flat" type="button">清空</button>
                            </div>
                        </form>
                    </div>
                    <!-- 表单查询区域end -->

                    <!-- 分页列表区域begin -->
                    <div role="grid" class="box-body table-responsive" >
                    	<div class="table_nav">
	                        <div id="toolbar" class="btn-group">
	                            <button type="button" class="btn btn-default  btn-sm" id="btn_add_skuManage"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
	                        </div>
	                        <div id="toolbar" class="btn-group">
	                            <button type="button" class="btn btn-default  btn-sm" id="btn_generate_sku"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成条码</button>
	                        </div>
                        </div>
                        <table id="skuManageTable" class="table table-hover table-striped table-bordered" style="min-width: 800px;">

                        </table>
                    </div>
                    <!-- 分页列表区域ends -->
                </div>
                <!-- 每个人只用关注这块区域starts -->
            </div>
        </div>
    </div>
</div>


<!-- 新增和编辑（Modal） -->
<div class="modal fade" id="addSkuManage" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width: 500px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel03">新增条形码</h4>
            </div>
            <div class="modal-body">
                <form  id="addSkuManageForm" method="post" target="_blank">
                    <div class="controls controls-row">
                        <table style="width: 100%;">
                            <input type="hidden" value="" id = "id" name="id">
                            <tr>
	                            <td style="width: 33%;">
	                            	<label><span style="color: red;" class="text-required">*</span>仓库：</label>
									<div class="form-group" style="width:300px; text-align:center;">
										<input type="hidden" id="warehouseCode">
										<div class="input-group" >
											<input type="text" name="warehouseName" class="form-control"
												id="warehouseName" readonly="readonly" style="width:300px; text-align:center;">
										</div>
									</div>
								</td>
							</tr>
							<tr>
	                           <td style="width: 33%;">
	                            	<label><span style="color: red;" class="text-required">*</span>商品编码：</label>
									<div class="form-group" style="width:300px; text-align:center;">
										<input type="hidden" id="skuName">
										<div class="input-group" style="width:113%;">
											<input type="text" name="skuCode" class="form-control"
												id="skuCode" readonly="readonly" style="width: 100%;">
											<div class="input-group-addon" id="fromSouSuo01"
												style="background-color: white;">
												<span class="glyphicon glyphicon-search"
													id="search_sku"></span>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
	                            <td style="width: 33%;">
	                            	<label><span style="color: red;" class="text-required">*</span>供应商编码：</label>
									<div class="form-group" style="width:300px; text-align:center;">
										<input type="hidden" id="supplierName">
										<div class="input-group" style="width:113%;" >
											<input type="text" name="supplierCode" class="form-control"
												id="supplierCode" readonly="readonly" style="width: 100%;">
											<div class="input-group-addon" id="fromSouSuo01"
												style="background-color: white;">
												<span class="glyphicon glyphicon-search"
													id="search_supplier"></span>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
	                            <td style="width: 33%;">
	                            	<label><span style="color: red;" class="text-required">*</span>商品分类：</label>
									<div class="form-group" style="width:300px; text-align:center;">
										<input type="hidden" id="skuClassifyName">
										<div class="input-group" style="width:113%;">
											<input type="text" name="skuClassifyCode" class="form-control"
												id="skuClassifyCode" readonly="readonly" style="width: 100%;">
											<div class="input-group-addon" id="fromSouSuo01"
												style="background-color: white;">
												<span class="glyphicon glyphicon-search"
													id="search_class"></span>
											</div>
										</div>
									</div>
								</td>
							</tr>
                            <tr>
                                <td colspan="5">
                                    <button type="button" class="btn btn-primary" style="margin-left: 45%;margin-top: 20px"
                                            id="saveskuManage">保存
                                    </button>
                                    <button type="button" class="btn btn-default"
                                            data-dismiss="modal" style="margin-top: 20px">取消</button>
                                </td>
                            </tr>
                        </table>

                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>

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
<div class="modal fade" id="myModal07" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel07" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width:750px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel08">选择供应商信息</h4>
				</div>
				<div class="modal-body">
					<form action="" class="rows" role="form" id="supplierForm">
						<table style="width: 100%; height: 100px;">
							<tr>
								<td><span>供应商编码：</span></td>
								<td><input type="text" name="searchSupplierCode" id="searchSupplierCode"
									class="form-control"/></td>
								<td><span>供应商名称：</span></td>
								<td><input type="text" name="searchSupplierName" id="searchSupplierName"
									class="form-control"/></td>
								<td colspan="4" style="text-align: right;">
									<button type="button" class="btn btn-success btn-flat" id="btn_search_supplier">搜索</button>
									<button type="button" class="btn btn-primary btn-flat" id="btn_supplier_reset">清空</button>
								</td>
							</tr>
						</table>
					</form>
					<table id="supplierList"></table>
					<div class="modal-footer">
						 <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						 <button type="button" class="btn btn-primary" id="supplier_save">保存</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
</div>


<!-- 隐藏树结构（商品分类） -->
<div class="modal fade" id="chooseGoodsTypeModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" param="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title">选择商品分类</h4>
        </div>
        
        <div class="modal-body" id="goods_type_tree">
        </div>
        
        <div class="modal-footer">
          <button id="btn_goodsType_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
        </div>
      </div>
    </div>
</div>
	
<!-- ★ 导入公共JS库 -->
<%@include file="../../common/commonCss.jsp"%>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
<script src="${contextPath}/resources/js/business/wms/mastdata/skuManage.js" type="text/javascript"></script>
</body>
</html>

