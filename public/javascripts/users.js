define(['codemirror', 'jquery', 'javascript'], function (CodeMirror, $, js) {

  var initialize = function () {
    var $this = $('#code_smell').get(0);
    var options = {
      theme: 'solarized',
      mode: 'javascript',
      lineNumbers: true,
      autofocus: true
    }
    var cm = CodeMirror.fromTextArea($this, options);

    $('#answer').submit(function(e){
      cm.save();
    });
  }

  return { initialize: initialize };

});
