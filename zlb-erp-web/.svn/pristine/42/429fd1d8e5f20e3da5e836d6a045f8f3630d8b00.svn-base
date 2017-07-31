<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@include file="../../common/taglib.jsp" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <!-- ★ 导入公共样式库 -->
    <%@include file="../../common/commonCss.jsp" %>
    <link rel="shortcut icon" href="img/favicon.ico">
    <STYLE>

    </STYLE>
</head>
<body>

<div id="content">
    <!-- 菜单位置导航ends -->
    <div>
        <div>
            <div class="box-inner">
                <div class="box-header well" data-original-title="">
                    <h2><i class="glyphicon glyphicon-user"></i>
                        出库管理>出库订单
                    </h2>
                    <%@include file="../myWarehouse.jsp" %>
                    <input type="hidden" id="init" value="/wms/deliveryorder/init">
                </div>

                <!-- 每个人只用关注这块区域starts -->
                <div class="box-content">
                    <!-- 表单查询区域begin -->
                    <div class="alert alert-info">
                        <form id="deliveryorderSearchForm" class="form-inline" onkeydown="if(event.keyCode==13)return false;" action="#" method="post" role="form"
                        >
                            <div class="controls controls-row">
                                <div class="form-group ">
                                    <select class="form-control" name="searchType" id="searchType">
                                        <option value='1'>出库订单号</option>
                                        <option value='2'>来源订单号</option>
                                        <option value='3'>拣货单号</option>
                                        <option value='4'>运单号</option>
                                        <option value='5'>收件人姓名</option>
                                        <option value='6'>收件人手机</option>
                                        <option value='7'>收件人地址</option>
                                    </select>
                                </div>
                                <div class="form-group ">
                                    <input type="text" id="searchKeyword" name="searchKeyword" class="form-control input-small" placeholder="输入">
                                </div>
                                <%--<div class="form-group">
                                    <span>出库订单号：</span><input type="text" name="outOrderNo" id="outOrderNo"
                                                              class="form-control input-small" style="width: 150px;"/>
                                </div>
                                <div class="form-group">
                                    <span>来源订单号：</span><input type="text" name="saleOrderNo" id="saleOrderNo"
                                                              class="form-control input-small" style="width: 150px;"/>
                                </div>--%>
                                <div class="form-group">
                                    <span>订单类型：</span>
                                    <div class="input-group">
                                        <select class="form-control" name="orderType" id="orderType">
                                            <option value="">全部</option>
                                            <option value="10">销售订单</option>
                                            <option value="20">返厂订单</option>
                                            <option value="30">换货订单</option>
                                            <option value="40">调拨订单</option>
                                            <option value="50">拼团订单</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span>状态：</span>
                                    <div class="input-group">
                                        <select class="form-control" name="state" id="state">
                                            <option value="">全部</option>
                                            <option value="10">新建</option>
                                            <option value="20">已确认</option>
                                            <option value="40">已分配</option>
                                            <option value="50">已生成拣货单</option>
                                            <option value="60">拣货中</option>
                                            <option value="70">拣货完成</option>
                                            <option value="80">复核完成</option>
                                            <option value="90">打包完成</option>
                                            <option value="98">已取消</option>
                                            <option value="99">已出库</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <button id="btn_delivery_search" class="btn btn-success btn-flat" type="button"
                                            >搜索
                                    </button>
                                </div>
                                <div class="form-group">
                                    <button id="btn_delivery_clear" class="btn btn-primary btn-flat" type="button">清空
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- 表单查询区域end -->
                    <!-- 分页列表区域begin -->
                    <div role="grid" class="box-body table-responsive">
                        <div class="table_nav">
                            <div id="toolbar" class="btn-group">
                                <button type="button" class="btn btn-default  btn-sm" id="deliveryorderQr"><span
                                        class="glyphicon glyphicon-ok" style="color: green;"></span>确认
                                </button>
                                <button type="button" class="btn btn-default  btn-sm" id="deliveryorderAssignRepertory">
                                    <span class="glyphicon glyphicon-hand-right" style="color: green;"></span>指定出库批次
                                </button>
                                <button type="button" class="btn btn-default  btn-sm" id="deliveryorderFp"><span
                                        class="glyphicon glyphicon-ok-circle" style="color:green;"></span>分配
                                </button>
                                <button type="button" class="btn btn-default  btn-sm" id="deliveryorderAndPick"><span
                                        class="glyphicon glyphicon-share-alt" style="color:green;"></span>生成拣货单
                                </button>
                                <button type="button" class="btn btn-default  btn-sm" id="checkReview"><span
                                        class="glyphicon glyphicon-check" style="color:green;"></span>复核确认
                                </button>
                                <button type="button" class="btn btn-default  btn-sm" id="deliveryorderOutQr"><span
                                        class="glyphicon glyphicon-log-out" style="color:green;"></span>出库确认
                                </button>
                                <button type="button" class="btn btn-default btn-sm"
                                        id="btn_deliveryorderList_export"><span
                                        class="glyphicon glyphicon glyphicon-export" style="color:green;"></span>批量导出
                                </button>
                                <div class="btn-group-vertical">
                                    <button type="button" class="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown">
                                        其他操作
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li id="btnout_express_print"><a href="#">补打面单</a></li>
                                        <li id="offAbnormalFlag"><a href="#">打上异常标记</a></li>
                                        <li id="noAbnormalFlag"><a href="#">取消异常标记</a></li>
                                        <li id="cancelAllocation"><a href="#">取消分配</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <table id="deliveryorderListTable" class="table table-hover table-striped table-bordered">

                        </table>
                    </div>
                    <!-- 分页列表区域ends -->
                </div>
                <!-- 每个人只用关注这块区域starts -->
            </div>
        </div>
    </div>
