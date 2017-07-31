<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../common/commonCss.jsp"%>
<link href="${contextPath}/resources/css/tms/dispatchManage.css"
	rel="stylesheet" />
<style type="text/css">

</style>
</head>
<body>
<div id="content" >
		<!-- 菜单位置导航starts -->
		<div>
			<div>
				<div class="box-inner">
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>配送管理>调度管理</h2>
						<%@include file="myDistributionSite.jsp"%>
					</div>
					
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<div class="table_nav">
							<form role="form" class="form-inline" id="searchForm" action="#" onSubmit="return false;" method="get">
								<div class="controls controls-row">
									<div class="form-group">
										<ul class="collapse navbar-collapse nav nav-pills" id="myTab" style="width: 230px;">
											<li class="active" data-toggle="tab"><a href="#info">地图排线</a></li>
											<li ><a href="#todayFlatCable" data-toggle="tab">今日排线</a></li>
										</ul>
									</div>
									<div class="form-group">
									    <select id="topCitySelect" class="form-control" disabled="disabled" style="width: 130px;">
										</select>
							        </div>
								    <div class="form-group">
						        	    <select id="topAreaSelect" class="form-control" style="width: 130px;">
							    		</select>
						            </div>
						      </div>
							</form>
						</div>
						<div id="myTabContent" class="tab-content">
							<div class="tab-pane fade in active"id="info">
								<!-- 全部主体地图表格开始 -->
								<!-- 下拉框体开始 -->
								<div style="width: 100%; min-height: 850px;">
									<!-- 左边baidu地图开始 -->
									<div id="allmap" class="col-md-9" style="height: 800px;"></div>
									<!-- 左边baidu地图结束 -->
									<!-- 右边地址详情开始 -->
									<div class="col-md-3">
										<table id="rightWayBillList" class="table table-striped table-bordered bootstrap-datatable responsive" style="width: 100%;">

										</table>
										<div>
											<a id="btnQueryWayBillGoods" href="" data-toggle="modal">查看货品明细</a>
										</div>
									</div>
									<!-- 右边地址详情结束 -->
									<div class="col-md-3" style="margin-top: 100px;">
										<p>
											<a href="">合计</a>
										</p>
										<p>
											运单总数： <span id="waybill_count_right"
												style="font-family: times; color: blue"></span>
										</p>
										<p>
											货品总数： <span id="goods_count_right"
												style="font-family: times; color: blue"></span>
										</p>
										<p>
											大约总重量（千克）： <span id="weight_total_right"
												style="font-family: times; color: blue"></span>
										</p>
										<button class="btn btn-primary btn-sm" data-toggle="modal"
											id="addFlatCable">生成路线</button>
										<button id="addToExistFlatCable"
											class="btn btn-primary btn-sm" data-toggle="modal">并到已有的路线</button>
									</div>
								</div>
								<!-- 全部主体地图表格结束 -->
							</div>
							<!-- 切换后今日排线列表开始 -->
							<div role="grid" class="box-body table-responsive fade" id="todayFlatCable">
								<table class="table table-bordered table-hover table-condensed" id="flatCableList" >
								</table>
							</div>
							<!-- 切换后今日排线列表结束 -->
						</div>

					</div>
					<!-- 每个人只用关注这块区域starts -->	
					
				</div>
			</div>
		</div>
		<!-- 菜单位置导航ends -->
</div>


