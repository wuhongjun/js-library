/*
 * author: zenxds
 * email: zenxds@gmail.com
 * random
 * export: random{choice}
 */

define(function(require, exports, module) {

	var S = require('base'),


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
		},

		/*
		 * http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
		 * 洗牌算法
		 * 多次运行测试是否足够随机
		 * test code: https://gist.github.com/4507739
		 */
		shuffle = function(array) {
			if (!S.isArray(array)) {
				return [];
			}

			var length = array.length,
				temp,
				i = length, 
				j;

			if (length === 0) {
				return [];
			}

			while (i > 1) {
				i = i - 1;
				j = choice(0, i)
				temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		};

	var ret = {
		choice: choice,
		shuffle: shuffle
	};
	return ret;
});