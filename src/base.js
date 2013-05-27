/*
 * author: zenxds
 * email: zenxds@gmail.com
 * base作为对类库的补充
 * 如果相似功能较多或功能相对独立可拆分为多个文件
 * 接口如果稳定可在其他依赖文件里直接复制一份以减少依赖（如果对base的依赖接口少于3个）
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
		},
		Now = Date.now || function() {
			return +new Date();
		},

		toString = Object.prototype.toString,

		isString = function(val) {
			return toString.call(val) === '[object String]';
		},

		isNotEmptyString = function(val) {
			return isString(val) && val !== '';
		},

		isArray = Array.isArray || function(val) {
			return toString.call(val) === '[object Array]';
		};

	mix(exports, {

		mix: mix,

		now: Now,

		isString: isString,
		isNotEmptyString: isNotEmptyString,
		isArray: isArray,

		throttle: function(fn, ms, context) {
			ms = ms || 150;

			if (ms === -1) {
				return (function() {
					fn.apply(context || this, arguments);
				});
			}

			var last = Now();

			return (function() {
				var now = Now();
				if (now - last > ms) {
					last = now;
					fn.apply(context || this, arguments);
				}
			});
		},

		// {{ name }} -> {{ o[name] }}
		// \{{}} -> \{{}}
		// based on Django, fix kissy, support blank -> {{ name }}, not only {{name}}
		substitute: function(str, o, regexp) {
			if (!isString(str)) {
				return str;
			}
			return str.replace(regexp || /\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function(match, name) {
				if (match.charAt(0) === '\\') {
					return match.slice(1);
				}
				return (o[name] === undefined) ? '' : o[name];
			});
		}
	});
});