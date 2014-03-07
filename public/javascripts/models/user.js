define([
  'jquery',
  'views/application',
], function ($, AppView) {
  var UserModel = Backbone.Model.extend({
   idAttribute: '_id',
   url: function () {
	var location = 'http://localhost:3000/user';
	return this.id ? (location + '/' + this.id) : location;
   }
  });

  return UserModel;
});
