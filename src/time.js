/*
 * author: zenxds
 * email: zenxds@gmail.com
 * time
 * export: now
 */

define(function(require, exports, module) {
	var S = require('satyr');

    S.mixInternal(exports, {
    	now: Date.now || function() {
	        return +new Date();
	    }
    });

});