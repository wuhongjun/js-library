define(function(require, exports, module) {
	var S = require('cookie');

	describe("cookie", function() {
		if (location.protocol === 'file:') {
			return;
		}

		describe('set', function() {

            it('should set a cookie with a given name and value', function() {
				S.set('name', 'alex');
				expect(S.get('name')).toEqual('alex');
            });
        });

		describe('remove', function() {
			it("should remove successfully", function(){
				S.set('name', 'john');
				S.remove('name');
				expect(S.get('name')).toBeFalsy();
			});
		});
	});
});