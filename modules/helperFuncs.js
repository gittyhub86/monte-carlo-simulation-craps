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
					scope.ctrl.showMoreLogs.push(logging);
					logging = '';
				}
			}
			scope.ctrl.trialResults.push(craps.tot);
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
			scope.ctrl.showMoreLogs.push(logging)
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
		console.log(e);
		scope.ctrl.errArr.push("Error: Please try running less rounds and/or less number of trials");
	}
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
	element.append(showMore);
	$compile(showMore)(scope);
	return;
}

function loading(attr) {
	const showMoreEl = $(attr);
	showMoreEl.text('Loading...');
	return;
}