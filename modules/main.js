angular.module('main', ['ngRoute', 'core'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/monte_carlo.html',
			controller: 'simCtrl',
			controllerAs:  'ctrl'
		});
	}]);