</div>


<!-- 隐藏，生成拣货单策略 -->
<div class="modal fade" id="MydeliveryorderAndPick" tabindex="-1" role="dialog" aria-labelledby="myModalLabel05"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel06">
                    选择拣货单生成策略
                </h4>
            </div>
            <div class="modal-body" id="pick_div">
                <table style="width: 100%;height: 100px;">
                    <%--  <tr>
                         <td>
                                  <label class="radio-inline"><br>
                                      <input type="radio"  value="receiverPick" name="pick" checked="true">
                                      把相同“区”的出库订单聚合生成拣货单
                                  </label>
                             </td>
                          </tr>--%>
                    <tr>
                        <td>
                            <label class="radio-inline"><br>
                                <input type="radio" value="pitchPick" name="pick" checked="true">
                                把“选中”的出库订单生成拣货单
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="radio-inline"><br>
                                <input type="radio" value="affirmPick" name="pick">
                                把所有“已确认”出库订单生成拣货单
                            </label>
                        </td>
                    </tr>
                    <%--  <tr>
                          <td>     <label class="radio-inline"><br>
                              <input type="radio"  value="linePick" name="pick">
                              把相同“路线号”的出库订单聚合生成拣货单
                          </label>
                          </td>
                      </tr>--%>
                    <tr>
                        <td>
                            <label class="radio-inline"><br>
                                <input type="radio" value="yundPick" name="pick">
                                把相同“派车单”的出库订单聚合生成拣货单
                            </label>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: center;">
                            <button type="button" class="btn btn-primary" id="MydeliveryorderAndPickQd">确定</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!-- 隐藏，指定分配库存批次 -->
<div class="modal fade" id="deliveryorderAssignRepertoryModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel02" aria-hidden="true">
    <div class="modal-dialog" style="width:1463px;margin: 50px auto;">
        <div class="modal-content" style="height:850px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel02">
                    出库订单编辑
                </h4>
            </div>
            <div class="modal-body" id="deliveryorderAssignRepertoryDiv">
                <input id="deliveryorderId" type="hidden" value=""/>
                <input id="deliveryorderOutOrderNo" type="hidden" value=""/>
                <input id="deliveryorderState" type="hidden" value=""/>
                <div class="nav-tabs-custom">
                    <div class="form-group col-md-1" style="width: 120px;height: 100%;">
                        <div class="row">
                            <ul class="nav nav-pills nav-stacked" id="">
                                <li class="active"><a href="#tab_1" class="picList" picType="0" data-toggle="tab"
                                                      data-href="/wms/deliveryorder/initDeliveryorder">基本信息</a></li>
                                <li><a href="#tab_2" class="picList" picType="1" data-toggle="tab"
                                       data-href="/wms/deliveryorder/initDeliveryorderDetail">货品明细</a></li>
                                <li><a href="#tab_3" class="picList" picType="2" data-toggle="tab"
                                       data-href="/wms/deliveryorder/initWmsDeliveryOrderDistribute">分配列表</a></li>
                                <%-- <li><a href="#tab_4" class="picList" picType="3" data-toggle="tab" data-href="/wms/">操作日志</a></li>--%>
                            </ul>
                        </div>
                    </div>
                    <div id="centerDiv">

                    </div>
                </div>

            </div>
        </div>
    </div><!-- /.modal -->
