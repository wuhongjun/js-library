(function($){
	var util = {
		
		/* 
		 * 如果原来有title应当清除，否则会既显示title又显示tips
		 * */
		clearTitle: function(obj) {
			if(obj.attr('title')) {
				obj.attr('title', '');
			}
		}
	};

	$.fn.tooltips = function(tips, option) {
		var def = {
			speed: "slow",
			top: 5,
			left: 5
		},
			speed = def.speed;
		
		/* 
		 * 要显示的提示信息
		 * 一开始不管是否是显示的，应当隐藏起来
		 */
		tips = $(tips);			
		tips.hide();	

		/* 
		 * 覆盖默认参数
		 * */
		$.extend(def, option);
		
		util.clearTitle($(this));
		
		/* 
		 * 鼠标移入显示，移出隐藏
		 * */
		$(this).hover(function() {
			tips.fadeIn(speed);	
		}, function() {
			tips.fadeOut(speed);
		});
		
		/* 
		 * 鼠标移动时改变tips的位置
		 * */
		$(this).mousemove(function(e) {
			var topPosition = e.pageY + def.top,
				leftPosition = e.pageX + def.left;		// tip的位置
			
			tips.css({
				'position': 'absolute',
				'top' :  topPosition + 'px',
				'left' : leftPosition +'px'
			});
		});

	};
})(jQuery);
