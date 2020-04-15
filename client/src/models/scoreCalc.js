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

    for (let row in this.scorecard.upper.scores) {
        if ( this.scorecard.upper.scores[row].currentScore != null ){
            total += this.scorecard.upper.scores[row].currentScore
        }
    }
    this.scorecard.upper.subTotal = total
    return this.scorecard.upper.subTotal
}

ScoreCalc.prototype.allowZero = function(){
    if( ( this.scorecard.upper.validDicePlacement === false ) && ( this.scorecard.lower.validDicePlacement === false ) ){
        this.scorecard.allowZeroScore = true
    }
    return this.scorecard.allowZeroScore
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
        else if ( ( this.scorecard.allowZeroScore ) && ( this.scorecard.upper.scores[row].currentScore === null ) )
        {
            this.scorecard.upper.scores[row].potentialScore = 0
        }

        diceFaceValue ++;
    }

    this.sumSubTotal()
    if( this.sumSubTotal >= 63 )
    {
        this.scorecard.upper.upperBonus = 35;
    }else{
        this.scorecard.upper.upperBonus = 0;
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
        else if ( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.threeOfAKind.currentScore  === null ) )
        {
            this.scorecard.lower.scores.threeOfAKind.potentialScore = 0
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
        else if ( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.fourOfAKind.currentScore  === null ) )
        {
            this.scorecard.lower.scores.fourOfAKind.potentialScore = 0
        }

        diceFaceValue ++;
    }
    return this.scorecard.lower.scores.fourOfAKind
}

//score full house
ScoreCalc.prototype.fullHouse = function(){
    // diceArray = [1,1,1,4,4]
    let uniqueFaceValues = this.getUniqueFaceValues();
    if(uniqueFaceValues.length === 2){
        uniqueFaceValues = this.getDiceWith(uniqueFaceValues[0])// 1
    // [1, 1, 1] => length is 3 => full house
        if ( (uniqueFaceValues.length === 2 || uniqueFaceValues.length === 3 || this.jokerRule() === true ) && ( this.scorecard.lower.scores.fullHouse.currentScore  === null )) {
            this.scorecard.lower.scores.fullHouse.potentialScore = 25;
            this.scorecard.lower.validDicePlacement = true
        }else if( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.fullHouse.currentScore  === null )){
            this.scorecard.lower.scores.fullHouse.potentialScore = 0;
        }
    }
    
    return this.scorecard.lower.scores.fullHouse;
}

ScoreCalc.prototype.smallStraight = function(){
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
        }else if( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.smallStraight.currentScore  === null )){
            this.scorecard.lower.scores.smallStraight.potentialScore = 0;
        }

    return this.scorecard.lower.scores.smallStraight;
}

ScoreCalc.prototype.largeStraight = function(){
    let uniqueFaceValues = this.getUniqueFaceValues();
    if( ( uniqueFaceValues[0] < 3) 
        && ( uniqueFaceValues[4] === uniqueFaceValues[0] + 4 ) 
        && ( this.scorecard.lower.scores.largeStraight.currentScore === null ) )
    {
        this.scorecard.lower.scores.largeStraight.potentialScore = 40;
        this.scorecard.lower.validDicePlacement = true
    }else if( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.largeStraight.currentScore  === null )){
        this.scorecard.lower.scores.largeStraight.potentialScore = 0;
    }
    return this.scorecard.lower.scores.largeStraight;
}

ScoreCalc.prototype.yahtzee = function(){

    let uniqueFaceValues = this.getUniqueFaceValues();

    if ( (uniqueFaceValues.length === 1) && (this.scorecard.lower.scores.yahtzee.currentScore  === null) ){
        this.scorecard.lower.scores.yahtzee.potentialScore = 50;
        this.scorecard.lower.validDicePlacement = true
    } 
    else if ( ( this.scorecard.allowZeroScore ) && ( this.scorecard.lower.scores.yahtzee.currentScore  === null ) )
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
    if ( this.scorecard.lower.scores.chance.currentScore === null )
    {
        sumDice = this.addDice(this.dice);
        this.scorecard.lower.scores.chance.potentialScore = sumDice
        this.scorecard.lower.validDicePlacement = true
    }
    return this.scorecard.lower.scores.chance
}

