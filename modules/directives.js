function runSim($q, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.on('click', () => {
				function busy() {
					const deferred = $q.defer();
					scope.ctrl.isLoading = true;
					console.log('isLoading: ', scope.ctrl.isLoading)
					scope.ctrl.disableButton = true;
					$timeout(() => {
						deferred.resolve();
					}, 100);
					return deferred.promise;
				}
				scope.$apply(() => {
					busy().then(() => {
						crapsSim(scope, scope.ctrl.roundsPerTrial, scope.ctrl.numTrials, scope.ctrl.betAmt,
								scope.ctrl.betFour, scope.ctrl.betFive, scope.ctrl.betSix,
								scope.ctrl.betEight, scope.ctrl.betNine, scope.ctrl.betTen, scope.ctrl.passLine);
						scope.$broadcast('start-sim');
					});
				});
			});
		}
	}
}

function appendResult($q, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			function displayResult() {
				const deferred = $q.defer();
				$timeout(() => {
					deferred.resolve();
				}, 100);
				return deferred.promise;
			}
			scope.$on('start-sim', () => {
				displayResult().then(() => {
					scope.ctrl.isLoading = false;
					scope.ctrl.disableButton = false;
				});
			});
		}
	}
}