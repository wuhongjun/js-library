define(function(require, exports, module) {

var widow = window,
    document = window.document,
    $ = require('jquery'),

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
    util = {};

util.mix = mix;

// base util
(function(S) {
    var toString = Object.prototype.toString,
        isString = function(val) {
            return toString.call(val) === '[object String]';
        },
        isFunction = function(val) {
            return toString.call(val) === '[object Function]';
        };

    S.mix(S, {
        isString: isString,
        isFunction: isFunction,
        noop: function() {}
    });
})(util);

// UA 能力检测
(function(S) {
    var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

    S.mix(S, {
        isIE6: isIE6
    })
})(util);

// cookie
(function(S) {
    var isNotEmptyString = function(val) {
            return S.isString(val) && val !== '';
        };
    
    var doc = document,
        MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000,
        encode = encodeURIComponent,
        decode = decodeURIComponent;

    var cookie = {
        /**
         * 获取 cookie 值
         * @return {string} 如果 name 不存在，返回 undefined
         */
        get: function(name) {
            var ret, m;

            if (isNotEmptyString(name)) {
                if ((m = String(doc.cookie).match(
                    new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
                    ret = m[1] ? decode(m[1]) : '';
                }
            }
            return ret;
        },

        set: function(name, val, domain, expires, path, secure) {
            var text = String(encode(val)), date = expires;

            // 从当前时间开始，多少天后过期
            if (typeof date === 'number') {
                date = new Date();
                date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
            }
            // expiration date
            if (date instanceof Date) {
                text += '; expires=' + date.toUTCString();
            }

            // domain
            if (isNotEmptyString(domain)) {
                text += '; domain=' + domain;
            }

            // path
            if (isNotEmptyString(path)) {
                text += '; path=' + path;
            }

            // secure
            if (secure) {
                text += '; secure';
            }

            //S.log(text);
            doc.cookie = name + '=' + text;
        },

        remove: function(name, domain, path, secure) {
            // 置空，并立刻过期
            this.set(name, '', domain, -1, path, secure);
        }
    };

    S.mix(S, {
        cookie: cookie
    });

})(util);

// date
(function(S) {

var now = Date.now || function() {
        return +new Date();
    },

    /*
     *  @function：将日期格式化成字符串
     *  @param： format--String,必须
     *              Y-4位年,y-2位年, M-不补0的月,m-补0的月, D-不补0的日期,d-补0的日期, H-不补0的小时,h-补0的小时,
     *              I-不补0的分,i-补0的分, S-不补0的秒,s-补0的秒, U-不补0的毫秒,u-补0的毫秒
     *          date--Date, 可选, 时间对象,默认当前客户端时间.
     *  @eg: var a = new Date(); $.dateFormat("Y-m-d h:i:s", a);
     *  @return：指定格式的字符串
     */
    tttDate = function(format, date) {
        date = date || new Date();
        var o = {};
        var Y = o.Y = date.getFullYear();
        var M = o.M = date.getMonth() + 1;
        var D = o.D = date.getDate();
        var H = o.H = date.getHours();
        var I = o.I = date.getMinutes();
        var S = o.S = date.getSeconds();
        var U = o.U = date.getMilliseconds();
        o.y = Y.toString().substring(2,4);
        o.m = (M < 10) ? ("0"+M) : M;
        o.d = (D < 10) ? ("0"+D) : D;
        o.h = (H < 10) ? ("0"+H) : H;
        o.i = (I < 10) ? ("0"+I) : I;
        o.s = (S < 10) ? ("0"+S) : S;
        o.u = (U < 10) ? ("0"+U) : ((U < 100) ? ("00"+U) : U);
        
        for (var i in o ){
            format = format.replace(i, o[i]);
        }
        return format;
    },

    formatDate = function(date) {
        date = date || new Date();
        if (S.isString(date)){
            date = new Date(date);
        }
        var now = new Date();
        var diffMinute = (now - date) / 60000,
            diffDay = ( ( new Date( now.getFullYear(), now.getMonth(), now.getDate() ) ) -
                        ( new Date( date.getFullYear(), date.getMonth(), date.getDate() ) ) ) / (24*60*60000);
        if( diffMinute < 1){
            return "刚刚";
        }
        if( diffMinute < 30){
            return parseInt(diffMinute, 10) + "分钟前";
        }
        if( diffDay == 0 ){
            return "今天";
        }
        if( diffDay == 1 ){
            return "昨天";
        }
        if( diffDay < 30 ){
            return diffDay + "天前";
        }
        if( now.getFullYear() ==  date.getFullYear()){
            return tttDate('M月D日', date);
        }
        return tttDate('Y年M月D日', date);
    };
    
    S.mix(S, {
        now: now,
        formatDate: formatDate,
        tttDate: tttDate
    });

})(util);

// url
(function(S) {

    var parseUrlParams = function(str) {
            str = str || location.search;
            str = str == ''  ? '' : str.substr(1);
            if( str == "" ){
                return {};
            }
            var arr = str.split("&"),
                i = 0,
                ret = {};
            for( ; i < arr.length; i++){
                var map = arr[i].split("=");
                ret[map[0]] = map[1] || null;
            }
            return ret;
        },
        // encode url with params
        encodeURL = function(path) {
            var l = path.split("?"),
                params = l[1].split("&"),
                length,
                i,
                encode = encodeURIComponent;

            for (i = 0, length = params.length; i < length ; i++) {
                var param = params[i].split("=");
                if (param.length == 2){
                    param[1] = encode(param[1]);
                    params[i] = param.join("=");
                }
            }
            l[1] = params.join("&");
            return l.join("?");
        };

    S.mix(S, {
        parseUrlParams: parseUrlParams,
        encodeURL: encodeURL
    })

})(util);

// other
(function(S) { 

    S.mix(S, {
        // for resize & scroll
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

        // xxxxxxxxx - originalDesc
        // originalDesc -> xxxx...lastSentence if the desc is too long
        limitLength: function(originalDesc, length, lastSentence) {
            lastSentence = lastSentence || '';
            var contentLength = length - lastSentence.length;

            if (originalDesc.length <= contentLength) {
                return originalDesc;
            } else {
                originalDesc = originalDesc.substr(0, contentLength - 1).split('');
                for (var i = originalDesc.length; i >= originalDesc.length - 6; i--) {
                    originalDesc[i] = '.';
                }
                return originalDesc.join('').concat(lastSentence);
            }
        }
    });

})(util);

// size and position
(function(S) {
    var doc = document,
        body = doc.body,
        de = doc.documentElement;

    S.mix(S, {
        pageHeight: function() {     
            return body.scrollHeight;
        },
        pageWidth: function() {
            return body.scrollWidth;
        },
        scrollX: function(){
            return window.pageXOffset || (de && de.scrollLeft) || body.scrollLeft;
        },
        scrollY: function(){
            return window.pageYOffset || (de && de.scrollTop) || body.scrollTop;
        },
        windowHeight: function(){
            // var de = document.documentElement;      //IE67的严格模式
            return window.innerHeight || (de && de.clientHeight) || body.clientHeight;
        },
        windowWidth: function(){
            return window.innerWidth || (de && de.clientWidth) || body.clientWidth;
        },
        // for calc center position
        adjust: function(width, height, isInView) {
            var t = S.scrollY() + (S.windowHeight()/2) - (height/2),
                l = S.scrollX() + (S.windowWidth()/2) - (width/2);
            if (isInView) {
                //盒子不能超过页面顶端
                if (t < 0) {
                    t = 0;
                }
                if (l < 0) {
                    l = 0;
                }
            }
            return {
                left: l,
                top: t
            };
        }
    });
})(util);

/* --------------------------jquery util---------------------------------*/

(function(S) {

    var openAnimate = function() {
            if ( S.isIE6 ){
                $.fx.off = false;
            }
        },
        closeAnimate = function() {
            if ( S.isIE6 ){
                $.fx.off = true;
            }
        };

    S.mix(S, {
        openAnimate: openAnimate,
        closeAnimate: closeAnimate,

        // 检测文本框值是否为空,为空则产生动画效果
        imperfectTextCheck: function(elem) {
            elem = $(elem);
            if ($.trim(elem.val()) == '') {
                openAnimate();
                elem.css("background-color", "#ffff99").fadeOut("fast", function(){
                    elem.fadeIn("fast", function(){
                        elem.css("background-color", "#ffffff");
                        closeAnimate();
                    });
                });
                return true;
            } else {
                return false;
            }         
        }
    });

})(util);

return util;
});