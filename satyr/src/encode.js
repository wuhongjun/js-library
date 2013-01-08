/*
 * encode & decode
 * export: cookie{set, get, remove}
 */

define(function(require, exports, module) {
	var S = require('satyr'),

		encodeHTML = function(text){
		    return String(text).replace(/["<>& ]/g, function(all){
		        return "&" + {
		            '"': 'quot',
		            '<': 'lt',
		            '>': 'gt',
		            '&': 'amp',
		            ' ': 'nbsp'
		        }[all] + ";";
		    });
		};

	var ret = {
        encodeHTML: encodeHTML
    };
    S.addSelfMark(ret);
    S.mix(exports, ret);

});