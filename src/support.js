/*
 * author: zenxds
 * email: zenxds@gmail.com
 */
define(function(require, exports, module) {
	var S = require('satyr'),
		doc = document;

	var supportPlaceholder = 'placeholder' in doc.createElement('input');
	

	var ret = {
        supportPlaceholder: supportPlaceholder
    };

    S.mixInternal(exports, ret);
});