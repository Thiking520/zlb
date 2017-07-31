function Util(obj) {

}
/**
 * 给一个表单 批量设值
 * 存在一个bug，比如表单name属性名有包含的情况下，会出现值会覆盖的情况，注意这个情况就可以了，
 * 比如一个name叫sum，一个name叫consumerCompany,sum在consumerCompany后面赋值的话，就会覆盖consumerCompany，因为都有sum
 * @param {} obj
 */
Util.setValues = function(obj) {
	$.each(obj, function(index, content) {
				$("*[name*='" + index + "']").val(content); // index为key，content为value
			});
}

Util.dateFormat = function(time, format) {
	if (time != null && time != '') {
		var t = new Date(time);
		var tf = function(i) {
			return (i < 10 ? '0' : '') + i
		};
		return (format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
					switch (a) {
						case 'yyyy' :
							return tf(t.getFullYear());
							break;
						case 'MM' :
							return tf(t.getMonth() + 1);
							break;
						case 'mm' :
							return tf(t.getMinutes());
							break;
						case 'dd' :
							return tf(t.getDate());
							break;
						case 'HH' :
							return tf(t.getHours());
							break;
						case 'ss' :
							return tf(t.getSeconds());
							break;
					};
				}));
	}
	return null;
}