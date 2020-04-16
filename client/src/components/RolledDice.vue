<template lang="html">
  <div id="rolled-dice-container">
    <p>ROLLED DICE</p>
    <img v-on:click="handleClickRolled(index)" v-for="(die, index) in diceArray" :die="die" :key="index" :alt="die.diceValue" :src="die.diceImage">
    <br>
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
        {diceValue: 6, diceImage: "http://roll.diceapi.com/images/poorly-drawn/d6/6.png"},
        {diceValue: 6, diceImage: "http://roll.diceapi.com/images/poorly-drawn/d6/6.png"},
        {diceValue: 6, diceImage: "http://roll.diceapi.com/images/poorly-drawn/d6/6.png"},
        {diceValue: 6, diceImage: "http://roll.diceapi.com/images/poorly-drawn/d6/6.png"},
        {diceValue: 6, diceImage: "http://roll.diceapi.com/images/poorly-drawn/d6/6.png"},
      ],
      rollsLeft: 3
    }
  },
  mounted(){

    eventBus.$on('dice-unselected', (dice) => {
      this.diceArray.push(dice);
    })
    eventBus.$on("score-saved", (dice) =>{
      this.diceArray = dice;
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
        this.rollsLeft --;
      }
    }
  }
}
</script>


<style scoped>
img {
  height: 60px
}   
#rolled-dice-containear {
    border: 3px solid black;

    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
}

</style>



