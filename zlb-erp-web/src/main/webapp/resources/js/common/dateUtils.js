var dateUtils={
		initDate:function(){
			//初始化日期控件
	    	$.fn.datetimepicker.dates['zh-CN'] = {  
	                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],  
	                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],  
	                daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],  
	                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	                today: "今天",  
	                suffix: [],  
	                meridiem: ["上午", "下午"]  
	        };  
	        $(".form_datetime").datetimepicker({
	        	language:  'zh-CN',  //中文显示
	            format: "yyyy-mm-dd hh:ii:ss",
	            autoclose: true,
	            todayBtn: true,
	            pickerPosition: "bottom-left"
	        });
	        $(".glyphicon-remove").off().on('click',function () {
	    		$(this).parent().off();
	    		$(this).parent().prev().prev().val("");
	    	});
		}
}

