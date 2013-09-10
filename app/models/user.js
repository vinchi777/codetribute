var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = Schema({
	username: String,
	password: String,
	createdAt: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema)
