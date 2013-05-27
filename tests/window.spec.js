define(function(require, exports, module) {
	var S = require('win');

	describe("window", function() {

		beforeEach(function() {
			
		});

		describe('scrollX, scrollY', function() {
            it('should be a number', function() {
				expect(S.scrollX()).toEqual(jasmine.any(Number));
				expect(S.scrollY()).toEqual(jasmine.any(Number));
            });
        });

        describe('pageHeight, pageWidth', function() {
            it('should be a number', function() {
				expect(S.pageWidth()).toEqual(jasmine.any(Number));
				expect(S.pageHeight()).toEqual(jasmine.any(Number));
            });
        });

        describe('viewportHeight, viewportWidth', function() {
            it('should be a number', function() {
				expect(S.viewportWidth()).toEqual(jasmine.any(Number));
				expect(S.viewportHeight()).toEqual(jasmine.any(Number));
            });
        });
	});
});