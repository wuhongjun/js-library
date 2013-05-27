define(function(require, exports, module) {
	var S = require('encode');

	describe("encode", function() {

		describe('encode such < to &lt;', function() {
            it('should encode successfully', function() {
				expect(S.encodeHTML('<')).toBe('&lt;');
				expect(S.encodeHTML('>')).toBe('&gt;');
				expect(S.encodeHTML('&')).toBe('&amp;');
				expect(S.encodeHTML(' ')).toBe('&nbsp;');
            });
        });
	});
});