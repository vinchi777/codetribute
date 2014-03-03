var mongoose = require('mongoose')
  , Post = mongoose.model('Post')

exports.index = function (req, res){
  Post.find()
	  .populate('user', 'username')
	  .exec(function (err, posts) {
		if(err){ req.flash('error', err);}
		res.render('pages/index', { posts: posts, message: req.flash('error') });
	  })
}
