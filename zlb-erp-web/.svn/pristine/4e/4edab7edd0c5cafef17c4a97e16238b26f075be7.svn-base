$(function(){
	
	
	//第一个按钮，选中移入右侧
	$('#b1').click(function(){
		//获取复选框选中的索引
		var ids = new Array();
		var arr=$("#s1 tbody tr input");
		console.log(arr);
		for(i=0;i<arr.length;i++){
			if(arr[i].checked) {
				ids.push(i);
			}
		}
		//通过索引获取表格的行
		//克隆获取表格所有行（不能直接进行操作，会改变索引）
		var rows =$("#s1 tbody tr").clone(true);
		if(ids.length > 0) {
			for(i=0;i<ids.length;i++) {
				
				rnum = ids[i] - i;
				$("#s1 tbody tr:eq("+rnum+")").remove();
				var r = rows[ids[i]];
				$('#s2').append(r);
				
				/*var r = rows[ids[i]];
				//左侧选中的隐藏（不能直接删除，索引会变化）
				$("#s1 tbody tr:eq("+(ids[i])+")").hide();
				console.log("--" + ids[i]);
				$('#s2').append(r);*/
			}
			/*//对隐藏行删除
			var newRows =$("#s1 tbody tr");
			console.log(newRows);
			if(newRows.length > 0) {
				for(i=0;i<newRows.length;i++) {
					if($("#s1 tr:eq("+i+")").is(":hidden")) {
						$("#s1 tr:eq("+i+")").remove();
						console.log(i);
					} else {
						console.log($("#s1 tr:eq("+i+")").is(":hidden"));
					}
				}
			}*/
		} else {
			$.toastrWarning("请至少选择一条");
		}
		$('#s1').bootstrapTable('refresh');
	});
	
	//第二个按钮，将所有移入右侧
	$('#b2').click(function(){
		$('#s2').append($('#s1 tbody tr'));
		$('#s1').bootstrapTable('refresh');
	});
	
	//第三个按钮，将右侧选中的移入左侧
	$('#b3').click(function(){
		//获取复选框选中的索引
		var ids = new Array();
		var arr=$("#s2 tbody tr input");
		for(i=0;i<arr.length;i++){
			if(arr[i].checked) {
				ids.push(i);
			}
		}
		
		//删除“没有找到匹配记录”这行
		var ob =  document.getElementsByClassName("no-records-found")[0];
		if(ob != null) {
			ob.remove();
		}
		
		
		//通过索引获取表格的行
		//克隆获取表格所有行（不能直接进行操作，会改变索引）
		var rows =$("#s2 tbody tr").clone(true);
		var rnum = -1;//删除的tr原来的行号
		if(ids.length > 0) {
			for(i=0;i<ids.length;i++) {//遍历所有选中的项
				rnum = ids[i] -i;
				$("#s2 tbody tr:eq("+rnum+")").remove();
				//var r = rows[ids[i]];
				//左侧选中的隐藏（不能直接删除，索引会变化）
				//$("#s2 tbody tr:eq("+rnum+")").hide();
				//$('#s1').append(r);
			}
			//对隐藏行删除
			/*var newRows =$("#s2 tbody tr");
			if(newRows.length > 0) {
				for(i=0;i<newRows.length;i++) {
					if($("#s2 tbody tr:eq("+i+")").is(":hidden")) {
						$("#s2 tbody tr:eq("+i+")").remove();
					}
				}
			}*/
		} else {
			$.toastrWarning("请至少选择一条");
		}
		$('#s1').bootstrapTable('refresh');
	});
	
	$('#b4').click(function(){
		$('#s1').append($('#s2 tbody tr'));
		$('#s1').bootstrapTable('refresh');
	});
	
});

//================

