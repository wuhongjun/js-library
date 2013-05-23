define(function(require, exports, module) {
	var S = require('base');

	describe("isString", function() {
		var isString;
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
		var isNotEmptyString = S.isNotEmptyString;
		// beforeEach(function() {
		// 	isNotEmptyString = S.isNotEmptyString;
		// });
		it("should be true if a string is empty", function() {
			expect(isNotEmptyString('abc')).toBeTruthy();
		});
		it("should be false if a string is not empty", function() {
			expect(isNotEmptyString('')).toBeFalsy();
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

	describe('test matcher', function() {
		it("should be true if actual > 100", function() {
			expect(200).toBeLarge();
			expect(50).not.toBeLarge();
		});
	});
});