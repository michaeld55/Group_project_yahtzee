<template>
  <div class="grid-container" id="app">
    <div class="grid-item"><high-scores></high-scores></div>
      <div class="grid-item">
        <rolled-dice></rolled-dice>
        <saved-dice></saved-dice>
      </div>
    <div class="grid-item"><scorecard ></scorecard></div>
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

<style>
html, body {
  height: 100%;
  margin: 0px;
}

.grid-container {
  height: 100%;
  display: grid;
  grid-template-columns: 33% 34% 33%;
  border: 1px solid black;
}
</style>