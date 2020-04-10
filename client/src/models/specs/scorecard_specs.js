const assert = require('assert');
const Scorecard = require('../scorecard.js');

describe('Scorecard', function(){
    let dice;
    let card;

    beforeEach(function(){
        die1 = {value: 1};
        die2 = {value: 2};
        die3 = {value: 2};
        die4 = {value: 3};
        die5 = {value: 5};

        dice = [die1, die2, die3, die4, die5];
        
        card = { 
            upper: {
                scores: {
                    ones:{currentScore: null, potentialScore: 0, accepts: 1}, 
                    twos:{currentScore: null, potentialScore: 0, accepts: 2}, 
                    threes:{currentScore: null, potentialScore: 0, accepts: 3}, 
                    fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
                    fives:{currentScore: null, potentialScore: 0, accepts: 5}, 
                    sixes:{currentScore: null, potentialScore: 0, accepts: 6},
                },
                validDice: false,
                subtotal: 0, 
                upperBonus: 0,
            },
            lower: {
                threeOfAKind:{currentScore: null, potentialScore: 0, accepts: 3},
                fourOfAKind:{currentScore: null, potentialScore: 0, accepts: 4},
                fullHouse:{currentScore: null, potentialScore: 0, accepts: [3, 2]},
                smallStraight:{currentScore: null, potentialScore: 0, accepts: 4},
                largeStraight:{currentScore: null, potentialScore: 0, accepts: 5},
                chance:{currentScore: null, potentialScore: 0, accepts: 5},
                yahtzee:{currentScore: null, potentialScore: 0, accepts:5}
            },
            totalScore: 0
        };
        scorecard = new Scorecard(card, dice);
    })

    it('should have dice & card', function(){
        const actual = scorecard.dice;
        assert.strictEqual(actual, dice);
        const actual2 = scorecard.card;
        assert.strictEqual(actual2, card);
    })

    it("should be able to get all values", function(){
        const actual = scorecard.diceValues();
        const expected = [1, 2, 2, 3, 5]
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to add dice", function(){
        let dice = scorecard.dice
        const actual = scorecard.addDice(dice);
        assert.strictEqual(actual, 13);
    })

    it("should be able to find number of dice with a value", function(){
        const actual = scorecard.getDiceWith(1);
        const expected = [die1]
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to check valid sections", function(){
        const actual = scorecard.checkVaildUpper();
        const expected = [1, 2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual, expected);
        scorecard.card.upper.scores.ones.currentScore = 1;
        const actual2 = scorecard.checkVaildUpper();
        const expected2 = [2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual2, expected2);
    })

    it("should be able to show potentail score in upper", function(){
        const actual = scorecard.scoreUpper();
        const expected = {scores:{
            ones:{currentScore: null, potentialScore: 1, accepts: 1}, 
            twos:{currentScore: null, potentialScore: 4, accepts: 2}, 
            threes:{currentScore: null, potentialScore: 3, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: null, potentialScore: 5, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDice: true,
        subtotal: 0, 
        upperBonus: 0};
        assert.deepStrictEqual(actual, expected);

        scorecard.card.upper = {scores: {
            ones:{currentScore: 1, potentialScore: 0, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: 0, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: 0, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: 0, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDice: false,
        subtotal: 0, 
        upperBonus: 0};

        const actual2 = scorecard.scoreUpper();
        const expected2 = {scores: {
            ones:{currentScore: 1, potentialScore: 0, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: 0, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: 0, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: 0, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDice: false,
        subtotal: 0, 
        upperBonus: 0};
        assert.deepStrictEqual(actual2, expected2)
    })

})

/*
passed in 
scorecard:  
upper{
ones        null
},
lower{
    3 of a kind 
},
total: 
dice rolled = [1,1,1,1,5]

for die in dice
if dice at [null] = 1 and scorecard ones null then 
can score in one in upper,
return scorecard.player.ones == 4
.....

if 3 dice === same number
can score in 3 of kind lower,
.....



{
scorecard:  
upper{
ones:        4
},
lower{
    3 of a kind 
},
total: 
*/