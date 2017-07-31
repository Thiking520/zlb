<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
        <div >
            <div class="box-inner">
                <div class="box-header well" data-original-title="">
                    <h2><i class="glyphicon glyphicon-user"></i> 采购计划>采购波次</h2>
                </div>

                <!-- 每个人只用关注这块区域starts -->
                <div class="box-content">
                    <!-- 表单查询区域begin -->
                    <div class="alert alert-info">
                        <form id="OrderWavePickingSearchForm" class="form-inline" role="form"  onkeydown="if(event.keyCode==13) return false;" action="#"  method="post">
                            <div class="controls controls-row">
                                <div class="form-group">
                                    <span>波次号：</span><input type="text" name="wavePicking" id="wavePicking" onkeyup="this.value=this.value.replace(/[^\d]/ig,'')" placeholder="请输入数字" class="form-control input-small" style="width: 150px;"/>
                                </div>
                                <button id="btn_orderWavePicking_search" class="btn btn-success btn-flat" type="button">搜索</button>
                                <button id="btn_orderWavePicking_clear" class="btn btn-primary btn-flat" type="button">清空</button>
                            </div>
                        </form>
                    </div>
                    <!-- 表单查询区域end -->

                    <!-- 分页列表区域begin -->
                    <div role="grid" class="box-body table-responsive" >
                        <div class="table_nav">
                        <div id="toolbar" class="btn-group">
                            <button type="button" class="btn btn-default  btn-sm" id="btn__add_orderWavePicking"><span class="glyphicon glyphicon-plus" style="color: green;"></span>新增</button>
                        </div>
                        </div>
                        <table id="orderWavePickingTable" class="table table-hover table-striped table-bordered" style="min-width: 800px;">

                        </table>
                    </div>
                    <!-- 分页列表区域ends -->
                </div>
                <!-- 每个人只用关注这块区域starts -->
            </div>
        </div>
    </div>
</div>


<!-- 新增和编辑（Modal） -->
<div class="modal fade" id="addOrderWavePicking" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width: 500px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel03">新增波次</h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-inline" role="form" id="addOrderWavePickingForm">
                    <div class="controls controls-row">
                        <table>
                            <input type="hidden" value="" id = "orderWavePickingId" name="orderWavePickingId">
                            <tr>
                                <td style="width: 100px;text-align: right;"><span class="text-required">*</span>开始时间：</td>
                                <td style="border: none;">
                                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                                        <input type="text" class="form-control" value="" id="startTime" name="startTime" readonly
                                               style="width: 200px; height: 30px;">
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100px;text-align: right;"><span class="text-required">*</span>结束时间：</td>
                                <td style="border: none;">
                                    <div class="input-group input-append date form_datetime" style="width: 250px; height: 30px;">
                                        <input type="text" class="form-control" value="" id="stopTime" name="stopTime" readonly
                                               style="width: 200px; height: 30px;">
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>

                                <td  style="width: 100px;text-align: right;">描述：</td>
                                <td style="border: none;">
                                <div class="input-group input-append" style="width: 250px; height: 30px;">
                                         <input type="text" name="remark" id="remark" class="form-control"
                                                                 style="width: 200px; height: 30px;">
                                    </div>
                               </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <button type="button" class="btn btn-primary" style="margin-left: 45%;margin-top: 20px"
                                            id="saveOrderWavePicking">保存
                                    </button>
                                    <button type="button" class="btn btn-default"
                                            data-dismiss="modal" style="margin-top: 20px">取消</button>
                                </td>
                            </tr>
                        </table>

                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>

<!-- ★ 导入公共JS库 -->
<%@include file="../common/commonJs.jsp"%>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/pms/OrderWavePicking.js" type="text/javascript"></script>
</body>
</html>
