define(function(require) {
	var $ = require('jquery');

	var log = seajs.log;

	var S = require('base');
	window.$ = $;

	log(S.isString('ab'));
	log(S.now());
	log(S.isArray([]));

	var t = S.throttle(function() {
		alert(1);
	}, -1);
	// t();
	// 
	
	var template = "{{name  }}",
		context = {'name': 'alex'};

	log(S.substitute(template, context));
});
