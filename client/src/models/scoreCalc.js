const ScoreCalc = function(scorecard, dice){
    this.scorecard = scorecard,
    this.dice = dice
}

ScoreCalc.prototype.diceValues = function(){
    result = []
    result = this.dice.map( die => die.diceValue )
    return result;
}

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

ScoreCalc.prototype.getUnscoredUpperBoxes = function() {
    allUpperRows = Object.values(this.scorecard.upper.scores);
    unscoredBoxes = []
    unscoredBoxes = allUpperRows.filter( row => row.currentScore === null )
    
    let acceptedValuesArray = []
    for ( let box of unscoredBoxes ){
        acceptedValuesArray.push(box.accepts)
    }
    return acceptedValuesArray;
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
    if(!this.scorecard.upper.validDicePlacement && !this.scorecard.upper.validDicePlacement){
        this.allowZero = true
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


// score lower
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
            this.scorecard.lower.scores[row].potentialScore = 0
        }

        diceFaceValue ++;
    }
    return this.scorecard.lower.scores.fourOfAKind
}



// score of a kind

//score full house

// score straights
ScoreCalc.prototype.smallStraight = function(){
    //const expected =  {currentScore: null, potentialScore: 30, accepts: 5};
    let diceFaceValues = this.diceValues();
    diceFaceValues.sort();

    smallStraightArray1 =  [1, 2, 3, 4];
    smallStraightArray2 =  [2, 3, 4, 5];
    smallStraightArray3 =  [3, 4, 5, 6];
    //compare any 4 values from the diceFaceValues to the three smallStraights


    
    /*
        array to check = diceFaceValues first 4 
        then
        array to check = diceFaceValues last 4
    */
   for (var i = 0; i < 2; i++) {
    //    if(diceFaceValues.slice(i,i+4)===smallStraightArray1){         
    //    }
        if(diceFaceValues[i]!=smallStraightArray1[i]){
            continue;
        } else if(diceFaceValues[i]!=smallStraightArray2[i]){
            continue;
        } else if(diceFaceValues[i]!= smallStraightArray3[i]){
            break;
        } else {
            return this.scorecard.lower.scores.smallStraight;
        }

  }
  

}

ScoreCalc.prototype.largeStraight = function(){

    let diceFaceValues= this.diceValues();
    diceFaceValues.sort();
    
    if((diceFaceValues === [1, 2, 3, 4, 5,]) || (diceFaceValues === [2, 3, 4, 5, 6])){

    }

    // sort rolled dice

    // check if equals array
}



// score yatzee
ScoreCalc.prototype.yatzee = function(){
    let diceFaceValue = 1;
    while (diceFaceValue <= 6)
    {   
        diceWithFaceValue = this.getDiceWith(diceFaceValue);
        if ( ( diceWithFaceValue.length === 5 ) && ( this.scorecard.lower.scores.yahtzee.currentScore === null ) )
        {
            this.scorecard.lower.scores.yahtzee.potentialScore  = 50
            this.scorecard.lower.validDicePlacement = true
        }
        else if ( ( this.scorecard.allowZeroScores ) && ( this.scorecard.lower.scores.yahtzee.currentScore  === null ) )
        {
            this.scorecard.lower.scores.yahtzee.potentialScore = 0
        }

        else if ( ( diceWithFaceValue.length === 5 ) && ( this.scorecard.lower.scores.yahtzee.currentScore > 0 ) )
        {
            this.scorecard.lower.scores.yahtzee.currentScore += 100;
        }

        diceFaceValue ++;
    }
    return this.scorecard.lower.scores.yahtzee
}


//score chance

// score full card

// if all boxes are null then upperVaildSection = false

module.exports = ScoreCalc

/*

for (i = 0; i < cars.length; i += 4) {
  text += cars[i] + "<br>";
}

*/