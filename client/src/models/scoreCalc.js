const ScoreCalc = function(scorecard, dice){
    this.scorecard = scorecard,
    this.dice = dice
}

ScoreCalc.prototype.diceValues = function(){
    result = [];
    result = this.dice.map( die => die.diceValue )
    return result;
}

ScoreCalc.prototype.getUniqueFaceValues = function(){
    const result = [...new Set(this.dice.map(dice => dice.diceValue))];
    return result.sort();
};

ScoreCalc.prototype.addDice = function(dice){
    result = dice.reduce((total, die) => {
        return total += die.diceValue;
    }, 0);
    return result;
}

ScoreCalc.prototype.getDiceWith = function(value){
    result = this.dice.filter( die => die.diceValue === value );
    return result;
}

ScoreCalc.prototype.sumSubTotal = function(){
    let total = 0;
    let subSum = []
    subSum.push(this.scorecard.upper.scores)
    for (let row in this.scorecard.upper.scores) {
        if(this.scorecard.upper.scores[row].currentScore != null){
            total = this.scorecard.upper.scores[row].currentScore
        }
    }
    this.scorecard.upper.subTotal = total
    return this.scorecard.upper.subTotal
}

ScoreCalc.prototype.allowZero = function(){
    if(this.scorecard.upper.validDicePlacement && this.scorecard.lower.validDicePlacement){
        this.allowZero = false
    }
}

ScoreCalc.prototype.scoreUpper = function(){
    let diceFaceValue = 1;

    for ( let row in this.scorecard.upper.scores ) {
        diceWithFaceValue = this.getDiceWith(diceFaceValue);

        if ( ( diceWithFaceValue.length > 0 ) && ( this.scorecard.upper.scores[row].currentScore === null ) )
        {
            sumDice = this.addDice(diceWithFaceValue);
            this.scorecard.upper.scores[row].potentialScore = sumDice
            this.scorecard.upper.validDicePlacement = true
        }
        else if ( ( this.scorecard.allowZeroScores ) && ( this.scorecard.upper.scores[row].currentScore === null ) )
        {
            this.scorecard.upper.scores[row].potentialScore = 0
        }

        diceFaceValue ++;
    }

    this.sumSubTotal()
    if( this.sumSubTotal >= 63 )
    {
        this.scorecard.upper.upperBonus = 35;
    }

    return this.scorecard.upper

}

// score of a kind
ScoreCalc.prototype.threeOfAKind = function(){
    let diceFaceValue = 1;
    while (diceFaceValue <= 6)
    {   
        diceWithFaceValue = this.getDiceWith(diceFaceValue);
        if ( ( diceWithFaceValue.length >= 3 ) && ( this.scorecard.lower.scores.threeOfAKind.currentScore === null ) )
        {
            sumDice = this.addDice(this.dice);
            this.scorecard.lower.scores.threeOfAKind.potentialScore  = sumDice
            this.scorecard.lower.validDicePlacement = true
        }
        else if ( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.threeOfAKind.currentScore  === null ) )
        {
            this.scorecard.lower.scores[row].potentialScore = 0
        }

        diceFaceValue ++;
    }
    return this.scorecard.lower.scores.threeOfAKind
}

ScoreCalc.prototype.fourOfAKind = function(){
    let diceFaceValue = 1;
    while (diceFaceValue <= 6)
    {   
        diceWithFaceValue = this.getDiceWith(diceFaceValue);
        if ( ( diceWithFaceValue.length >= 4 ) && ( this.scorecard.lower.scores.fourOfAKind.currentScore === null ) )
        {
            sumDice = this.addDice(this.dice);
            this.scorecard.lower.scores.fourOfAKind.potentialScore  = sumDice
            this.scorecard.lower.validDicePlacement = true
        }
        else if ( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.fourOfAKind.currentScore  === null ) )
        {
            this.scorecard.lower.scores.fourOfAKind.potentialScore = 0
        }

        diceFaceValue ++;
    }
    return this.scorecard.lower.scores.fourOfAKind
}

