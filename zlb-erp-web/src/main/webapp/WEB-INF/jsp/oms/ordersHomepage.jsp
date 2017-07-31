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

</head>
<body>
	 <!-- topbar starts -->
    
    

        <div class="box-inner" style="width: 100%;">
            <div class="box-header well">
                <h2 style="font-size: 18px;"><i class="glyphicon glyphicon-info-sign"></i> 首页</h2>

            </div>
            <!-- 下拉 -->
            <!-- 首页展示开始 -->
            <div  style="min-width: 100%; height: 400px; position: relative;">
                <div class="alert alert-success" style="width: 95%; height: 200px; position: absolute; top: 25%; left: 2.5%;" >
                    <div class="col-md-3 alert alert-danger" style="width: 30%; height: 100px; margin-left: 3%; margin-top: 40px; position: relative;">
                       
                        <p name='saleNum' style="width: 100%; text-align: center;"></p>
                        <p style="width: 100%; text-align: center;"><a id='saleOrder'>待审核销售订单</a></p>
                    </div>
                    <div class="col-md-3 alert alert-danger" style="width: 30%; height: 100px; margin-left: 3%; margin-top: 40px; position: relative;">
                       
                        <p name='returnNum' style="width: 100%; text-align: center;"></p>
                        <p style="width: 100%; text-align: center;"><a id='returnOrder'>待审核退货订单</a></p>
                    </div>
                    <div class="col-md-3 alert alert-danger" style="width: 30%; height: 100px; margin-left: 3%; margin-top: 40px; position: relative;">
                        
                        <p name='exchangeNum' style="width: 100%; text-align: center;"></p>
                        <p style="width: 100%; text-align: center;"><a id='exchangeOrder'>待审核换货订单</a></p>
                    </div>
                </div>
            </div>
            <!-- 首页展示结束 -->
        </div>
   

<!--/.fluid-container-->


	
	<!-- 隐藏的dialog end -->
	
	<!-- ★ 导入公共JS库 -->
	<%@include file="../common/commonJs.jsp"%>
    <!-- 自己功能模块的外部JS -->
    <script src="${contextPath}/resources/js/business/oms/ordersHomepage.js" type="text/javascript"></script>
    <script type="text/javascript">
    $('.L_order_last').find('textarea').blur(function(){
        if($('.L_order_last').find('textarea').val().length <= 180){
            $('.L_order_last').find('p').css('display','none');
        }else{
            $('.L_order_last').find('textarea').val('');
            $('.L_order_last').find('p').css('display','block');
        }
        
    })
	</script>
</body>
</html>
