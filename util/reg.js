// number
var positiveInt = /^[1-9]\d*$/, 	// 匹配正整数, 大于0
	negativeInt = /^-[1-9]\d*$/,	// 匹配负整数 
	integer = /^-?[1-9]\d*|0$/,	    // 匹配整数  
	notNegativeInt = /^[1-9]\d*|0$/,
	notPositiveInt = /^-[1-9]\d*|0$/,
	positiveFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;		// 匹配正浮点数
	// ^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$   匹配负浮点数  
	// ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$     匹配浮点数  
	// ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$ 匹配非负浮点数（正浮点数 + 0）  
	// ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$    匹配非正浮点数（负浮点数 + 0） 

// 匹配中文字符  
// 普遍使用的正则是[\u4e00-\u9fa5]，但这个范围并不完整。例如：  
// /[\u4e00-\u9fa5]/.test( '⻏' ) // 测试部首⻏，返回false  
// 根据Unicode 5.0版编码，要准确的判断一个中文字符要包括：  
// 范围  含义  范围  含义  
// 2E80-2EFF   CJK 部首补充    2F00-2FDF   康熙字典部首  
// 3000-303F   CJK 符号和标点   31C0-31EF   CJK 笔画  
// 3200-32FF   封闭式 CJK 文字和月份   3300-33FF   CJK 兼容  
// 3400-4DBF   CJK 统一表意符号扩展 A  4DC0-4DFF   易经六十四卦符号  
// 4E00-9FBF   CJK 统一表意符号  F900-FAFF   CJK 兼容象形文字  
// FE30-FE4F   CJK 兼容形式    FF00-FFEF   全角ASCII、全角标点  
// 因此，正确的匹配中文字符正则表达式为：  
var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;  

var reg = rcjk
	str = '常';
console.log(reg.exec(str))  