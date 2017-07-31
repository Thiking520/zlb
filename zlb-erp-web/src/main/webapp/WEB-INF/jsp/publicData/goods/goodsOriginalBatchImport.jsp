<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<!-- ★ 导入公共样式库 -->
<%@include file="../../common/commonCss.jsp"%>
<link href="${contextPath}/resources/charisma-master/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css" rel="stylesheet">
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css">


	.luara-left{position:relative;padding:0;overflow: hidden;}
	.luara-left ul{position: relative;padding: inherit;margin: 0;}
	.luara-left ul li{float: left;padding: inherit;margin: inherit;list-style: none;}
	.luara-left ul li img{width: inherit;height: inherit;}
	.example2{}
	.example2 ol{position:relative;width: 80px;height: 20px;top:-7%;left:60px;}
	.example2 ol li{float:left;width: 10px;height: 17px;margin: 5px;background: #fff;}
	.example2 ol li.seleted{background: #1AA4CA;}
</style>
</head>
<body>
	
	<div id="content">
		<!-- 菜单位置导航starts -->
		<div class="box-header well" data-original-title="">
			<h2><i class="glyphicon glyphicon-user"></i>商品管理>原始商品管理></h2>
			<h2><i class="glyphicon"></i><label id="labelText">批量导入原始商品</label></h2>
		</div>
		<!-- 菜单位置导航ends -->
		
		<div class="nav-tabs-custom" style="padding-top: 30px;">
			<div class="form-group col-md-2" style="width: 80%;height: 100%;">
				<div class="tab-content">
					<div class="tab-pane active" id="tab_1">
						<!--基本信息容器  start-->
						<div>
							<form class="form-horizontal" class="form-inline"  role="form" id="addGoodsForm">
		                        <div class="form-group" style="text-align: center;">
		                        <div class="form-group">
		                        <h5>excel下拉框数据导入说明<span style="font-size: 20px;margin:0px 0px 0px 5px;">↓</span></h5>
   									 <hr/>
		                        <!--Luara图片切换骨架begin-->
							    <div class="example2" style="position:relative;left: 30%;">
							        <ul>
							            <li><img src="${contextPath}/resources/img/publicData/1.jpg" alt="1"/></li>
							            <li><img src="${contextPath}/resources/img/publicData/2.jpg" alt="2"/></li>
							            <li><img src="${contextPath}/resources/img/publicData/3.jpg" alt="3"/></li>
							            <li><img src="${contextPath}/resources/img/publicData/4.jpg" alt="4"/></li>
							        </ul>
							        <ol>
							            <li>1</li>
							            <li>2</li>
							            <li>3</li>
							            <li>4</li>
							        </ol>
							    </div>
							    <h5>获取excel下拉框数据<span style="font-size: 20px;margin:0px 0px 0px 5px;">↓</span></h5>
   									 <hr/>
							    <div>
							    	<input type="text" readonly id="copyTypeData" style="margin: 5px;" value="...">
		                            <input type="button" id="copyType" value="点击复制类型码" />
		                        </div>
		                            
		                        <div>
									<input type="text" readonly id="copyUnitData" style="margin: 5px;" value="...">
									<input type="button" id="copyUnit" value="点击复制单位码" />
		                        </div>
		                        <h4>注意事项<span style="font-size: 20px;margin:0px 0px 0px 5px;">↓</span></h4>
   									 <hr/>
		                            <img alt="" src="${contextPath}/resources/img/publicData/excel_case.jpg">
		                            <br>
		                            <span style="color: red;">
		                            	注意：请按照示例图片所示填写excel文件！第一行文字必须与图片商的一样！
		                            	<br>
		                            	简介可以为空！
		                            </span>
		                            <br>
		                            <h5>浏览文件并导入数据<span style="font-size: 20px;margin:0px 0px 0px 5px;">↓</span></h5>
   									 <hr/>
			                        <div class="form-group">
												选择编辑好的xlsx文件：<input type="file" name="xlfile" id="xlf" style="display: inline;" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
									</div>
										<br>
		                             <button id="btn_import_goods" type="button" name="btn_save_goods" class="btn btn-primary">导入</button>
		                             <button id="btn_cancel_goods" type="button" class="btn btn-default" >取消</button>
		                       </div>
		                      </div>
		                   </form>
						</div>
						<!--基本信息容器  end-->
					</div>
				</div>
			</div>
		</div>
	</div>
	
<script src="${contextPath}/resources/js/business/publicData/goods/xlsx.core.min.js" 
	type="text/javascript">
</script>	
		
	<!-- ★ 导入公共JS库 -->
	<%@include file="../../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/publicData/goods/goodsOriginalBatchImport.js" type="text/javascript"></script>
</body>
</html>