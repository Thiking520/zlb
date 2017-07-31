// 存放每个功能模块业务逻辑JS
// javascript 模块化
var goodsManager = {
	// 是否重置分页偏移值0：否，1：是
	isResetOffset : 0,
	// 选择excel文件后，保存的json字符串
	jsonObj : [],
	// 封装异步请求的所有ajax的URL地址
	URL : {
		// 跳转列表页
		initUrl : function() {
			return '/publicData/goodsOriginal/init';
		},
		// 批量导入原始商品
		GoodsOriginalBatchImport : function() {
			return '/publicData/goodsOriginal/GoodsOriginalBatchImport';
		},
		// 获取当前供应商下所有商品分类
		goodsTypeAllLevel : function() {
			return '/publicData/goodsType/goodsTypeTwoLevel';
		},
		// 获取供应商下所有商品单位
		initDropDownUrl : function() {
			return '/publicData/goodsOriginal/initDropDown';// 返回list集合,对象属性：typeName，id
		}
	},
	// 初始化绑定事件
	bindEvent : function() {
		// 导入按钮
		$("#btn_import_goods").click(excuteImportRiginalGoods);
		// 取消按钮
		$("#btn_cancel_goods").click(function(event) {
			myMain.getAllContent(goodsManager.URL.initUrl());
		});
		// 复制按钮单击事件，根据按钮id执行商品类型或商品单位数据复制
		$("input[type='button'][id^='copy']").click(
				function() {
					// 获取当前按钮的id
					var btnId = this.id;
					var url = "";
					if (btnId == "copyType") {// 点击复制商品类型数据
						url = goodsManager.URL.goodsTypeAllLevel();
					} else if (btnId == "copyUnit") {// 点击复制商品单位数据
						url = goodsManager.URL.initDropDownUrl();
					}
					$.callAjax({
						url : url,
						data : "",
						async : false,
						success : function(serverData) {
							var dataList = null;
							if (btnId == "copyType") {// 商品类型集合
								dataList = serverData;
							} else if (btnId == "copyUnit") {// 商品单位集合
								dataList = serverData.data.goodsUnitList;
							}
							if (dataList != null) {
								var str = "";
								for (var i = 0; i < dataList.length; i++) {
									var item = dataList[i];
									if (i != 0) {// 如果数据有一个以上，则加一个逗号再拼接
										str += ",";
									}
									if (btnId == "copyType") {// 拼接商品类型数据typeName，id
										str += item.typeName + "(" + item.id
												+ ")";
									} else if (btnId == "copyUnit") {// 拼接商品单位数据dictValue，dictDesc
										str += item.dictDesc + "("
												+ item.dictValue + ")";
									}
								}

								var copyUrl = document.getElementById(btnId
										+ "Data");
								copyUrl.value = str;
								copyUrl.select();
								document.execCommand("Copy"); // 执行浏览器复制命令
								$.toastrSuccess("复制成功类型编码");
								copyUrl.value = "...";
							} else {
								$.toastrWarning("没有数据！");
							}
						}
					});
				});
	}
}

// excel文件解析 start
function updateJson(sheet) {
	// json对象转为json字符串
	var str = JSON.stringify(sheet);
	/* 对象vo的集合属性：goodsOriginalList
	 * 对象vo集合属性中存放对象的属性：↓
	 * 商品名称		简介			类型编号		类型名称		单位key		单位描述 
	 * goodsName 	goodsDesc 	goodsType 	typeName 	unitValue 	unitDesc
	 */
	 
	str = str.replace(
			str.substring((str.indexOf("\"") + 1), str.indexOf("\"", 2)),
			"goodsOriginalList").replace(/商品名称/g, "goodsName")// 将所有的商品名称转换成vo属性字段goodsName
	.replace(/简介/g, "goodsDesc")// 将所有的“简介”转换成vo属性字段goodsDesc
	.replace(/商品类型\(编码\)/g,"typeName")// 将所有的“类型编号”转换成vo属性字段goodsType
	.replace(/单位\(键值\)/g,"unitDesc");// 将所有的“单位key”转换成vo属性字段unitValue
	// json字符串重新转为json对象
	str = JSON.parse(str);
	for (var i = 0; i < str.goodsOriginalList.length; i++) {
		
		var errInfoStr = "";
		
		// 获取的商品名称
		var itemGoodsName = str.goodsOriginalList[i].goodsName;
		if (itemGoodsName == undefined || itemGoodsName==null || itemGoodsName=="") {
			errInfoStr="“名称”";
		}
		
		// 获取的类型名称
		var itemTypeName = str.goodsOriginalList[i].typeName;
		if (itemTypeName == undefined || itemTypeName==null || itemTypeName=="") {
			errInfoStr+=(errInfoStr==""?"":"、")+"“类型”";
		}

		// 获取商品单位描述
		var itemUnitDesc = str.goodsOriginalList[i].unitDesc;
		if (itemUnitDesc == undefined || itemUnitDesc==null || itemUnitDesc=="") {
			errInfoStr+=(errInfoStr==""?"":"、")+"“单位”";
		}
		if (errInfoStr!="") {
			$.toastrWarning("第"+(i+1)+"条数据的"+errInfoStr+"为空"+(i>0?"！":"或标题与示例不一致！请确保数据的正确性！"));
			return;
		}
		
		// 获取类型名称的(下标
		var strLeftIndex = itemTypeName.indexOf("(");
		// 获取类型名称的)下标
		var strRightIndex = itemTypeName.indexOf(")");
		// 截取(下标+1 到 小于)下标的字符串， 如：水果(123)，则截取从(括号开始， 至)括号之前（不包含)括号），获取()中的值
		var goodsType = itemTypeName.substring(strLeftIndex+1,strRightIndex);
		// 将类型名称的类型id去除， 如：水果(123)，替换为：水果。
		str.goodsOriginalList[i].typeName=itemTypeName.replace(itemTypeName.substring(strLeftIndex), "");
		// 给当前json对象添加一个类型编号属性
		str.goodsOriginalList[i].goodsType=goodsType;
		
		// 获取类型名称的(下标
		strLeftIndex = itemUnitDesc.indexOf("(");
		// 获取类型名称的)下标
		strRightIndex = itemUnitDesc.indexOf(")");
		// 截取(下标+1 到 小于)下标的字符串， 如：千克(GK)，则截取从(括号开始， 至)括号之前（不包含)括号），获取()中的值
		var unitValue = itemUnitDesc.substring(strLeftIndex+1,strRightIndex);
		// 将单位描述的id去除， 如：千克(KG)，替换为：千克。
		str.goodsOriginalList[i].unitDesc=itemUnitDesc.replace(itemUnitDesc.substring(strLeftIndex), "");
		// 给当前json对象添加一个单位key属性
		str.goodsOriginalList[i].unitValue=unitValue;
	}
	goodsManager.jsonObj = str;
	$.toastrSuccess("验证通过！");
}
// 执行批量导入
function excuteImportRiginalGoods() {
	$.callAjax({
		url : goodsManager.URL.GoodsOriginalBatchImport(),
		data : goodsManager.jsonObj,
		success : function(data) {
			if (data.code != "0000") {
				$.toastrWarning(data.msg);
				return;
			}
			$.toastrSuccess(data.msg);
		}
	});
}

