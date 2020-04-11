<template lang = "html">
<div>
  <p>SAVED DICE</p>
  <p v-on:click="handleClickSaved(index)" v-for="(die, index) in savedDice" :key="index" :die="die">{{die.diceValue}}</p>
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

    eventBus.$emit('saved-dice-to-scorecard', (this.savedDice))

    eventBus.$on('move-remaining-dice', (remainingDiceArray) => {
      for (let die of remainingDiceArray){
        this.savedDice.push(die);
      }
    })
  },

  methods:{
    handleClickSaved(index){
      eventBus.$emit('dice-unselected', this.savedDice[index]);
      this.savedDice.splice(index, 1);
    }

  }
}
</script>

<style scoped>

</style>