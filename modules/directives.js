function runSim() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl) {
			console.log(`roundsPerTrial: ${scope.ctrl.roundsPerTrial}`);
			console.log(`betAmt: ${scope.ctrl.betAmt}`);
		}
	}
}