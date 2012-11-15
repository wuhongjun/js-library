
var Class = function(parent) {
	var klass = function() {
		this.init.apply(this, arguments);
	};

	if (parent) {	//可选的继承
		var subclass = function() {};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass();
	}

	klass.prototype.init = function() {};
	klass.fn = klass.prototype;

	// klass.fn.constructor = klass;		// 
	klass.fn.parent      = klass;		// like constructor

	// use: Person.extend
	klass.extend = function(obj) {		// 为类添加方法属性
		var extended = obj.extended;	// callback
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) {
			extended(klass);
		}
	};
	// use: Person.extend
	klass.include = function(obj) {		//为实例添加方法
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if (included) {					// callback
			included(klass);
		}
	};
	return klass;
};

var Person = new Class();	//创建类
Person.prototype.init = function(name) {
	this.name = name;
};	//重写init
var p = new Person('alice'); 		//创建对象，会调用init

var o = {
	save: function() {
		console.log(this.name);
	},
	extended: function() {
		console.log('extended');
	},
	included: function() {
		console.log('included');
	}
};
Person.extend(o);
Person.include(o);
// p.constructor or p.parent -> klass 指向其构造函数

var Animal = new Class();
Animal.include({
	breath: function() {
		console.log('breath');
	}
});

var Cat = new Class(Animal);

var tom = new Cat();
tom.breath();