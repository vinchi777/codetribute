require.config({
  paths: {
    jquery: 'jquery'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    codemirror: { deps: ['jquery'], exports: 'CodeMirror' },
    javascript: { deps: ['codemirror'] }
  }
});

require(['backbone', 'jquery','codemirror','javascript', 'users', 'posts' ], function ( Backbone, $, CodeMirror, js, User, Post ) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "dashboard": "dashboard",
      "post/:id": "post"
    }
  });

  var app_router = new AppRouter;

  app_router.on('route:dashboard', function(){
    User.initialize();
  });

  app_router.on('route:post', function(){
    $(function() {
      Post.initialize();
    });
  });

  Backbone.history.start({pushState: true});
});


