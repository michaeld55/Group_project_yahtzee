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
                    ones:{currentScore: null, potentialScore: null, accepts: 1}, 
                    twos:{currentScore: null, potentialScore: null, accepts: 2}, 
                    threes:{currentScore: null, potentialScore: null, accepts: 3}, 
                    fours:{currentScore: null, potentialScore: null, accepts: 4}, 
                    fives:{currentScore: null, potentialScore: null, accepts: 5}, 
                    sixes:{currentScore: null, potentialScore: null, accepts: 6},
                },
                validDicePlacement: false,
                subTotal: null, 
                upperBonus: null,
            },
            lower: {
                scores:{
                    threeOfAKind:{currentScore: null, potentialScore: null, accepts: 3},
                    fourOfAKind:{currentScore: null, potentialScore: null, accepts: 4},
                    fullHouse:{currentScore: null, potentialScore: null, accepts: [3, 2]},
                    smallStraight:{currentScore: null, potentialScore: null, accepts: 4},
                    largeStraight:{currentScore: null, potentialScore: null, accepts: 5},
                    chance:{currentScore: null, potentialScore: null, accepts: 5},
                    yahtzee:{currentScore: null, potentialScore: null, accepts: 5}
                },
                validDicePlacement: false,
                totalScore: null
            },
            allowZeroScore: false,
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
        const actual = scoreCalc.getUnscoredUpperBoxes();
        const expected = [1, 2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual, expected);
        scoreCalc.scorecard.upper.scores.ones.currentScore = 1;
        const actual2 = scoreCalc.getUnscoredUpperBoxes();
        const expected2 = [2, 3, 4, 5, 6];
        assert.deepStrictEqual(actual2, expected2);
    })

    it("should sum sub total", function(){
        const actual = scoreCalc.sumSubTotal();
        const expected = 0
        assert.strictEqual(actual, expected)
    })

    it("should be able to show potential score in upper", function(){
        const actual = scoreCalc.scoreUpper();
        const expected = {scores:{
            ones:{currentScore: null, potentialScore: 1, accepts: 1}, 
            twos:{currentScore: null, potentialScore: 4, accepts: 2}, 
            threes:{currentScore: null, potentialScore: 3, accepts: 3}, 
            fours:{currentScore: null, potentialScore: null, accepts: 4}, 
            fives:{currentScore: null, potentialScore: 5, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: null, accepts: 6}, 
        },
        validDicePlacement: true,
        subTotal: 0, 
        upperBonus: null};
        assert.deepStrictEqual(actual, expected);

        scoreCalc.scorecard.upper = {scores: {
            ones:{currentScore: 1, potentialScore: null, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: null, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: null, accepts: 3}, 
            fours:{currentScore: null, potentialScore: null, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: null, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: null, accepts: 6}, 
        },
        validDicePlacement: false,
        subTotal: 0, 
        upperBonus: null};

        const actual2 = scoreCalc.scoreUpper();
        const expected2 = {scores: {
            ones:{currentScore: 1, potentialScore: null, accepts: 1}, 
            twos:{currentScore: 4, potentialScore: null, accepts: 2}, 
            threes:{currentScore: 3, potentialScore: null, accepts: 3}, 
            fours:{currentScore: null, potentialScore: null, accepts: 4}, 
            fives:{currentScore: 5, potentialScore: null, accepts: 5}, 
            sixes:{currentScore: null, potentialScore: null, accepts: 6}, 
        },
        validDicePlacement: false,
        subTotal: 5, 
        upperBonus: null};
        assert.deepStrictEqual(actual2, expected2)
    })

    it("should be able to score three of kind", function(){
        die1 = {diceValue: 2};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 3};
        die5 = {diceValue: 5};

        dice2 = [die1, die2, die3, die4, die5];

        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.threeOfAKind();
        const expected =  {currentScore: null, potentialScore: 14, accepts: 3};
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to score four of kind", function(){
        die1 = {diceValue: 2};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 2};
        die5 = {diceValue: 5};

        dice2 = [die1, die2, die3, die4, die5];

        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.fourOfAKind();
        const expected =  {currentScore: null, potentialScore: 13, accepts: 4};
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to score yatzee", function(){
        die1 = {diceValue: 2};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 2};
        die5 = {diceValue: 2};

        dice2 = [die1, die2, die3, die4, die5];

        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.yatzee();
        const expected =  {currentScore: null, potentialScore: 50, accepts: 5};
        assert.deepStrictEqual(actual, expected)
    })

    it("should score a small straight", function(){
        die1 = {diceValue: 1};
        die2 = {diceValue: 3};
        die3 = {diceValue: 4};
        die4 = {diceValue: 5};
        die5 = {diceValue: 6};

        dice2 = [die1, die2, die3, die4, die5];

        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.smallStraight();
        const expected =  {currentScore: null, potentialScore: 30, accepts: 4};
        assert.deepStrictEqual(actual, expected)
    })

    it("should score a large straight", function(){
        die1 = {diceValue: 1};
        die2 = {diceValue: 2};
        die3 = {diceValue: 3};
        die4 = {diceValue: 4};
        die5 = {diceValue: 5};

        dice2 = [die1, die2, die3, die4, die5];

        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.largeStraight();
        const expected =  {currentScore: null, potentialScore: 40, accepts: 5};
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to get unique dice values from the array", function(){
        const actual = scoreCalc.getUniqueFaceValues();
        const expected = [1,2,3,5];
        assert.deepStrictEqual(actual, expected);
    })
});
