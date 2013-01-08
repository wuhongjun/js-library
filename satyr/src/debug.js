/*
 * debug
 * export: log assert
 */
define(function(require, exports, module) {
	// require mod
	var S = require('satyr'),
		host = S.host;

	var document = host.document,
		docBody = document.body,
		resultsClassName = "results",
		resultsElem; // 一个ul元素 <ul class="results"></ul>	
	
	/* 
	 * @ret - elem {ul dom element}
	 * */
	var createResultsElem = function() {
			var elem = document.createElement("ul");
			elem.className = resultsClassName;
			elem.style.cssText = "position:fixed; right:5px; top:5px; width:300px; min-height:300px; height:300ox; padding:5px; overflow:scroll; background-color:#FC9; opacity:0.8;";
			docBody.appendChild(elem);
			return elem;
		},

		/* 
		 * @param desc - description {String}
		 * */
		assert = function(value, desc) {
			var li = document.createElement('li'),
				pre = 'assert: ';
			li.className = value ? 'pass' : 'fail'; // 根据value的不同创建不同的样式 .pass .fail需要在css中定义
			li.appendChild(document.createTextNode(pre + desc));

			resultsElem = resultsElem || createResultsElem();

			resultsElem.appendChild(li);
		},
		log = function(msg) {
			var li = document.createElement('li'),
				pre = 'log: ';
			li.className = 'log';
			li.appendChild(document.createTextNode(pre + msg));
			resultsElem = resultsElem || createResultsElem();

			resultsElem.appendChild(li);
		};

	var ret = {
        assert: assert,
        log: log
    };
    S.addSelfMark(ret);
    S.mix(exports, ret);
});