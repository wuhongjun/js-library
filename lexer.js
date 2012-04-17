/* 
 * 命名空间
 * */
this.S = {};

/* 
 * 工具库结构
 * */
(function(S) {
	S.util = {};
})(S);

/* 
 * 构建方式
 * */
(function(S) {

	var mix = function(des, source, over) {
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
	};

	S.mix = mix;

})(S);

/* 
* 工具函数
 * */
(function(S, util) {

	var toString = Object.prototype.toString,
		AP = Array.prototype;
	
	/* 
	 * 判断字符串中的单个字符
	 * */
	var digit = /\d/,
		letter = /[a-zA-Z]/;

	S.mix(util, {
		
		$: function(id) {
			if (!isString(id)) {
				return false;
			}
			return document.getElementById(id) || id;
		},

		log: function(msg) {
			if (console.log) {
				console.log(msg);
			}
		},

		error: function(msg) {
			throw msg;
		},

		/* 
		 * 这里是检测字符串里的单个数字
		 * */
		isNumber: function(val) {
			return digit.test(val);
		},

		/* 
		 * 检测字符串里的单个字符
		 * */
		isLetter: function(val) {
			return letter.test(val);
		},

		isString: function(val) {
			return toString.call(val) === '[object String]';
		},

		indexOf: AP.indexOf ? function(arr, item) {
			return arr.indexOf(item);
		}: function(arr, item) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i;
				}
			}
			return -1;
		},

		forEach: AP.forEach ? function(arr, fn) {
			arr.forEach(fn);
		}: function(arr, fn) {
			for (var i = 0, len = arr.length; i < len; i++) {
				fn(arr[i], i, arr);
			}
		}
		
	});

	var forEach = util.forEach,
		isString = util.isString,
		$ = util.$;
})(S, S.util);


/*
 * 上层接口函数
 * */
(function(S, util){
	var isString = util.isString,
		$ = util.$,
		forEach = util.forEach;
	
	S.mix(S, {
		
		/* 
		 * 最终显示符号表内的内容
		 * */
		display: function(id, map) {
			if (isString(id)) {
				id = $(id);		// 一个ul元素
			} else {
				return false;
			}
			id.innerHTML = "";	// 先清空之前的结果	
			forEach(map, function(item, i, arr) {
				id.innerHTML += "<li>" + "(" + item["kind"] + "," + item['token'] + ")" + "</li>";
			});
			return true;
		}
	});


})(S, S.util);

/* 
 * 预处理模块
 * 删除注释，把多个连续空格合并为一个
 * */
(function(S, util){
	var isString = util.isString,
		$ = util.$;

	var comment = /\/\*.*?\*\//g,
		blank = /\s+/;

	var deleteComment = function(str) {
			if (isString(str)) {
				return str.replace(comment, "");
			}
			return false;
		},
		combineBlank = function(str) {
			if (isString(str)) {
				return str.replace(blank, " ");
			}
			return false;
		};


	S.mix(S, {
		init: function(str) {
			str = deleteComment(str);
			return combineBlank(str);
		}
	});
})(S, S.util);

/* 
 * data模块
 * */
(function(S){
	S.map = [];			// 符号表，输出给语法分析阶段

	/* 关键字 */
	S.keywords = ["begin", "if" , "then", "while", "do", "end"];
	
	/* 单词符号种别码
	 * 下标即为种别，如#的种别为0
	 * */
	S.kind = ["#", "begin", "if", "then", "while" , "do", "end", "", "", "", "id", "num", "", "+", "-", "*", "/", ":", ":=", "", "<", "<>", "<=", ">", ">=", "=", ";", "(", ")"];
})(S);

/* 
 * 状态转换图中的结束状态
 * true表示是否需要回退一步
 * */
(function(S){

	S.endState = {
		2: true,	
		4: true,
		5: false,
		6: false,
		7: false,
		8: false,
		9: false,
		11: false,
		12: false,
		13: true,
		15: false,
		16: true,
		18: false,
		19: true,
		20: false,
		21: false,
		22: false,
		23: false,
		24: false
	};
})(S);

/* 
 * 核心处理模块
 * */
