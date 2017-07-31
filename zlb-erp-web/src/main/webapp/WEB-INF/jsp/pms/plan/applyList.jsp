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
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">采购计划</a></li>
				<li><a href="#">采购申请</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div >
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>采购计划>采购申请</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
							        	<span>采购申请单状态：</span>
							        	<select id="applyState" class="form-control" style="width: 120px" >
							        		<option value="">---全部---</option>
										  <option value="NEW">新建</option>
										  <option value="SUB">已提交</option>
										  <option value="APP">审批通过</option>
										  <option value="REJ">驳回</option>
										  <option value="CAN">作废</option>
										</select>
							        </div>
									<div class="form-group">
							        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
							        </div>
							        <div class="form-group">
							        	<button id="btn_clean" class="btn btn-primary btn-flat" type="button">清空</button>
							        </div>
						      </div>
								<!--时间控件end  -->
							</form>
						</div>

						<!-- 表单查询区域end -->
<!-- 						<hr class="feature-divider"> -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button id="btn_new" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新建采购申请</button>
								</div>
							</div>
							<table id="applyManageTable" class="table table-hover table-striped table-bordered">
							
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
	<form id="addAnchorForm" method="post">
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1300px" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">采购申请</h4>
			        </div>
		        
			        <div class="modal-body" >
					  <table style="width:60%;" id="addTableBt">
						 <tr>
						   <td style="width:33%;" align="right">
								<span>商品编码：</span>	
						   </td>
						   <td style="width:33%;" align="left">
						         <div class="input-group" style="display: -webkit-box;">
								      <input id="goodsCode_key" class="form-control input-small" disabled="disabled"  style="width: 150px;" type="text">
								      <div style="padding-top: 10px;padding-left: 10px;border: 1px solid #cccccc;width: 35px;background-color: #eeeeee;cursor: pointer;border-radius: 4px;"><span class="glyphicon glyphicon-search" id="clickSkucode"></span></div>
								      <button id="btn_add" class="btn btn-success btn-flat" type="button">添加</button>
								 </div>
						   </td>
						 </tr>
					   </table>

					   <div class="form-group">
							<table id="applyGoodsTable" class="table table-hover table-striped table-bordered">
							    
							</table>
				       </div>
				        <div class="modal-footer" style="text-align: center;" id="btn_div">
				          <button id="btn_save" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
				           </button>
				          <button id="btn_submit" type="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>提交审批
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
	<!--隐藏的供应商MODEL-->
<div class="modal fade" id="skuCodeModel" tabindex="-3" role="dialog"  aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"  aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel04">选择商品</h4>
            </div>
            <div class="modal-body">
                <form id="fromModal03" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>商品编码:</span><input name="skuCode" id="skuCode" class="form-control"  style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>商品名称:</span><input name="skuName" id="skuName" class="form-control"
                                                   style="width: 130px;">
                        </div>
                        <button type="button" class="btn btn-primary" id="btn_search_sku">查询</button>
                    </div>
                </form>
                <table id="skuTable"></table>
            </div>
            <div class=" modal-footer">
             <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             <button type="button" class="btn btn-primary" id="driver_sku_save">确定</button>
            </div>
           
        </div>
    </div>
</div>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/plan/applyListManage.js" type="text/javascript"></script>
</body>
</html>
