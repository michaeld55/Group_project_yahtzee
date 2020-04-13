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
                    ones:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
                    twos:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
                    threes:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
                    fours:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
                    fives:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
                    sixes:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
                },
                validDicePlacement: false,
                subTotal: null, 
                upperBonus: null,
            },
          
            lower: {
                scores:{
                    threeOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If Three Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                    fourOfAKind:{currentScore: null, potentialScore: null, scoringRule: "If Four Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"},
                    fullHouse:{currentScore: null, potentialScore: null, scoringRule: "If Three Dice Have The Same Face Value And Two Other Dice Also Have A Matching Face Value You Can Score Here. This Is Worth 25 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                    smallStraight:{currentScore: null, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4 Or 2, 3, 4, 5 Or 3, 4, 5, 6 You Can Score Here. This Is Worth 30 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value" },
                    largeStraight:{currentScore: null, potentialScore: null, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4, 5 Or 2, 3, 4, 5, 6 You Can Score Here. This Is Worth 40 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"},
                    chance:{currentScore: null, potentialScore: null, scoringRule: "Add The Face Values Of All Dice Together And Place That Score Here"},
                    yahtzee:{currentScore: null, potentialScore: null, scoringRule: "If All Five Dice Have The Same Face Value You Can Score Here. This Is Worth 50 Points. Jocker Rule: If You Roll Another Yatzee After Filling This Box With A Score Of 50 You Will Gain A Bouns 100 Points And You Can Place This These Dice In Any Box"}
                },
                validDicePlacement: false,
                totalScore: null
            },
            allowZeroScore: true,
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

    it("should sum sub total", function(){
        const actual = scoreCalc.sumSubTotal();
        const expected = 0
        assert.strictEqual(actual, expected)
    })

    it("should be able to show potential score in upper", function(){
        const actual = scoreCalc.scoreUpper();
        const expected = {scores:{
            ones:{currentScore: null, potentialScore: 1, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
            twos:{currentScore: null, potentialScore: 4, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
            threes:{currentScore: null, potentialScore: 3, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
            fours:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
            fives:{currentScore: null, potentialScore: 5, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
            sixes:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"}, 
        },
        validDicePlacement: true,
        subTotal: 0, 
        upperBonus: null};
        assert.deepStrictEqual(actual, expected);

        scoreCalc.scorecard.upper = {scores: {
            ones:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
            twos:{currentScore: 4, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
            threes:{currentScore: 3, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
            fours:{currentScore: null, potentialScore: 0, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
            fives:{currentScore: 5, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
            sixes:{currentScore: null, potentialScore: 0, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
        },
        validDicePlacement: false,
        subTotal: 0, 
        upperBonus: null};

        const actual2 = scoreCalc.scoreUpper();
        const expected2 = {scores: {
            ones:{currentScore: 1, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
            twos:{currentScore: 4, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
            threes:{currentScore: 3, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
            fours:{currentScore: null, potentialScore: 0, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
            fives:{currentScore: 5, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
            sixes:{currentScore: null, potentialScore: 0, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
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
        const expected =  {currentScore: null, potentialScore: 14, scoringRule: "If Three Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"};
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to score four of kind", function(){
        die1 = {diceValue: 2};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 2};
        die5 = {diceValue: 5};

        dice2 = [die1, die2, die3, die4, die5];

        let scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.fourOfAKind();
        const expected =  {currentScore: null, potentialScore: 13, scoringRule: "If Four Or More Dice Have The Same Face Value You Can Score Here. Add The Face Values Of All Dice And Place That Score Here"};
        assert.deepStrictEqual(actual, expected)
    })

    xit("should be able to score yatzee", function(){
        die1 = {diceValue: 2};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 2};
        die5 = {diceValue: 2};

        dice2 = [die1, die2, die3, die4, die5];

        let scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.yahtzee();
        const expected =  {currentScore: null, potentialScore: 50, accepts: 5};
        assert.deepStrictEqual(actual, expected)
    })

    it("should score a small straight", function(){
        die1 = {diceValue: 1};
        die2 = {diceValue: 2};
        die3 = {diceValue: 3};
        die4 = {diceValue: 4};
        die5 = {diceValue: 2};

        dice2 = [die1, die2, die3, die4, die5];

        let scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.smallStraight();
        const expected =  {currentScore: null, potentialScore: 30, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4 Or 2, 3, 4, 5 Or 3, 4, 5, 6 You Can Score Here. This Is Worth 30 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"};
        assert.deepStrictEqual(actual, expected)
    })

    it("should score a large straight", function(){
        die1 = {diceValue: 1};
        die2 = {diceValue: 2};
        die3 = {diceValue: 3};
        die4 = {diceValue: 4};
        die5 = {diceValue: 5};

        dice2 = [die1, die2, die3, die4, die5];

        let scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.largeStraight();
        const expected =  {currentScore: null, potentialScore: 40, scoringRule: "If Your Dice Have The Face Values Of 1, 2, 3, 4, 5 Or 2, 3, 4, 5, 6 You Can Score Here. This Is Worth 40 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"};
        assert.deepStrictEqual(actual, expected)
    })

    it("should be able to get unique dice values from the array", function(){
        const actual = scoreCalc.getUniqueFaceValues();
        const expected = [1,2,3,5];
        assert.deepStrictEqual(actual, expected);
    })

    it("should score a Full House", function(){
        die1 = {diceValue: 3};
        die2 = {diceValue: 2};
        die3 = {diceValue: 2};
        die4 = {diceValue: 3};
        die5 = {diceValue: 2};

        dice2 = [die1, die2, die3, die4, die5];
        scoreCalc2 = new ScoreCalc(scorecard, dice2);

        const actual = scoreCalc2.fullHouse();
        const expected = {currentScore: null, potentialScore: null, scoringRule: "If Three Dice Have The Same Face Value And Two Other Dice Also Have A Matching Face Value You Can Score Here. This Is Worth 25 Points. Jocker Rule: This Only Accepts A Yatzee If The Upper Score Of The Dice Face Value Is Full And You Have Filled The Yatzee Box With Any Value"};
        assert.deepStrictEqual(actual, expected)
    })
});
