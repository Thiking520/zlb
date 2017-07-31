<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<input id="contextPath" type="hidden" value="${contextPath}"> 
<script>
var contextPath="${contextPath}";
</script>
<!-- 核心框架js begin -->
<script src="${contextPath}/resources/charisma-master/bower_components/jquery/jquery.min.js"></script>
<script src="${contextPath}/resources/charisma-master/js/jquery.cookie.js"></script>
<script src="${contextPath}/resources/charisma-master/js/jquery.history.js"></script>
<script src="${contextPath}/resources/charisma-master/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- 核心框架js end -->

<!-- 自定义组件begin -->
<%-- <script src="${contextPath}/resources/js/common/daterange-picker.js" type="text/javascript"></script>  --%>
<script src="${contextPath}/resources/js/common/constants.js" type="text/javascript"></script>  
<script src="${contextPath}/resources/js/common/zhilianbao-util.js" type="text/javascript"></script>
<script src="${contextPath}/resources/js/common/auth.js" type="text/javascript"></script> 
<script src="${contextPath}/resources/js/common/dateUtils.js" type="text/javascript"></script>
<!-- 自定义组件end -->

<!-- 上传图片组件 -->
<script src="${contextPath}/resources/charisma-master/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="${contextPath}/resources/charisma-master/plugins/jquery-file-upload/js/jquery.fileupload.js"></script>
<script src="${contextPath}/resources/charisma-master/plugins/jquery-file-upload/js/jquery.iframe-transport.js"></script>
<script src="${contextPath}/resources/charisma-master/plugins/jquery-file-upload/js/jquery.fileupload-process.js"></script>
<script src="${contextPath}/resources/charisma-master/plugins/jquery-file-upload/js/jquery.fileupload-validate.js"></script>
<!-- 日期选择控件 -->
<%--<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>--%>
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
<!-- 列表JS 包含分页控件 -->
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-table/js/bootstrap-table.js" type="text/javascript"></script>
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-table/js/bootstrap-table-zh-CN.js" type="text/javascript"></script>
<!-- 消息通知组件 -->
<script src="${contextPath}/resources/charisma-master/plugins/toastr/js/toastr.js" type="text/javascript"></script>
<!-- 确认框组件 -->
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap3-dialog/js/bootstrap-dialog.js" type="text/javascript"></script>
<!-- 校验组件组件 -->
<script src="${contextPath}/resources/charisma-master/plugins/bootstrap-validator/js/bootstrapValidator.min.js" type="text/javascript"></script>
<!-- 自定义下拉框 -->
<script src="${contextPath}/resources/charisma-master/plugins/dropdownlist/js/dropdownlist.js" type="text/javascript"></script>

<!-- 百度地图相关 begin -->
<!--加载鼠标绘制工具-->
<script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
<!--加载检索信息窗口-->
<script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/SearchInfoWindow_min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/SearchControl/1.4/src/SearchControl_min.js"></script>
<!-- 百度地图相关 end -->



