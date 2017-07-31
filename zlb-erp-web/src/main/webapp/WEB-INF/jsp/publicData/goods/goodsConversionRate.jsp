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
						<h2><i class="glyphicon glyphicon-user"></i>商品管理>转换率配置</h2>
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
								      		<input name="searchGoodsTypeName" id="searchGoodsTypeName" class="form-control input-small choose_search_goodsType" type="text" readonly>
								      		<input name="searchGoodsType" id="searchGoodsType" style="display: none;"/>
								      		<div class="input-group-addon choose_search_goodsType" style="background-color: white;"><span class="glyphicon glyphicon-search"></span></div>
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
	  
	<!-- 隐藏，转换率配置 -->
	<div class="modal fade" id="configModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" role="document" style="min-width: 720px;overflow: auto;">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title" id="myModalLabel">转换率配置</h4>
	        </div>
	        <div class="modal-body">
	        	<form id="addForm" class="form-horizontal" onSubmit="return false;">
<!-- 	        		 <div class="form-group"> -->
<!--                          <p for="dictTitle" class="col-md-3 control-label"><span class="text-required">*</span>关联的原始商品：</p> -->
<!--                          <div class="col-md-8"> -->
<!--                              <div class="input-group"> -->
<!--                                 <input name="relateOriginalGoodName" id="relateOriginalGoodName" class="form-control input-small" type="text" disabled="disabled"> -->
<!--                           		<input name="relateOriginalGood" id="relateOriginalGood" style="display: none;"/> -->
<!-- 		    					<div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search choose_original_goods"></span></div> -->
<!--                              </div> -->
<!--                          </div> -->
<!--                      </div> -->
<!--                      <div class="form-group"> -->
<!--                      	 <p for="dictTitle" class="col-md-3 control-label"><span class="text-required">*</span>转换率计算公式：</p> -->
<!--                          <p class="col-md-8 form-inline"> -->
<!--                          	一个单位的售卖商品 = <input type="text" id="conversionRate" name="conversionRate" class="form-control" placeholder="请输入正整数或小数">个单位数量的原始商品 -->
<!--                          </p> -->
<!--                      </div> -->
	        	</form>
	        </div>
	        <div class="modal-footer">
	          <input type="hidden" id="keyId">
	          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭<!-- 取消 --></button>
	          <!-- <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button> -->
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <!-- 隐藏（选择原始商品） -->
	  <div class="modal fade" id="chooseOriginalGoodsModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title">选择原始商品</h4>
	        </div>
	        
	        <div role="grid" class="box-body table-responsive">
	        	<!-- 表单查询区域begin -->
				<div>
					<form id="searchOriginalForm" class="form-inline" role="form" style="padding: 10px;" onSubmit="return false;">
						<div class="controls controls-row">
							<div class="form-group">
								<span>原始商品名称：</span><input type="text" name="searchOriginalKeyword" id="searchOriginalKeyword" class="form-control input-small" style="width: 150px;"/>
							</div>
					        <div class="form-group">
					        	<button id="original_btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
					        </div>
				      </div>
					</form>
				</div>
						
				<table id="originalGoodsListTable" class="table table-hover table-striped table-bordered">
				
				</table>
			</div>
	        
	        <div class="modal-footer">
	          <button id="btn_originalGoods_confirm" type="button" name="submit" class="btn btn-primary">确定</button>
	        </div>
	      </div>
	    </div>
	  </div>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsConversionRate.js" type="text/javascript"></script>
</body>
</html>
