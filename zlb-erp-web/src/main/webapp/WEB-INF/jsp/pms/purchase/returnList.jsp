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
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>采购管理>采购退货</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" action="#" onsubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
							        	<span>采购退货单状态：</span>
							        	<select id="returnState" class="form-control" style="width: 120px">
							        		<option value="">---全部---</option>
										  <option value="NEW">新建</option>
										  <option value="SUB">已提交</option>
										  <option value="APP">审批通过</option>
										  <option value="REJ">驳回</option>
										</select>
							        </div>
						        <%--<div class="form-group">--%>
<!-- 									<div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div> -->
						        <%--</div>--%>
								<div class="form-group">
						        	<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
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
									<button id="btn_new" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-plus" style="color: green;"></span>生成采购退货</button>
								</div>
							</div>
							<table id="returnManageTable" class="table table-hover table-striped table-bordered">
							
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
			          <h4 class="modal-title" id="myModalLabel">采购退货</h4>
			        </div>
		        
			        <div class="modal-body" >
					  <table style="width:100%;" class="table table-bordered table-hover table-striped">
						 <tr>
						   <td style="width:15%;" align="center">商品编码</td>
						   <td style="width:10%;" align="center">商品名称</td>
						   <td style="width:8%;" align="center">规格</td>
						   <td style="width:15%;" align="center">采购单号</td>
						   <td style="width:10%;" align="center">供应商</td>
						   <td style="width:7%;" align="center">采购数量</td>
						   <td style="width:7%;" align="center">退货数量</td>
						   <td style="width:7%;" align="center">退货金额</td>
						   <td style="width:7%;" align="center">采购款</td>
						   <td style="width:15%;" align="center">退货原因</td>
						   <td style="width:5%;" align="center">操作</td>
						 </tr>
						 <tr>
						   <td align="center">
								<input id="goodsCode" class="form-control input-small" style="width: 150px;height:35px" type="text" onblur="returnManage.getPurchases(this.value)">
						   </td>
						   <td align="center" valign="middle"><span id="goodsName" valign="middle"></span></td>
						   <td align="center" valign="middle"><span id="goodsType" valign="middle"></span></td>
						   <td align="center">
						   		<span id="purchaseCodeSpan"></span>
						   		<input type="hidden" id="purchaseCode" value="">
						   </td>
						   <td align="center"><span id="supplier"></td>
						   <td align="center"><span id="goodsNumber"></span>
						   		<input type="hidden" id="goodsPrice" value="">
						   		<input type="hidden" id="goodsUnit" value="">
						   </td>
						   <td align="center">
						   		<input id="returnNumber" class="form-control input-small" style="width: 70px;height:35px" type="text" onblur="returnManage.sumReturnAmount()" disabled="disabled" value=0>
						   </td>
						   <td align="center">
	   					   		<input id="returnAmount" class="form-control input-small" style="width: 80px;height:35px" type="text" disabled="disabled">
						   </td>
						   <td align="center"><span id="goodsAmount"></span></td>
						   <td align="center"><input id="remark" class="form-control input-small" style="width: 150px;height:35px" type="text"></td>
						   <td style="width:33%;" align="left">
						         <div class="input-group">
								      <button id="btn_add" class="btn btn-success btn-flat" type="button" >添加</button>
								 </div>
						   </td>
						 </tr>
					   </table>
					   <div class="form-group">
							<table id="returnGoodsTable" class="table table-hover table-striped table-bordered">
							    
							</table>
				       </div>
				        <div class="modal-footer" style="text-align: center;">
				          <button id="btn_submit" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 150px">
				          		<span aria-hidden="true"></span>提交审批
				          </button>
				          <button id="btn_save" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认
				           </button>
				          <button id="btn_cancel" type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
				          		<span class="glyphicon" aria-hidden="true"></span>取消
				          </button>
				        </div>
			       </div>
		        </div>
		      </div>
		    </div>
	</form>	
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/purchase/returnListManage.js?version=v1" type="text/javascript"></script>
</body>
</html>
