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
	<div id="content" >
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>商品管理>商品规格管理</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onSubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
										<span>规格名称：</span><input type="text" name="searchKeyword" id="searchKeyword" class="form-control input-small" style="width: 150px;"/>
									</div>
							        <div class="form-group">
							        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
							        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>

							        </div>
							    </div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-default btn-sm" id="btn_show_add"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
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
	
	<!-- 隐藏的dialog Begin -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" role="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title" id="myModalLabel">新增</h4>
	        </div>
	        <div class="modal-body" >
	        	<form id="addForm" class="form-horizontal" onSubmit="return false;">
	        		<div class="form-group">
                         <p for="dictTitle" class="col-md-3 control-label"><span class="text-required">*</span>规格名称：</p>
                         <div class="col-md-8">
                             <div>
                                 <input type="text" name="skuName" class="form-control" id="skuName" >
                             </div>
                         </div>
                     </div>
                     <div class="form-group">
                         <p for="dictTitle" class="col-md-3 control-label"><span class="text-required">*</span>排序值：</p>
                         <div class="col-md-8">
                             <div>
                                 <input type="text" name="sortIndex" class="form-control" id="sortIndex" >
                             </div>
                         </div>
                     </div>
                     <button type="button" class="btn btn-success btn-flat" id="btn_add_row">新增规格值</button>
				   	 <div class="box-header well" data-original-title="">
						<h2><i class="glyphicon"></i>规格值列表</h2>
					 </div>
				     <div role="grid" class="box-body table-responsive">
						<table id="tabList" class="table table-hover table-striped table-bordered">
							<tr>
								<td style="min-width: 60px;">序号</td>
								<td>规格值</td>
								<td>排序值</td>
								<td>操作</td>
							</tr>
						</table>
					</div>
	        	</form>
	        </div>
	        <div class="modal-footer">
	        	<input type="hidden" id="keyId">
	          <button type="button" class="btn btn-default" id="btn_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
	          <button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
	        </div>
	      </div>
	    </div>
	  </div>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/publicData/goods/goodsSkuManager.js" type="text/javascript"></script>
	    
</body>
</html>