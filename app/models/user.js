var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = Schema({
	username: String,
	password: String,
	githubId: String,
	avatar_url:  String,
	createdAt: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema)
