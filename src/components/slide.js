define(function(require, exports, module) {

	var slidePlayer = function(object, options) {

		var slide = {};

		slide._data = {

			obj: $(object),

			def: {
				thumb: {

					activeClass: 'current'
				},
				item: {
					activeClass: 'current'
				},
				thumb: '.thumb',
				thumbSelector: 'li',
				itemSelector: 'li',

				activeClass: 'current',
				indexAttr: 'data-index', // start from 1

				time: 3000,
				page: 1 // start number, from 1
			},

			opt: options

		};

		slide._util = {};

		slide._fn = {};

		/**
		 *  util
		 */ (function(data, util) {

			var opt, num;

			util.getAttr = function(k) {
				opt = opt || $.extend(data.def, data.opt);
				return opt[k];
			};

			util.getNum = function() {
				return num;
			};

			// next item to display
			util.setNum = function(n) {
				num = n;
			};

		})(slide._data, slide._util);

		/**
		 * fn.init
		 */ (function(data, util, fn) {

			var obj = data.obj,
				$item = obj.find(util.getAttr('itemSelector')),
				$thumb = $(util.getAttr('thumb') || '');

			fn.init = (function() {
				//
			})();

			fn.getItem = function() {
				return $item;
			};

			fn.getThumb = function() {
				return $thumb;
			};

		})(slide._data, slide._util, slide._fn);

		/**
		 * fn.bind
		 */

		(function(data, util, fn) {
			var item = fn.getItem(),
				len = item.length,
				thumbSelector = util.getAttr('thumbSelector'),
				prevSelector = util.getAttr('prevSelector'),
				nextSelector = util.getAttr('nextSelector'),
				$thumb = fn.getThumb(),
				index;

			fn.bind = (function() {

				$thumb.on('click', thumbSelector, function() {
					// fn.auto(false);
					util.setNum(parseInt($(this).attr(util.getAttr('indexAttr')), 10) - 1);
					fn.toggle();
				});
				// .on('mouseleave', thumbSelector, function() {
				//     fn.auto(true);
				// });

				if (nextSelector) {
					$(nextSelector).on('click', function() {
						// fn.auto(false);
						fn.toggle();
						// fn.auto(true);
					});
				}
				if (prevSelector) {
					$(prevSelector).on('click', function() {
						// fn.auto(false);
						index = util.getNum() - 2;
						if (index < 0) {
							index = index + len;
						}
						util.setNum(index);
						fn.toggle();
						// fn.auto(true);
					});
				}
			})();

		})(slide._data, slide._util, slide._fn);

		/**
		 * fn.toggle
		 */ (function(util, fn, data) {

			var item = fn.getItem(),
				thumb = fn.getThumb(),
				thumbs = thumb.find(util.getAttr('thumbSelector')),
				len = item.length,
				obj = data.obj,
				activeClass = util.getAttr('activeClass'),
				t = null,
				clear = function() {
					if (t) {
						clearInterval(t);
						t = null;
					}
				};


			fn.toggle = function() {
				var n = util.getNum(),
					l = len,
					count = 0;

				clear();

				if (n < l - 1) {
					util.setNum(n + 1);
				} else {
					util.setNum(0);
				}

				item.hide();
				item.eq(n).fadeIn(200); // start from 0

				thumbs.removeClass(activeClass);
				thumbs.eq(n).addClass(activeClass);
				if (util.getAttr('isSpecial')) {
					t = setInterval(function() {
						thumbs.eq(n).removeClass(activeClass);
						n = n + 1;
						if (n > l - 1) {
							n = n - l;
						}
						thumbs.eq(n).addClass(activeClass);

						count = count + 1;
						if (count > l - 1) {
							clear();
						}
					}, 500);
				}

			};

		})(slide._util, slide._fn, slide._data);

		/**
		 * fn.auto
		 */

		(function(data, util, fn) {

			var t,
				time = util.getAttr("time"),
				toggle = fn.toggle;

			var interval = function() {
				toggle();
				t = setTimeout(interval, time);
			};

			fn.auto = function(flag) {

				if (flag) {
					t = setTimeout(interval, time);
				} else {
					clearTimeout(t); // stop
				}

			};

			util.setNum(util.getAttr("page"));
			// fn.auto(true);

		})(slide._data, slide._util, slide._fn);

	};

	$.slidePlayer = slidePlayer;

});