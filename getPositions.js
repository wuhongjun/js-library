(function(window) {
	/* 
	 * 获取文本框里所选文字的开始和结束位置
	 * @param id {String} 文本框的id
	 * return {} startPosition and endPosition
	 * endPosition其实是结束位置后面一位
	 * */
	var getPositions = function( id ) {		
		var startPosition = endPosition = 0,
			element = document.getElementById(id);
		
		if ( document.selection ) {
			// for Internet Explorer
			// document.selection代表当前选中区
			var range = document.selection.createRange(),		// 要对选中去操作要先创建一个范围对象
				dRange = range.duplicate();						// 再克隆一个range

			// 将原始文本的值与所选文本比较得到位置
			dRange.moveToElementText(element);
			dRange.setEndPoint("EndToEnd", range);
			startPosition = dRange.text.length - range.text.length;
			endPosition = startPosition + range.text.length;		// 开始位置加上所选文本长度
		} else if ( window.getSelection ) {
			//For Firefox, Chrome, Safari etc
			startPosition = element.selectionStart;
			endPosition = element.selectionEnd;
		}

		return {
			'start': startPosition,
			'end': endPosition
		};
	};
	window.getPositions = getPositions;
})(window);

(function(window){
	var getPositions = window.getPositions;
	document.getElementById('a').onclick = function() {
		console.log(getPositions("a").end);
	};
})(window);
