<template lang = "html">

  <div class="list">
    <table v-if="playerScorecard.scorecard">
        <tr>
            <th>Category</th>
            <th>Score</th> 
        </tr>
        <tr> 
            <scorecard-item
            v-for="(row, index) in playerScorecard.scorecard.upper"
            :row="row"
            :key="index">
            </scorecard-item>
        </tr>
    </table>
  <!-- </div> -->

     <!-- <div> -->
         <!-- <p>SCORE CARD</p>
         <table v-if="playerScorecard.scorecard" style="width:100%">
             <tr>
                <th></th>
               <th>Score</th> 
             </tr> -->
            <!-- <tr>
                <td> Ones</td>
                <td v-if="playerScorecard.scorecard.upper.scores.ones.currentScore"> {{playerScorecard.scorecard.upper.scores.ones.currentScore}}</td>
                <td v-on:click="handleSaveScore" v-if="playerScorecard.scorecard.upper.scores.ones.potentialScore"> ({{playerScorecard.scorecard.upper.scores.ones.potentialScore}})</td>
            </tr>
            <tr>
                <td> Ones</td>
                <td v-if="playerScorecard.scorecard.upper.scores.ones.currentScore"> {{playerScorecard.scorecard.upper.scores.ones.currentScore}}</td>
                <td v-on:click="handleSaveScore" v-model="selectedScore" v-if="playerScorecard.scorecard.upper.scores.ones.potentialScore"> ({{playerScorecard.scorecard.upper.scores.ones.potentialScore}})</td>
            </tr> -->
            <!-- <scorecard-item v-for="(row, index) in playerScorecard.scorecard.upper.scores" :row="row" :key="index"> -->
                <!-- <td> {{ index }}  </td>
                <td v-model="selectedScore" v-on:click="handleSaveScore" v-if="row.potentialScore"> ({{row.potentialScore}})</td>
                <td v-if="row.currentScore">{{row.currentScore}}</td> -->
                <!-- </scorecard-item>
            </tr>
            <tr>
                <td>Subtotal</td>
                <td v-if="playerScorecard.scorecard.upper.subTotal >= 0">{{playerScorecard.scorecard.upper.subTotal}}</td>
            </tr>
            <tr>
                <td>Upper Bonus</td>
                <td v-if="playerScorecard.scorecard.upper.upperBonus >= 0">{{playerScorecard.scorecard.upper.upperBonus}}</td>
            </tr>
</table> -->

    </div>  
</template>



<script>
import { eventBus } from '@/main.js';
import Scorecard from '../models/scorecard.js';
import SavedDice from './SavedDice.vue';
import RolledDice from './RolledDice.vue';
import ScorecardItem from './ScorecardItem.vue';

// current scores


// dice come in
// dice get checked to see what they score
// update scorecard to this score
// handle click to save score 
// empty merged after saved

export default {
    data(){
        return{
            mergedDiceArray: [],
            playerScorecard: {},
            selectedScore: [],
            blankScorecard: { 
                upper: {
                    scores: {
                        ones:{currentScore: 0, potentialScore: 2, scoringRule: "Add The Value Of Any Dice With A Face Value Of One And Place That Score Here"}, 
                        twos:{currentScore: null, potentialScore: 4, scoringRule: "Add The Value Of Any Dice With A Face Value Of Two And Place That Score Here"}, 
                        threes:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Three And Place That Score Here"}, 
                        fours:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Four And Place That Score Here"}, 
                        fives:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Five And Place That Score Here"}, 
                        sixes:{currentScore: null, potentialScore: null, scoringRule: "Add The Value Of Any Dice With A Face Value Of Six And Place That Score Here"},
                    },
                    validDicePlacement: false,
                    subTotal: 0, 
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
                    totalScore: 0
                },
                allowZeroScore: false,
            },
        }
    },
    mounted(){
        this.getNewScoreCard(),
        this.calculateScore(),
        eventBus.$on('rolled-dice-to-scorecard', (diceArray) => {
            this.mergedDiceArray = [];
            let rolledDice = [];
            for (let die of diceArray) {
                rolledDice.push(die);
            }
            for (let die of rolledDice) {
                this.mergedDiceArray.push(die);
            }
        })

        eventBus.$on('saved-dice-to-scorecard', (diceArray) => {
            let savedDice = [];
            for (let die of diceArray) {
                savedDice.push(die);
            }
            for (let die of savedDice) {
                this.mergedDiceArray.push(die);
            }
        })
    },
    methods: {
        getNewScoreCard(){
            this.playerScorecard = new Scorecard(this.blankScorecard)
        },
        calculateScore(mergedDiceArray){
            //use scorecard model to calculate
            return this.score
        },

        handleSaveScore(){
            
            console.dir(this.selectedScore)
        }
    },

    components: {
        "scorecard-item": ScorecardItem
    }

}
</script>

<style scoped>
    table {
        border: 3px black solid;
    }
    td {
        border-bottom: 1px black solid;
        border-left: 1px black solid;
    }
</style>