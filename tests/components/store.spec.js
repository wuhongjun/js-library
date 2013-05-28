define(function(require, exports, module) {
	var S = require('store');

	describe("store", function() {
		beforeEach(function() {

		});

		it("should set successfully", function(){
			S.set('name', 'alex');
			expect(S.get('name')).toEqual('alex');

			S.set('tags', ['javascript', 'localStorage', 'store.js'])
			expect(S.get('tags').length).toEqual(3);
		});

		it("should remove successfully", function(){
			S.remove('name');
			expect(S.get('name')).toBeFalsy();
		});

		it("should clear successfully", function(){
			S.set('name', 'john');
			S.clear();
			expect(S.get('name')).toBeFalsy();
		});
	});
});