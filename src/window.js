/*
 * author: zenxds
 * email: zenxds@gmail.com
 * window
 * export:
 */

define(function(require, exports, module) {

	var doc = document,
		body = doc.body,
		de = document.documentElement;

	var ret = {
		pageHeight: function() {
			return body.scrollHeight;
		},
		pageWidth: function() {
			return body.scrollWidth;
		},
		scrollX: function() {
			return window.pageXOffset || (de && de.scrollLeft) || body.scrollLeft;
		},
		scrollY: function() {
			return window.pageYOffset || (de && de.scrollTop) || body.scrollTop;
		},
		viewportHeight: function() {
			// var de = document.documentElement;      //IE67的严格模式
			return window.innerHeight || (de && de.clientHeight) || body.clientHeight;
		},
		viewportWidth: function() {
			return window.innerWidth || (de && de.clientWidth) || body.clientWidth;
		}
	};

	return ret;
});