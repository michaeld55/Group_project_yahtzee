<template>
  <div id="app">
    <high-scores></high-scores>
    <div id="dice-wrapper">
      <rolled-dice></rolled-dice>
      <saved-dice></saved-dice>
    </div>
    <scorecard></scorecard>
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
  data(){
    //something
  },

  components: {
    'high-scores': HighScores,
    'rolled-dice': RolledDice,
    'saved-dice': SavedDice,
    'scorecard': Scorecard
  }
}
</script>

<style scoped>

</style>