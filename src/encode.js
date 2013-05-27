/*
 * author: zenxds
 * email: zenxds@gmail.com
 * encode & decode
 * export: cookie{set, get, remove}
 */

define(function(require, exports, module) {

	var	encodeHTML = function(text){
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
    
    return ret;
});