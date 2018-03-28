function runSim($q, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.on('click', () => {
				function busy() {
					const deferred = $q.defer();
					scope.ctrl.isLoading = true;
					scope.ctrl.disableButton = true;
					$timeout(() => {
						deferred.resolve();
					}, 100);
					return deferred.promise;
				}
				scope.$apply(() => {
					busy().then(() => {
						crapsSim(scope, scope.ctrl.roundsPerTrial, scope.ctrl.numTrials,
								scope.ctrl.betAmt, scope.ctrl.betFour, scope.ctrl.betFive,
								scope.ctrl.betSix, scope.ctrl.betEight, scope.ctrl.betNine,
								scope.ctrl.betTen, scope.ctrl.passLine);
						scope.$broadcast('start-sim');
					});
				});
			});
		}
	}
}

function appendResult($q, $timeout, $compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			function displayResult() {
				const deferred = $q.defer();
				if (scope.ctrl.trialResults.length) {
					const trialResBatch = scope.ctrl.trialResults.splice(0, 20);
					const trialResEl = appendTrialRes(trialResBatch, scope);
					element.append(trialResEl);
					if (scope.ctrl.trialResults.length) {
						createShowMore(scope, element, $compile, "show-more-trial",
										"show-more show-more-trial");
					}
				}
				if (scope.ctrl.showMoreLogs.length) {
					const log = scope.ctrl.showMoreLogs.shift();
					const div = angular.element('<div>');
					div.append(log);
					element.append(div);
					if (scope.ctrl.showMoreLogs.length) {
						createShowMore(scope, element, $compile, "show-more", "show-more");
					}
				}
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

function showMoreTrial($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.on('click', () => {
				loading(attr="[show-more-trial");
				const trialResBatch = scope.ctrl.trialResults.splice(0, 20);
				const trialResEl = appendTrialRes(trialResBatch, scope);
				const sibling = $('.row');
				element.remove();
				sibling.append(trialResEl);
				if (scope.ctrl.trialResults.length) {
					createShowMore(scope, sibling, $compile, "show-more-trial",
									"show-more show-more-trial");
				}
			});
		}
	}
}

function showMore($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			element.on('click', () => {
				loading(attr="[show-more]");
				const log = scope.ctrl.showMoreLogs.shift();
				const div = angular.element('<div>');
				div.append(log);
				const parent = element.parent();
				element.remove();
				parent.append(div);
				if (scope.ctrl.showMoreLogs.length) {
					createShowMore(scope, parent, $compile, "show-more", "show-more");
				}
			});
		}
	}
}