</div>
<!-- 隐藏预分配策略 -->
<div class="modal fade" id="locatedRulesModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel03"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel03">
                    选择预分配规则
                </h4>
            </div>
            <div class="modal-body">
                <form id="fromModal02" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>编码:</span><input name="rulesCode" id="rulesCode" class="form-control"
                                                   style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>名称:</span><input name="rulesName" id="rulesName" class="form-control"
                                                   style="width: 130px;">
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-success btn-flat" id="btn_search_rules">搜索</button>
                            <button id="clear_btn_rulesCode" class="btn btn-primary btn-flat" type="button">清空</button>
                        </div>
                    </div>
                </form>
                <table id="preAllocatedRulesTable"></table>
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        style="margin-left: 75%;margin-top: 10px">关闭
                </button>
                <button type="button" class="btn btn-primary" id="driver_rulesCode_save" style="margin-top: 10px">确认
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!--隐藏的分配策略MODEL-->
<div class="modal fade" id="allocatedRulesModel" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;
                </button>
                <h4 class="modal-title" id="myModalLabel05"> 选择分配规则</h4>
            </div>
            <div class="modal-body">
                <form id="fromModal04" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>编码:</span><input name="allocatedCode" id="allocatedCode" class="form-control"
                                                   style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>名称:</span><input name="allocatedName" id="allocatedName" class="form-control"
                                                   style="width: 130px;">
                        </div>

                        <button type="button" class="btn btn-success btn-flat" id="btn_search_allocated">搜索</button>
                        <button id="clear_btn_allocated" class="btn btn-primary btn-flat" type="button">清空</button>


                    </div>
                </form>
                <table id="allocatedRulesTable"></table>
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        style="margin-left: 75%;margin-top: 10px">取消
                </button>
                <button type="button" class="btn btn-primary" id="driver_allocated_save" style="margin-top: 10px">确认
                </button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!--隐藏的供应商MODEL-->
<div class="modal fade" id="supplierModel" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel03" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;
                </button>
                <h4 class="modal-title" id="myModalLabel04"> 选择供应商</h4>
            </div>
            <div class="modal-body">
                <form id="fromModal03" action="" class="form-inline" role="form" style="margin-bottom: 5px;">
                    <div class="controls controls-row">
                        <div class="form-group">
                            <span>编码:</span><input name="supplierCode" id="supplierCode" class="form-control"
                                                   style="width: 100px;">
                        </div>
                        <div class="form-group">
                            <span>名称:</span><input name="shipper" id="shipper" class="form-control"
                                                   style="width: 130px;">
                        </div>

                        <button type="button" class="btn btn-success btn-flat" id="btn_search_supplier">搜索</button>
                        <button type="button" class=" btn btn-primary btn-flat" id="btn_search_clear">清空</button>


                    </div>
                </form>
                <table id="supplierTable"></table>
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        style="margin-left: 75%;margin-top: 10px">取消
                </button>
                <button type="button" class="btn btn-primary" id="driver_supplier_save" style="margin-top: 10px">确认
                </button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!-- ★ 导入公共JS库 -->
<%@include file="../../common/commonJs.jsp" %>
<!-- 自己功能模块的外部JS -->
<script src="${contextPath}/resources/js/business/wms/storageout/deliveryorderList.js" type="text/javascript"></script>

</body>
</html>
