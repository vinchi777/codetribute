define([
  'codemirror',
  'jquery',
  'javascript',
  'views/application',
  'models/posts',
  'models/user',
  'text!/../templates/user.html'
], function (CodeMirror, $, js, AppView, PostCollection, UserModel, userTemplate) {
  var UserView = Backbone.View.extend({
    template: _.template(userTemplate),
    render: function () {
      this.$el.html(this.template(this.model.attributes ));
      return this;
    }
  });

  return UserView;
});
