define([
	'backbone',
	'jquery',
	'models/post'
], function (Backbone, $, PostModel) {
	var PostCollection = Backbone.Collection.extend({
		model: PostModel,
		url: 'http://localhost:3000/posts',
		initialize: function () {

		}
	});

	return PostCollection;
});
