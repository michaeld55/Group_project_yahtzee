<template lang="html">
  <div>
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
    props:["gameRunning"]
    return {
      diceArray: [
        {diceValue: 6},
        {diceValue: 6},
        {diceValue: 6},
        {diceValue: 6},
        {diceValue: 6}
      ],
      rollsLeft: 3
    }
  },
  mounted(){

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



