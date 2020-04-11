
<template>
<div>
    <p>SCORE CARD</p>
    <p>{{mergedDiceArray}}</p>
</div>
</template>

<script>
import { eventBus } from '@/main.js';
import Scorecard from '../models/scorecard.js';
import SavedDice from './SavedDice.vue';
import RolledDice from './RolledDice.vue';

// current scores

//import Scorecard from scorecard.js
// const scorecard = new Scorecard
// dice come in
// dice get checked to see what they score
// update scorecard to this score
// handle click to save score 

export default {
    data(){
        return{
            score: 0,
            rolledDice: [],
            savedDice: [],
            mergedDiceArray: []
        }
    },
    mounted(){
        this.calculateScore(),
        eventBus.$on("rolled-dice-to-scorecard", (dice) =>{
            this.rolledDice = []
            this.rolledDice.push(dice)
        })
    },
    methods: {
        calculateScore(mergedDiceArray){
            //use scorecard model to calculate
            return this.score
        }
    }

}
</script>

<style scoped>

</style>