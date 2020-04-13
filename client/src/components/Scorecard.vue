<template>
    <div>
        <p>SCORE CARD</p>
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
// empty merged after saved

export default {
    data(){
        return{
            score: 0,
            mergedDiceArray: []
        }
    },
    mounted(){
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
 
        calculateScore(mergedDiceArray){
            //use scorecard model to calculate
            return this.score
        }
    }

}
</script>

<style scoped>

</style>