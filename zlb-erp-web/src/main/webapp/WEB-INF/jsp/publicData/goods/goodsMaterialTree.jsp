<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta charset="UTF-8">
	<title>商品分类管理</title> <!-- ★ 导入公共样式库 -->
	<%@include file="../../common/commonCss.jsp"%>
	
<style>
	#imageDiv>li:hover{
		cursor:pointer;
		border: 1px solid red;
	}
</style>
</head>

	<!-- 菜单位置导航starts -->
	<div class="box-header well" data-original-title="">
		<h2><i class="glyphicon glyphicon-user"></i>商品管理>商品素材管理</h2>
	</div>
	<!-- 菜单位置导航ends -->
    <div class="box-content">
        <div id="material_form_div" style="min-width: 1024px;">
            <div class="form-group col-md-1 no-padding" style="width: 300px;height: 100%;">
                <div class="box-inner">
                    <div class="box-header well" data-original-title="">
                        <h2><i class="glyphicon"></i> 商品分类</h2>
                    </div>
                    <div id="goodsMaterialTreeDiv"></div>
                    <div class="modal-header" align="center">
    <!-- 				<button id="btn_show_up" class="btn btn-primary" type="button">上移</button> -->
    <!-- 				<button id="btn_show_down" class="btn btn-primary" type="button">下移</button> -->
    <!-- 				<button id="btn_show_add" class="btn btn-primary" type="button">新增</button> -->
    <!-- 		        <button id="btn_show_delete" class="btn btn-primary" type="button">删除</button> -->
                    </div>
                </div>
            </div>
            <div class="form-group col-md-2 left-right-margin no-padding" style="width: 700px;height: 100%;">
                <div class="box-inner">
                    <div class="box-header well" data-original-title="">
                        <h2><i class="glyphicon"></i> 分类素材</h2>
                    </div>
                    <div>
                        <form id="searchForm" class="form-inline" role="form" style="padding: 10px 10px 10px 25px;" onSubmit="return false;">
                            <div class="controls controls-row">
                                <div class="form-group">
                                    <span>文件名称：</span><input type="text" name="searchKeyword" id="searchKeyword" class="form-control input-small" style="width: 150px;"/>
                                </div>
                                <div class="form-group">
                                    <button id="btn_search" class="btn btn-success btn-flat" type="button">搜索</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="box-content">
                        <ul class="thumbnails gallery" id="imageDiv">

                        </ul>
                    </div>
                    <form id="addForm" class="form-horizontal" class="form-inline"  role="form">
                     <div id="fName" >
                        <p class="col-md-3 control-label" style="padding: 0px;width: 80px;line-height: 35px;"><span class="text-required">*</span>文件名称：</p>
                        <input class="form-control" type="text" id="fileName" style="width: 180px;margin-top: -10px;" onKeyUp="checkName();" placeholder="请输入文件名称" onmouseout="checkName();"/>
                     </div>
                     <div style="margin: 5px 0px 0px 0px;">
                         <div class="col-md-6">
                             <p class="col-md-3 control-label" style="padding: 0px;width: 80px;margin-left: -10px;"><span class="text-required">*</span>上传素材：</p>
                             <div id="uploadDiv">
                                <input type="text" class="form-control" id="imageUrl" name="imageUrl" style="display: none;"/>
                                <input type="file" id="imgFile" name="imgFile" multiple />
                             </div>
                         </div>
                        <div id="pgsbar" class="progress progress-striped active" style="margin-top: 20px;height: 10px;width: 500px;visibility: hidden;float: left;margin-left: 100px;">
                            <div id="pgsbarColor" class="progress-bar progress-bar-success" role="progressbar"
                                 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                 style="width: 0%;">
                            </div>
                        </div>
                        <ul id="pageList" class="pagination" style="margin-top: 0px;margin-bottom: 0px;margin-left: 400px;">
                            <!-- <li class="active" onclick="javascript:alert(this.innerText)"><a href="javascript:;"><div>1</div></a></li>
                            <li ><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">&raquo;</a></li> -->
                        </ul>
                    </div>
                    <input type="hidden" id="fileUrl"/>
                    <input type="hidden" id="goodsType"/>
                    <input type="hidden" id="currentPage"/>
                    <input type="hidden" id="pageSize"/>
                    <input type="hidden" id="total"/>
                </form>
            </div>
        </div>
        </div>
    </div>
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
	<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
	<!-- 七牛测试环境 -->
	<%-- <script src="${contextPath}/resources/charisma-master/bower_components/plupload/plupload.dev.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/plupload/moxie.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/qiniu/qiniu.js"></script> --%>
	<!-- 七牛正式环境 -->
	<script src="${contextPath}/resources/charisma-master/bower_components/plupload/plupload.full.min.js"></script>
	<script src="${contextPath}/resources/charisma-master/bower_components/qiniu/qiniu.min.js"></script>
	
	<!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsMaterialManager.js" type="text/javascript"></script>
</body>

<script>
	//校验内容
// 	function checkValue() {
// 		//判断文件框是否有内容，有则显示提交按钮
// 		var a = $("#imgFile").val()
// 		if(a != null) {
// 			$("#btn_upload_file").css("visibility","visible");
// 		} else {
// 			$("#btn_upload_file").css("visibility","hidden");
// 		}
// 	}
	
	
</script>
</html>

