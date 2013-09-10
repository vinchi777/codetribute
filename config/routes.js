var flash = require('connect-flash');
module.exports = function(app, passport){

var users = require('../app/controllers/users');
app.get('/login', users.login)
app.get('/logout', users.logout)
app.get('/register', users.register)
app.get('/dashboard', requireLogin(), users.dashboard)
app.post('/register', users.create)
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/dashboard');
  });

var posts = require('../app/controllers/posts');
app.post('/post', posts.create);
app.get('/post/:id', posts.show);
app.post('/post/:id', requireLogin(), posts.update);

var pages = require('../app/controllers/pages');
app.get('/', pages.index)
app.get('/index', pages.index);
};


function requireLogin(){
	return function(req, res, next){
		if (!req.isAuthenticated()) {
			req.flash('error', 'You need to be loged in.')
			return res.redirect('/login')
		}
		next();
	}
}
