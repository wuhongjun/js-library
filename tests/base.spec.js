define(function(require, exports, module) {
	
var S = require('base');

describe('base', function() {
	describe("isString", function() {
		var isString;	// 在此处可以不放在beforeEach里,但是最好放在里面保证在每一个spec里都能正确运行
		beforeEach(function() {
			isString = S.isString;
		});

		it("should get true if the param is a string", function(){
			expect(isString('')).toBeTruthy();
			expect(isString('string')).toBeTruthy();
		});
		it("should get false if the param is not a string", function(){
			expect(isString(1)).toBeFalsy();
			expect(isString([])).toBeFalsy();
			expect(isString({})).toBeFalsy();
			expect(isString(null)).toBeFalsy();
			expect(isString(function() {})).toBeFalsy();
		});
	});

	describe("isNotEmptyString", function() {
		var isNotEmptyString;
		beforeEach(function() {
			isNotEmptyString = S.isNotEmptyString;
		});
		it("should be true if a string is empty", function() {
			expect(isNotEmptyString('abc')).toBeTruthy();
		});
		it("should be false if a string is not empty", function() {
			expect(isNotEmptyString('')).toBeFalsy();
		});
		
	});


	describe("isArray", function() {
		var isArray;
		beforeEach(function() {
			isArray = S.isArray;
		});

		it("should be true if the param is an array", function() {
			expect(isArray([])).toBeTruthy();
			expect(isArray([1, 2])).toBeTruthy();
		});
		it("should be false if the param is not an array", function() {
			expect(isArray(1)).toBeFalsy();
			expect(isArray("str")).toBeFalsy();
			expect(isArray(null)).toBeFalsy();
			expect(isArray()).toBeFalsy();
			expect(isArray({})).toBeFalsy();
			expect(isArray(function(){})).toBeFalsy();
		});
	});

	describe("indexOf", function() {
		it("should return the index of the array element", function() {
			
			expect(S.indexOf([1, 2, 3], 2)).toBe(1);
			expect(S.indexOf([1, 2], 3)).toBe(-1);
		});
	});

	describe("inArray", function() {
		it("should return true if the element in array", function() {
			
			expect(S.inArray([1, 2, 3], 2)).toBeTruthy();
			expect(S.inArray([1, 2], 3)).toBeFalsy();
		});
	});

	describe("substitute", function() {
		var substitute,
			context;

		beforeEach(function() {
			substitute = S.substitute;
			context = {
				name: 'alex'
			};
		});
		it("should replace even if there is blank in the {{}}", function() {
			expect(substitute("my name is {{ name}}", context)).toEqual("my name is alex");
			expect(substitute("my name is {{name}}", context)).toEqual("my name is alex");
			expect(substitute("my name is {{name  }}", context)).toEqual("my name is alex");
			expect(substitute("my name is {{ name  }}", context)).toEqual("my name is alex");
		});
		it("should not replace if the match startswith \\", function() {
			expect(substitute("my name is \\{{name}}", context)).toEqual("my name is {{name}}");
		});
	});

	// x, skip the test
	// or you can return, it's a hack
	xdescribe('test matcher', function() {
		xit("should be true if actual > 100", function() {
			expect(200).toBeLarge();
			expect(50).not.toBeLarge();
		});

		it("should typeof a number", function() {
			expect(200).toEqual(jasmine.any(Number));
		});
	});


	xdescribe('test spy', function() {
		var foo,
			bar;

		beforeEach(function() {
			foo = {
	            setBar: function(value) {
	                bar = value;
	            }
	        };

	        spyOn(foo, 'setBar');  //foo为spy函数
 
        	foo.setBar(123);
		});

		it("should replace the function or object", function() {
			expect(foo.setBar).toHaveBeenCalled();
		});

		 it("测试foo函数被调用的次数", function() {
	        expect(foo.setBar.calls.length).toEqual(1);
	    });

		 it("测试foo函数被调用时传入的参数", function() {
	        expect(foo.setBar).toHaveBeenCalledWith(123);
	        // expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	    });
	});

	describe('test now', function() {
		it('should be a number', function() {
			expect(S.now()).toEqual(jasmine.any(Number));
		});
	});

	describe('class', function() {
		it('should init success', function() {
			var Person = new S.Class();
			Person.fn.init = function(age, name, sex) {
				this.age = age;
				this.name = name;
				this.sex = sex;
			}

			var person = new Person(18, 'alex', 'male');

			expect(Person.fn.parent).toBe(Person);
			expect(Person.fn.constructor).toBe(Person);
			expect(person.age).toEqual(18);
			expect(person.name).toEqual('alex');
			expect(person.sex).toEqual('male');
		});

		it('should include success', function() {
			var Person = new S.Class();
			Person.fn.init = function(age, name, sex) {
				this.age = age;
				this.name = name;
				this.sex = sex;
			};
			Person.include({
				sayName: function() {
					return "my name is " + this.name;
				},
				included: function(klass) {
					// console.log('included');
				}
			});

			var person = new Person(18, 'alex', 'male');

			expect(person.sayName()).toEqual('my name is alex');
		});

		it('should extend success', function() {
			var Person = new S.Class();
			Person.fn.init = function(age, name, sex) {
				this.age = age;
				this.name = name;
				this.sex = sex;
			};
			Person.extend({
				isAnimal: true,
				extended: function() {
					// console.log('extended');
				}
			});
			expect(Person.isAnimal).toBeTruthy();
		});

		it('should extend parent success', function() {
			var Person = new S.Class();
			Person.fn.init = function(age, name, sex) {
				this.age = age;
				this.name = name;
				this.sex = sex;
			};
			Person.include({
				sayName: function() {
					return "my name is " + this.name;
				}
			});

			var Star = new S.Class(Person);
			Star.fn.init = function(title, name) {
				this.title = title;
				this.name = name;
			};

			var star = new Star('大明星', '方力申');

			expect(Star.fn.constructor).toBe(Star);
			expect(star.sayName()).toEqual('my name is 方力申');
		});
	});

	xdescribe('tes spy', function() {
		beforeEach(function() {

		});

		it("should replace the function or object", function() {
			spyOn(S, 'now');

			S.now();

			expect(S.now).toHaveBeenCalled();
		});
	});
});		// end base describe

});