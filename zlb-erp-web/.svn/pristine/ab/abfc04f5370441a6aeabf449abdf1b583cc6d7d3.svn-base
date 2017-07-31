<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">
.el-form--inline .el-form-item {
	display: inline-block;
	margin-right: 10px;
	vertical-align: top;
}

.el-form-item {
	margin-bottom: 10px;
	width: 168px;
	height: 36px;
}

.el-form-item__label {
	text-align: right;
	vertical-align: middle;
	float: left;
	font-size: 14px;
	color: #48576a;
	line-height: 1;
	padding: 11px 12px 11px 0;
	box-sizing: border-box;
}

.el-form-item__content {
	line-height: 36px;
	position: relative;
	font-size: 14px;
}

.thumbnails .thumbnail{margin-bottom:15px !important}

</style>
</head>
<body>
	
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div class="box-header well" data-original-title="">
			<h2><i class="glyphicon glyphicon-user"></i>商品管理>商品资料管理></h2>
			<h2><i class="glyphicon"></i><label id="labelText">新增商品</label></h2>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div class="nav-tabs-custom" style="padding: 30px 0px 0px 50px;">
			<div class="form-group col-md-1" style="width: 120px;height: 100%;">
				<div class="row"> 
					<ul class="nav nav-pills nav-stacked" id="myTab" >
						<li class="active"><a href="#tab_1" class="picList" picType="0" data-toggle="tab">基本信息</a></li>
						<li><a href="#tab_2" class="picList" picType="1" data-toggle="tab">商品相册</a></li>
						<li><a href="#tab_3" class="picList" picType="2" data-toggle="tab">商品详情</a></li>
						<li><a href="#tab_4" class="picList" picType="3" data-toggle="tab">单品库存</a></li>
						<li class="disabled"><a href="#tab_5" class="picList" picType="4" data-toggle="tab">销售规格</a></li>
						<li class="disabled"><a href="#tab_6" class="picList" picType="5" data-toggle="tab">组合商品</a></li>
						<li><a href="#tab_7" class="picList" picType="6" data-toggle="tab">属性信息</a></li>
						<li><a href="#tab_8" class="picList" picType="7" data-toggle="tab">价格信息</a></li>
					</ul>
				</div>
			</div>
			<input type="hidden" id="keyId">
			<div class="col-md-2" style="width: 80%;height: 100%;">
				<div class="tab-content">
					<div class="tab-pane active" id="tab_1">
						<!--基本信息容器  start-->
						<div class="box-body">
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsForm" onSubmit="return false;">
								<div class="form-group">
		                            <p class="col-md-2 control-label">商品规格：</p>
		                            <div class="col-md-6">
		                                <div>
		                                	<p class="radio-inline"><input id="goodsMode0" name="goodsMode" class="goodsMode" type="radio" value="0" checked="checked"/><label for="goodsMode0" style="font-weight: normal;">单品</label></p>
											<p class="radio-inline"><input id="goodsMode1" name="goodsMode" class="goodsMode" type="radio" value="1"/><label for="goodsMode1" style="font-weight: normal;">多规格商品</label></p>
											<p class="radio-inline"><input id="goodsMode2" name="goodsMode" class="goodsMode" type="radio" value="2"/><label for="goodsMode2" style="font-weight: normal;">组合商品</label></p>
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">库存类型：</p>
		                            <div class="col-md-6">
		                                <div>
		                                	<p class="radio-inline"><input id="stockType0" name="stockType" class="goodsMode" type="radio" value="0" checked="checked"/><label for="stockType0" style="font-weight: normal;">无限制</label></p>
											<p class="radio-inline" id="stockTypeBlock"><input id="stockType1" name="stockType" class="goodsMode" type="radio" value="1"/><label for="stockType1" style="font-weight: normal;">独立库存</label></p>
		                                </div>
		                            </div>
	                            </div>
	                        	<div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品分类：</p>
		                            <div class="col-md-6">
		                                <div class="input-group">
		                                	<input name="goodsTypeName" id="goodsTypeName" class="form-control input-small" type="text" disabled="disabled">
		                                	<input name="goodsType" id="goodsType" style="display: none;"/>
										    <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="choose_goods_type"></span></div>
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">商品编码：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="goodsCode"  name="goodsCode" disabled="disabled" placeholder="系统自动生成">
		                                </div>
		                            </div>
		                        </div>
		                        <div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品主标题：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="title" name="title" placeholder="长度在1~50之间">
		                                </div>
		                            </div>
		                        </div>
		                        <div class="form-group">
		                            <p class="col-md-2 control-label">商品副标题：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="slaveTitle" name="slaveTitle" placeholder="长度在1~125之间">
		                                </div>
		                            </div>
		                        </div>
		                        <div class="form-group">
		                            <p class="col-md-2 control-label">商品简介：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="goodsDesc" name="goodsDesc" placeholder="长度在1~250之间">
		                                </div>
		                            </div>
		                        </div>
