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
		this.placePayout = {
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
			this.diceRes[0] = this.getRandom();
			this.diceRes[1] = this.getRandom();
			this.diceTot = this.diceRes[0] + this.diceRes[1];
			this.log += `Player rolled ${this.diceRes[0]}, ${this.diceRes[1]}<br />`;
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
	getRandom() {
		return Math.floor(Math.random() * 6 + 1);
	}
	printBalance() {

	}
}

const c = new Craps(5, 4, 4, 6, 6, 9, 10, true);
c.comeout();
console.log(`${c.log},   ${c.tot}`);