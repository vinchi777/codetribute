var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var postSchema = Schema({
	title: String,
	body: String,
	comments: [{
		body: { type: String, default: ''},
		user: { type: Schema.ObjectId, ref: 'User'},
		votes: { type: Number, default: 0 },
		createdAt: { type: Date, default: Date.now }
	}],
	createdAt: { type: Date, default: Date.now },
	user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Post', postSchema);