(function(S, util){

var isString = util.isString,
	isNumber = util.isNumber,
	isLetter = util.isLetter,
	indexOf = util.indexOf,
	display = S.display,
	keywords = S.keywords,		// 这三个都是不变的，map是变化的，不要赋值给局部变量
	kind = S.kind,
	endState = S.endState;
	

/* 
 * 通过两个指针确定词素
 * begin-当前词素开始位置
 * forward-一直向前扫描，直到某个模式被匹配
 * */
var begin = 0,
	forward = 0,
	state = 0;		// 初始状态为0	


/* 
 * 状态转换函数
 * @param state 当前状态
 * @param c		下一个字符
 * @return 
 * */
var move = function(c) {

switch (state) {
	case 0:
		switch (c) {
			case ' ':
				begin++;	// 空格就跳过
				break;
			case '(':
				state = 5;
				break;
			
			case ")":
				state = 6;
				break;
			
			case "+":
				state = 7;
				break;
			
			case "-":
				state = 8;
				break;

			case "=":
				state = 9;
				break;

			case "<":
				state = 10;
				break;
			
			case ">":
				state = 14;
				break;

			case ":":
				state = 17;
				break;
			
			case ";":
				state = 20;
				break;

			case "*":
				state = 21;
				break;

			case "/":
				state = 22;
				break;

			case "#":
				state = 23;
				break;
			
			default:
				state = 24;
				break;
		}

		/* 
		 * 这两个必须放在下面判断，因为这两个也被包含在上面的default内
		 * */
		if (isNumber(c)) {
			state = 3;
		} else if (isLetter(c)) {
			state = 1;
		}
		break;
	case 1:
		if (!isLetter(c) && !isNumber(c)) {
			state = 2;
		}
		break;
	
	case 3:
		if (!isNumber(c)) {
			state = 4;
		}
		break;
	case 10:
		if (c == "=") {
			state = 11;
		} else if (c == ">") {
			state = 12;
		} else {
			state = 13;
		}
		break;
	case 14:
		if (c == "=") {
			state = 15;
		} else {
			state = 16;
		}
		break;
	
	case 17:
		if (c == "=") {
			state = 18;
		} else {
			state = 19;
		}
		break;

	default:
		break;
}

},

/* 
* 某些结束状态指针要回退一位
* */
back = function() {
forward -= 1;
},

// 返回数组的下一个字符，通过forward指针确定
// 指针指向下一个字符
nextChar = function(array) {
var ret = array[forward];
forward++;
return ret;
},

buildList = function(str) {
var token = str.slice(begin, forward).join(""),
	map = S.map;
if (state == 2) {	// 标示符
	// 首先要判断是不是关键字
	// 在关键字表中找到了该单词
	if (indexOf(keywords, token) > -1) {
		map.push({
			kind: indexOf(kind, token),
			token: token
		});
	} else {	// 只是普通的标识符
		map.push({
			kind: indexOf(kind, 'id'),
			token: token
		});	
	}
} else if (state == 4) {
	map.push({
		kind: indexOf(kind, 'num'),
		token: token
	});	
} else if (state == 24) {		// 非接受字符
	map.push({
		kind: "error input character",
		token: token
	});
} else {
	map.push({
		kind: indexOf(kind, token),
		token: token
	});
}
},

DFAM = function(str) {
var i,
	l;

begin = forward = 0; // 每次要重置指针
S.map = [];


if (!isString(str)) {
	return false;
}

str = str.split("");		// 把字符串转成数组
l = str.length;
while (forward < l) {
	move(nextChar(str));

	// 如果是结束状态
	if (state in endState) {
		// 需要回退一格
		if (endState[state]) {
			back();
		}
		buildList(str);		// 写入符号表
		state = 0;	// 重置状态
		begin = forward;
	}
	}
	return true;
};

S.mix(S, {
	DFAM: DFAM,
	move: move
});
})(S, S.util);

(function(S, util) {
	var $ = util.$,
		log = util.log,
		display = S.display;
	
	$('form').onsubmit = function() {
		var content = $('content').value;
		content = S.init(content); 
		S.DFAM(content);	
		display("result", S.map);
		return false;
	};
})(S, S.util);

