define([
  'codemirror',
  'jquery',
  'javascript',
  'views/application',
  'text!/../templates/form.html',
  'models/post'
], function (CodeMirror, $, js, AppView, formTemplate, PostModel) {
  var FormView = Backbone.View.extend({
    events: {
      'submit #post_form': 'savePost'
    },
    template: _.template(formTemplate),
    initialize: function(){
      $("#main_window").html(this.render().el);
      this.$body = $("#code_smell");
      this.$title = $("#title");
      this.$codesmell = $('#code_smell').get(0);
      this.options = {
	theme: 'solarized',
	mode: 'javascript',
	lineNumbers: true,
	autofocus: true
      }
      this.cm = CodeMirror.fromTextArea(this.$codesmell, this.options);
    },
    savePost: function (e){
      var _this = this;
      e.preventDefault();
      this.cm.save();
      var obj = {title: this.$title.val(), body: this.$body.val()}
      var post = new PostModel();
      post.save(obj, {success: function (model){
	console.log(model);
	_this.collection.add(model);
      }});
    },
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return FormView;
});
