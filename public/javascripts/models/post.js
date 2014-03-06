define([
	'backbone',
	'jquery'
], function (Backbone, $) {
	var PostModel = Backbone.Model.extend({
		answers: '0',
		title: '',
		username: 'Anonymous',
		date: ''
	});

	return PostModel;
});
