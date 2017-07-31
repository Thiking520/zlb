// 存放每个功能模块业务逻辑JS
// javascript 模块化
var myDistributionSite = {
	getTmsUrls: function () {
		return ["/tms/waybill/init","/tms/flatCable/init","/tms/dispatchVehicle/init"]; 
	},
	//封装异步请求的所有ajax的URL地址
    URL: {
    	//获取我负责的站点列表
    	getDistributionSiteListUrl: function () {
            return '/tms/distributionSite/list';
        },
    	//变更当前激活的站点
        updateCurrSiteUrl: function () {
            return '/tms/distributionSite/updateCurrSite';
        }
        
    },
    getDistributionSiteList: function () { 
    	$.callAjax({
			url : myDistributionSite.URL.getDistributionSiteListUrl(),
			success : function(data){ 
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				var selctOption = "";
				var opIndex = 1;
				$.each(data.data, function(index, siteObj) {
					selctOption += '<option value="' + siteObj.id + '"  '+(siteObj.isSelect ? 'selected = "selected"' : '')+'>' + siteObj.name + '</option>';
				});
				$("#selectMySite").html(selctOption);
			}
		});
    },
    updateCurrSite: function (selectValue) { 
    	$.callAjax({
			url : myDistributionSite.URL.updateCurrSiteUrl(),
			data :  {"distributionId":selectValue},
			success : function(data){ 
				if (data.code != "0000") {
					$.toastrWarning(data.msg);
					return;
				}
				var tmsUrls = myDistributionSite.getTmsUrls();
//				if(-1 === $.inArray(myMain.currClickTreeUrl.trim(), tmsUrls)){
//					myMain.currClickTreeUrl = tmsUrls[0];
//					alert("00:"+tmsUrls[0]);
//				}
				myMain.getAllContent(myMain.loadCurUrl);
			}
		});
    },
    bindEvent: function () { 
    	//绑定添加或编辑提交按钮
    	$("#selectMySite").on("change",function() {
    		myDistributionSite.updateCurrSite($(this).val());
    	});
    },
    initData:function(){
    	myDistributionSite.getDistributionSiteList();
    }
}

$(document).ready(function(){
	//1、初始化加载我负责的站点列表
	myDistributionSite.initData();
	//2、初始化绑定各类事件
	myDistributionSite.bindEvent();
});