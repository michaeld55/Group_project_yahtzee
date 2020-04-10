const Scorecard = function(card, dice){
    this.card = card,
    this.dice = dice
}

Scorecard.prototype.diceValues = function(){
    result = []
    result = this.dice.map(function(die){
        return die.value;
    })
    return result;
}

Scorecard.prototype.addDice = function(dice){
    result = dice.reduce((total, die) => {
        return total += die.value;
    }, 0);
    return result;
}

Scorecard.prototype.getDiceWith = function(value){
    result = this.dice.filter(die => die.value === value);
    return result;
}

Scorecard.prototype.checkVaildUpper = function(){
    values = Object.values(this.card.upper.scores);
    accepted = []
    accepted = values.reduce(function(filtered, section){
        if(section.currentScore === null){
            filtered.push(section.accepts);
        }
        return filtered;
    }, []);
    result = accepted;
    return result;

}

Scorecard.prototype.scoreUpper = function(){
    let number = 1
    for (let section in this.card.upper.scores) {
        dice = scorecard.getDiceWith(number);
        if ((dice.length > 0) && (this.card.upper.scores[section].currentScore === null)){
            sumDice= scorecard.addDice(dice);
            this.card.upper.scores[section].potentialScore = sumDice
            this.card.upper.validDice = true
        }else if((scorecard.checkVaildUpper().length === 0) && (this.card.validDice  === false)){
            this.card.upper.scores[section].potentialScore = 0
        }
        number ++;
    }
    return this.card.upper

}

module.exports = Scorecard