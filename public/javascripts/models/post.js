define([
	'backbone',
	'jquery'
], function (Backbone, $) {
	
	var PostModel = Backbone.Model.extend({
		idAttribute: '_id',
		url: function () {
			var location = '/post';
			return this.id ? (location + '/' + this.id) : location;
		}
	});

	return PostModel;
});