<!-- 		                        <div class="form-group"> -->
<!-- 		                            <p class="col-md-3 control-label">商品品牌：</p> -->
<!-- 		                            <div class="col-md-6"> -->
<!-- 		                                <div> -->
<!-- 		                                    <input type="text" class="form-control" id="goodsTitle" name="goodsTitle"> -->
<!-- 		                                </div> -->
<!-- 		                            </div> -->
<!-- 		                        </div> -->
		                        <div class="form-group">
		                            <p class="col-md-2 control-label">商品标签：</p>
		                            <div class="col-md-6">
		                                <div class="input-group">
		                                	<input name="goodsTagName" id="goodsTagName" class="form-control input-small" type="text" disabled="disabled">
		                                	<input name="goodsTag" id="goodsTag" style="display: none;"/>
										    <div class="input-group-addon" style="background-color: white;"><span class="glyphicon glyphicon-search" id="choose_goods_tag"></span></div>
		                                </div>
		                            </div>
		                        </div>
		                        <div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品排序：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="sortIndex" name="sortIndex" placeholder="数字越低，排序越前，最小值为1，最大值为999999999">
		                                </div>
		                            </div>
		                        </div>
		                        <div class="form-group">
			                        <p class="col-md-2 control-label"><span class="text-required">*</span>商品主图：</p>
			                        <div class="col-md-6">
				                        <div>
				                        	<input type="hidden" id="goodsImageUrl"/>
				                         	<img id="imageShow" class="thumbnail" style="width:200px;height:200px;" src="${contextPath}/resources/img/no_image.jpg"/>
				                            <input type="file" id="imgFile" name="imgFile" multiple/>
				                        </div>
				                    </div>
				       				<div id="pgsbar" class="progress progress-striped active" style="margin-top: 20px;height: 10px;width: 500px;visibility: hidden;float: left;margin-left: 100px;">
										<div id="pgsbarColor" class="progress-bar progress-bar-success" role="progressbar"
											 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
											 style="width: 0%;">
										</div>
									</div>
			                    </div>
		                        <div style="text-align: center;">
		                        	<button id="btn_cancel_goods" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        	<button id="btn_save_goods" type="button" name="btn_save_goods" class="btn btn-primary">保存并下一页</button>
						        </div>
		                     </form>
						</div>
						<!--基本信息容器  end-->
					</div>
					<div class="tab-pane" id="tab_2">
						<div style="margin-left: 1%;color: red;"><label>温馨提示：图片建议尺寸160×200</label></div>
						<!-- 商品相册容器  start-->
						<div class="box-content" style="width: 100%;height: 100%;">
							<ul class="thumbnails gallery" id="goodsImageDiv" style="margin: 0 auto;">
