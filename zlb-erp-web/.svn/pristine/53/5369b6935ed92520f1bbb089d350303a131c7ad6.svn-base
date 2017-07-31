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
	
	<div id="content">
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>商品管理>商品资料管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form id="searchForm" class="form-inline" role="form" onSubmit="return false;">
								<div class="controls controls-row">
								    <div class="form-group">
							   			<span>商品编码：</span><input type="text" name="goodsCode" id="goodsCode" class="form-control input-small" style="width: 150px;"/>
							   		</div>
							   		<div class="form-group">
							   			<span>商品名称：</span><input type="text" name="searchKeyword" id="searchKeyword" class="form-control input-small" style="width: 150px;"/>
							   		</div>
							  		<div class="form-group">
							    		<span>所属分类：</span>	
										<div class="input-group">
								      		<input name="searchGoodsTypeName" id="searchGoodsTypeName" class="form-control input-small" type="text" disabled="disabled">
								      		<input name="searchGoodsType" id="searchGoodsType" style="display: none;"/>
								      		<div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="choose_search_goodsType"></span></div>
								    	</div>
								   	</div>
								   	<div class="form-group">
											<span>商品类型：</span>
	                                        <select class="form-control L_spt_next" id="searchGoodsMode" name="searchGoodsMode">
	                                        	<option value="">全部</option>
						                		<option value="0">单品</option>
						                		<option value="1">多规格</option>
						                		<option value="2">组合商品</option>
	                                        </select>
									</div>
								   	<div class="form-group">
											<span>商品状态：</span>
	                                        <select class="form-control L_spt_next" id="searchGoodsStatus" name="searchGoodsStatus">
	                                        	<option value="">全部</option>
						                		<option value="0">未上架</option>
						                		<option value="1">已上架</option>
						                		<option value="2">已下架</option>
						                		<option value="3">已删除</option>
	                                        </select>
									</div>
								   	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
								   	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
						      	</div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive" >
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
							<button type="button" class="btn btn-default" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增商品</button>
							</div>
							</div>
							<table id="listTable" class="table table-hover table-striped table-bordered" >
							
							</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
					<!-- 每个人只用关注这块区域starts -->	
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
	
	 <!-- 隐藏树结构（商品分类） -->
	 <%@include file="../goods/dialog/goodsTypeTreeDialog.jsp"%>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsManager.js" type="text/javascript"></script>
    <script src="${contextPath}/resources/js/business/publicData/goods/dialog/goodsTypeTreeDialog.js" type="text/javascript"></script>
</body>
</html>