<!-- 点击详情时的弹出框开始 -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		style="overflow: auto;">
		<div class="modal-dialog" style="width: 1400px; margin: 50px auto;">
			<div class="modal-content">
				<div class="modal-header" style="border-bottom: 0px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<ul class="nav nav-tabs" id="myTab">
						<li class="active"><a href="#info1">基本信息</a></li>
						<li><a href="#custom1">货品明细</a></li>
					</ul>
				</div>
				<!-- 中间的资料开始 -->
				<div class="modal-body" style="padding-top: 0px;">

					<div id="myTabContent" class="tab-content">
						<!-- 运输编辑页面开始 -->
						<div class="tab-pane active" id="info1">
							<form id="lookDetail_form">
								<table id="lookDetail_tab"
									class="table table-striped bootstrap-datatable responsive"
									style="margin-top: 10px;">
									<tbody>
										<!-- 第一行开始 -->
										<tr>
											<td colspan="8" style="background-color: #FF8C69;">运单信息</td>

										</tr>
										<tr>
											<td>运单号：</td>
											<td class="center"><input type="text"
												name="disChildWaybillId" id="disChildWaybillId"
												disabled="disabled" class="form-control"
												style="width: 200px; height: 30px;"></td>

											<td class="center">分段运单：</td>
											<td class="center">
												<div class="control-group col-md-1" style="border: none;">
													<div class="form-control" style="border: none;">
														<select style="border-radius: 5px; width: 200px;"
															disabled="disabled" class="form-control"
															id="isSubsection" name="isSubsection">
															<option value="0">否</option>
															<option value="1">是</option>
														</select>
													</div>
												</div>
											</td>

											<td style="min-width: 80px;">运单状态：</td>
											<td>
												<div class="control-group col-md-1">
													<div class="controls" style="border: none;">
														<select style="border-radius: 5px; width: 200px;"
															disabled="disabled" class="form-control"
															name="childWalbillStatus" id="childWalbillStatus">
															<option value="10">新建</option>
															<option value="20">已确认</option>
															<option value="30">已揽收</option>
															<option value="50">在途中</option>
															<option value="98">已取消</option>
															<option value="99">已签收</option>
														</select>
													</div>
												</div>
											</td>

											<td class="center">配送分类：</td>
											<td class="center">
												<div class="control-group col-md-1" style="border: none;">
													<div class="form-control" style="border: none;">
														<select style="border-radius: 5px; width: 200px;"
															disabled="disabled" class="form-control" id="waybillType"
															name="waybillType">
															<option value="10">揽收件</option>
															<option value="20">配送件</option>
														</select>
													</div>
												</div>
											</td>
										</tr>
										<!-- 第一行结束 -->




										<!-- 第二行开始 -->
										<tr>
											<td style="min-width: 80px;">运营站点：</td>
											<td><input type="text" class="form-control"
												name="operationSiteName" id="operationSiteName"
												disabled="disabled" style="width: 200px; height: 30px;"></td>

											<td style="min-width: 80px;">发货站点：</td>
											<td><input type="text" class="form-control"
												name="deliverSiteName" id="deliverSiteName"
												disabled="disabled" style="width: 200px; height: 30px;"></td>
											<td style="min-width: 80px;">收货站点：</td>
											<td><input type="text" class="form-control"
												name="takeSiteName" id="takeSiteName" disabled="disabled"
												style="width: 200px; height: 30px;"></td>

											<td>线路：</td>
											<td class="center"><input type="text"
												name="cableDescribe" id="cableDescribe1111"
												disabled="disabled" class="form-control"
												style="width: 200px; height: 30px;"></td>
										</tr>
										<!-- 第二行结束 -->



										<!-- 第三行开始 -->
										<tr>
											<td class="center">面单打印状态：</td>
											<td class="center">
												<div class="control-group col-md-1" style="border: none;">
													<div class="controls" style="border: none;">
														<select style="border-radius: 5px; width: 200px;"
															disabled="disabled" class="form-control" id="printStatus"
															name="printStatus">
															<option value="0">未打印</option>
															<option value="1">已打印</option>
														</select>
													</div>
												</div>
											</td>
											<td class="center">订单优先级：</td>
											<td class="center"><input type="text" id="priority"
												disabled="disabled" name="priority" class="form-control"
												style="width: 200px; height: 30px;"></td>

											<td class="center">总重量：</td>
											<td class="center"><input type="text" id="zhongliang"
												disabled="disabled" name="zhongliang" class="form-control"
												style="width: 200px; height: 30px;"></td>

											<td class="center">总体积：</td>
											<td class="center"><input type="text" id="tiji"
												disabled="disabled" name="tiji" class="form-control"
												style="width: 200px; height: 30px;"></td>


										</tr>
										<!-- 第三行结束 -->
										<tr>
											<td colspan="8" class="text-success"
												style="background-color: #FF8C69;">订单信息</td>

										</tr>

										<!-- 第四行开始 -->
										<tr>

											<td class="center">订单类型：</td>
											<td class="center">
												<div class="control-group col-md-1" style="border: none;">
													<div class="controls" style="border: none;">
														<select style="border-radius: 5px; width: 200px;"
															disabled="disabled" class="form-control" id="orderType"
															name="orderType" disable="true">
															<option value="10">销售订单</option>
															<option value="20">退货订单</option>
															<option value="30">换货订单</option>
															<option value="40">调货订单</option>
														</select>
													</div>
												</div>
											</td>
											<td class="center">订单号：</td>
											<td class="center"><input type="text" name="orderId"
												disabled="disabled" id="orderId" class="form-control"
												style="width: 200px; height: 30px;"></td>

											<td>下单时间：</td>
											<td class="center"><input type="text" name="saleTime"
												disabled="disabled" id="saleTime" class="form-control"
												style="width: 200px; height: 30px;"></td>

											<!-- 											<td class="center">要求送货日期：</td> -->
											<!-- 											<td class="center"><input type="text" -->
											<!-- 												name="deliveryTime" id="deliveryTime" class="form-control" -->
											<!-- 												disabled="disabled" style="width: 200px; height: 30px;"></td> -->
											<td class="center">要求送货时间：</td>
											<td class="center"><input type="text" name="arrivalTime"
												id="arrivalTime" class="form-control" disabled="disabled"
												style="width: 200px; height: 30px;"></td>
										</tr>
										<!-- 第四行结束 -->


										<!-- 第五行开始 -->
										<tr>
											<td colspan="8" class="text-success"
												style="background-color: #FF8C69;">收件地址信息</td>

										</tr>
										<!-- 第五行结束 -->
										<!-- 第六行开始 -->
										<tr>
											<td>收件人公司：</td>
											<td class="center"><input type="text"
												name="consumerCompany" id="consumerCompany"
												disabled="disabled" class="form-control"
												style="width: 200px; height: 30px;"></td>
											<td class="center">收件人姓名：</td>
											<td class="center"><input type="text"
												disabled="disabled" name="consumerName" id="consumerName"
												class="form-control" style="width: 200px; height: 30px;"></td>
											<td class="center">收件人电子邮箱：</td>
											<td class="center"><input type="text"
												name="consumerEmail" id="consumerEmail" disabled="disabled"
												class="form-control" style="width: 200px; height: 30px;">
											</td>
											<td class="center">收件人手机：</td>
											<td class="center"><input type="text"
												disabled="disabled" name="consumerMobile"
												id="consumerMobile" class="form-control"
												style="width: 200px; height: 30px;"></td>
										</tr>
										<!-- 第六行结束 -->

										<!-- 第七行开始 -->
										<tr>
											<td>收件人地址：</td>
											<td colspan="3" class="center"><input type="text"
												disabled="disabled" name="consumerAddress"
												id="consumerAddress" class="form-control"
												style="width: 600px; height: 30px;"></td>
											<td class="center"></td>
											<td class="center"></td>
											<td class="center"></td>
											<td class="center"></td>
											<td class="center"></td>
											<td class="center"></td>
										</tr>
										<!-- 第七行结束 -->
									</tbody>
								</table>
							</form>

						</div>
						<!-- 运输编辑页面结束 -->
						<!-- 弹框货品明细页开始 -->
						<div class="tab-pane" id="custom1">
							<!-- 上部分的详细数据开始 -->
							<div class="box-content" style="width: 100%; overflow-x: auto;">
								<table id="goodsDetail_tab"
									class="table table-bordered bootstrap-datatable L_goods_detailed">

								</table>

							</div>

							<!-- 上部分的详细数据结束 -->
							<!-- 下部分的详细数据开始 -->
							<div style="width: 100%; height: 400px;" id="L_fill_exhibition">

								<div class="col-md-3 L_mail">
									<p style="margin-top: 10px;">
										运单号：&nbsp;&nbsp;<input class="form-control L_int_one6"
											type="text" name="disChildWaybillId" readonly="true">
									</p>

									<p style="margin-top: 10px;">
										商品编码：&nbsp;&nbsp;<input class="form-control L_int_one2"
											type="text" name="goodsCode" readonly="true">
									</p>

									<p style="margin-top: 10px;">
										重量：&nbsp;&nbsp;<input class="form-control L_int_one4"
											type="text" name="weight" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										签收数量：&nbsp;&nbsp;<input class="form-control L_int_one5"
											type="text" name="sendMode" readonly="true">
									</p>
								</div>
								<div class="col-md-3">
									<p style="margin-top: 10px;">
										默认包装：&nbsp;&nbsp;<input class="form-control L_int_one18"
											type="text" name="packType" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										商品名称：&nbsp;&nbsp;<input class="form-control L_int_one7"
											type="text" name="goodsName" readonly="true">
									</p>

									<p style="margin-top: 10px;">
										体积：&nbsp;&nbsp;<input class="form-control L_int_one13"
											type="text" name="volume" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										途损数量：&nbsp;&nbsp;<input class="form-control L_int_one18"
											type="text" name="tuNumbei" readonly="true">
									</p>

								</div>
								<div class="col-md-3">
									<p style="margin-top: 10px;">
										件型：&nbsp;&nbsp;<input class="form-control L_int_one10"
											type="text" name="sizeType" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										货品分类：&nbsp;&nbsp;<input class="form-control L_int_one14"
											type="text" name="goodsTypeName" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										数量：&nbsp;&nbsp;<input class="form-control L_int_one12"
											type="text" name="amount" readonly="true">
									</p>


								</div>
								<div class="col-md-3">
									<p style="margin-top: 10px;">
										配送分类：&nbsp;&nbsp;<input class="form-control L_int_one5"
											type="text" name="sendMode" readonly="true">
									</p>
									<p style="margin-top: 10px;">
										规格：&nbsp;&nbsp;<input class="form-control L_int_one15"
											type="text" name="skuName" readonly="true">
									</p>

									<p style="margin-top: 10px;">
										数量单位：&nbsp;&nbsp;<input class="form-control L_int_one16"
											type="text" name="unit" readonly="true">
									</p>


								</div>
							</div>
							<!-- 下部分的详细数据结束 -->
						</div>
						<!-- 弹框货品明细页结束 -->
					</div>

				</div>
				<!-- 中间的资料结束 -->
				<div class="modal-footer">
					<button class="btn btn-primary" id="btn_look_show_sign"
						style="margin-left: 20px;">签收</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消
					</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 点击详情时的弹出框结束 -->
	<!-- 点击查看货品明细的弹出框开始 -->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 80%; margin: 50px auto;">
			<div class="modal-content">

				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<!-- 货品明细列表开始 -->
				<div class="modal-body">

					<table id="goodsList" class="table table-striped table-bordered bootstrap-datatable responsive L_Eeject_two">


					</table>
					<p>
						<span>运单总数：</span><span id="waybill_count_goods_list"
							style="font-family: times; color: blue"> </span>&nbsp;&nbsp;&nbsp;
						<span>大约总重量（千克）: </span><span id="weight_total_goods_list"
							style="font-family: times; color: blue"></span>
						&nbsp;&nbsp;&nbsp;<span>货品总数：</span><span
							id="goods_count_goods_list"
							style="font-family: times; color: blue"></span>
						&nbsp;&nbsp;&nbsp;<span> 配送分类：</span><span
							id="send_mode_goods_list" style="font-family: times; color: blue">
							冷藏 + 冷冻</span> &nbsp;&nbsp;&nbsp;<span>件型分类：</span> <span
							id="size_type_goods_list" style="font-family: times; color: blue">中件
							+ 小件</span>
					</p>
				</div>
				<!-- 货品明细列表结束 -->
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">知道了
					</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 点击查看货品明细的弹出框结束 -->
	<!-- 点击生成路线的弹出框开始 -->
	<form role="form"  id="flatCableForm" action="#"
								onSubmit="return false;" method="get">
	<div class="modal fade" id="addFlatCableModal" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog"
			style="width: 900px; margin: 50px auto; z-index: 999999999;">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<!-- 创建路线信息开始 -->
				<div class="modal-body">
					<!-- 订单信息开始 -->
					<div style="width: 100%;">
						<p class="text-success"
							style="width: 100%; border-bottom: 1px solid #EDEDED;">订单信息</p>
						<p>
							<span>运单总数：</span><span id="waybill_count_create_flatcable"
								style="font-family: times; color: blue"></span><br /> <span>大约总重量(千克)：</span><span
								id="weight_total_create_flatcable"
								style="font-family: times; color: blue"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>货品总数：</span><span
								id="goods_count_create_flatcable"
								style="font-family: times; color: blue"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
								配送分类：</span><span id="send_mode_create_flatcable"
								style="font-family: times; color: blue"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>件型分类：</span><span
								id="size_type_create_flatcable"
								style="font-family: times; color: blue"></span>
						</p>
					</div>
					<!-- 订单信息结束 -->
					<!-- 生成路线编号开始 -->
					<div style="height: 130px;">
						<p class="text-success"
							style="width: 100%; border-bottom: 1px solid #EDEDED;">路线信息</p>
							
						<div class="col-md-12">
								<p class="col-md-4" style="width:90px;line-height: 35px;"><span class="text-required">*</span>路线描述</p>
							<div class="control-group col-md-8" style="padding-left: 0px;">
							<textarea id='cableDescribe'
								class='form-control' style='width:700px; ;height: 70px;'></textarea>
							</div>
						</div>	
							
						
						<!--  
							<div style="padding-top: 80px">
							<div class="col-md-2 text-center">路线编号</div>
							<div class="col-md-4" style="padding-right: 50px;">
								<input id='flatCableId' class="form-control" type="text" name=""
									value="" readonly="true">
							</div>
							<div class="col-md-3 "></div>
							<div class="col-md-3 "></div>
						</div>
						-->
					</div>
					<!-- 生成路线编号结束 -->
					
					<div class="modal-footer">
					<button id="btnAddFlatCable" class="btn btn-primary btn-sm">仅创建路线保存</button>
					</div>
					
					<!-- 派车信息开始 -->
					<div style="height: 290px; margin-top: 30px;">
						<p class="text-success"
							style="width: 100%; border-bottom: 1px solid #EDEDED;">
							派车信息
						</p>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">
								<input type="hidden" id="dispatchVehicleId_xd_1"> <input
									type="hidden" id="driver_xd_1"> <span class="text-required">*</span>司机姓名
							</p>

							<!-- <p class="col-md-6">
								<input class="form-control" type="text" name="" value="张三"
									readonly="true">
							</p>
							<p class="col-md-2" style="padding-top: 10px;">
								<a href="" class="glyphicon glyphicon-zoom-out"
									data-toggle="modal" data-target="#myModal3"></a>
							</p> -->
							<div class="input-group" style="width: 40%;">
								<input type="text" name="driverName_xd" id="driverName_xd_1"
									class="form-control input-small" style="width: 100%;"
									readonly="readonly" />
								<div class="input-group-addon" style="background-color: white;">
									<span class="glyphicon glyphicon-search"
										id="search_driver_xd_1"></span>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<p class="col-md-5" style="line-height: 35px;">
								<span class="text-required">*</span>司机联系电话
							</p>
							<p class="col-md-7">
								<input class="form-control" type="text" name=""
									id='driverPhone_xd_1' value="" readonly="readonly">
							</p>
						</div>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">
								<input type="hidden" id="vehicleId_xd_1"><span class="text-required">*</span>车牌号
							</p>



							<!--  	 <p class="col-md-6">
								<input class="form-control" type="text" name=""
									value="粤B 789456" readonly="true">
							</p>
							<p class="col-md-2" style="padding-top: 10px;">
								<a href="" class="glyphicon glyphicon-zoom-out"
									data-toggle="modal" data-target="#myModal4"></i></a>-->

							<div class="input-group" style="width: 150px;">
								<input type="text" name="vehicleNumber_xd"
									id="vehicleNumber_xd_1" class="form-control input-small"
									style="width: 139px;" readonly="readonly" />
								<div class="input-group-addon" style="background-color: white;">
									<span class="glyphicon glyphicon-search" id="search_car_xd_1"></span>
								</div>
							</div>
							<p class="col-md-6"></p>

						</div>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">长（m）</p>

							<input type="text" name="length_xd" class="form-control"
								id="length_xd_1" style="width: 109px;" readonly="readonly">
							<p class="col-md-8"></p>
						</div>
						<div class="col-md-4">
							<p class="col-md-5" style="line-height: 35px;">宽（m）</p>
							<p class="col-md-7">
								<input type="text" name="width_xd" class="form-control"
									id="width_xd_1" style="width: 109px;" readonly="readonly">
							</p>
						</div>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">高（m）</p>

							<input type="text" name="high_xd" class="form-control"
								id="high_xd_1" style="width: 109px;" readonly="readonly">
							<p class="col-md-8"></p>
						</div>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">车辆类型</p>

							<div class="control-group col-md-8" style="padding-left: 0px;">
								<div class="controls">
									<select class="form-control" name="carType_xd"
										id="carType_xd_1" disabled="disabled">
										<option value="">全部</option>
										<option value="10">面包车</option>
										<option value="20">电动车</option>
										<option value="30">自行车</option>
										<option value="40">卡车</option>
									</select>
								</div>
							</div>

						</div>
						<div class="col-md-4">
							<p class="col-md-5" style="line-height: 35px;">干线\区域</p>

							<div class="control-group col-md-7">
								<div class="controls">
									<select class="form-control" name="region_xd" id="region_xd_1"
										style="width: 139px;" disabled="disabled">
										<option value="">全部</option>
										<option value='10'>干线车</option>
										<option value='20'>区域车</option>
									</select>
								</div>
							</div>

						</div>
						<div class="col-md-4">
							<p class="col-md-4" style="line-height: 35px;">自营\外包</p>

							<div class="control-group col-md-8" style="padding-left: 0px;">
								<div class="controls">
									<select class="form-control" name="selfSupport_xd"
										id="selfSupport_xd_1" disabled="disabled">
										<option value="">全部</option>
										<option value='10'>自营</option>
										<option value='20'>外包</option>
									</select>
								</div>
							</div>

						</div>
						
						<div style="width: 100%; margin-top: 180px;">
							<p class="col-md-4" style="padding-left: 90px;">
								<input type="checkbox" name="isTransportLiquid_xd"
									id="isTransportLiquid_xd_1" value="1" disabled="disabled"><span>可配送液体</span>
							</p>
							<p class="col-md-4" style="padding-left: 90px;">
								<input type="checkbox" name="isTransportFreezing_xd"
									id="isTransportFreezing_xd_1" value="1" disabled="disabled"><span>可配送冻品</span>
							</p>
							<p class="col-md-4" style="padding-left: 90px;">
								<input type="checkbox" name="isTransportStorage_xd"
									id="isTransportStorage_xd_1" value="1" disabled="disabled"><span>可配送冷藏</span>
							</p>
						</div>
						<div class="col-md-12">
								<p class="col-md-4" style="width:92.66px;line-height: 35px;"><span class="text-required">*</span>派车描述</p>
							<div class="control-group col-md-8" style="padding-left: 0px;">
							<textarea id='describes'
								class='form-control' style='width:700px; ;height: 70px; '></textarea>
							</div>
						</div>
					</div>
					<!-- 派车信息结束 -->
					
				</div>
				<!-- 创建路线信息结束 -->
				<div class="modal-footer">
					<button id="btnDddFlatCableAndDispatchVehicle"
						class="btn btn-primary btn-sm">创建路线并派车保存</button>
					<button type="button"
						class="btn btn-default btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	</form>
	<!-- 点击生成路线的弹出框结束 -->
	<!-- 查找司机信息弹框开始 -->
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		style="z-index: 999999999">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<!-- 司机查找开始 -->
					<div style="height: 50px;">
						<div class="col-md-3" style="line-height: 40px;">姓名/电话</div>
						<div class="col-md-6">
							<input class="form-control" type="text" name="">
						</div>
						<button class="col-md-3 btn btn-primary btn-sm"
							style="width: 60px; height: 37px;">查找</button>
					</div>
					<!-- 司机查找结束 -->
					<!-- 司机全部信息表格开始 -->
					<table
						class="table table-striped table-bordered bootstrap-datatable responsive">
						<thead>
							<tr>
								<th>姓名</th>
								<th>电话</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>张三</td>
								<td class="center">15874128523</td>
							</tr>
							<tr>
								<td>李四</td>
								<td class="center">15874128525</td>
							<tr>
								<td></td>
								<td class="center"></td>
							</tr>
							<tr>
								<td></td>
								<td class="center"></td>
							</tr>
						</tbody>
					</table>
					<!-- 司机全部信息表格开始 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消
					</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 查找司机信息弹框结束 -->

	<!-- 点击详情时的弹出框开始 排线列表 -->
	<div class="modal fade" id="mypaixian" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		style="overflow: auto;">
		<div class="modal-dialog" style="width: 1400px; margin: 50px auto;">
			<div class="modal-content">
				<div class="modal-header" style="border-bottom: 0px;">
					<!-- 每个人只用关注这块区域starts -->
					<div class="box-content">
						<!-- 表单查询区域begin -->
						<div class="alert alert-info">

							<form id="addOrEditeSearchForm" class="form-inline" role="form"
								>
								<div class="controls controls-row">
									<div class="form-group">
										<span>排线编号：</span><input id="flatCableId_2"
											name="flatCableId_2" type="text"
											class="form-control input-small" />
									</div>
									<!-- <div class="form-group">
							   	<span>线路编号：</span><input name="cnName_2" id="cnName_2" type="text" class="form-control input-small" />	
							   </div> -->
									<div class="form-group">
										<span>线路描述：</span> <input id="cableDescribe_2"
											name="cableDescribe_2" class="form-control input-small"
											type="text">
									</div>

									<div class="form-group">
										<button id="btn_search" class="btn btn-success btn-flat"
											type="button">搜索</button>
									</div>

									<div class="form-group">
										<button id="btn_clean" class="btn btn-primary btn-flat"
											type="button">清空</button>
									</div>
								</div>
							</form>
						</div>
						<!-- 表单查询区域end -->

						<!-- 分页列表区域begin -->
						<div role="grid" class="box-body table-responsive">

							<div id="divCss">
								<table id="fcManagerTable"
									class="table table-hover table-striped table-bordered"
									style="min-width: 1200px;">

								</table>
							</div>
							<div role="grid"
								class="box-body table-responsive controls controls-row">
								<div class="modal-footer">
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									
									<button type="button" class="btn btn-default" data-dismiss="modal" id='qvButton' >取消</button>
									<button type="button" class="btn btn-primary" id='queButton' >确认</button>
								</div>


							</div>
							<!-- 分页列表区域ends -->
						</div>
						<!-- 每个人只用关注这块区域starts -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 点击详情时的弹出框结束  排线列表 -->

	<!-- 车辆并路线弹框开始 -->
	<div class="modal fade" id="myModal5" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 200px;">
					<!-- 线路编号开始 -->
					<div>
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>线路编号
						</div>
						<div class="col-md-5">
							<input id='flatCableId_1' type="text" class="form-control"
								name="" value="">
						</div>
					</div>
					<!-- 线路编号结束 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm" id="btnAffirm">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>

	<!-- 车辆并路线弹框开始 -->
	<div class="modal fade" id="myModal15" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 200px;">
					<!-- 线路编号开始 -->
					<div>
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>线路编号
						</div>
						<div class="col-md-5">
							<input id='flatCableId_2' type="text" class="form-control"
								name="" value="">
						</div>
					</div>
					<!-- 线路编号结束 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm"
						id="btnAffirm_1">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 车辆并路线弹框结束 -->



	<!-- 查看添加派车单开始 -->
	<div class="modal fade" id="myModal7" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 200px;">
					<!-- 线路编号开始 -->
					<div>

						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>派车单号
						</div>
						<div class="col-md-5">
							<input type="hidden" id="childWaybillId_7"> <input
								type="text" class="form-control" name="dvId_7" id="dvId_7">
						</div>
					</div>
					<!-- 线路编号结束 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm"
						id="btn_add_to_DV">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 查看添加派车单结束 -->
	<!-- 弹框揽收开始 -->
	<div class="modal fade" id="myModal8" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 200px;">
					<!-- 线路编号开始 -->
					<div style="height: 50px;">
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>揽收人
						</div>
						<div class="col-md-5">
							<input type="hidden" id="childWaybillId_8"> <input
								type="text" class="form-control" name="pickId" id="pickId">
						</div>
					</div>
					<div>
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>揽收时间
						</div>
						<div class="input-group date form_datetime col-md-8"
							data-date-format="yyyy-mm-dd hh:ii:ss"
							data-link-field="dtp_input1">
							<input id="pickTime" name="pickTime" class="form-control"
								size="16" type="text" value="" readonly> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-th"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span> </span>
						</div>
					</div>
					<span id="pickTs" style="color: red;"></span>
					<!-- 线路编号结束 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm" id="btn_pick">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 弹框揽收结束 -->
	<!-- 签收确认弹框开始 -->
	<div class="modal fade" id="myModal9" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 500px;">
					<p class="text-success"
						style="width: 100%; border-bottom: 1px solid #EDEDED;">
						<input type="radio" name="rSign" checked="checked" />正常签收
					</p>
					<form id="signForm1" action="" class="form-horizontal">
						<div class="form-group">
							<label for="signId" class="col-md-3 control-label"><span class="text-required">*</span>签收人：</label>
							<div class="col-md-8">
								<div>
									<input type="hidden" id="childWaybillId_9"> <input
										type="text" class="form-control" id="signId" name="signId">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="signId" class="col-md-3 control-label"><span class="text-required">*</span>签收时间：</label>
							<div class="col-md-8">
								<div class="input-group date form_datetime col-md-8"
									data-date-format="yyyy-mm-dd hh:ii:ss"
									data-link-field="dtp_input1">
									<input id="signTime" name="signTime" class="form-control"
										size="16" type="text" value="" readonly> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-th"></span></span> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-remove"></span></span>

								</div>
							</div>
						</div>
						<%--					<div style="height: 50px;">
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>签收人
						</div>
						<div class="col-md-5">
							<input type="hidden" id="childWaybillId_9">
							<input type="text" class="form-control" name="signId" id="signId">
						</div>
					</div>--%>
						<%--					<div style="height: 50px;">
						<div class="col-md-3" style="line-height: 50px;">
							<span style="color: red">*</span>签收时间
						</div>
						<div class="input-group date form_datetime col-md-8"
							data-date-format="yyyy-mm-dd hh:ii:ss"
							data-link-field="dtp_input1">
							<input id="signTime" name="signTime" class="form-control"
								size="16" type="text" value="" readonly> 
								<span
								class="input-group-addon"><span
								class="glyphicon glyphicon-th"></span></span>
								<span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> 
								
						</div>
						<span style="color: red;" id="signTs"></span>
					</div>--%>
					</form>
					<p class="text-success"
						style="width: 100%; border-bottom: 1px solid #EDEDED;">
						<input type="radio" name="rSign" />异常签收
					</p>
					<form id="signForm2" action="" class="form-horizontal">
						<div>
							<div class="form-group">
								<label for="signId" class="col-md-3 control-label"><span class="text-required">*</span>签收人：</label>
								<div class="col-md-8">
									<div>
										<input type="text" class="form-control" id="signId_2"
											name="signId_2">
									</div>
								</div>
							</div>
							<div class="form-group">
								<!-- 下拉框 -->
								<label for="signInType_2" class="col-md-3 control-label"><span class="text-required">*</span>异常分类：</label>
								<div class="col-md-8">
									<select class="form-control" id="signInType_2"
										name="signInType_2">
										<option value="10">联系不上客户</option>
										<option value="20">客户拒收</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="signInReason_2" class="col-md-3 control-label"><span class="text-required">*</span>异常原因：</label>
								<div class="col-md-8">
									<div>
										<textarea class="form-control" cols="30" rows="3"
											id="signInReason_2" name="signInReason_2"></textarea>
									</div>
								</div>
							</div>
							<%--<div style="height: 40px;">
							<p class="col-md-2" style="line-height: 35px;">
								<span style="color: red">*</span>签收人
							</p>
							<p class="col-md-6">
								<input class="form-control" type="text" name="signId_2"
									id="signId_2">
							</p>
						</div>--%>
							<%--<div style="height: 70px;">
							<p class="col-md-2" style="line-height: 60px;">
								<span style="color: red">*</span>异常分类
							</p>
							<p class="col-md-6">
							<div class="control-group col-md-8">
								<div class="controls">
									<select class="form-control" id="signInType_2"
										name="signInType_2">
										<option value="10">联系不上客户</option>
										<option value="20">客户拒收</option>
									</select>
								</div>
							</div>
							</p>
						</div>--%>
							<%--<div style="height: 70px;">
							<p class="col-md-2" style="line-height: 55px;">
								<span style="color: red">*</span>异常原因
							</p>
							<p class="col-md-6">
								<textarea class="form-control" cols="30" rows="3" id="signInReason_2" name="signInReason_2"></textarea>
							</p>
						</div>--%>
							<!--  	<div style="height: 70px;">
							<p class="col-md-2">
								<span style="color: red">*</span>处理方案
							</p>
							<p>
							<div class="control-group col-md-8">
								<div class="controls">
									<select class="form-control" id="disposeScheme_2"
										name="disposeScheme_2">
										<option value="10">再投</option>
										<option value="20">原路返回</option>
									</select>
								</div>
							</div>
							</p>
						</div>
						-->
							<%--<span style="color: red;" id="signTs_2"></span>--%>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm" id="btn_sign">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 签收确认弹框结束 -->

	<!-- 作废弹框开始 -->
	<div class="modal fade" id="myModal14" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="height: 50px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body" style="min-height: 200px;">

					<div>
						<div class="col-md-4" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid red; font-weight: bold; font-size: 20px; text-align: center; line-height: 50px; color: red;">？</div>
						<div class="col-md-7" style="padding-top: 3%">
							取消后不会保存数据，您确认要取消吗？</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary btn-sm"
						data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary btn-sm">确认</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 作废弹框结束 -->

	<!-- 模态框（Modal） -->
	<%@include file="../tms/dialog/dispatchVehicleDialog.jsp"%>
	<!-- 模态框（Modal） -->

	<%@include file="../tms/dialog/driverDialog.jsp"%>
	<!-- 模态框（Modal） -->

	<%@include file="../tms/dialog/vehicleDialog.jsp"%>

	<%@include file="../tms/dialog/logDialog.jsp"%>
	<%@include file="../tms/dialog/logisticsDialog.jsp"%>

	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>

	<script src="${contextPath}/resources/charisma-master/js/jquery.dataTables.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/moment/min/moment.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/js/jquery.raty.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/js/jquery.iphone.toggle.js"></script>
	<script src="${contextPath}/resources/charisma-master/js/jquery.autogrow-textarea.js"></script>
	<script src="${contextPath}/resources/charisma-master/js/jquery.uploadify-3.1.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/colorbox/jquery.colorbox-min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/chosen/chosen.jquery.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/js/charisma.js"></script>

	<script src="${contextPath}/resources/js/business/tms/util/util.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/dialog/driverDialog.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/dialog/vehicleDialog.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/dialog/dispatchVehicleDialog.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/dialog/logDialog.js" type="text/javascript"></script>

	<script src="${contextPath}/resources/js/business/tms/dialog/logisticsDialog.js" type="text/javascript"></script>

	<script src="${contextPath}/resources/js/business/tms/dispatchManage2.js" type="text/javascript"></script>
	<script src="${contextPath}/resources/js/business/tms/waybillFlatCable.js" type="text/javascript"></script>
</body>
</html>