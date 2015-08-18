angular.module('app').factory('mvIdentity', function($window, mvUser) {
  var currentUser;
  if (!!$window.boostrappedUserObject) {
    currentUser = new mvUser();
    angular.extend(currentUser, $window.boostrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
    }
  };
})
