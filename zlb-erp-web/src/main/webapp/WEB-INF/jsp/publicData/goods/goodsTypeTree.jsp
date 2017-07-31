<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta charset="UTF-8">
	<title>商品分类管理</title> <!-- ★ 导入公共样式库 -->
	<%@include file="../../common/commonCss.jsp"%>
	
	<style type="text/css">
		.list-group li {
			border: 0px;
			list-style: square !important;
		}
	</style>
</head>

<body>
	<div class="content">
		<div>
			<div>
				<div class="box-inner">
					<!-- 菜单位置导航starts -->
					<div class="box-header well" data-original-title="">
						<h2><i class="glyphicon glyphicon-user"></i>商品管理>商品分类管理</h2>
					</div>
					<!-- 菜单位置导航ends -->
						
					<div class="box-content">
						<div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-2 no-padding">
							<div>
								<div class="box-header well" data-original-title="">
									<h2><i class="glyphicon"></i> 商品分类</h2>
								</div>
								<div id="goodsTypeTreeDiv"></div>
								<div class="modal-header" align="center">
				<!-- 				<button id="btn_show_up" class="btn btn-primary" type="button">上移</button> -->
				<!-- 				<button id="btn_show_down" class="btn btn-primary" type="button">下移</button> -->
									<button id="btn_show_add" class="btn btn-primary" type="button">新增</button>
						          	<button id="btn_show_delete" class="btn btn-danger" type="button">删除</button>
						        </div>
							</div>
						</div>
						<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-5" id="addType" style="display: none;">
							<div class="box-inner">
								<div class="box-header well" data-original-title="">
									<h2 id="myModalLabel"><i class="glyphicon"></i> 商品分类详情</h2>
								</div>
								<div class="box-body" style="padding-top: 30px;">
									<form class="form-horizontal" class="form-inline" role="form" id="addForm" onSubmit="return false;">
					                   	<div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label"><span class="text-required">*</span>上级分类：</p>
					                        <div class="col-md-6">
					                            <div>
					                            	<input type="text" name="parentName" id="parentName" class="form-control" readonly>
					                            	<input type="text" name="parentId" id="parentId" class="form-control" style="display: none;">
					                                <input type="text" name="keyId" id="keyId" class="form-control" style="display: none;">
					                            </div>
					                        </div>
					                    </div>
					                    <div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label"><span class="text-required">*</span>分类名称：</p>
					                        <div class="col-md-6">
					                            <div>
					                                <input type="text" class="form-control" id="typeName" name="typeName">
					                            </div>
					                        </div>
					                    </div>
					                    <div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label">分类编码：</p>
					                        <div class="col-md-6">
					                            <div>
					                                <input type="text" class="form-control" readonly="" id="typeCode" name="typeCode"  placeholder="由系统自动生成">
					                            </div>
					                        </div>
					                    </div>
					                    <div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label">分类描述：</p>
					                        <div class="col-md-6">
					                            <div>
					                                <input type="text" class="form-control" id="typeDesc" name="typeDesc">
					                            </div>
					                        </div>
					                    </div>
					                    <div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label"><span class="text-required">*</span>排序值：</p>
					                        <div class="col-md-6">
					                            <div>
					                                <input type="text" class="form-control" id="sortIndex" name="sortIndex">
					                            </div>
					                        </div>
					                    </div>
					                    <div class="form-group">
				                            <p for="typeEnabled" class="col-md-3 control-label"><span class="text-required">*</span>有效性：</p>
				                            <div class="col-md-6">
												<div class="md-radio-inline">
													<label class="radio-inline"><input name="typeEnabled" class="typeEnabled" type="radio" value="0" />有效</label>
													<label class="radio-inline"><input name="typeEnabled" class="typeEnabled" type="radio" value="1"/>无效</label>
												</div>
				                            </div>
				                        </div>
					                    <div class="form-group">
					                        <p for="pkgNo" class="col-md-3 control-label">分类图片：</p>
					                        <div class="col-md-6">
						                        <div>
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
					                    <input type="hidden" id="imageUrl"/>
								        <input type="hidden" id="goodsType"/>
								        <input type="hidden" id="currentPage"/>
								        <input type="hidden" id="pageSize"/>
								        <input type="hidden" id="total"/>
					                </form>
					            </div>
						        <div class="modal-footer">
						        	<button id="btn_save_submit" type="button" name="btn_save_submit" class="btn btn-primary" ><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
						        </div>
							</div>
						</div>
					</div>
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
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsTypeManager.js" type="text/javascript"></script>
</body>

<script>
// function checkValue() {
// 	//判断文件框是否有内容，有则显示提交按钮
// 	var a = $("#imgFile").val()
// 	if(a != null) {
// 		$("#btn_upload_file").css("visibility","visible");
// 	} else {
// 		$("#btn_upload_file").css("visibility","hidden");
// 	}
// }
</script>
</html>

