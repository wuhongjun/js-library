/*
 * time
 * export: now
 */

define(function(require, exports, module) {
	var S = require('satyr');

	var ret = {
        now: Date.now || function() {
	        return +new Date();
	    }
    };
    S.addSelfMark(ret);
    S.mix(exports, ret);

});