<!-- 								<li class="thumbnail" id="image-1"> -->
<!-- 									<img src="http://yunly.luckshow.cn/pot/show/8a62769314c4a4a72cba998139401964.jpg" alt="logo" class="logo-default" /> -->
<!-- 								</li> -->
							</ul>
							<div>
								<button id="btn_cancel_goodsIamge" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
	                         	<button type="button" name="btn_add_goodsIamge" class="btn btn-primary btn_add_goodsIamge">添加图片</button>&nbsp;&nbsp;&nbsp;&nbsp;
	                         	<button type="button" name="newPage" class="btn btn-default newPage">下一页</button>
						    </div>
						</div>
						<!-- 商品相册容器  end-->
					</div>
					<div class="tab-pane" id="tab_3">
						<div style="margin-left: 1%;color: red;"><label>温馨提示：图片建议尺寸156×156</label></div>
						<!-- 商品详情容器  start-->
						<div class="box-content" style="width: 100%;height: 100%;">
							<ul class="thumbnails gallery" id="imageDetailsDiv">

							</ul>
							<div>
								<button id="btn_cancel_iamgeDetails" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
	                         	<button type="button" name="btn_add_iamgeDetails" class="btn btn-primary btn_add_goodsIamge">添加图片</button>&nbsp;&nbsp;&nbsp;&nbsp;
	                         	<button type="button" name="newPage" class="btn btn-default newPage">下一页</button>
						     </div>
						</div>
						<!-- 商品详情容器  end-->
					</div>
					<div class="tab-pane" id="tab_4">
						<!--库存信息容器（单品）  start-->
						<div class="row">
							<form class="form-horizontal" class="form-inline" role="form" id="addGoodsItemForm" onSubmit="return false;">
					            <div class="box-content row">
					                <!-- 正式页面开始 -->
					               <div style="width: 90%; margin:0 auto;">
					                    <div style="width: 100%;">
					                        <div style="min-height: 150px;" class="alert alert-info">
					                            <!-- 看售出的数量开始 -->
					                            <div style="width: 100%;">
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">售卖单位：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <select class="form-control L_spt_next goodsUnit" id="saleUnit" name="saleUnit">
<!-- 					                                            <option value="1">份</option> -->
					                                        </select>
					                                    </div>
					                                </div>
					                                <!-- 采购方式开始 -->
					                                <div style="width: 100%; height: 30px;">
					                                    <p class="col-md-4">采购方式：</p>
					                                    <p class="col-md-3"><input type="radio" name="purchaseMode" value="0" checked="checked">先单后采</p>
					                                    <p class="col-md-3"><input type="radio" name="purchaseMode" value="1">先采后单</p>                    
					                                </div>
					                                <!-- 采购方式结束 -->
					                                <!-- <div style="width: 100%;">
					                                    <p class="col-md-4">可售卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="canSaleAmount" name="canSaleAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">可超卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="overAmount" name="overAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">已售卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="saleAmount" name="saleAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                            </div>
					                            库存数据开始
					                            <div style="width: 100%; margin-top:220px;">
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">售卖库存率：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="saleRate" name="saleRate" class="form-control" placeholder="请输入正整数或小数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%; margin-top:220px;">
					                                    <p class="col-md-4">库存单位：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <select class="form-control L_spt_next goodsUnit" id="stockUnit" name="stockUnit">
					                                            <option value="1">份</option>
					                                        </select>
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">总库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="stockAmount" name="stockAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">可用库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="availableAmount" name="availableAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">占用库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="usedAmount" name="usedAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div> 
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">损耗库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="lossAmount" name="lossAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>   -->
					                            </div>
					                            <!-- 库存数据结束 -->   
					                        	<!-- 看售出的数量结束 -->
					                        </div>
					                    </div>
					               </div>
					            </div>
					            <div style="text-align: center;">
					            	<button id="btn_cancel_goods_item" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        	<button id="btn_save_goods_item" type="button" name="btn_save_goods_item" class="btn btn-primary">保存并下一页</button>
						        </div>
				            </form>
				        </div>
					     <!--库存信息容器（单品）  end-->
					</div>
					<div class="tab-pane" id="tab_5">
						<!--库存信息容器（多规格商品）  start-->
						<div class="row">
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsSkuForm">
					            <div class="box-content row">
					                <!-- 正式页面开始 -->
					               <div style="width: 90%; margin:0 auto;">
					                    <!-- 添加商品选择开始 -->
					                    <div style="width: 100%;">
					                        <!-- 新增组合开始 -->
					                        <div style="min-height: 80px;" class="alert alert-info">
					                            <button type="button" id="btn_add_sku" class="btn btn-primary">新增组合规格</button>
					                            	<div class="L_packing_specifications"></div>
	<!-- 				                            <div style="height: 30px;margin-top:20px" class="L_all_spt"> -->
	<!-- 				                                <p class="col-md-3" style="font-weight: bold;">规格1：</p> -->
	<!-- 				                                <p class="col-md-3">2个装</p> -->
	<!-- 				                                <p class="col-md-3">红色</p> -->
	<!-- 				                                <p><button class="btn btn-success">删除</button></p> -->
	<!-- 				                            </div> -->
					                        </div>
					                        <!-- 新增组合结束 -->
					                    </div>
					                    <!-- 库存方式开始 -->
					                    <!-- <div style="width: 100%; height: 30px;">
					                        <p class="col-md-2">库存方式：</p>
					                        <p class="col-md-3"><input type="radio" name="skuStockType" class="skuStockType" value="2">共享库存</p>
					                        <p class="col-md-3"><input type="radio" name="skuStockType" class="skuStockType" value="1" checked="checked">独立库存</p>                    
					                    </div> -->
					                    <!-- 库存方式结束 -->
					                    <!-- 库存方式选择框开始 -->
					                    <div style="width: 100%;">
					                        <div style="min-height: 200px;" class="alert alert-info">
					                            <div style="width: 100%;">
					                                <p class="col-md-4">规格：</p>
					                                <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                    <select class="form-control L_spt_next" id="sku_list_dropdown">
	<!-- 				                                        <option>2个装 红色</option> -->
					                                    </select>
					                                </div>
					                            </div>
					                            <div style="width: 100%;display: none;" id="skuStoreDiv">
					                                <p class="col-md-4">规格占用库存：</p>
					                                <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                    <input type="text" id="skuStore" name="skuStore" class="form-control" placeholder="请输入1~999999999的正整数">
					                                </div>
					                            </div>
					                            <div style="width: 100%;">
					                                <p class="col-md-4">规格商品副标题：</p>
					                                <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                    <input type="text" id="skuSubtitle" name="skuSubtitle" class="form-control" placeholder="长度在1~25之间">
					                                </div>
					                            </div>
					                            <!-- 图片展示开始 -->
