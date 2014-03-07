define([
	'underscore',
	'backbone',
	'codemirror',
	'jquery',
	'javascript',
	'text!/../templates/post.html',
	'text!/../templates/show_post.html',
	'models/post',
	'moment'
], function (_, Backbone, CodeMirror, $, js, postTemplate, windowPostTemplate,PostModel, Moment) {
   var PostView = Backbone.View.extend({
     events: {
      'submit #answer' : 'answer'
     },
     initialize: function (args) {
       var _this = this;
       this.$main_window = $('#main_window')
       this.$answer = $("#answer_txtarea");

       if (args.tl == "windowpost") {
	 this.template =  _.template(windowPostTemplate);
       }
       else {
	 this.template =  _.template(postTemplate);
       }
       this.model.on('change', this.render(), this)
     },
     answer: function (e) {
       var _this = this;
       e.preventDefault();
       $.post('/post/'+ this.model.get('_id'), $("#answer").serialize() , function(data){
	 $("#answers_container").append("<pre class='code'>"+data.body+"</pre>");
	 var comments = _this.model.get('comments');
	 comments.push(data)
	 _this.model.set({'comments': comments})
       });
     },
     render: function () {
       console.log('aw')
       this.model.attributes.createdAt = Moment(this.model.attributes.createdAt).fromNow();
       this.$el.html(this.template(this.model.toJSON()));
       return this;
     }
   });

   return PostView;
});
