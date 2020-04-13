<template>
  <div id="app">
    <player-form></player-form>
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
import PlayerForm from '@/components/PlayerForm.vue'

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
    'scorecard': Scorecard,
    'player-form': PlayerForm
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