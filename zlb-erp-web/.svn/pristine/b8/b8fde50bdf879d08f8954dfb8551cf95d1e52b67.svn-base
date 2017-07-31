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
						<h2><i class="glyphicon glyphicon-user"></i>采购管理>采购单</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->

						
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="searchForm" onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="controls controls-row">
									<div class="form-group">
<!-- 										<button id="btn_new" class="btn btn-success btn-flat" type="button">生成采购单</button> -->
									</div>
									<div class="form-group">
							        	<span>采购单号：</span>
								      	<input id="ordercode_s" class="form-control input-small" style="width: 150px;" type="text">
							        </div>
									<div class="form-group">
							        	<span>采购状态：</span>
							        	<select id="purchaseState_s" class="form-control" style="width: 120px">
							        		<option value="">---全部---</option>
										  <option value="NEW">待采购</option>
										  <option value="SUB">发起采购</option>
										  <option value="PAR">部分入库</option>
										  <option value="CLO">采购完成</option>
										</select>
							        </div>
									<div class="form-group">
							        	<span>采购人：</span>
								      	<input id="purchaser_s" class="form-control input-small" style="width: 150px;" type="text">
								 	</div>
									<div class="form-group">
							        	<span>审批经理：</span>
								      	<input id="auditor_s" class="form-control input-small" style="width: 150px;" type="text">
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
							<table id="purchaseManageTable" class="table table-hover table-striped table-bordered">
							
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
		    <div class="modal-dialog" style="width:60%;" role="document">
		      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">采购单</h4>
			        </div>
			        <div class="modal-body" >
			        	<div class="form-group" align="left">
			        	<input type="hidden" id="id_value"/>
						  <table style="width:100%;" class="form-group">
							 <tr height="30">
							   <td style="width:25%;"><span>采购申请人：</span><span id='purchaser'></span></td>
							   <td style="width:25%;"><span>采购审批人：</span><span id='auditor'></span></td>
							   <td style="width:25%;"><span>采购申请时间：</span><span id='applyTime'></span></td>
							   <td style="width:25%;"><span>要求到货时间：</span><span id='requestTime'></span></td>
							 </tr>
							 <tr height="30">
							   <td><span>采购发起人：</span><span id='purchaseBeginer'></span></td>
							   <td><span>采购发起时间：</span><span id='purchaseBegined'></span></td>
							   <td><span>收货人：</span><span id='receiver'></span></td>
							   <td><span>完成收货时间：</span><span id='completeTime'></span></td>
							 </tr>
							 <tr height="30">
							   <td colspan="2"><span>供应商：</span><span id='supplier'></span></td>
							   <td colspan="2"><span>采购单状态：</span><span id='purchaseState'></span></td>
							 </tr>
						   </table>
						   
					
					   </div>
					   <div class="form-group">
							<table id="purchaseGoodsTable" class="table table-hover table-striped table-bordered">
							</table>
				       </div>
			        	<div class="form-group">
						  <table style="width:100%;">
							 <tr> 
							   <td style="width:70%;"></td>
							   <td style="width:30%;"><font size="5"><span>采购总金额：</span><span id='purchaseAmount'></span></font></td>
							 </tr>
						   </table>
					   </div>
				       <div class="modal-footer" style="text-align: center;">
				          <button id="btn_start" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 150px">
				          		<span aria-hidden="true"></span>发起采购
				          </button>
				          <button id="btn_change" type="button" class="btn btn-primary" data-dismiss="modal" style="width: 150px">
				          		<span aria-hidden="true"></span>取消
				          </button>
				          <button id="btn_print" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span aria-hidden="true"></span>打印采购单
				           </button>
				           <button id="btn_pring_require" type="button" name="button" class="btn btn-primary" style="width: 150px">
				          		<span aria-hidden="true"></span>打印要货单
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
    <script src="${contextPath}/resources/js/business/pms/purchase/purchaseListManage.js" type="text/javascript"></script>
</body>
</html>
