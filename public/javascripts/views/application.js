define([
	'backbone',
	'codemirror',
	'jquery',
	'javascript',
	'views/post'
], function (Backbone, CodeMirror, $, js, PostView) {

	var App = Backbone.View.extend({
		events: {
			'mouseover	.posts div.row': 'highlight',
			'mouseout	.posts div.row': 'unhighlight'
		},
		initialize: function() {
			this.$post_list = $('.posts');
			this.listenTo(this.collection, 'add', this.addPost)
			this.collection.fetch();
		},
		highlight: function (ev) { $(ev.currentTarget).css("background", "#EEE"); },
		unhighlight: function (ev) { $(ev.currentTarget).css("background", ""); },
		addPost: function(model) {
		   var view = new PostView( { model: model} );
		   this.$post_list.prepend(view.render().el);
		}

	});

  return App;

});
