const assert = require('assert');
const Scorecard= require('../scorecard.js');

describe('Scorecard', function(){
    beforeEach(function(){
        scorecard1= new Scorecard();
        scorecard2= new Scorecard();
    })

    it('should have a score', function(){
        const score= scorecard1.score;
        assert.strictEqual()//fill out later
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
if dice at [0] = 1 and scorecard ones null then 
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