var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Post = mongoose.model('Post')

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/index');
}
exports.dashboard = function(req, res) {
  Post.find().populate('user', 'username').exec(function (err, posts) {
    if(err){ req.flash('error', err);}	
    res.render('users/dashboard', { user: req.user, posts: posts, message: req.flash('info') });
  })
}

exports.listPosts = function(req, res) {
  Post.find().populate('user', 'username').exec(function (err, posts) {
    if(err){ req.flash('error', err);}	
    res.send('200', posts);
  })
}

exports.getUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    console.log(user);
    res.send('200', user);
  });
}