//score full house
ScoreCalc.prototype.fullHouse = function(){
<<<<<<< HEAD
    if (this.getUniqueFaceValues().length <= 2) {
=======
    if (this.getUniqueValues().length <= 2) {
>>>>>>> 2da734d4d35d9b345dbc935434e2f29e6deb19e3
        this.scorecard.lower.scores.fullHouse.potentialScore = 25;
        this.scorecard.lower.validDicePlacement = true
    }else if( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.fullHouse.currentScore  === null )){
        this.scorecard.lower.scores.fullHouse.potentialScore = 0;
    }
    return this.scorecard.lower.scores.fullHouse;
}

ScoreCalc.prototype.smallStraight = function(){
    //const expected =  {currentScore: null, potentialScore: 30, accepts: 5};
    let uniqueFaceValues= this.getUniqueFaceValues();

    if( ( uniqueFaceValues[0] + 1 === uniqueFaceValues[1] ) && 
        ( uniqueFaceValues[0] + 2 === uniqueFaceValues[2] ) && 
        ( uniqueFaceValues[0] + 3 === uniqueFaceValues[3] ) && 
        (this.scorecard.lower.scores.smallStraight.currentScore === null))
        {
            this.scorecard.lower.scores.smallStraight.potentialScore = 30;
            this.scorecard.lower.validDicePlacement = true
        } 
        else if ( (uniqueFaceValues[1] + 1 === uniqueFaceValues[2] ) &&
                (uniqueFaceValues[1] + 2 === uniqueFaceValues[3]) && 
                (uniqueFaceValues[1] + 3 === uniqueFaceValues[4]) &&
                this.scorecard.lower.scores.smallStraight.currentScore === null)
        {
            this.scorecard.lower.scores.smallStraight.potentialScore = 30;
            this.scorecard.lower.validDicePlacement = true
        }else if( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.smallStraight.currentScore  === null )){
            this.scorecard.lower.scores.smallStraight.potentialScore = 0;
        }

    return this.scorecard.lower.scores.smallStraight;
}

ScoreCalc.prototype.largeStraight = function(){
    let uniqueFaceValues= this.getUniqueFaceValues();
    if( ( uniqueFaceValues[0] < 3) 
        && ( uniqueFaceValues[4] === uniqueFaceValues[0] + 4 ) 
        && ( this.scorecard.lower.scores.largeStraight.currentScore === null ) )
    {
        this.scorecard.lower.scores.largeStraight.potentialScore = 40;
        this.scorecard.lower.validDicePlacement = true
    }else if( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.largeStraight.currentScore  === null )){
        this.scorecard.lower.scores.largeStraight.potentialScore = 0;
    }
    return this.scorecard.lower.scores.largeStraight;
}

ScoreCalc.prototype.yahtzee = function(){
    if ( (this.getUniqueFaceValues.length === 1) && (this.scorecard.lower.scores.yahtzee.currentScore  === null) ){
        this.scorecard.lower.scores.yahtzee.potentialScore = 50;
        this.scorecard.lower.validDicePlacement = true
    } 
    else if ( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.yahtzee.currentScore  === null ) )
    {
        this.scorecard.lower.scores.yahtzee.potentialScore = 0
    } 
    else if ((this.getUniqueFaceValues.length === 1) && ( this.scorecard.lower.scores.yahtzee.currentScore > 0 ) )
    {
        this.scorecard.lower.scores.yahtzee.potentialScore = this.scorecard.lower.scores.yahtzee.currentScore + 100;
    }
    
    return this.scorecard.lower.scores.yahtzee;
}

// score chance
ScoreCalc.prototype.chance = function(){
    if(this.scorecard.lower.scores.chance.currentScore === null){
        sumDice = this.addDice(this.dice);
        this.scorecard.lower.scores.chance.potentialScore = sumDice
        this.scorecard.lower.validDicePlacement = true
    }
    return this.scorecard.lower.scores.chance
}

//final method that returns all potential scores for a set of dice:
ScoreCalc.prototype.calculatePotentialScores = function(){
    //while(this.scorecard.lower.validDicePlacement === false){
    // score lower
        // check 3 of kind,
        // check 4 of a kind
        // check full house
        // check yahtzee
        // check chance
        // small straight
        // large straight
    //}
    // score upper
    this.scoreUpper();
        // check ones
        // check twos
        // .....
    // if all potentialScore  > 0
    // allow zero = false
    // potentialScore === 0 now = null
}
    


module.exports = ScoreCalc