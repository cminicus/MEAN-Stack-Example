angular.module('app').controller('mvMainCtrl', function($scope) {
	$scope.courses = [
		{name: 'C# for Sociopaths', featured: true, published: new Date('11/1/2014')},
		{name: 'C# for Sociopaths2', featured: false, published: new Date('1/5/2014')},
		{name: 'C# for Sociopaths3', featured: true, published: new Date('12/1/2014')},
		{name: 'C# for Sociopaths4', featured: false, published: new Date('5/1/2014')},
		{name: 'C# for Sociopaths5', featured: true, published: new Date('1/1/2014')},
		{name: 'C# for Sociopaths6', featured: false, published: new Date('1/17/2014')},
		{name: 'C# for Sociopaths7', featured: true, published: new Date('6/15/2014')},
		{name: 'C# for Sociopaths8', featured: false, published: new Date('2/4/2014')},
		{name: 'C# for Sociopaths9', featured: true, published: new Date('3/5/2014')}
	]
});