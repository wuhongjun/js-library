define(function(require, exports, module) {

	var S = require('satyr'),
		toString = Object.prototype.toString,
		AP = Array.prototype,

        isString = function(val) {
            return toString.call(val) === '[object String]';
        },
        isFunction = function(val) {
            return toString.call(val) === '[object Function]';
        },
        isNotEmptyString = function(val) {
            return isString(val) && val !== '';
        };

    S.mix(exports, {
    	isSelf: true,
    	isFunction: isFunction,
    	isString: isString,
    	isNotEmptyString: isNotEmptyString,
    	isArray: Array.isArray || function(val) {
		    return toString.call(val) === '[object Array]'
		}
    })
});