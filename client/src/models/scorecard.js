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
    // Work In Progress
    lower: {
        scores:{
            threeOfAKind:{currentScore: null, potentialScore: null, accepts: 3},// add all dice (add Dice, get dicewithfacevalue >= 3)
            fourOfAKind:{currentScore: null, potentialScore: null, accepts: 4},// add all dice (add Dice, get dicewithfacevalue >= 4)
            fullHouse:{currentScore: null, potentialScore: null, accepts: [3, 2]},// 25
            smallStraight:{currentScore: null, potentialScore: null, accepts: 4},// 30
            largeStraight:{currentScore: null, potentialScore: null, accepts: 5},// 40
            chance:{currentScore: null, potentialScore: null, accepts: 5},// add all dice
            yahtzee:{currentScore: null, potentialScore: null, accepts: 5}// 50 then +100 if joker, (add Dice, get dicewithfacevalue === 5)
        },
        validDicePlacement: false,
        totalScore: null
    },
    allowZeroScore: false,
};