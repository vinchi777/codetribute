define(['codemirror', 'jquery', 'javascript', 'views/application'], function (CodeMirror, $, js, AppView) {

var AppRouter = Backbone.Router.extend({
    routes: {
      "dashboard": "dashboard"
    }
  });

  var initialize = function () {
	  var app_router = new AppRouter;

	  app_router.on('route:dashboard', function(){
		  var appView = new AppView({ el: $('#main_container')});
	  });

	  Backbone.history.start({pushState: true});
  }

  return { initialize: initialize }

});
