var LocalStrategy = require('passport-local').Strategy
var GitHubStrategy = require('passport-github').Strategy
var mongoose = require('mongoose');
var User = mongoose.model('User');
var GITHUB_CLIENT_ID = 'fb82935ccc1acde5bc59';
var GITHUB_CLIENT_SECRET = '5a165a75ee88213c11d986826a7756bcc6d7b323';

module.exports = function(passport){

	//Persist login session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	//Use manual login/register
	passport.use(new LocalStrategy(
		function(username, password, done){
		User.findOne({username: username, password: password}, function (err, user){
			if (err) { return done(err, {message: err}) };
			if (!user) { return done(null, false, {message: "Invalid email or password."} ) };
			return done(null, user);
		});					
	}
	));

	passport.use(new GitHubStrategy({
		clientID: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
		callbackURL: "http://127.0.0.1:3000/auth/github/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ githubId: profile.id }, function (err, user) {
			var _user = user;
			if(!_user){
				_user = new User();
			}else { console.log(err); }
			_user.username = profile.username;
			_user.githubId = profile.id;
			_user.save(function(err){
				return done(err, _user);
			});
		});
	}
   ));
}
