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
		<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2>
							<i class="glyphicon glyphicon-user"></i>供应商管理>供应信息
						</h2>
					</div>
					<!-- 每个人只用关注这块区域starts -->
					<!-- 隐藏路径 -->
					<input type="hidden" value="${contextPath}" id="contextPath" />
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">
							<form id="addOrEditeSearchForm" role="form" class="form-inline">
								<div class="controls controls-row">
										<!-- 条件查询区one -->
										<div class="form-group">
											<span>商品名称：</span><input type="text" id="goodsName_tabOne"
												class="form-control input-small"/>
										</div>
										<div class="form-group">
											<span>商品编码：</span><input type="text" id="goodsCode_tabOne"
												class="form-control input-small"/>
										</div>
										<div class="form-group">
											<span>供应商名称：</span><input type="text" id="supplierNameOne"
												class="form-control input-small"/>
										</div>
										<div class="form-group">
											<button id="btn_search_listTable"
												class="btn btn-success btn-flat" type="button">搜索</button>
											<button class="btn btn-primary btn-flat"
												type="reset">清空</button>
<!-- 											<button id="btn_search_all" class="btn btn-success btn-flat" -->
<!-- 												type="button">显示所有商品</button> -->
<!-- 											<button id="btn_updateOriginal_all" -->
<!-- 												class="btn btn-success btn-flat" type="button">获取原始商品</button> -->
										</div>
								</div>
							</form>
						</div>
						<!-- 表单查询区域end -->
						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">
							<div class="table_nav">
							<div id="toolbar" class="btn-group">
								<button id="updateMoreSupplier" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-time" style="color: green;"></span>更新供应信息</button>
								<button id="btn_search_updateJob_all" class="btn btn-default  btn-sm" type="button"><span class="glyphicon glyphicon-refresh" style="color: green;"></span>执行更新计划<span style="font-size: 12px;">（小于等于当前时间）</span></button>
							</div>
							</div>
							<table id="listTable" class="table table-hover table-striped table-bordered">

							</table>
						</div>
						<!-- 分页列表区域ends -->
						<!-- =========== 弹出多个更新供应信息窗口 start =================== -->
						<!-- 按钮触发模态框 -->

						<!-- 模态框one -->
						<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
							aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog"
								style="overflow: auto; width: 80%; height: 90%;">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true">&times;</button>
										<h4 class="modal-title" id="myModalLabel">更新供应信息</h4>
									</div>
									<form>
										<div class="modal-body"
											style="width: 100%; height: 100%; text-align: center;">
											<!-- 在这里添加一些文本========== 弹窗内容 start ========== -->
											<!-- 条件查询区two -->
											<table id="updateGoodsSupply_more"
												style="width: 100%; height: azimuth; text-align: center;">
												<!-- <tr style="text-align: right;">
													<td>
														<div class="form-group">
															<span>商品名称：</span><input type="text"
																id="goodsName_tabTwo" class="form-control input-small"
																style="width: 150px;" />
														</div>
													</td>
													<td>
														<div class="form-group">
															<span>商品编码：</span><input type="text"
																id="goodsCode_tabTwo" class="form-control input-small"
																style="width: 150px;" />
														</div>
													</td>
													<td></td>
													<td>
														<div class="form-group">
															<span>供应商名称：</span><input type="text"
																id="supplierName_tabTwo"
																class="form-control input-small" style="width: 150px;" />
														</div>
													</td>
												</tr>
												<tr style="text-align: right;">
													<td>
														<div class="form-group">
															<span>商品类别：</span><input type="text"
																id="goodsType_tabTwo" class="form-control input-small"
																style="width: 150px;" />
														</div>
													</td>
													<td><div class="form-group">
															<span>最近<span style="visibility: hidden;">：</span></span><input
																type="text" id="recentlyDay_tabTwo"
																class="form-control input-small" style="width: 150px;" />
														</div></td>
													<td style="text-align: left;"><span>未更新</span></td>
													<td style="text-align: center;">
														<div class="form-group">
															<button id="btn_search_listTableTwo"
																class="btn btn-success btn-flat" type="button">查询</button>
														</div>
														<div class="form-group">
															<button id="btn_clear_all"
																class="btn btn-success btn-flat" type="reset">清空</button>
														</div>
													</td>
												</tr> -->
												<tr>
													<td colspan="4">
														<!-- 分页列表区域begin -->
														<div role="grid" class="box-body table-responsive">
															<table id="listTableTwo"
																class="table table-hover table-striped table-bordered">
															</table>
														</div>
													</td>
												</tr>
												<tr>
													<td colspan="4" align="center">
														<table>
															<tr>
																<td>
																	<div class="row">
														                <p class="col-md-2" style="width:100.8px;text-align: right;line-height:43px;">更新日期：</p>
														                <div class="input-group input-append date form_datetime" style="width:250px;">
																      		<input class="form-control updateDate" value=""
																					id="updateDate_more" whetherChange="true"
																					name="orderDateStart" readonly="" type="text">
																			<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
														                    <span class="input-group-addon removeId"><span class="glyphicon glyphicon-remove"></span></span>
								                						</div>
								                						
																	</div>
																	<div class="modal-footer" style="text-align: center;border: 0px" >
																		<button id="goodsUpdate_more_submit" type="button"
																			class="btn btn-primary">提交更改</button>
																		<button id="goodsUpdate_more_save" type="button"
																			class="btn btn-primary">保存</button>
																		<button type="reset"
																			class="btn btn-default" data-dismiss="modal">取消</button>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- 分页列表区域ends========== 弹窗内容 end ========== -->

										</div>

									</form>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal -->
						</div>
						<!-- =========== 弹出更新供应信息窗口 end =================== -->



						<!-- 模态框tow -->
						<!-- 弹出某个相应的商品信息模态框 start -->
						<div class="modal fade" id="myModalTwo" tabindex="-1"
							role="dialog" aria-labelledby="myModalLabel"
							style="text-align: center;" aria-hidden="true">
							<div class="modal-dialog" style="width: 1300px; height: 70%;">
								<div class="modal-content" style="text-align: center;">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true">&times;</button>
										<h4 class="modal-title" id="myModalLabel">变更记录</h4>
									</div>
									<div class="modal-body">
										<!-- ====================在这里添加一些文本==================== -->
										<table
											style="width: 1000px; height: azimuth; border: 1px; text-align: left;">
											<tr>
												<td><p>
														<span>商品名称：<span id="particular_goodsName"></span></span>
													</p></td>
												<td><p>
														<span>商品单位：<span id="particular_goodsUnit"></span></span>
													</p></td>
												<td><p>
														<span>商品类型：<span id="particular_goodsType"></span></span>
													</p></td>
											</tr>
											<tr>
												<td><p>
														<span>历史最高价：<span id="particular_maxPrice"></span></span>
													</p></td>
												<td><p>
														<span>历史最低价：<span id="particular_minPrice"></span></span>
													</p></td>
												<td><p>
														<span>历史平均价：<span id="particular_avgPrice"></span></span>
													</p></td>
											</tr>
											<tr>
												<td><p>
														<span>当前价格：<span id="particular_goodsPrice"></span></span>
													</p></td>
												<td><p>
														<span>当前供应商：<span id="particular_supplierName"></span></span>
													</p></td>
												<td style="display: none;">
												<input type="text" id="goodsTypeIdOne" value="" />
												<input type="text" id="jobState" value="" />
												</td>
											</tr>
											<tr>
												<td><p>
														<span>下次变更供应商：<span id="particular_updateSupplier"></span></span>
													</p></td>
												<td><p>
														<span>下次变更时间：<span id="particular_updatePlanTime"></span></span>
													</p></td>
												<td><p>
														<span>下次变更价格：<span id="particular_updatePrice"></span></span>
													</p></td>
											</tr>
											<tr>
												<td colspan="3">

													<div role="grid" class="box-body table-responsive">
														<table id="listTableThree"
															class="table table-hover table-striped table-bordered">

														</table>
													</div>
												</td>
											</tr>
											<tr>
												<td colspan="3">
													<!-- 表单查询区域begin -->
													<table id="updateGoodsSupply_one"
														class="table table-hover table-striped table-bordered">
														<caption>更新供应信息</caption>
														<tbody>
															<tr>
																<td>
																	<div class="form-group" style="width: 250px;">
																		<span style="display: inline;">更新供应商：</span><input
																			id="choose_search_optoin_supplier" type="text"
																			class="form-control input-small supplierSelect updateSupplier"
																			style="width: 150px;background-color:white;display: inline;" />
																	</div>
																</td>
																<td>
																	<div class="form-group" style="width: 250px;">
																		<span style="display: inline;">更新供应价格：</span><input type="text"
																			ifBinDing="false" id="updataSupplyPrice"
																			class="form-control input-small updatePrice"
																			style="width: 150px;display: inline;"/>
																	</div>
																</td>
																<td>
																	<div class="row">
														                <p class="col-md-2" style="width:100.8px;text-align: right;line-height:43px;">更新日期：</p>
														                <div class="input-group input-append date form_datetime" style="width:250px;">
																      		<input class="form-control updateDate" value=""
																					id="updateDate_one" ifBinDing="false"
																					name="orderDateStart" readonly="" type="text">
																			<span id="updateDate_one_sp1" class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
														                    <span id="updateDate_one_sp2" class="input-group-addon removeId"><span class="glyphicon glyphicon-remove"></span></span>
								                						</div>
								                						
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</table>
										<!-- ====================在这里添加一些文本==================== -->
									</div>
									<div class="modal-footer" style="text-align: center;">
										<button style="width: 150px" id="goodsUpdate_one_save"
											type="button" class="btn btn-primary">保存更新计划</button>
										<button style="width: 150px" id="goodsUpdate_one_submit"
											type="button" class="btn btn-primary">提交更新计划</button>
										<button style="width: 150px" type="button"
											class="btn btn-default" data-dismiss="modal">取消</button>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal -->
						</div>
						<!-- 弹出某个相应的商品信息模态框 end -->

						<!-- 模态框three -->
						<!-- 隐藏供应商选择模态框（商品供应商选择） start -->
						<div class="modal fade" id="myModalThree" tabindex="-1"
							param="dialog" aria-labelledby="myModalLabel">
							<div class="modal-dialog" param="document"
								style="width: 1150px; height: 70%;">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-label="Close">
											<span aria-hidden="true">×</span>
										</button>
										<h4 class="modal-title">选择供应商</h4>
									</div>
									<!-- 条件查询区four -->
									<div class="col-md-12 form-inline" style="margin-top:8px;margin-bottom: 8px;">
										<div class="col-md-11 form-inline">
											供应商名称：<div class="input-group">
															<input type="text" id=supplier_tabFour
											class="form-control input-small" style="width: 150px;" placeholder="输入供应商名称" />
															<div class="form-group" style="margin-left:5px;">
																<button id="btn_search_listTableFour"
																	class="btn btn-success btn-flat" type="button">搜索</button>
															</div>
													</div>
										</div>
									</div>
									
									
									
									
									<!-- 分页表格 -->
									<div role="grid" class="box-body table-responsive"
										style='margin-right: 15px;'>
										<table id="listTableFour"
											class="table table-hover table-striped table-bordered">
										</table>
									</div>
									<!-- 某个商品选择供应商时，保存当商品商品类型（二级分类），用作查询条件。 -->
									<input type="hidden" id="goodsType" value="" />
									<!-- 某个商品选择供应商时，保存当商品商品类型的父类（一级分类），用作查询条件。 -->
									<input type="hidden" id="goodsTypeParentId" value="" />
									<!-- <div class="modal-body" id="suppliersOption" style="overflow:auto;width: 500px;height: 200px;">
					
				</div> -->
									<div class="modal-footer">
										<button id="btn_supplier_confirm" type="button" name="submit"
											class="btn btn-primary">确定</button>
									</div>
								</div>
							</div>
						</div>
						<!-- 隐藏供应商单选按钮模态框（商品供应商选择） end -->
					</div>
				</div>
		</div>
	</div>


	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
	<!-- 自己功能模块的外部JS -->
	<script
		src="${contextPath}/resources/js/business/pms/goodsSupplyManager.js"
		type="text/javascript"></script>
</body>
</html>
