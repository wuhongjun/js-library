define(function(require, exports, module) {
	var S = require('handlebars'),
        $ = require('jquery');

	describe("handlebars", function() {
        var template,
            data;

		beforeEach(function() {
			template = S.compile($("#people-template").html());
            data = {
                people: [
                    { first_name: "Alan", last_name: "Johnson"},
                    { first_name: "Allison", last_name: "House"}
                ]
            };
        });

		describe('expressions', function() {
            it('should replace success', function() {
                $('#list').html(template(data));
            });
        });
	});
});