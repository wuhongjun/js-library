(function(seajs) { 
	var alias = {
		jquery: 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js',
		satyr: 'seed.js',
		lang: 'src/lang.js',
		cookie: 'src/cookie.js'
	};

	seajs.config({
		debug: true,
		alias: alias,
		preload: ['jquery']
	});

	seajs.use(['satyr', 'cookie'], function(S, mod) {
		console.log(S);
		console.log(mod);
	});
})(seajs);