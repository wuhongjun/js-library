/*
 * author: zenxds
 * email: zenxds@gmail.com
 */

define(function(require, exports, module) {

	var mix = function(des, source, over) {
		var i;
		if (!des || !source || des === source) {
			return des;
		}
		if (!over) {
			over = true; // 默认重写
		}
		for (i in source) {
			if (over || !(i in des)) {
				des[i] = source[i];
			}
		}
		return des;
	};
});