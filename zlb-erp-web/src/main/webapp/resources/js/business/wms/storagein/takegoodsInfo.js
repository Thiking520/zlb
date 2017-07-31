var takeGoodInfoManage = {
		URL: {
			getInfoUrl: function () {
					 return '/wms/storagein/getInfo';
	    	},//入账
			takeAccountUrl: function () {
			    return '/wms/storagein/takeAccount';
			},
			//取消订单
			cancelOrderUrl: function () {
			    return '/wms/storagein/cancelOrder';
			},
			//关闭订单
			colseOrderUrl: function () {
			    return '/wms/storagein/colseOrder';
			}
			
	    },
	    getInfo: function (id) {
			$.callAjax({
				type:"post",
				url : takeGoodInfoManage.URL.getInfoUrl()+"?id="+id,
				success : function(data){
	         		if(data.code != "0000"){
	         			$.toastrWarning(data.msg);
	         			return;
	         		}
	         		if(data.data==null){
	         			$.toastrSuccess('查询结果为空！');
	         			return;
	         		}
	         		$("#storageInNo01").val(data.data.storageInNo);
	         		$("#orderNum01").val(data.data.purchaseNo);
	         		$("#billType01").val(data.data.billType);
	         		$("#operator01").val(data.data.operator);
	         		$("#orderDate01").val(takeGoodInfoManage.format(data.data.orderDate,"yyyy-MM-dd HH:mm:ss"));
	         		$("#expectDate01").val(takeGoodInfoManage.format(data.data.expectDate,"yyyy-MM-dd HH:mm:ss"));
	         		$("#anomalyFlag01").val(data.data.anomalyFlag);
	         		$("#cancelFlag01").val(data.data.cancelFlag);
	         		$("#salesNo01").val(data.data.salesNo);
	         		$("#purchaseNo01").val(data.data.purchaseNo);
	         		$("#purchaser01").val(data.data.purchaser);
	         		$("#purchaserPhone01").val(data.data.purchaserPhone);
	         		$("#supplierName01").val(data.data.supplierName);
	         		$("#purhcaseRemark01").val(data.data.purhcaseRemark);
	         		$("#express01").val(data.data.express);
	         		$("#vehicleNo01").val(data.data.vehicleNo);
	         		$("#driverName01").val(data.data.driverName);
	         		$("#driverPhone01").val(data.data.driverPhone);
	         		$("#shipper01").val(data.data.shipper);
	         		$("#totalQty01").val(data.data.totalQty);
	         		$("#totalWeight01").val(data.data.totalWeight);
	         		$("#shipperWarehouse01").val(data.data.shipperWarehouse);
	         		$("#shipperName01").val(data.data.shipperName);
	         		$("#shipperContactPhone01").val(data.data.shipperContactPhone);
	         		$("#shipperAdminArea01").val(data.data.shipperAdminArea);
	         		$("#shipperAddress01").val(data.data.shipperAddress);
	         		$("#receiveName01").val(data.data.receiveName);
	         		$("#receiveWarehouse01").val(data.data.receiveWarehouse);
	         		$("#shipperName01").val(data.data.shipperName);
	         		$("#receiveContactPhone01").val(data.data.receiveContactPhone);
	         		$("#receiveAdminArea01").val(data.data.receiveAdminArea);
	         		$("#receiveAddress01").val(data.data.receiveAddress);
	         		$("#receiveState01").val(data.data.receiveState);
	         		$("#receiveResult01").val(data.data.receiveResult);
	         		/*var statu = data.data.receiveState;
	         		if(statu!=30){
	         			$("#btn_take_account01").css("display","none");
	         		}
	         		if(statu!=50){
	         			$("#btn_close_order").css("display","none");
	         		}
	         		if(statu!=10 || statu!=20){
	         			$("#btn_cancel_order").css("display","none");
	         		}*/
				},
				error : function(){
					$.toastrError();
				}
			});
	    },
	    format :  function(time, format){ 
			if(time != null && time !=''){
				var t = new Date(time); 
				var tf = function(i){return (i < 10 ? '0' : '') + i}; 
				return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){ 
					switch(a){ 
					case 'yyyy': 
					return tf(t.getFullYear()); 
					break; 
					case 'MM': 
					return tf(t.getMonth() + 1); 
					break; 
					case 'mm': 
					return tf(t.getMinutes()); 
					break; 
					case 'dd': 
					return tf(t.getDate()); 
					break; 
					case 'HH': 
					return tf(t.getHours()); 
					break; 
					case 'ss': 
					return tf(t.getSeconds()); 
					break; 
					}; 
				}));
			}
			return null;
		},
	    init:function(){
	    	var id = $("#storageInId").val();
	    	takeGoodInfoManage.getInfo(id);
	    },
	    bindEvent: function () {
	    	//绑定展示入账界面事件
	    	$("#btn_take_account01").click(function () {
	    		var ids = $("#storageInId").val();
	    		var statu = $("#receiveState01").val();
	    		if(statu!=30 && statu!=50){
	    			toastr['warning']("只有状态为收货中/已入账的入库订单才可以进行入账"); 
	    			return false;
	    		}
	    		
	    		$.dialogConfirm({
	                message: '入帐确认后不允许撤回，您确认入帐吗？',
	                callback: function(result) {
	                    if(result) {
	    			    	$.callAjax({
	    			    		type:"post",
	    			    		url : takeGoodInfoManage.URL.takeAccountUrl()+"?ids="+ids,
	    			    		success : function(data){   
	    			    			var code = data.code;
	    			    			if(code!="0000"){
	    			    				if(code=="6003"){
	    			    					$.dialogConfirm({
	        			    	                message: data.msg,
	        			    	                callback: function(result) {
	        			    	                    if(result) {
	        			    	    			    	$.callAjax({
	        			    	    			    		type:"post",
	        			    	    			    		url : takeGoodInfoManage.URL.takeAccountUrl()+"?ids="+ids+"&isContinue=1",
	        			    	    			    		success : function(data){   
	        			    	    			    			var code = data.code;
	        			    	    			    			if(code!="0000"){
	        			    	    			    				toastr['warning'](data.msg); 
	        			    	    			    			}else{
	        			    	    			    				$('#myModal').modal('hide');
	        			    	    			    				$.toastrSuccess('入账成功！');
	        			    	    			    				$('#storageInManageTable').bootstrapTable('refresh');
	        			    	    			    			}
	        			    	    			    		},
	        			    	    			    		error : function(){
	        			    	    			    			$.toastrError();
	        			    	    			    		}
	        			    	    			    	});
	        			    	                    }
	        			    	                }
	        			    	            });
	    			    				}else{
	    			    					toastr['warning'](data.msg); 
	    			    				}
	    			    			}else{
	    			    				$.toastrSuccess('入账成功！');
	    			    				$('#myModal').modal('hide');
	    			    				$('#storageInManageTable').bootstrapTable('refresh');
	    			    			}
	    			    		},
	    			    		error : function(){
	    			    			$.toastrError();
	    			    		}
	    			    	});
	                    }
	                }
	            });
	        	$('#storageInManageTable').bootstrapTable('refresh');
	    	});
	    	//订单取消
	    	$("#btn_cancel_order").click(function () {
	    		var statu = $("#receiveState01").val();
	    		if(statu==99){
	    			toastr['warning']("该订单已经关闭,无法再进行取消操作"); 
	    			return false;
	    		}
	    		if(statu==98){
	    			toastr['warning']("该订单已经取消,勿重复发起取消操作"); 
	    			return false;
	    		}
	    		var id = $("#storageInId").val();
	        	$.dialogConfirm({
	                message: '取消后不允许进行其他操作，您确认取消吗？',
	                callback: function(result) {
	                    if(result) {
	    			    	$.callAjax({
	    			    		type:"post",
	    			    		url : takeGoodInfoManage.URL.cancelOrderUrl()+"?id="+id,
	    			    		success : function(data){   
	    			    			var code = data.code;
	    			    			if(code!="0000"){
	    			    				toastr['warning'](data.msg); 
	    			    			}else{
	    			    				$.toastrSuccess('取消成功！');
	    			    				$('#myModal').modal('hide');
	    			    				$('#storageInManageTable').bootstrapTable('refresh');
	    			    			}
	    			    		},
	    			    		error : function(){
	    			    			$.toastrError();
	    			    		}
	    			    	});
	                    }
	                }
	            });
	    	});
	    	//订单关闭
	    	$("#btn_close_order").click(function () {
	    		var statu = $("#receiveState01").val();
	    		if(statu==99){
	    			toastr['warning']("该订单已经关闭,请勿重复发起关闭操作"); 
	    			return false;
	    		}
	    		if(statu==98){
	    			toastr['warning']("该订单已经取消,无法再进行关闭操作"); 
	    			return false;
	    		}
	    		var id = $("#storageInId").val();
	        	$.dialogConfirm({
	                message: '订单关闭后不允许进行其他操作，您确认关闭吗？',
	                callback: function(result) {
	                    if(result) {
	    			    	$.callAjax({
	    			    		type:"post",
	    			    		url : takeGoodInfoManage.URL.colseOrderUrl()+"?id="+id,
	    			    		success : function(data){   
	    			    			var code = data.code;
	    			    			if(code!="0000"){
	    			    				toastr['warning'](data.msg); 
	    			    			}else{
	    			    				$.toastrSuccess('关闭成功！');
	    			    				$('#myModal').modal('hide');
	    			    				$('#storageInManageTable').bootstrapTable('refresh');
	    			    			}
	    			    		},
	    			    		error : function(){
	    			    			$.toastrError();
	    			    		}
	    			    	});
	                    }
	                }
	            });
	    	});
	    }
}

$(document).ready(function(){
	//1、初始化加载列表数据
	takeGoodInfoManage.init();
	//2、进行事件的绑定
	takeGoodInfoManage.bindEvent();
});

