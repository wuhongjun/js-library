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
		hash: 'src/hash.js'
	};

	seajs.config({
		debug: true,
		alias: alias,
		preload: ['jquery']
	});

	seajs.use(['satyr', 'cookie', 'encode', 'random', 'time', 'support', 'log', 'hash'], function(S) {
		console.log(S);
		S.assert('abc', 'pass');
		S.assert('', 'fail');
		S.log(S.hex_md5('abc'));
	});
})(seajs);