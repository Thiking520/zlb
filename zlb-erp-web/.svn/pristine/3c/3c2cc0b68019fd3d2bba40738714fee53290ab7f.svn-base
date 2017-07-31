<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <!-- ★ 导入公共样式库 -->
    <%@include file="../common/commonCss.jsp"%>
    <link rel="shortcut icon" href="img/favicon.ico">
    <meta charset="utf-8">
    <title>Free HTML5 Bootstrap Admin Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
    <meta name="author" content="Muhammad Usman">
    <link href='${contextPath}/resources/charisma-master/css/order.css' rel='stylesheet'>
    <!-- The fav icon -->
    <link rel="shortcut icon" href="img/favicon.ico">
    <style type="text/css">
       /*  #warehouseCode ul li{
            float:left;
            border: 1px solid orange;
            margin-right: 50px;
            border-radius: 3px;
            height: 50px;
            text-align: center;
            width: 100px;
            font-size: 15px;
        }
        #warehouseCode ul{
            display: inline-block;
        }

        #warehouseCode{
            text-align: center;
            margin-top: 20px;
        }

        #warehouseCode ul li a{
            display: block;
            line-height: 35px;
        }
        .selected {
            background-color:#dddddd;
        } */
        table{
            text-align: center;
            border:solid 1px #d7e3ff;
            position: absolute;
            left: 2.5%;
            width: 70%;
        }
        td{
            width: 100px;
            text-align: center;
            border:solid 1px #d7e3ff;
        }
        tr{
            text-align: center;
            border:solid 1px #d7e3ff;
        }
        th{
            text-align: center;
            border:solid 1px #d7e3ff;
            background-color: #fff5d7;
        }
        .fixed-table-pagination{
            display: none;
        }
    </style>
</head>
<body>

<div class="row" style="width: 100%;">
    <div >
        <div class="box-inner" style="width: 100%;">
        	<div class="box-header well" data-original-title="">
					<h2><i class="glyphicon glyphicon-user"></i>仓储管理>首页</h2>
					 <!-- 下拉 -->
					<div class="btn-group pull-right">
						<div class="controls">
							<select id="warehouseCode">
							</select>
						</div>
					</div>
					<div class="btn-group pull-right">
						<h2>当前仓库：</h2>
					</div>
				</div>
            <!-- <div class="box-header well">
                <h2 style="font-size: 18px;"><i class="glyphicon glyphicon-info-sign"></i>仓库选择</h2>

                <div class="box-icon">
                    <a href="#" class="btn btn-setting btn-round btn-default"><i
                            class="glyphicon glyphicon-cog"></i></a>
                    <a href="#" class="btn btn-minimize btn-round btn-default"><i
                            class="glyphicon glyphicon-chevron-up"></i></a>
                    <a href="#" class="btn btn-close btn-round btn-default"><i
                            class="glyphicon glyphicon-remove"></i></a>
                </div>
            </div> -->
			<!-- 首页展示开始 -->
           <!--  <div  style="min-width: 100%; height: 200px;">
                <div class="alert alert-success" style="width: 95%; height: 150px; position: absolute; top: 7%; left: 2.5%;" >
                    <div id="warehouseCode">
                        <ul>
                        </ul>
                    </div>
                </div>
            </div> -->
             <div style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
				<span style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">入库</span>
			</div>
            <div style="width: 100%; height: 100px;margin-top: 20px">
                <table id="storgeinStatistics" style="width: 70%">
                </table>
            </div>
            <div style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
				<span style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">出库</span>
			</div>
            <div style="width: 100%; height: 100px;margin-top: 10px">
                <div style="margin-top: 20px">
                    <table id="outStorgeStatistics"  style="width: 70%">

                    </table>
                </div>
            </div>
            <div style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
				<span style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">库内操作</span>
			</div>
            <div style="width: 100%; height: 100px;margin-top: 10px">
                <div style="margin-top: 20px">
                    <table id="stockLocationStatistics" style="width: 70%">

                    </table>
                </div>
            </div>
            <div style="margin: 10px; border-bottom: 1px solid #d0d0d0; margin-top: 30px;">
				<span style="color: #EE951D; position: absolute; margin-top: -11px; background: white; margin-left: 150px; padding: 0 10px;">库存</span>
			</div>
            <div style="width: 100%; height: 100px;margin-top: 10px">
                <div style="margin-top: 20px;">
                    <table id="staleDatedSkuStatistics"  style="width: 70%">

                    </table>
                </div>
            </div>
            <!-- 首页展示结束 -->
        </div>
    </div>
</div>
<!-- ★ 导入公共JS库 -->
<%@include file="../common/commonJs.jsp"%>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/wms/wmsHomepage.js" type="text/javascript"></script>
</body>
</html>
