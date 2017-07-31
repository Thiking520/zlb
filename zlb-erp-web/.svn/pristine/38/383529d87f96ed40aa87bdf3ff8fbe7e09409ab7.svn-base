<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <!-- ★ 导入公共样式库 -->
    <%@include file="../../common/commonCss.jsp"%>
    <link rel="shortcut icon" href="img/favicon.ico">
</head>
<body>

<div id="content">

    <!-- 菜单位置导航ends -->

    <div>
        <div >
            <div class="box-inner">
                <div class="box-header well" data-original-title="">
                    <h2><i class="glyphicon glyphicon-user"></i>出库管理>拣货单</h2>
                    <%@include file="../myWarehouse.jsp"%>
					<input type="hidden" id="init" value="/wms/pick/init">
                </div>

                <!-- 每个人只用关注这块区域starts -->
                <div class="box-content">
                    <!-- 表单查询区域begin -->
                    <div class="alert alert-info">
                        <form id="pickSearchForm" class="form-inline" role="form" onkeydown="if(event.keyCode==13)return false;" action="#" method="post" >
                            <div class="controls controls-row">
                                <div class="form-group">
                                    <span>拣货单号：</span><input type="text" name="pickCode" id="pickCode" class="form-control input-small" style="width: 150px;"/>
                                </div>
                                <div class="form-group">
                                    <span>拣货单打印标记：</span>
                                    <div class="input-group">
                                        <select class="form-control"  name="pickFlag" id="pickFlag">
                                            <option value="">全部</option>
                                            <option value="1">已打印</option>
                                            <option value="0">未打印</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span>面单打印标记：</span>
                                    <div class="input-group">
                                        <select class="form-control"  name="expressFlag" id="expressFlag">
                                            <option value="">全部</option>
                                            <option value="1">已打印</option>
                                            <option value="0">未打印</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <span>状态：</span>
                                    <div class="input-group">
                                        <select class="form-control"  name="state" id="state">
                                            <option value="">全部</option>
                                            <option value="10">新建</option>
                                            <option value="20">已下达</option>
                                            <option value="30">拣货中</option>
                                            <option value="98">已作废</option>
                                            <option value="99">完成</option>
                                        </select>
                                    </div>
                                </div>
                                <button id="btn_pick_search" class="btn btn-success btn-flat" type="button">搜索</button>
                                <button id="btn_pick_clear" class="btn btn-primary btn-flat" type="button">清空</button>

                            </div>
                        </form>
                    </div>
                    <!-- 表单查询区域end -->

                    <!-- 分页列表区域begin -->
                    <div role="grid" class="box-body table-responsive" >
                        <div class="table_nav">
                        <div id="toolbar" class="btn-group">
                            <button type="button" class="btn btn-default  btn-sm" id="btn_pick_fp"><span class="glyphicon glyphicon-user" style="color: green;"></span>分派</button>
                            <button type="button" class="btn btn-default  btn-sm" id="btn_pick_ok"><span class="glyphicon glyphicon-ok" style="color: #048030;"></span>拣货完成确认</button>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                     单据打印
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li id="btn_express_print"><a href="#">打印面单</a></li>
                                    <li id="btn_pick_print"><a href="#">打印拣货单</a></li>
                                    <li id="btn_shopping_print"><a href="#">打印购物清单</a></li>
                                </ul>
                            </div>
                            <button type="button" class="btn btn-default  btn-sm" id="pickCancellation"><span class="glyphicon glyphicon-remove-circle"></span>作废</button>
                            <button type="button" class="btn btn-default btn-sm"  id="btn_pick_export"> <span class="glyphicon glyphicon glyphicon-export" style="color:green;"></span>批量导出</button>
                        </div>
                           <%-- <div class="btn-group" style="margin-left: 10px;margin-bottom: 10px">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">其他操作
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li id="cancelAssign"><a href="#">取消分派</a></li>
                                    <li id="pickCancellation"><a href="#">作废</a></li>
                                    &lt;%&ndash;<li><a href="#">操作日志</a></li>&ndash;%&gt;
                                </ul>
                            </div>--%>
                        </div>
                        <table id="pickListTable" class="table table-hover table-striped table-bordered" >

                        </table>
                    </div>
                    <!-- 分页列表区域ends -->
                </div>
                <!-- 每个人只用关注这块区域starts -->
            </div>
        </div>
    </div>
</div>


<!-- 隐藏，拣货单分批-->
</div>
<div class="modal fade" id="pickFpModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="height: 300px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel02" >
                    拣货单分派
                </h4>
            </div>
            <div class="modal-body" id="pick_div">
                <div class="form-group">
                    <p class="col-md-3 control-label">分派：</p>
                    <div class="col-md-6">
                                <div class="input-group">
                                    <input name="" id="pick_name" class="form-control input-small" type="text" disabled="disabled">
                                    <input name="" id="pick_emp_code" style="display: none;"/>
                                    <div class="input-group-addon"><span class="glyphicon glyphicon-search" id="pick_div_emp"></span></div>
                                </div>
                                <div style="margin: 50px">
                                    <button type="button" class="btn btn-primary" id="btn_pickQrEmp" >确定</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                </div>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!-- 选择负责人模态框（Modal） -->
<div class="modal fade" id="myModal03" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel03">选择负责人</h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-inline" role="form" id="empForm">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>姓名:</span><input name="name_emp" id="name_emp"
                                                   class="form-control" style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>电话:</span><input name="tel_emp" id="tel_emp"
                                                   class="form-control" style="width: 130px;">
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-success btn-flat"
                                    id="btn_search_emp">搜索</button>
                            <button id="clear_btn_pickemp" class="btn btn-primary btn-flat" type="button">清空</button>
                        </div>
                    </div>
                </form>
                <table id="empList"></table>
                <button type="button" class="btn btn-default"
                        data-dismiss="modal" style="margin-left: 75%;margin-top: 10px">关闭</button>
                <button type="button" class="btn btn-primary" id="emp_save" style="margin-top: 10px">确认</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!--查看拣货单明细-->
<div class="modal fade" id="pickDetailModel" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true" style="width: auto;height: auto">
    <div class="modal-dialog">
        <div class="modal-content" style="width: 660px;max-height: 500px;overflow:auto">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel07">查看拣货明细</h4>
            </div>
            <div class="modal-body" >
                <table class="table table-striped" id="pickDetailTable">
                    <thead>
                    <tr>
                        <th style="width: 10%">出库单号</th>
                        <th style="width: 17%">库位</th>
                        <th style="width: 17%">商品编码</th>
                        <th style="width: 25%">商品名称</th>
                        <th style="width: 7%">单价</th>
                        <th style="width: 7%">数量</th>
                        <th style="width: 17%">格子号</th>
                    </tr>
                    </thead>
                </table>
                <tbody>
                </tbody>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!-- ★ 导入公共JS库 -->
<%@include file="../../common/commonJs.jsp"%>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/wms/storageout/pickList.js" type="text/javascript"></script>
</body>
</html>
