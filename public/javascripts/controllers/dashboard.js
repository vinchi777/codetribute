define([
  'codemirror',
  'jquery',
  'javascript',
  'views/application',
  'models/posts',
  'views/user',
  'views/post',
  'views/form',
  'models/post',
  'models/user'
], function (CodeMirror, $, js, AppView, PostCollection, UserView, PostView, FormView, PostModel, UserModel) {

var AppRouter = Backbone.Router.extend({
    routes: {
      ""	 : "showForm",
      "user/:id" : "showUser",
      "post/:id" : "showPost"
    },
    initialize: function (){
      this.collection = new PostCollection();
      this.$main_window = $("#main_window");
    },
    showForm: function () {
      var view = new FormView({ collection: this.collection });
    },
    showPost: function (id) {
      var _this = this;
      var post = new PostModel({ _id: id})
      post.fetch({ success: function(model){
	var view = new PostView({ model: model, tl: "windowpost"});
	_this.$main_window.html(view.render().el);
      }})
    },
    showUser: function (id) {
      var _this = this;
      var user = new UserModel({ _id: id});
      user.fetch({success: function(model){
	var view = new UserView({ model: model});
	_this.$main_window.html(view.render().el);
      }});
    }
  });

  var initialize = function () {
    var app_router = new AppRouter;
    var appView = new AppView({ el: $('#main_container'), collection: app_router.collection });

    Backbone.history.start({root: 'dashboard'});
  }

  return { initialize: initialize }

});
