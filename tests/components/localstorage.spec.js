define(function(require, exports, module) {
	var S = require('localstorage');

	describe("localstorage", function() {
		beforeEach(function() {

		});

		it("should set successfully", function(){
			S.setItem('name', 'alex');
			expect(S.getItem('name')).toEqual('alex');
		});

		it("should remove successfully", function(){
			S.removeItem('name');
			expect(S.getItem('name')).toBeFalsy();
		});

		it("should clear successfully", function(){
			S.setItem('name', 'john');
			S.clear();
			expect(S.getItem('name')).toBeFalsy();
		});
	});
});