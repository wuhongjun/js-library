(function(seajs) { 
    var alias = {
        jquery: 'https://a.alipayobjects.com/static/arale/jquery/1.7.2/jquery.js'
    };

    seajs.config({
        alias: alias,
        preload: ['jquery']
    });
})(seajs);