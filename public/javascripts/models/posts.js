define([
	'backbone',
	'jquery',
	'models/post'
], function (Backbone, $, PostModel) {
	var PostCollection = Backbone.Collection.extend({
		model: PostModel
	});

	return PostCollection;
});
