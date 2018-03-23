class Craps {
	constructor(betAmt, betFour, betFive, betSix, betEight,
		betNine, betTen, pass) {
		this.betAmt = betAmt;
		this.tot = 0;
		this.betFour = betFour;
		this.betFive = betFive;
		this.betSix = betSix;
		this.betEight = betEight;
		this.betNine = betNine;
		this.betTen = betTen;
		this.pass = pass;
		this.passWin = 0;
		this.passLoss = 0;
		this.dontPassLoss = 0;
		this.dontPassWin = 0;
		this.diceRes = new Array();
		this.diceTot = null;
		this.point = null;
		this.totPlaceBet = betFour+betFive+betSix+betEight+betNine+betTen;
		this.placeBetPay = {
			4: 9/5,
			10: 9/5,
			5: 7/5,
			9: 7/5,
			6: 7/6,
			8: 7/6,
		};
		this.log = '';
	}
	comeOut() {
		if (this.point) {
			return;
		}
		while (!this.point) {
			this.rollDice();
			if (this.pass) {
				if ((this.diceTot === 7) || (this.diceTot === 11)) {
					this.log += 'Rolled a 7 or 11. Win pass bet<br />';
					this.tot += this.betAmt;
					this.printBalance();
					this.passWin++;
					this.point = null;
				} else if ((this.diceTot === 2) || (this.diceTot === 3) ||
					(this.diceTot === 12)) {
					this.log += 'Rolled a 2, 3 or 12. Lose pass bet<br />';
					this.tot -= this.betAmt;
					this.printBalance();
					this.passLoss++;
					this.point = null;
				} else {
					this.point = this.diceTot;
				}
			} else {
				if ((this.diceTot === 7) || (this.diceTot === 11)) {
					this.log += "Rolled a 7 or 11. Lose don't pass bet<br />";
					this.tot -= this.betAmt;
					this.printBalance();
					this.dontPassLoss++;
					this.point = null;
				} else if ((this.diceTot === 2) || (this.diceTot === 3)) {
					this.log += "Rolled a 2 or 3. Win don't pass bet<br />";
					this.tot += this.betAmt;
					this.printBalance();
					this.dontPassWin++;
					this.point = null;
				} else if (this.diceTot !== 12) {
					this.point = this.diceTot;
				}
			}
			if (this.point) {
				this.log += `Point is: ${this.point}<br />`;
			}
		}
	}
	pointRound() {
		if (!this.point) {
			return;
		}
		while (this.point) {
			this.rollDice();
			this.payPlaceBet();
			if ((this.point === this.diceTot) && (!this.pass)) {
				this.log += "Rolled point before 7. Lost don't pass bet<br />";
				this.tot -= this.betAmt;
				this.printBalance();
				this.dontPassLoss++;
				this.point = null;
			}
			else if ((this.point === this.diceTot) && (this.pass)) {
				this.log += "Rolled point before 7. Won pass bet<br />";
				this.tot += this.betAmt;
				this.printBalance();
				this.passWin++;
				this.point = null;
			} else if (this.diceTot === 7) {
				if (this.pass) {
					this.log += "Rolled 7 before point. Lost pass & any place bets<br />";
					this.passLoss++;
					this.tot -= (this.betAmt + this.totPlaceBet);
					this.printBalance();
					this.point = null;
				} else {
					this.log += "Rolled 7 before point. Won don't pass bet, but lost any place bets<br />";
					this.dontPassWin++;
					this.tot += (this.betAmt - this.totPlaceBet);
					this.printBalance();
					this.point = null;
				}
			}
		}
	}
	rollDice() {
		this.diceRes[0] = this.getRandom();
		this.diceRes[1] = this.getRandom();
		this.diceTot = this.diceRes[0] + this.diceRes[1];
		this.log += `Player rolled ${this.diceRes[0]}, ${this.diceRes[1]}<br />`;
	}
	payPlaceBet() {
		if ((this.diceTot === 4) && (this.betFour)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betFour;
			this.log += 'Rolled 4. Pay place bet<br />';
			this.printBalance();
		} else if ((this.diceTot === 5) && (this.betFive)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betFive;
			this.log += 'Rolled 5. Pay place bet<br />';
			this.printBalance();
		} else if ((this.diceTot === 6) && (this.betSix)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betSix;
			this.log += 'Rolled 6. Pay place bet<br />';
			this.printBalance();
		} else if ((this.diceTot === 8) && (this.betEight)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betEight;
			this.log += 'Rolled 8. Pay place bet<br />';
			this.printBalance();
		} else if ((this.diceTot === 9) && (this.betNine)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betNine;
			this.log += 'Rolled 9; pay place bet<br />';
			this.printBalance();
		} else if ((this.diceTot === 10) && (this.betTen)) {
			this.tot += this.placeBetPay[this.diceTot] * this.betTen;
			this.log += 'Rolled 10; pay place bet<br />';
			this.printBalance();
		}
	}
	getRandom() {
		return Math.floor(Math.random() * 6 + 1);
	}
	printBalance() {

	}
}

const c = new Craps(5, 5, 5, 6, 6, 5, 5, true);
c.comeOut();
console.log(`${c.log},   ${c.tot}`);
console.log('point round\n\n')
c.pointRound();
console.log(`${c.log},   ${c.tot}`);