var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Post = mongoose.model('Post')

exports.login = function(req, res) {
 res.render('users/login', { message: req.flash('error') });
}
exports.dashboard = function(req, res) {
	Post.find().populate('user', 'username').exec(function (err, posts) {
		if(err){ req.flash('error', err);}	
		res.render('users/dashboard', { user: req.user, posts: posts, message: req.flash('info') });
	})
}
exports.register = function(req, res) {
	res.render('users/register');
}
exports.create = function(req, res) {
	var user = new User({username: req.body.username, password: req.body.password})
		user.save(function(err, user){
			if (err) { return console.log(err) }	
			res.redirect('/login');
		});
}
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/index');
}
