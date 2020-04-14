<template lang="html">
  <div v-if="gameRunning">
    <p>ROLLED DICE</p>
    <p v-on:click="handleClickRolled(index)" v-for="(die, index) in diceArray" :die="die" :key="index"> {{ die.diceValue }} </p>
    <button v-on:click="handleRollDice">Roll Them Dice: You Have {{rollsLeft}} rolls left</button>
  </div>
</template>
<script>
import { eventBus } from '@/main.js';
import DiceRoller from '@/models/DiceRoller.js';
const diceRoller = new DiceRoller();

export default {
  name:'RolledDice',
  data(){
    return {
      gameRunning: false,
      diceArray: [
        {diceValue: 0, id: 1},
        {diceValue: 0, id: 2},
        {diceValue: 0, id: 3},
        {diceValue: 0, id: 4},
        {diceValue: 0, id: 5}
      ],
      rollsLeft: 3
    }
  },
  mounted(){
    eventBus.$on('game-start', playerName =>{
      this.getDiceNumbers()
      this.gameRunning = true
    }),

    eventBus.$on('dice-unselected', (dice) => {
      this.diceArray.push(dice);
    })
    eventBus.$on("score-saved", (dice) =>{
      this.diceArray = dice
      this.rollsLeft = 3
    })
  },
  methods: {
    getDiceNumbers(){
      return this.diceArray = diceRoller.rollDice(this.diceArray.length);
    },

    handleClickRolled(index){
      if (this.rollsLeft < 3){
        eventBus.$emit('dice-selected', this.diceArray[index]);
        this.diceArray.splice(index, 1);
      }
    },

    handleRollDice(){
      if( (this.rollsLeft > 1) && (this.diceArray.length > 0) ) {
        this.getDiceNumbers();
        this.rollsLeft --;
        eventBus.$emit('rolled-dice-to-scorecard', this.diceArray)
      } else if ( (this.rollsLeft === 1) && (this.diceArray.length > 0) ){
        this.getDiceNumbers();
        eventBus.$emit('move-remaining-dice', this.diceArray)
        let diceArrayLength = this.diceArray.length
        this.diceArray.splice(0, diceArrayLength)
        eventBus.$emit('rolled-dice-to-scorecard', this.diceArray)
        this.rollsLeft --;
      }
    }
  }
}
</script>


<style scoped>

</style>



