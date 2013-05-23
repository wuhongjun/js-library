define(function(require, exports, module) {

beforeEach(function() {
	this.addMatchers({
		toBeLarge: function() {
			this.message = function() {
				return "Expected " + this.actual + " to be large";
			};
			return this.actual > 100;
		}
	});
});

});