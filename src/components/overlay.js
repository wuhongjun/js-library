/*
 * author: zenxds
 * email: zenxds@gmail.com
 * overlay
 * export: 
 */

define(function(require, exports, module) {

	var S = require('base'),
		$ = require('jquery'),
		win = require('win');

	var template = "<div id='{{ id }}' class='{{ class }}'></div>",
		cssTemplate = "; position: absolute; top: 0; left: 0; height: 100%; width: 100%; opacity: {{ opacity }}; filter:alpha(opacity={{ alpha }}); background: {{ color }}; z-index: {{ zindex }};",
		def = {
			'id': 'overlay',
			'class': 'overlay',
			'opacity': 0.5,
			'color': '#000',
			'zindex': 200,
			hided: function(instance) {
				// console.log('hided');
			},
			showed: function(instance) {
				// console.log('showed');
			}
		};

	var Overlay = new S.Class;
	Overlay.fn.init = function(options) {
		this.options = $.extend({}, def, options);
		this.options.alpha = this.options.opacity * 100;

		this.render();

		this.resizeProxy = this.proxy(S.throttle(function() {
				this.resize();
			}, 150, this));
		this.hideProxy = this.proxy(this.hide);
	};


	Overlay.include({
		render: function() {
			$('body').append(S.substitute(template, this.options));
		},

		show: function() {
			var instance = this.getInstance();

			instance.show();
			this.resize();
			this.on();

			this.options.showed.call(this, instance);
		},
		hide: function() {
			var instance = this.getInstance();
			instance.hide();
			this.off();
			this.options.hided.call(this, instance);
		},
		resize: function() {
			var instance = this.getInstance();
			instance.css({
				width: win.pageWidth(),
				height: win.pageHeight()
			});
		},
		getInstance: function() {
			if (!this.element) {
				this.element = $('#' + this.options['id']);
				this.element[0].style.cssText += S.substitute(cssTemplate, this.options);
			}
			return this.element; 
		},

		// event on & off
		on: function() {
			$(window).on('scroll resize', this.resizeProxy);

			// click to hide the overlay
			var instance = this.getInstance();
			instance.on('click', this.hideProxy);
		},
		off: function() {
			$(window).off('scroll resize', this.resizeProxy);

			var instance = this.getInstance();
			instance.off('click', this.hideProxy);
		}
	});

	return Overlay;
});