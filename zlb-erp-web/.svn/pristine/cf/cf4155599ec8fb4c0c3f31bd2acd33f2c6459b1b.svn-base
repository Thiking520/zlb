<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	.controls-row input {
		width: 170px !important;
	}
</style>
</head>
<body>
	
	<div id="content">
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>商品管理>原始商品管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<input type="hidden" value="${contextPath}" id="contextPath" />
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form id="searchForm" class="form-inline" role="form" >
								<div class="controls controls-row">
							   		<div class="form-group">
							   			<span>原始商品编码：</span><input type="text" name="good_code" id="good_code" class="form-control input-small" style="width: 150px;"/>
							   		</div>
							   		<div class="form-group">
							   			<span>原始商品名称：</span><input type="text" name="searchKeyword" id="searchKeyword" class="form-control input-small" style="width: 150px;"/>
							   		</div>
							  		<div class="form-group">
							    		<span>原始商品分类：</span>	
										<div class="input-group">
								      		<input name="searchGoodsTypeName" id="searchGoodsTypeName" style="background-color:white" class="form-control input-small choose_search_goodsType" type="text" readonly="readonly">
								      		<input name="searchGoodsType" id="searchGoodsType" style="display: none;"/>
								      		<div class="input-group-addon choose_search_goodsType"><span class="glyphicon glyphicon-search"></span></div>
								    	</div>
								   	</div>
									<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
									<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						      	</div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="button" class="btn btn-default  btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增商品</button>
								<button id="btn_batch_import" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-import" style="color: green;"></span>批量导入</button>
								<button id="btn_dow" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-save" style="color: green;"></span>导出模板</button>
							</div>
							</div>
							<table id="listTable" class="table table-hover table-striped table-bordered">
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
				</div>
			</div>
		</div>
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
	  
	<!-- 隐藏，多规格商品详情 -->
	<div class="modal fade" id="detailSkuTableModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
		<div class="modal-dialog" style="width: 1200px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel02">
						多规格商品详情 
					</h4>
				</div>
					<table id="detailSkuTable"></table>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 隐藏，组合商品详情 -->
	<div class="modal fade" id="detailListTableModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
		<div class="modal-dialog" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel02">
						组合商品详情 
					</h4>
				</div>
					<table id="detailListTable"></table>
				</div>
			</div>
		</div>
	</div>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsOriginalManager.js" type="text/javascript"></script>
</body>
</html>
