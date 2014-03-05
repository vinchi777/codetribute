define(['jquery', 'codemirror', 'validate', 'javascript'], function ($, CodeMirror) {

  var initialize = function () {
    var options1 = {
      mode: 'javascript',
      lineNumbers: true,
      readOnly: true
    }

    var options2 = {
      theme: 'solarized',
      mode: 'javascript',
      lineNumbers: true,
    }

    $('#ref_count').prepend($('.answer').length);

    $('.code').each(function(){
      var $this = $(this);
      var code = $this.html();
      options1.value = code;
      CodeMirror(function(elt){
        $this.replaceWith(elt);
      }, options1)
    });

    var $this = $('#answer_txtarea').get(0);
    var cm = CodeMirror.fromTextArea($this, options2);

    $('#answer').submit(function(e){
      cm.save();
    });
  }

  return { initialize: initialize }

});
