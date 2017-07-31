<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
.datebimg {
	background: url('${contextPath}/resources/img/pms/pms_calendar.jpg') no-repeat right;
	background-size: 20% 80%;
}
</style>
</head>
<body>
	
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">供应商管理</a></li>
				<li><a href="#">供应商财务审批</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div >
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>供应商管理>供应商财务审批</h2>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
					<input id="contextPath" type="hidden" value="${contextPath}" />
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form id="addOrEditeSearchForm" class="form-inline" role="form">
							   		<!-- <div class="form-group">
									<span>审核状态</span> <select id="sele_search_suState" class="form-control">
										<option value="">全部</option>
										<option value="WPA">待经理审批</option>
										<option value="WFA">待财务审批</option>
										<option value="APP">审批通过</option>
										<option value="REJ">已驳回</option>
									</select>
								</div> -->
								<div class="form-group">
									<span>审核事项</span> <select style="width: 120px" id="sele_search_oprate" class="form-control">
										<option value="">---全部---</option>
										<option value="NEW">新建</option>
										<option value="MOD">修改</option>
										<option value="DEL">删除</option>
									</select>
								</div>
								<div class="form-group">
									<span>申请时间：</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control datebimg" value=""
											id="datetimepickerStart" readonly>
									</div>
									<span>到</span>
									<div class="input-group input-append date form_datetime">
										<input type="text" class="form-control datebimg" value=""
											id="datetimepickerEnd" readonly>
									</div>
									<button id="btn_date_7days"
										class="btn btn-inverse btn-default btn-sm" type="button">近7天</button>
									<button id="btn_date_30days"
										class="btn btn-inverse btn-default btn-sm" type="button">近30天</button>
								<button id="btn_search_moreCondition"
									class="btn btn-success btn-flat" type="button">搜索</button>
								<button class="btn btn-primary btn-flat"
												type="reset">清空</button>
								</div>
							</form>
						</div>
						
						<!-- 表单查询区域end -->
						
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
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
	
	
	<!-- 供应商财务审批 -->
		<div class="modal fade" id="financeCheckModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1000px" role="document">
		      <div class="modal-content">
		      
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">供应商财务审批</h4>
			        </div>
			        <!-- end header -->
			        
			         <div class="modal-body">
							<table style="width: 950px; height: azimuth; border: 1px; text-align: left;" class="table table-bordered table-hover table-striped">
								<tr>
									<td>供应商名称</td>
									<td><span id="supplier"></span></td>
									<td>联系人</td>
									<td><span id="contactPeople" ></span></td>
								</tr>
								<tr>
									<td>联系电话</td>
									<td><span id="contactPhone" ></span></td>
									<td>联系地址</td>
									<td><span id="contactAddress" ></span></td>
								</tr>
								<tr>
									<td>电子邮箱</td>
									<td><span id="email" ></span></td>
									<td>开户行</td>
									<td><span id="bankName" ></span></td>
								</tr>
								<tr>
									<td>收款账号</td>
									<td><span id="accountNumber" ></span></td>
									<td>户名</td>
									<td><span id="accountName" ></span></td>
								</tr>
								<tr>
									<td>供应商品类型</td>
									<td colspan="3">
										<span id="goodsTypeNames" ></span>
									</td>
								</tr>								
								<tr>
									<td>营业执照</td>
									<td colspan="3">
										<img id="license" class="thumbnail" style="width: 200px; height: 200px; margin: 0px 0px 5px;" src="${contextPath}/resources/img/no_image.jpg"/>
									</td>
								</tr>
								<tr>
									<td colspan="4">合同复印件</td>
								</tr>
								<tr>
									<td colspan="4">
									 <div class="form-group">
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow1" class="thumbnail lazy" style="margin:5px;width:200px;height:200px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div>
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow2" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div> 
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow3" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div>
										<div class="col-sm-3" style="width: 24%;">
											<img id="imageShow4" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										</div>
									</div>	
									</td>
								</tr>
								
								
							</table>
					</div>
						
			        <div class="modal-footer" style="text-align: center;">
				          <button id="btn_approve" type="button" class="btn btn-primary" style="width: 150px">
				          		<span aria-hidden="true"></span>同意
				          </button>
				          <button id="btn_reject" type="button" class="btn btn-primary" style="width: 150px">
				          		<span class="glyphicon" aria-hidden="true"></span>驳回
				          </button>
				          <button id="btn_cancel" type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
								<span class="glyphicon" aria-hidden="true"></span>取消
							</button>
			        </div>
			        <!-- end footer -->
			        
		        </div>
		        <!-- modal-content -->
		        
		      </div>
		    </div>
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/pms/supplierFinanceExamineAndApprove.js" type="text/javascript"></script>
</body>
</html>
