var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(request, response) {
  User.find({}).exec(function(error, collection) {
    response.send(collection);
  });
};

exports.createUser = function(request, response, next) {
  var userData = request.body;
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, function(error, user) {
    if (error) {
      if (error.toString().indexOf('E11000') > -1) {
        error = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:error.toString()})
    }
    request.logIn(user, function(error) {
      if (error) {
        return next(error);
      }
      response.send(user);
    });
  });
}
