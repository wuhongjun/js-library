/*
 * author: zenxds
 * email: zenxds@gmail.com
 * base作为对类库的补充
 * 如果相似功能较多或功能相对独立可拆分为多个文件
 * 接口如果稳定可在其他依赖文件里直接复制一份以减少依赖（如果对base的依赖接口少于3个）
 */

define(function(require, exports, module) {

	var mix = function(des, source, blacklist, over) {
			var i;
			if (!des || !source || des === source) {
				return des;
			}
			if (!blacklist) {
				blacklist = [];
			}
			if (!over) {
				over = true; // 默认重写
			}
			for (i in source) {
				if (inArray(blacklist, i)) {
					continue;
				}
				if (over || !(i in des)) {
					des[i] = source[i];
				}
			}
			return des;
		},

		// lang
		// 为了降低对其他文件的依赖，自己实现
		toString = Object.prototype.toString,
		AP = Array.prototype,

		isString = function(val) {
			return toString.call(val) === '[object String]';
		},

		isNotEmptyString = function(val) {
			return isString(val) && val !== '';
		},

		isArray = Array.isArray || function(val) {
			return toString.call(val) === '[object Array]';
		},

		inArray = function(arr, item) {
			return indexOf(arr, item) > -1;
		},

		indexOf = AP.indexOf ? 
			function(arr, item) {
        		return arr.indexOf(item);
      		} :
      		function(arr, item) {
        		for (var i = 0; i < arr.length; i++) {
          			if (arr[i] === item) {
            			return i;
          			}
        		}
        		return -1;
      		},

      	// oo
      	// 类属性需要自己设置,不能继承父类的属性
		Class = function(parent) {
			var klass = function() {
				this.init.apply(this, arguments);
			};

			if (parent) {
				var subclass = function() {};
				subclass.prototype = parent.prototype;
				klass.prototype = new subclass;
			}

			klass.prototype.init = function() {};		// need to be overwrite
			klass.fn = klass.prototype;

			klass.fn.constructor = klass;
			klass.fn.parent = klass;


			// 在事件处理程序中保证this指向klass, not 事件发生元素
			klass.proxy = function(func) {
				var self = this;
				return (function() {
					return func.apply(self, arguments);
				});
			};
			klass.fn.proxy = klass.proxy;

			// 添加类属性
			klass.extend = function(object) {
				var extended = object.extended;
				
				mix(klass, object, ['extended']);
				
				if (extended) {
					extended(klass);
				}
			};

			// 向原型上添加实例属性
			klass.include = function(object) {
				var included = object.included;

				mix(klass.fn, object, ['included']);

				if (included) {
					included(klass);
				}
			};

			return klass;

		},



		Now = Date.now || function() {
			return +new Date();
		},

		// 在underscore里面有实现，这个版本借鉴的是kissy
		throttle = function(fn, ms, context) {
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

		// 函数柯里化
		curry = function(fn) {
			var slice = [].slice,
				args = slice.call(arguments, 1);

			return function() {
				var innerArgs = slice.call(arguments),
					retArgs = args.concat(innerArgs);

				return fn.apply(null, retArgs);
			};
		},

		// {{ name }} -> {{ o[name] }}
		// \{{}} -> \{{}}
		// based on Django, fix kissy, support blank -> {{ name }}, not only {{name}}
		substitute = function(str, o, regexp) {
			if (!isString(str)) {
				return str;
			}
			return str.replace(regexp || /\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function(match, name) {
				if (match.charAt(0) === '\\') {
					return match.slice(1);
				}
				return (o[name] === undefined) ? '' : o[name];
			});
		};


	var ret = {

		mix: mix,

		isString: isString,
		isNotEmptyString: isNotEmptyString,
		isArray: isArray,
		inArray: inArray,
		indexOf: indexOf,

		Class: Class,

		now: Now,
		throttle: throttle,
		curry: curry,
		substitute: substitute

	};

	return ret;
});