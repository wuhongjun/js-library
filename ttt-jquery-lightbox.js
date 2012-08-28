// #overlay {
// 	background: #000;
// 	position: absolute;
// 	top: 0;
// 	left: 0;	
// 	display: none;
// 	z-index: 100;
// 	cursor:pointer;
// }
define(function(require, exports, module) {

var $ = require('jquery'),
	util = require('util');

var pageWidth = util.pageWidth,
	pageHeight = util.pageHeight,
	throttle = util.throttle,
	mix = util.mix;

var def = {
		opacity: 0.6,

		bind: function(instance, elem) {
			
			elem.click(function() {
				instance.hide();
			});

		},
		showCb: function() {
			// console.log('overlay show');
		},
		hideCb: function() {
			// console.log('overlay hide');
		}
	};

var Overlay = function (elem, opt) {
		this.elem = $(elem);
		this.opt = $.extend(def, opt);
		this.isDisplay = false;

		this.init();
	};

Overlay.fn = Overlay.prototype = {
	init: function() {
		var instance = this,
			resize = throttle(function() {
				instance.resize();
			});

		instance.opt.bind.call('', instance, instance.elem);

		$(window).resize(resize);
		$(window).scroll(resize);
	},

	show: function() {
		this.isDisplay = true;
		this.resize();
		this.elem.fadeTo('fast', this.opt.opacity, this.opt.showCb);
	},

	hide: function() {
		this.elem.hide('fast', this.opt.hideCb);
		this.isDisplay = false;
	},

	resize: function() {
		if (!this.isDisplay) {
			return;
		}
		this.elem.css({
			width: pageWidth(),
			height: pageHeight()
		});
	}
};

(function() {
	mix(Overlay.fn, {
		stopBodyScroll: function() {
			var instance = this;

		},
		resetBodyScroll: function() {
			var instance = this;
		}
	})
})();

mix(exports, {
	Overlay: Overlay
});

});