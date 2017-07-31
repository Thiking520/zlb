<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<style>
.content{
    margin-top: -540px;
    margin-left: 150px;
}
#myModal ul li{
	margin-top: 15px;
}
.col-md-10 .fixed-table-body{
	overflow: visible;
}
</style>
<script type="text/javascript">

</script>
<form id="addAnchorForm" method="post" target="_blank">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" style="text-align: -webkit-center;overflow-y: scroll;" aria-labelledby="myModal"  aria-hidden="true">
 <div class="modal-dialog" style="width:90%;margin: 50px auto;" >
	<div class="modal-content" style="width: 60%;height: 950px;margin: 0 auto;"> 
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">×</span>
			</button>
		</div>
		<div class="modal-body">
			<input type="hidden" id="operationId" name="operationId">
			<div class="nav-tabs-custom">
				<div class="form-group col-md-1" id="leftMeun">
					 <div class="row">
						<ul class="nav nav-pills nav-stacked">
								<li class="active"><a href="#tab_1" class="picList" data-toggle="tab">基本信息</a></li>
								<li><a href="#tab_2" class="picList"  data-toggle="tab">控制信息</a></li>
						</ul>
					</div>
				</div>
				<div class="form-group col-md-1" style="width: 20px;height: 850px;border-left: 1px solid #999;margin-left: 2%"></div>
				<div class="form-group col-md-10" style="padding-left:0px;width: 87%;"> 
					<div class="tab-content">
					<div class="tab-pane active" id="tab_1">
						<table style="width: 100%;">
								<tr>
									<td style="width:33%;">
								      <div class="form-group">
								      <label><span class="text-required">*</span>货品编码：</label>
								      <input type="text" name="skuCodeAdd" class="form-control" id="skuCodeAdd" readonly="readonly" >
								      </div>
								   </td>
								   <td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>货品名称：</label>
											<input type="hidden" id="areaCodeAdd">
											<div class="input-group" >
												<input type="text" name="skuNameAdd" class="form-control"
													id="skuNameAdd" readonly="readonly" >
												<div class="input-group-addon" id="skuNameSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="skuCodeQuery"></span>
												</div>
											</div>
										</div>	
									</td>
								</tr>
						</table>
						<table style="width: 100%;">
								<tr>
									<td style="width:33%;">
								      <div class="form-group">
								      <label>长(CM):</label>
								      <input type="text" name="lenght" class="form-control" id="lenght" maxlength="3" >
								      </div>
								    </td>
									<td style="width:33%;">
								      <div class="form-group">
								      <label>宽(CM):</label>
								      <input type="text" name="wide" class="form-control" id="wide" maxlength="3" >
								      </div>
								    </td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label>高(CM):</label>
								      <input type="text" name="heigh" class="form-control" id="heigh" maxlength="3">
								      </div>
								   </td>
								</tr>
						</table>
						<table style="width: 100%;">
								<tr>
									<td style="width:33%;">
								      <div class="form-group">
								      <label>单位毛重(克):</label>
								      <input type="text" name="grossWeight" class="form-control" id="grossWeight" maxlength="4" >
								      </div>
								    </td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label>单价(元):</label>
								      <input type="text" name="price" class="form-control" id="price" maxlength="5">
								      </div>
								   </td>
								</tr>
						</table>
						<table style="width: 100%;">
							<tr>
							   <td colspan="1">
							      <div class="form-group">
						      	        <div style="text-align:center; width: 210px;  padding-top:20px">
                   							<input type="checkbox" id="skuCodeManage" name="skuCodeManage"> 条形码管理
                   						</div>
							   </td>
					 		</tr>
						</table>
						<table class="table table-striped bootstrap-datatable responsive" style="margin-top: 10px;">
							<br>
							<div style="color:#9F79EE; float:left;"><label>分类</label></div>
							<br>
							<div style="width:100%; border-top:1px solid #F2F2F2"></div>
							<table style="width: 100%;">
								<tr>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label>货品分类：</label>
									  	  <input type="text" name="goodsClassifyName" id="goodsClassifyName" class="form-control" readonly="readonly">
								      </div>
								    </td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label>存储方式：</label>
										  <select class="form-control" name="storageMode" id="storageMode">
	                                                <option value="10">水果类</option>
	                                                <option value="20">肉类</option>
	                                                <option value="30">干果类</option>
									  	  </select>
								      </div>
								    </td>
								    <td style="width:33%;">
								      <div class="form-group">
								      <label>配送分类：</label>
										  <select class="form-control" name="distribution" id="distribution">
	                                                <option value="10">冷链</option>
	                                                <option value="20">常温</option>
	                                                <option value="30">液体</option>
									  	  </select>
								      </div>
								    </td>
								</tr>
								<tr>
									<td style="width:33%;">
									 <div class="form-group">
								          <label>件型：</label>
										  <select class="form-control" name="aType" id="aType">
	                                                <option value="10">小件</option>
	                                                <option value="20">大件</option>
	                                                <option value="30">大小混装</option>
									  	  </select>
								      </div>
								    </td>
								    <td style="width:33%;">
								    	<div class="form-group">
			                                <img alt="" id="skuImgShow" src="${contextPath}/resources/img/noneImg.jpg"
				                        		class="thumbnail"
												style="width: 100px; height: 100px; margin: 0px 50px 10px;">
											<input type="hidden" name="imgUrl" id="imgUrl" />
										</div>
								    </td>
								</tr>
						     </table>
						</table>
						
						<table class="table table-striped bootstrap-datatable responsive" style="margin-top: 10px;">
							<br>
							<div style="color:#9F79EE; float:left;"><label>单位</label></div>
							<br>
							<div style="width:100%; border-top:1px solid #F2F2F2"></div>
							<table style="width: 100%;">
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label>基本单位：</label> <select class="form-control"
												name="skuUnit" id="skuUnit">
												    <option value="个">个</option>
													<option value="件">件</option>
													<option value="份">份</option>
													<option value="箱">箱</option>
													<option value="瓶">瓶</option>
													<option value="千克">千克</option>
													<option value="克">克</option>
											</select>
										</div>
									</td>
								   <td style="width:33%;">
								      <div class="form-group">
								      <label>辅助单位：</label>
										  <select class="form-control" name="assistUnit" id="assistUnit">
	 												<option value="个">个</option>
													<option value="箱">箱</option>
													<option value="份">份</option>
													<option value="千克">千克</option>
													<option value="件">件</option>
									  	  </select>
								      </div>
								    </td>
								</tr>
						     </table>
						</table>
					</div>
					<!-- 计划明细 -->
					<div class="tab-pane" id="tab_2">
						<div style="color:#9F79EE; float:left;"><label>入库</label></div>
						<br>
						<div style="width:100%; border-top:1px solid #F2F2F2"></div>
						<br>
			              <table style="width: 100%;">
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>上架规则：</label> <input
												type="hidden" id="rulesCode">
											<div class="input-group">
												<input type="text" name="rulesName" class="form-control"
													id="rulesName" readonly="readonly">
												<div class="input-group-addon" id="rulesNameSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="search_rulesName"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>首选库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaCodeAdd"
													id="warehouseAreaCodeAdd" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchShelRulesName"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label><span class="text-required">*</span>首选库位：</label>
											<div class="input-group">
												<input type="text" name="warehouseLocationCode"
													id="warehouseLocationCode" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="locationSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchWarehouseLocationName"></span>
												</div>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label>备用库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaSpare"
													id="warehouseAreaSpare" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaSpareSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchAllSpare"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label>退货库区：</label>
											<div class="input-group">
												<input type="text" name="warehouseAreaReturn"
													id="warehouseAreaReturn" class="form-control"
													readonly="readonly">
												<div class="input-group-addon" id="areaReturnSearch"
													style="background-color: white;">
													<span class="glyphicon glyphicon-search"
														id="searchAllReturn"></span>
												</div>
											</div>
										</div>
									</td>
									<td style="width: 33%;">
										<div class="form-group">
											<label>循环级别：</label> <select class="form-control"
												name="cycle" id="cycle">
												<option value="10">快速周转</option>
												<option value="20">中速周转</option>
												<option value="30">慢速周转</option>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<td style="width: 33%;">
										<div class="form-group">
											<label>商品分类：</label> 
											<select class="form-control"
												name="skuClassify" id="skuClassify">
												<option value="10">原料</option>
												<option value="20">成品</option>
											</select>
										</div>
									</td>
								</tr>
							</table>
							<div style="color:#9F79EE; float:left;"><label>出库</label></div>
							<br>
							<div style="width:100%; border-top:1px solid #F2F2F2"></div>
							<br>
							<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label><span class="text-required">*</span>预分配规则：</label>
												<input type="hidden" id="preAllocatedCode">
												<div class="input-group">
													<input type="text" name="preAllocatedName"
														class="form-control" id="preAllocatedName"
														readonly="readonly">
													<div class="input-group-addon" id="preAllocatedSearch"
														style="background-color: white;">
														<span class="glyphicon glyphicon-search"
															id="searchPreAllocated"></span>
													</div>
												</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label><span class="text-required">*</span>分配规则：</label>
												<input type="hidden" id="allocatedCode">
												<div class="input-group">
													<input type="text" name="allocatedName" id="allocatedName"
														class="form-control" readonly="readonly">
													<div class="input-group-addon" id="allocatedSearch"
														style="background-color: white;">
														<span class="glyphicon glyphicon-search"
															id="searchAllocated"></span>
													</div>
												</div>
											</div>
										</td>
									</tr>
							</table>
							<div style="color:#9F79EE; float:left;"><label>库内</label></div>
							<br>
							<div style="width:100%; border-top:1px solid #F2F2F2"></div>
							<br>
							<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>质检周期(H)：</label> <input type="text"
													name="qualityCycle" class="form-control" id="qualityCycle" maxlength="2">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>库存上限：</label> <input type="text" name="stockLimit"
													class="form-control" id="stockLimit" maxlength="3">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>库存下限：</label> <input type="text" name="stockLower"
													class="form-control" id="stockLower" maxlength="3">
											</div>
										</td>
									</tr>
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>补货增量：</label> <input type="text" name="replenBulking"
													class="form-control" id="replenBulking" maxlength="3">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>补货单位：</label> <select class="form-control"
													name="replenUnit" id="replenUnit">
													<option value="个">个</option>
													<option value="件">件</option>
													<option value="箱">箱</option>
													<option value="托盘">托盘</option>
													<option value="千克">千克</option>
												</select>
											</div>
										</td>
									</tr>
								</table>
								<div style="color:#9F79EE; float:left;"><label>库内</label></div>
								<br>
								<div style="width:100%; border-top:1px solid #F2F2F2"></div>
								<br>
								<table style="width: 100%;">
									<tr>
										<td style="width: 33%;">
											<div class="form-group">
												<label>保质期(天)：</label> <input type="text" name="life"
													class="form-control" id="life" maxlength="2">
											</div>
										</td>
										<td style="width: 33%;">
											<div class="form-group">
												<label>保质期前置天数：</label> <input type="text" name="lifeDays"
													class="form-control" id="lifeDays" maxlength="2">
											</div>
										</td>
									</tr>
								</table>
								<div style="color:#9F79EE; float:left;"><label>序列号管制</label></div>
								<br>
								<div style="width:100%; border-top:1px solid #F2F2F2"></div>
								<br>
							   <table style="width: 100%;">
									<tr>
										<td colspan="2">
											<div class="form-group">
												<label class="checkbox-inline"
													style="float: right; left: 1000px; width: 230px"> <input
													type="checkbox" id="storageNo" name="storageNo" value="1">
													入库时扫描序列号
												</label> <label class="checkbox-inline"
													style="float: right; width: 400px"> <input
													type="checkbox" id="outNo" name="outNo" value="1">
													出库时扫描序列号
												</label>
											</div>
										</td>
									</tr>
								</table>
					</div>
					<!-- 计划明细 end -->
					<div class="modal-footer">
							<input type="hidden" id="rowId">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">
								<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭
							</button>
							<button id="btn_save_submit" type="button" name="btn_save_submit"
								class="btn btn-primary">
								<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存
							</button>
							<button id="btn_edit_submit" type="button" name="btn_edit_submit"
								class="btn btn-primary">
								<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>确认修改
							</button>
						</div>
					</div>
				</div>
			</div>
			<div id="centerDiv"></div>
			</div>
		</div>
	</div>
 </div>
