/*
 * author: zenxds
 * email: zenxds@gmail.com
 */
define(function(require, exports, module) {

	var S = require('satyr'),
        time = require('time'),

		toString = Object.prototype.toString,

        isString = function(val) {
            return toString.call(val) === '[object String]';
        };

    var ret = {
        isNotEmptyString: function(val) {
            return isString(val) && val !== '';
        },
        isArray: Array.isArray || function(val) {
            return toString.call(val) === '[object Array]';
        },
        throttle: function(fn, ms, context) {
            ms = ms || 150;

            if (ms === -1) {
                return (function() {
                    fn.apply(context || this, arguments);
                });
            }

            var last = S.now();

            return (function() {
                var now = S.now();
                if (now - last > ms) {
                    last = now;
                    fn.apply(context || this, arguments);
                }
            });
        },

        // {{ name }} -> {{ o[name] }}
        // based on Django
        substitute: function (str, o, regexp) {
            if (!isString(str)) {
                return str;
            }
            return str.replace(regexp || /\\?\{\{([^{}]+)\}\}/g, function (match, name) {
                if (match.charAt(0) === '\\') {
                    return match.slice(1);
                }
                return (o[name] === undefined) ? '' : o[name];
            });
        }
    };

    S.mixInternal(exports, ret);
});