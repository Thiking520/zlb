// 存放每个功能模块业务逻辑JS
// javascript 模块化
var homepage = {
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//订单首页请求地址
    	searchOrderHomepageUrl: function () {
            return '/orders/homepageData';
        },
    	//获取销售订单列表请求地址
    	searchSaleUrl: function () {
            return '/orders/init?orderState=1';
        },
      //获取退货订单列表请求地址
    	searchReturnUrl: function () {
            return '/returnOrders/init?orderState=1';
        },
      //获取换货订单列表请求地址
    	searchExchangeUrl: function () {
            return '/orderManage/exchangeGoodsOrder/init?orderState=1';
        }
        
        
    },
    
   
    
    bindEvent: function () { 
    	//清空事件
//    	$("#btn_clean").on("click",function () {
//    		$.clearForm("");
//    	});
    	//绑定添加或编辑提交按钮
    	$("#saleOrder").on("click",function () {
    		myMain.getAllContent(homepage.URL.searchSaleUrl());
    	});
    	//绑定添加或编辑提交按钮
    	$("#returnOrder").on("click",function () {
    		myMain.getAllContent(homepage.URL.searchReturnUrl());
    	});
    	//绑定返回按钮按钮
    	$("#exchangeOrder").on("click",function () {
    		myMain.getAllContent(homepage.URL.searchExchangeUrl());
    	});
    },
    
    
    initData:function(){

		//组装数据发起Ajax请求begin
		$.callAjax({
			url : homepage.URL.searchOrderHomepageUrl(),
			
			success : function(data){   
				var code = data.code;
				if(code!="0000"){
					toastr['warning'](data.msg); 
				}else{
					var orderBean = data.data;
					
					//按页面name值对应，自动给页面赋值
					autocomplete(orderBean);
				}
				
			}
		});
    }
   
    
    
}

//简单的根据数据结果集的key对应页面的name值，自动赋值  
function autocomplete(data){
	$.each( data, function(index, content){ 
		$("*[name*='" + index + "']").text(content); //index为key，content为value
	});
	
//	$("*[name*='']").each(function() {
//		 var name = $(this).attr('name');
//		 alert(name);
//	 })
	
}


function getRequest() {
	// decodeURI解决中文乱码问题
	var url = decodeURI(location.search); // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}


$(document).ready(function(){
	
	//1、初始化加载的订单详情数据
	homepage.initData();
	//2、初始化绑定增删改查事件
	homepage.bindEvent();
});