<template>
  <div id="app">
    <high-scores></high-scores>
    <div >
      <rolled-dice></rolled-dice>
      <saved-dice></saved-dice>
    </div>
    <scorecard ></scorecard>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import HighScores from '@/components/HighScores.vue';
import RolledDice from '@/components/RolledDice.vue';
import SavedDice from '@/components/SavedDice.vue';
import Scorecard from '@/components/Scorecard.vue';

export default {
  name: "app",
  // data(){
  //   return {
  //     null
  //   }
  // },
  mounted(){


  },
  components: {
    'high-scores': HighScores,
    'rolled-dice': RolledDice,
    'saved-dice': SavedDice,
    'scorecard': Scorecard
  },
  methods: {
    // getDiceNumbers(){
    //   const diceNumbers= DiceRoller.rollDice(),
    // }
  }
}
</script>

<style scoped>

</style>