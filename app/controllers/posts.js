var mongoose = require('mongoose')
  , Post = mongoose.model('Post')
  , _ = require('underscore')

exports.create = function(req, res){
  var path = req.user ? '/dashboard' : '/index'
  var post = new Post({ title: req.body.title, body: req.body.body, user: req.user })
  post.save(function(err, post){
    Post.findOne(post).populate('user', 'username').exec(function (err, userpost){
	req.flash('info', 'Post created')
	res.send('200', userpost);
    })
  })
}

exports.show = function(req, res){
 Post.findOne({ _id: req.params.id })
	 .populate('user', 'username')
	 .populate('comments.user')
	 .exec(function(err, post){
		if (err){ console.log(err) }
		res.send('200', post)
	 });
}
exports.update = function(req, res){
 var comment = {
	body: req.body.body,
	user: req.user._id
 }
 Post.update({ _id: req.params.id }, {$push: { comments: comment} }, function(err, post){
   if(err) { console.log(err); }
   res.send('200', {_id: req.user._id, body: req.body.body, createdAt: new Date});
 });
}

exports.index = function (req, res) {
  Post.find({}, function (err, posts){
	  res.send('200', {});
  });
}

