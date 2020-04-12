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

ScoreClac.prototype.checkValidUpper = function(){
    values = Object.values(this.scorecard.upper.scores);
    accepted = []
    accepted = values.reduce(function(filtered, section){
        if(section.currentScore === null){
            filtered.push(section.accepts);
        }
        return filtered;
    }, []);
    test = accepted;
      
    // Loop for array1 
    for(let i = 0; i < test.length; i++) { 
        // Loop for array2 
        for(let j = 0; j < this.dice.length; j++) { 
                  
        // Compare the element of each and 
        // every element from both of the 
        // arrays 
            if(test[i] === this.dice[j]) { 
                  
        // Return if common element found 
                return console.log(true); 
            } 
        } 
     
          
        // Return if no common element exist 
        return console.log(false);  
    } 
      
    // document.write(findCommonElement(array1, array2)) 
    this.dice.includes(test)
    console.log(this.dice.every(test))
    result =accepted
    return result;

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