<!-- 					                            <div class="box-content" style="margin-left: 25%;"> -->
<!-- 					                                <br> -->
<!-- 					                                <ul class="thumbnails gallery"> -->
<!-- 					                                    <li id="image-1" class="thumbnail"> -->
<!-- 					                                        <a style="background:url(https://raw.githubusercontent.com/usmanhalalit/charisma/1.x/img/gallery/thumbs/1.jpg)" -->
<!-- 					                                               title="Sample Image 1" href="https://raw.githubusercontent.com/usmanhalalit/charisma/1.x/img/gallery/1.jpg"> -->
<!-- 					                                            <img class="grayscale" src="https://raw.githubusercontent.com/usmanhalalit/charisma/1.x/img/gallery/thumbs/1.jpg" -->
<!-- 					                                                alt="Sample Image 1"> -->
<!-- 					                                            </a> -->
<!-- 					                                        </li> -->
<!-- 					                                 </ul> -->
<!-- 					                            </div> -->
					                            <!-- 图片展示结束 -->
					                            <!-- 看售出的数量开始 -->
					                            <div style="width: 100%;">
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">售卖单位：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <select class="form-control goodsUnit" id="skuSaleUnit" name="skuSaleUnit">
<!-- 					                                            <option value="1">份</option> -->
					                                        </select>
					                                    </div>
					                                </div>
					                                <!-- 采购方式开始 -->
					                                <div style="width: 100%; height: 30px;">
					                                    <p class="col-md-4">采购方式：</p>
					                                    <p class="col-md-3"><input type="radio" name="skuPurchaseMode" value="0" checked="checked">先单后采</p>
					                                    <p class="col-md-3"><input type="radio" name="skuPurchaseMode" value="1">先采后单</p>                    
					                                </div>
					                                <!-- 采购方式结束 -->
					                                <!-- <div style="width: 100%;">
					                                    <p class="col-md-4">可售卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuCanSaleAmount" name="skuCanSaleAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">可超卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuOverAmount" name="skuOverAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">已售卖量：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuSaleAmount" name="skuSaleAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                            </div>
					                            库存数据开始
					                            <div style="width: 100%; margin-top:220px;">
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">售卖库存率：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuSaleRate" name="skuSaleRate" class="form-control" placeholder="请输入正整数或小数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%; margin-top:220px;">
					                                    <p class="col-md-4">库存单位：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <select class="form-control goodsUnit" id="skuStockUnit" name="skuStockUnit">
					                                            <option value="1">份</option>
					                                        </select>
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">总库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuStockAmount" name="skuStockAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">可用库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuAvailableAmount" name="skuAvailableAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">占用库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuUsedAmount" name="skuUsedAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div> 
					                                <div style="width: 100%;">
					                                    <p class="col-md-4">损耗库存：</p>
					                                    <div class="form-group col-md-7" style="margin-top:-8px; ">
					                                        <input type="text" id="skuLossAmount" name="skuLossAmount" class="form-control" placeholder="请输入1~999999999的正整数">
					                                    </div>
					                                </div>  --> 
					                            </div>
					                            <!-- 库存数据结束 -->   
					                        	<!-- 看售出的数量结束 -->
					                        </div>
					                    </div>
					               </div>
					            </div>
					            <div style="text-align: center;">
					            	<button id="btn_cancel_sku_list" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        	<button id="btn_save_sku_list" type="button" name="btn_save_sku_list" class="btn btn-primary">保存并下一页</button>
						        </div>
				            </form>
				        </div>
					     <!--库存信息容器（多规格商品）  end-->
					</div>
					<div class="tab-pane" id="tab_6">
						<!--库存信息容器（组合商品）  start-->
				        <div class="box-content row">
			                <!-- 正式页面开始 -->
			               <div style="width: 90%; margin:0 auto;">
			                    <!-- 商品详情开始 -->
			                    <div style="width: 100%; min-height:600px; "  class="alert alert-info">
									<div style="background-color: #f1fafd;padding: 10px 8px 0;">
										<form class="el-form demo-form-inline el-form--inline">
											<div class="el-form-item">
												<label class="el-form-item__label">市场价</label>
												<div class="el-form-item__content" id="suggestPriceDiv">￥ 0</div>
											</div>
											<div class="el-form-item">
												<label class="el-form-item__label"> 销售价 </label>
												<div class="el-form-item__content" id="mallPriceDiv">
													￥ 0
												</div>
											</div>
										</form>
									</div>
									<table id="collectionTable" class="table table-striped table-bordered bootstrap-datatable responsive L_stock_add" style="width: 100%; margin: 0 auto; text-align: center;">
			                            <thead>
			                                <tr>
			                                    <th style="width: 30%;">商品名称</th>
			                                    <th style="min-width: 90px;text-align: center;">售卖单位</th>
			                                     <th style="min-width:45px;text-align: center;">市场价(￥)</th>
			                                     <th style="min-width:45px;text-align: center;">销售价(￥)</th>
			                                    <th style="min-width: 60px;text-align: center;">数量</th>
			                                    <!-- <th style="min-width: 60px;text-align: center;">占用库存</th> -->
			                                    <th style="min-width: 60px;text-align: center;">操作</th>
			                                </tr>
			                            </thead>
			                            <tbody class="L_subject">
