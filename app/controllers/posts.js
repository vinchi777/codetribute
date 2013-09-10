var mongoose = require('mongoose')
  , Post = mongoose.model('Post')
  , _ = require('underscore')

exports.create = function(req, res){
  var path = req.user ? '/dashboard' : '/index'
  var post = new Post({ title: req.body.title, body: req.body.body, user: req.user })
  post.save(function(err, post){
	req.flash('info', 'Post created')
	res.redirect(path)
  })
}

exports.show = function(req, res){
 Post.findOne({ _id: req.params.id })
	 .populate('user', 'username')
	 .populate('comments.user')
	 .exec(function(err, post){
		if (err){ console.log(err) }
		res.render('posts/show', { post: post })
	 });
}
exports.update = function(req, res){
 var comment = {
	body: req.body.body,
	user: req.user._id
 }
 Post.update({ _id: req.params.id }, {$push: { comments: comment} }, function(err, post){
	 if(err) { console.log(err); }
	 res.redirect('/post/'+req.params.id)
 });
}

