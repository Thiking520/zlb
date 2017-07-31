<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
	.modal-headers {
		padding: 15px;
		min-height: 16.42857143px;
	}
	
	.col-md-table-12 {
		width: 48%;
		position: relative;
		min-height: 1px;
		padding-left: 40px;
		padding-right: 15px;
		float: left;
	}
	
	.col-md-table-6{
		margin-top: 10px;
   	    margin-bottom: 10px;
	}
	.col-md-table-5{
		margin-top: 16px;
   	    margin-bottom: 10px;
	}
	
 
</style>
</head>
<body class="skin-blue">
	<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">库存管理</a></li>
				<li><a href="#" class="active">原料转成品</a></li>
			</ul>
		</div>
		
		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>库存管理>原料转成品单</h2>
						<%@include file="../myWarehouse.jsp"%>
						<input type="hidden" id="init" value="/wms/materialManager/init">
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form class="form-inline" role="form"  id="searchform">
								<div class="controls controls-row">
									<div class="form-group">
							   			<span>原料转成品单单号：</span><input name="mateProNo" id="mateProNo" type="text" class="form-control input-small" />
							   		</div>
									<div class="form-group">
										<span>创建人：</span><input type="text" name="creator" id="creator" class="form-control input-small" style="width: 150px;"/>
									</div>
									<div class="form-group">
							         	<span>创建开始时间：</span>
							        </div>
									<div class="form-group">
					                    <div class="input-group input-append date form_datetime" >
					                        <input type="text" class="form-control" value="" id="expectDateTimeStart" name="startCreated" readonly>
					                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					                    </div>
							         </div>
									<div class="form-group">
									</div>
							         <div class="form-group">
							         <span>创建结束时间：</span>
							         </div>
							         <div class="form-group">
				                        <div class="input-group input-append date form_datetime" >
					                        <input type="text" class="form-control" value="" id="expectDateTimeEnd" name="endCreated" readonly>
					                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					                    </div>
							         </div>
										
						        <div class="form-group">
						        	<button type="button" class="btn btn-success btn-flat" id="btn_search">搜索</button>
						        	<button type="button" class="btn btn-primary btn-flat" id=btn_clean>清空</button>
						        </div>
						      </div>
								<!--时间控件end  -->
							</form>
							
						</div>
						<!-- 表单查询区域end -->

						<!-- 分页列表区域begin -->
						<div id="batch_div">
							<div class="table_nav">
								<div id="toolbar" class="btn-group">
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_mate">执行原料转成品</button>
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_nullify">作废</button>
									<button type="button" class="btn btn-default  btn-sm" id="btn_show_print">打印</button>
								</div>
							</div>
							<div role="grid" class="box-body table-responsive">
								 <div >
										<table id="materialManagerTable" class="table table-hover table-striped table-bordered" >
										
										</table>
								</div>
							</div>
						</div>
						
					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
	</div>
	
		<!-- 隐藏的dialog Begin -->
	<form id="addAnchorForm" method="post" class="form-inline" target="_blank">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document" style="width:850px">
				<div class="modal-content">
					<div class="modal-headers">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					
							<div class="row">
							    <div class="box col-md-table-12 col-md-table-5">
							        <div class="box-inner">
							            <div class="box-header well" data-original-title="">
							                <h2>从--原料</h2>
							            </div>
							            <div class="box-content" style="display: block;">
							            	     <input type="hidden" id="mateStockBatchNos">
							            	     <input type="hidden" id="mateProNos">
							            		<div class="form-group">
							                        <label>货品编码：</label>
							                        <input type="text" name="mateCode" id="mateCode" class="form-control" readonly="readonly" >
							                    </div>
							                    <div class="form-group">
							                        <label  >中文描述：</label>
							                        <input type="text" name="mateDescrip" id="mateDescrip" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>生产日期：</label>
							                        <input type="text" name="matePro" id="matePro" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>入库日期：</label>
							                        <input type="text" name="mateStorage" id="mateStorage" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>失效日期：</label>
							                        <input type="text" name="mateFail" id="mateFail" class="form-control" readonly="readonly">
							                    </div>
							                    <div class="form-group">
							                        <label>库存状态：</label>
							                        <select class="form-control" name="mateState" id="mateState">
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    <div class="form-group">                    							                    							                    <div class="form-group">
							                        <label>库位编码：</label>
							                        <input type="text" name="locationCode" id="locationCode" class="form-control" readonly="readonly">
							                    </div>
							                    <table style="width: 100%;" >
									                    <tr>
															<td colspan="3">
																<div class="form-inline">
												 					<label style="margin-top: 20px;">总净重：</label>
									                       			<label name="qty" id="qty">10</label>
																</div>
															</td>
															<td colspan="3">
																<div class="form-group">
												 					<label style="margin-top: 20px;">已分配净重：</label>
									                       			<label name="preAllocationQty" id="preAllocationQty">20</label>
																</div>
															</td>
															<td colspan="3">
																<div class="form-group">
												 					<label style="margin-top: 20px;">可用数量：</label>
									                       			<label name="allocationQty" id="allocationQty">20</label>
																</div>
															</td>
														</tr>
												</table>
												<div class="form-group">
							 					<label style="margin-top: 20px;">计划转为成品净重:</label>
				                       			<input type="text" name="mateQty" id="mateQty" class="form-control" >
												</div>
												<div class="form-group">
							 					<label style="margin-top: 20px;">单位：</label>
				          						<input type="text" name="mateUnit" id="mateUnit" class="form-control" >
				                       			</select>
												</div>
							
							            </div>
							        </div>
							    </div>
							    </div>
							    
							      <div class="box col-md-table-12 col-md-6 col-md-table-6">
							        <div class="box-inner">
							            <div class="box-header well" data-original-title="">
							                <h2>至--成品</h2>
							            </div>
							            <div class="box-content" style="display: block;">
												<div class="form-group">
													<label>货品编码：</label> 
													<div class="input-group">
														<input type="text" name="proCode" id="proCode" class="form-control" readonly="readonly">
															<div class="input-group-addon" id="fromSouSuo02" name="fromSouSuo02"
																style="background-color: white;">
																<span class="glyphicon glyphicon-search"
																	id="searchWarehouseName"></span>
															</div>
													</div>
												</div>
							                    <div class="form-group">
							                        <label>中文描述：</label>
							                        <input type="text" name="proName" id="proName" class="form-control" >
							                    </div>
							                    <div class="form-group">
							                        <label>生产批次：</label>
							                        <input type="text" name="proBatchNo" id="proBatchNo" class="form-control" >
							                    </div>
							                    
							                    <div class="form-group">
							                      	<label>生产日期：</label>
								                    <div class="input-group input-append date form_datetime" >
								                        <input type="text" class="form-control" value="" id="proPro" name="proPro" readonly>
								                        <div id ="proTime">
									                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                        </div>
								                    </div>
							                    </div>

							                    <div class="form-group">
							                        <label>入库日期：</label>
							                        <div class="input-group input-append date form_datetime" >
								                        <input type="text" class="form-control" value="" id="proStorage" name="proStorage" readonly>
								                        <div id="storageTime">
									                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
									                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
								                        </div>
								                    </div>
							                    </div>
							                    <div class="form-group">
							                        <label for="exampleInputPassword1">失效日期：</label>
							                        <div class="input-group input-append date form_datetime" >
							                        <input type="text" class="form-control" value="" id="proFail" name="proFail" readonly>
							                          <div id="failTime">
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							                          </div>
								                    </div>
							                    </div>
							                    <div class="form-group">
							                        <label for="exampleInputPassword1">库存状态：</label>
						                         	<select class="form-control" name="proState" id="proState"> 
														<option value="10">良品</option>
														<option value="20">残品</option>
						                         	</select>
							                    </div>
							                    <div class="form-group">                   							                    							                    <div class="form-group">
							                        <label for="exampleInputPassword1">推荐库位：</label>
							                        <input type="text" name="locationRecommend" id="locationRecommend" class="form-control" >
							                    </div>
												<div class="form-group">
							 						<label style="margin-top: 30px;">预计成品数量：</label>
				                       			 	<input type="text" name="proQty" id="proQty" class="form-control" maxlength="4" >
												</div>
												<div class="form-group">
							 					<label style="margin-top: 20px; width: 100px">单位：</label>
				                       			<select class="form-control" name="proUnit" id="proUnit"> 
				                       				<option value="个">个</option>
				                       				<option value="份">份</option>
				                       				<option value="件">件</option>
				                       				<option value="箱">箱</option>
				                       				<option value="瓶">瓶</option>
				                       				<option value="千克">千克</option>
				                       				<option value="克">克</option>
				                       			</select>
												</div>
							            </div>
							        </div>
							    </div>
							    </div>
							</div>
					<div class="modal-footer">
						<input type="hidden" id="rowId">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
						</button>
						<button id="btn_save_submit" type="button" name="btn_save_submit"
							class="btn btn-primary">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认原料转成品
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
    <!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/wms/warehouseinside/material.js" type="text/javascript"></script>
	    
    
</body>
</html>