$(function(){
	
	
	//第一个按钮，选中移入右侧
	$('#b1_e').click(function(){
		//获取复选框选中的索引
		var ids = new Array();
		var arr=$("#s1_e tbody tr input");
		console.log(arr);
		for(i=0;i<arr.length;i++){
			if(arr[i].checked) {
				ids.push(i);
			}
		}
		//通过索引获取表格的行
		//克隆获取表格所有行（不能直接进行操作，会改变索引）
		var rows =$("#s1_e tbody tr").clone(true);
		var rnum = -1;
		if(ids.length > 0) {
			for(i=0;i<ids.length;i++) {
				rnum = ids[i] - i;
				$("#s1 tbody tr:eq("+rnum+")").remove();
				var r = rows[ids[i]];
				$('#s2_e').append(r);
				
				/*var r = rows[ids[i]];
				//左侧选中的隐藏（不能直接删除，索引会变化）
				$("#s1_e tbody tr:eq("+(ids[i])+")").hide();
				console.log("--" + ids[i]);
				$('#s2_e').append(r);*/
			}
			//对隐藏行删除
			/*var newRows =$("#s1_e tbody tr");
			console.log(newRows);
			if(newRows.length > 0) {
				for(i=0;i<newRows.length;i++) {
					if($("#s1_e tr:eq("+i+")").is(":hidden")) {
						$("#s1_e tr:eq("+i+")").remove();
						console.log(i);
					} else {
						console.log($("#s1_e tr:eq("+i+")").is(":hidden"));
					}
				}
			}*/
		} else {
			$.toastrWarning("请至少选择一条");
		}
		packManager.returnLeft = true;
		$('#s1_e').bootstrapTable('refresh');
	});
	
	//第二个按钮，将所有移入右侧
	$('#b2_e').click(function(){
		$('#s2_e').append($('#s1_e tbody tr'));
		packManager.returnLeft = true;
		$('#s1_e').bootstrapTable('refresh');
	});
	
	//第三个按钮，将右侧选中的移入左侧
	$('#b3_e').click(function(){
		//获取复选框选中的索引
		var ids = new Array();
		var arr=$("#s2_e tbody tr input");
		for(i=0;i<arr.length;i++){
			if(arr[i].checked) {
				ids.push(i);
			}
		}
		//通过索引获取表格的行
		//克隆获取表格所有行（不能直接进行操作，会改变索引）
		var rows =$("#s2_e tbody tr").clone(true);
		var rnum = -1;
		if(ids.length > 0) {
			for(i=0;i<ids.length;i++) {
				
				rnum= ids[i]-i;
				$("#s2_e tbody tr:eq("+rnum+")").remove();
				//var r = rows[ids[i]];
				//左侧选中的隐藏（不能直接删除，索引会变化）
				//$("#s2_e tbody tr:eq("+ids[i]+")").hide();
				//$('#s1_e').append(r);
			}
			/*//对隐藏行删除
			var newRows =$("#s2_e tbody tr");
			if(newRows.length > 0) {
				for(i=0;i<newRows.length;i++) {
					if($("#s2_e tbody tr:eq("+i+")").is(":hidden")) {
						$("#s2_e tbody tr:eq("+i+")").remove();
					}
				}
			}*/
		} else {
			$.toastrWarning("请至少选择一条");
		}
		packManager.returnLeft = false;
		$('#s1_e').bootstrapTable('refresh');
	});
	
	$('#b4_e').click(function(){
		$('#s1_e').append($('#s2_e tbody tr'));
		$('#s1_e').bootstrapTable('refresh');
	});
	
});


function extendDeep(parent, child) {
	var i,
	proxy;
	proxy = JSON.stringify(parent); //把parent对象转换成字符串
	proxy = JSON.parse(proxy) //把字符串转换成对象，这是parent的一个副本
	child = child || {};
	for(i in proxy) {
	if(proxy.hasOwnProperty(i)) {
	child[i] = proxy[i];
	}
	}
	proxy = null; //因为proxy是中间对象，可以将它回收掉
	return child;
	} 