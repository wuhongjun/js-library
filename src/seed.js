/*
 * author: zenxds
 * email: zenxds@gmail.com
 */

define(function(require, exports, module) {
	var host    = this,
		libName = 'satyr';

	var _lib = host[libName],
		lib  = host[libName] = {},

		noConflict = function() {
			host[libName] = _lib; 
		},

		mix = function(des, source, over) {	        
	        if (!des || !source || des === source) {
	            return des;
	        }
	        if (!over) {
	            over = true; // 默认重写
	        }
	        for (i in source) {
	            if (over || !(i in des)) {
	                des[i] = source[i];
	            }
	        }
	        return des;
	    },
	    /*
 		 * mix to exports & lib
 		 * use only internal
	     */
	    mixInternal = function(des, source, over) {
	    	mix(des, source, over);
	    	mix(lib, source, over);
	    };

	mix(lib, {
		EMPTY: '',
		noop: function() {},
		
		host: host,
		
		mix: mix,
		mixInternal: mixInternal,
		noConflict: noConflict
	});

	return lib;
});