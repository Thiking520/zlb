<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>

<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div>
			<ul class="breadcrumb">
				<li><a href="#">供应商管理</a></li>
				<li><a href="#">供应商管理</a></li>
			</ul>
		</div>
		<!-- 菜单位置导航ends -->

		<div>
			<div >
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>供应商管理>供应商管理
						</h2>
					</div>

					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
					<input id="contextPath" type="hidden" value="${contextPath}" />
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form id="addOrEditeSearchForm" class="form-inline" role="form"
								>

								<div class="form-group">
									<span>供应商名称：</span><input type="text"
										name="searchKeywordSuName" id="searchKeywordSuName"
										class="form-control input-small" style="width: 150px;" />
								</div>
								<div class="form-group">
									<span>商品类别：</span><input type="text" name="searchKeywordGoName"
										id="searchKeywordGoName" class="form-control input-small"
										style="width: 150px;">
								</div>
								<div class="form-group">
									<span>审核状态：</span> <select id="sele_search_suState"
										class="form-control">
										<option value="">全部</option>
										<option value="NEW">未审批</option>
										<option value="WPA">待经理审批</option>
										<option value="WFA">待财务审批</option>
										<option value="APP">审批通过</option>
										<option value="REJ">已驳回</option>
									</select>
								</div>
								<button id="btn_search_moreCondition"
									class="btn btn-success btn-flat" type="button">搜索</button>
								<div class="form-group">
									<button class="btn btn-primary btn-flat"
										type="reset">清空</button>
								</div>
							</form>
						</div>
						<!-- 表单查询区域end -->

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button type="reset" class="btn btn-default  btn-sm"
									id="btn_add">
									<span class="glyphicon glyphicon-plus" style="color: green;"></span>新增
								</button>
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

	<!-- 新建 -->
