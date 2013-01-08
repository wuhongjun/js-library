define(function(require, exports, module) {
	var host    = this,
		libName = 'satyr';

	var _lib = host[libName],
		lib  = host[libName] = {},

		isSelfMark = 'isSelf',		// 通过判断该标志确定是否向库本身mix代码
		
		noConflict = function() {
			host[libName] = _lib; 
		},

		mix = function(des, source, over) {
			// 对自身库进行扩展
	        var isSelf = false;
	        
	        if (!des || !source || des === source) {
	            return des;
	        }
	        if (!over) {
	            over = true; // 默认重写
	        }
	        if (isSelfMark in source) {
	        	isSelf = true;
	        	delete source[isSelfMark];		// 删除标志，不mix标志
	        }
	        for (i in source) {
	            if (over || !(i in des)) {
	                des[i] = source[i];
	                if (isSelf && !(i in lib)) {
	                	lib[i] = source[i];	
	                }
	            }
	        }
	        return des;
	    },
	    addSelfMark = function(o) {
	    	o[isSelfMark] = true;
	    };

	mix(lib, {
		EMPTY: '',
		noop: function() {},
		
		host: host,
		
		mix: mix,
		noConflict: noConflict,
		addSelfMark: addSelfMark,
	})

	return lib;
});