(function() {
	// 返回m-n之间的随机数，并取整, 
	// 包括m, 不包括n - floor, ceil相反
	var choice = function(m, n) {
			var tmp;
			if (m > n) {
				tmp = m;
				m = n;
				n = tmp;
			}
			return Math.floor(Math.random() * (n-m) + m);
		};
	// var o = [0, 0, 0, 0, 0, 0];
	// for (var i = 1000 - 1; i >= 0; i--) {
	// 	var t = choice(-1, 4);
	// 	o[t] += 1;
	// }
	// console.log(o);
})();