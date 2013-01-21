/*
 * author: zenxds
 * email: zenxds@gmail.com
 */
define(function(require, exports, module) {

	var S = require('satyr'),
		insertSort = function(array) {
			var key,
				t,
				i,
				length = array.length;

			for (i = 1; i < length; i++) {
				key = array[i];
				t = i - 1;
				while (t >= 0 && array[t] > key) {
					array[t + 1] = array[t];
					array[t] = key;
					t = t - 1;
				}	
			}
			return array;
		};

	var ret = {
		insertSort: insertSort
	};
	S.mixInternal(exports, ret);
});