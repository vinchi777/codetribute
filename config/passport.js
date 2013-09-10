var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	passport.use(new LocalStrategy(
				function(username, password, done){
					User.findOne({username: username, password: password}, function (err, user){
						if (err) { return done(err, {message: err}) };
						if (!user) { return done(null, false, {message: "Invalid email or password."} ) };
						return done(null, user);
					});					
				}
			));
}