<form id="addSupplierForm" method="post" role="form" target="_blank"
	class="form-horizontal">
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" style="width: 1200px" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">新增供应商</h4>
				</div>
				<!-- modal-header end -->

				<div class="modal-body">
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="supplier" class="col-sm-3 control-label"><span class="text-required">*</span>供应商名称：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="supplier"  check-name-exist-id="" name="supplier" placeholder="请输供应商名称">
						</div>
					</div>
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="contactPeople" class="col-sm-3 control-label"><span class="text-required">*</span>联系人：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="contactPeople" name="contactPeople" placeholder="请输联系人名字">
						</div>
					</div>
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="contactPhone" class="col-sm-3 control-label"><span class="text-required">*</span>联系电话：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="contactPhone" name="contactPhone" placeholder="请输入联系电话">
						</div>
					</div>
					
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="contactAddress" class="col-sm-3 control-label">联系地址：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="contactAddress" name="contactAddress" placeholder="请输入联系地址">
						</div>
					</div>
					
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="email" class="col-sm-3 control-label">电子邮箱：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly" 
							id="email" name="email" placeholder="请输入电子邮箱">
						</div>
					</div>
					
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="bankName" class="col-sm-3 control-label">开户行：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="bankName" name="bankName" placeholder="请输入开户行">
						</div>
					</div>
					
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="accountNumber" class="col-sm-3 control-label">收款账号：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="accountNumber" name="accountNumber" placeholder="请输入收款账号">
						</div>
					</div>
					
					<div class="form-group" style="display:inline-block; width: 50%;height: 40px;">
						<label for="accountName" class="col-sm-3 control-label">户名：</label>
						<div class="col-sm-8">
							<input type="text" class="form-control input-small t-readonly"
								id="accountName" name="accountName" placeholder="请输入户名">
						</div>
					</div>

					<div class="form-group">
						<label for="license" class="col-sm-2 control-label">营业执照：</label>
						<div class="col-sm-10">
							<input type="hidden" id="license" /> <img id="imageShow"
								class="thumbnail"
								style="width: 200px; height: 200px; margin: 0px 0px 5px;"
								src="${contextPath}/resources/img/no_image.jpg" /> <input
								type="file" id="imgFile" name="imgFile" multiple />
								<div id="pgsbar" class="progress progress-striped active"
								style="margin-top: 5px; height: 10px; width: 200px; float: left; visibility: hidden;">
								<div id="pgsbarColor" class="progress-bar progress-bar-success"
									role="progressbar" aria-valuenow="60" aria-valuemin="0"
									aria-valuemax="100" style="width: 0%;"></div>
							</div>
						</div>
					</div>
						<div class="form-group">
						<label for="contractCopy_1" class="col-sm-1 control-label">合同附件：</label>
						<div class="col-sm-3" style="width: 22%;">
							<input type="hidden" id="contractCopy_1" /> <img id="imageShow1"
								class="thumbnail lazy"
								style="margin-bottom: 5px; width: 200px; height: 200px; margin: 0px;"
								src="${contextPath}/resources/img/no_image.jpg" /> <input
								type="file" id="imgFile1" name="imgFile1" multiple />
							<div id="pgsbar1" class="progress progress-striped active"
								style="margin-top: 5px; height: 10px; width: 200px; float: left; visibility: hidden;">
								<div id="pgsbarColor1"
									class="progress-bar progress-bar-success" role="progressbar"
									aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									style="width: 0%;"></div>
							</div>
						</div>
						<div class="col-sm-3" style="width: 22%;">
							<input type="hidden" id="contractCopy_2" /> <img id="imageShow2"
								class="thumbnail"
								style="margin-bottom: 5px; width: 200px; height: 200px; margin: 0px;"
								src="${contextPath}/resources/img/no_image.jpg" /> <input
								type="file" id="imgFile2" name="imgFile2" multiple />
							<div id="pgsbar2" class="progress progress-striped active"
								style="margin-top: 5px; height: 10px; width: 200px; float: left; visibility: hidden;">
								<div id="pgsbarColor2"
									class="progress-bar progress-bar-success" role="progressbar"
									aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									style="width: 0%;"></div>
							</div>
						</div>
						<div class="col-sm-3" style="width: 22%;">
							<input type="hidden" id="contractCopy_3" /> <img id="imageShow3"
								class="thumbnail"
								style="margin-bottom: 5px; width: 200px; height: 200px; margin: 0px;"
								src="${contextPath}/resources/img/no_image.jpg" /> <input
								type="file" id="imgFile3" name="imgFile3" multiple />
							<div id="pgsbar3" class="progress progress-striped active"
								style="margin-top: 5px; height: 10px; width: 200px; float: left; visibility: hidden;">
								<div id="pgsbarColor3"
									class="progress-bar progress-bar-success" role="progressbar"
									aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									style="width: 0%;"></div>
							</div>
						</div>
						<div class="col-sm-2" style="width: 22%;">
							<input type="hidden" id="contractCopy_4" /> <img id="imageShow4"
								class="thumbnail"
								style="margin-bottom: 5px; width: 200px; height: 200px; margin: 0px;"
								src="${contextPath}/resources/img/no_image.jpg" /> <input
								type="file" id="imgFile4" name="imgFile4" multiple />
							<div id="pgsbar4" class="progress progress-striped active"
								style="margin-top: 5px; height: 10px; width: 200px; float: left; visibility: hidden;">
								<div id="pgsbarColor4"
									class="progress-bar progress-bar-success" role="progressbar"
									aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									style="width: 0%;"></div>
							</div>
						</div>
					</div>
					<div id="hideDIv" style="display: none;">
			            <input id="goodsTypeNames" class="form-control input-small"
							style="width: 200px; height: 35px" type="text">
			            <input id="goodsTypeCodes" class="form-control input-small"
								style="width: 200px; height: 35px" type="text"> 
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label">商品分类：</label>
						<div class="col-sm-4">
							<div id="goodsTypeBindingNoSelected"
								style="border: 2px solid #000; overflow: auto; height: 225px; width: 380px;"></div>
						</div>
						<label class="col-sm-2 control-label"><span class="text-required">*</span>已选分类：</label>
						<div class="col-sm-4">
							<div id="goodsTypeBindingSelected"
								style="border: 2px solid #000; overflow: auto; height: 225px; width: 380px;"></div>
						</div>
					</div>
			</div>
			<!-- modal-body end -->
				<div class="modal-footer" style="text-align: center;">
					<button id="btn_submit" type="button" class="btn btn-primary"
						style="width: 150px">
						<span aria-hidden="true"></span>提交审批
					</button>
					<button id="btn_save" type="button"
						class="btn btn-primary" style="width: 150px">
						<span class="glyphicon glyphicon-floppy-disk"></span>保存
					</button>
					<button id="btn_cancel" type="button" data-dismiss="modal" class="btn btn-default"
						style="width: 150px">
						<span class="glyphicon" aria-hidden="true"></span>取消
					</button>
			</div>
			<!-- modal-footer end -->
			</div>
	</div>
