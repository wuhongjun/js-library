define(function(require, exports, module) {
	var S = require('cookie');

	describe("set", function() {
		var set,
			get,
			remove;
		beforeEach(function() {
			set = S.set;
			get = S.get;
			remove = S.remove;
		});

		it("should set successfully", function(){
			set('name', 'alex', 'zenxds.info');
			expect(get('name')).toEqual('alex');
		});
	});
});