<!-- 				                                <tr class="L_all_look"> -->
<!-- 				                                    <td><img src="https://raw.githubusercontent.com/usmanhalalit/charisma/1.x/img/gallery/thumbs/1.jpg" style="width: 50px; height: 50px;">苹果1</td> -->
<!-- 				                                    <td class="center L_int_txt">个</td> -->
<!-- 				                                    <td class="center L_int_nub"><input type="text" name="" value = "5"  class="form-control"></td> -->
<!-- 				                                    <td class="center L_int_nub"><input type="text" name="" value = "5" class="form-control"></td> -->
<!-- 				                                    <td class="center"> -->
<!-- 				                                        <a class="btn btn-danger " href="#"> -->
<!-- 				                                            <i class="glyphicon glyphicon-trash icon-white"></i>删除 -->
<!-- 				                                        </a> -->
<!-- 				                                    </td> -->
<!-- 				                                </tr> -->
			                            </tbody>
			                        </table>
			                        <!-- 查找添加商品库存信息开始 -->
			                        <div style="width: 100%; margin: 0 auto; text-align: center; border; margin-top: 50px;">
			                            <div style="width: 100%; margin: 0 auto; ">
			                                <P class = "col-md-5"><input name="searchKeyword" id="searchKeyword" class="form-control" placeholder="请输入商品名称"></P>
			                                <p class = "col-md-2"><button class="btn btn-primary" id="btn_search" style="width: 60px;height: 35px;">查找</button></p>  
			                            </div>
		                            	<div role="grid" class="box-body table-responsive">
											<table id="listTable" class="table table-hover table-striped table-bordered">
											
											</table>
										</div>
			                        </div>
			                    </div>
			                    <!-- 商品详情结束 -->
			               </div>
			               <div style="text-align: center;">
			               		<button id="btn_cancel_collection" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
					        	<button class="btn btn-primary" id="btn_save_collection" type="button" name="btn_save_collection">保存并下一页</button>
					       </div>
			            </div>  
						<!-- 库存信息容器（组合商品）  end-->
					</div>
					<div class="tab-pane" id="tab_7">
						<!-- 属性信息容器  start-->
						<div class="box-body">
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsPropertyForm">
								<div class="form-group" id="propertySkuShow">
		                            <p class="col-md-2 control-label">规格：</p>
		                            <div class="col-md-6">
	                                    <select class="form-control" id="property_sku_dropdown">
	                                    </select>
	                                </div>
	                            </div>
