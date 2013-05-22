(function(seajs) {
	var alias = {
		jquery: 'gallery/jquery/1.8.3/jquery.js',

		base: 'src/base.js',
		lang: 'src/lang.js',
		cookie: 'src/cookie.js',
		encode: 'src/encode.js',
		random: 'src/random.js',
		time: 'src/time.js',
		support: 'src/support.js',
		log: 'src/debug.js',
		hashlib: 'src/hash.js',
		sort: 'src/sort.js',

		// components
		valueChange: 'components/valuechange.js'
	};

	seajs.config({
		debug: true,

		charset: 'utf-8',

		alias: alias,

		vars: {
		},

		map: [
			// ['.js', '-debug.js']
		],

		// 预加载项
		preload: [
			Function.prototype.bind ? '' : 'es5-safe',
			this.JSON ? '' : 'json'
		],

		paths: {
			'gallery': 'gallery',
			'src': 'src',
			'components': 'src/components'
		},

		plugins: ['text', 'shim']
	});
})(seajs);