</div>
</form>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal08" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel08" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width:750px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel08">选择商品信息</h4>
				</div>
				<div class="modal-body">
					<form action="" class="rows" role="form" id="skuCodeForm">
						<table style="width: 100%; height: 100px;">
						   <tr>
								<td><span>编码：</span></td>
								<td><input type="text" name="goodsCode" id="goodsCode"
									class="form-control"/></td>
								<td><span>名称：</span></td>
								<td><input type="text" name="goodsName" id="goodsName"
									class="form-control"/></td>
								<td>
									<select class="form-control" name="goodsMode" id="goodsMode">
											<option value="0">单品</option>
											<option value="1">多规格</option>
											<option value="2">组合</option>
											<option value="3">原始商品</option>
									</select>
								</td>
								<td colspan="4" style="text-align: right;">
									<button type="button" class="btn btn-success btn-flat" id="btn_search_goods">搜索</button>
									<button type="button" class="btn btn-primary btn-flat" id="btn_goods_clean">清空</button>
								</td>
							</tr>
						</table>
					</form>
					<table id="skuGoodsList"></table>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="goods_save">确认</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal07" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel07" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel07">选择预分配规则</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="preAllocatedForm">
					<div class="controls controls-row">
						<div class="form-group">
							<span>规则编码:</span><input name="preAllocatedSerchCode" id="preAllocatedSerchCode"
								class="form-control" style="width: 100px;">
						</div>
						<div class="form-group">
							<span>规则名称:</span><input name="preAllocatedSerchName" id="preAllocatedSerchName"
								class="form-control" style="width: 130px;">
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-success btn-flat" id="btn_search_preAllocated">搜索</button>
							<button type="button" class="btn btn-primary btn-flat" id="btn_preAllocated_clean">清空</button>
						</div>
					</div>
				</form>
				<table id="preAllocatedList"></table>
				<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="preAllocated_save">确认</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal06" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel06" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel06">选择分配规则</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="allocatedForm">
					<div class="controls controls-row">
						<div class="form-group">
							<span>规则编码:</span><input name="allocatedSerchCode" id="allocatedSerchCode"
								class="form-control" style="width: 100px;">
						</div>
						<div class="form-group">
							<span>规则名称:</span><input name="allocatedSerchName" id="allocatedSerchName"
								class="form-control" style="width: 130px;">
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-success btn-flat" id="btn_search_allocated">搜索</button>
							<button type="button" class="btn btn-primary btn-flat" id="btn_allocated_clean">清空</button>
						</div>
					</div>
				</form>
				<table id="allocatedList"></table>
				<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="allocated_save">确认</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal05" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel05" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel05">选择批次属性</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="proForm">
					<div class="controls controls-row">
						<div class="form-group">
							<span>批属性编码:</span><input name="propertySerchCode" id="propertySerchCode"
								class="form-control" style="width: 100px;">
						</div>
						<div class="form-group">
							<span>批属性名称:</span><input name="propertySerchName" id="propertySerchName"
								class="form-control" style="width: 130px;">
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-primary"
								id="btn_search_property">查询</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-primary" id="property_save">确认</button>
						</div>
					</div>
				</form>
				<table id="propertyList"></table>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal04" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel04" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel04">选择库位</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="locationForm">
					<div class="controls controls-row">
						<div class="form-group">
							<span>库位编码:</span><input name="warehouseLocationSerchCode" id="warehouseLocationSerchCode"
								class="form-control" style="width: 100px;">
						</div>
						<div class="form-group">
							<span>库位名称:</span><input name="warehouseLocationSerchName" id="warehouseLocationSerchName"
								class="form-control" style="width: 130px;">
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-success btn-flat" id="btn_search_location">搜索</button>
							<button type="button" class="btn btn-primary btn-flat" id="btn_location_clean">清空</button>
						</div>
					</div>
				</form>
				<table id="warehouseLocationList"></table>
				<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="location_save">确认</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel03" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel03">选择库区</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="proAreaForm">
					<div class="controls controls-row">
					 	<input type="hidden" name="flag" id="flag">
						<div class="form-group">
							<span>库区编码:</span><input name="warehouseAreaCode" id="warehouseAreaCode"
								class="form-control" style="width: 100px;">
						</div>
						<div class="form-group">
							<span>库区名称:</span><input name="warehouseAreaName" id="warehouseAreaName"
								class="form-control" style="width: 130px;">
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-success btn-flat" id="btn_search_pro">搜索</button>
						    <button type="button" class="btn btn-primary btn-flat" id="btn_pro_clean">清空</button>
						</div>
					</div>
				</form>
				<table id="warehouseAreaList"></table>
				<div class="modal-footer">
					 <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					 <button type="button" class="btn btn-primary" id="area_save">确认</button>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal02" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel02" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel02">选择上架规则</h4>
			</div>
			<div class="modal-body">
				<form action="" class="form-inline" role="form" id="shelfForm">
					<div class="controls controls-row">
						<div class="form-group">
							<span>编码：</span>
							<input type="text" name="shelf_code" id="shelf_code"
							class="form-control input-small" style="width: 100px;" />
						</div>
						<div class="form-group">
							<span>名称：</span>
							<input type="text" name="shelf_name" id="shelf_name"
							class="form-control input-small" style="width: 120px;" />
						</div>
						<div class="form-group">
							<button type="button" class="btn btn-success btn-flat" id="btn_search_s">搜索</button>
							<button type="button" class="btn btn-primary btn-flat" id="btn_shelf_clean">清空</button>
						</div>
					</div>
				</form>
				<table id="skuConfigList"></table>
				<div class="modal-footer">
					 <td colspan="4" style="text-align: right;">
						<button type="button" class="btn btn-default"
							data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="s_save">确认</button>
					 </td>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>