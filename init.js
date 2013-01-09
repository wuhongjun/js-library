(function(seajs) { 
	var alias = {
		jquery: 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js',
		satyr: 'seed.js',
		lang: 'src/lang.js',
		cookie: 'src/cookie.js',
		encode: 'src/encode.js',
		random: 'src/random.js',
		time: 'src/time.js',
		support: 'src/support.js',
		log: 'src/debug.js',
		hashlib: 'src/hash.js'
	};

	seajs.config({
		debug: true,
		alias: alias,
		preload: ['jquery']
	});

	seajs.use(['satyr', 'lang', 'cookie', 'encode', 'time', 'support', 'random', 'log', 'hashlib'], function(S) {
		console.log(S);
		S.assert('abc', 'fail in assert');
		S.assertEqual('a', 0, 'fail in assertEqual');
		S.log(S.hex_md5('abc'));
		// S.noConflict();
	});
})(seajs);