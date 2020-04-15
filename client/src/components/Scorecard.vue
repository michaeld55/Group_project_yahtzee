<template lang = "html">
    <div id="scorecard-container">
        <p v-if="gameRunning">SCORE CARD</p>
        <table v-if="playerScorecard.scorecard" style="width:100%">
            <tr>
                <th>Upper Section</th>
                <th>Score</th> 
            </tr>
            <tr v-for="(row, index) in playerScorecard.scorecard.upper.scores" :row="row" :key="index">
                <td> {{ index }}  </td>
                <td  v-model="selectedScore" v-on:click="handleSaveScore(row)" v-if="row.potentialScore != null"> ({{row.potentialScore}})</td>
                <td v-if="row.currentScore != null">{{row.currentScore}}</td>
            </tr>
            <tr>
                <td>Subtotal</td>
                <td v-if="playerScorecard.scorecard.upper.subTotal != null">{{playerScorecard.scorecard.upper.subTotal}}</td>
            </tr>
            <tr>
                <td>Upper Bonus</td>
                <td v-if="playerScorecard.scorecard.upper.upperBonus != null">{{playerScorecard.scorecard.upper.upperBonus}}</td>
            </tr>
            <tr>
                <th>Lower Section</th>
            </tr>
            <tr v-for="(row, index) in playerScorecard.scorecard.lower.scores" :row="row" :key="index">
                <td> {{ index }}  </td>
                <td  v-model="selectedScore" v-on:click="handleSaveScore(row)" v-if="row.potentialScore != null"> ({{row.potentialScore}})</td>
                <td v-if="row.currentScore != null">{{row.currentScore}}</td>
            </tr>
            <tr>
                <td> Total Score </td>
                <td> {{playerScorecard.scorecard.lower.totalScore}} </td>
            </tr>
        </table>
    </div>  
</template>



<script>
import { eventBus } from '@/main.js';
import Scorecard from '../models/scorecard.js';
import SavedDice from './SavedDice.vue';
import RolledDice from './RolledDice.vue';
import ScoreCalc from '../models/scoreCalc.js';

export default {
    name: "scorecard",
    props: ["gameRunning"],
    data(){
        return{
            mergedDiceArray: [],
            playerScorecard: {},
            "selectedScore": 0,
            turnCounter: 0,
            calculator: {},
        }
    },
    mounted(){
        eventBus.$on('game-ready', blankScorecard =>{
            this.getNewScoreCard(blankScorecard)
        }),
        eventBus.$on('rolled-dice-to-scorecard', (diceArray) => {

            this.mergedDiceArray = [];
            
            let rolledDice = [];
            for (let die of diceArray) {
                rolledDice.push(die);
            }
            for (let die of rolledDice) {
                this.mergedDiceArray.push(die);
            }
            this.calculateScore()
        })

        eventBus.$on('saved-dice-to-scorecard', (diceArray) => {

            let savedDice = [];

            for (let die of diceArray) {
                savedDice.push(die);
            }
            for (let die of savedDice) {
                this.mergedDiceArray.push(die);
            }

            this.calculateScore()
        })

        eventBus.$on('turn-over-to-scorecard', (diceArray) => {

            this.mergedDiceArray = diceArray;
            this.calculateScore()
        })

    },
    methods: {
        getNewScoreCard(blankScorecard){
            this.playerScorecard = new Scorecard(blankScorecard)
        },
        calculateScore(){
            this.calculator = new ScoreCalc(this.playerScorecard.scorecard, this.mergedDiceArray)
            this.calculator.calculatePotentialScores();
            return this.playerScorecard
        },

        handleSaveScore(row){
            this.selectedScore = row.potentialScore
            row.currentScore = this.selectedScore
            let jokerRule = this.calculator.jokerRule();
            if(jokerRule){
               this.playerScorecard.scorecard.lower.yahtzee.currentScore = this.playerScorecard.scorecard.lower.yahtzee.potentialScore
            }
            this.calculator.nullPotentialScores();
            this.calculator.sumSubTotal();
            this.calculator.sumTotal();
            eventBus.$emit("score-saved", this.mergedDiceArray)
            this.turnCounter ++;
            this.mergedDiceArray = []

            if (this.calculator.checkForEndGame() === true){
                eventBus.$emit('game-end', this.playerScorecard.scorecard.lower.totalScore)
            }
        },
    }

}
</script>

<style scoped>
    #scorecard-container {
    border: 3px solid black;

    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 9;
    }

    table {
        border: 3px black solid;
    }
    td {
        border-bottom: 1px black solid;
        border-left: 1px black solid;
        border-right: 1px black solid;
        border-top: 1px black solid;

    }
</style>