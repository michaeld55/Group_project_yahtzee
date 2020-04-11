const assert = require('assert');
const ScoreCalc = require('../scoreCalc.js');

describe('ScoreCalc', function(){
    let dice;
    let scorecard;

    beforeEach(function(){
        die1 = {diceValue: 1};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 3};
        die5 = {diceValue: 5};

        dice = [die1, die2, die3, die4, die5];
        
        scorecard = { 
            upper: {
                scores: {
                    ones:{currentScore: null, potentialScore: 0, accepts: 1}, 
                    twos:{currentScore: null, potentialScore: 0, accepts: 2}, 
                    threes:{currentScore: null, potentialScore: 0, accepts: 3}, 
                    fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
                    fives:{currentScore: null, potentialScore: 0, accepts: 5}, 
                    sixes:{currentScore: null, potentialScore: 0, accepts: 6},
                },
                validDicePlacement: false,
                subTotal: 0, 
                upperBonus: 0,
            },
            lower: {
                scores:{
                    threeOfAKind:{currentScore: null, potentialScore: 0, accepts: 3},
                    fourOfAKind:{currentScore: null, potentialScore: 0, accepts: 4},
                    fullHouse:{currentScore: null, potentialScore: 0, accepts: [3, 2]},
                    smallStraight:{currentScore: null, potentialScore: 0, accepts: 4},
                    largeStraight:{currentScore: null, potentialScore: 0, accepts: 5},
                    chance:{currentScore: null, potentialScore: 0, accepts: 5},
                    yahtzee:{currentScore: null, potentialScore: 0, accepts: 5}
                },
                validDicePlacement: false,
                allowZeroScore: false,
                totalScore: 0
            }
        };
        scoreCalc = new ScoreCalc(scorecard, dice);
    })

    it('should have dice & scorecard', function(){
        const actual = scoreCalc.dice;
        assert.strictEqual(actual, dice);
        const actual2 = scoreCalc.scorecard;
        assert.strictEqual(actual2, scorecard);
    })

    it("should be able to get all values", function(){
        const actual = scoreCalc.diceValues();
        const expected = [1, 2, 2, 3, 5]
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to add dice", function(){
        let dice = scoreCalc.dice
        const actual = scoreCalc.addDice(dice);
        assert.strictEqual(actual, 13);
    })

    it("should be able to find number of dice with a value", function(){
        const actual = scoreCalc.getDiceWith(1);
        const expected = [die1]
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to check valid sections", function(){
        const actual = scoreCalc.checkValidUpper();
        const expected = [1, 2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual, expected);
        scoreCalc.scorecard.upper.scores.ones.currentScore = 1;
        const actual2 = scoreCalc.checkValidUpper();
        const expected2 = [2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual2, expected2);
    })

    it("should sum sub total", function(){
        const actual = scoreCalc.sumSubTotal();
        const expected = 0
        assert.strictEqual(actual, expected)
    })

    it("should be able to show potentail score in upper", function(){
        const actual = scoreCalc.scoreUpper();
        const expected = {scores:{
            ones:{currentScore: null, potentialScore: 1, accepts: 1}, 
            twos:{currentScore: null, potentialScore: 4, accepts: 2}, 
            threes:{currentScore: null, potentialScore: 3, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: null, potentialScore: 5, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDicePlacement: true,
        subTotal: 0, 
        upperBonus: 0};
        assert.deepStrictEqual(actual, expected);

        scoreCalc.scorecard.upper = {scores: {
            ones:{currentScore: 1, potentialScore: 0, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: 0, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: 0, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: 0, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDicePlacement: false,
        subTotal: 0, 
        upperBonus: 0};

        const actual2 = scoreCalc.scoreUpper();
        const expected2 = {scores: {
            ones:{currentScore: 1, potentialScore: 0, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: 0, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: 0, accepts: 3}, 
            fours:{currentScore: null, potentialScore: 0, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: 0, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: 0, accepts: 6}, 
        },
        validDicePlacement: false,
        subTotal: 5, 
        upperBonus: 0};
        assert.deepStrictEqual(actual2, expected2)
    })

})

/*
passed in 
scoreCalc:  
upper{
ones        null
},
lower{
    3 of a kind 
},
total: 
dice rolled = [1,1,1,1,5]

for die in dice
if dice at [null] = 1 and scoreCalc ones null then 
can score in one in upper,
return scoreCalc.player.ones == 4
.....

if 3 dice === same number
can score in 3 of kind lower,
.....

{
scoreCalc:  
upper{
ones:        4
},
lower{
    3 of a kind 
},
total: 
*/