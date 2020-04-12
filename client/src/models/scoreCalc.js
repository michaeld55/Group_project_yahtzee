const ScoreClac = function(scorecard, dice){
    this.scorecard = scorecard,
    this.dice = dice
}

ScoreClac.prototype.diceValues = function(){
    result = []
    result = this.dice.map(function(die){
        return die.diceValue;
    })
    return result;
}

ScoreClac.prototype.addDice = function(dice){
    result = dice.reduce((total, die) => {
        return total += die.diceValue;
    }, 0);
    return result;
}

ScoreClac.prototype.getDiceWith = function(value){
    result = this.dice.filter(die => die.diceValue === value);
    return result;
}

ScoreClac.prototype.getUnscoredUpperBoxes = function() {
    allUpperRows = Object.values(this.scorecard.upper.scores);
    unscoredBoxes = []
    unscoredBoxes = allUpperRows.filter( (row) => { row.currentScore === null } )
    return unscoredBoxes; // Array of unscored boxes in upper
}


ScoreClac.prototype.sumSubTotal = function(){
    let total = 0;
    let subSum = []
    subSum.push(this.scorecard.upper.scores)
    for (let section in this.scorecard.upper.scores) {
        if(this.scorecard.upper.scores[section].currentScore != null){
            total = this.scorecard.upper.scores[section].currentScore
        }
    }
    this.scorecard.upper.subTotal = total
    return this.scorecard.upper.subTotal
}

ScoreClac.prototype.allowZero = function(){
    if(!this.scorecard.upper.validDicePlacement && !this.scorecard.upper.validDicePlacement){
        this.allowZero = true
    }
}

ScoreClac.prototype.scoreUpper = function(){
    let number = 1
    for (let section in this.scorecard.upper.scores) {
        dice = this.getDiceWith(number);
        if ((dice.length > 0) && (this.scorecard.upper.scores[section].currentScore === null)){
            sumDice= this.addDice(dice);
            this.scorecard.upper.scores[section].potentialScore = sumDice
            this.scorecard.upper.validDicePlacement = true
        }else if(this.scorecard.lower.allowZeroScores){
            this.scorecard.upper.scores[section].potentialScore = 0
        }
        number ++;
    }
    this.sumSubTotal()
    if(this.sumSubTotal >= 63){
        this.scorecard.upper.upperBonus = 35;
    }

    return this.scorecard.upper

}

// score lower

// score of a kind

// score straights

// score yatzee

//score chance

// score full card

module.exports = ScoreClac