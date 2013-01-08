/*
 * random
 * export: random{choice}
 */

define(function(require, exports, module) {

	var S = require('satyr'),
		lang = require('lang'),

		/*
		 * 返回m-n之间的随机数，并取整, 
		 * 包括m, 不包括n - floor, ceil相反
		 * 也可以传入数组，随机返回数组某个元素
		 */
		choice = function(m, n) {
			var array,
				random;
			if (S.isArray(m)) {
				array = m;
				m = 0;
				n = array.length;
			}
			var tmp;
			if (m > n) {
				tmp = m;
				m = n;
				n = tmp;
			}

			random = Math.floor(Math.random() * (n-m) + m);
			if (array) {
				return array[random];
			} 
			return random;
		};

	var ret = {
        choice: choice
    };
    S.addSelfMark(ret);
    S.mix(exports, ret);
});