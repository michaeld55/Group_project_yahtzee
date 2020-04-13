const DiceRoller = function(){
    this.allDice = []
}
DiceRoller.prototype.rollDice = function(diceToRoll){
    counter = diceToRoll;
    this.allDice = []
    while (counter > 0){
        randomNumber = Math.ceil((Math.random() * 6))
        this.allDice.push( {diceValue: randomNumber} )
        counter -= 1
    }
    // index = 0;
    // for(let die in allDice){

    // }
    /*
    allDice {diveValue: 1}, {diveValue: 3}
    diceToRoll {diveValue: 6, id: 5}, {diveValue: 6, id: 2}

    diceToroll[0]diceValue = allDice[0]diceValue

    diceToRoll {diveValue: 1, id: 5},, {diveValue: 3, id: 2}
    return diceToRoll
    */

    // handle id 
    return this.allDice;
}
module.exports = DiceRoller; 