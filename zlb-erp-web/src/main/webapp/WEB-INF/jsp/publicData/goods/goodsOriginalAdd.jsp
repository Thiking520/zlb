<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link href="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css" rel="stylesheet">
<link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>
	
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div class="box-header well" data-original-title="">
			<h2><i class="glyphicon glyphicon-user"></i>商品管理>原始商品管理></h2>
			<h2><i class="glyphicon"></i><label id="labelText">新增原始商品</label></h2>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div class="nav-tabs-custom" style="padding-top: 30px;">
			<input type="hidden" id="keyId">
			<div class="form-group col-md-2" style="width: 60%;height: 100%;">
				<div class="tab-content">
					<div class="tab-pane active" id="tab_1">
						<!--基本信息容器  start-->
						<div class="box-body">
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsForm">
	                        	<div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品分类：</p>
		                            <div class="col-md-6">
		                                <div class="input-group">
		                                	<input name="goodsTypeName" id="goodsTypeName" class="form-control input-small choose_goods_type" style="background-color:white" type="text" readonly>
		                                	<input name="goodsType" id="goodsType" style="display: none;"/>
										    <div class="input-group-addon choose_goods_type" style="background-color: white;"><span class="glyphicon glyphicon-search"></span></div>
		                                </div>
		                            </div>
	                            </div>
		                        <div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品名称：</p>
		                            <div class="col-md-6">
		                                <div>
		                                    <input type="text" class="form-control" id="goodsName" name="goodsName" placeholder="长度在1~50之间">
		                                </div>
		                            </div>
		                        </div>
		                         <div class="form-group">
		                            <p class="col-md-2 control-label"><span class="text-required">*</span>商品单位：</p>
		                            <div class="col-md-6">
		                                <div>
		                                <!-- 提交数据时，通过下面的下拉框获取unit_value的值 -->
		                                 <select class="form-control L_spt_next goodsUnit" id="unit_value" name="unitValue">
					                	 </select>
					                	<!-- 提交数据时，通过下面的下拉框获取unit_desc的值 -->
					                	 <select style="display: none;" class="form-control L_spt_next goodsUnit" id="unit_desc" name="unitDesc">
					                	 </select>
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
		                        <div class="form-group">
		                            <p class="col-md-2 control-label">添加商品图片：<br>（点击图片弹出选择框）</p>
		                            <div class="col-md-6">
		                                <div>
		                                <img alt="" id="originalGoodsImgShow" src="${contextPath}/resources/img/noneImg.jpg"
			                        		class="thumbnail btn_add_goodsIamge"
											style="width: 100px; height: 100px; margin: 0px 0px 5px;">
											<input type="hidden" name="imgUrl" id="imgUrl" />
		                                </div>
		                            </div>
		                        </div>
		                        <div style="text-align: center;">
						        	<button id="btn_save_goods" type="button" name="btn_save_goods" class="btn btn-primary">保存</button>
		                        	<button id="btn_cancel_goods" type="button" class="btn btn-default" >取消</button>&nbsp;&nbsp;&nbsp;&nbsp;
						        </div>
		                     </form>
						</div>
						<!--基本信息容器  end-->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	  <!-- 隐藏树结构（商品分类） -->
	  <div class="modal fade" id="chooseGoodsTypeModal" tabindex="-1" param="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" param="document">
	      <div class="modal-content">
	        <div class="modal-header">
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <h4 class="modal-title">选择商品分类</h4>
	        </div>
	        
	        <div class="modal-body" id="goods_type_tree">
	        </div>
	        
	        <div class="modal-footer">
	          <button id="btn_goodsType_confirm" type="button" name="submit" class="btn btn-primary"  >确定</button>
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
	          <button data-dismiss="modal" id="btn_choose_material_confirm" type="button" name="submit" class="btn btn-primary">保存</button>
	        </div>
	      </div>
	    </div>
	  </div>
	  
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsOriginalAdd.js" type="text/javascript"></script>
</body>
</html>