ScoreCalc.prototype.checkForNullScores = function(){
    let checkUnscoredBoxes = false;

    for(let row in this.scorecard.upper.scores){
        if ( this.scorecard.upper.scores[row].potentialScore === null ){
            checkUnscoredBoxes = true;  
        }
    }
    for (let row in this.scorecard.lower.scores){
        if (this.scorecard.lower.scores[row].potentialScore === null){
            checkUnscoredBoxes = true;
        }
    }
    return checkUnscoredBoxes;
}

ScoreCalc.prototype.checkForEndGame = function(){
    let endGame = true;

    for(let row in this.scorecard.upper.scores){
        if ( this.scorecard.upper.scores[row].currentScore === null ){
            endGame = false;  
        }
    }
    
    for (let row in this.scorecard.lower.scores){
        if (this.scorecard.lower.scores[row].currentScore === null){
            endGame = false;
        }
    }
    return endGame;
}

//final method that returns all potential scores for a set of dice:
ScoreCalc.prototype.calculatePotentialScores = function(){
    
    this.nullPotentialScores();

    this.chance();
    this.scoreUpper();
    this.yahtzee();
    this.threeOfAKind();
    this.fourOfAKind();
    this.smallStraight();
    this.largeStraight();
    this.fullHouse();

    this.sumTotal();
    
    this.allowZero();
    if ( this.scorecard.allowZeroScore === false ){
        return this.scorecard
    }else if ( this.checkForNullScores() === true){
        this.scorecard.allowZeroScore = true
        this.chance();
        this.scoreUpper();
        this.yahtzee();
        this.threeOfAKind();
        this.fourOfAKind();
        this.smallStraight();
        this.largeStraight();
        this.fullHouse();
        this.sumTotal();
        
        return this.scorecard


    }
}

ScoreCalc.prototype.sumTotal = function(){
    let lowerTotal = 0;

    for (let row in this.scorecard.lower.scores) {
        if ( this.scorecard.lower.scores[row].currentScore != null ){
            lowerTotal += this.scorecard.lower.scores[row].currentScore
        }
    }
    this.scorecard.lower.totalScore = (lowerTotal + this.scorecard.upper.subTotal);
    return this.scorecard.lower.totalScore

}

ScoreCalc.prototype.nullPotentialScores = function(){
    for (let row in this.scorecard.lower.scores) {
        this.scorecard.lower.scores[row].potentialScore = null;
    }
    for (let row in this.scorecard.upper.scores) {
        this.scorecard.upper.scores[row].potentialScore = null;
    }
    this.scorecard.upper.validDicePlacement = false
    this.scorecard.lower.validDicePlacement = false
    this.allowZeroScore = false
}

ScoreCalc.prototype.resetScorecard = function(){
    for (let row in this.scorecard.lower.scores) {
        this.scorecard.lower.scores[row].currentScore = null;
    }
    for (let row in this.scorecard.upper.scores) {
        this.scorecard.upper.scores[row].currentScore = null;
    }
    this.scorecard.upper.subTotal = null;
    this.scorecard.upper.upperBonus = null;
    this.scorecard.upper.validDicePlacement = false;
    this.scorecard.lower.validDicePlacement = false;
    this.lower.totalScore = null;
    this.allowZeroScore = false;
}

ScoreCalc.prototype.jokerRule = function(){
    let joker = false
    let uniqueFaceValues = this.getUniqueFaceValues();
    let row = uniqueFaceValues[0] - 1;
    console.log(row)
    
    /*

     switch (row) 
     {
        case 1:
            return "ones";
        case 2:
            return "twos";
        case 3:
            return "threes";
        case 4:
            return "fours";
        case 5:
            return "fives";
        case 5:
            return "sixes";
    }

    */

    if (( this.scorecard.lower.scores.yahtzee.currentScore != null) && ( uniqueFaceValues.length === 1 ) && ( this.scorecard.upper.scores[row].currentScore != null) ){
        joker = true
    }

    return joker


}

module.exports = ScoreCalc