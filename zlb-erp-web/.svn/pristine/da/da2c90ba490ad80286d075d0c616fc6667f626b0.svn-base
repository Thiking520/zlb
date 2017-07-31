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
			<ul class="breadcrumb">
				<li><a href="#">入库管理</a></li>
				<li><a href="#">上架作业单</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>入库管理>上架作业单</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/operationbill/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form role="form" class="form-inline" id="mainForm"  onkeydown="if(event.keyCode==13)return false;" action="#" method="post">
								<div class="form-group ">
									<span>作业单号：</span><input name="billNo" id="billNo" type="text" class="form-control input-small" />
								</div>
								<div class="form-group ">
									<span>来源单号：</span><input name="sourceBill" id="sourceBill" type="text" class="form-control input-small" />
								</div>
								<div class="form-group ">
									<label>来源类型：</label>
										<select class="form-control" name="sourceType" id="sourceType">
											    <option value="">全部</option>
												<option value='10'>上架</option>
												<option value='20'>移库</option>
										</select>
								</div>
								<div class="form-group ">
									<label>状态：</label>
										<select class="form-control" name="state" id="state">
												<option value="">全部</option>
												<option value='10'>待分派</option>
												<option value='20'>待领取</option>
												<option value='30'>作业中</option>
												<option value='98'>已作废</option>
												<option value='99'>关闭</option>
										</select>
								</div>
								<div class="form-group ">
									<label>结果：</label>
										<select class="form-control" name="operateResult" id="operateResult">
												<option value="">全部</option>
												<option value='10'>部分完成</option>
												<option value='20'>全部完成</option>
										</select>
								</div>
								<div class="form-group">
									<button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
									<button id="btn_reset" class="btn btn-primary btn-flat" type="button">清空</button>
									<!-- <button id="btn_show_export" class="btn btn-success btn-flat" type="button">批量导出</button> -->
								</div>
							</form>
						</div>
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
								  <button type="button" class="btn btn-default  btn-sm" id="btn_edit"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>编辑</button>
								  <button type="button" class="btn btn-default  btn-sm" id="btn_assign"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>分派</button>
								  <button type="button" class="btn btn-default  btn-sm" id="btn_sign"><span class="glyphicon glyphicon-log-in" style="color:green;"></span>领取</button>
								  <button type="button" class="btn btn-default  btn-sm" id="btn_finished"><span class="glyphicon glyphicon-ok-sign" style="color: green;"></span>确认完成作业</button>
								  <div class="btn-group">
									<button type="button" class="btn btn-default  btn-sm dropdown-toggle" data-toggle="dropdown">单据打印
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" role="menu">
										<li id="btn_operation_print"><a href="#">打印上架作业单</a></li>
									</ul>
								  </div>
								  <button id="btn_show_export" class="btn btn-default  btn-sm" type="button" style="display: block;">
									<span class="glyphicon glyphicon glyphicon-export" style="color: green;"></span>批量导出
								  </button>
								  <!-- <div class="btn-group">
									<button type="button" class="btn btn-default  btn-sm dropdown-toggle" data-toggle="dropdown">其他操作
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" role="menu">
										<li id="cancelPick"><a href="#">取消分派</a></li>
										<li id="invalid"><a href="#">作废</a></li>
									</ul>
								   </div> -->
								 </div>
							  </div>
					</div>

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<table id="operationbillManageTable" class="table table-hover table-striped table-bordered">
							
							</table>
							<table id="pickListTable" class="table table-hover table-striped table-bordered" >

                        	</table>
						</div>
						<!-- 分页列表区域ends -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--模态框  -->
	<%@include file="./editOperationBillModal.jsp"%>
	<!-- 隐藏的dialog end -->
	<!--模态框  -->
	<div class="modal fade" id="pickFpModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
	   <div class="modal-dialog">
	       <div class="modal-content" style="height: 300px">
	           <div class="modal-header">
	               <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
	                   &times;
	               </button>
	               <h4 class="modal-title" id="myModalLabel02" >
	                  	
	               </h4>
	           </div>
	           <div class="modal-body" id="pick_div">
	               <div class="form-group">
	                   <p class="col-md-3 control-label">分派：</p>
	                   <div class="col-md-6">
	                               <div class="input-group">
	                                   <input name="" id="pick_name" class="form-control input-small" type="text" disabled="disabled">
	                                   <input name="" id="emp_id" style="display: none;"/>
	                                   <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="pick_div_emp"></span></div>
	                               </div>
	                               <div style="margin: 50px">
	                                   <button type="button" class="btn btn-primary" id="btn_pickQrEmp" >确定</button>
	                                   <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                               </div>
	                   </div>
	               </div>
	           </div>
	       </div>
	   </div>
	</div>
	<!-- 选择负责人模态框（Modal） -->
	<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
	     aria-labelledby="myModalLabel03" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal"
	                        aria-hidden="true">&times;</button>
	                <h4 class="modal-title" id="myModalLabel03">选择负责人</h4>
	            </div>
	            <div class="modal-body">
	                <form action="" class="form-inline" role="form" id="empForm">
	                    <div class="controls controls-row">
	                        <div class="form-group">
	                            <span>姓名:</span><input name="name_emp" id="name_emp"
	                                                   class="form-control" style="width: 100px;">
	                       </div>
	                       <div class="form-group">
	                           <span>电话:</span><input name="tel_emp" id="tel_emp"
	                                                  class="form-control" style="width: 130px;">
	                       </div>
	                       <div class="form-group">
	                           <button type="button" class="btn btn-success btn-flat" id="btn_search_emp">搜索</button>
	                           <button type="button" class="btn btn-primary btn-flat" id="clear_search_emp">清空</button>         
	                       </div>
	                   </div>
	               </form>
	                <table id="empList"></table>
	                <div class="modal-footer">
	               	<button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>
	               	<button type="button" class="btn btn-primary" id="emp_save">确认</button>
	               </div>
	           </div>
	       </div>
	       <!-- /.modal-content -->
	   </div>
	   <!-- /.modal -->
	</div>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/wms/storagein/operationbillList.js" type="text/javascript"></script>
</body>
</html>
