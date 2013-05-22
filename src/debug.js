/*
 * author: zenxds
 * email: zenxds@gmail.com
 * debug
 * export: log assert assertEqual
 */
define(function(require, exports, module) {
	// require mod
	var S = require('base'),
		host = S.host;

	var document = host.document,
		docBody = document.body,
		resultsClassName = "results",
		lineNumber = 0,
		formatter = "{{lineNumber}}. {{pre}}: {{msg}}",
		resultsElem; // a ul elem <ul class="results"></ul>	
	
	/* 
	 * use internal
	 * @ret - elem {ul dom element}
	 * */
	var createResultsElem = function() {
			var elem = document.createElement("ul");
			elem.className = resultsClassName;
			elem.style.cssText = "position:fixed; right:5px; top:5px; width:500px; min-height:300px; height:300ox; padding:5px; overflow:scroll; background-color:#FC9; opacity:0.8;";
			docBody.appendChild(elem);
			return elem;
		},
		appendToResults = function(className, pre, msg) {
			var li = document.createElement('li');

			li.className = className;
			lineNumber += 1;
			if (className == 'pass') {
				msg = 'pass';	// success msg
			}
			msg = S.substitute(formatter, {
				lineNumber: lineNumber,
				pre: pre,
				msg: msg	// error or log msg
			});
			li.appendChild(document.createTextNode(msg));
			resultsElem = resultsElem || createResultsElem();
			resultsElem.appendChild(li);
		},
		/* 
		 * @param msg - description {String}
		 * */
		assert = function(value, msg) {
			var pre = 'assert',
				className = value ? 'pass' : 'fail'; // you need to write .pass .fail css

			appendToResults(className, pre, msg);
		},
		assertEqual = function(value1, value2, msg) {
			var pre = 'assertEqual',
				className = value1 == value2 ? 'pass' : 'fail'; // 根据value的不同创建不同的样式 .pass .fail需要在css中定义

			appendToResults(className, pre, msg);
		},
		log = function(msg) {
			var pre = 'log',
				className = 'log';
			
			appendToResults(className, pre, msg);
		};

    S.mixInternal(exports, {
        assert: assert,
        assertEqual: assertEqual,
        log: log
    });
});