define(function(require, exports, module) {
	var S = require('random');

	describe("random", function() {

		beforeEach(function() {
			
		});

		describe('choice', function() {
            it('should choice a number between m & n', function() {
            	expect(S.choice(5, 10)).toBeBetween(5, 10);
            });
        });

        xdescribe('shuffle', function() {
            it('should be a number', function() {

            });
        });

        xdescribe('guid', function() {
            it('should be a number', function() {
				
            });
        });
	});
});