// 存放每个功能模块业务逻辑JS
// javascript 模块化
var homepage = {
	// 封装异步请求的所有ajax的URL地址
    URL: {
    	searchWmsHomepageUrl: function () {
            return '/wms/homepageData';
        },
    	putWarehouseCodeUrl: function () {
            return '/wms/putWarehouseCode';
        },
        getDefaultWCodeUrl: function () {
            return '/wms/getDefaultWCode';
        },
        // 供应商品信息统计
        goodsSupplyReportPendingStatistics:function () {
            return '/goodsSupply/reportPendingStatistics';
        },
        // 采购信息统计
        applyReportPendingStatistics:function () {
            return '/apply/reportPendingStatistics';
        },
        // 供应商信息统计
        supplierReportPendingStatistics:function () {
            return '/supplier/reportPendingStatistics';
        },
        // 供应商信息统计
        skipSuggest:function () {
            return '/suggest/init';
        }
        
    },bindEvent: function () {
    	// 刷新代码事项
    	$("#updateSchedule").click(function(){
    	    homepage.searchGoodsSupplyReportPendingStatistics();
    	    homepage.searchApplyReportPendingStatistics();
    	    homepage.searchSupplierReportPendingStatistics();
			$.toastrSuccess('刷新信息成功');
    	});
    	// 跳转到采购建议页面
    	$("#skipSuggest").click(function(){
        	myMain.getAllContent(homepage.URL.skipSuggest());
    	});
    	
    },
    changeWarehouseCode:function(e){
    	homepage.clearClass("warehouseCode");	
    	$(e).addClass("selected");
    	// 组装数据发起Ajax请求begin
    	var warehouseCode = $(e).attr("data-Code");
    	var warehouseName = $(e).find("a span").text(); 
    	homepage.warehouseName=warehouseName;
		$.callAjax({
			url : homepage.URL.putWarehouseCodeUrl()+"?warehouseCode="+warehouseCode+"&warehouseName="+warehouseName,
			success : function(data){  
				if(data.code!="0000"){
					toastr['warning'](data.msg); 
				}else{
					$.toastrSuccess('仓库切换成功！');
				}
			},
			error : function(data) {
				$.toastrError();
			}
		});
    },
    clearClass:function(whitchDiv) {
		$("#" + whitchDiv + " ul li").each(function() {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			}
		});
	},
	searchGoodsSupplyReportPendingStatistics: function () {
		$.callAjax({
			url : homepage.URL.goodsSupplyReportPendingStatistics(),
			success : function(data){
				cleanAndBindingData("searchGoodsSupplyReportTr",data.data);
			},
			error : function(data) {
				$.toastrError();
			}
		});
    },
    searchApplyReportPendingStatistics:function () {
    	$.callAjax({
			url : homepage.URL.applyReportPendingStatistics(),
			success : function(data){
				cleanAndBindingData("searchApplyReportTr",data.data);
			},
			error : function(data) {
				$.toastrError();
			}
		});
    },
    searchSupplierReportPendingStatistics:function () {
    	$.callAjax({
			url : homepage.URL.supplierReportPendingStatistics(),
			success : function(data){
				cleanAndBindingData("searchSupplierReportTr",data.data);
			},
			error : function(data) {
				$.toastrError();
			}
		});
    }
}

//清空原数据， 绑定新数据
function cleanAndBindingData(id,data){
	// 清空原数据
	$("#"+id).html("");
	var strHtml = '';
	if (data==null) {
		strHtml='<tr class="no-records-found"><td colspan="2">没有找到匹配的记录</td></tr>';
	} else {
	
	strHtml='<tr data-index="0">'
	+'<td style="">'+data.subCont+'</td>'
	+'<td style="">'+data.rejCount+'</td>'
	+'</tr>';
	}
	$("#"+id).append(strHtml);
}

$(document).ready(function(){
	// 1、初始化加载的订单详情数据
    homepage.searchGoodsSupplyReportPendingStatistics();
    homepage.searchApplyReportPendingStatistics();
    homepage.searchSupplierReportPendingStatistics();
    homepage.bindEvent();
    /*
	// 2、初始化绑定增删改查事件
	var data = [[1,2,3,4,5,6,7,8,9],[3,6,8,1,11,22,4,21,6]];
	var data_max = 30; // Y轴最大刻度
	var line_title = ["A","B"]; // 曲线名称
	var y_label = "这是Y轴"; // Y轴标题
	var x_label = "这是X轴"; // X轴标题
	var x = ['周一','周二','周一','周一','周一','周一','周一','周一','周日']; // 定义X轴刻度值
	var title = "这是标题"; // 统计图标标题
	j.jqplot.diagram.base("chart1", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 1);
	j.jqplot.diagram.base("chart2", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);
	j.jqplot.diagram.base("chart3", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 1);
	j.jqplot.diagram.base("chart4", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);
	j.jqplot.diagram.base("chart5", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 1);
	j.jqplot.diagram.base("chart6", data, line_title, "这是统计标题", x, x_label, y_label, data_max, 2);
	*/
});