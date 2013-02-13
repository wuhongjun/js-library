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
		hashlib: 'src/hash.js',
		sort: 'src/sort.js',
		valueChange: 'src/valuechange.js'
	};

	seajs.config({
		debug: true,
		alias: alias,
		preload: ['jquery']
	});

	seajs.use(['satyr', 'jquery','valueChange'], function(S, $, valueChange) {
		$.valueChange('#textarea', function(p, n) {
			console.log(p);
			console.log(n);
		});
	});
	// seajs.use(['satyr', 'underscore', 'marked', 'lang', 'cookie', 'encode', 'time', 'support', 'random', 'log', 'hashlib', 'sort'], function(S, _, marked) {
	// 	console.log(S);
	// 	S.assert('abc', 'fail in assert');
	// 	S.assertEqual('a', 0, 'fail in assertEqual');
	// 	S.log(S.hex_md5('abc'));
	// 	S.log(marked('# h1'));
	// 	_.each([1, 2, 3], function(value, index, arr) {
	// 		S.log(value);
	// 	});

	// 	S.log(S.insertSort([2, 5, 1, 6, 4, 7, 9]));
	// });
})(seajs);