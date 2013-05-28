define(function(require, exports, module) {

	var $ = require('jquery');

	var slidePlayer = function(options) {

		var def = {
			thumb: '.thumb',
			thumbItem: '.thumb-item', // use $.on
			thumbActiveClass: 'current',
			eventType: 'click',
			indexAttr: 'data-index',

			slide: '.slide',
			slideItem: '.slide-item',
			slideActiveClass: 'current',

			prevSelector: '.prev',
			nextSelector: '.next',

			time: 3000,
			isAuto: true,
			toggleType: 'fade',
			toggleCallback: function($slideItem, $thumbItem) {

			}
		};


		var slide = {};

		slide.util = {};

		slide.fn = {};

		/**
		 *  util
		 */ 
		(function(util) {

			var opt, num;

			util.getOption = function(k) {
				opt = opt || $.extend({}, def, options);
				return opt[k];
			};

			util.getNum = function() {
				return num;
			};

			util.setNum = function(n) {
				num = n;
			};

		})(slide.util);

		/**
		 * fn.init
		 */
		(function(util, fn) {

			var getOption = util.getOption,
				$slide = $(getOption('slide')),
				$slideItems = $slide.find(getOption('slideItem')),
				$thumb = $(getOption('thumb')),
				$thumbItems = $thumb.find(getOption('thumbItem')),
				$prev = $(getOption('prevSelector')),
				$next = $(getOption('nextSelector'));

			fn.init = (function() {
				if (getOption('toggleType') == 'slide') {
					var width = parseInt(util.getOption('width'), 10);
                	$slide.css('width', width*$slideItems.length);
				}
                util.setNum(1);
            })();

			fn.getSlide = function() {
				return $slide;
			};
			fn.getThumb = function() {
				return $thumb;
			}

			fn.getSlideItems = function() {
				return $slideItems;
			};

			fn.getThumbItems = function() {
				return $thumbItems;
			};

			fn.getPrev = function() {
				return $prev;
			};

			fn.getNext = function() {
				return $next;
			}


		})(slide.util, slide.fn);

		/**
		 * fn.bind
		 */

		(function(util, fn) {
			var $slide = fn.getSlide(),
				$slideItems = fn.getSlideItems(),
				$thumb = fn.getThumb(),
				$thumbItems = fn.getThumbItems(),
				$prev = fn.getPrev(),
				$next = fn.getNext();

			var	length = $slideItems.length,
				index,
				getOption = util.getOption;

			fn.bind = (function() {

				$thumb.on(getOption('eventType'), getOption('thumbItem'), function() {
					fn.stop();

					index = parseInt($(this).attr(getOption('indexAttr')), 10) || $(this).index();
					util.setNum(index);
					fn.toggle();

					fn.play();
				});

				$next.on('click', function() {
					fn.stop();
					fn.next();
					fn.play();
				});
				$prev.on('click', function() {
					fn.stop();
					fn.prev();
					fn.play();
				});
			})();

		})(slide.util, slide.fn);

		/**
		 * fn.toggle, next() prev()
		 */
		(function(util, fn) {
			var $slide = fn.getSlide(),
				$slideItems = fn.getSlideItems(),
				$thumb = fn.getThumb(),
				$thumbItems = fn.getThumbItems(),
				$prev = fn.getPrev(),
				$next = fn.getNext();

			var length = $slideItems.length,
				getOption = util.getOption,
				thumbActiveClass = getOption('thumbActiveClass'),
				slideActiveClass = getOption('slideActiveClass'),
				toggleCallback = getOption('toggleCallback');


			fn.toggle = function() {
				var n = util.getNum(),
					toggleType = getOption('toggleType'),
					width;

				// next
				if (n < length - 1) {
					util.setNum(n + 1);
				} else {
					util.setNum(0);
				}

				if (toggleType == 'fade') {
					$slideItems.hide();
					$slideItems.eq(n).fadeIn(200); // start from 0
				}
				if (toggleType == 'slide') {
					width = parseInt(getOption('width'), 10);
					$slide.stop().animate({
	                    marginLeft: - (width * n) 
	                }, 300);
				}

				$slideItems.removeClass(slideActiveClass);
				$slideItems.eq(n).addClass(slideActiveClass);
				$thumbItems.removeClass(thumbActiveClass);
				$thumbItems.eq(n).addClass(thumbActiveClass);
				toggleCallback.call(slidePlayer, $slideItems.eq(n), $thumbItems.eq(n));
			};

			fn.next = function() {
				fn.toggle();
			};

			fn.prev = function() {
				var n = util.getNum();
				
				var index = n - 2;
				if (index < 0) {
					index = index + length;
				}
				util.setNum(index);
				fn.toggle();
			};


		})(slide.util, slide.fn);

		/**
		 * fn.play stop
		 */

		(function(util, fn) {

			var t,
				getOption = util.getOption,
				time = getOption("time"),
				toggle = fn.toggle;

			var interval = function() {
				toggle();
				t = setTimeout(interval, time);
			};

			fn.play = function() {
				t = setTimeout(interval, time);
			};

			fn.stop = function() {
				clearTimeout(t);
			};
			
			if (getOption('isAuto')) {
				fn.play();
			}

		})(slide.util, slide.fn);

	};

	return slidePlayer;

});