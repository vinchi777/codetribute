var flash = require('connect-flash');
module.exports = function(app, passport){

var users = require('../app/controllers/users');
app.get('/logout', users.logout);
app.get('/dashboard', requireLogin(), users.dashboard);
app.get('/posts', users.listPosts);
app.get('/user/:id', users.getUser);

var posts = require('../app/controllers/posts');
app.post('/post', posts.create);
app.get('/post/:id', posts.show);
app.get('/post', posts.index);
app.post('/post/:id', requireLogin(), posts.update);

var pages = require('../app/controllers/pages');
app.get('/', pages.index)
app.get('/index', pages.index);

//OAuth Github
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
		passport.authenticate('github', { failureRedirect: '/', failureFlash: true }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/dashboard');
		}
);

};



function requireLogin(){
	return function(req, res, next){
		if (!req.isAuthenticated()) {
			req.flash('error', 'You need to be loged in.')
			return res.redirect('/')
		}
		next();
	}
}
