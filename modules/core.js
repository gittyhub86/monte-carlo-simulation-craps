angular.module('core', [])
	.controller('simCtrl', SimCtrl)
	.directive('runSim', ['$q', '$timeout', runSim])
	.directive('appendResult', ['$q', '$timeout', '$compile', appendResult])
	.filter('trusted', ['$sce', trusted])