(function(seajs) {
	var alias = {
		$: 'gallery/jquery/1.8.3/jquery.js',
		jquery: 'gallery/jquery/1.8.3/jquery.js',
		mocha: 'gallery/mocha/1.9.0/mocha.js',

		base: 'src/base.js',
		cookie: 'src/components/cookie.js',
		encode: 'src/encode.js',
		random: 'src/random.js',
		support: 'src/support.js',
		log: 'src/debug.js',
		hashlib: 'src/hash.js',
		sort: 'src/sort.js',
		win: 'src/window.js',

		// components
		valueChange: 'components/valuechange.js',
		localstorage: 'components/localstorage.js',
		placeholder: 'components/placeholder.js',
		slide: 'components/slide.js'
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
			// Function.prototype.bind ? '' : 'es5-safe',
			// this.JSON ? '' : 'json'
			'placeholder'
		],

		paths: {
			'gallery': 'gallery',
			'src': 'src',
			'components': 'src/components'
		},

		plugins: ['text', 'shim']
	});
})(seajs);