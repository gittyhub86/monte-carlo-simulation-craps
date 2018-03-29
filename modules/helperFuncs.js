function crapsSim(scope, roundsPerTrial, numTrials, betAmt, betFour,
					betFive, betSix, betEight, betNine, betTen, passLine) {
	function resetProps(craps) {
		craps.log = '';
		craps.tot = 0;
		craps.passWin = 0;
		craps.passLoss = 0;
		craps.dontPassLoss = 0;
		craps.dontPassWin = 0;
		craps.diceTot = null;
		craps.point = null;
	}
	let logging = '';
	let passWin = 0;
	let passLoss = 0;
	let dontPassWin = 0;
	let dontPassLoss = 0;
	let counter = 1;
	let trialCounter = 1;
	let craps;
	const showMoreLogs = [];
	const trialResults = [];
	if (passLine) {
		craps = new Craps(betAmt, betFour, betFive,
						betSix, betEight, betNine, betTen, true);
	} else {
		craps = new Craps(betAmt, betFour, betFive,
						betSix, betEight, betNine, betTen, false);;
	}
	try {
		for (let i=1; i<numTrials+1; i++, trialCounter++) {
			for (let j=1; j<roundsPerTrial+1; j++, counter++) {
				logging += `<h4>Trial ${i.toLocaleString()}, Round `+
												 `${j.toLocaleString()}</h4>`;
				craps.comeOut();
				craps.pointRound();
				logging += `${craps.log}<br />`;
				craps.log = '';
				if (counter%5 === 0) {
					showMoreLogs.push(logging);
					logging = '';
				}
			}
			trialResults.push(craps.tot);
			if (passLine) {
				passWin += craps.passWin;
				passLoss += craps.passLoss;
			} else {
				dontPassWin += craps.dontPassWin;
				dontPassLoss += craps.dontPassLoss;
			}
			resetProps(craps);
		}
		if (logging) {
			showMoreLogs.push(logging)
			logging = '';
					}
		if (passLine) {
			scope.ctrl.resLog += `<p>Total pass bet wins: ` +
								`${passWin.toLocaleString()}</p>
								<p>Total pass bet losses: ` +
								`${passLoss.toLocaleString()}</p>`;
		} else {
			scope.ctrl.resLog += `<p>Total don't pass bet wins: ` +
								`${dontPassWin.toLocaleString()}</p>
								<p>Total don't pass bet losses: ` +
								`${dontPassLoss.toLocaleString()}</p>`;
		}
	} catch(e) {
		scope.ctrl.errArr.push("Error: Please try running less rounds and/or less number of trials");
	}
	return [trialResults, showMoreLogs];
}

function appendTrialRes(val, scope) {
	const div = angular.element('<div>');
	if (Array.isArray(val)) {
		div.addClass("row");
		let spanStr = '';
		val.forEach((elem, idx) => {
			if (elem >=0) {
				elem = `$${roundNum(elem)}`;
			} else {
				elem = `-$${roundNum(Math.abs(elem))}`;
			}
			spanStr += `<span class="trial">Trial ${scope.ctrl.trialResultCounter++}: ${elem}</span>`;
		});
		div.html(spanStr);
	}
	return div;
}

function roundNum(val) {
	return Number(Math.round(val+'e2') +'e-2').toLocaleString();
}

function createShowMore(scope, element, $compile, attr, className) {
	const showMore = angular.element('<div>');
	showMore.attr(attr, '');
	showMore.addClass(className);
	showMore.html('<span>Show More</span>');
	element.append(showMore[0]);
	$compile(showMore)(scope);
	return;
}

function loading(attr) {
	const showMoreEl = $(attr);
	showMoreEl.text('Loading...');
	return;
}

function reset(scope) {
	$("[append-result]").children().remove();
	scope.ctrl.trialResults = [];
	scope.ctrl.showMoreLogs = [];
	scope.ctrl.resLog = '';
	scope.ctrl.errArr = [];
	scope.ctrl.trialResultCounter = 1;
	return;
}

function validateUserInput(scope) {
	if (scope.ctrl.roundsPerTrial * scope.ctrl.numTrials > 900000) {
		scope.ctrl.errArr.push("Error: Please try running less rounds and/or less number of trials");
	}
	if ((isNaN(scope.ctrl.roundsPerTrial)) && (isNaN(scope.ctrl.numTrials))) {
		scope.ctrl.errArr.push("Please enter a number for Rounds per trial/Number of trials");
	}
	if ((isNaN(scope.ctrl.roundsPerTrial)) || (scope.ctrl.roundsPerTrial === null)) {
		scope.ctrl.errArr.push("Rounds per trial must be a number greater than 1");
	}
	if ((isNaN(scope.ctrl.numTrials)) || (scope.ctrl.numTrials === null)) {
		scope.ctrl.errArr.push("Number of trials must be a number greater than 1");
	}
	if ((scope.ctrl.betAmt <= 0) || (isNaN(scope.ctrl.betAmt)) || (scope.ctrl.betAmt === null)) {
		scope.ctrl.errArr.push("Pass/Don't pass bet amount must be a number greater than 0");
	}
	if ((scope.ctrl.passLine !== true) && (scope.ctrl.passLine !== false)) {
		scope.ctrl.errArr.push("Pass bet must be checked or unchecked");
	}
	if ((isNaN(scope.ctrl.betFour)) || (scope.ctrl.betFour === null)) {
		scope.ctrl.errArr.push("Place bet 4 must be a number");
	}
	if ((isNaN(scope.ctrl.betFive)) || (scope.ctrl.betFive === null)) {
		scope.ctrl.errArr.push("Place bet 5 must be a number");
	}
	if ((isNaN(scope.ctrl.betSix)) || (scope.ctrl.betSix === null)) {
		scope.ctrl.errArr.push("Place bet 6 must be a number");
	}
	if ((isNaN(scope.ctrl.betEight)) || (scope.ctrl.betEight === null)) {
		scope.ctrl.errArr.push("Place bet 8 must be a number");
	}
	if ((isNaN(scope.ctrl.betNine)) || (scope.ctrl.betNine === null)) {
		scope.ctrl.errArr.push("Place bet 9 must be a number");
	}
	if ((isNaN(scope.ctrl.betTen)) || (scope.ctrl.betTen === null)) {
		scope.ctrl.errArr.push("Place bet 10 must be a number");
	}
	if (scope.ctrl.errArr.length > 0) {
		return false;
	} else {
		return true;
	}
}