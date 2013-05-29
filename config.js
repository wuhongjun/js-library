(function(seajs) {
	var alias = {
		$: 'gallery/jquery/1.8.3/jquery.js',
		jquery: 'gallery/jquery/1.8.3/jquery.js',
		json: 'gallery/json/1.0.2/json.js',
		handlebars: 'gallery/handlebars/1.0.1/handlebars.js',
		underscore: 'gallery/underscore/1.4.3/underscore.js',

		base: 'src/base.js',
		encode: 'src/encode.js',
		random: 'src/random.js',
		support: 'src/support.js',
		log: 'src/debug.js',
		hashlib: 'src/hash.js',
		sort: 'src/sort.js',
		win: 'src/window.js',

		// components
		cookie: 'src/components/cookie.js',
		valueChange: 'components/valuechange.js',
		store: 'components/store.js',
		placeholder: 'components/placeholder.js',
		slide: 'components/slide.js',
		overlay: 'components/overlay.js'
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
			this.JSON ? '' : 'json',
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