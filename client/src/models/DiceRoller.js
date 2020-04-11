const DiceRoller = function(){
    this.allDice = []
}

DiceRoller.prototype.rollDice = function(diceToRoll){
    counter = diceToRoll;
    while (counter > 0){
        randomNumber = Math.ceil((Math.random() * 6))
        this.allDice.push({value: randomNumber})
        counter -= 1
    }
}

module.exports = DiceRoller;