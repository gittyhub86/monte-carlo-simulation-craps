function crapsSim(scope, roundsPerTrial, numTrials, betAmt, betFour,
	betFive, betSix, betEight, betNine, betTen, passLine) {
	const resArr = [];
	let passWin = 0;
	let passLoss = 0;
	let dontPassWin = 0;
	let dontPassLoss = 0;
	let counter = 1;
	let trialCounter = 1;
	let trialResults = [];
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
				scope.ctrl.simLog += `<h4>Trial ${i.toLocaleString()}, Round `+
												 `${j.toLocaleString()}</h4>`;
				craps.comeOut();
				craps.pointRound();
				scope.ctrl.simLog += `${craps.log}<br />`;
				console.log(craps.log);
				craps.log = '';
			}
			trialResults.push(craps.tot);
			if (passLine) {
				passWin += craps.passWin;
				passLoss += craps.passLoss;
			} else {
				dontPassWin += craps.dontPassWin;
				dontPassLoss += craps.dontPassLoss;
			}
			if (passLine) {
				console.log(`passWin: ${craps.passWin}, passLoss: ${craps.passLoss}`);
			} else {
				console.log(`dontPassWin: ${craps.dontPassWin}, dontPassLoss: ${craps.dontPassLoss}`);
			}
			resetCrapsProps(craps);
		}
		if (passLine) {
			scope.ctrl.resLog += `<p>Total pass bet wins: ` +
								`${passWin.toLocaleString()}</p>
								<p>Total pass bet losses: ` +
								`${passLoss.toLocaleString()}</p>`;
			console.log(`Totals: passWin: ${passWin}, passLoss: ${passLoss}`);
		} else {
			scope.ctrl.resLog += `<p>Total don't pass bet wins: ` +
								`${dontPassWin.toLocaleString()}</p>
								<p>Total don't pass bet losses: ` +
								`${dontPassLoss.toLocaleString()}</p>`;
			console.log(`Totals: dontPassWin: ${dontPassWin}, dontPassLoss: ${dontPassLoss}`);
		}
		console.log('Results from each trial: ', trialResults);
		console.log('scope.ctrl.reslog: ', scope.ctrl.resLog);
		console.log('showMoreTrialResults: ', scope.ctrl.showMoreTrialResults);
	} catch(e) {
		scope.ctrl.simLog = '';
		console.log(e);
		scope.ctrl.errArr.push("Error: Please try running less rounds and/or less number of trials");
	}
}

function resetCrapsProps(craps) {
	craps.log = '';
	craps.tot = 0;
	craps.passWin = 0;
	craps.passLoss = 0;
	craps.dontPassLoss = 0;
	craps.dontPassWin = 0;
	craps.diceTot = null;
	craps.point = null;
}