<!-- 	                        	<div class="form-group"> -->
<!-- 		                            <p class="col-md-2 control-label">建议售价：</p> -->
<!-- 		                            <div class="col-md-6"> -->
<!-- 		                                <div> -->
<!-- 		                                    <input type="text" class="form-control" id="suggestPrice" name="suggestPrice"> -->
<!-- 		                                </div> -->
<!-- 		                            </div> -->
<!-- 		                            <button type='button' name='删除' class='btn btn-primary glyphicon' onclick='deleteItem(this)'>删除</button> -->
<!-- 	                            </div> -->
<!-- 	                            <div class="form-group"> -->
<!-- 		                            <p class="col-md-2 control-label">建议售价1：</p> -->
<!-- 		                            <div class="col-md-6"> -->
<!-- 		                                <div> -->
<!-- 		                                    <select class='form-control'  name='type'> -->
<!-- 		                                    	<option value="1">1</option> -->
<!-- 	                                            <option value="2">2</option> -->
<!-- 	                                            <option value="3">3</option> -->
<!-- 		                                    </select> -->
<!-- 		                                </div> -->
<!-- 		                            </div> -->
<!-- 		                            <button type='button' name='删除' class='btn btn-primary glyphicon' onclick='deleteItem(this)'>删除</button> -->
<!-- 	                            </div> -->
<!-- 	                            <div class="form-group"> -->
<!-- 		                            <p class="col-md-2 control-label">建议售价2：</p> -->
<!-- 		                            <div class="col-md-6"> -->
<!-- 		                                <div class="col-md-3 control-label"> -->
<!-- 		                                    <input type="checkbox"  id="suggestPrice" name="suggestPrice">&nbsp;&nbsp;冷藏 -->
<!-- 		                                </div> -->
<!-- 		                                <div class="col-md-3 control-label"> -->
<!-- 		                                    <input type="checkbox"  id="suggestPrice" name="suggestPrice">&nbsp;&nbsp;即食 -->
<!-- 		                                </div> -->
<!-- 		                                <div class="col-md-3 control-label"> -->
<!-- 		                                    <input type="checkbox"  id="suggestPrice" name="suggestPrice">&nbsp;&nbsp;即食 -->
<!-- 		                                </div> -->
<!-- 		                            </div> -->
<!-- 		                            <button type='button' name='删除' class='btn btn-primary glyphicon' onclick='deleteItem(this)'>删除</button> -->
<!-- 	                            </div> -->
	                         </form>
	                         <div style="text-align: center;">
	                         	<button id="btn_cancel_goodsProperty" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
	                         	<button id="btn_add_goodsProperty" type="submit" name="添加商品属性" class="btn btn-primary glyphicon">添加商品属性</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        <button id="btn_save_goodsProperty" type="submit" name="btn_save_goodsProperty" class="btn btn-primary">保存并下一页</button>
						     </div>
	                    </div>
						<!-- 属性信息容器  end-->
					</div>
					<div class="tab-pane" id="tab_8">
						<!--价格信息容器  start-->
						<div class="box-body">
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsPriceForm">
							<div id="goodGroupDiv">
								<!-- <div id="skuShow">
		                            <div class="form-group">
			                            <p class="col-md-2 control-label">规格定价类型：</p>
			                            <div class="col-md-6">
			                                <div>
			                                	<p class="radio-inline"><input name="specificationType" class="specificationType" type="radio" value="1" checked="checked"/>多规格同价</p>
												<p class="radio-inline"><input name="specificationType" class="specificationType" type="radio"  checked="checked" value="0"/>多规格不同价</p>
			                                </div>
			                            </div>
		                            </div>
		                            <div class="form-group">
			                            <p class="col-md-2 control-label">规格：</p>
			                            <div class="col-md-6">
		                                    <select class="form-control" id="price_sku_dropdown">
					                        <option>2个装 红色</option>
					                        <option>3个装 红色</option>
		                                    </select>
		                                </div>
		                            </div>
		                        </div>
		                        	<div class="form-group">
			                            <p class="col-md-2 control-label">市场价(￥)：</p>
			                            <div class="col-md-6">
			                                <div>
			                                    <input type="text" class="form-control" id="suggestPrice" name="suggestPrice" placeholder="请输入正整数或小数，范围0~999999999">
			                                </div>
			                            </div>
		                            </div>
		                            <div class="form-group">
			                            <p class="col-md-2 control-label">商城售价(￥)：</p>
			                            <div class="col-md-6">
			                                <div>
			                                    <input type="text" class="form-control" id="mallPrice" name="mallPrice" placeholder="请输入正整数或小数，范围0~999999999">
			                                </div>
			                            </div>
		                            </div> -->
	                            </div>
	                            <!-- <div class="form-group">
		                            <p class="col-md-2 control-label">门店售价(￥)：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="storePrice" name="storePrice" placeholder="请输入正整数或小数，范围0~999999999">
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">企业售价(￥)：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="companyPrice" name="companyPrice" placeholder="请输入正整数或小数，范围0~999999999">
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">代理售价(￥)：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="proxyPrice" name="proxyPrice" placeholder="请输入正整数或小数，范围0~999999999">
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">成本价(￥)：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="costPrice" name="costPrice" placeholder="请输入正整数或小数，范围0~999999999">
		                                </div>
		                            </div>
	                            </div>
	                            <div class="form-group">
		                            <p class="col-md-2 control-label">标准进价(￥)：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="purchasePrice" name="purchasePrice" placeholder="请输入正整数或小数，范围0~999999999">
		                                </div>
		                            </div>
	                            </div> -->
	                            <div style="text-align: center;">
	                            	<button id="btn_cancel_goodsPrice" type="button" class="btn btn-default" >返回列表</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        	<button id="btn_save_goodsPrice" type="button" name="btn_save_goodsPrice" class="btn btn-primary">保存并返回列表</button>
						        </div>
	                         </form>
	                    </div>
						<!-- 价格信息容器  end-->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 隐藏，商品相册/商品详情页签，商品素材选择对话框 -->
	<div class="modal fade" id="chooseMaterialModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document" style="min-width: 1000px;overflow: auto;">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title" id="myModalLabel">选择图片</h4>
	        </div>
	        
	        <div class="modal-body" id="goods_choose_material_body" style="height: 650px;">
		        <div class="form-group col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="box-inner">
						<div class="box-header well" data-original-title="">
							<h2><i class="glyphicon"></i> 商品分类</h2>
						</div>
						<div id="chooseMaterialTreeDiv"></div>
					</div>
				</div>
				<div class="form-group col-xs-8 col-sm-8 col-md-9 col-lg-9">
					<div class="box-inner">
						<div class="box-header well" data-original-title="">
							<h2><i class="glyphicon"></i> 分类素材</h2>
						</div>
						<div class="box-content">
							<ul class="thumbnails gallery" id="imageDiv">
								
							</ul>
						</div>
						<ul id="pageList" class="pagination" style="margin-top: 0px;margin-bottom: 0px;margin-left: 400px;">
						
						</ul>
						<input type="hidden" id="materialSearchGoodsType"/>
						<input type="hidden" id="currentPage"/>
				        <input type="hidden" id="pageSize"/>
				        <input type="hidden" id="total"/>
					</div>
				</div>
	        </div>
	        <div class="modal-footer">
	          <button id="btn_choose_material_confirm" type="button" name="submit" class="btn btn-primary">保存</button>
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <!-- 隐藏树结构(多规格商品) -->
	  <div class="modal fade" id="goodsSkuListTreeModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title">选择规格</h4>
	        </div>
	        
	        <div class="modal-body" id="goods_sku_list_tree">
	        </div>
	        
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal" id="btn_sku_cancel"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>取消</button>
	          <button id="btn_sku_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <!-- 隐藏树结构（商品分类） -->
	  <%@include file="../goods/dialog/goodsTypeTreeDialog.jsp"%>
	  
	  <!-- 隐藏（商品属性） -->
	  <div class="modal fade" id="chooseGoodsPropertyModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title">选择商品属性</h4>
	        </div>
	        
	        <div role="grid" class="box-body table-responsive">
				<table id="goodsPropertyListTable" class="table table-hover table-striped table-bordered">
				
				</table>
			</div>
	        
	        <div class="modal-footer">
	          <button id="btn_goodsProperty_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <!-- 隐藏（商品标签） -->
	  <div class="modal fade" id="chooseGoodsTagModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title">选择商品标签</h4>
	        </div>
	        
	        <div role="grid" class="box-body table-responsive">
	        	<!-- 表单查询区域begin -->
				<div>
					<form id="searchForm" class="form-inline" role="form" style="padding: 10px;" onSubmit="return false;">
						<div class="controls controls-row">
							<div class="form-group">
								<span>标签名称：</span><input type="text" name="searchTagKeyword" id="searchTagKeyword" class="form-control input-small" style="width: 150px;"/>
							</div>
					        <div class="form-group">
					        	<button id="tag_btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
					        </div>
				      </div>
					</form>
				</div>
						
				<table id="goodsTagListTable" class="table table-hover table-striped table-bordered">
				
				</table>
			</div>
	        
	        <div class="modal-footer">
	          <button id="btn_goodsTag_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
	        </div>
	      </div>
	    </div>
	  </div>
		  
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<!-- 七牛正式环境 -->
    <script src="${contextPath}/resources/charisma-master/bower_components/plupload/plupload.full.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/qiniu/qiniu.min.js"></script>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsAdd.js" type="text/javascript"></script>
    <script src="${contextPath}/resources/js/business/publicData/goods/dialog/goodsTypeTreeDialog.js" type="text/javascript"></script>
</body>
</html>
