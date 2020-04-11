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
    return this.allDice;
}
module.exports = DiceRoller; 