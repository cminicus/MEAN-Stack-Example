angular.module('app').factory('mvIdentity', function($window) {
  var currentUser;
  if (!!$window.boostrappedUserObject) {
    currentUser = $window.boostrappedUserObject;
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  };
})
