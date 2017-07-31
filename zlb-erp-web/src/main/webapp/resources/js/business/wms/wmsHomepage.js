// 存放每个功能模块业务逻辑JS
// javascript 模块化
var homepage = {
	warehouseName:'',
	warehouseCode:'',
	//封装异步请求的所有ajax的URL地址
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
        searchOutStorge:function () {
            return '/wms/deliveryorder/searchOutStorge';
        },
        searchStorgeinUrl:function () {
            return '/wms/storagein/searchInStorge';
        }
    },
    initData:function(){
		//组装数据发起Ajax请求begin
		$.callAjax({
			url : homepage.URL.searchWmsHomepageUrl(),
			async: false,
			success : function(data){
				
				var datas = data.data;
				$.each(datas, function(index, e) {
					$("#warehouseCode").append('<option value="'+datas[index].code+'" '+(datas[index].deliveryType==10?'selected="selected"':'')+'>'+  datas[index].name+'</option>');
				});
				//组装数据发起Ajax请求begin
				$.callAjax({
					url : homepage.URL.getDefaultWCodeUrl(),
					async: false,
					success : function(data){
						var code = data.data.code;
						var name = data.data.name;
						if(code=='' || code == "null" || code==undefined){
							homepage.changeWarehouseCode($("#warehouseCode"));
						}else{
							$("#warehouseCode option").each(function(){
								var txt = $(this).val();
								if(code == txt){
									$("#warehouseCode").val(code);
								}
							});
							homepage.warehouseName=$("#warehouseCode").find("option:selected").text();
						}
					},
					error : function(data) {
						$.toastrError();
					}
				});
			},
			error : function(data) {
				$.toastrError();
			}
		});
    },
    changeWarehouseCode:function(e){
    	//组装数据发起Ajax请求begin
    	var warehouseCode = $(e).val();
    	var warehouseName = $(e).find("option:selected").text();
    	homepage.warehouseName=warehouseName; //encodeURI(warehouseName)
    	homepage.warehouseCode=warehouseCode;
    	if(warehouseCode != null){
			$.callAjax({
				url : homepage.URL.putWarehouseCodeUrl()+"?warehouseCode="+warehouseCode+"&warehouseName="+encodeURI(warehouseName),
				async: true,
				success : function(data){ 
					if(data.code!="0000"){
						toastr['warning'](data.msg); 
					}else{
						$('#storgeinStatistics').bootstrapTable('refresh');
				    	$('#outStorgeStatistics').bootstrapTable('refresh');
				    	$('#stockLocationStatistics').bootstrapTable('refresh');
				    	$('#staleDatedSkuStatistics').bootstrapTable('refresh');
				    	
						if(typeof($("#init").val()) !="undefined" && warehouseCode != null){
							myMain.getAllContent($("#init").val());	
						}
						
						$.toastrSuccess('仓库切换成功！');
					}
				},
				error : function(data) {
					$.toastrError();
				}
			});
    	}
    },
    clearClass:function(whitchDiv) {
		$("#" + whitchDiv + " ul li").each(function() {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			}
		});
	},
    searchStorgein: function () {
        //分页组件
        $.pageTable({
            tableId: "#storgeinStatistics",//需要分页的table ID
            url: homepage.URL.searchStorgeinUrl(),
            sortable: true,
            onLoadSuccess:function () {
            	//$(".fixed-table-pagination").remove();
            },
            columns: [{
                field: 'allot',
                title: '待收货的订单',
            }, {
                field: 'pick',
                title: '待上架的订单'
            }/*, {
                field: 'abnormalFlag',
                title: '异常订单'
            }*/, {
                field: 'cancelFlag',
                title: '取消订单'
            }]
        });
    },
    searchOutStorge:function () {
        //分页组件
        $.pageTable({
            tableId: "#outStorgeStatistics",//需要分页的table ID
            url: homepage.URL.searchOutStorge(),//请求后台的URL（*）
            sortable: true,
            onLoadSuccess:function () {
            	$(".fixed-table-pagination").remove();
            },
            columns: [{
                field: 'allot',
                title: '待分配的订单',
            }, {
                field: 'pick',
                title: '待拣货的订单'
            }, {
                field: 'abnormalFlag',
                title: '异常订单'
            }, {
                field: 'cancelFlag',
                title: '取消订单'
            }]


        });
    },
    searchStockLocation:function () {
        //分页组件
        $.pageTable({
            tableId: "#stockLocationStatistics",//需要分页的table ID
            url: "",//请求后台的URL（*）
            sortable: true,
            sortName: 'created',
            sortOrder: 'desc',
            columns: [{
                field: 'created',
                title: '待上架任务',
                formatter: function (value, row, index) {

                }
            }, {
                field: 'creator',
                title: '待移库任务'
            }, {
                field: 'modified',
                title: '待盘点任务'
            }, {
                field: 'modifier',
                title: '待库存调整'
            }]


        });
    },
    staleDatedSku:function () {
        //分页组件
        $.pageTable({
            tableId: "#staleDatedSkuStatistics",//需要分页的table ID
            url: "",//请求后台的URL（*）
            sortable: true,
            sortName: 'created',
            sortOrder: 'desc',
            pagination:false,
            columns: [{
                field: 'created',
                title: '过期商品数量',
                formatter: function (value, row, index) {

                }
            }, {
                field: 'creator',
                title: '已过期商品数量'
            }, {
                field: 'modified',
                title: '可能会缺货热销商品数量'
            }]


        });
    },
    bindEvent: function () {
    	$("#warehouseCode").change(function(){
    		homepage.changeWarehouseCode(this);
    	});
    }
}

$(document).ready(function(){
	//1、初始化加载的订单详情数据
	homepage.initData();
	homepage.bindEvent();
    homepage.searchStorgein();
    homepage.searchOutStorge();
    homepage.searchStockLocation();
    homepage.staleDatedSku();
	//2、初始化绑定增删改查事件
});