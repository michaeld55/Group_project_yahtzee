<template lang = "html">
<div>
  <p>SAVED DICE</p>
  <img v-on:click="handleClickSaved(index)" v-for="(die, index) in savedDice" :key="index" :die="die" :alt="die.diceValue" :src="die.diceImage">
</div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: 'SavedDice',
  data(){
    return {
      savedDice: []
    }
  },

  mounted(){
    eventBus.$on('dice-selected', (dice) => {
      this.savedDice.push(dice);
    }),
    eventBus.$on('rolled-dice-to-scorecard', () => {
      this.sendSaved();
    }),
    eventBus.$on('move-remaining-dice', (remainingDiceArray) => {
      for (let die of remainingDiceArray){
        this.savedDice.push(die);
      }
    })
    eventBus.$on("score-saved", () =>{
      this.savedDice = []
    })
  },

  methods:{
    handleClickSaved(index){
      eventBus.$emit('dice-unselected', this.savedDice[index]);
      this.savedDice.splice(index, 1);
    },
    sendSaved(){
      if(this.savedDice.length > 0){
          eventBus.$emit('saved-dice-to-scorecard', (this.savedDice));
      }
    }
  }
}
</script>

<style scoped>

</style>