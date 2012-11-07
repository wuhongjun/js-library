function log() {
	try {
		console.log.apply(console, arguments);
	} catch(e) {
		try {
			opera.postError.apply(opera, arguments);
		} catch(e) {
			alert(Array.prototype.join.call(arguments, " "));
		}
	}
}
(function(window) {
	var document = window.document,
		docBody = document.getElementsByTagName('body')[0],
		results; // 一个ul元素 <ul id="results"></ul>
	/* 
	 * @param desc - description {String}
	 * */

	function assert(value, desc) {
		var li = document.createElement('li');
		li.className = value ? 'pass' : 'fail'; // 根据value的不同创建不同的样式 .pass .fail需要在css中定义
		li.appendChild(document.createTextNode(desc));

		if(!results) { // 如果未找到
			results = document.createElement("ul");
			results.id = 'results';
			results.style.cssText = "position:fixed; right:5px; top:5px; width:300px; height:300ox; padding:5px; overflow:scroll; background-color:#FC9;";
			docBody.appendChild(results);
		}

		results.appendChild(li);
	}

	window.assert = assert;
})(window);