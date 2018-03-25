angular.module('core', [])
	.controller('simCtrl', SimCtrl)
	.directive('runSim', [runSim])
	.filter('trusted', ['$sce', trusted])