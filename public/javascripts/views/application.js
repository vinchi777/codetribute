define([
	'backbone',
	'codemirror',
	'jquery',
	'javascript'
], function (Backbone, CodeMirror, $, js) {

	var App = Backbone.View.extend({
		events: {
			'submit		#answer'	   : 'saveToTextArea',
			'mouseover	.posts div.row': 'highlight',
			'mouseout	.posts div.row': 'unhighlight',
			'click		.posts div.row': 'showCodeSmell'
		},
		initialize: function() {
			this.$input_codesmell = $('#code_smell').get(0);
			this.options = {
				theme: 'solarized',
				mode: 'javascript',
				lineNumbers: true,
				autofocus: true
			}
			this.cm = CodeMirror.fromTextArea(this.$input_codesmell, this.options);
		},
		saveToTextArea: function () {
			this.cm.save();
		},
		highlight: function (ev) { $(ev.currentTarget).css("background", "#EEE"); },
		unhighlight: function (ev) { $(ev.currentTarget).css("background", ""); },
		showCodeSmell: function (ev) {
			alert($(ev.currentTarget))
		}

	});

	var PostView = Backbone.View.extend({

	});

  return App;

});