var X = XLSX;
var xl = document.getElementById('xlf');
if (xl.addEventListener) {
	console.log(222);
	xl.addEventListener('change', function(e) {
		var files = e.target.files;
		var f = files[0];
		var reader = new FileReader();
		var result = {};
		reader.onload = function(e) {
			var data = e.target.result;
			var wb = X.read(data, {
				type : 'binary'
			});
			wb.SheetNames.forEach(function(sheetName) {
				var roa = X.utils
						.sheet_to_row_object_array(wb.Sheets[sheetName]);
				if (roa.length > 0) {
					result[sheetName] = roa;
				}
			});
			var res = JSON.stringify(result, 2, 2);
			console.log(11);
			// importExcle(result);
			updateJson(result);
		};
		reader.readAsBinaryString(f);
	});
}
// excel文件解析 end

// 轮播 start
$.fn.extend({
			luara : function(a) {
				function s() {
					var a;
					switch (j) {
					case "top":
						a = h;
						break;
					case "left":
						a = h * g;
						break;
					default:
						a = h
					}
					return a
				}
				function t() {
					var a = b.find("img").eq(0), c = {};
					return c.width = a.width(), c.height = a.height(), c
				}
				function u(b) {
					var b = b || a.speed || l / 6;
					return b > l ? b = l : l > b && 0 > b
							&& (b = arguments.callee(-b)), b
				}
				function v() {
					q = setTimeout(function() {
						o++, e.eq(o - 1).removeClass(n), o == g && (o = 0),
								r(), e.eq(o).addClass(n), v()
					}, l)
				}
				var q, r, b = $(this).eq(0), c = $(this).find("ul").eq(0), d = c
						.find("li"), e = $(this).find("ol").eq(0).find("li"), f = b
						.find("img"), g = f.length, a = a || {}, h = a.width
						|| t().width, i = a.height || t().height, j = a.deriction
						|| "", k = "luara-" + j, l = (a.interval > 0 ? a.interval
						: -a.interval) || 3e3, m = u(), n = a.selected, o = 0;
				b.width(h).height(i).addClass(k), c.width(s(j)).height(i), d
						.width(h).height(i), e.eq(0).addClass(n), function() {
					s = null, t = null, u = null
				}(), r = function() {
					switch (j) {
					case "top":
						return function() {
							c.animate({
								top : -i * o + "px"
							}, m)
						};
					case "left":
						return function() {
							c.animate({
								left : -h * o + "px"
							}, m)
						};
					default:
						return function() {
							d.hide().eq(o).fadeIn(m)
						}
					}
				}(), e.mouseover(function() {
					e.eq(o).removeClass(n), o = e.index($(this)), $(this)
							.addClass(n), r()
				}), b.mouseenter(function() {
					clearTimeout(q)
				}).mouseleave(function() {
					v()
				}), v()
			}
		});
//轮播 end

$(document).ready(function() {
     $(".example2").luara({width:"500",height:"310",interval:4500,selected:"seleted",deriction:"left"});
	// 初始化绑定增删改查事件
	goodsManager.bindEvent();

});