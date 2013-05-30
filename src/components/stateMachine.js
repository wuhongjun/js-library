/*
 * author: zenxds
 * email: zenxds@gmail.com
 * stateMachine
 * export: 
 * v1.0 2013-5-29
 */
define(function(require, exports, module) {

	var S = require('base'),
		$ = require('jquery');

	var StateMachine = new S.Class;

	StateMachine.include({
		// bind & triger event
		// $(elem).bind
		// 仅仅是添加绑定和触发能力
		bind: function() {
			if (!this.o) {
				this.o = $({});
			}
			this.o.on.apply(this.o, arguments);
		},
		trigger: function() {
			if (!this.o) {
				this.o = $({});
			}
			this.o.triggerHandler.apply(this.o, arguments);
		},

		// item - 每个controller
		// add时为item添加active函数
		// 调用active时检查所有item
		// 当前item调用activate()
		// 同时其他item调用deactivate()
		add: function(controller) {
			// $({}).on('change', fun...)
			this.bind('change', function(e, current) {
				if (controller == current) {
					controller.activate();
				} else {
					controller.deactivate();
				}
			});

			
			controller.active = this.proxy(function() {
				this.trigger('change', controller);		// add时的controller
			});
		}
	});

	// console.log(StateMachine.fn);
	return StateMachine;
});