</div>
</form>

<!-- 查看供应商 -->

<div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		    <div class="modal-dialog" style="width:1000px" role="document">
		      <div class="modal-content">
		      
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			          <h4 class="modal-title" id="myModalLabel">查看供应商信息</h4>
			        </div>
			        <!-- end header -->
			        
			         <div class="modal-body">
							<table style="width: 950px; height: azimuth; border: 1px; text-align: left;" class="table table-bordered table-hover table-striped">
								<tr>
									<td>供应商名称</td>
									<td><span id="supplier_show"></span></td>
									<td>联系人</td>
									<td><span id="contactPeople_show" ></span></td>
								</tr>
								<tr>
									<td>联系电话</td>
									<td><span id="contactPhone_show" ></span></td>
									<td>联系地址</td>
									<td><span id="contactAddress_show" ></span></td>
								</tr>
								<tr>
									<td>电子邮箱</td>
									<td><span id="email_show" ></span></td>
									<td>开户行</td>
									<td><span id="bankName_show" ></span></td>
								</tr>
								<tr>
									<td>收款账号</td>
									<td><span id="accountNumber_show" ></span></td>
									<td>户名</td>
									<td><span id="accountName_show" ></span></td>
								</tr>
								<tr>
									<td>条码</td>
									<td><span id="tiaomaId_show" ></span></td>
									<td></td>
									<td><span></span></td>
								</tr>								
								<tr>
									<td>营业执照</td>
									<td colspan="3">
										<img id="imageShow_show" class="thumbnail" style="width: 200px; height: 200px; margin: 0px 0px 5px;" src="${contextPath}/resources/img/no_image.jpg"/>
									</td>
								</tr>
								<tr>
									<td colspan="4">合同复印件</td>
								</tr>
								<tr>
									<td colspan="4">
									 <div class="form-group">
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow1_show" class="thumbnail lazy" style="margin:5px;width:200px;height:200px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div>
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow2_show" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div> 
										 <div class="col-sm-3" style="width: 24%;">
											<img id="imageShow3_show" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										 </div>
										<div class="col-sm-3" style="width: 24%;">
											<img id="imageShow4_show" class="thumbnail lazy" style="width:200px;height:200px;margin:5px;" src="${contextPath}/resources/img/no_image.jpg"/>
										</div>
									</div>	
									</td>
								</tr>
								
								
							</table>
					</div>
						
			        <div class="modal-footer" style="text-align: center;">
				          <button id="btn_cancel" type="button" class="btn btn-default" data-dismiss="modal" style="width: 150px">
								<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
							</button>
			        </div>
			        <!-- end footer -->
			        
		        </div>
		        <!-- modal-content -->
		        
		      </div>
		    </div>
		    
	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<!-- 七牛正式环境 -->
	<script
		src="${contextPath}/resources/charisma-master/bower_components/plupload/plupload.full.min.js"></script>
	<script
		src="${contextPath}/resources/charisma-master/bower_components/qiniu/qiniu.min.js"></script>
	<!-- 自己功能模块的外部JS -->
	<script src="${contextPath}/resources/js/business/pms/supplierList.js"
		type="text/javascript"></script>
</body>
</html>

