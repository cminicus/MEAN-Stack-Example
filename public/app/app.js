angular.module('app', ['ngResource', 'ngRoute'])

.config(function($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin: {
			auth: function(mvIdentity, $q) {
				return authorizeCurrentUserForRoute('admin');
			}
		}
	}

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl'
		})
		.when('/admin/users', {
			templateUrl: '/partials/admin/user-list',
			controller: 'mvUserListCtrl',
			resolve: routeRoleChecks.admin
		})
		.when('/signup', {
			templateUrl: '/partials/account/signup',
			controller: 'mvSignupCtrl'
		});
})

.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});
