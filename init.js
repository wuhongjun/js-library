(function(seajs) { 
	var alias = {
		jquery: 'sea-modules/gallery/jquery/1.8.3/jquery.js',
		underscore: 'sea-modules/gallery/underscore/1.4.3/underscore.js',
		marked: 'sea-modules/gallery/marked/0.2.4/marked.js',
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

	seajs.use(['satyr', 'marked', 'lang', 'cookie', 'encode', 'time', 'support', 'random', 'log', 'hashlib'], function(S, marked) {
		console.log(S);
		S.assert('abc', 'fail in assert');
		S.assertEqual('a', 0, 'fail in assertEqual');
		S.log(S.hex_md5('abc'));
		S.log(marked('# h1'))
		// S.noConflict();
	});
})(seajs);