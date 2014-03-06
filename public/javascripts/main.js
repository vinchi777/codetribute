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

require(['backbone', 'jquery','codemirror','javascript', 'controllers/dashboard' ], function ( Backbone, $, CodeMirror, js, Dashboard ) {
	Dashboard.initialize();
});


